import React, { useRef, useEffect, useState } from "react";
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
  
  // ✅ Typewriter effect for word-by-word display
  const [displayedInterim, setDisplayedInterim] = useState("");
  const interimTimeoutRef = useRef(null);

  // ✅ Animate interim text word by word
  useEffect(() => {
    const currentInterim = activeView === "interviewer" ? interviewerInterim : candidateInterim;
    
    if (!currentInterim) {
      setDisplayedInterim("");
      return;
    }

    // If new interim is longer, animate the new words
    if (currentInterim.length > displayedInterim.length) {
      const words = currentInterim.split(" ");
      const displayedWords = displayedInterim.split(" ");
      
      let wordIndex = displayedWords.length;
      
      const animateNextWord = () => {
        if (wordIndex < words.length) {
          setDisplayedInterim(words.slice(0, wordIndex + 1).join(" "));
          wordIndex++;
          interimTimeoutRef.current = setTimeout(animateNextWord, 50); // 50ms per word
        }
      };
      
      animateNextWord();
    } else {
      // If interim got shorter (new sentence), show immediately
      setDisplayedInterim(currentInterim);
    }

    return () => {
      if (interimTimeoutRef.current) {
        clearTimeout(interimTimeoutRef.current);
      }
    };
  }, [interviewerInterim, candidateInterim, activeView]);

  useEffect(() => {
    if (autoScroll) {
      transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [
    candidateTranscript,
    interviewerTranscript,
    currentCandidateParagraph,
    currentInterviewerParagraph,
    displayedInterim,
    autoScroll,
  ]);

  const currentTranscript =
    activeView === "interviewer" ? interviewerTranscript : candidateTranscript;

  const currentParagraph =
    activeView === "interviewer"
      ? currentInterviewerParagraph
      : currentCandidateParagraph;

  return (
    <div className="flex flex-col h-full bg-[#111111]">
      {/* TOP TABS */}
      <div className="flex items-center justify-between border-b border-[#2A2A2A] bg-[#111111]">
        <div className="flex">
          {/* INTERVIEWER TAB */}
          <button
            onClick={() => onViewChange("interviewer")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all border-b-2 ${
              activeView === "interviewer"
                ? "border-purple-500 text-purple-400 bg-[#181818]"
                : "border-transparent text-gray-400 hover:text-gray-300"
            }`}
          >
            <Volume2 className="w-4 h-4" />
            Interviewer
            {interviewerTranscript.length > 0 && (
              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                {interviewerTranscript.length}
              </span>
            )}
          </button>

          {/* CANDIDATE TAB */}
          <button
            onClick={() => onViewChange("candidate")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all border-b-2 ${
              activeView === "candidate"
                ? "border-amber-400 text-amber-300 bg-[#181818]"
                : "border-transparent text-gray-400 hover:text-gray-300"
            }`}
          >
            <Mic className="w-4 h-4" />
            Candidate (You)
            {candidateTranscript.length > 0 && (
              <span className="px-2 py-0.5 bg-amber-400/20 text-amber-300 text-xs rounded-full">
                {candidateTranscript.length}
              </span>
            )}
          </button>
        </div>

        {/* PAUSE BUTTON */}
        <button
          onClick={onPauseToggle}
          className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors mr-2"
          disabled={!isRecording}
          title={isPaused ? "Resume" : "Pause"}
        >
          {isPaused ? (
            <Play className="w-4 h-4 text-gray-400" />
          ) : (
            <Pause className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {currentTranscript.length === 0 && !currentParagraph && !displayedInterim ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 bg-[#181818] rounded-full flex items-center justify-center mb-4 border border-[#2A2A2A]">
              {activeView === "interviewer" ? (
                <Volume2 className="w-10 h-10 text-gray-600" />
              ) : (
                <Mic className="w-10 h-10 text-gray-600" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              {activeView === "interviewer"
                ? "Interviewer speech"
                : "Your speech"}
            </h3>
            <p className="text-gray-500">Waiting for speech...</p>
          </div>
        ) : (
          <>
            {/* FINALIZED TRANSCRIPT BLOCKS */}
            {currentTranscript.map((entry) => (
              <div
                key={entry.id}
                className="bg-[#181818] rounded-lg p-4 border border-[#2A2A2A]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-sm font-medium ${
                      entry.stream === "interviewer"
                        ? "text-purple-400"
                        : "text-amber-300"
                    }`}
                  >
                    {entry.stream === "interviewer" ? "Interviewer" : "You"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {entry.timestamp}
                  </span>
                </div>

                <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {entry.text}
                </p>

                {entry.stream === "interviewer" && (
                  <button
                    onClick={() => onManualGenerate(entry.text)}
                    className="mt-3 px-3 py-1 border border-[#2A2A2A] bg-[#1A1A1A] text-gray-300 rounded text-sm hover:bg-[#222222] transition-colors"
                  >
                    Generate Answer
                  </button>
                )}
              </div>
            ))}

            {/* ✅ LIVE PARAGRAPH WITH ANIMATED WORD-BY-WORD INTERIM */}
            {(currentParagraph || displayedInterim) && (
              <div className="bg-[#1A1A1A] border-2 border-purple-400/40 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-purple-300">
                    {activeView === "interviewer" ? "Interviewer" : "You"} speaking…
                  </span>
                </div>
                <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {/* ✅ Accumulated final text (white) */}
                  {currentParagraph}
                  
                  {/* ✅ Animated interim text (gray, word by word) */}
                  {displayedInterim && (
                    <span className="text-gray-400 opacity-80">
                      {currentParagraph ? " " : ""}{displayedInterim}
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