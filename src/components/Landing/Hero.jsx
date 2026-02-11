// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Hero() {
//   const navigate = useNavigate();

//   return (
//     <section className="relative pt-32 pb-20 bg-gradient-to-br from-purple-300 via-purple-100 to-indigo-200 overflow-hidden">
//       {/* Decorative sparkles */}
//       <div className="absolute top-20 left-10 text-purple-400 text-6xl opacity-30">✦</div>
//       <div className="absolute top-40 right-20 text-purple-300 text-4xl opacity-20">✦</div>
//       <div className="absolute top-60 left-1/2 text-indigo-300 text-5xl opacity-20">✦</div>

//       {/* Main content */}
//       <div className="max-w-6xl mx-auto px-6 text-left">
//         <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
//           Rambling answers,<br />
//           generic responses,<br />
//           nervous pauses?
//         </h1>
//         <p className="text-2xl mb-2 text-gray-700">
//           Become interview-ready today with
//         </p>
//         <p className="text-4xl font-bold text-[#6C63FF] mb-10">
//           AI Interview Copilot
//         </p>

//           <button
//           onClick={() => navigate("/interview")}
//           className="px-8 py-4 bg-indigo-900 text-white rounded-xl font-semibold text-lg hover:bg-indigo-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
//           >
//           Start Now for Free
//           </button>


//         {/* Stats */}
//         <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl">
//           <div className="group cursor-default">
//             <div className="text-4xl font-bold text-indigo-600 mb-2 group-hover:scale-110 transition-transform">
//               10K+
//             </div>
//             <div className="text-gray-600 text-sm">Active Users</div>
//           </div>
//           <div className="group cursor-default">
//             <div className="text-4xl font-bold text-indigo-600 mb-2 group-hover:scale-110 transition-transform">
//               95%
//             </div>
//             <div className="text-gray-600 text-sm">Success Rate</div>
//           </div>
//           <div className="group cursor-default">
//             <div className="text-4xl font-bold text-indigo-600 mb-2 group-hover:scale-110 transition-transform">
//               50K+
//             </div>
//             <div className="text-gray-600 text-sm">Interviews Aced</div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 bg-gradient-to-br from-purple-300 via-purple-100 to-indigo-200 overflow-hidden">
      {/* Decorative sparkles */}
      <div className="absolute top-16 left-4 sm:left-10 text-purple-400 text-4xl sm:text-6xl opacity-30">✦</div>
      <div className="absolute top-32 sm:top-40 right-6 sm:right-20 text-purple-300 text-3xl sm:text-4xl opacity-20">✦</div>
      <div className="absolute top-52 sm:top-60 left-1/2 text-indigo-300 text-4xl sm:text-5xl opacity-20">✦</div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Rambling answers,<br />
          generic responses,<br />
          nervous pauses?
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl mb-2 text-gray-700">
          Become interview-ready today with
        </p>

        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#6C63FF] mb-8 sm:mb-10">
          AI Interview Copilot
        </p>

        {/* Button */}
        <div className="flex justify-center sm:justify-start">
          <button
            onClick={() => navigate("/interview")}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-indigo-900 text-white rounded-xl font-semibold text-base sm:text-lg hover:bg-indigo-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Now for Free
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 sm:mt-20 max-w-3xl mx-auto sm:mx-0">
          <div className="group cursor-default text-center sm:text-left">
            <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2 group-hover:scale-110 transition-transform">
              10K+
            </div>
            <div className="text-gray-600 text-sm">Active Users</div>
          </div>

          <div className="group cursor-default text-center sm:text-left">
            <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2 group-hover:scale-110 transition-transform">
              95%
            </div>
            <div className="text-gray-600 text-sm">Success Rate</div>
          </div>

          <div className="group cursor-default text-center sm:text-left">
            <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2 group-hover:scale-110 transition-transform">
              50K+
            </div>
            <div className="text-gray-600 text-sm">Interviews Aced</div>
          </div>
        </div>
      </div>
    </section>
  );
}
