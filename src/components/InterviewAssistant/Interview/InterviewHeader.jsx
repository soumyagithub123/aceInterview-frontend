import React from "react";
import { ArrowLeft, Mic, MicOff, Settings, LogOut } from "lucide-react";

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
    <header className="w-full bg-[#0A0A0A] border-b border-[#1A1A1A] sticky top-0 z-50">
      <div className="w-full px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between">

        {/* LEFT SECTION (Desktop unchanged feel) */}
        <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
          
          <button
            onClick={onBackClick}
            className="p-2 rounded-md bg-[#111] hover:bg-[#1a1a1a] text-gray-300 hover:text-white transition shrink-0"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex flex-col leading-tight min-w-0">
            
            {/* Title */}
            <h1 className="text-sm sm:text-lg font-semibold text-white truncate">
              {personaData
                ? `${personaData.position} @ ${personaData.company_name}`
                : "Interview Assistant"}
            </h1>

            {/* Subtitle */}
            <div className="hidden sm:flex items-center flex-wrap gap-x-2 text-sm text-gray-400 mt-1">
              <span>Real-time Transcription</span>
              <span className="text-gray-600">•</span>
              <span>AI Q&A</span>

              {domain && (
                <>
                  <span className="text-gray-600">•</span>
                  <span>
                    <span className="text-gray-500">Domain:</span>{" "}
                    <span className="text-gray-300 font-medium">{domain}</span>
                  </span>
                </>
              )}
            </div>

          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Record */}
          <button
            onClick={isRecording ? onStopRecording : onStartRecording}
            className={`flex items-center justify-center sm:gap-2 px-2 sm:px-4 py-2 rounded-md transition ${
              isRecording
                ? "bg-[#F59E0B] hover:bg-[#D97706] text-black"
                : "bg-[#6B4EFF] hover:bg-[#5A3EF0] text-white"
            }`}
          >
            {isRecording ? (
              <>
                <MicOff className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {isMockMode ? "End Mock" : "Stop"}
                </span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {isMockMode ? "Start Mock" : "Start Recording"}
                </span>
              </>
            )}
          </button>

          {/* Settings */}
          <button
            onClick={onSettingsClick}
            className="p-2 rounded-md bg-[#111] hover:bg-[#1a1a1a] text-gray-300 hover:text-white transition"
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Exit */}
          <button
            onClick={onExit}
            className="flex items-center justify-center px-2 sm:px-4 py-2 rounded-md bg-[#D9365E] hover:bg-[#C42E52] text-white transition"
          >
            <LogOut className="w-4 h-4 sm:hidden" />
            <span className="hidden sm:inline">Exit</span>
          </button>

        </div>
      </div>
    </header>
  );
}