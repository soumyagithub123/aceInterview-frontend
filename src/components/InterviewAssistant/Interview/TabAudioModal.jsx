import React, { useEffect } from "react";
import {
  X,
  Volume2,
  AlertCircle,
  Info,
  CheckCircle2,
} from "lucide-react";

export default function TabAudioModal({ onSelect, onClose, errorMessage }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-fuchsia-500/5 to-transparent pointer-events-none" />

      {/* Modal */}
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b10] shadow-[0_40px_140px_-60px_rgba(0,0,0,0.85)]">
        {/* Top glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-40 sm:h-48 w-[28rem] sm:w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500/30 via-fuchsia-500/20 to-cyan-500/20 blur-3xl" />

        {/* Header */}
        <div className="relative flex flex-wrap items-start justify-between gap-3 px-4 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-white/10">
          <div className="flex items-start gap-3 min-w-0">
            <div className="relative shrink-0">
              <div className="absolute -inset-2 rounded-2xl bg-emerald-500/15 blur-xl" />
              <div className="relative h-10 sm:h-11 w-10 sm:w-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
                <Volume2 className="h-4 sm:h-5 w-4 sm:w-5 text-emerald-200" />
              </div>
            </div>

            <div className="min-w-0">
              <h2 className="text-base sm:text-xl font-semibold text-white tracking-tight">
                Enable Interviewer Audio
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                Capture the interviewer’s voice directly from your meeting tab.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-9 sm:h-10 w-9 sm:w-10 rounded-xl border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition flex items-center justify-center"
            aria-label="Close"
            title="Close"
          >
            <X className="h-4 sm:h-5 w-4 sm:w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="relative px-4 sm:px-6 py-4 sm:py-5 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Steps */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-purple-200" />
                <p className="text-xs sm:text-sm font-semibold text-zinc-100">
                  Quick setup (30 seconds)
                </p>
              </div>
              <span className="text-[10px] sm:text-xs text-zinc-500">
                Zoom • Meet • Teams
              </span>
            </div>

            <div className="mt-4 grid gap-3">
              {[
                "Click “Select Tab Audio” below",
                "Choose your interview tab (Zoom/Meet/Teams)",
                "Enable “Share tab audio” checkbox",
                "Click “Share” to confirm",
              ].map((t, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-3"
                >
                  <div className="mt-0.5 h-6 sm:h-7 w-6 sm:w-7 shrink-0 rounded-xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center">
                    <span className="text-[10px] sm:text-xs font-bold text-purple-200">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed break-words">
                    {t}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Error */}
          {errorMessage && (
            <div className="rounded-2xl border border-rose-500/25 bg-rose-500/10 p-4 flex items-start gap-3">
              <div className="h-9 sm:h-10 w-9 sm:w-10 rounded-2xl border border-rose-500/25 bg-rose-500/10 flex items-center justify-center">
                <AlertCircle className="h-4 sm:h-5 w-4 sm:w-5 text-rose-200" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-rose-100">
                  Error
                </p>
                <p className="mt-1 text-xs sm:text-sm text-rose-200/90 break-words">
                  {errorMessage}
                </p>
              </div>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={onSelect}
            className="group relative w-full overflow-hidden rounded-2xl border border-emerald-300/15 bg-gradient-to-b from-emerald-400 to-emerald-500 text-black font-semibold py-3 sm:py-3.5 px-6 shadow-[0_20px_60px_-35px_rgba(16,185,129,0.55)] transition hover:brightness-[1.02] active:brightness-[0.98]"
          >
            <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-white/0 via-white/20 to-white/0" />
            <span className="relative inline-flex items-center justify-center gap-2 text-sm sm:text-base">
              <Volume2 className="h-4 sm:h-5 w-4 sm:w-5" />
              Select Tab Audio
            </span>
          </button>

          {/* Info */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-start gap-3">
            <div className="h-8 sm:h-9 w-8 sm:w-9 rounded-2xl border border-white/10 bg-black/20 flex items-center justify-center">
              <Info className="h-4 w-4 text-zinc-200" />
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed break-words">
              Your microphone is already active. This step captures the
              interviewer’s voice from your browser tab audio.
            </p>
          </div>
        </div>

        {/* Footer hint */}
        <div className="relative px-4 sm:px-6 pb-4 sm:pb-6">
          <p className="text-[11px] text-zinc-500 break-words">
            Tip: If you don’t see “Share tab audio”, try selecting a different
            tab or use Chrome-based browsers.
          </p>
        </div>
      </div>
    </div>
  );
}
