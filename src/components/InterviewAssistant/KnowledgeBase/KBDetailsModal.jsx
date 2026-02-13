// src/components/Interview/KnowledgeBase/KBDetailsModal.jsx

import React from "react";
import {
  X,
  FileText,
  File,
  FileCode,
  CheckCircle2,
  Tag,
  HardDrive,
  Calendar,
  ExternalLink,
  AlertTriangle,
  Clock,
} from "lucide-react";

export default function KBDetailsModal({ kb, onClose }) {
  if (!kb) return null;

  // ── file icon by type ──
  const FileIconComp = () => {
    const cls = "w-7 h-7";
    switch (kb.file_type) {
      case "pdf":  return <FileText className={`${cls} text-red-400`} />;
      case "docx": return <File className={`${cls} text-blue-400`} />;
      case "txt":  return <FileCode className={`${cls} text-green-400`} />;
      default:     return <FileText className={`${cls} text-gray-400`} />;
    }
  };

  const formatSize = (bytes) => {
    if (!bytes) return "—";
    if (bytes < 1024)          return `${bytes} B`;
    if (bytes < 1024 * 1024)   return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
    });
  };

  const statusConfig = {
    completed: {
      label: "Ready for Interview",
      sub: "Document processed — will be used as context in your interview.",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
      border: "border-emerald-500/20 bg-emerald-500/5",
      badge: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      dot: "bg-emerald-400",
    },
    processing: {
      label: "Processing…",
      sub: "Your document is being processed. Usually takes under a minute.",
      icon: <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />,
      border: "border-yellow-500/20 bg-yellow-500/5",
      badge: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
      dot: "bg-yellow-400 animate-pulse",
    },
    failed: {
      label: "Processing Failed",
      sub: kb.error_message || "Could not process this document. Try deleting and re-uploading.",
      icon: <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />,
      border: "border-red-500/20 bg-red-500/5",
      badge: "text-red-400 bg-red-400/10 border-red-400/20",
      dot: "bg-red-400",
    },
    pending: {
      label: "Pending",
      sub: "Waiting to be processed.",
      icon: <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />,
      border: "border-zinc-700 bg-zinc-800/30",
      badge: "text-gray-400 bg-gray-400/10 border-gray-400/20",
      dot: "bg-gray-400",
    },
  };

  const status = statusConfig[kb.processing_status] || statusConfig.pending;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-zinc-900 rounded-xl w-full sm:max-w-lg max-h-[95vh] overflow-y-auto border border-zinc-800 shadow-2xl">

        {/* ── HEADER ── */}
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 px-4 sm:px-6 py-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
              <FileIconComp />
            </div>
            <div className="min-w-0">
              <h2 className="text-white text-base sm:text-lg font-bold leading-snug break-words">
                {kb.kb_name || "Untitled Document"}
              </h2>
              <p className="text-gray-500 text-xs mt-0.5 uppercase tracking-wider">
                {kb.file_type || "document"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition p-1 flex-shrink-0 mt-0.5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── BODY ── */}
        <div className="px-4 sm:px-6 py-5 space-y-4">

          {/* Status banner */}
          <div className={`flex items-start gap-3 rounded-xl border p-4 ${status.border}`}>
            {status.icon}
            <div>
              <p className="text-white text-sm font-semibold">{status.label}</p>
              <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{status.sub}</p>
            </div>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-800/60 rounded-xl p-3.5">
              <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1.5">
                <HardDrive className="w-3.5 h-3.5" />
                File Size
              </div>
              <p className="text-white font-semibold text-sm">{formatSize(kb.file_size)}</p>
            </div>

            <div className="bg-zinc-800/60 rounded-xl p-3.5">
              <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Uploaded
              </div>
              <p className="text-white font-semibold text-sm">{formatDate(kb.created_at)}</p>
            </div>
          </div>

          {/* Status badge row */}
          <div className="flex items-center justify-between px-1">
            <span className="text-gray-500 text-sm">Processing status</span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${status.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
          </div>

          {/* Tags */}
          {kb.tags && kb.tags.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-2.5">
                <Tag className="w-3.5 h-3.5" />
                Tags
              </div>
              <div className="flex flex-wrap gap-2">
                {kb.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-xs text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* View original */}
          {kb.file_url && (
            <a
              href={kb.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-sm transition"
            >
              <ExternalLink className="w-4 h-4" />
              View Original File
            </a>
          )}

          {/* Close */}
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-white hover:bg-gray-100 text-black font-semibold text-sm transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}