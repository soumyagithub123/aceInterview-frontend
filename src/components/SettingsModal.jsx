import React, { useEffect, useMemo } from "react";
import { X, Settings as SettingsIcon, Server, Cpu, Wand2, Globe, Timer, Code2, ShieldCheck } from "lucide-react";

export default function SettingsModal({ settings, backendUrl, onClose }) {
  // Optional UX: ESC closes (same functionality, just nicer)
  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const rows = useMemo(
    () => [
      {
        label: "Style",
        value: settings.selectedResponseStyleId || settings.responseStyle,
        icon: Wand2,
      },
      { label: "Language", value: settings.audioLanguage, icon: Globe },
      { label: "Pause Time", value: `${settings.pauseInterval}s`, icon: Timer },
      { label: "Coding", value: settings.programmingLanguage, icon: Code2 },
      { label: "Model", value: settings.defaultModel, icon: Cpu },
      // { label: "Backend", value: backendUrl, icon: Server },
    ],
    [settings, backendUrl]
  );

  const opt = useMemo(
    () => [
      "30s client keepalive (Render 60s timeout)",
      "30s server keepalive (dual protection)",
      "Immediate WebSocket handshake",
      "Auto-reconnection with exponential backoff",
    ],
    []
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75" onClick={onClose} aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-purple-500/10 via-fuchsia-500/5 to-transparent" />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b10] shadow-[0_40px_140px_-60px_rgba(0,0,0,0.85)]">
        {/* Top glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500/30 via-fuchsia-500/20 to-cyan-500/20 blur-3xl" />

        {/* Header */}
        <div className="relative flex items-center justify-between gap-4 px-6 py-5 border-b border-white/10 bg-[#0b0b10]/85 backdrop-blur-xl">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative">
              <div className="absolute -inset-2 rounded-2xl bg-purple-500/15 blur-xl" />
              <div className="relative h-11 w-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
                <SettingsIcon className="h-5 w-5 text-purple-200" />
              </div>
            </div>

            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                Settings
              </h2>
              <p className="text-sm text-zinc-400 truncate">
                Current configuration and performance safeguards
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition flex items-center justify-center"
            aria-label="Close"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="relative overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-5">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* Configuration */}
            <section className="lg:col-span-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold tracking-wide text-purple-200">
                  Configuration
                </h3>
                <span className="text-xs text-zinc-500">
                  Read-only
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {rows.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-2xl border border-white/10 bg-black/20 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-zinc-200" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-zinc-400">
                          {label}
                        </p>
                        <p className="mt-1 text-sm text-white break-words">
                          {value ?? "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Optimization */}
            <section className="lg:col-span-2">
              <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/10 via-white/[0.04] to-white/[0.03] p-5 shadow-[0_18px_80px_-55px_rgba(16,185,129,0.35)]">
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-5 w-5 text-emerald-200" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-emerald-200">
                      Reliability safeguards
                    </h4>
                    <p className="mt-1 text-xs text-zinc-400">
                      Keeps the session stable on Render/WebSockets.
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {opt.map((text) => (
                    <div
                      key={text}
                      className="rounded-2xl border border-white/10 bg-black/20 p-3 flex items-start gap-2"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <p className="text-sm text-zinc-200 leading-relaxed">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-[11px] text-zinc-500">
                Tip: If audio/transcription stalls, these mechanisms handle reconnects automatically.
              </p>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="relative border-t border-white/10 bg-[#0b0b10]/85 backdrop-blur-xl px-6 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-2xl border border-purple-300/15 bg-gradient-to-b from-purple-500 to-fuchsia-500 hover:brightness-[1.02] active:brightness-[0.98] text-white font-semibold py-3 shadow-[0_20px_70px_-45px_rgba(168,85,247,0.6)] transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
