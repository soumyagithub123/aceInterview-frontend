// InterviewAssist.jsx
// ✅ UPDATED:
// 1. Session timer starts after FIRST AI answer (mark_session_counted call)
// 2. Timer counts down from plan duration (60min basic, 25min free, 90min pro)
// 3. Extend button for basic/pro users (via backend call)
// 4. refreshSessionQuota called on session end (quota counter updates)
// 5. Sessions remaining shown in header via QACopilot timer area

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";

// UI Components
import InterviewHeader from "../../InterviewAssistant/Interview/InterviewHeader";
import TranscriptPanel from "../../InterviewAssistant/Interview/TranscriptPanel";
import QACopilot from "../../InterviewAssistant/Interview/QACopilot";
import SettingsModal from "../../InterviewAssistant/Settings/SettingsPreviewModal";
import TabAudioModal from "../../InterviewAssistant/Interview/TabAudioModal";
import StatusBar from "../../InterviewAssistant/Interview/StatusBar";
import MockInterviewAnalytics from "../../InterviewAssistant/MockInterview/MockInterviewAnalytics";

// Context
import { useAppData } from "../../../context/AppDataContext";

// Hooks
import useAudioRecorder from "../../InterviewAssistant/hooks/useAudioRecorder";
import useTranscription from "../../InterviewAssistant/hooks/useTranscription";
import useQACopilot from "../../InterviewAssistant/hooks/useQACopilot";
import useInterviewStatus from "../../InterviewAssistant/hooks/useInterviewStatus";

// Utils
import { BACKEND_URL } from "../../utils/config";

export default function InterviewAssist() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // DETECT MOCK MODE
  const isMockMode = location.pathname === "/mock-interview";
  const [showMockConfirm, setShowMockConfirm] = useState(false);

  // MOCK INTERVIEW STATE
  const [mockQuestionCount, setMockQuestionCount] = useState(0);

  // GET EXISTING SESSION & KB IDs
  const existingSessionId =
    location.state?.sessionId || sessionStorage.getItem("sessionId");
  const knowledgeBaseIds = location.state?.knowledgeBaseIds || [];

  // PERSONA / DOMAIN
  const [personaId] = useState(
    location.state?.personaId ||
      localStorage.getItem("selectedPersona") ||
      null,
  );

  const [personaData] = useState(() => {
    if (location.state?.personaData) return location.state.personaData;
    const saved = localStorage.getItem("selectedPersonaData");
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [domain] = useState(
    location.state?.domain || localStorage.getItem("selectedDomain") || "",
  );

  // GLOBAL SETTINGS + QUOTA
  const { settings, sessionQuota, refreshSessionQuota } = useAppData();

  const settingsRef = useRef(settings);
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  // LOCAL UI STATE
  const [activeView, setActiveView] = useState("interviewer");
  const [showSettings, setShowSettings] = useState(false);

  // ─────────────────────────────────────────────────────
  // ✅ SESSION TIMER STATE
  // Timer shuru hota hai jab pehla AI answer generate ho
  // ─────────────────────────────────────────────────────
  const [timerSeconds, setTimerSeconds]         = useState(null);  // null = not started
  const [sessionCounted, setSessionCounted]     = useState(false);
  const [isExtending, setIsExtending]           = useState(false);
  const [extendError, setExtendError]           = useState(null);
  const [isSessionExpired, setIsSessionExpired] = useState(false); // ✅ NEW: timer hitna pe popup
  const [extendKey, setExtendKey]               = useState(0);     // ✅ extend pe interval restart ke liye
  const timerRef                                = useRef(null);
  const sessionStartTimeRef                     = useRef(null);
  const currentSessionIdRef                     = useRef(existingSessionId);

  // Duration limit from session quota (seconds)
  // DB returns duration_limit_mins (without "utes")
  const durationLimitSeconds = (() => {
    const mins = sessionQuota?.duration_limit_mins;
    if (mins && typeof mins === "number" && mins > 0) return mins * 60;
    // Plan ke hisaab se default
    const plan = sessionQuota?.plan_type;
    if (plan === "pro")   return 90 * 60;
    if (plan === "basic") return 60 * 60;
    return 25 * 60; // free default
  })();

  // Can this user extend? (basic or pro, not free)
  const isPaidPlan = sessionQuota?.plan_type && sessionQuota.plan_type !== "free";
  // Extend minutes based on plan
  const extendMinutes = sessionQuota?.plan_type === "pro" ? 90 : 60;

  // ─────────────────────────────────────────────────────
  // ✅ MARK SESSION COUNTED (first AI answer pe call hoga)
  // ─────────────────────────────────────────────────────
  const markSessionCounted = useCallback(async (sessionId) => {
    if (!sessionId || sessionCounted) return;
    try {
      // Backend: mark_session_counted endpoint
      // ye session_enforcement.py ka mark_session_counted() call karta hai
      const res = await fetch(`${BACKEND_URL}/session/mark-counted/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        console.log("[Timer] Session marked as counted:", sessionId);
        setSessionCounted(true);

        // ✅ Timer shuru karo abhi se
        sessionStartTimeRef.current = Date.now();
        setTimerSeconds(durationLimitSeconds);

        // ✅ Quota UI turant update karo (sessions_remaining -1)
        await refreshSessionQuota();
        console.log("[Quota] Refreshed after session counted");
      }
    } catch (err) {
      console.error("[Timer] mark-counted error:", err);
    }
  }, [sessionCounted, durationLimitSeconds, refreshSessionQuota]);

  // ─────────────────────────────────────────────────────
  // ✅ TIMER COUNTDOWN — single interval, starts when timerSeconds set
  // ─────────────────────────────────────────────────────
  const timerIntervalRef = useRef(null);

  useEffect(() => {
    // Start timer when timerSeconds is set (first time or after extend)
    if (timerSeconds === null) return;

    // ✅ FIX: local intervalId use karo — race condition avoid
    // Old interval closure mein timerIntervalRef.current tha jo new interval clear kar deta tha
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    const intervalId = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev === null) return null;
        if (prev <= 0) {
          clearInterval(intervalId); // ✅ apna hi intervalId clear karo, ref nahi
          console.log("[Timer] Session duration limit reached");
          setIsSessionExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    timerIntervalRef.current = intervalId;

    return () => {
      clearInterval(intervalId); // ✅ cleanup bhi apna intervalId use kare
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionCounted, extendKey]); // sessionCounted ya extend pe restart hoga

  // ✅ Timer expire hone pe transcript + AI band karo
  useEffect(() => {
    if (!isSessionExpired) return;
    console.log("[Timer] Stopping transcript + AI on session expire");
    transcription.stopTranscription();
    qa.pauseQA?.(); // agar pauseQA ho to
  }, [isSessionExpired]);

  // ─────────────────────────────────────────────────────
  // ✅ EXTEND SESSION (basic/pro only)
  // ─────────────────────────────────────────────────────
  const handleExtendSession = async () => {
    if (!isPaidPlan || isExtending) return;
    const sessionId = currentSessionIdRef.current || existingSessionId;
    if (!sessionId) return;

    // ✅ INSTANT: Popup band karo + timer shuru karo (optimistic UI)
    setIsSessionExpired(false);
    setExtendError(null);
    setIsExtending(true);
    setTimerSeconds(extendMinutes * 60);  // naya timer value set karo
    setExtendKey(k => k + 1);             // ✅ interval restart trigger

    try {
      // 1️⃣ Extend session duration in DB + sessions_used +1 (backend karta hai)
      const res = await fetch(`${BACKEND_URL}/session/extend/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ extra_minutes: extendMinutes }),
      });

      if (res.ok) {
        console.log(`[Timer] Session extended by ${extendMinutes} minutes (+1 session counted)`);

        // 2️⃣ Transcript + QA restart karo
        try {
          await transcription.connectDeepgram();
          await audio.startMicrophoneCapture();
          await qa.connectQA();
          audio.setIsRecording(true);
          console.log("[Extend] Transcript + QA resumed successfully");
        } catch (resumeErr) {
          console.error("[Extend] Failed to resume transcript/QA:", resumeErr);
          setExtendError("Mic restart failed. Please stop and start again.");
        }

        // 3️⃣ Quota refresh (sessions_remaining -1 more)
        await refreshSessionQuota();
      } else {
        // Rollback: agar API fail ho to popup wapas dikhao
        const err = await res.json();
        setIsSessionExpired(true);
        setTimerSeconds(0);
        setExtendError(err?.detail || "Extend failed");
      }
    } catch (err) {
      setIsSessionExpired(true);
      setTimerSeconds(0);
      setExtendError("Network error");
    } finally {
      setIsExtending(false);
    }
  };

  // HOOKS - Pass existing session & KB IDs
  const qa = useQACopilot({
    user,
    domain,
    personaId,
    personaData,
    settingsRef,
    isMockMode,
    existingSessionId,
    sessionData: location.state?.sessionData,
    knowledgeBaseIds,
  });

  const transcription = useTranscription({
    settingsRef,
    reconnectingQaWsRef: qa.reconnectingQaWsRef,
  });

  const audio = useAudioRecorder({
    reconnectingDeepgramWsRef: transcription.reconnectingDeepgramWsRef,
  });

  const status = useInterviewStatus({
    isRecording: audio.isRecording,
    isPaused: audio.isPaused,
    deepgramStatus: transcription.deepgramStatus,
    qaStatus: qa.qaStatus,
    isGenerating: qa.isGenerating,
  });

  // ─────────────────────────────────────────────────────
  // ✅ WATCH FOR FIRST AI ANSWER → Mark session counted + start timer
  // qaList mein pehla item aane pe trigger
  // ─────────────────────────────────────────────────────
  useEffect(() => {
    if (qa.qaList.length === 1 && !sessionCounted) {
      const sessionId = currentSessionIdRef.current || existingSessionId;
      console.log("[Timer] First AI answer detected, marking session counted");
      markSessionCounted(sessionId);
    }
  }, [qa.qaList.length, sessionCounted, existingSessionId, markSessionCounted]);

  // AUTH GUARD
  useEffect(() => {
    if (!loading && !user) {
      navigate("/sign-in");
    }
  }, [user, loading, navigate]);

  // AUTO-REQUEST FIRST QUESTION IN MOCK MODE
  useEffect(() => {
    if (isMockMode && audio.isRecording && mockQuestionCount === 0) {
      const timer = setTimeout(() => {
        console.log("🎤 [Mock] Auto-requesting first question");
        setMockQuestionCount(1);
        qa.requestMockQuestion(1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isMockMode, audio.isRecording, mockQuestionCount]);

  // REQUEST NEXT MOCK QUESTION
  const requestNextMockQuestion = () => {
    const nextCount = mockQuestionCount + 1;
    console.log(`➡️ [Mock] Requesting question #${nextCount}`);
    setMockQuestionCount(nextCount);
    qa.requestMockQuestion(nextCount);
  };

  // RECORDING CONTROL
  const handleStartRequest = () => {
    if (isMockMode) {
      setShowMockConfirm(true);
    } else {
      startRecording();
    }
  };

  const startRecording = async () => {
    try {
      audio.setTabAudioError("");

      const sessionId = await qa.initSession();
      if (!sessionId) {
        console.warn("❌ Session init failed");
        return;
      }

      // Store current session ID for timer
      currentSessionIdRef.current = sessionId;

      await transcription.connectDeepgram();
      await audio.startMicrophoneCapture();

      if (!isMockMode) {
        audio.setShowTabModal(true);
      }

      await qa.connectQA();
      audio.setIsRecording(true);

      console.log(isMockMode ? "✅ Mock interview started" : "✅ Interview started");
    } catch (err) {
      console.error("Failed to start:", err);
      transcription.stopTranscription();
      qa.stopQA();
      audio.stopAudioCapture();
      audio.setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    // ✅ Clear timer
    clearInterval(timerIntervalRef.current);
    setTimerSeconds(null);
    setSessionCounted(false);

    transcription.stopTranscription();
    await qa.stopQA();
    audio.stopAudioCapture();
    audio.setIsRecording(false);
    audio.setIsPaused(false);

    if (isMockMode) {
      setMockQuestionCount(0);
    }

    // ✅ Refresh quota after session ends (counter updates instantly)
    await refreshSessionQuota();
    console.log("[Quota] Session quota refreshed after stop");
  };

  // HANDLE ANALYTICS ACTIONS
  const handleDownloadReport = async () => {
    if (!qa.analyticsData) return;

    const report = `
MOCK INTERVIEW PERFORMANCE REPORT
================================

Overall Score: ${qa.analyticsData.overall_score}/100
Total Questions: ${qa.analyticsData.total_questions}
Duration: ${qa.analyticsData.duration_minutes} minutes
Completion Rate: ${qa.analyticsData.completion_rate}%

CATEGORY SCORES:
${Object.entries(qa.analyticsData.categories)
  .map(([cat, data]) => `- ${cat}: ${data.score}/100 (${data.trend})`)
  .join("\n")}

STRENGTHS:
${qa.analyticsData.strengths.map((s) => `✓ ${s}`).join("\n")}

AREAS TO IMPROVE:
${qa.analyticsData.improvements.map((i) => `• ${i}`).join("\n")}

QUESTION BREAKDOWN:
${qa.analyticsData.question_breakdown
  .map(
    (q) => `
Q${q.number}: ${q.question}
Score: ${q.score}/100
Duration: ${q.duration_seconds}s
Feedback: ${q.feedback}
`,
  )
  .join("\n")}
    `.trim();

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `interview-report-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRetakeInterview = () => {
    qa.setShowAnalytics(false);
    setMockQuestionCount(0);
    navigate("/mock-interview");
  };

  // Cleanup
  useEffect(() => {
    return () => {
      clearInterval(timerIntervalRef.current);
      transcription.stopTranscription();
      qa.stopQA();
      audio.stopAudioCapture();
    };
  }, []);

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="text-white text-base sm:text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  // ✅ MOCK CONTROLS COMPONENT (reusable)
  const mockControlsContent =
    isMockMode && audio.isRecording ? (
      <div className="p-3 sm:p-4">
        <div className="flex flex-col gap-3">
          {/* Status */}
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            {qa.isGenerating ? (
              <>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shrink-0" />
                <span className="text-purple-300">Generating question...</span>
              </>
            ) : qa.isWaitingForAnswer ? (
              <>
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse shrink-0" />
                <span className="text-amber-300">
                  🎤 Answer the question (then click Next)
                </span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-green-400 rounded-full shrink-0" />
                <span className="text-green-300">
                  ✅ Ready for next question
                </span>
              </>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <button
              onClick={requestNextMockQuestion}
              disabled={qa.isGenerating}
              className="w-full sm:w-auto px-4 sm:px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition text-sm shadow-lg order-1 sm:order-none"
            >
              {qa.isGenerating ? "Generating..." : "Next Question"}
            </button>

            <div className="w-full sm:w-auto px-4 py-2.5 bg-[#1a1a1a] border border-gray-700 rounded-lg text-sm font-medium text-gray-300 text-center order-2 sm:order-none">
              Question {mockQuestionCount}
            </div>

            <button
              onClick={async () => {
                await stopRecording();
              }}
              className="w-full sm:w-auto sm:ml-auto px-4 sm:px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition text-sm shadow-lg order-3 sm:order-none"
            >
              End & View Analytics
            </button>
          </div>
        </div>
      </div>
    ) : null;

  // RENDER
  return (
    <>
      {qa.showAnalytics && qa.analyticsData && (
        <MockInterviewAnalytics
          analyticsData={qa.analyticsData}
          onClose={() => qa.setShowAnalytics(false)}
          onRetake={handleRetakeInterview}
          onDownloadReport={handleDownloadReport}
        />
      )}

      <div className="h-screen bg-gray-950 flex flex-col overflow-hidden">
        <InterviewHeader
          personaData={personaData}
          domain={domain}
          isRecording={audio.isRecording}
          onStartRecording={handleStartRequest}
          onStopRecording={stopRecording}
          onSettingsClick={() => setShowSettings(true)}
          onBackClick={() => navigate("/interview")}
          onExit={() => navigate("/interview")}
          isMockMode={isMockMode}
        />

        {audio.showTabModal && audio.isRecording && (
          <TabAudioModal
            onSelect={audio.startSystemAudioCapture}
            onClose={() => {
              audio.setShowTabModal(false);
              if (!audio.isRecording) stopRecording();
            }}
            errorMessage={audio.tabAudioError}
          />
        )}

        {/* ✅ SESSION EXPIRED POPUP */}
        {isSessionExpired && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl text-center">
              {/* Icon */}
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h2 className="text-white text-xl font-bold mb-2">Session Time Limit Reached</h2>
              <p className="text-gray-400 text-sm mb-5">
                Your allotted session time has expired.
              </p>

              {isPaidPlan ? (
                <>
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3 mb-6">
                    <p className="text-orange-300 text-sm font-medium">
                      ⚠️ Extending this session will consume <strong>1 additional session</strong> from your quota.
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      (Current session + extension = 2 sessions used)
                    </p>
                  </div>

                  {extendError && (
                    <p className="text-red-400 text-sm mb-4">{extendError}</p>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={async () => { await stopRecording(); navigate("/interview"); }}
                      className="flex-1 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-gray-800 font-semibold transition-all text-sm"
                    >
                      End Session
                    </button>
                    <button
                      onClick={handleExtendSession}
                      disabled={isExtending}
                      className="flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isExtending ? "Extending..." : `🔄 +${extendMinutes} Min Extend`}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-3 mb-6">
                    <p className="text-purple-300 text-sm">
                      Session extension is not available on the Free plan.
                      <br />
                      Upgrade to <strong>Basic or Pro</strong> to unlock extended sessions and more.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={async () => { await stopRecording(); navigate("/interview"); }}
                      className="flex-1 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-gray-800 font-semibold transition-all text-sm"
                    >
                      End Session
                    </button>
                    <button
                      onClick={() => navigate("/pricing")}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold transition-all text-sm"
                    >
                      ⬆️ Upgrade Plan
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
          {/* LEFT PANEL - TRANSCRIPT */}
          <div className="h-[30%] lg:h-auto w-full lg:w-[30%] border-b lg:border-b-0 lg:border-r border-gray-800 flex flex-col min-h-0 shrink-0">
            <TranscriptPanel
              activeView={isMockMode ? "candidate" : activeView}
              onViewChange={isMockMode ? () => {} : setActiveView}
              interviewerTranscript={transcription.interviewerTranscript}
              candidateTranscript={transcription.candidateTranscript}
              currentInterviewerParagraph={transcription.currentInterviewerParagraph}
              currentCandidateParagraph={transcription.currentCandidateParagraph}
              interviewerInterim={transcription.interviewerInterim}
              candidateInterim={transcription.candidateInterim}
              isPaused={audio.isPaused}
              onPauseToggle={() => audio.setIsPaused(!audio.isPaused)}
              isRecording={audio.isRecording}
              onManualGenerate={qa.handleManualGenerate}
              autoScroll={settings?.autoScroll}
              isMockMode={isMockMode}
            />
          </div>

          {/* RIGHT PANEL - QA COPILOT */}
          <div className="flex-1 lg:w-[70%] flex flex-col min-h-0">
            <QACopilot
              qaList={qa.qaList}
              currentQuestion={qa.currentQuestion}
              currentAnswer={qa.currentAnswer}
              isGenerating={qa.isGenerating}
              isStreamingComplete={qa.isStreamingComplete}
              autoScroll={settings?.autoScroll}
              isMockMode={isMockMode}
              mockQuestionCount={mockQuestionCount}
              mockControls={mockControlsContent}
              // ✅ Timer props
              timerSeconds={timerSeconds}
              canExtend={isPaidPlan && !isMockMode}
              onExtend={handleExtendSession}
              isExtending={isExtending}
              extendError={extendError}
            />

            {/* MOCK CONTROLS - mobile/tablet only */}
            {mockControlsContent && (
              <div className="lg:hidden border-t border-gray-800 bg-[#111111]">
                {mockControlsContent}
              </div>
            )}
          </div>
        </div>

        <StatusBar
          deepgramStatus={status.deepgramStatus}
          qaStatus={status.qaStatus}
          isGenerating={qa.isGenerating}
          isPaused={audio.isPaused}
        />

        {showSettings && (
          <SettingsModal
            settings={settings}
            backendUrl={BACKEND_URL}
            onClose={() => setShowSettings(false)}
          />
        )}

        {/* MOCK CONFIRMATION MODAL */}
        {showMockConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4">
            <div className="w-full max-w-md bg-[#0F1115] border border-white/10 rounded-2xl shadow-2xl p-5 sm:p-6 mx-4">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl sm:text-3xl">🚀</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  Ready to Start Mock Interview?
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-6 leading-relaxed">
                  The AI will ask you interview questions one by one. Answer
                  each question, then click "Next Question" to continue. Your
                  performance will be analyzed at the end.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowMockConfirm(false)}
                    className="w-full sm:flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowMockConfirm(false);
                      startRecording();
                    }}
                    className="w-full sm:flex-1 py-2.5 rounded-xl text-sm font-medium bg-white text-black hover:bg-gray-200 transition-colors"
                  >
                    Start Mock
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}