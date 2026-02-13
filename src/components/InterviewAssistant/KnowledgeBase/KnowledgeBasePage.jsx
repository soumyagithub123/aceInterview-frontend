// src/components/Interview/KnowledgeBase/KnowledgeBasePage.jsx

import React, { useState, useEffect, useCallback } from "react";
import {
  Search, Upload, Loader2, AlertCircle,
  RefreshCw, Database,
} from "lucide-react";

import { useAuth } from "../../Auth/AuthContext";
import { getUserKBItems, deleteKBItem } from "../../../database/KnowledgeBaseService";

import KBCard from "./KBCard";
import KBUploadModal from "./KBUploadModal";
import KBDetailsModal from "./KBDetailsModal";
import DeleteConfirmationModal from "../Persona/DeleteConfirmationModal";

const MAX_SELECTION = 3;
const STORAGE_KEY   = "selectedKBIds";

// ─── localStorage helpers ───────────────────────────────
function loadStoredIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const ids  = raw ? JSON.parse(raw) : [];
    return Array.isArray(ids) ? ids.slice(0, MAX_SELECTION) : [];
  } catch { return []; }
}
function persistIds(ids) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(ids)); } catch {}
}

// ═══════════════════════════════════════════════════════
export default function KnowledgeBasePage() {
  const { user, loading: authLoading } = useAuth();

  // data
  const [items,    setItems]    = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  // ui
  const [search,      setSearch]      = useState("");
  const [selectedIds, setSelectedIds] = useState(loadStoredIds);

  // modals
  const [showUpload,    setShowUpload]    = useState(false);
  const [detailsKB,     setDetailsKB]     = useState(null);   // open details
  const [deleteTarget,  setDeleteTarget]  = useState(null);   // id to delete
  const [isDeleting,    setIsDeleting]    = useState(false);

  // toast
  const [toast, setToast] = useState(null);

  // ── Load ──────────────────────────────────────────────
  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getUserKBItems();
      if (!res.success) throw new Error(res.error);
      setItems(res.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { load(); }, [load]);

  // ── Filter ────────────────────────────────────────────
  useEffect(() => {
    if (!search.trim()) { setFiltered(items); return; }
    const t = search.toLowerCase();
    setFiltered(items.filter(
      (kb) =>
        kb.kb_name?.toLowerCase().includes(t) ||
        kb.tags?.some((tg) => tg.toLowerCase().includes(t))
    ));
  }, [items, search]);

  // ── Selection ─────────────────────────────────────────
  const toggle = (id) => {
    setSelectedIds((prev) => {
      let next;
      if (prev.includes(id)) {
        next = prev.filter((x) => x !== id);
      } else {
        if (prev.length >= MAX_SELECTION) {
          showToast(`⚠️ Max ${MAX_SELECTION} items allowed`);
          return prev;
        }
        next = [...prev, id];
      }
      persistIds(next);
      return next;
    });
  };

  const clearAll = () => { setSelectedIds([]); persistIds([]); };

  // ── Delete ────────────────────────────────────────────
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await deleteKBItem(deleteTarget);
      if (!res.success) throw new Error(res.error);

      // remove from selection
      setSelectedIds((prev) => {
        const next = prev.filter((x) => x !== deleteTarget);
        persistIds(next);
        return next;
      });

      setDeleteTarget(null);
      await load();
      showToast("🗑️ Document deleted");
    } catch (e) {
      setError(e.message);
    } finally {
      setIsDeleting(false);
    }
  };

  // ── Toast ─────────────────────────────────────────────
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // ── Auth guard ────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white/50" />
      </div>
    );
  }

  // ═════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-black px-4 sm:px-6 md:px-8 py-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ── HEADER ── */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Database className="w-5 h-5 text-purple-400" />
              </div>
              <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
                Knowledge Base
              </h1>
            </div>
            <p className="text-gray-500 text-sm max-w-md ml-[52px]">
              Upload resumes, notes, or project docs. Select up to {MAX_SELECTION} to use as context in your interview.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search documents…"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-zinc-600 transition"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={load}
                disabled={loading}
                title="Refresh"
                className="rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 p-2.5 transition"
              >
                <RefreshCw className={`w-5 h-5 text-gray-400 ${loading ? "animate-spin" : ""}`} />
              </button>

              <button
                onClick={() => setShowUpload(true)}
                className="rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-medium px-4 py-2.5 flex items-center gap-2 transition shadow-lg shadow-purple-500/20"
              >
                <Upload className="w-4 h-4" />
                Upload
              </button>
            </div>
          </div>
        </div>

        {/* ── ERROR ── */}
        {error && (
          <div className="rounded-xl border border-red-900 bg-red-950/40 p-4 flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* ── GRID ── */}
        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
          </div>

        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-14 text-center">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <Database className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              {search ? "No results found" : "No documents yet"}
            </h3>
            <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
              {search
                ? "Try a different search term"
                : "Upload your resume, notes, or project docs to get started"}
            </p>
            {!search && (
              <button
                onClick={() => setShowUpload(true)}
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-medium px-5 py-2.5 rounded-xl transition"
              >
                <Upload className="w-4 h-4" />
                Upload Document
              </button>
            )}
          </div>

        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((kb) => (
              <KBCard
                key={kb.id}
                kb={kb}
                isSelected={selectedIds.includes(kb.id)}
                isDisabled={
                  !selectedIds.includes(kb.id) &&
                  selectedIds.length >= MAX_SELECTION
                }
                onToggle={() => toggle(kb.id)}
                onOpenDetails={() => setDetailsKB(kb)}
                onDelete={() => setDeleteTarget(kb.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── MODALS ── */}
      {showUpload && (
        <KBUploadModal
          onClose={() => setShowUpload(false)}
          onSuccess={() => {
            load();
            showToast("📄 Document uploaded — processing in background");
          }}
        />
      )}

      {detailsKB && (
        <KBDetailsModal
          kb={detailsKB}
          onClose={() => setDetailsKB(null)}
        />
      )}

      <DeleteConfirmationModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title="Delete Document"
        message="This will permanently remove this document and all its processed data. This action cannot be undone."
      />

      {/* ── TOAST ── */}
      {toast && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 bg-purple-600 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-in slide-in-from-bottom-2">
          {toast}
        </div>
      )}
    </div>
  );
}