import React, { useRef, useEffect } from "react";
import MarkdownRenderer from "../../MarkdownRenderer";
import { Sparkles, MessageCircle } from "lucide-react";

function StreamingAnswer({ text, isComplete }) {
  return (
    <div className="relative break-words">
      <MarkdownRenderer content={text} />
      {!isComplete && text && (
        <span className="inline-block w-1 h-4 bg-purple-400 animate-pulse ml-1 rounded-sm" />
      )}
    </div>
  );
}

function QAList({ qaList, isMockMode }) {
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
          <p className="text-gray-200 mb-4 leading-relaxed text-sm break-words">
            {item.question}
          </p>

          {/* ANSWER (hidden in mock mode) */}
          {!isMockMode && (
            <div className="bg-[#141417] border border-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-purple-300 shrink-0" />
                <span className="text-xs font-bold text-purple-300">
                  AI ANSWER
                </span>
              </div>

              <div className="text-gray-200 leading-relaxed text-sm break-words">
                <MarkdownRenderer content={item.answer} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function QACopilot({
  qaList,
  currentQuestion,
  currentAnswer,
  isGenerating,
  isStreamingComplete,
  autoScroll,
  isMockMode,
  // ✅ NEW: Mock interview controls props
  mockControls = null,
  mockQuestionCount,
}) {
  const copilotEndRef = useRef(null);

  useEffect(() => {
    if (autoScroll) {
      copilotEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [qaList.length, currentAnswer, autoScroll]);

  return (
    <div className="flex flex-col h-full bg-[#0f0f12] border-l border-white/5 w-full">

      {/* HEADER */}
      <div className="h-14 flex items-center justify-between px-4 sm:px-6 border-b border-white/5 bg-[#111114] shrink-0">
        
        <div className="flex items-center gap-2 min-w-0">
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
          <span className="text-sm font-medium text-white truncate">
            Interview Copilot
          </span>
          <span className="text-xs text-gray-500 hidden sm:inline">
            AI Assistant
          </span>
        </div>

        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-purple-300 text-xs font-medium">
          {isMockMode 
            ? `Question ${mockQuestionCount || (qaList.length + (currentQuestion ? 1 : 0))}`
            : `${qaList.length} ${qaList.length === 1 ? "Answer" : "Answers"}`
          }
        </div>
      </div>

      {/* CONTENT - Scrollable area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5">

        {/* EMPTY STATE */}
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

            {/* PREVIOUS QA */}
            {qaList.length > 0 && (
              <QAList qaList={qaList} isMockMode={isMockMode} />
            )}

            {/* CURRENT STREAMING QUESTION */}
            {currentQuestion && (
              <div className="bg-[#17171c] border border-white/10 rounded-xl p-4">
                
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <div className="w-6 h-6 bg-[#22222a] rounded-md flex items-center justify-center shrink-0">
                    <span className="text-purple-300 text-sm">❓</span>
                  </div>
                  <span className="text-xs font-bold text-purple-300">
                    CURRENT QUESTION
                  </span>
                </div>

                <p className="text-gray-200 mb-4 leading-relaxed text-sm break-words">
                  {currentQuestion}
                </p>

                {!isMockMode && (
                  <div className="bg-[#141417] border border-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-4 h-4 text-purple-300 shrink-0" />
                      <span className="text-xs font-bold text-purple-300">
                        AI ANSWER
                      </span>
                    </div>

                    <div className="text-gray-200 leading-relaxed text-sm break-words">
                      {currentAnswer ? (
                        <StreamingAnswer
                          text={currentAnswer}
                          isComplete={isStreamingComplete}
                        />
                      ) : (
                        <div className="flex items-center justify-center py-8">
                          <div className="w-6 h-6 border-4 border-purple-500/40 border-t-purple-500 rounded-full animate-spin" />
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

      {/* ✅ MOCK CONTROLS FOOTER - Only on desktop (lg+) */}
      {mockControls && (
        <div className="hidden lg:block border-t border-white/5 bg-[#111114] shrink-0">
          {mockControls}
        </div>
      )}
    </div>
  );
}