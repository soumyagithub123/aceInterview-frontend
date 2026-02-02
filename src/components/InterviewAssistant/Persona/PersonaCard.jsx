import React from "react";
import { FileText, Trash2, CheckCircle2 } from "lucide-react";

export default function PersonaCard({
  persona,
  mode = "persona",            // "persona" | "knowledge-base"
  isSelected = false,          // KB mode
  onSelect,                    // KB mode
  onOpenDetails,               // Persona mode
  onDelete,                    // Persona mode
}) {
  const isKnowledgeBase = mode === "knowledge-base";

  const handleClick = () => {
    if (isKnowledgeBase) {
      onSelect?.(persona.id);
    } else {
      onOpenDetails?.(persona);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative cursor-pointer rounded-lg p-6 transition-all duration-200
        ${
          isKnowledgeBase && isSelected
            ? "border border-emerald-500 scale-[1.02] bg-zinc-900"
            : "border border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
        }`}
    >
      {/* SELECTED BADGE (KB MODE) */}
      {isKnowledgeBase && isSelected && (
        <span className="absolute top-3 left-3 flex items-center gap-1 text-xs font-semibold text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
          SELECTED
        </span>
      )}

      {/* DELETE ICON (VISIBLE ON HOVER) */}
      {!persona.is_sample && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(persona.id);
          }}
          className="absolute top-4 right-4 z-10 p-2 text-red-500 bg-red-500/10 rounded-lg 
                     opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-500/20"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      {/* ---------------- CONTENT ---------------- */}
      <div className="flex flex-col items-center text-center gap-2">
        {/* ========== KNOWLEDGE BASE MODE ========== */}
        {isKnowledgeBase ? (
          <>
            <div className="w-14 h-14 rounded-xl bg-zinc-800 flex items-center justify-center">
              <FileText className="w-6 h-6 text-gray-400" />
            </div>

            <h3 className="text-white font-medium text-sm truncate w-full">
              {persona.resume_filename || "Untitled Resume"}
            </h3>
          </>
        ) : (
          /* ========== PERSONA MODE ========== */
          <>
            {/* ICON */}
            <div
              className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold
                ${
                  persona.is_sample
                    ? "bg-zinc-800 text-gray-400"
                    : "bg-white text-black"
                }`}
            >
              {persona.company_name?.charAt(0)?.toUpperCase() || "?"}
            </div>

            {/* TEXT */}
            <h3 className="text-white font-medium truncate w-full">
              {persona.company_name}
            </h3>

            <p className="text-gray-500 text-sm truncate w-full">
              {persona.position}
            </p>

            {/* RESUME */}
            {persona.resume_filename && (
              <div className="flex items-center gap-1 text-emerald-400 text-xs mt-1">
                <FileText className="w-3 h-3" />
                Resume attached
              </div>
            )}

            {/* SAMPLE TAG */}
            {persona.is_sample && (
              <div className="mt-1 px-2.5 py-1 bg-zinc-800 rounded text-xs text-gray-400">
                Sample
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
