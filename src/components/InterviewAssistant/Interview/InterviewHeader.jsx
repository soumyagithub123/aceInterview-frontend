// Responsive Header

import React from "react";
import { ArrowLeft, Mic, MicOff, Settings } from "lucide-react";

export default function InterviewHeader({
  personaData,
  domain,
  isRecording,
  onStartRecording,
  onStopRecording,
  onSettingsClick,
  onBackClick,
  onExit,
  isMockMode,
}) {
  return (
    <header className="w-full bg-[#0A0A0A] border-b border-[#1A1A1A] sticky top-0 z-0 shrink-0">
      <div className="w-full px-2 py-2 min-[650px]:px-4 min-[650px]:py-3 flex flex-col min-[650px]:flex-row min-[650px]:items-center min-[650px]:justify-between gap-3">

        {/* LEFT SECTION */}
        <div className="flex items-start gap-2 min-[650px]:gap-3 min-w-0">
          {/* Back Button */}
          <button
            onClick={onBackClick}
            className="p-1.5 min-[650px]:p-2 rounded-md bg-[#111] hover:bg-[#1a1a1a] text-gray-300 hover:text-white transition shrink-0"
          >
            <ArrowLeft className="w-4 h-4 min-[650px]:w-5 min-[650px]:h-5" />
          </button>

          {/* TITLE BLOCK */}
          <div className="flex flex-col leading-tight min-w-0">
            <h1 className="text-sm min-[650px]:text-lg font-semibold text-white capitalize tracking-wide truncate">
              {personaData
                ? `${personaData.position} @ ${personaData.company_name}`
                : "Interview Assistant"}
            </h1>

            <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-0.5 min-[650px]:mt-1 text-[10px] min-[650px]:text-sm text-gray-400">
              <span>Real-time Transcription</span>
              <span className="text-gray-600 hidden min-[650px]:inline">•</span>
              <span>AI Q&A</span>

              {domain && (
                <>
                  <span className="text-gray-600 hidden min-[650px]:inline">•</span>
                  <span className="hidden min-[650px]:inline">
                    <span className="text-gray-500">Domain:</span>{" "}
                    <span className="text-gray-300 font-medium">{domain}</span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center justify-between min-[650px]:justify-end gap-2 min-[650px]:gap-3">

          {/* Record Button */}
          <button
            onClick={isRecording ? onStopRecording : onStartRecording}
            className={`flex items-center gap-2 px-3 py-1.5 min-[650px]:px-5 min-[650px]:py-2 rounded-lg font-medium transition shadow text-xs min-[650px]:text-base ${
              isRecording
                ? "bg-[#F59E0B] hover:bg-[#D97706] text-black"
                : "bg-[#6B4EFF] hover:bg-[#5A3EF0] text-white"
            }`}
          >
            {isRecording ? (
              <>
                <MicOff className="w-3 h-3 min-[650px]:w-4 min-[650px]:h-4" />
                <span className="hidden min-[650px]:inline">
                  {isMockMode ? "End Mock" : "Stop"}
                </span>
                <span className="inline min-[650px]:hidden">End</span>
              </>
            ) : (
              <>
                <Mic className="w-3 h-3 min-[650px]:w-4 min-[650px]:h-4" />
                <span className="hidden min-[650px]:inline">
                  {isMockMode ? "Start Mock" : "Start Recording"}
                </span>
                <span className="inline min-[650px]:hidden">Start</span>
              </>
            )}
          </button>

          {/* Live Badge */}
          {isRecording && (
            <div className="flex items-center gap-1.5 min-[650px]:gap-2 px-2 py-0.5 min-[650px]:px-3 min-[650px]:py-1 bg-red-700/20 border border-red-600/40 rounded-md">
              <div className="w-1.5 h-1.5 min-[650px]:w-2 min-[650px]:h-2 bg-red-500 rounded-full animate-ping"></div>
              <span className="text-[10px] min-[650px]:text-xs text-red-400 font-medium">Live</span>
            </div>
          )}

          {/* Settings */}
          <button
            onClick={onSettingsClick}
            className="p-1.5 min-[650px]:p-2 rounded-md bg-[#111] hover:bg-[#1a1a1a] text-gray-300 hover:text-white transition"
          >
            <Settings className="w-4 h-4 min-[650px]:w-5 min-[650px]:h-5" />
          </button>

          {/* Exit Button */}
          <button
            onClick={onExit}
            className="px-3 py-1.5 min-[650px]:px-4 min-[650px]:py-2 rounded-md bg-[#D9365E] hover:bg-[#C42E52] text-white font-medium transition text-xs min-[650px]:text-base"
          >
            Exit
          </button>
        </div>
      </div>
    </header>
  );
}

