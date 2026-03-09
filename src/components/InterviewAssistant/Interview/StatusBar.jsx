import React from "react";

export default function StatusBar({
  deepgramStatus,
  qaStatus,
  isGenerating,
  isPaused,
}) {
  const isDeepgramActive =
    deepgramStatus &&
    ["ready", "connected", "recording"].some((s) =>
      deepgramStatus.toLowerCase().includes(s)
    );

  const isDeepgramReconnecting =
    deepgramStatus &&
    deepgramStatus.toLowerCase().includes("reconnecting");

  const isQAActive =
    qaStatus &&
    ["ready", "active", "initializing"].some((s) =>
      qaStatus.toLowerCase().includes(s)
    );

  const isQAReconnecting =
    qaStatus &&
    qaStatus.toLowerCase().includes("reconnecting");

  return (
    <div className="h-10 bg-[#0f0f12] border-t border-white/5 px-4 flex items-center justify-between text-[11px]">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-5 min-w-0">

        {/* Deepgram */}
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={`w-2 h-2 rounded-full shrink-0 ${
              isDeepgramActive
                ? "bg-green-500"
                : isDeepgramReconnecting
                ? "bg-yellow-400 animate-pulse"
                : "bg-gray-600"
            }`}
          />
          <span className="text-gray-400 truncate">
            Deepgram:
            <span className="text-gray-300 ml-1 truncate max-w-[100px] inline-block align-bottom">
              {deepgramStatus}
            </span>
          </span>
        </div>

        {/* QA */}
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={`w-2 h-2 rounded-full shrink-0 ${
              isQAActive
                ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.1)]"
                : isQAReconnecting
                ? "bg-yellow-400 animate-pulse"
                : "bg-gray-600"
            }`}
          />
          <span className="text-gray-400 truncate">
            Q&A:
            <span className="text-gray-300 ml-1 truncate max-w-[100px] inline-block align-bottom">
              {qaStatus}
            </span>
          </span>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {isGenerating && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-purple-300">
              Processing
            </span>
          </div>
        )}

        {isPaused && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            <span className="text-yellow-400 font-medium">
              Paused
            </span>
          </div>
        )}

        {!isGenerating && !isPaused && (
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="text-white/30 font-bold uppercase text-[9px] tracking-widest">
              Live
            </span>
          </div>
        )}
      </div>
    </div>
  );
}