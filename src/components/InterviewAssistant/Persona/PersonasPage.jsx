// import React, { useEffect, useState } from "react";
// import {
//   Search,
//   Plus,
//   Loader2,
//   AlertCircle,
//   RefreshCw,
//   Upload,
// } from "lucide-react";

// import { useAuth } from "../../Auth/AuthContext";
// import { useAppData } from "../../../context/AppDataContext";
// import { deletePersona } from "../../../database/personaService";

// import PersonaCreateModal from "./PersonaCreateModal";
// import PersonaDetailsModal from "./PersonaDetailsModal";
// import UploadResumeModal from "./UploadResumeModal";
// import PersonaCard from "./PersonaCard";
// import DeleteConfirmationModal from "./DeleteConfirmationModal";

// export default function PersonasPage({ mode = "persona" }) {
//   const isKnowledgeBase = mode === "knowledge-base";
//   const isPersonaMode = mode === "persona";

//   const { loading: authLoading } = useAuth();
//   const { personas, loading, error, reloadAll } = useAppData();

//   /* ----------------------- STATES ----------------------- */
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredPersonas, setFilteredPersonas] = useState([]);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [showUploadModal, setShowUploadModal] = useState(false);
//   const [activePersona, setActivePersona] = useState(null);

//   // KB single-select
//   const [selectedId, setSelectedId] = useState(null);

//   const [toast, setToast] = useState(null);
//   const [localError, setLocalError] = useState(null);

//   /* ----------------------- FILTERING ----------------------- */
//   useEffect(() => {
//     applyFilters();
//   }, [personas, searchTerm, isKnowledgeBase]);

//   const applyFilters = () => {
//     let data = personas || [];

//     if (isKnowledgeBase) {
//       data = data.filter(
//         (p) =>
//           p.company_name === "Knowledge Base" ||
//           p.is_resume_only === true
//       );
//     } else {
//       data = data.filter(
//         (p) =>
//           p.company_name !== "Knowledge Base" &&
//           p.is_resume_only !== true
//       );
//     }

//     if (searchTerm.trim()) {
//       const term = searchTerm.toLowerCase();
//       data = data.filter(
//         (p) =>
//           p.company_name?.toLowerCase().includes(term) ||
//           p.position?.toLowerCase().includes(term)
//       );
//     }

//     setFilteredPersonas(data);
//   };

//   /* ----------------------- TOAST ----------------------- */
//   const showToast = (msg) => {
//     setToast(msg);
//     setTimeout(() => setToast(null), 2500);
//   };

//   /* ----------------------- DELETE ----------------------- */
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState(null);
//   const [isDeleting, setIsDeleting] = useState(false);

//   const confirmDelete = async () => {
//     if (!itemToDelete) return;
//     setIsDeleting(true);

//     try {
//       const result = await deletePersona(itemToDelete);
//       if (!result.success) throw new Error(result.error);

//       await reloadAll();
//       showToast("Deleted successfully 🗑️");
//       setShowDeleteModal(false);
//       setItemToDelete(null);
//     } catch (err) {
//       setLocalError(err.message);
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const handleDelete = (id) => {
//     setItemToDelete(id);
//     setShowDeleteModal(true);
//   };

//   const handleSelect = (id) => {
//     setSelectedId((prev) => (prev === id ? null : id));
//   };

//   const openDetails = (persona) => {
//     setActivePersona(persona);
//     setShowDetailsModal(true);
//   };

//   /* ----------------------- AUTH LOADING ----------------------- */
//   if (authLoading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <Loader2 className="w-10 h-10 animate-spin text-white/70" />
//       </div>
//     );
//   }

//   /* ----------------------- UI ----------------------- */
//   return (
//     <div className="min-h-screen bg-black px-4 sm:px-6 md:px-8 py-6">
//       <div className="max-w-7xl mx-auto">
//         {/* HEADER */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
//           <div>
//             <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
//               {isKnowledgeBase ? "Knowledge Base" : "Personas"}
//             </h1>
//             <p className="text-gray-500 text-sm mt-2 max-w-xl">
//               {isKnowledgeBase
//                 ? "Upload resumes and select one for interview"
//                 : "Manage your interview personas and resumes"}
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
//             {/* SEARCH */}
//             <div className="relative w-full sm:w-72">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder={
//                   isKnowledgeBase
//                     ? "Search resumes…"
//                     : "Search by company or role…"
//                 }
//                 className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-12 pr-4 py-2.5 text-white text-sm"
//               />
//             </div>

//             <div className="flex gap-2">
//               <button
//                 onClick={reloadAll}
//                 disabled={loading}
//                 className="rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 p-2.5"
//               >
//                 <RefreshCw
//                   className={`w-5 h-5 text-gray-400 ${
//                     loading ? "animate-spin" : ""
//                   }`}
//                 />
//               </button>

//               {isKnowledgeBase ? (
//                 <button
//                   onClick={() => setShowUploadModal(true)}
//                   className="rounded-xl bg-white text-black font-medium px-4 py-2.5 flex items-center gap-2 hover:bg-gray-100"
//                 >
//                   <Upload className="w-5 h-5" />
//                   Upload
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => setShowCreateModal(true)}
//                   className="rounded-xl bg-white text-black font-medium px-4 py-2.5 flex items-center gap-2 hover:bg-gray-100"
//                 >
//                   <Plus className="w-5 h-5" />
//                   New
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ERROR */}
//         {(error || localError) && (
//           <div className="mb-6 rounded-xl border border-red-900 bg-red-950/50 p-4 flex gap-3">
//             <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
//             <p className="text-red-400 text-sm">
//               {error || localError}
//             </p>
//           </div>
//         )}

//         {/* GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//           {isPersonaMode && (
//             <button
//               onClick={() => setShowCreateModal(true)}
//               className="rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 p-6 md:p-8 text-left"
//             >
//               <div className="flex flex-col items-center text-center">
//                 <div className="w-14 h-14 rounded-xl bg-zinc-800 flex items-center justify-center mb-4">
//                   <Plus className="w-7 h-7 text-gray-500" />
//                 </div>
//                 <h3 className="text-white font-medium">
//                   New Persona
//                 </h3>
//                 <p className="text-gray-500 text-sm mt-1">
//                   Create your own
//                 </p>
//               </div>
//             </button>
//           )}

//           {loading ? (
//             <div className="col-span-full flex justify-center py-20">
//               <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
//             </div>
//           ) : (
//             filteredPersonas.map((persona) => (
//               <PersonaCard
//                 key={persona.id}
//                 persona={persona}
//                 mode={mode}
//                 isSelected={isKnowledgeBase && selectedId === persona.id}
//                 onSelect={handleSelect}
//                 onOpenDetails={openDetails}
//                 onDelete={handleDelete}
//               />
//             ))
//           )}
//         </div>
//       </div>

//       {/* MODALS */}
//       {isPersonaMode && showCreateModal && (
//         <PersonaCreateModal
//           onClose={() => setShowCreateModal(false)}
//           onSuccess={() => {
//             reloadAll();
//             showToast("Persona created 🚀");
//           }}
//         />
//       )}

//       {isPersonaMode && showDetailsModal && activePersona && (
//         <PersonaDetailsModal
//           persona={activePersona}
//           onClose={() => setShowDetailsModal(false)}
//         />
//       )}

//       {isKnowledgeBase && showUploadModal && (
//         <UploadResumeModal
//           onClose={() => setShowUploadModal(false)}
//           onSuccess={() => {
//             reloadAll();
//             showToast("Resume uploaded 📄");
//           }}
//         />
//       )}

//       <DeleteConfirmationModal
//         isOpen={showDeleteModal}
//         onClose={() => {
//           setShowDeleteModal(false);
//           setItemToDelete(null);
//         }}
//         onConfirm={confirmDelete}
//         isDeleting={isDeleting}
//         title={isKnowledgeBase ? "Delete Resume" : "Delete Persona"}
//         message="This action cannot be undone."
//       />

//       {/* TOAST */}
//       {toast && (
//         <div className="fixed bottom-6 right-4 sm:right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium">
//           {toast}
//         </div>
//       )}
//     </div>
//   );
// }








// src/components/Interview/Persona/PersonasPage.jsx
// KB mode REMOVED — sirf persona management

import React, { useEffect, useState } from "react";
import { Search, Plus, Loader2, AlertCircle, RefreshCw } from "lucide-react";

import { useAuth }    from "../../Auth/AuthContext";
import { useAppData } from "../../../context/AppDataContext";
import { deletePersona } from "../../../database/personaService";

import PersonaCreateModal       from "./PersonaCreateModal";
import PersonaDetailsModal      from "./PersonaDetailsModal";
import PersonaCard              from "./PersonaCard";
import DeleteConfirmationModal  from "./DeleteConfirmationModal";

// ═══════════════════════════════════════════════════════
export default function PersonasPage() {
  const { loading: authLoading } = useAuth();
  const { personas, loading, error, reloadAll } = useAppData();

  const [search,     setSearch]     = useState("");
  const [filtered,   setFiltered]   = useState([]);
  const [localError, setLocalError] = useState(null);
  const [toast,      setToast]      = useState(null);

  const [showCreate,   setShowCreate]   = useState(false);
  const [showDetails,  setShowDetails]  = useState(false);
  const [active,       setActive]       = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting,   setIsDeleting]   = useState(false);

  // ── Filter (exclude KB-only rows) ────────────────────
  useEffect(() => {
    let data = (personas || []).filter(
      (p) => p.company_name !== "Knowledge Base" && !p.is_resume_only
    );
    if (search.trim()) {
      const t = search.toLowerCase();
      data = data.filter(
        (p) =>
          p.company_name?.toLowerCase().includes(t) ||
          p.position?.toLowerCase().includes(t)
      );
    }
    setFiltered(data);
  }, [personas, search]);

  // ── Toast ─────────────────────────────────────────────
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // ── Delete ────────────────────────────────────────────
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await deletePersona(deleteTarget);
      if (!res.success) throw new Error(res.error);
      await reloadAll();
      showToast("Deleted ✓");
      setDeleteTarget(null);
    } catch (e) {
      setLocalError(e.message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white/50" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 sm:px-6 md:px-8 py-6">
      <div className="max-w-7xl mx-auto">

        {/* ── HEADER ── */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Personas
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage your interview personas — company, role, and job description.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by company or role…"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-zinc-600 transition"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={reloadAll}
                disabled={loading}
                title="Refresh"
                className="rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 p-2.5 transition"
              >
                <RefreshCw className={`w-5 h-5 text-gray-400 ${loading ? "animate-spin" : ""}`} />
              </button>

              <button
                onClick={() => setShowCreate(true)}
                className="rounded-xl bg-white text-black font-medium px-4 py-2.5 flex items-center gap-2 hover:bg-gray-100 active:scale-95 transition"
              >
                <Plus className="w-5 h-5" />
                New
              </button>
            </div>
          </div>
        </div>

        {/* ── ERROR ── */}
        {(error || localError) && (
          <div className="mb-6 rounded-xl border border-red-900 bg-red-950/40 p-4 flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{error || localError}</p>
          </div>
        )}

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

          {/* "New Persona" always first */}
          <button
            onClick={() => setShowCreate(true)}
            className="rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 active:scale-[0.98] p-6 md:p-8 transition text-left"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-xl bg-zinc-800 flex items-center justify-center mb-4">
                <Plus className="w-7 h-7 text-gray-500" />
              </div>
              <h3 className="text-white font-medium">New Persona</h3>
              <p className="text-gray-500 text-sm mt-1">Create your own</p>
            </div>
          </button>

          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
            </div>
          ) : (
            filtered.map((persona) => (
              <PersonaCard
                key={persona.id}
                persona={persona}
                mode="persona"
                onOpenDetails={(p) => { setActive(p); setShowDetails(true); }}
                onDelete={(id) => setDeleteTarget(id)}
              />
            ))
          )}
        </div>
      </div>

      {/* ── MODALS ── */}
      {showCreate && (
        <PersonaCreateModal
          onClose={() => setShowCreate(false)}
          onSuccess={() => { reloadAll(); showToast("Persona created 🚀"); }}
        />
      )}

      {showDetails && active && (
        <PersonaDetailsModal
          persona={active}
          onClose={() => { setShowDetails(false); setActive(null); }}
          showSelectButton={false}
        />
      )}

      <DeleteConfirmationModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title="Delete Persona"
        message="This will permanently delete this persona. This action cannot be undone."
      />

      {/* ── TOAST ── */}
      {toast && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium">
          {toast}
        </div>
      )}
    </div>
  );
}