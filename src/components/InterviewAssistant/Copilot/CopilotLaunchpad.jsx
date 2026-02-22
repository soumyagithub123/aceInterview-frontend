// src/components/Interview/Copilot/CopilotLaunchpad.jsx
// ✅ UPDATED:
// 1. Session quota (remaining sessions) shown in left sidebar panel
// 2. Free user ke saath 0 sessions → launch button disabled with message
// 3. Quota display: remaining/total with plan info
// 4. Baaki sab code exactly same hai

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";
import { useAppData } from "../../../context/AppDataContext";
import {
  Settings,
  Rocket,
  CheckCircle,
  Sparkles,
  Loader2,
  Crown,
  AlertCircle,
  Clock,
  Zap,
} from "lucide-react";

import PersonaSelection from "../Persona/PersonaSelection";
import InterviewDomainSelection from "./InterviewDomainSelection";
import LaunchChecklist from "./LaunchChecklist";
import SettingsModal from "../Settings/SettingsModal";
import { BACKEND_URL as API } from "../../utils/config";

/* -------------------- UTILS -------------------- */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* -------------------- STEP DOT -------------------- */
function StepDot({ active, done }) {
  return (
    <div
      className={cn(
        "relative grid place-items-center h-9 w-9 rounded-full border transition-all shrink-0",
        done
          ? "bg-emerald-500/15 border-emerald-400/30"
          : active
          ? "bg-white/10 border-white/25"
          : "bg-white/5 border-white/10"
      )}
    >
      {done ? (
        <CheckCircle className="h-5 w-5 text-emerald-300" />
      ) : (
        <div
          className={cn(
            "h-2.5 w-2.5 rounded-full",
            active ? "bg-white" : "bg-white/35"
          )}
        />
      )}
    </div>
  );
}

/* -------------------- CHIP -------------------- */
function Chip({ tone = "neutral", children }) {
  const styles =
    tone === "ok"
      ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
      : tone === "warn"
      ? "border-yellow-400/25 bg-yellow-400/10 text-yellow-100"
      : tone === "danger"
      ? "border-red-400/25 bg-red-400/10 text-red-200"
      : "border-white/15 bg-white/5 text-white/75";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs whitespace-nowrap",
        styles
      )}
    >
      {children}
    </span>
  );
}

/* -------------------- CARD -------------------- */
function Card({ title, subtitle, right, children }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] shadow-[0_30px_80px_-60px_rgba(0,0,0,0.9)] overflow-hidden">
      <div className="px-6 py-5 border-b border-white/10 bg-gradient-to-r from-white/[0.08] to-transparent">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-white text-base font-semibold tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm text-white/60">{subtitle}</p>
            )}
          </div>
          {right && <div className="flex-shrink-0">{right}</div>}
        </div>
      </div>
      <div className="p-4 md:p-6">{children}</div>
    </div>
  );
}

/* -------------------- SESSION QUOTA WIDGET -------------------- */
// ✅ NEW: Left sidebar mein quota dikhata hai
function SessionQuotaWidget({ sessionQuota, isPaidUser, onUpgrade }) {
  if (!sessionQuota) return null;

  const { is_unlimited, sessions_remaining, session_limit, duration_limit_mins, plan_type, billing_period } = sessionQuota;

  // Unlimited (pro)
  if (is_unlimited) {
    return (
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wide">
            Pro Plan
          </span>
        </div>
        <p className="text-white text-sm font-semibold">Unlimited Sessions</p>
        <p className="text-white/40 text-xs mt-1 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {duration_limit_mins} min per session
        </p>
      </div>
    );
  }

  // Exhausted
  if (sessions_remaining === 0) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-4">
        <div className="flex items-center gap-2 mb-1">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span className="text-xs font-semibold text-red-300 uppercase tracking-wide">
            Sessions Used Up
          </span>
        </div>
        <p className="text-white text-sm font-semibold">0 sessions remaining</p>
        <p className="text-white/40 text-xs mt-1">
          {plan_type === "free"
            ? "All 5 lifetime free sessions used"
            : `All ${session_limit} ${billing_period} sessions used`}
        </p>
        <button
          onClick={onUpgrade}
          className="mt-3 w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold px-3 py-2 rounded-xl text-xs hover:from-yellow-300 hover:to-orange-300 transition-all"
        >
          <Crown className="w-3.5 h-3.5" />
          Upgrade Plan
        </button>
      </div>
    );
  }

  // Low sessions (≤ 2)
  const isLow = sessions_remaining <= 2;
  const pct = Math.round((sessions_remaining / session_limit) * 100);

  return (
    <div className={cn(
      "rounded-2xl border p-4",
      isLow
        ? "border-yellow-500/25 bg-yellow-500/5"
        : "border-white/10 bg-white/[0.04]"
    )}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div className={cn(
            "w-2 h-2 rounded-full",
            isLow ? "bg-yellow-400" : "bg-emerald-400"
          )} />
          <span className={cn(
            "text-xs font-semibold uppercase tracking-wide",
            isLow ? "text-yellow-300" : "text-white/60"
          )}>
            {plan_type === "free" ? "Free Plan" : `${plan_type} · ${billing_period}`}
          </span>
        </div>
        <span className={cn(
          "text-xs font-bold",
          isLow ? "text-yellow-300" : "text-white"
        )}>
          {sessions_remaining}/{session_limit}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden mb-2">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            isLow ? "bg-yellow-400" : "bg-emerald-400"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-white/50 text-xs flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {duration_limit_mins} min / session
        </p>
        <p className={cn(
          "text-xs",
          isLow ? "text-yellow-300" : "text-white/40"
        )}>
          {sessions_remaining} left
        </p>
      </div>

      {isLow && (
        <button
          onClick={onUpgrade}
          className="mt-3 w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold px-3 py-1.5 rounded-xl text-xs hover:from-yellow-300 hover:to-orange-300 transition-all"
        >
          <Crown className="w-3.5 h-3.5" />
          Upgrade for more
        </button>
      )}
    </div>
  );
}

/* ================== MAIN ================== */

export default function CopilotLaunchpad({ mode }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { sessionQuota, isPaidUser } = useAppData(); // ✅ Get quota from context

  /* -------------------- STEPS -------------------- */
  const [step, setStep] = useState(1);

  /* -------------------- PERSONA -------------------- */
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [selectedPersonaData, setSelectedPersonaData] = useState(null);

  /* -------------------- DOMAIN -------------------- */
  const [selectedDomain, setSelectedDomain] = useState(null);

  /* -------------------- UI STATES -------------------- */
  const [showSettings, setShowSettings] = useState(false);
  const [processingResume, setProcessingResume] = useState(false);
  const [launching, setLaunching] = useState(false);

  /* -------------------- QUOTA CHECKS -------------------- */
  // ✅ Free user with 0 sessions → block launch
  const freeSessionsExhausted = !isPaidUser &&
    sessionQuota !== null &&
    !sessionQuota?.is_unlimited &&
    sessionQuota?.sessions_remaining === 0;

  /* -------------------- PERSONA SELECT -------------------- */
  const handlePersonaSelect = async (personaId, personaData) => {
    setSelectedPersona(personaId);
    setSelectedPersonaData(personaData);

    if (personaData.resume_url && !personaData.resume_text) {
      setProcessingResume(true);
      try {
        const res = await fetch(`${API}/persona/${personaId}`);
        const result = await res.json();
        if (result?.resume_text) {
          setSelectedPersonaData(result);
        }
      } catch (err) {
        console.error("[LAUNCHPAD] Resume fetch failed", err);
      } finally {
        setProcessingResume(false);
      }
    }

    setStep(2);
  };

  /* -------------------- DOMAIN SELECT -------------------- */
  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain);
    setStep(3);
  };

  /* -------------------- LAUNCH -------------------- */
  const handleLaunch = async () => {
    if (!selectedPersona || !selectedDomain || launching) return;

    // ✅ Block if free sessions exhausted
    if (freeSessionsExhausted) {
      navigate("/pricing", {
        state: { message: "You have used all your free sessions. Upgrade to continue." }
      });
      return;
    }

    try {
      setLaunching(true);

      // Get selected KB IDs from user-specific localStorage
      const selectedKBIds = (() => {
        try {
          if (!user?.id) return [];
          const key = `selectedKBIds_${user.id}`;
          const stored = localStorage.getItem(key);
          if (!stored) return [];
          const parsed = JSON.parse(stored);
          return Array.isArray(parsed) ? parsed.slice(0, 3) : [];
        } catch {
          return [];
        }
      })();

      console.log("📚 [LAUNCH] Selected KB IDs:", selectedKBIds);

      const payload = {
        user_id: user?.id || "anonymous",
        persona_id: selectedPersona,
        custom_style_prompt: null,
        knowledge_base_ids: selectedKBIds,
      };

      const res = await fetch(`${API}/session/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // ✅ Handle 403 quota exceeded from backend
      if (res.status === 403) {
        const errData = await res.json();
        const code = errData?.detail?.code;
        if (code === "SESSION_QUOTA_EXCEEDED") {
          navigate("/pricing", {
            state: {
              message: errData?.detail?.message || "Session quota exceeded.",
            }
          });
          return;
        }
        throw new Error("Access denied");
      }

      if (!res.ok) throw new Error("Session init failed");

      const data = await res.json();

      console.log("✅ Session Initialized:", {
        session_id:           data.session_id,
        settings:             data.settings,
        persona_data:         data.persona_data,
        cached_system_prompt: data.cached_system_prompt,
        knowledge_base_ids:   selectedKBIds,
      });

      sessionStorage.setItem("launchAuthorized", "true");
      sessionStorage.setItem("sessionId", data.session_id);

      // Routing based on domain
      let targetRoute = mode === "mock" ? "/mock-interview" : "/interview-assist";
      let featureName = "Interview Assistant";

      if (selectedDomain === "Coding Interview") {
        targetRoute = "/interview/coding";
        featureName = "Coding Interview";
      } else if (selectedDomain === "Online Assessment") {
        targetRoute = "/interview/online-assessment";
        featureName = "Online Assessment";
      } else if (selectedDomain === "Phone Interview") {
        targetRoute = "/interview/phone";
        featureName = "Phone Interview";
      } else if (selectedDomain === "Professional Meeting") {
        targetRoute = "/interview/meeting";
        featureName = "Meeting Copilot";
      }

      navigate(targetRoute, {
        state: {
          personaId: selectedPersona,
          personaData: selectedPersonaData,
          domain: selectedDomain,
          sessionId: data.session_id,
          sessionData: data,
          knowledgeBaseIds: selectedKBIds,
          isMockMode: mode === "mock",
          featureName: featureName,
        },
      });
    } catch (err) {
      console.error("[COPILOT] Launch failed:", err);
      alert("Failed to start session. Please try again.");
    } finally {
      setLaunching(false);
    }
  };

  /* -------------------- STEP EDIT -------------------- */
  const handleEditStep = (stepNumber) => {
    if (stepNumber <= step) {
      setStep(stepNumber);
      if (stepNumber === 1) {
        setSelectedPersona(null);
        setSelectedPersonaData(null);
        setSelectedDomain(null);
      } else if (stepNumber === 2) {
        setSelectedDomain(null);
      }
    }
  };

  const canLaunch = useMemo(() => {
    return (
      step === 3 &&
      !!selectedPersona &&
      !!selectedDomain &&
      !processingResume &&
      !launching &&
      !freeSessionsExhausted  // ✅ Block if no sessions left
    );
  }, [step, selectedPersona, selectedDomain, processingResume, launching, freeSessionsExhausted]);

  const headerTitle =
    step === 1
      ? "Pick a Persona"
      : step === 2
      ? "Choose Interview Domain"
      : "";

  const headerSubtitle =
    step === 1
      ? "Select a persona (job + company + resume) to set interview context."
      : step === 2
      ? "Pick your interview domain to guide AI tone and examples."
      : "";

  return (
    <div className="min-h-screen bg-[#070A0F] text-white overflow-x-hidden">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.22),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.18),transparent_50%),radial-gradient(circle_at_50%_95%,rgba(236,72,153,0.14),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-6 md:py-10">
        {/* TOP BAR */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5">
              <Sparkles className="h-4 w-4 text-white/70" />
              <span className="text-xs text-white/70">Copilot Launch</span>
              <span className="mx-1 h-3 w-px bg-white/15" />
              <span className="text-xs text-white/55">
                Step {step} of 3
              </span>
            </div>

            <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
              Launch your interview session
              <span className="text-white/60"> in minutes</span>
            </h1>

            <p className="mt-2 text-white/60 max-w-2xl text-sm sm:text-base">
              Configure persona, interview domain, review setup, and start your
              real-time Interview Copilot.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm hover:bg-white/[0.1]"
              onClick={() => setShowSettings(true)}
            >
              <Settings className="h-4 w-4" />
              Settings
            </button>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT PANEL */}
          <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 sm:p-6 lg:sticky lg:top-10 space-y-6">

              {/* Setup Progress */}
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Setup Progress</p>
                  <Chip>
                    {step === 1 ? "Persona" : step === 2 ? "Domain" : "Confirm"}
                  </Chip>
                </div>

                <div className="mt-6 space-y-5">
                  {/* STEP 1 */}
                  <div className="flex items-start gap-4">
                    <StepDot active={step === 1} done={step > 1} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">Persona</p>
                        {step > 1 && (
                          <button
                            className="text-xs text-white/60 hover:text-white"
                            onClick={() => handleEditStep(1)}
                          >
                            Edit
                          </button>
                        )}
                      </div>

                      <p className="text-xs text-white/55 mt-1">
                        {selectedPersonaData
                          ? `${selectedPersonaData.position || "Role"} @ ${
                              selectedPersonaData.company_name || "Company"
                            }`
                          : "Choose a persona to load role and resume context."}
                      </p>

                      {processingResume && (
                        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-yellow-400/25 bg-yellow-400/10 text-yellow-100 px-3 py-1 text-xs">
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          Processing resume…
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="ml-[18px] h-6 w-px bg-gradient-to-b from-white/20 to-transparent" />

                  {/* STEP 2 */}
                  <div className={cn("flex items-start gap-4", step < 2 && "opacity-60")}>
                    <StepDot active={step === 2} done={step > 2} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">Interview Domain</p>
                        {step > 2 && (
                          <button
                            className="text-xs text-white/60 hover:text-white"
                            onClick={() => handleEditStep(2)}
                          >
                            Edit
                          </button>
                        )}
                      </div>

                      <p className="text-xs text-white/55 mt-1">
                        {selectedDomain || "Select a domain to guide tone and examples."}
                      </p>
                    </div>
                  </div>

                  <div className="ml-[18px] h-6 w-px bg-gradient-to-b from-white/20 to-transparent" />

                  {/* STEP 3 */}
                  <div className={cn("flex items-start gap-4", step < 3 && "opacity-60")}>
                    <StepDot active={step === 3} />
                    <div className="flex-1">
                      <p className="font-semibold">Confirm & Launch</p>
                      <p className="text-xs text-white/55 mt-1">
                        Review everything and start your interview copilot.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ SESSION QUOTA WIDGET — divider ke baad */}
              <div className="border-t border-white/10 pt-5">
                <p className="text-xs text-white/40 uppercase tracking-wide font-semibold mb-3">
                  Session Quota
                </p>
                <SessionQuotaWidget
                  sessionQuota={sessionQuota}
                  isPaidUser={isPaidUser}
                  onUpgrade={() => navigate("/pricing")}
                />
              </div>

              {/* LAUNCH BUTTON */}
              <div className="border-t border-white/10 pt-5">
                <button
                  onClick={handleLaunch}
                  disabled={!canLaunch}
                  className={cn(
                    "w-full rounded-2xl py-4 px-5 font-semibold flex items-center justify-center gap-2 transition-all",
                    canLaunch
                      ? "bg-white text-black shadow-md hover:bg-white/90 active:bg-white/80"
                      : "bg-white/10 text-white/35 cursor-not-allowed"
                  )}
                >
                  {launching ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Launching session…
                    </>
                  ) : (
                    <>
                      <Rocket className="h-5 w-5" />
                      Launch Interview Copilot
                    </>
                  )}
                </button>

                {/* ✅ Status message under button */}
                <p className="mt-3 text-center text-[11px] text-white/50 italic">
                  {launching
                    ? "Initializing interview session…"
                    : freeSessionsExhausted
                    ? "⚠️ No sessions remaining. Upgrade to continue."
                    : canLaunch
                    ? "✓ All set. You're ready to launch."
                    : "Complete setup steps to enable launch."}
                </p>

                <div className="mt-3 flex justify-center">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px]">
                    Launch Protected
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">
            <Card
              title={headerTitle}
              subtitle={headerSubtitle}
              right={
                <Chip>
                  {step === 1 ? "Select" : step === 2 ? "Choose" : "Review"}
                </Chip>
              }
            >
              <div className="min-h-[320px]">
                {step === 1 && (
                  <PersonaSelection onSelect={handlePersonaSelect} />
                )}
                {step === 2 && (
                  <InterviewDomainSelection onSelect={handleDomainSelect} />
                )}
                {step === 3 && (
                  <LaunchChecklist
                    persona={selectedPersona}
                    personaData={selectedPersonaData}
                    domain={selectedDomain}
                  />
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* SETTINGS MODAL */}
        {showSettings && (
          <SettingsModal onClose={() => setShowSettings(false)} />
        )}
      </div>
    </div>
  );
}














