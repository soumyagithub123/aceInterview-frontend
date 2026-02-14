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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f14] shadow-2xl">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-white/10">
          
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
              <Volume2 className="h-5 w-5 text-emerald-300" />
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-white">
                Enable Interviewer Audio
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                Capture the interviewer's voice directly from your meeting tab.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-9 w-9 rounded-lg border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition flex items-center justify-center shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* BODY (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* STEPS */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-purple-300" />
                <p className="text-sm font-semibold text-white">
                  Quick setup (30 seconds)
                </p>
              </div>
              <span className="text-xs text-zinc-500">
                Zoom • Meet • Teams
              </span>
            </div>

            <div className="space-y-3">
              {[
                "Click “Select Tab Audio” below",
                "Choose your interview tab (Zoom/Meet/Teams)",
                "Enable “Share tab audio” checkbox",
                "Click “Share” to confirm",
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg border border-white/10 bg-black/30"
                >
                  <div className="h-7 w-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-200 shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ERROR */}
          {errorMessage && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 flex gap-3">
              <AlertCircle className="h-5 w-5 text-rose-300 shrink-0 mt-1" />
              <div>
                <p className="text-sm font-semibold text-rose-200">Error</p>
                <p className="text-sm text-rose-200/90 mt-1">
                  {errorMessage}
                </p>
              </div>
            </div>
          )}

          {/* CTA BUTTON */}
          <button
            onClick={onSelect}
            className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 transition text-black font-semibold py-3 px-6 shadow-lg"
          >
            Select Tab Audio
          </button>

          {/* INFO SECTION */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex gap-3">
            <Info className="h-5 w-5 text-zinc-300 shrink-0 mt-1" />
            <p className="text-sm text-zinc-400 leading-relaxed">
              Your microphone is already active. This step captures the
              interviewer's voice from your browser tab audio.
            </p>
          </div>

        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-white/10 text-xs text-zinc-500">
          Tip: If you don't see "Share tab audio", try selecting a different
          tab or use Chrome-based browsers.
        </div>

      </div>
    </div>
  );
}