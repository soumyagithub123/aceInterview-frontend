import React, { useRef, useEffect } from "react";
import { Volume2, Mic, Pause, Play } from "lucide-react";

export default function TranscriptPanel({
  activeView,
  onViewChange,
  interviewerTranscript,
  candidateTranscript,
  currentInterviewerParagraph,
  currentCandidateParagraph,
  interviewerInterim,
  candidateInterim,
  isPaused,
  onPauseToggle,
  isRecording,
  onManualGenerate,
  autoScroll,
}) {
  const transcriptEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    if (autoScroll) {
      transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [
    interviewerTranscript,
    candidateTranscript,
    currentInterviewerParagraph,
    currentCandidateParagraph,
    interviewerInterim,
    candidateInterim,
    autoScroll,
  ]);

  const currentTranscript =
    activeView === "interviewer"
      ? interviewerTranscript
      : candidateTranscript;

  const currentParagraph =
    activeView === "interviewer"
      ? currentInterviewerParagraph
      : currentCandidateParagraph;

  const currentInterim =
    activeView === "interviewer"
      ? interviewerInterim
      : candidateInterim;

  return (
    <div className="flex flex-col h-full bg-[#111111] w-full">
      {/* TOP TABS */}
      <div className="flex items-center justify-between border-b border-[#2A2A2A] bg-[#111111] px-2 sm:px-0">
        <div className="flex overflow-x-auto scrollbar-hide">
          <button
            onClick={() => onViewChange("interviewer")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
              activeView === "interviewer"
                ? "border-purple-500 text-purple-400 bg-[#181818]"
                : "border-transparent text-gray-400 hover:text-gray-300"
            }`}
          >
            <Volume2 className="w-4 h-4" />
            Interviewer
            {interviewerTranscript.length > 0 && (
              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-[10px] sm:text-xs rounded-full">
                {interviewerTranscript.length}
              </span>
            )}
          </button>

          <button
            onClick={() => onViewChange("candidate")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
              activeView === "candidate"
                ? "border-amber-400 text-amber-300 bg-[#181818]"
                : "border-transparent text-gray-400 hover:text-gray-300"
            }`}
          >
            <Mic className="w-4 h-4" />
            Candidate (You)
            {candidateTranscript.length > 0 && (
              <span className="px-2 py-0.5 bg-amber-400/20 text-amber-300 text-[10px] sm:text-xs rounded-full">
                {candidateTranscript.length}
              </span>
            )}
          </button>
        </div>

        <button
          onClick={onPauseToggle}
          className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors mr-2"
          disabled={!isRecording}
        >
          {isPaused ? (
            <Play className="w-4 h-4 text-gray-400" />
          ) : (
            <Pause className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
        {currentTranscript.length === 0 &&
        !currentParagraph &&
        !currentInterim ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-[#181818] rounded-full flex items-center justify-center mb-4 border border-[#2A2A2A]">
              {activeView === "interviewer" ? (
                <Volume2 className="w-8 sm:w-10 h-8 sm:h-10 text-gray-600" />
              ) : (
                <Mic className="w-8 sm:w-10 h-8 sm:h-10 text-gray-600" />
              )}
            </div>
            <h3 className="text-base sm:text-xl font-semibold text-gray-400 mb-1">
              {activeView === "interviewer"
                ? "Interviewer speech"
                : "Your speech"}
            </h3>
            <p className="text-gray-500 text-sm sm:text-base">
              Waiting for speech...
            </p>
          </div>
        ) : (
          <>
            {currentTranscript.map((entry) => (
              <div
                key={entry.id}
                className="bg-[#181818] rounded-lg p-3 sm:p-4 border border-[#2A2A2A]"
              >
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      entry.stream === "interviewer"
                        ? "text-purple-400"
                        : "text-amber-300"
                    }`}
                  >
                    {entry.stream === "interviewer" ? "Interviewer" : "You"}
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-500">
                    {entry.timestamp}
                  </span>
                </div>

                <p className="text-gray-200 leading-relaxed whitespace-pre-wrap break-words text-sm sm:text-base">
                  {entry.text}
                </p>

                {entry.stream === "interviewer" && (
                  <button
                    onClick={() => onManualGenerate(entry.text)}
                    className="mt-3 px-3 py-1 border border-[#2A2A2A] bg-[#1A1A1A] text-gray-300 rounded text-xs sm:text-sm hover:bg-[#222222] transition-colors"
                  >
                    Generate Answer
                  </button>
                )}
              </div>
            ))}

            {(currentParagraph || currentInterim) && (
              <div className="bg-[#1A1A1A] border-2 border-purple-400/40 rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span className="text-xs sm:text-sm font-medium text-purple-300">
                    {activeView === "interviewer" ? "Interviewer" : "You"} speaking…
                  </span>
                </div>
                <p className="text-gray-200 leading-relaxed whitespace-pre-wrap break-words text-sm sm:text-base">
                  {currentParagraph}
                  {currentInterim && (
                    <span className="text-gray-400 opacity-80">
                      {currentParagraph ? " " : ""}
                      {currentInterim}
                    </span>
                  )}
                </p>
              </div>
            )}

            <div ref={transcriptEndRef} />
          </>
        )}
      </div>
    </div>
  );
}
