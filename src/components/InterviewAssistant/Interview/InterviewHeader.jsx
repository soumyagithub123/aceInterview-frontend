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
}) {
  return (
    <header className="w-full bg-[#0A0A0A] border-b border-[#1A1A1A] sticky top-0 z-50">
      <div className="w-full px-3 sm:px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        {/* LEFT SECTION */}
        <div className="flex items-start gap-3 min-w-0">
          {/* Back Button */}
          <button
            onClick={onBackClick}
            className="p-2 rounded-md bg-[#111] hover:bg-[#1a1a1a] text-gray-300 hover:text-white transition shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* TITLE BLOCK */}
          <div className="flex flex-col leading-tight min-w-0">
            <h1 className="text-[16px] sm:text-[18px] font-semibold text-white capitalize tracking-wide truncate">
              {personaData
                ? `${personaData.position} @ ${personaData.company_name}`
                : "Interview Assistant"}
            </h1>

            <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-1 text-xs sm:text-sm text-gray-400">
              <span>Real-time Transcription</span>
              <span className="text-gray-600 hidden sm:inline">•</span>
              <span>AI Q&A</span>

              {domain && (
                <>
                  <span className="text-gray-600 hidden sm:inline">•</span>
                  <span className="hidden sm:inline">
                    <span className="text-gray-500">Domain:</span>{" "}
                    <span className="text-gray-300 font-medium">{domain}</span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">

          {/* Record Button */}
          <button
            onClick={isRecording ? onStopRecording : onStartRecording}
            className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-lg font-medium transition shadow ${
              isRecording
                ? "bg-[#F59E0B] hover:bg-[#D97706] text-black"
                : "bg-[#6B4EFF] hover:bg-[#5A3EF0] text-white"
            }`}
          >
            {isRecording ? (
              <>
                <MicOff className="w-4 h-4" />
                <span className="hidden sm:inline">Stop</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span className="hidden sm:inline">Start Recording</span>
              </>
            )}
          </button>

          {/* Live Badge */}
          {isRecording && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-red-700/20 border border-red-600/40 rounded-md">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
              <span className="text-xs text-red-400 font-medium">Live</span>
            </div>
          )}

          {/* Settings */}
          <button
            onClick={onSettingsClick}
            className="p-2 rounded-md bg-[#111] hover:bg-[#1a1a1a] text-gray-300 hover:text-white transition"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Exit Button */}
          <button
            onClick={onExit}
            className="px-3 sm:px-4 py-2 rounded-md bg-[#D9365E] hover:bg-[#C42E52] text-white font-medium transition"
          >
            Exit
          </button>
        </div>
      </div>
    </header>
  );
}

