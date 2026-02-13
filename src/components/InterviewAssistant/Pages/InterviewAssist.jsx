// // InterviewAssist.jsx - ✅ ALREADY CORRECT (NO CHANGES NEEDED)
// // This file already has KB integration on lines 40-41 and 84-85

// import React, { useEffect, useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../../Auth/AuthContext";

// // UI Components
// import InterviewHeader from "../../InterviewAssistant/Interview/InterviewHeader";
// import TranscriptPanel from "../../InterviewAssistant/Interview/TranscriptPanel";
// import QACopilot from "../../InterviewAssistant/Interview/QACopilot";
// import SettingsModal from "../../InterviewAssistant/Settings/SettingsPreviewModal";
// import TabAudioModal from "../../InterviewAssistant/Interview/TabAudioModal";
// import StatusBar from "../../InterviewAssistant/Interview/StatusBar";
// import MockInterviewAnalytics from "../../InterviewAssistant/Interview/MockInterviewAnalytics";

// // Context
// import { useAppData } from "../../../context/AppDataContext";

// // Hooks
// import useAudioRecorder from "../../InterviewAssistant/hooks/useAudioRecorder";
// import useTranscription from "../../InterviewAssistant/hooks/useTranscription";
// import useQACopilot from "../../InterviewAssistant/hooks/useQACopilot";
// import useInterviewStatus from "../../InterviewAssistant/hooks/useInterviewStatus";

// // Utils
// import { BACKEND_URL } from "../../utils/config";

// export default function InterviewAssist() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, loading } = useAuth();

//   // 🔥 DETECT MOCK MODE
//   const isMockMode = location.pathname === "/mock-interview";
//   const [showMockConfirm, setShowMockConfirm] = useState(false);

//   // 🆕 MOCK INTERVIEW STATE
//   const [mockQuestionCount, setMockQuestionCount] = useState(0);

//   // ✅ LINES 40-41 - KB INTEGRATION (ALREADY CORRECT)
//   const existingSessionId = location.state?.sessionId || sessionStorage.getItem("sessionId");
//   const knowledgeBaseIds = location.state?.knowledgeBaseIds || [];

//   // PERSONA / DOMAIN
//   const [personaId] = useState(
//     location.state?.personaId ||
//       localStorage.getItem("selectedPersona") ||
//       null
//   );

//   const [personaData] = useState(() => {
//     if (location.state?.personaData) return location.state.personaData;
//     const saved = localStorage.getItem("selectedPersonaData");
//     try {
//       return saved ? JSON.parse(saved) : null;
//     } catch {
//       return null;
//     }
//   });

//   const [domain] = useState(
//     location.state?.domain || localStorage.getItem("selectedDomain") || ""
//   );

//   // GLOBAL SETTINGS
//   const { settings } = useAppData();

//   const settingsRef = useRef(settings);
//   useEffect(() => {
//     settingsRef.current = settings;
//   }, [settings]);

//   // LOCAL UI STATE
//   const [activeView, setActiveView] = useState("interviewer");
//   const [showSettings, setShowSettings] = useState(false);

//   // ✅ LINES 77-86 - PASS SESSION & KB TO HOOK (ALREADY CORRECT)
//   const qa = useQACopilot({
//     user,
//     domain,
//     personaId,
//     personaData,
//     settingsRef,
//     isMockMode,
//     existingSessionId,  // ✅ Already correct
//     knowledgeBaseIds,   // ✅ Already correct
//   });

//   const transcription = useTranscription({
//     settingsRef,
//     reconnectingQaWsRef: qa.reconnectingQaWsRef,
//   });

//   const audio = useAudioRecorder({
//     reconnectingDeepgramWsRef: transcription.reconnectingDeepgramWsRef,
//   });

//   const status = useInterviewStatus({
//     isRecording: audio.isRecording,
//     isPaused: audio.isPaused,
//     deepgramStatus: transcription.deepgramStatus,
//     qaStatus: qa.qaStatus,
//     isGenerating: qa.isGenerating,
//   });

//   // AUTH GUARD
//   useEffect(() => {
//     if (!loading && !user) {
//       navigate("/sign-in");
//     }
//   }, [user, loading, navigate]);

//   // 🆕 AUTO-REQUEST FIRST QUESTION IN MOCK MODE
//   useEffect(() => {
//     if (isMockMode && audio.isRecording && mockQuestionCount === 0) {
//       const timer = setTimeout(() => {
//         console.log("🎤 [Mock] Auto-requesting first question");
//         setMockQuestionCount(1);
//         qa.requestMockQuestion(1);
//       }, 2000);

//       return () => clearTimeout(timer);
//     }
//   }, [isMockMode, audio.isRecording, mockQuestionCount]);

//   // 🆕 REQUEST NEXT MOCK QUESTION
//   const requestNextMockQuestion = () => {
//     const nextCount = mockQuestionCount + 1;
//     console.log(`➡️ [Mock] Requesting question #${nextCount}`);
//     setMockQuestionCount(nextCount);
//     qa.requestMockQuestion(nextCount);
//   };

//   // RECORDING CONTROL
//   const handleStartRequest = () => {
//     if (isMockMode) {
//       setShowMockConfirm(true);
//     } else {
//       startRecording();
//     }
//   };

//   const startRecording = async () => {
//     try {
//       audio.setTabAudioError("");
      
//       // 🔥 Ensure session exists (won't create duplicate if already exists)
//       const sessionId = await qa.initSession();
//       if (!sessionId) {
//         console.warn("❌ Session init failed");
//         return; 
//       }

//       await transcription.connectDeepgram();
//       await audio.startMicrophoneCapture();
      
//       if (!isMockMode) {
//         audio.setShowTabModal(true);
//       }
      
//       await qa.connectQA();
//       audio.setIsRecording(true);

//       console.log(isMockMode ? "✅ Mock interview started" : "✅ Interview started");
//     } catch (err) {
//       console.error("Failed to start:", err);
//       transcription.stopTranscription();
//       qa.stopQA();
//       audio.stopAudioCapture();
//       audio.setIsRecording(false);
//     }
//   };

//   const stopRecording = async () => {
//     transcription.stopTranscription();
    
//     await qa.stopQA();
    
//     audio.stopAudioCapture();
//     audio.setIsRecording(false);
//     audio.setIsPaused(false);

//     if (isMockMode) {
//       setMockQuestionCount(0);
//     }
//   };

//   // 🔥 HANDLE ANALYTICS ACTIONS
//   const handleDownloadReport = async () => {
//     if (!qa.analyticsData) return;

//     const report = `
// MOCK INTERVIEW PERFORMANCE REPORT
// ================================

// Overall Score: ${qa.analyticsData.overall_score}/100
// Total Questions: ${qa.analyticsData.total_questions}
// Duration: ${qa.analyticsData.duration_minutes} minutes
// Completion Rate: ${qa.analyticsData.completion_rate}%

// CATEGORY SCORES:
// ${Object.entries(qa.analyticsData.categories)
//   .map(([cat, data]) => `- ${cat}: ${data.score}/100 (${data.trend})`)
//   .join('\n')}

// STRENGTHS:
// ${qa.analyticsData.strengths.map(s => `✓ ${s}`).join('\n')}

// AREAS TO IMPROVE:
// ${qa.analyticsData.improvements.map(i => `• ${i}`).join('\n')}

// QUESTION BREAKDOWN:
// ${qa.analyticsData.question_breakdown
//   .map(q => `
// Q${q.number}: ${q.question}
// Score: ${q.score}/100
// Duration: ${q.duration_seconds}s
// Feedback: ${q.feedback}
// `).join('\n')}
// `;

//     const blob = new Blob([report], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `interview-report-${Date.now()}.txt`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const handleRetakeInterview = () => {
//     qa.setShowAnalytics(false);
//     setMockQuestionCount(0);
//     navigate("/mock-interview");
//   };

//   // Cleanup
//   useEffect(() => {
//     return () => {
//       transcription.stopTranscription();
//       qa.stopQA();
//       audio.stopAudioCapture();
//     };
//   }, []);

//   // LOADING
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-950 flex items-center justify-center">
//         <div className="text-white text-xl">Loading...</div>
//       </div>
//     );
//   }

//   if (!user) return null;

//   // RENDER
//   return (
//     <>
//       {qa.showAnalytics && qa.analyticsData && (
//         <MockInterviewAnalytics
//           analyticsData={qa.analyticsData}
//           onClose={() => qa.setShowAnalytics(false)}
//           onRetake={handleRetakeInterview}
//           onDownloadReport={handleDownloadReport}
//         />
//       )}

//       <div className="h-screen w-full bg-gray-950 flex flex-col overflow-hidden">
//         <InterviewHeader
//           personaData={personaData}
//           domain={domain}
//           isRecording={audio.isRecording}
//           onStartRecording={handleStartRequest}
//           onStopRecording={stopRecording}
//           onSettingsClick={() => setShowSettings(true)}
//           onBackClick={() => navigate("/interview")}
//           onExit={() => navigate("/interview")}
//           isMockMode={isMockMode}
//         />

//         {audio.showTabModal && audio.isRecording && (
//           <TabAudioModal
//             onSelect={audio.startSystemAudioCapture}
//             onClose={() => {
//               audio.setShowTabModal(false);
//               if (!audio.isRecording) stopRecording();
//             }}
//             errorMessage={audio.tabAudioError}
//           />
//         )}

//         {/* MAIN CONTENT */}
//         {/* Mobile (<650px): flex-col (Vertical) | Desktop (>=650px): flex-row (Horizontal) */}
//         <div className="flex-1 flex flex-col min-[650px]:flex-row bg-gray-950 overflow-hidden">
          
//           {/* LEFT PANEL - TRANSCRIPT */}
//           {/* Mobile: h-[30%] w-full | Desktop: w-[30%] h-full */}
//           <div className="w-full h-[30%] min-[650px]:w-[30%] min-[650px]:h-full border-b min-[650px]:border-b-0 min-[650px]:border-r border-gray-800 flex flex-col">
//             <div className="flex-1 overflow-y-auto">
//               <TranscriptPanel
//                 activeView={isMockMode ? "candidate" : activeView}
//                 onViewChange={isMockMode ? () => {} : setActiveView}
//                 interviewerTranscript={transcription.interviewerTranscript}
//                 candidateTranscript={transcription.candidateTranscript}
//                 currentInterviewerParagraph={
//                   transcription.currentInterviewerParagraph
//                 }
//                 currentCandidateParagraph={
//                   transcription.currentCandidateParagraph
//                 }
//                 interviewerInterim={transcription.interviewerInterim}
//                 candidateInterim={transcription.candidateInterim}
//                 isPaused={audio.isPaused}
//                 onPauseToggle={() => audio.setIsPaused(!audio.isPaused)}
//                 isRecording={audio.isRecording}
//                 onManualGenerate={qa.handleManualGenerate}
//                 autoScroll={settings?.autoScroll}
//                 isMockMode={isMockMode}
//               />
//             </div>
//           </div>

//           {/* RIGHT PANEL - QA COPILOT */}
//           {/* Mobile: h-[70%] w-full | Desktop: w-[70%] h-full */}
//           <div className="w-full h-[70%] min-[650px]:w-[70%] min-[650px]:h-full flex flex-col bg-gray-950">
//             <div className="flex-1 overflow-y-auto flex flex-col">
//               <QACopilot
//                 qaList={qa.qaList}
//                 currentQuestion={qa.currentQuestion}
//                 currentAnswer={qa.currentAnswer}
//                 isGenerating={qa.isGenerating}
//                 isStreamingComplete={qa.isStreamingComplete}
//                 autoScroll={settings?.autoScroll}
//                 isMockMode={isMockMode}
//               />

//               {/* 🆕 MOCK INTERVIEW CONTROLS */}
//               {isMockMode && audio.isRecording && (
//                 <div className="border-t border-gray-800 bg-[#111111] p-4 shrink-0">
//                   <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
//                     {/* Status */}
//                     <div className="flex items-center gap-2 text-sm">
//                       {qa.isGenerating ? (
//                         <>
//                           <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
//                           <span className="text-purple-300">Generating question...</span>
//                         </>
//                       ) : qa.isWaitingForAnswer ? (
//                         <>
//                           <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
//                           <span className="text-amber-300">🎤 Answer the question (then click Next)</span>
//                         </>
//                       ) : (
//                         <>
//                           <div className="w-2 h-2 bg-green-400 rounded-full" />
//                           <span className="text-green-300">✅ Ready for next question</span>
//                         </>
//                       )}
//                     </div>

//                     {/* Controls */}
//                     <div className="flex items-center gap-3 flex-wrap">
//                       <button
//                         onClick={requestNextMockQuestion}
//                         disabled={qa.isGenerating}
//                         className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition text-sm shadow-lg"
//                       >
//                         {qa.isGenerating ? "Generating..." : "Next Question"}
//                       </button>

//                       <div className="px-4 py-2.5 bg-[#1a1a1a] border border-gray-700 rounded-lg text-sm font-medium text-gray-300">
//                         Question {mockQuestionCount}
//                       </div>

//                       <button
//                         onClick={async () => {
//                           await stopRecording();
//                         }}
//                         className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition text-sm shadow-lg"
//                       >
//                         End & View Analytics
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <StatusBar
//           deepgramStatus={status.deepgramStatus}
//           qaStatus={status.qaStatus}
//           isGenerating={qa.isGenerating}
//           isPaused={audio.isPaused}
//         />

//         {showSettings && (
//           <SettingsModal
//             settings={settings}
//             backendUrl={BACKEND_URL}
//             onClose={() => setShowSettings(false)}
//           />
//         )}

//         {/* 🔥 MOCK CONFIRMATION MODAL */}
//         {showMockConfirm && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
//             <div className="w-full max-w-md bg-[#0F1115] border border-white/10 rounded-2xl shadow-2xl p-6">
//               <div className="text-center">
//                 <div className="mx-auto w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4">
//                   <span className="text-2xl">🚀</span>
//                 </div>
//                 <h3 className="text-xl font-semibold text-white mb-2">
//                   Ready to Start Mock Interview?
//                 </h3>
//                 <p className="text-gray-400 text-sm mb-6">
//                   The AI will ask you interview questions one by one.
//                   Answer each question, then click "Next Question" to continue.
//                   Your performance will be analyzed at the end.
//                 </p>
                
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setShowMockConfirm(false)}
//                     className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowMockConfirm(false);
//                       startRecording();
//                     }}
//                     className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-white text-black hover:bg-gray-200 transition-colors"
//                   >
//                     Start Mock
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }










// InterviewAssist.jsx - Fully Responsive
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";

// UI Components
import InterviewHeader from "../../InterviewAssistant/Interview/InterviewHeader";
import TranscriptPanel from "../../InterviewAssistant/Interview/TranscriptPanel";
import QACopilot from "../../InterviewAssistant/Interview/QACopilot";
import SettingsModal from "../../InterviewAssistant/Settings/SettingsPreviewModal";
import TabAudioModal from "../../InterviewAssistant/Interview/TabAudioModal";
import StatusBar from "../../InterviewAssistant/Interview/StatusBar";
import MockInterviewAnalytics from "../../InterviewAssistant/Interview/MockInterviewAnalytics";

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
  const existingSessionId = location.state?.sessionId || sessionStorage.getItem("sessionId");
  const knowledgeBaseIds = location.state?.knowledgeBaseIds || [];

  // PERSONA / DOMAIN
  const [personaId] = useState(
    location.state?.personaId ||
      localStorage.getItem("selectedPersona") ||
      null
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
    location.state?.domain || localStorage.getItem("selectedDomain") || ""
  );

  // GLOBAL SETTINGS
  const { settings } = useAppData();

  const settingsRef = useRef(settings);
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  // LOCAL UI STATE
  const [activeView, setActiveView] = useState("interviewer");
  const [showSettings, setShowSettings] = useState(false);

  // HOOKS - Pass existing session & KB IDs
  const qa = useQACopilot({
    user,
    domain,
    personaId,
    personaData,
    settingsRef,
    isMockMode,
    existingSessionId,
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
      
      // Ensure session exists
      const sessionId = await qa.initSession();
      if (!sessionId) {
        console.warn("❌ Session init failed");
        return; 
      }

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
    transcription.stopTranscription();
    await qa.stopQA();
    audio.stopAudioCapture();
    audio.setIsRecording(false);
    audio.setIsPaused(false);

    if (isMockMode) {
      setMockQuestionCount(0);
    }
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
  .join('\n')}

STRENGTHS:
${qa.analyticsData.strengths.map(s => `✓ ${s}`).join('\n')}

AREAS TO IMPROVE:
${qa.analyticsData.improvements.map(i => `• ${i}`).join('\n')}

QUESTION BREAKDOWN:
${qa.analyticsData.question_breakdown
  .map(q => `
Q${q.number}: ${q.question}
Score: ${q.score}/100
Duration: ${q.duration_seconds}s
Feedback: ${q.feedback}
`).join('\n')}
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
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

      <div className="min-h-screen bg-gray-950 flex flex-col overflow-hidden">
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

        {/* MAIN CONTENT - Fully Responsive Layout */}
        <div className="flex-1 flex flex-col lg:flex-row bg-gray-950 overflow-hidden">
          
          {/* LEFT PANEL - TRANSCRIPT */}
          <div className="w-full lg:w-[35%] xl:w-[30%] border-b lg:border-b-0 lg:border-r border-gray-800 flex flex-col">
            <div className="flex-1 overflow-y-auto h-[40vh] lg:h-[calc(100vh-64px-48px)]">
              <TranscriptPanel
                activeView={isMockMode ? "candidate" : activeView}
                onViewChange={isMockMode ? () => {} : setActiveView}
                interviewerTranscript={transcription.interviewerTranscript}
                candidateTranscript={transcription.candidateTranscript}
                currentInterviewerParagraph={
                  transcription.currentInterviewerParagraph
                }
                currentCandidateParagraph={
                  transcription.currentCandidateParagraph
                }
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
          </div>

          {/* RIGHT PANEL - QA COPILOT */}
          <div className="w-full lg:w-[65%] xl:w-[70%] flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto h-[calc(60vh-48px)] lg:h-[calc(100vh-64px-48px)]">
              <QACopilot
                qaList={qa.qaList}
                currentQuestion={qa.currentQuestion}
                currentAnswer={qa.currentAnswer}
                isGenerating={qa.isGenerating}
                isStreamingComplete={qa.isStreamingComplete}
                autoScroll={settings?.autoScroll}
                isMockMode={isMockMode}
              />
            </div>

            {/* MOCK INTERVIEW CONTROLS - Fully Responsive */}
            {isMockMode && audio.isRecording && (
              <div className="border-t border-gray-800 bg-[#111111] p-3 sm:p-4">
                <div className="flex flex-col gap-3">
                  
                  {/* Status - Full Width on Mobile */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    {qa.isGenerating ? (
                      <>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shrink-0" />
                        <span className="text-purple-300">Generating question...</span>
                      </>
                    ) : qa.isWaitingForAnswer ? (
                      <>
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse shrink-0" />
                        <span className="text-amber-300">🎤 Answer the question (then click Next)</span>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-green-400 rounded-full shrink-0" />
                        <span className="text-green-300">✅ Ready for next question</span>
                      </>
                    )}
                  </div>

                  {/* Controls - Stacked on Mobile, Row on Desktop */}
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

        {/* MOCK CONFIRMATION MODAL - Fully Responsive */}
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
                  The AI will ask you interview questions one by one.
                  Answer each question, then click "Next Question" to continue.
                  Your performance will be analyzed at the end.
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