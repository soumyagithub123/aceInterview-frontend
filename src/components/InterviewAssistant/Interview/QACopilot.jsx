// import React, { useRef, useEffect } from "react";
// import MarkdownRenderer from "../../MarkdownRenderer";
// import { Sparkles, MessageCircle } from "lucide-react";

// function StreamingAnswer({ text, isComplete }) {
//   return (
//     <div className="relative break-words">
//       <MarkdownRenderer content={text} />
//       {!isComplete && text && (
//         <span className="inline-block w-1 h-4 bg-purple-400 animate-pulse ml-1 rounded-sm" />
//       )}
//     </div>
//   );
// }

// function QAList({ qaList, isMockMode }) {
//   return (
//     <div className="space-y-4 sm:space-y-5">
//       {qaList.map((item, index) => (
//         <div
//           key={item.id}
//           className="bg-[#181818] rounded-xl border border-[#262626] p-4 sm:p-5 transition-all hover:border-[#333]"
//         >
//           {/* QUESTION HEADER */}
//           <div className="flex items-center gap-2 mb-3 flex-wrap">
//             <div className="w-6 h-6 bg-[#222] rounded-md flex items-center justify-center">
//               <span className="text-purple-400 text-sm">❓</span>
//             </div>
//             <span className="text-xs sm:text-sm font-bold text-purple-300">
//               QUESTION #{index + 1}
//             </span>
//           </div>

//           {/* QUESTION TEXT */}
//           <p className="text-gray-200 mb-4 leading-relaxed text-sm sm:text-base break-words">
//             {item.question}
//           </p>

//           {/* ✅ HIDE ANSWER IN MOCK MODE */}
//           {!isMockMode && (
//             <div className="bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg p-3 sm:p-4">
//               <div className="flex items-center gap-2 mb-2">
//                 <MessageCircle className="w-4 h-4 text-purple-300" />
//                 <span className="text-xs sm:text-sm font-bold text-purple-300">
//                   AI ANSWER
//                 </span>
//               </div>

//               <div className="text-gray-200 leading-relaxed text-sm sm:text-base break-words">
//                 <MarkdownRenderer content={item.answer} />
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default function QACopilot({
//   qaList,
//   currentQuestion,
//   currentAnswer,
//   isGenerating,
//   isStreamingComplete,
//   autoScroll,
//   isMockMode,
// }) {
//   const copilotEndRef = useRef(null);

//   useEffect(() => {
//     if (autoScroll) {
//       copilotEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [qaList.length, currentAnswer, autoScroll]);

//   return (
//     <div className="flex flex-col h-full bg-[#111111] border-l border-[#1A1A1A] w-full">

//       {/* HEADER */}
//       <div className="min-h-[48px] flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 border-b border-[#242424] bg-[#111111]">
//         <div className="flex items-center gap-2 flex-wrap">
//           <Sparkles className="w-4 h-4 text-purple-300" />
//           <span className="text-sm font-medium text-white">
//             Interview Copilot
//           </span>
//           <span className="text-xs text-gray-500 hidden sm:inline">
//             AI-Powered Assistant
//           </span>
//         </div>

//         <div className="px-3 py-1 bg-[#1A1A1A] border border-[#2D2D2D] rounded-md text-purple-300 text-xs font-medium">
//           {isMockMode 
//             ? `Question ${qaList.length + (currentQuestion ? 1 : 0)}`
//             : `${qaList.length} ${qaList.length === 1 ? "Answer" : "Answers"}`
//           }
//         </div>
//       </div>

//       {/* CONTENT AREA */}
//       <div className="flex-1 overflow-y-auto p-4 sm:p-6">

//         {/* EMPTY STATE */}
//         {qaList.length === 0 && !currentQuestion ? (
//           <div className="flex flex-col items-center justify-center h-full text-center px-4">
//             <div className="w-14 sm:w-16 h-14 sm:h-16 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg flex items-center justify-center mb-4">
//               <Sparkles className="w-7 sm:w-8 h-7 sm:h-8 text-purple-300" />
//             </div>

//             <h3 className="text-base sm:text-lg font-semibold text-gray-300 mb-1">
//               {isMockMode ? "Ready for Mock Interview" : "Ready to Assist"}
//             </h3>
//             <p className="text-gray-500 max-w-sm text-sm sm:text-base">
//               {isMockMode
//                 ? "Questions will appear here once the mock interview begins."
//                 : "AI answers will appear here once the interview begins."}
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-4 sm:space-y-5">

//             {/* PREVIOUS QA */}
//             {qaList.length > 0 && <QAList qaList={qaList} isMockMode={isMockMode} />}

//             {/* CURRENT STREAMING QUESTION */}
//             {currentQuestion && (
//               <div className="bg-[#181818] border border-[#333] rounded-xl p-4 sm:p-5">
//                 <div className="flex items-center gap-2 mb-3 flex-wrap">
//                   <div className="w-6 h-6 bg-[#222] rounded-md flex items-center justify-center">
//                     <span className="text-purple-300 text-sm">❓</span>
//                   </div>
//                   <span className="text-xs sm:text-sm font-bold text-purple-300">
//                     CURRENT QUESTION
//                   </span>
//                 </div>

//                 <p className="text-gray-200 mb-4 leading-relaxed text-sm sm:text-base break-words">
//                   {currentQuestion}
//                 </p>

//                 {/* ✅ HIDE ANSWER SECTION IN MOCK MODE */}
//                 {!isMockMode && (
//                   <div className="bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg p-3 sm:p-4">
//                     <div className="flex items-center gap-2 mb-2">
//                       <MessageCircle className="w-4 h-4 text-purple-300" />
//                       <span className="text-xs sm:text-sm font-bold text-purple-300">
//                         AI ANSWER
//                       </span>
//                     </div>

//                     <div className="text-gray-200 leading-relaxed text-sm sm:text-base break-words">
//                       {currentAnswer ? (
//                         <StreamingAnswer
//                           text={currentAnswer}
//                           isComplete={isStreamingComplete}
//                         />
//                       ) : (
//                         <div className="flex items-center justify-center py-6 sm:py-8">
//                           <div className="w-7 sm:w-8 h-7 sm:h-8 border-4 border-purple-500/40 border-t-purple-500 rounded-full animate-spin" />
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             <div ref={copilotEndRef} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }










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
    <div className="space-y-3 sm:space-y-4">
      {qaList.map((item, index) => (
        <div
          key={item.id}
          className="bg-[#181818] rounded-xl border border-[#262626] p-3 sm:p-4 lg:p-5 transition-all hover:border-[#333]"
        >
          {/* QUESTION HEADER */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#222] rounded-md flex items-center justify-center shrink-0">
              <span className="text-purple-400 text-xs sm:text-sm">❓</span>
            </div>
            <span className="text-[10px] sm:text-xs lg:text-sm font-bold text-purple-300">
              QUESTION #{index + 1}
            </span>
          </div>

          {/* QUESTION TEXT */}
          <p className="text-gray-200 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm lg:text-base break-words">
            {item.question}
          </p>

          {/* HIDE ANSWER IN MOCK MODE */}
          {!isMockMode && (
            <div className="bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-purple-300 shrink-0" />
                <span className="text-[10px] sm:text-xs lg:text-sm font-bold text-purple-300">
                  AI ANSWER
                </span>
              </div>

              <div className="text-gray-200 leading-relaxed text-xs sm:text-sm lg:text-base break-words">
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
}) {
  const copilotEndRef = useRef(null);

  useEffect(() => {
    if (autoScroll) {
      copilotEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [qaList.length, currentAnswer, autoScroll]);

  return (
    <div className="flex flex-col h-full bg-[#111111] border-l border-[#1A1A1A] w-full">

      {/* HEADER - Fully Responsive */}
      <div className="min-h-[44px] sm:min-h-[48px] flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 border-b border-[#242424] bg-[#111111]">
        
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300 shrink-0" />
          <span className="text-xs sm:text-sm font-medium text-white truncate">
            Interview Copilot
          </span>
          <span className="text-[10px] sm:text-xs text-gray-500 hidden sm:inline whitespace-nowrap">
            AI-Powered Assistant
          </span>
        </div>

        <div className="px-2 sm:px-3 py-1 bg-[#1A1A1A] border border-[#2D2D2D] rounded-md text-purple-300 text-[10px] sm:text-xs font-medium whitespace-nowrap">
          {isMockMode 
            ? `Question ${qaList.length + (currentQuestion ? 1 : 0)}`
            : `${qaList.length} ${qaList.length === 1 ? "Answer" : "Answers"}`
          }
        </div>
      </div>

      {/* CONTENT AREA - Responsive Padding */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">

        {/* EMPTY STATE */}
        {qaList.length === 0 && !currentQuestion ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-300" />
            </div>

            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-300 mb-1">
              {isMockMode ? "Ready for Mock Interview" : "Ready to Assist"}
            </h3>
            <p className="text-gray-500 max-w-sm text-xs sm:text-sm lg:text-base px-4">
              {isMockMode
                ? "Questions will appear here once the mock interview begins."
                : "AI answers will appear here once the interview begins."}
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4 lg:space-y-5">

            {/* PREVIOUS QA */}
            {qaList.length > 0 && <QAList qaList={qaList} isMockMode={isMockMode} />}

            {/* CURRENT STREAMING QUESTION */}
            {currentQuestion && (
              <div className="bg-[#181818] border border-[#333] rounded-xl p-3 sm:p-4 lg:p-5">
                
                <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#222] rounded-md flex items-center justify-center shrink-0">
                    <span className="text-purple-300 text-xs sm:text-sm">❓</span>
                  </div>
                  <span className="text-[10px] sm:text-xs lg:text-sm font-bold text-purple-300">
                    CURRENT QUESTION
                  </span>
                </div>

                <p className="text-gray-200 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm lg:text-base break-words">
                  {currentQuestion}
                </p>

                {/* HIDE ANSWER SECTION IN MOCK MODE */}
                {!isMockMode && (
                  <div className="bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-purple-300 shrink-0" />
                      <span className="text-[10px] sm:text-xs lg:text-sm font-bold text-purple-300">
                        AI ANSWER
                      </span>
                    </div>

                    <div className="text-gray-200 leading-relaxed text-xs sm:text-sm lg:text-base break-words">
                      {currentAnswer ? (
                        <StreamingAnswer
                          text={currentAnswer}
                          isComplete={isStreamingComplete}
                        />
                      ) : (
                        <div className="flex items-center justify-center py-6 sm:py-8">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 border-4 border-purple-500/40 border-t-purple-500 rounded-full animate-spin" />
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
    </div>
  );
}