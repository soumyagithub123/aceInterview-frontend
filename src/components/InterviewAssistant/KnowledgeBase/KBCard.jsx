import React from "react";
import { FileText, File, FileCode, Trash2, CheckCircle2, Lock, Eye } from "lucide-react";

export default function KBCard({
  kb,
  isSelected = false,
  isDisabled = false,
  onToggle,
  onOpenDetails,
  onDelete,
}) {
  // File type icon mapping
  const getFileIcon = () => {
    switch (kb.file_type) {
      case "pdf":
        return <FileText className="w-6 h-6 text-red-400" />;
      case "docx":
        return <File className="w-6 h-6 text-blue-400" />;
      case "txt":
        return <FileCode className="w-6 h-6 text-green-400" />;
      default:
        return <FileText className="w-6 h-6 text-gray-400" />;
    }
  };

  // File size formatter
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Processing status badge
  const getStatusBadge = () => {
    switch (kb.processing_status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            Ready
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center gap-1 text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full">
            <div className="w-3 h-3 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            Processing...
          </span>
        );
      case "failed":
        return (
          <span className="text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded-full">
            Failed
          </span>
        );
      default:
        return (
          <span className="text-xs text-gray-400 bg-gray-400/10 px-2 py-1 rounded-full">
            Pending
          </span>
        );
    }
  };

  return (
    <div
      className={`group relative rounded-xl p-5 transition-all duration-200 border ${
        isSelected
          ? "border-purple-500 bg-gradient-to-br from-purple-500/10 to-purple-600/5 shadow-lg shadow-purple-500/20 scale-[1.02]"
          : isDisabled
          ? "border-zinc-800 bg-zinc-900 opacity-50 cursor-not-allowed"
          : "border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700"
      }`}
    >
      {/* SELECTED BADGE */}
      {isSelected && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-purple-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-purple-500/20">
            <CheckCircle2 className="w-3 h-3" />
            SELECTED
          </div>
        </div>
      )}

      {/* TOGGLE SWITCH (Top-right) */}
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!isDisabled) onToggle?.();
          }}
          disabled={isDisabled}
          className={`relative w-11 h-6 rounded-full transition-colors ${
            isSelected
              ? "bg-gradient-to-r from-purple-500 to-purple-600"
              : "bg-zinc-700"
          } ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
              isSelected ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* LOCKED OVERLAY (Max selection reached) */}
      {isDisabled && !isSelected && (
        <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <div className="text-center">
            <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-xs text-gray-400 font-medium">Max 3 items</p>
          </div>
        </div>
      )}

      {/* CARD CONTENT */}
      <div
        onClick={() => !isDisabled && onOpenDetails?.()}
        className={`flex flex-col items-center text-center gap-3 ${
          isDisabled ? "" : "cursor-pointer"
        }`}
      >
        {/* FILE ICON */}
        <div className="w-14 h-14 rounded-xl bg-zinc-800 flex items-center justify-center">
          {getFileIcon()}
        </div>

        {/* KB NAME */}
        <h3 className="text-white font-medium text-sm truncate w-full px-1">
          {kb.kb_name || "Untitled Document"}
        </h3>

        {/* FILE INFO */}
        <div className="text-xs text-gray-500 space-y-1">
          <p className="uppercase">{kb.file_type}</p>
          <p>{formatFileSize(kb.file_size)}</p>
        </div>

        {/* STATUS BADGE */}
        <div className="mt-1">{getStatusBadge()}</div>

        {/* TAGS */}
        {kb.tags && kb.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center mt-2">
            {kb.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-zinc-800 text-gray-400 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
            {kb.tags.length > 2 && (
              <span className="text-xs text-gray-500">
                +{kb.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      {/* QUICK ACTIONS (Visible on hover) */}
      {!isDisabled && (
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails?.();
            }}
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium py-2 rounded-lg flex items-center justify-center gap-1"
          >
            <Eye className="w-3 h-3" />
            View
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            className="bg-red-600/10 hover:bg-red-600/20 text-red-400 p-2 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}