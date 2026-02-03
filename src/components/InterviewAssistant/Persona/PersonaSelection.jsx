// import React, { useState } from "react";
// import { Search, Plus, Loader2, AlertCircle, ChevronRight } from "lucide-react";
// import { useAuth } from "../../Auth/AuthContext";
// import PersonaDetailsModal from "./PersonaDetailsModal";
// import { useAppData } from "../../../context/AppDataContext";

// function cn(...c) {
//   return c.filter(Boolean).join(" ");
// }

// function Pill({ children, tone = "neutral" }) {
//   const cls =
//     tone === "good"
//       ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
//       : tone === "muted"
//       ? "border-white/10 bg-white/[0.04] text-white/60"
//       : "border-white/10 bg-white/[0.05] text-white/70";

//   return (
//     <span
//       className={cn(
//         "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold"
//           // ⭐ RESPONSIVE: text remains fine on mobile
//         ,
//         cls
//       )}
//     >
//       {children}
//     </span>
//   );
// }

// function InitialBadge({ letter, isSample }) {
//   return (
//     <div
//       className={cn(
//         // ⭐ RESPONSIVE: smaller avatar on mobile
//         "h-10 w-10 sm:h-11 sm:w-11 rounded-2xl border grid place-items-center font-semibold flex-shrink-0",
//         isSample
//           ? "border-white/10 bg-white/[0.04] text-white/70"
//           : "border-white/15 bg-white text-black"
//       )}
//     >
//       {letter}
//     </div>
//   );
// }

// function PersonaRow({ persona, onClick }) {
//   const initial = persona.company_name?.charAt(0)?.toUpperCase() || "?";
//   const isSample = !!persona.is_sample;

//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={cn(
//         "group w-full text-left rounded-2xl border transition-all",
//         "border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15",
//         "focus:outline-none focus:ring-2 focus:ring-white/15"
//       )}
//     >
//       {/* ⭐ RESPONSIVE: stack gap smaller on mobile */}
//       <div className="p-4 flex items-start gap-3 sm:gap-4">
//         <InitialBadge letter={initial} isSample={isSample} />

//         <div className="min-w-0 flex-1">
//           <div className="flex items-start justify-between gap-3">
//             <div className="min-w-0">
//               {/* ⭐ RESPONSIVE: title wraps nicely on mobile */}
//               <div className="flex flex-wrap items-center gap-2">
//                 <h3 className="text-white font-semibold tracking-tight truncate max-w-full">
//                   {persona.position || "Untitled Role"}
//                 </h3>

//                 {isSample && <Pill tone="muted">Sample</Pill>}
//                 {persona.resume_filename && <Pill tone="good">Resume</Pill>}
//               </div>

//               <p className="mt-1 text-sm text-white/55 truncate">
//                 @{persona.company_name || "Company"}
//               </p>
//             </div>

//             {/* ⭐ RESPONSIVE: arrow smaller on mobile */}
//             <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-2xl border border-white/10 bg-white/[0.04] grid place-items-center text-white/60 group-hover:text-white group-hover:bg-white/[0.06] transition">
//               <ChevronRight className="h-5 w-5" />
//             </div>
//           </div>

//           {persona.company_description && (
//             <p className="mt-3 text-sm text-white/45 line-clamp-2 leading-relaxed">
//               {persona.company_description}
//             </p>
//           )}
//         </div>
//       </div>
//     </button>
//   );
// }

// export default function PersonaSelection({ onSelect }) {
//   const { user } = useAuth();
//   const { personas, loading, error } = useAppData();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedPersona, setSelectedPersona] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const validPersonas = (personas || []).filter((p) => {
//     // Exclude Knowledge Base items
//     return !(p.company_name === "Knowledge Base" || p.is_resume_only);
//   });

//   const filteredPersonas = validPersonas.filter((persona) => {
//     const term = searchTerm.toLowerCase();
//     return (
//       persona.company_name?.toLowerCase().includes(term) ||
//       persona.position?.toLowerCase().includes(term)
//     );
//   });

//   const handlePersonaClick = (persona) => {
//     setSelectedPersona(persona);
//     setShowModal(true);
//   };

//   const handleSelectPersona = (persona) => {
//     setShowModal(false);
//     onSelect(persona.id, persona);
//   };

//   /* ---------------- LOADING ---------------- */
//   if (loading) {
//     return (
//       <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
//         <div className="flex flex-col items-center justify-center py-12 gap-4">
//           <div className="h-12 w-12 rounded-2xl border border-white/10 bg-white/[0.05] grid place-items-center">
//             <Loader2 className="w-6 h-6 text-white/80 animate-spin" />
//           </div>
//           <p className="text-white/55 text-sm">Loading personas…</p>
//         </div>
//       </div>
//     );
//   }

//   /* ---------------- ERROR ---------------- */
//   if (!loading && error && (personas || []).length === 0) {
//     return (
//       <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
//         <div className="flex flex-col items-center justify-center py-10 gap-4">
//           <div className="h-12 w-12 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 grid place-items-center">
//             <AlertCircle className="w-6 h-6 text-yellow-200" />
//           </div>

//           <p className="text-white/60 text-sm text-center max-w-md">
//             {error}
//           </p>

//           <button
//             onClick={() => (window.location.href = "/personas")}
//             className="inline-flex items-center gap-2 rounded-2xl bg-white text-black font-semibold px-5 py-2.5 hover:bg-white/90 transition-colors"
//           >
//             <Plus className="w-4 h-4" />
//             Create Your First Persona
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const total = validPersonas.length;
//   const shown = filteredPersonas.length;

//   return (
//     <>
//       <div className="rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden">

//         {/* ⭐ RESPONSIVE HEADER */}
//         <div className="px-5 sm:px-6 py-5 border-b border-white/10 bg-gradient-to-r from-white/[0.06] to-transparent">
//           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
//             <div>
//               <h2 className="text-white text-lg font-semibold">
//                 Choose a Persona
//               </h2>
//               <p className="text-white/55 text-sm mt-1">
//                 Select an existing persona or create a new one.
//               </p>
//             </div>

//             <div className="flex flex-row items-center gap-4 self-start sm:flex-col sm:items-center sm:gap-2">
//               <button
//                 onClick={() => (window.location.href = "/interview/personas")}
//                 className="inline-flex items-center gap-2 rounded-2xl bg-white text-black font-semibold px-4 py-2.5 hover:bg-white/90">
//                 <Plus className="w-4 h-4" />
//                 New
//               </button>
//               <Pill tone="muted">{shown} / {total}</Pill>
//             </div>
//           </div>

//           {/* Search */}
//           <div className="mt-5 relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search by company or position…"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full rounded-2xl border border-white/10 bg-black/30 pl-10 pr-4 py-3 text-sm text-white"
//             />
//           </div>
//         </div>

//         {/* List */}
//         <div className="p-4 sm:p-6">
//           {filteredPersonas.length === 0 ? (
//             <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 text-center">
//               <p className="text-white/60 text-sm">
//                 No personas found.
//               </p>
//             </div>
//           ) : (
//             // ⭐ RESPONSIVE: height adjusts on small screens
//             <div className="space-y-3 max-h-[60vh] sm:max-h-[560px] overflow-y-auto pr-2 custom-scrollbar">
//               {filteredPersonas.map((persona) => (
//                 <PersonaRow
//                   key={persona.id}
//                   persona={persona}
//                   onClick={() => handlePersonaClick(persona)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Bottom */}
//         <div className="px-5 sm:px-6 py-5 border-t border-white/10 bg-black/20">
//           <button
//             onClick={() => (window.location.href = "/interview/personas")}
//             className="w-full rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.08] text-white font-semibold py-3 flex items-center justify-center gap-2"
//           >
//             <Plus className="w-4 h-4" />
//             Manage Personas
//           </button>
//         </div>
//       </div>

//       {showModal && selectedPersona && (
//         <PersonaDetailsModal
//           persona={selectedPersona}
//           onClose={() => setShowModal(false)}
//           onSelect={handleSelectPersona}
//           showSelectButton
//         />
//       )}

//       <style>{`
//         .custom-scrollbar::-webkit-scrollbar { width: 8px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 999px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.16); border-radius: 999px; }
//       `}</style>
//     </>
//   );
// }




import React, { useState } from "react";
import {
  Search,
  Plus,
  Loader2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../Auth/AuthContext";
import PersonaDetailsModal from "./PersonaDetailsModal";
import { useAppData } from "../../../context/AppDataContext";

function cn(...c) {
  return c.filter(Boolean).join(" ");
}

/* ------------------ UI ATOMS ------------------ */

function Pill({ children, tone = "neutral" }) {
  const cls =
    tone === "good"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
      : tone === "muted"
      ? "border-white/10 bg-white/[0.04] text-white/60"
      : "border-white/10 bg-white/[0.05] text-white/70";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
        cls
      )}
    >
      {children}
    </span>
  );
}

function InitialBadge({ letter, isSample }) {
  return (
    <div
      className={cn(
        "h-10 w-10 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl",
        "border grid place-items-center font-semibold flex-shrink-0",
        isSample
          ? "border-white/10 bg-white/[0.04] text-white/70"
          : "border-white/15 bg-white text-black"
      )}
    >
      {letter}
    </div>
  );
}

/* ------------------ PERSONA ROW ------------------ */

function PersonaRow({ persona, onClick }) {
  const initial = persona.company_name?.charAt(0)?.toUpperCase() || "?";
  const isSample = !!persona.is_sample;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group w-full rounded-2xl border text-left transition",
        "border-white/10 bg-white/[0.03]",
        "hover:bg-white/[0.06] hover:border-white/15",
        "focus:outline-none focus:ring-2 focus:ring-white/15"
      )}
    >
      <div className="p-4 sm:p-5 flex gap-3 sm:gap-4 items-start">
        <InitialBadge letter={initial} isSample={isSample} />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-white font-semibold truncate">
                  {persona.position || "Untitled Role"}
                </h3>

                {isSample && <Pill tone="muted">Sample</Pill>}
                {persona.resume_filename && <Pill tone="good">Resume</Pill>}
              </div>

              <p className="mt-1 text-sm text-white/55 truncate">
                @{persona.company_name || "Company"}
              </p>
            </div>

            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.04] grid place-items-center text-white/60 group-hover:text-white group-hover:bg-white/[0.06] transition">
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>

          {persona.company_description && (
            <p className="mt-3 text-sm text-white/45 line-clamp-2 leading-relaxed">
              {persona.company_description}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

/* ------------------ MAIN ------------------ */

export default function PersonaSelection({ onSelect }) {
  const { user } = useAuth();
  const { personas, loading, error } = useAppData();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const validPersonas = (personas || []).filter(
    (p) => !(p.company_name === "Knowledge Base" || p.is_resume_only)
  );

  const filteredPersonas = validPersonas.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.company_name?.toLowerCase().includes(term) ||
      p.position?.toLowerCase().includes(term)
    );
  });

  /* ----------- LOADING ----------- */

  if (loading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <div className="flex flex-col items-center py-12 gap-4">
          <div className="h-12 w-12 rounded-2xl border border-white/10 bg-white/[0.05] grid place-items-center">
            <Loader2 className="w-6 h-6 animate-spin text-white/80" />
          </div>
          <p className="text-white/55 text-sm">Loading personas…</p>
        </div>
      </div>
    );
  }

  /* ----------- ERROR ----------- */

  if (!loading && error && validPersonas.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <div className="flex flex-col items-center py-10 gap-4 text-center">
          <div className="h-12 w-12 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 grid place-items-center">
            <AlertCircle className="w-6 h-6 text-yellow-200" />
          </div>

          <p className="text-white/60 text-sm max-w-md">{error}</p>

          <button
            onClick={() => (window.location.href = "/interview/personas")}
            className="inline-flex items-center gap-2 rounded-2xl bg-white text-black font-semibold px-5 py-2.5 hover:bg-white/90"
          >
            <Plus className="w-4 h-4" />
            Create Your First Persona
          </button>
        </div>
      </div>
    );
  }

  const total = validPersonas.length;
  const shown = filteredPersonas.length;

  return (
    <>
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden">
        {/* Header */}
        <div className="px-5 sm:px-6 py-5 border-b border-white/10 bg-gradient-to-r from-white/[0.06] to-transparent">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h2 className="text-white text-lg font-semibold">
                Choose a Persona
              </h2>
              <p className="text-white/55 text-sm mt-1">
                Select an existing persona or create a new one.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => (window.location.href = "/interview/personas")}
                className="inline-flex items-center gap-2 rounded-2xl bg-white text-black font-semibold px-4 py-2.5 hover:bg-white/90"
              >
                <Plus className="w-4 h-4" />
                New
              </button>
              <Pill tone="muted">
                {shown} / {total}
              </Pill>
            </div>
          </div>

          {/* Search */}
          <div className="mt-5 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by company or position…"
              className="w-full rounded-2xl border border-white/10 bg-black/30 pl-10 pr-4 py-3 text-sm text-white"
            />
          </div>
        </div>

        {/* List */}
        <div className="p-4 sm:p-6">
          {filteredPersonas.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 text-center">
              <p className="text-white/60 text-sm">No personas found.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[55vh] sm:max-h-[560px] overflow-y-auto pr-1 custom-scrollbar">
              {filteredPersonas.map((persona) => (
                <PersonaRow
                  key={persona.id}
                  persona={persona}
                  onClick={() => {
                    setSelectedPersona(persona);
                    setShowModal(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-4 border-t border-white/10 bg-black/20">
          <button
            onClick={() => (window.location.href = "/interview/personas")}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.08] text-white font-semibold py-3 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Manage Personas
          </button>
        </div>
      </div>

      {showModal && selectedPersona && (
        <PersonaDetailsModal
          persona={selectedPersona}
          onClose={() => setShowModal(false)}
          onSelect={(p) => {
            setShowModal(false);
            onSelect(p.id, p);
          }}
          showSelectButton
        />
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.16); border-radius: 999px; }
      `}</style>
    </>
  );
}
