// import React from "react";
// import { useNavigate } from "react-router-dom";
// import homeimage4 from "../../assets/homeimages/homeimage4.png";
// import homeimage5 from "../../assets/homeimages/homeimage5.png";
// import homeimage6 from "../../assets/homeimages/homeimage6.png";

// export default function ToolsSection() {
//   const navigate = useNavigate();

//   const tools = [
//     { title: "AI Mock Interview", desc: "Practice interviews with realistic questions and structured feedback.", img: homeimage4 },
//     { title: "Live Interview Copilot", desc: "Get real-time, contextual guidance during live interviews.", img: homeimage5 },
//     { title: "AI Resume Editor", desc: "Optimize your resume to pass screening and stand out.", img: homeimage6 },
//   ];

//   return (
//     <section className="py-24 md:py-32 bg-white">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <p className="text-primary-600 font-semibold mb-3 uppercase text-sm tracking-wide">Our Platform</p>
//           <h2 className="text-4xl md:text-5xl font-bold text-surface-900 mb-5">
//             Tools built for every interview stage
//           </h2>
//           <p className="text-surface-600 text-lg leading-relaxed">
//             From preparation to real-time assistance, our AI-powered tools help you perform at your best.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {tools.map((tool) => (
//             <div
//               key={tool.title}
//               className="rounded-2xl bg-white border border-surface-100 p-0 overflow-hidden shadow-card-soft hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
//               onClick={() => navigate("/interview")}
//             >
//               <div className="h-48 overflow-hidden">
//                 <img src={tool.img} alt={tool.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-surface-900 mb-2">{tool.title}</h3>
//                 <p className="text-surface-600 mb-6 leading-relaxed">{tool.desc}</p>
//                 <span className="inline-flex items-center gap-2 text-primary-500 font-semibold group-hover:gap-3 transition-all">
//                   Explore
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                   </svg>
//                 </span>
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
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    },
    { 
      title: "Live Interview Copilot", 
      desc: "Get real-time, contextual guidance during live interviews.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      title: "AI Resume Editor", 
      desc: "Optimize your resume to pass screening and stand out.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
  ];

  return (
    <section className="py-32 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-28">
          <span className="inline-block px-5 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-6 uppercase tracking-wider">
            Our Platform
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Tools built for every interview stage
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            From preparation to real-time assistance, our AI-powered tools help you perform at your best. Whether you’re preparing for your first interview or aiming to master real-time responses, our platform has got you covered.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {tools.map((tool, index) => (
            <div
              key={tool.title}
              className="relative cursor-pointer"
              onClick={() => navigate("/interview")}
            >
              {/* Card with permanent shadow behind */}
              <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-8 shadow-2xl">
                
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="inline-flex p-3 rounded-xl bg-white border border-gray-200 text-primary-600 shadow-sm transition-all duration-300">
                    {tool.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
                    {tool.desc}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center text-primary-600 font-medium text-sm md:text-base">
                    <span className="mr-2">Learn more</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Number Badge */}
                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-sm">
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
