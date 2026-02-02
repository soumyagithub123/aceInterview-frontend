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

// import PersonaSelection from "./PersonaSelection";
// import InterviewDomainSelection from "./InterviewDomainSelection";
// import LaunchChecklist from "./LaunchChecklist";
// import SettingsModal from "./SettingsModal";

// function cn(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// function StepDot({ active, done }) {
//   return (
//     <div
//       className={cn(
//         "relative grid place-items-center h-9 w-9 rounded-full border transition-all",
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
//     <span className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs", styles)}>
//       {children}
//     </span>
//   );
// }

// function Card({ title, subtitle, right, children }) {
//   return (
//     <div className="rounded-3xl border border-white/10 bg-white/[0.06] shadow-[0_30px_80px_-60px_rgba(0,0,0,0.9)] overflow-hidden">
//       <div className="px-6 py-5 border-b border-white/10 bg-gradient-to-r from-white/[0.08] to-transparent">
//         <div className="flex items-start justify-between gap-4">
//           <div className="min-w-0">
//             <h2 className="text-white text-base font-semibold tracking-tight">{title}</h2>
//             {subtitle ? <p className="mt-1 text-sm text-white/60">{subtitle}</p> : null}
//           </div>
//           {right ? <div className="flex-shrink-0">{right}</div> : null}
//         </div>
//       </div>
//       <div className="p-6">{children}</div>
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
//     step === 1 ? "Pick a Persona" : step === 2 ? "Choose Interview Domain" : "Final Check";

//   const headerSubtitle =
//     step === 1
//       ? "Select a persona to set company + role context."
//       : step === 2
//       ? "Pick a domain to tailor the interview responses."
//       : "Review everything and launch.";

//   return (
//     <div className="min-h-screen bg-[#070A0F] text-white">
//       {/* Background */}
//       <div className="pointer-events-none fixed inset-0">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.22),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.18),transparent_50%),radial-gradient(circle_at_50%_95%,rgba(236,72,153,0.14),transparent_55%)]" />
//         <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />
//         <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/50" />
//       </div>

//       <div className="relative mx-auto max-w-7xl px-6 py-10">
//         {/* Top bar */}
//         <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
//           <div className="min-w-0">
//             <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5">
//               <Sparkles className="h-4 w-4 text-white/70" />
//               <span className="text-xs text-white/70">Copilot Launch</span>
//               <span className="mx-1 h-3 w-px bg-white/15" />
//               <span className="text-xs text-white/55">Step {step} of 3</span>
//             </div>

//             <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
//               Launch your interview session
//               <span className="text-white/60"> in minutes</span>
//             </h1>

//             <p className="mt-2 text-white/60 max-w-2xl">
//               Configure persona + domain, verify readiness, then start the Copilot.
//             </p>
//           </div>

//           <div className="flex items-center gap-2">
//             <button
//               type="button"
//               className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/[0.10] transition-colors"
//               aria-label="Help"
//               title="Help"
//             >
//               <HelpCircle className="h-4 w-4" />
//               Help
//             </button>

//             <button
//               type="button"
//               className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/[0.10] transition-colors"
//               onClick={() => setShowSettings(true)}
//               aria-label="Settings"
//               title="Settings"
//             >
//               <Settings className="h-4 w-4" />
//               Settings
//             </button>
//           </div>
//         </div>

//         {/* Main */}
//         <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
//           {/* Left: Vertical step timeline + summary */}
//           <div className="lg:col-span-4 space-y-6">
//             <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
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
//                       <p className="font-semibold">Persona</p>
//                       {step > 1 ? (
//                         <button
//                           onClick={() => handleEditStep(1)}
//                           className="text-xs text-white/60 hover:text-white transition-colors"
//                         >
//                           Edit
//                         </button>
//                       ) : null}
//                     </div>
//                     <p className="text-sm text-white/55 mt-1">
//                       {selectedPersonaData
//                         ? `${selectedPersonaData.position ?? "Role"} @ ${selectedPersonaData.company_name ?? "Company"}`
//                         : "Select a persona to load role/company context."}
//                     </p>

//                     {step === 1 ? (
//                       <button
//                         onClick={() => navigate("/personas")}
//                         className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-white text-black px-4 py-2.5 text-sm font-semibold hover:bg-white/90 transition-colors"
//                       >
//                         Create Persona <ChevronRight className="h-4 w-4" />
//                       </button>
//                     ) : null}

//                     {step > 1 && selectedPersonaData ? (
//                       <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
//                         <div className="flex items-start justify-between gap-3">
//                           <div className="min-w-0">
//                             <p className="text-sm font-semibold text-white">
//                               {selectedPersonaData.position} @ {selectedPersonaData.company_name}
//                             </p>
//                             {selectedPersonaData.company_description ? (
//                               <p className="mt-1 text-xs text-white/55 line-clamp-2">
//                                 {selectedPersonaData.company_description.substring(0, 140)}…
//                               </p>
//                             ) : null}
//                           </div>
//                           <ShieldCheck className="h-5 w-5 text-white/50" />
//                         </div>

//                         <div className="mt-3 flex flex-wrap items-center gap-2">
//                           {selectedPersonaData.resume_text ? (
//                             <Chip tone="ok">✓ Resume context loaded</Chip>
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

//                 {/* Connector */}
//                 <div className="ml-[18px] h-6 w-px bg-gradient-to-b from-white/20 to-transparent" />

//                 {/* Step 2 */}
//                 <div className={cn("flex items-start gap-4", step < 2 && "opacity-60")}>
//                   <StepDot active={step === 2} done={step > 2} />
//                   <div className="min-w-0 flex-1">
//                     <div className="flex items-center justify-between gap-3">
//                       <p className="font-semibold">Interview Domain</p>
//                       {step > 2 ? (
//                         <button
//                           onClick={() => handleEditStep(2)}
//                           className="text-xs text-white/60 hover:text-white transition-colors"
//                         >
//                           Edit
//                         </button>
//                       ) : null}
//                     </div>
//                     <p className="text-sm text-white/55 mt-1">
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

//                 {/* Connector */}
//                 <div className="ml-[18px] h-6 w-px bg-gradient-to-b from-white/20 to-transparent" />

//                 {/* Step 3 */}
//                 <div className={cn("flex items-start gap-4", step < 3 && "opacity-60")}>
//                   <StepDot active={step === 3} done={false} />
//                   <div className="min-w-0 flex-1">
//                     <p className="font-semibold">Confirm</p>
//                     <p className="text-sm text-white/55 mt-1">
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
//               <div className="mt-6">
//                 <button
//                   onClick={handleLaunch}
//                   disabled={!canLaunch}
//                   className={cn(
//                     "w-full rounded-2xl py-4 px-5 font-semibold flex items-center justify-center gap-2 transition-all",
//                     canLaunch
//                       ? "bg-gradient-to-r from-white to-white/90 text-black hover:opacity-95"
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

//                 <div className="mt-3 flex items-center justify-between text-xs text-white/50">
//                   <span>
//                     {processingResume
//                       ? "Preparing resume context…"
//                       : canLaunch
//                       ? "All set."
//                       : "Finish setup to enable launch."}
//                   </span>
//                   <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1">
//                     Launch Protected
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right: Primary work area */}
//           <div className="lg:col-span-8 space-y-6">
//             <Card
//               title={headerTitle}
//               subtitle={headerSubtitle}
//               right={
//                 <div className="flex items-center gap-2">
//                   <Chip>
//                     {step === 1 ? "Select" : step === 2 ? "Choose" : "Review"}
//                   </Chip>
//                 </div>
//               }
//             >
//               {step === 1 && <PersonaSelection onSelect={handlePersonaSelect} />}
//               {step === 2 && <InterviewDomainSelection onSelect={handleDomainSelect} />}
//               {step === 3 && (
//                 <LaunchChecklist
//                   persona={selectedPersona}
//                   personaData={selectedPersonaData}
//                   domain={selectedDomain}
//                 />
//               )}
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

import PersonaSelection from "./PersonaSelection";
import InterviewDomainSelection from "./InterviewDomainSelection";
import LaunchChecklist from "./LaunchChecklist";
import SettingsModal from "./SettingsModal";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function StepDot({ active, done }) {
  return (
    <div
      className={cn(
        "relative grid place-items-center h-9 w-9 rounded-full border transition-all",
        done
          ? "bg-emerald-50 border-emerald-300 shadow-sm"
          : active
          ? "bg-indigo-50 border-indigo-300 shadow-sm"
          : "bg-gray-50 border-gray-200"
      )}
    >
      {done ? (
        <CheckCircle className="h-5 w-5 text-emerald-600" />
      ) : (
        <div
          className={cn(
            "h-2.5 w-2.5 rounded-full",
            active ? "bg-indigo-600" : "bg-gray-300"
          )}
        />
      )}
    </div>
  );
}

function Chip({ tone = "neutral", children }) {
  const styles =
    tone === "ok"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm"
      : tone === "warn"
      ? "border-amber-200 bg-amber-50 text-amber-700 shadow-sm"
      : "border-gray-200 bg-gray-50 text-gray-700 shadow-sm";
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium", styles)}>
      {children}
    </span>
  );
}

function Card({ title, subtitle, right, children }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-gray-900 text-base font-semibold tracking-tight">{title}</h2>
            {subtitle ? <p className="mt-1 text-sm text-gray-600">{subtitle}</p> : null}
          </div>
          {right ? <div className="flex-shrink-0">{right}</div> : null}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default function CopilotLaunchpad() {
  const navigate = useNavigate();

  // Steps
  const [step, setStep] = useState(1);

  // Persona
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [selectedPersonaData, setSelectedPersonaData] = useState(null);

  // Domain
  const [selectedDomain, setSelectedDomain] = useState(null);

  // UI states
  const [showSettings, setShowSettings] = useState(false);
  const [processingResume, setProcessingResume] = useState(false);

  // Backend base URL
  const API = "https://verve-ai-ukec.onrender.com";

  // -------------------------------
  // HANDLE PERSONA SELECTION
  // -------------------------------
  const handlePersonaSelect = async (personaId, personaData) => {
    setSelectedPersona(personaId);
    setSelectedPersonaData(personaData);

    // If resume_text NOT already loaded → fetch from backend
    if (personaData.resume_url && !personaData.resume_text) {
      setProcessingResume(true);
      try {
        console.log("Fetching full persona:", personaId);

        const res = await fetch(`${API}/persona/${personaId}`);
        const result = await res.json();

        if (result.resume_text) {
          console.log("Resume loaded successfully");
          setSelectedPersonaData(result);
        } else {
          console.warn("Resume not processed yet");
        }
      } catch (error) {
        console.error("Resume fetch error:", error);
      } finally {
        setProcessingResume(false);
      }
    }

    setStep(2);
  };

  // -------------------------------
  // HANDLE DOMAIN SELECTION
  // -------------------------------
  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain);
    setStep(3);
  };

  // -------------------------------
  // LAUNCH Q&A COPILOT
  // -------------------------------
  const handleLaunch = () => {
    if (!selectedPersona || !selectedDomain) {
      alert("Please complete all steps before launching");
      return;
    }

    sessionStorage.setItem("launchAuthorized", "true");

    navigate("/interview-assist", {
      state: {
        personaId: selectedPersona,
        personaData: selectedPersonaData,
        domain: selectedDomain,
      },
    });
  };

  // -------------------------------
  // RESET STEP LOGIC
  // -------------------------------
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
    return step >= 3 && !!selectedPersona && !!selectedDomain && !processingResume;
  }, [step, selectedPersona, selectedDomain, processingResume]);

  const headerTitle =
    step === 1 ? "Pick a Persona" : step === 2 ? "Choose Interview Domain" : "Final Check";

  const headerSubtitle =
    step === 1
      ? "Select a persona to set company + role context."
      : step === 2
      ? "Pick a domain to tailor the interview responses."
      : "Review everything and launch.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Background Pattern */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.08),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.06),transparent_50%),radial-gradient(circle_at_50%_95%,rgba(236,72,153,0.05),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-10">
        {/* Top bar */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1.5 shadow-sm">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span className="text-xs text-gray-700 font-medium">Copilot Launch</span>
              <span className="mx-1 h-3 w-px bg-gray-300" />
              <span className="text-xs text-gray-500">Step {step} of 3</span>
            </div>

            <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Launch your interview session
              <span className="text-gray-500"> in minutes</span>
            </h1>

            <p className="mt-2 text-gray-600 max-w-2xl">
              Configure persona + domain, verify readiness, then start the Copilot.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 hover:shadow-md transition-all duration-200"
              aria-label="Help"
              title="Help"
            >
              <HelpCircle className="h-4 w-4" />
              Help
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 hover:shadow-md transition-all duration-200"
              onClick={() => setShowSettings(true)}
              aria-label="Settings"
              title="Settings"
            >
              <Settings className="h-4 w-4" />
              Settings
            </button>
          </div>
        </div>

        {/* Main */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Vertical step timeline + summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">Setup Progress</p>
                <Chip>{step === 1 ? "Persona" : step === 2 ? "Domain" : "Confirm"}</Chip>
              </div>

              <div className="mt-6 space-y-5">
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <StepDot active={step === 1} done={step > 1} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-gray-900">Persona</p>
                      {step > 1 ? (
                        <button
                          onClick={() => handleEditStep(1)}
                          className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                        >
                          Edit
                        </button>
                      ) : null}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedPersonaData
                        ? `${selectedPersonaData.position ?? "Role"} @ ${selectedPersonaData.company_name ?? "Company"}`
                        : "Select a persona to load role/company context."}
                    </p>

                    {step === 1 ? (
                      <button
                        onClick={() => navigate("/personas")}
                        className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-4 py-2.5 text-sm font-semibold hover:from-indigo-700 hover:to-indigo-800 shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        Create Persona <ChevronRight className="h-4 w-4" />
                      </button>
                    ) : null}

                    {step > 1 && selectedPersonaData ? (
                      <div className="mt-4 rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900">
                              {selectedPersonaData.position} @ {selectedPersonaData.company_name}
                            </p>
                            {selectedPersonaData.company_description ? (
                              <p className="mt-1 text-xs text-gray-600 line-clamp-2">
                                {selectedPersonaData.company_description.substring(0, 140)}…
                              </p>
                            ) : null}
                          </div>
                          <ShieldCheck className="h-5 w-5 text-indigo-500" />
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {selectedPersonaData.resume_text ? (
                            <Chip tone="ok">✓ Resume context loaded</Chip>
                          ) : null}
                          {processingResume ? (
                            <Chip tone="warn">
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              Processing resume…
                            </Chip>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Connector */}
                <div className="ml-[18px] h-6 w-px bg-gradient-to-b from-gray-300 to-transparent" />

                {/* Step 2 */}
                <div className={cn("flex items-start gap-4", step < 2 && "opacity-50")}>
                  <StepDot active={step === 2} done={step > 2} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-gray-900">Interview Domain</p>
                      {step > 2 ? (
                        <button
                          onClick={() => handleEditStep(2)}
                          className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                        >
                          Edit
                        </button>
                      ) : null}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedDomain ? selectedDomain : "Choose a domain to customize the answers."}
                    </p>

                    {step > 2 && selectedDomain ? (
                      <div className="mt-4 rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4 shadow-sm">
                        <p className="text-sm font-semibold text-gray-900">{selectedDomain}</p>
                        <p className="mt-1 text-xs text-gray-600">
                          Domain signals tone + examples for more relevant responses.
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Connector */}
                <div className="ml-[18px] h-6 w-px bg-gradient-to-b from-gray-300 to-transparent" />

                {/* Step 3 */}
                <div className={cn("flex items-start gap-4", step < 3 && "opacity-50")}>
                  <StepDot active={step === 3} done={false} />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900">Confirm</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Review selections and launch when ready.
                    </p>
                    {step === 3 ? (
                      <div className="mt-4 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm">
                        <p className="text-emerald-700 text-sm font-semibold">Ready to launch</p>
                        <p className="mt-1 text-xs text-emerald-600">
                          Persona + domain selected. Checklist is available on the right.
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Launch CTA */}
              <div className="mt-6">
                <button
                  onClick={handleLaunch}
                  disabled={!canLaunch}
                  className={cn(
                    "w-full rounded-2xl py-4 px-5 font-semibold flex items-center justify-center gap-2 transition-all duration-200",
                    canLaunch
                      ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800 shadow-lg hover:shadow-xl"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  )}
                >
                  <Rocket className="h-5 w-5" />
                  {processingResume
                    ? "Processing resume…"
                    : step < 3
                    ? "Complete steps to launch"
                    : "Launch Interview Copilot"}
                </button>

                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {processingResume
                      ? "Preparing resume context…"
                      : canLaunch
                      ? "All set."
                      : "Finish setup to enable launch."}
                  </span>
                  <span className="rounded-full border border-gray-200 bg-white px-2.5 py-1 shadow-sm">
                    Launch Protected
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Primary work area */}
          <div className="lg:col-span-8 space-y-6">
            <Card
              title={headerTitle}
              subtitle={headerSubtitle}
              right={
                <div className="flex items-center gap-2">
                  <Chip>
                    {step === 1 ? "Select" : step === 2 ? "Choose" : "Review"}
                  </Chip>
                </div>
              }
            >
              {step === 1 && <PersonaSelection onSelect={handlePersonaSelect} />}
              {step === 2 && <InterviewDomainSelection onSelect={handleDomainSelect} />}
              {step === 3 && (
                <LaunchChecklist
                  persona={selectedPersona}
                  personaData={selectedPersonaData}
                  domain={selectedDomain}
                />
              )}
            </Card>
          </div>
        </div>

        {/* SETTINGS MODAL */}
        {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      </div>
    </div>
  );
}