// QACopilot.jsx — Optimized for streaming latency
// Key changes:
// - StreamingAnswer uses plain <pre> during streaming (no markdown parse cost)
// - Switches to MarkdownRenderer only when streaming is complete
// - QAList wrapped in React.memo (no re-render while streaming)
// - Blinking cursor while streaming

import React, { useRef, useEffect, memo } from "react";
import MarkdownRenderer from "../../MarkdownRenderer";
import { Sparkles, MessageCircle, Clock, RefreshCw } from "lucide-react";

// ─────────────────────────────────────────────────────────
// StreamingAnswer — plain text during stream, markdown after
// ─────────────────────────────────────────────────────────
function StreamingAnswer({ text, isComplete }) {
  if (!text) return null;

  if (!isComplete) {
    // ⚡ Plain pre-formatted text during streaming — zero markdown parse cost
    return (
      <div className="relative break-words">
        <pre
          style={{
            fontFamily: "inherit",
            fontSize: "inherit",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            textAlign: "justify",
            margin: 0,
          }}
        >
          {text}
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "1em",
              background: "#a78bfa",
              marginLeft: "2px",
              verticalAlign: "text-bottom",
              animation: "blink 0.7s step-end infinite",
            }}
          />
        </pre>
        <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
      </div>
    );
  }

  // ✅ Streaming done — render with full markdown
  return (
    <div className="break-words text-justify">
      <MarkdownRenderer content={text} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// QAList — memo so it doesn't re-render on every delta
// ─────────────────────────────────────────────────────────
const QAList = memo(function QAList({ qaList, isMockMode }) {
  return (
    <div className="space-y-4">
      {qaList.map((item, index) => (
        <div
          key={item.id}
          className="bg-[#17171c] rounded-xl border border-white/5 p-4 transition hover:border-white/10"
        >
          {/* QUESTION HEADER */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <div className="w-6 h-6 bg-[#22222a] rounded-md flex items-center justify-center shrink-0">
              <span className="text-purple-400 text-sm">❓</span>
            </div>
            <span className="text-xs font-bold text-purple-300">
              QUESTION #{index + 1}
            </span>
          </div>

          {/* QUESTION TEXT */}
          <p className="text-gray-200 mb-2 leading-snug text-sm break-words">
            {item.question}
          </p>

          {/* ANSWER (hidden in mock mode) */}
          {!isMockMode && (
            <div className="bg-[#141417] border border-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-purple-300 shrink-0" />
                <span className="text-xs font-bold text-purple-300">AI ANSWER</span>
              </div>
              <div className="text-gray-200 leading-snug text-sm break-words text-justify">
                <MarkdownRenderer content={item.answer} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

// ─────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────
export default function QACopilot({
  qaList,
  currentQuestion,
  currentAnswer,
  isGenerating,
  isStreamingComplete,
  autoScroll,
  isMockMode,
  mockControls = null,
  mockQuestionCount,
  timerSeconds = null,
  canExtend = false,
  onExtend = null,
  isExtending = false,
  extendError = null,
}) {
  const copilotEndRef = useRef(null);

  useEffect(() => {
    if (autoScroll) {
      copilotEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [qaList.length, currentAnswer, autoScroll]);

  const formatTime = (seconds) => {
    if (seconds === null) return null;
    const abs = Math.abs(seconds);
    const mm = String(Math.floor(abs / 60)).padStart(2, "0");
    const ss = String(abs % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const formattedTime = formatTime(timerSeconds);

  return (
    <div className="flex flex-col h-full bg-[#0f0f12] border-l border-white/5 w-full">

      {/* HEADER */}
      <div className="h-14 flex items-center justify-between px-4 sm:px-6 border-b border-white/5 bg-[#111114] shrink-0">

        <div className="flex items-center gap-2 min-w-0">
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
          <span className="text-sm font-medium text-white truncate">Interview Copilot</span>
          <span className="text-xs text-gray-500 hidden sm:inline">AI Assistant</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Answer / Question count */}
          <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-purple-300 text-xs font-medium">
            {isMockMode
              ? `Question ${mockQuestionCount || (qaList.length + (currentQuestion ? 1 : 0))}`
              : `${qaList.length} ${qaList.length === 1 ? "Answer" : "Answers"}`}
          </div>

          {/* SESSION TIMER */}
          {formattedTime !== null && (
            <div className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-mono font-semibold transition-all ${
              timerSeconds <= 0
                ? "border-red-500/40 bg-red-500/10 text-red-400"
                : timerSeconds <= 60
                ? "border-yellow-500/40 bg-yellow-500/10 text-yellow-400"
                : "border-white/10 bg-white/5 text-green-400"
            }`}>
              <Clock className="w-3 h-3 shrink-0" />
              <span>{formattedTime}</span>

              {canExtend && timerSeconds <= 60 && timerSeconds >= 0 && (
                <button
                  onClick={onExtend}
                  disabled={isExtending}
                  className="ml-1 flex items-center gap-1 rounded bg-purple-600 hover:bg-purple-500 disabled:opacity-50 px-1.5 py-0.5 text-[10px] text-white transition"
                >
                  {isExtending
                    ? <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                    : <RefreshCw className="w-2.5 h-2.5" />}
                  <span className="hidden sm:inline">{isExtending ? "..." : "+30m"}</span>
                </button>
              )}

              {!canExtend && timerSeconds <= 0 && (
                <span className="ml-1 text-[10px] text-red-400 font-normal">Session ended</span>
              )}

              {canExtend && timerSeconds < 0 && (
                <button
                  onClick={onExtend}
                  disabled={isExtending}
                  className="ml-1 flex items-center gap-1 rounded bg-purple-600 hover:bg-purple-500 disabled:opacity-50 px-1.5 py-0.5 text-[10px] text-white transition"
                >
                  {isExtending
                    ? <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                    : <RefreshCw className="w-2.5 h-2.5" />}
                  <span className="hidden sm:inline">{isExtending ? "Extending..." : "Extend +30m"}</span>
                </button>
              )}

              {extendError && (
                <span className="ml-1 text-[10px] text-red-300 max-w-[80px] truncate">{extendError}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5">

        {qaList.length === 0 && !currentQuestion ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-14 h-14 bg-[#1a1a21] border border-white/10 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-7 h-7 text-purple-300" />
            </div>
            <h3 className="text-base font-semibold text-gray-300 mb-2">
              {isMockMode ? "Ready for Mock Interview" : "Ready to Assist"}
            </h3>
            <p className="text-gray-500 max-w-sm text-sm">
              {isMockMode
                ? "Questions will appear here once the mock interview begins."
                : "AI answers will appear here once the interview begins."}
            </p>
          </div>
        ) : (
          <div className="space-y-5">

            {/* Previous Q&A List — memoized, won't re-render on deltas */}
            {qaList.length > 0 && (
              <QAList qaList={qaList} isMockMode={isMockMode} />
            )}

            {/* CURRENT STREAMING QUESTION + ANSWER */}
            {currentQuestion && (
              <div className="bg-[#17171c] border border-white/10 rounded-xl p-4">

                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <div className="w-6 h-6 bg-[#22222a] rounded-md flex items-center justify-center shrink-0">
                    <span className="text-purple-300 text-sm">❓</span>
                  </div>
                  <span className="text-xs font-bold text-purple-300">CURRENT QUESTION</span>
                </div>

                <p className="text-gray-200 mb-2 leading-snug text-sm break-words">
                  {currentQuestion}
                </p>

                {!isMockMode && (
                  <div className="bg-[#141417] border border-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-4 h-4 text-purple-300 shrink-0" />
                      <span className="text-xs font-bold text-purple-300">AI ANSWER</span>
                      {/* Generating indicator (before first token) */}
                      {isGenerating && !currentAnswer && (
                        <span className="ml-auto flex items-center gap-1.5 text-xs text-purple-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                          Generating...
                        </span>
                      )}
                    </div>

                    <div className="text-gray-200 leading-snug text-sm break-words text-justify">
                      {currentAnswer ? (
                        <StreamingAnswer
                          text={currentAnswer}
                          isComplete={isStreamingComplete}
                        />
                      ) : (
                        /* Spinner only while waiting for first token */
                        <div className="flex items-center gap-2 py-6">
                          <div className="w-5 h-5 border-2 border-purple-500/40 border-t-purple-500 rounded-full animate-spin" />
                          <span className="text-xs text-gray-500">Thinking...</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div ref={copilotEndRef} />
          </div>
        )}
      </div>

      {/* MOCK CONTROLS FOOTER — desktop only */}
      {mockControls && (
        <div className="hidden lg:block border-t border-white/5 bg-[#111114] shrink-0">
          {mockControls}
        </div>
      )}
    </div>
  );
}