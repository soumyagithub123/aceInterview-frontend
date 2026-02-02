// import React, { useState, useEffect } from 'react';
// import {
//   Search, Plus, X, Upload, FileText,
//   Trash2, Loader2, AlertCircle, RefreshCw,
//   CloudCog
// } from 'lucide-react';

// import {
//   createPersona,
//   deletePersona,
//   uploadResume,
//   searchPersonas
// } from '../../../database/personaService';

// import { useAuth } from '../../Auth/AuthContext';

// // GLOBAL CONTEXT
// import { useAppData } from "../../../context/AppDataContext";

// export default function PersonasPage() {
//   const { user, loading: authLoading } = useAuth();

//   // 🔥 Global data (preloaded at login)
//   const { personas, loading, error, reloadAll } = useAppData();

//   // Local UI states
//   const [filteredPersonas, setFilteredPersonas] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [selectedPersona, setSelectedPersona] = useState(null);

//   const [localError, setLocalError] = useState(null);

//   // Create form
//   const [formData, setFormData] = useState({
//     companyName: '',
//     companyDescription: '',
//     position: '',
//     jobDescription: '',
//   });
//   const [resumeFile, setResumeFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(false);

//   // 🔥 When global personas change, update filtered list
//   useEffect(() => {
//     setFilteredPersonas(personas || []);
//   }, [personas]);

//   // 🔥 Search locally OR DB search
//   useEffect(() => {
//     if (!searchTerm.trim()) {
//       setFilteredPersonas(personas);
//     } else {
//       handleSearch();
//     }
//   }, [searchTerm, personas]);

//   const handleSearch = async () => {
//     if (!searchTerm.trim()) {
//       setFilteredPersonas(personas);
//       return;
//     }

//     const result = await searchPersonas(searchTerm);
//     if (result.success) {
//       setFilteredPersonas(result.data);
//     }
//   };

//   // -----------------------------------------
//   // FILE UPLOAD HANDLER
//   // -----------------------------------------
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.type !== "application/pdf") {
//       alert("Upload a PDF file only.");
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       alert("Max file size is 5MB.");
//       return;
//     }
//     setResumeFile(file);
//   };

//   // -----------------------------------------
//   // CREATE PERSONA
//   // -----------------------------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted with data:", formData);
//     if (resumeFile) console.log("Resume file attached:", resumeFile.name);
//     setUploadProgress(true);
//     setLocalError(null);

//     try {
//       let resumeUrl = "", resumeFilename = "", resumeFilePath = "";

//       if (resumeFile) {
//         const uploadResult = await uploadResume(resumeFile);
//         if (!uploadResult.success) throw new Error(uploadResult.error);

//         resumeUrl = uploadResult.url;
//         resumeFilename = uploadResult.filename;
//         resumeFilePath = uploadResult.filePath;
//       }

//       const personaData = {
//         companyName: formData.companyName,
//         companyDescription: formData.companyDescription,
//         position: formData.position,
//         jobDescription: formData.jobDescription,
//         resumeUrl,
//         resumeFilename,
//         resumeFilePath,
//       };

//       const result = await createPersona(personaData);
//       if (!result.success) throw new Error(result.error);

//       // Close modal and reload from GLOBAL store
//       setShowCreateModal(false);
//       resetForm();
//       await reloadAll();

//       alert("Persona created successfully!");

//     } catch (err) {
//       setLocalError(err.message);
//       alert("Error: " + err.message);
//     } finally {
//       setUploadProgress(false);
//     }
//   };

//   // -----------------------------------------
//   // DELETE PERSONA
//   // -----------------------------------------
//   const handleDelete = async (personaId) => {
//     if (!window.confirm("Are you sure you want to delete this persona?"))
//       return;

//     try {
//       const result = await deletePersona(personaId);
//       if (!result.success) throw new Error(result.error);

//       await reloadAll();
//       alert("Persona deleted successfully.");

//     } catch (err) {
//       alert("Error: " + err.message);
//     }
//   };

//   // -----------------------------------------
//   // HELPERS
//   // -----------------------------------------
//   const resetForm = () => {
//     setFormData({
//       companyName: '',
//       companyDescription: '',
//       position: '',
//       jobDescription: '',
//     });
//     setResumeFile(null);
//     setLocalError(null);
//   };

//   const openDetailsModal = (persona) => {
//     setSelectedPersona(persona);
//     setShowDetailsModal(true);
//   };

//   const getCompanyInitial = (name) =>
//     name?.charAt(0).toUpperCase() || "?";

//   // -----------------------------------------
//   // AUTH LOADING
//   // -----------------------------------------
//   if (authLoading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
//       </div>
//     );
//   }

//   // -----------------------------------------
//   // MAIN UI START
//   // -----------------------------------------
//   return (
//     <div className="min-h-screen bg-black p-4 md:p-8"> {/* Responsive padding */}
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6"> {/* Stack on mobile */}
//           <div>
//             <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight">Personas</h1>
//             <p className="text-gray-500 text-sm mt-2">
//               Manage your interview personas and resumes
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//             {/* Search */}
//             <div className="relative flex-1 sm:flex-none">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
//               <input
//                 type="text"
//                 placeholder="Search by name..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="bg-zinc-900 border border-zinc-800 rounded-lg pl-12 pr-6 py-2.5
//                            text-white text-sm placeholder-gray-600 focus:outline-none focus:border-zinc-700 w-full lg:w-72"
//               />
//             </div>

//             <div className="flex items-center gap-2">
//               {/* Refresh */}
//               <button
//                 onClick={reloadAll}
//                 disabled={loading}
//                 className="bg-zinc-900 hover:bg-zinc-800 text-gray-400 p-2.5 rounded-lg border border-zinc-800 flex-1 sm:flex-none flex justify-center"
//               >
//                 <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
//               </button>

//               {/* Create Persona */}
//               <button
//                 onClick={() => {console.log("Create Persona button clicked!");
//                     setShowCreateModal(true)
//                   }}
//                 className="bg-white hover:bg-gray-100 text-black font-medium px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm flex-[2] sm:flex-none"
//               >
//                 <Plus className="w-5 h-5" /> <span className="whitespace-nowrap">Create Persona</span>
//               </button>
//             </div>
//           </div>
//         </div>
//         {/* Global or local error */}
//         {(error || localError) && (
//           <div className="mb-6 bg-red-950/50 border border-red-900/50 rounded-lg p-4 flex items-start gap-3">
//             <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
//             <p className="text-red-400 text-sm flex-1">{error || localError}</p>
//             <button onClick={() => setLocalError(null)} className="text-red-400">
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         )}

//         {/* Personas Grid - Optimized for all screen sizes */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

//           {/* New Persona Card */}
//           <button
//             onClick={() =>{
//               console.log("User is opening the Create Persona modal...");
//               setShowCreateModal(true)
//             }}
//             className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg p-6 md:p-8 transition-colors"
//           >
//             <div className="flex flex-col items-center">
//               <div className="w-16 h-16 md:w-20 md:h-20 bg-zinc-800 rounded-xl flex items-center justify-center mb-5">
//                 <Plus className="w-8 h-8 md:w-10 md:h-10 text-gray-600" />
//               </div>
//               <h3 className="text-white font-medium text-base mb-1">New Persona</h3>
//               <p className="text-gray-500 text-sm">Create your own persona</p>
//             </div>
//           </button>

//           {/* Loading State */}
//           {loading ? (
//             <div className="col-span-full flex items-center justify-center py-20">
//               <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
//             </div>
//           ) : filteredPersonas.length === 0 ? (
//             <div className="col-span-full text-center text-gray-500 py-20">
//               <p>No personas found</p>
//               <p className="text-sm">Create your first persona to get started</p>
//             </div>
//           ) : (
//             filteredPersonas.map((persona) => (
//               <div
//                 key={persona.id}
//                 className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg p-6 group relative transition-all"
//               >
//                 <button onClick={() => openDetailsModal(persona)} className="w-full text-left">
//                   <div className="flex flex-col items-center mb-4">

//                     {/* Icon */}
//                     <div
//                       className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 text-2xl font-bold ${
//                         persona.is_sample ? "bg-zinc-800 text-gray-400" : "bg-white text-black"
//                       }`}
//                     >
//                       {getCompanyInitial(persona.company_name)}
//                     </div>

//                     <h3 className="text-white text-center font-medium truncate w-full px-2">
//                       {persona.company_name}
//                     </h3>
//                     <p className="text-gray-500 text-sm text-center mt-1 truncate w-full px-2">
//                       {persona.position}
//                     </p>

//                     {persona.resume_filename && (
//                       <div className="flex items-center gap-1 mt-2 text-emerald-400 text-xs">
//                         <FileText className="w-3 h-3" /> Resume attached
//                       </div>
//                     )}

//                     {persona.is_sample && (
//                       <div className="mt-2 px-2.5 py-1 bg-zinc-800 rounded text-xs text-gray-400">
//                         Sample
//                       </div>
//                     )}
//                   </div>
//                 </button>

//                 {/* Delete Button - Visible on hover (desktop) or always (mobile) */}
//                 {!persona.is_sample && (
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       console.log(`Trash icon clicked for persona: ${persona.company_name}`); 
//                       handleDelete(persona.id);
//                     }}
//                     className="absolute top-4 right-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 text-red-400 hover:text-red-300 p-2 hover:bg-red-950/30 rounded transition-opacity"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Modals are triggered here - Section 3 will contain these components */}
//       {showCreateModal && (
//         <CreatePersonaModal
//           formData={formData}
//           setFormData={setFormData}
//           resumeFile={resumeFile}
//           handleFileChange={handleFileChange}
//           uploadProgress={uploadProgress}
//           handleSubmit={handleSubmit}
//           onClose={() => {
//             setShowCreateModal(false);
//             resetForm();
//           }}
//         />
//       )}

//       {showDetailsModal && selectedPersona && (
//         <DetailsModal
//           persona={selectedPersona}
//           onClose={() => setShowDetailsModal(false)}
//         />
//       )}
//     </div>
//   );
// }
// /* 🧩 CREATE PERSONA MODAL */
// function CreatePersonaModal({ formData, setFormData, resumeFile, handleFileChange, uploadProgress, handleSubmit, onClose }) {
//   return (
//     <div className="fixed inset-0 bg-black/90 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50 backdrop-blur-sm">
//       <div className="bg-zinc-900 rounded-t-xl sm:rounded-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto border border-zinc-800 transition-all">
//         <div className="p-6 border-b border-zinc-800 flex justify-between sticky top-0 bg-zinc-900 z-10">
//           <div>
//             <h2 className="text-white text-xl md:text-2xl font-bold">Create a persona</h2>
//             <p className="text-gray-500 text-sm mt-1">
//               Provide information about the company and role.
//             </p>
//           </div>

//           <button onClick={onClose} className="text-gray-500 hover:text-white p-1">
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Resume */}
//           <div>
//             <label className="text-white text-sm font-medium mb-2 block">
//               Select Resume (Optional)
//             </label>

//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//               <div className="flex-1 bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-gray-500 text-sm truncate">
//                 {resumeFile ? resumeFile.name : "No resume uploaded"}
//               </div>

//               <label className="bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2.5 rounded-lg cursor-pointer flex items-center justify-center gap-2 transition-colors">
//                 <Upload className="w-4 h-4" />
//                 <span>Upload</span>
//                 <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
//               </label>
//             </div>

//             <p className="text-gray-600 text-xs mt-2">PDF only • Max 5MB</p>
//           </div>

//           {/* Company Name */}
//           <InputField
//             label="Company Name"
//             required
//             value={formData.companyName}
//             onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
//           />

//           {/* Company Description */}
//           <TextAreaField
//             label="Company Description"
//             required
//             rows={4}
//             value={formData.companyDescription}
//             onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
//           />

//           {/* Position */}
//           <InputField
//             label="Position"
//             required
//             value={formData.position}
//             onChange={(e) => setFormData({ ...formData, position: e.target.value })}
//           />

//           {/* Job Description */}
//           <TextAreaField
//             label="Job Description"
//             required
//             rows={4}
//             value={formData.jobDescription}
//             onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
//           />

//           {/* Submit */}
//           <button
//             onClick={() => {
//               console.log("User is submitting the Create Persona form...");
//             }}
//             type="submit"
//             disabled={uploadProgress}
//             className="w-full bg-white hover:bg-gray-100 text-black disabled:bg-zinc-800 disabled:text-gray-600 disabled:cursor-not-allowed py-3.5 rounded-lg flex items-center justify-center gap-2 font-bold transition-colors"
//           >
//             {uploadProgress && <Loader2 className="w-5 h-5 animate-spin" />}
//             {uploadProgress ? "Creating..." : "Submit"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// /* ⬜ Input field component */
// function InputField({ label, value, onChange, required }) {
//   return (
//     <div>
//       <label className="text-white text-sm font-medium mb-2 block">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <input
//         type="text"
//         required={required}
//         value={value}
//         onChange={onChange}
//         className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-zinc-700 transition-colors"
//       />
//     </div>
//   );
// }

// /* 📝 Textarea field */
// function TextAreaField({ label, rows, value, onChange, required }) {
//   return (
//     <div>
//       <label className="text-white text-sm font-medium mb-2 block">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <textarea
//         rows={rows}
//         required={required}
//         value={value}
//         onChange={onChange}
//         className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-zinc-700 resize-none transition-colors"
//       />
//     </div>
//   );
// }

// /* 🧩 Details Modal */
// function DetailsModal({ persona, onClose }) {
//   const getCompanyInitial = (name) =>
//     name?.charAt(0).toUpperCase() || "?";

//   return (
//     <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
//       <div className="bg-zinc-900 rounded-t-xl sm:rounded-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto border border-zinc-800">

//         <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 z-10">
//           <div className="flex items-start justify-between">

//             <div className="flex items-start gap-4 min-w-0">
//               <div
//                 className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0 ${
//                   persona.is_sample ? "bg-zinc-800 text-gray-400" : "bg-white text-black"
//                 }`}
//               >
//                 {getCompanyInitial(persona.company_name)}
//               </div>

//               <div className="min-w-0">
//                 <h2 className="text-white text-xl md:text-2xl font-bold truncate">{persona.position}</h2>
//                 <p className="text-gray-500 truncate">@{persona.company_name}</p>
//                 {persona.is_sample && (
//                   <span className="inline-block mt-2 px-2.5 py-1 bg-zinc-800 rounded text-xs text-gray-400">
//                     Sample Persona
//                   </span>
//                 )}
//               </div>
//             </div>

//             <button onClick={onClose} className="text-gray-500 hover:text-white p-1">
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           {persona.resume_filename && (
//             <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 bg-black border border-zinc-800 rounded-lg p-3">
//               <div className="flex items-center gap-3 flex-1 min-w-0">
//                 <FileText className="w-5 h-5 text-gray-500 flex-shrink-0" />
//                 <p className="text-white text-sm truncate">Resume: {persona.resume_filename}</p>
//               </div>
//               {persona.resume_url && (
//                 <a
//                   href={persona.resume_url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-indigo-400 hover:text-indigo-300 text-sm font-medium whitespace-nowrap"
//                 >
//                   View PDF
//                 </a>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="p-6 space-y-6">

//           <div>
//             <h3 className="text-white font-semibold mb-2">About the company</h3>
//             <p className="text-gray-400 text-sm leading-relaxed">
//               {persona.company_description}
//             </p>
//           </div>

//           <div>
//             <h3 className="text-white font-semibold mb-2">About the role</h3>
//             <p className="text-gray-400 text-sm leading-relaxed">
//               {persona.job_description}
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-3 pt-4">
//             <button 
//               onClick={onClose} 
//               className="order-2 sm:order-1 flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-3.5 rounded-lg font-medium transition-colors"
//             >
//               Close
//             </button>

//             <button
//               className="order-1 sm:order-2 flex-1 bg-white hover:bg-gray-100 text-black py-3.5 rounded-lg font-bold transition-colors"
//               onClick={() => {
//                 localStorage.setItem("selectedPersona", `${persona.position}@${persona.company_name}`);
//                 localStorage.setItem("selectedPersonaData", JSON.stringify(persona));
//                 onClose();
//                 alert("Persona selected!");
//               }}
//             >
//               Select Persona
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Loader2,
  AlertCircle,
  RefreshCw,
  Upload,
} from "lucide-react";

import { useAuth } from "../../Auth/AuthContext";
import { useAppData } from "../../../context/AppDataContext";
import {
  deletePersona,
  searchPersonas,
} from "../../../database/personaService";

import PersonaCreateModal from "./PersonaCreateModal";
import PersonaDetailsModal from "./PersonaDetailsModal";
import UploadResumeModal from "./UploadResumeModal";
import PersonaCard from "./PersonaCard";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export default function PersonasPage({ mode = "persona" }) {
  const isKnowledgeBase = mode === "knowledge-base";
  const isPersonaMode = mode === "persona";

  const { loading: authLoading } = useAuth();
  const { personas, loading, error, reloadAll } = useAppData();

  // -----------------------
  // STATES
  // -----------------------
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPersonas, setFilteredPersonas] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activePersona, setActivePersona] = useState(null);

  // 🔥 Single select (KB mode)
  const [selectedId, setSelectedId] = useState(null);

  const [toast, setToast] = useState(null);
  const [localError, setLocalError] = useState(null);

  // -----------------------
  // EFFECTS
  // -----------------------
  // -----------------------
  // EFFECTS
  // -----------------------
  useEffect(() => {
    applyFilters();
  }, [personas, searchTerm, isKnowledgeBase]);

  const applyFilters = () => {
    let data = personas || [];

    // 1️⃣ Filter by Mode
    if (isKnowledgeBase) {
      // Show ONLY Knowledge Base items (uploaded resumes)
      data = data.filter(
        (p) =>
          p.company_name === "Knowledge Base" ||
          p.is_resume_only === true
      );
    } else {
      // Show ONLY Personas (hide Knowledge Base items)
      data = data.filter(
        (p) =>
          p.company_name !== "Knowledge Base" &&
          p.is_resume_only !== true
      );
    }

    // 2️⃣ Filter by Search
    if (searchTerm.trim()) {
      const lowerTerm = searchTerm.toLowerCase();
      data = data.filter(
        (p) =>
          p.company_name?.toLowerCase().includes(lowerTerm) ||
          p.position?.toLowerCase().includes(lowerTerm)
      );
    }

    setFilteredPersonas(data);
  };

  const handleSearch = async () => {
    // We are now doing client-side search filtering in applyFilters
    // But if we wanted server-side search, we'd use searchPersonas.
    // Given the small number of personas, client-side is fine/better for consistency.
    // However, the original code used searchPersonas. Let's keep using it 
    // IF the user insisted, but the original code had a bug:
    // It setFilteredPersonas directly from search result, ignoring current mode.
    // FIX: We will just rely on the global 'personas' list + local filtering 
    // because useAppData loads ALL personas anyway.
    
    // If we MUST use server search (e.g. for large datasets), we would need to filter 
    // the result of searchPersonas by mode too.
    
    // For now, let's stick to client-side filtering of the `personas` context data
    // which is simpler and fixes the separation issue immediately.
  };

  // -----------------------
  // TOAST
  // -----------------------
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  // -----------------------
  // ACTIONS
  // -----------------------
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ...

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    setIsDeleting(true);
    try {
      const result = await deletePersona(itemToDelete);
      if (!result.success) throw new Error(result.error);

      await reloadAll();
      showToast("Deleted successfully 🗑️");
      setShowDeleteModal(false);
      setItemToDelete(null);
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDelete = (personaId) => {
    setItemToDelete(personaId);
    setShowDeleteModal(true);
  };

  const handleSelect = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const openDetails = (persona) => {
    setActivePersona(persona);
    setShowDetailsModal(true);
  };

  // -----------------------
  // AUTH LOADING
  // -----------------------
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
      </div>
    );
  }

  // -----------------------
  // UI
  // -----------------------
  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6">
          <div>
            <h1 className="text-white text-3xl md:text-4xl font-bold">
              {isKnowledgeBase ? "Knowledge Base" : "Personas"}
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              {isKnowledgeBase
                ? "Upload resumes and select one for interview"
                : "Manage your interview personas and resumes"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* SEARCH */}
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-gray-600" />
              <input
                type="text"
                placeholder={
                  isKnowledgeBase
                    ? "Search resumes…"
                    : "Search by company or role…"
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 rounded-lg pl-12 pr-6 py-2.5 text-white text-sm w-full lg:w-72"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={reloadAll}
                disabled={loading}
                className="bg-zinc-900 hover:bg-zinc-800 p-2.5 rounded-lg border border-zinc-800"
              >
                <RefreshCw
                  className={`w-5 h-5 text-gray-400 ${
                    loading ? "animate-spin" : ""
                  }`}
                />
              </button>

              {isKnowledgeBase ? (
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="bg-white hover:bg-gray-100 text-black font-medium px-5 py-2.5 rounded-lg flex items-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  Upload Resume
                </button>
              ) : (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-white hover:bg-gray-100 text-black font-medium px-5 py-2.5 rounded-lg flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Create Persona
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ERROR */}
        {(error || localError) && (
          <div className="mb-6 bg-red-950/50 border border-red-900 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-400 text-sm flex-1">
              {error || localError}
            </p>
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isPersonaMode && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg p-6 md:p-8"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-zinc-800 rounded-xl flex items-center justify-center mb-5">
                  <Plus className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-white font-medium">New Persona</h3>
                <p className="text-gray-500 text-sm">Create your own</p>
              </div>
            </button>
          )}

          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
            </div>
          ) : (
            filteredPersonas.map((persona) => (
              <PersonaCard
                key={persona.id}
                persona={persona}
                mode={mode}
                isSelected={isKnowledgeBase && selectedId === persona.id}
                onSelect={handleSelect}
                onOpenDetails={openDetails}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>

      {/* MODALS */}
      {isPersonaMode && showCreateModal && (
        <PersonaCreateModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            reloadAll();
            showToast("Persona created 🚀");
          }}
        />
      )}

      {isPersonaMode && showDetailsModal && activePersona && (
        <PersonaDetailsModal
          persona={activePersona}
          onClose={() => setShowDetailsModal(false)}
        />
      )}

      {isKnowledgeBase && showUploadModal && (
        <UploadResumeModal
          onClose={() => setShowUploadModal(false)}
          onSuccess={() => {
            reloadAll();
            showToast("Resume uploaded 📄");
          }}
        />
      )}

      {/* DELETE CONFIRMATION MODAL */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setItemToDelete(null);
        }}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title={isKnowledgeBase ? "Delete Resume" : "Delete Persona"}
        message={
          isKnowledgeBase
            ? "Are you sure you want to delete this resume? This cannot be undone."
            : "Are you sure you want to delete this persona? This cannot be undone."
        }
      />

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-lg shadow-lg text-sm font-medium">
          {toast}
        </div>
      )}
    </div>
  );
}
