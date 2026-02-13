// import React from "react";

// export default function StatusBar({
//   deepgramStatus,
//   qaStatus,
//   isGenerating,
//   isPaused,
// }) {
//   const isDeepgramActive =
//     deepgramStatus &&
//     ["ready", "connected", "recording"].some((s) =>
//       deepgramStatus.toLowerCase().includes(s)
//     );

//   const isDeepgramReconnecting =
//     deepgramStatus &&
//     deepgramStatus.toLowerCase().includes("reconnecting");

//   const isQAActive =
//     qaStatus &&
//     ["ready", "active"].some((s) =>
//       qaStatus.toLowerCase().includes(s)
//     );

//   const isQAReconnecting =
//     qaStatus &&
//     qaStatus.toLowerCase().includes("reconnecting");

//   return (
//     <div className="bg-[#111111] border-t border-[#1F1F1F] px-2 py-1.5 min-[650px]:px-5 min-[650px]:py-2.5 shrink-0">
//       <div className="flex items-center justify-between text-[10px] min-[650px]:text-xs">

//         {/* LEFT STATUS INDICATORS */}
//         <div className="flex items-center gap-2 min-[650px]:gap-6">

//           {/* DEEPGRAM */}
//           <div className="flex items-center gap-1.5 min-[650px]:gap-2">
//             <div
//               className={`w-1.5 h-1.5 min-[650px]:w-2 min-[650px]:h-2 rounded-full ${
//                 isDeepgramActive
//                   ? "bg-green-500"
//                   : isDeepgramReconnecting
//                   ? "bg-yellow-400 animate-pulse"
//                   : "bg-gray-600"
//               }`}
//             />
//             <span className="text-gray-400">
//               <span className="hidden min-[650px]:inline">Deepgram: </span>
//               <span className="text-gray-300">{deepgramStatus}</span>
//             </span>
//           </div>

//           {/* Q&A */}
//           <div className="flex items-center gap-1.5 min-[650px]:gap-2">
//             <div
//               className={`w-1.5 h-1.5 min-[650px]:w-2 min-[650px]:h-2 rounded-full ${
//                 isQAActive
//                   ? "bg-purple-400"
//                   : isQAReconnecting
//                   ? "bg-yellow-400 animate-pulse"
//                   : "bg-gray-600"
//               }`}
//             />
//             <span className="text-gray-400">
//               <span className="hidden min-[650px]:inline">Q&A: </span>
//               <span className="text-gray-300">{qaStatus}</span>
//             </span>
//           </div>
//         </div>

//         {/* RIGHT SIDE: PROCESSING / PAUSED */}
//         <div className="flex items-center gap-2 min-[650px]:gap-4">

//           {isGenerating && (
//             <div className="flex items-center gap-1.5 min-[650px]:gap-2">
//               <div className="w-0.5 h-3 min-[650px]:w-1 min-[650px]:h-4 bg-[#222]" />
//               <div className="flex items-center gap-1.5 min-[650px]:gap-2">
//                 <div className="w-1.5 h-1.5 min-[650px]:w-2 min-[650px]:h-2 bg-purple-400 rounded-full animate-pulse" />
//                 <span className="text-purple-300 text-[9px] min-[650px]:text-[11px]">
//                   Processing…
//                 </span>
//               </div>
//             </div>
//           )}

//           {isPaused && (
//             <div className="flex items-center gap-1.5 min-[650px]:gap-2">
//               <div className="w-0.5 h-3 min-[650px]:w-1 min-[650px]:h-4 bg-[#222]" />
//               <div className="flex items-center gap-1.5 min-[650px]:gap-2">
//                 <div className="w-1.5 h-1.5 min-[650px]:w-2 min-[650px]:h-2 bg-yellow-400 rounded-full" />
//                 <span className="text-yellow-400 text-[9px] min-[650px]:text-[11px]">
//                   Paused
//                 </span>
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }







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
    ["ready", "active"].some((s) =>
      qaStatus.toLowerCase().includes(s)
    );

  const isQAReconnecting =
    qaStatus &&
    qaStatus.toLowerCase().includes("reconnecting");

  return (
    <div className="bg-[#111111] border-t border-[#1F1F1F] px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 text-[11px] sm:text-[12px]">

        {/* LEFT STATUS INDICATORS */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 flex-wrap">

          {/* DEEPGRAM */}
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <div
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 ${
                isDeepgramActive
                  ? "bg-green-500"
                  : isDeepgramReconnecting
                  ? "bg-yellow-400 animate-pulse"
                  : "bg-gray-600"
              }`}
            />
            <span className="text-gray-400 whitespace-nowrap text-[10px] sm:text-[11px] lg:text-[12px]">
              Deepgram:{" "}
              <span className="text-gray-300 hidden sm:inline">{deepgramStatus}</span>
              <span className="text-gray-300 sm:hidden">
                {deepgramStatus?.length > 12 
                  ? deepgramStatus.substring(0, 12) + '...' 
                  : deepgramStatus}
              </span>
            </span>
          </div>

          {/* Q&A */}
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <div
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 ${
                isQAActive
                  ? "bg-purple-400"
                  : isQAReconnecting
                  ? "bg-yellow-400 animate-pulse"
                  : "bg-gray-600"
              }`}
            />
            <span className="text-gray-400 whitespace-nowrap text-[10px] sm:text-[11px] lg:text-[12px]">
              Q&A:{" "}
              <span className="text-gray-300 hidden sm:inline">{qaStatus}</span>
              <span className="text-gray-300 sm:hidden">
                {qaStatus?.length > 12 
                  ? qaStatus.substring(0, 12) + '...' 
                  : qaStatus}
              </span>
            </span>
          </div>
        </div>

        {/* RIGHT SIDE: PROCESSING / PAUSED */}
        <div className="flex items-center gap-3 sm:gap-4">

          {isGenerating && (
            <div className="flex items-center gap-2">
              <div className="hidden sm:block w-1 h-4 bg-[#222]" />
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-pulse shrink-0" />
                <span className="text-purple-300 text-[10px] sm:text-[11px] whitespace-nowrap">
                  Processing…
                </span>
              </div>
            </div>
          )}

          {isPaused && (
            <div className="flex items-center gap-2">
              <div className="hidden sm:block w-1 h-4 bg-[#222]" />
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full shrink-0" />
                <span className="text-yellow-400 text-[10px] sm:text-[11px] whitespace-nowrap">
                  Paused
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}