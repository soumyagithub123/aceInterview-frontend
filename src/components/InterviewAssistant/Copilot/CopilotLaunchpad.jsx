// import React, { useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Settings,
//   HelpCircle,
//   Rocket,
//   CheckCircle,
//   ChevronRight,
//   Sparkles,
//   ShieldCheck,
//   Loader2,
// } from "lucide-react";

// import PersonaSelection from "../Persona/PersonaSelection";
// import InterviewDomainSelection from "./InterviewDomainSelection";
// import LaunchChecklist from "./LaunchChecklist";
// import SettingsModal from "../Settings/SettingsModal";

// function cn(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// function StepDot({ active, done }) {
//   return (
//     <div
//       className={cn(
//         "relative grid place-items-center h-9 w-9 rounded-full border transition-all shrink-0",
//         done
//           ? "bg-emerald-500/15 border-emerald-400/30"
//           : active
//           ? "bg-white/10 border-white/25"
//           : "bg-white/5 border-white/10"
//       )}
//     >
//       {done ? (
//         <CheckCircle className="h-5 w-5 text-emerald-300" />
//       ) : (
//         <div
//           className={cn(
//             "h-2.5 w-2.5 rounded-full",
//             active ? "bg-white" : "bg-white/35"
//           )}
//         />
//       )}
//     </div>
//   );
// }

// function Chip({ tone = "neutral", children }) {
//   const styles =
//     tone === "ok"
//       ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
//       : tone === "warn"
//       ? "border-yellow-400/25 bg-yellow-400/10 text-yellow-100"
//       : "border-white/15 bg-white/5 text-white/75";
//   return (
//     <span className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs whitespace-nowrap", styles)}>
//       {children}
//     </span>
//   );
// }

// function Card({ title, subtitle, right, children }) {
//   return (
//     <div className="rounded-3xl border border-white/10 bg-white/[0.06] shadow-[0_30px_80px_-60px_rgba(0,0,0,0.9)] overflow-hidden">
//       <div className="px-6 py-5 border-b border-white/10 bg-gradient-to-r from-white/[0.08] to-transparent">
//         <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
//           <div className="min-w-0">
//             <h2 className="text-white text-base font-semibold tracking-tight">{title}</h2>
//             {subtitle ? <p className="mt-1 text-sm text-white/60">{subtitle}</p> : null}
//           </div>
//           {right ? <div className="flex-shrink-0">{right}</div> : null}
//         </div>
//       </div>
//       <div className="p-4 md:p-6">{children}</div>
//     </div>
//   );
// }

// export default function CopilotLaunchpad() {
//   const navigate = useNavigate();

//   // Steps
//   const [step, setStep] = useState(1);

//   // Persona
//   const [selectedPersona, setSelectedPersona] = useState(null);
//   const [selectedPersonaData, setSelectedPersonaData] = useState(null);

//   // Domain
//   const [selectedDomain, setSelectedDomain] = useState(null);

//   // UI states
//   const [showSettings, setShowSettings] = useState(false);
//   const [processingResume, setProcessingResume] = useState(false);

//   // Backend base URL
//   const API = "https://verve-ai-ukec.onrender.com";

//   // -------------------------------
//   // HANDLE PERSONA SELECTION
//   // -------------------------------
//   const handlePersonaSelect = async (personaId, personaData) => {
//     setSelectedPersona(personaId);
//     setSelectedPersonaData(personaData);

//     // If resume_text NOT already loaded → fetch from backend
//     if (personaData.resume_url && !personaData.resume_text) {
//       setProcessingResume(true);
//       try {
//         console.log("Fetching full persona:", personaId);

//         const res = await fetch(`${API}/persona/${personaId}`);
//         const result = await res.json();

//         if (result.resume_text) {
//           console.log("Resume loaded successfully");
//           setSelectedPersonaData(result);
//         } else {
//           console.warn("Resume not processed yet");
//         }
//       } catch (error) {
//         console.error("Resume fetch error:", error);
//       } finally {
//         setProcessingResume(false);
//       }
//     }

//     setStep(2);
//   };

//   // -------------------------------
//   // HANDLE DOMAIN SELECTION
//   // -------------------------------
//   const handleDomainSelect = (domain) => {
//     setSelectedDomain(domain);
//     setStep(3);
//   };

//   // -------------------------------
//   // LAUNCH Q&A COPILOT
//   // -------------------------------
//   const handleLaunch = () => {
//     if (!selectedPersona || !selectedDomain) {
//       alert("Please complete all steps before launching");
//       return;
//     }

//     sessionStorage.setItem("launchAuthorized", "true");

//     navigate("/interview-assist", {
//       state: {
//         personaId: selectedPersona,
//         personaData: selectedPersonaData,
//         domain: selectedDomain,
//       },
//     });
//   };

//   // -------------------------------
//   // RESET STEP LOGIC
//   // -------------------------------
//   const handleEditStep = (stepNumber) => {
//     if (stepNumber <= step) {
//       setStep(stepNumber);

//       if (stepNumber === 1) {
//         setSelectedPersona(null);
//         setSelectedPersonaData(null);
//         setSelectedDomain(null);
//       } else if (stepNumber === 2) {
//         setSelectedDomain(null);
//       }
//     }
//   };

//   const canLaunch = useMemo(() => {
//     return step >= 3 && !!selectedPersona && !!selectedDomain && !processingResume;
//   }, [step, selectedPersona, selectedDomain, processingResume]);

//   const headerTitle =
//     step === 1 ? "Pick a Persona" : step === 2 ? "Choose Interview Domain" :"";

//   const headerSubtitle =
//     step === 1
//       ? "Select a persona to set company + role context."
//       : step === 2
//       ? "Pick a domain to tailor the interview responses."
//       : "";

//   return (
//     <div className="min-h-screen bg-[#070A0F] text-white overflow-x-hidden">
//       {/* Background */}
//       <div className="pointer-events-none fixed inset-0">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.22),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.18),transparent_50%),radial-gradient(circle_at_50%_95%,rgba(236,72,153,0.14),transparent_55%)]" />
//         <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />
//         <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/50" />
//       </div>

//       <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-6 md:py-10">
//         {/* Top bar */}
//         <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
//           <div className="min-w-0">
//             <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5">
//               <Sparkles className="h-4 w-4 text-white/70" />
//               <span className="text-xs text-white/70">Copilot Launch</span>
//               <span className="mx-1 h-3 w-px bg-white/15" />
//               <span className="text-xs text-white/55">Step {step} of 3</span>
//             </div>

//             <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
//               Launch your interview session
//               <span className="text-white/60"> in minutes</span>
//             </h1>

//             <p className="mt-2 text-white/60 max-w-2xl text-sm sm:text-base">
//               Configure persona + domain, verify readiness, then start the Copilot.
//             </p>
//           </div>

//           <div className="flex items-center gap-3"> 
//             <button
//               type="button"
//               className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/[0.10] transition-colors"
//             >
//               <HelpCircle className="h-4 w-4" />
//               Help
//             </button>

//             <button
//               type="button"
//               className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/[0.10] transition-colors"
//               onClick={() => setShowSettings(true)}
//             >
//               <Settings className="h-4 w-4" />
//               Settings
//             </button>
//           </div>
//         </div>

//         {/* Main */}
//         <div className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
//           {/* Left: Setup Summary */}
//           <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
//             <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 sm:p-6 lg:sticky lg:top-10">
//               <div className="flex items-center justify-between">
//                 <p className="text-sm font-semibold">Setup Progress</p>
//                 <Chip>{step === 1 ? "Persona" : step === 2 ? "Domain" : "Confirm"}</Chip>
//               </div>

//               <div className="mt-6 space-y-5">
//                 {/* Step 1 */}
//                 <div className="flex items-start gap-4">
//                   <StepDot active={step === 1} done={step > 1} />
//                   <div className="min-w-0 flex-1">
//                     <div className="flex items-center justify-between gap-3">
//                       <p className="font-semibold text-sm sm:text-base">Persona</p>
//                       {step > 1 ? (
//                         <button
//                           onClick={() => handleEditStep(1)}
//                           className="text-xs text-white/60 hover:text-white transition-colors"
//                         >
//                           Edit
//                         </button>
//                       ) : null}
//                     </div>
//                     <p className="text-xs sm:text-sm text-white/55 mt-1">
//                       {selectedPersonaData
//                         ? `${selectedPersonaData.position ?? "Role"} @ ${selectedPersonaData.company_name ?? "Company"}`
//                         : "Select a persona to load role/company context."}
//                     </p>

//                     {step === 1 ? (
//                       <button
//                         onClick={() => navigate("/interview/personas")}
//                         className="mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-black px-4 py-2.5 text-sm font-semibold hover:bg-white/90 transition-colors"
//                       >
//                         Create Persona <ChevronRight className="h-4 w-4" />
//                       </button>
//                     ) : null}

//                     {step > 1 && selectedPersonaData ? (
//                       <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
//                         <div className="flex items-start justify-between gap-3">
//                           <div className="min-w-0">
//                             <p className="text-sm font-semibold text-white truncate">
//                               {selectedPersonaData.position} @ {selectedPersonaData.company_name}
//                             </p>
//                             {selectedPersonaData.company_description ? (
//                               <p className="mt-1 text-xs text-white/55 line-clamp-2">
//                                 {selectedPersonaData.company_description.substring(0, 140)}…
//                               </p>
//                             ) : null}
//                           </div>
//                           <ShieldCheck className="h-5 w-5 text-white/50 shrink-0" />
//                         </div>

//                         <div className="mt-3 flex flex-wrap items-center justify-center gap-2 ">
//                           {selectedPersonaData.resume_text ? (
//                             <Chip tone="ok">
//                               <span className="max-w-[180px] sm:max-w-none">
//                                 ✓ Resume loaded
//                               </span>
//                             </Chip>
//                           ) : null}
//                           {processingResume ? (
//                             <Chip tone="warn">
//                               <Loader2 className="h-3.5 w-3.5 animate-spin" />
//                               Processing resume…
//                             </Chip>
//                           ) : null}
//                         </div>
//                       </div>
//                     ) : null}
//                   </div>
//                 </div>

//                 <div className="ml-[18px] h-6 w-px bg-gradient-to-b from-white/20 to-transparent" />

//                 {/* Step 2 */}
//                 <div className={cn("flex items-start gap-4", step < 2 && "opacity-60")}>
//                   <StepDot active={step === 2} done={step > 2} />
//                   <div className="min-w-0 flex-1">
//                     <div className="flex items-center justify-between gap-3">
//                       <p className="font-semibold text-sm sm:text-base">Interview Domain</p>
//                       {step > 2 ? (
//                         <button
//                           onClick={() => handleEditStep(2)}
//                           className="text-xs text-white/60 hover:text-white transition-colors"
//                         >
//                           Edit
//                         </button>
//                       ) : null}
//                     </div>
//                     <p className="text-xs sm:text-sm text-white/55 mt-1">
//                       {selectedDomain ? selectedDomain : "Choose a domain to customize the answers."}
//                     </p>

//                     {step > 2 && selectedDomain ? (
//                       <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
//                         <p className="text-sm font-semibold">{selectedDomain}</p>
//                         <p className="mt-1 text-xs text-white/55">
//                           Domain signals tone + examples for more relevant responses.
//                         </p>
//                       </div>
//                     ) : null}
//                   </div>
//                 </div>

//                 <div className="ml-[18px] h-6 w-px bg-gradient-to-b from-white/20 to-transparent" />

//                 {/* Step 3 */}
//                 <div className={cn("flex items-start gap-4", step < 3 && "opacity-60")}>
//                   <StepDot active={step === 3} done={false} />
//                   <div className="min-w-0 flex-1">
//                     <p className="font-semibold text-sm sm:text-base">Confirm</p>
//                     <p className="text-xs sm:text-sm text-white/55 mt-1">
//                       Review selections and launch when ready.
//                     </p>
//                     {step === 3 ? (
//                       <div className="mt-4 rounded-2xl border border-emerald-400/15 bg-emerald-400/10 p-4">
//                         <p className="text-emerald-200 text-sm font-semibold">Ready to launch</p>
//                         <p className="mt-1 text-xs text-emerald-200/70">
//                           Persona + domain selected. Checklist is available on the right.
//                         </p>
//                       </div>
//                     ) : null}
//                   </div>
//                 </div>
//               </div>

//               {/* Launch CTA */}
//               <div className="mt-8 pt-6 border-t border-white/10">
//                 <button
//                   onClick={handleLaunch}
//                   disabled={!canLaunch}
//                   className={cn(
//                     "w-full rounded-2xl py-4 px-5 font-semibold flex items-center justify-center gap-2 transition-all",
//                     canLaunch
//                       ? "bg-gradient-to-r from-white to-white/90 text-black shadow-lg"
//                       : "bg-white/10 text-white/35 cursor-not-allowed"
//                   )}
//                 >
//                   <Rocket className="h-5 w-5" />
//                   {processingResume
//                     ? "Processing resume…"
//                     : step < 3
//                     ? "Complete steps to launch"
//                     : "Launch Interview Copilot"}
//                 </button>

//                 <div className="mt-4 flex flex-col gap-2 text-[10px] sm:text-xs text-white/50">
//                   <p className="text-center italic">
//                     {processingResume
//                       ? "Preparing resume context…"
//                       : canLaunch
//                       ? "✓ All set."
//                       : "Finish setup to enable launch."}
//                   </p>
//                   <span className="self-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1">
//                     Launch Protected
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right: Primary work area */}
//           <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">
//             <Card
//               title={headerTitle}
//               subtitle={headerSubtitle}
//               right={
//                 <div className="hidden sm:block">
//                   <Chip>
//                     {step === 1 ? "Select" : step === 2 ? "Choose" : "Review"}
//                   </Chip>
//                 </div>
//               }
//             >
//               <div className="min-h-[300px]">
//                 {step === 1 && <PersonaSelection onSelect={handlePersonaSelect} />}
//                 {step === 2 && <InterviewDomainSelection onSelect={handleDomainSelect} />}
//                 {step === 3 && (
//                   <LaunchChecklist
//                     persona={selectedPersona}
//                     personaData={selectedPersonaData}
//                     domain={selectedDomain}
//                   />
//                 )}
//               </div>
//             </Card>
//           </div>
//         </div>

//         {/* SETTINGS MODAL */}
//         {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
//       </div>
//     </div>
//   );
// }







import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  HelpCircle,
  Rocket,
  CheckCircle,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Loader2,
} from "lucide-react";

import PersonaSelection from "../Persona/PersonaSelection";
import InterviewDomainSelection from "./InterviewDomainSelection";
import LaunchChecklist from "./LaunchChecklist";
import SettingsModal from "../Settings/SettingsModal";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

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

function Chip({ tone = "neutral", children }) {
  const styles =
    tone === "ok"
      ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
      : tone === "warn"
      ? "border-yellow-400/25 bg-yellow-400/10 text-yellow-100"
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

function Card({ title, subtitle, right, children }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] shadow-[0_30px_80px_-60px_rgba(0,0,0,0.9)] overflow-hidden">
      <div className="px-6 py-5 border-b border-white/10 bg-gradient-to-r from-white/[0.08] to-transparent">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-white text-base font-semibold tracking-tight">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-1 text-sm text-white/60">{subtitle}</p>
            ) : null}
          </div>
          {right ? <div className="flex-shrink-0">{right}</div> : null}
        </div>
      </div>
      <div className="p-4 md:p-6">{children}</div>
    </div>
  );
}

export default function CopilotLaunchpad() {
  const navigate = useNavigate();

  // -----------------------
  // STEPS
  // -----------------------
  const [step, setStep] = useState(1);

  // -----------------------
  // PERSONA
  // -----------------------
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [selectedPersonaData, setSelectedPersonaData] = useState(null);

  // -----------------------
  // DOMAIN
  // -----------------------
  const [selectedDomain, setSelectedDomain] = useState(null);

  // -----------------------
  // UI STATES
  // -----------------------
  const [showSettings, setShowSettings] = useState(false);
  const [processingResume, setProcessingResume] = useState(false);
  const [launching, setLaunching] = useState(false);

  // -----------------------
  // API BASE
  // -----------------------
  const API = import.meta.env.VITE_API_URL || "http://localhost:10000";

  // -----------------------
  // PERSONA SELECT
  // -----------------------
  const handlePersonaSelect = async (personaId, personaData) => {
    console.log("[LAUNCHPAD] Persona selected:", personaId);
    setSelectedPersona(personaId);
    setSelectedPersonaData(personaData);

    if (personaData.resume_url && !personaData.resume_text) {
      setProcessingResume(true);
      try {
        console.log("[LAUNCHPAD] Fetching persona resume…");
        const res = await fetch(`${API}/persona/${personaId}`);
        const result = await res.json();

        if (result?.resume_text) {
          console.log("[LAUNCHPAD] Resume loaded");
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
  // -----------------------
  // DOMAIN SELECT
  // -----------------------
  const handleDomainSelect = (domain) => {
    console.log("[LAUNCHPAD] Domain selected:", domain);
    setSelectedDomain(domain);
    setStep(3);
  };

  // -----------------------
  // LAUNCH COPILOT (PROMPT-1)
  // -----------------------
  const handleLaunch = async () => {
    if (!selectedPersona || !selectedDomain || launching) return;

    try {
      setLaunching(true);
      console.log("[COPILOT] Launch started");
      console.log("[COPILOT] Initializing session with Prompt-1");

      const payload = {
        user_id: "anonymous",
        persona_id: selectedPersona,
        custom_style_prompt: null,
      };

      const res = await fetch(`${API}/session/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Session init failed");
      }

      const data = await res.json();
      console.log("[COPILOT] Session initialized:", data.session_id);

      sessionStorage.setItem("launchAuthorized", "true");
      sessionStorage.setItem("sessionId", data.session_id);

      navigate("/interview-assist", {
        state: {
          personaId: selectedPersona,
          personaData: selectedPersonaData,
          domain: selectedDomain,
          sessionId: data.session_id,
        },
      });
    } catch (err) {
      console.error("[COPILOT] Launch failed:", err);
      alert("Failed to start session. Please try again.");
    } finally {
      setLaunching(false);
    }
  };

  // -----------------------
  // STEP EDIT
  // -----------------------
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
      !launching
    );
  }, [step, selectedPersona, selectedDomain, processingResume, launching]);

  const headerTitle =
    step === 1
      ? "Pick a Persona"
      : step === 2
      ? "Choose Interview Domain"
      : "Review & Launch";

  const headerSubtitle =
    step === 1
      ? "Select a persona to set role, company and resume context."
      : step === 2
      ? "Choose a domain to tailor interview answers."
      : "Confirm everything before starting your live interview session.";

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
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 sm:p-6 lg:sticky lg:top-10">
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
                      <Chip tone="warn" className="mt-3 inline-flex">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Processing resume…
                      </Chip>
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
                      {selectedDomain ||
                        "Select a domain to guide tone and examples."}
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

              {/* LAUNCH BUTTON */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={handleLaunch}
                  disabled={!canLaunch}
                  className={cn(
                    "w-full rounded-2xl py-4 px-5 font-semibold flex items-center justify-center gap-2 transition-all",
                    canLaunch
                      ? "bg-gradient-to-r from-white to-white/90 text-black shadow-lg"
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

                <p className="mt-3 text-center text-[11px] text-white/50 italic">
                  {launching
                    ? "Initializing interview session…"
                    : canLaunch
                    ? "✓ All set. You’re ready to launch."
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
                {step === 1 && <PersonaSelection onSelect={handlePersonaSelect} />}
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
