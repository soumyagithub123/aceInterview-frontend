// import React from "react";
// import { useNavigate } from "react-router-dom";
// import homeimage4 from "../../assets/homeimages/homeimage4.png";
// import homeimage5 from "../../assets/homeimages/homeimage5.png";
// import homeimage6 from "../../assets/homeimages/homeimage6.png";

// export default function ToolsSection() {
//   const navigate = useNavigate();

//   const tools = [
//     { 
//       title: "AI Mock Interview", 
//       desc: "Immersive interview simulation with extensive question banks", 
//       img: homeimage4
//     },
//     { 
//       title: "AI Interview Copilot", 
//       desc: "Instant, personalized, actionable support during live interviews", 
//       img: homeimage5
//     },
//     { 
//       title: "AI Resume Editor", 
//       desc: "Generate winning resume that passes screening and stand out", 
//       img: homeimage6
//     }
//   ];

//   return (
//     <section className="py-16 sm:py-20 bg-white">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6">
//         <p className="text-center text-indigo-600 font-medium mb-4">
//           Interview Made Easy
//         </p>

//         <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
//           <span className="text-indigo-600">AI-Powered Tools</span> for Every Step of the Job Searching Journey
//         </h2>

//         <p className="text-center text-gray-600 text-base sm:text-lg mb-12 sm:mb-16 max-w-3xl mx-auto">
//           From building a stellar resume to post-interview insights, we've got you covered before, during, and after the interview
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 justify-center">
//           {tools.map((tool) => (
//             <div 
//               key={tool.title} 
//               className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col w-full sm:w-80 mx-auto h-[440px] sm:h-[480px]"
//             >
//               {/* Image */}
//               <div className="w-full h-52 sm:h-64 rounded-xl mb-6 overflow-hidden">
//                 <img 
//                   src={tool.img} 
//                   alt={tool.title} 
//                   className="w-full h-full object-cover rounded-xl"
//                 />
//               </div>

//               <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
//                 {tool.title}
//               </h3>

//               <p className="text-gray-600 mb-4 flex-grow text-sm sm:text-base">
//                 {tool.desc}
//               </p>

//               {/* Button */}
//               <div className="flex justify-center sm:justify-start">
//                 <button
//                   onClick={() => navigate("/interview")}
//                   className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
//                 >
//                   Try now
//                 </button>
//               </div>

//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }









import React from "react";
import { useNavigate } from "react-router-dom";

export default function ToolsSection() {
  const navigate = useNavigate();

  const tools = [
    { 
      title: "AI Mock Interview", 
      desc: "Practice interviews with realistic questions and structured feedback.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    },
    { 
      title: "Live Interview Copilot", 
      desc: "Get real-time, contextual guidance during live interviews.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      title: "AI Resume Editor", 
      desc: "Optimize your resume to pass screening and stand out.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
  ];

  return (
    /* 🔥 SECTION HEIGHT REDUCED */
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* 🔥 COMPACT HEADING */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-semibold mb-4 uppercase tracking-wider">
            Our Platform
          </span>

          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Tools built for every interview stage
          </h2>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            From preparation to real-time assistance, our AI-powered tools help you perform at your best.
          </p>
        </div>

        {/* 🔥 GRID GAP REDUCED */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {tools.map((tool, index) => (
            <div
              key={tool.title}
              className="cursor-pointer"
              onClick={() => navigate("/interview")}
            >
              {/* 🔥 CARD COMPACT */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition">

                {/* Icon */}
                <div className="mb-4">
                  <div className="inline-flex p-2.5 rounded-lg bg-white border border-gray-200 text-primary-600 shadow-sm">
                    {tool.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                  {tool.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {tool.desc}
                </p>

                {/* Learn more */}
                <div className="flex items-center text-primary-600 font-medium text-sm">
                  <span className="mr-2">Learn more</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Number */}
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xs">
                  0{index + 1}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}