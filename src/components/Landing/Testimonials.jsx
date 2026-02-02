// import React from "react";
// import { useNavigate } from "react-router-dom";

// const TESTIMONIALS = [
//   {
//     text: "InterviewAI is a game changer for folks interested in switching careers. I haven't interviewed in years and was really nervous. I switched from a sales associate to a supply chain manager all because of InterviewAI.",
//     author: "D.A.",
//     role: "Supply Chain Manager Offer @ Walmart",
//   },
//   {
//     text: "Its answers for my finance technical questions were even better than my interview guides, especially because InterviewAI always tailors the answer to the question.",
//     author: "J.B.",
//     role: "Investment Banking Analyst Offer @ Goldman Sachs",
//   },
//   {
//     text: "I utilized InterviewAI to enhance my technical interview capabilities. The real-time assistance helped me articulate my solutions clearly.",
//     author: "E.W.",
//     role: "Business Analyst Offer @ McKinsey & Co.",
//   },
// ];

// export default function Testimonials() {
//   const navigate = useNavigate();

//   return (
//     <section className="py-24 md:py-32 bg-white">
//       <div className="max-w-6xl mx-auto px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <p className="text-surface-500 font-medium mb-3 uppercase text-sm tracking-wide">Testimonials</p>
//           <h2 className="text-4xl md:text-5xl font-bold text-surface-900 mb-6">
//             What our customers say
//           </h2>
//           <p className="text-surface-600 text-lg max-w-2xl mx-auto">
//             Don&apos;t just take our word for it. See what others have said about us.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {TESTIMONIALS.map((t, i) => (
//             <div
//               key={i}
//               className="rounded-2xl border border-surface-100 p-8 shadow-card-soft hover:shadow-card-hover transition-shadow"
//             >
//               <svg className="w-10 h-10 text-primary-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
//               </svg>
//               <p className="text-surface-600 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
//               <div>
//                 <p className="font-semibold text-surface-900">{t.author}</p>
//                 <p className="text-sm text-surface-500">{t.role}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center mt-12">
//           <button onClick={() => navigate("/sign-in")} className="btn-primary">
//             Try InterviewAI - Free
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const TESTIMONIALS = [
//   {
//     text: "InterviewAI is a game changer for folks interested in switching careers. I haven't interviewed in years and was really nervous. I switched from a sales associate to a supply chain manager all because of InterviewAI.",
//     author: "D.A.",
//     role: "Supply Chain Manager Offer @ Walmart",
//   },
//   {
//     text: "Its answers for my finance technical questions were even better than my interview guides, especially because InterviewAI always tailors the answer to the question.",
//     author: "J.B.",
//     role: "Investment Banking Analyst Offer @ Goldman Sachs",
//   },
//   {
//     text: "I utilized InterviewAI to enhance my technical interview capabilities. The real-time assistance helped me articulate my solutions clearly.",
//     author: "E.W.",
//     role: "Business Analyst Offer @ McKinsey & Co.",
//   },
// ];

// export default function Testimonials() {
//   const navigate = useNavigate();

//   return (
//     <section className="py-24 md:py-32 bg-gradient-to-b from-surface-50 to-white">
//       <div className="max-w-6xl mx-auto px-6 lg:px-8">
//         {/* Heading */}
//         <div className="text-center mb-16">
//           <p className="text-primary-600 font-semibold mb-3 uppercase text-sm tracking-wide">
//             Testimonials
//           </p>
//           <h2 className="text-4xl md:text-5xl font-bold text-surface-900 mb-6 drop-shadow-lg">
//             What our customers say
//           </h2>
//           <p className="text-surface-600 text-lg max-w-2xl mx-auto">
//             Don&apos;t just take our word for it. See what others have said about us.
//           </p>
//         </div>

//         {/* Scrolling Testimonials */}
//         <div className="overflow-hidden relative">
//           <div className="flex animate-scroll gap-8">
//             {TESTIMONIALS.concat(TESTIMONIALS).map((t, i) => (
//               <div
//                 key={i}
//                 className="min-w-[320px] max-w-sm rounded-2xl bg-white border border-surface-200 p-8 shadow-2xl flex flex-col justify-between"
//               >
//                 {/* Quote Icon */}
//                 <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-6 shadow-md">
//                   <svg
//                     className="w-6 h-6 text-primary-600"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
//                   </svg>
//                 </div>

//                 {/* Testimonial Text */}
//                 <p className="text-surface-700 leading-relaxed mb-6 italic">
//                   “{t.text}”
//                 </p>

//                 {/* Author */}
//                 <div>
//                   <p className="font-semibold text-surface-900">{t.author}</p>
//                   <p className="text-sm text-surface-500">{t.role}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* CTA Button */}
//         <div className="text-center mt-16">
//           <button
//             onClick={() => navigate("/sign-in")}
//             className="btn-primary px-8 py-4 text-lg shadow-lg rounded-full"
//           >
//             Try InterviewAI - Free
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }
import React from "react";
import { useNavigate } from "react-router-dom";

const TESTIMONIALS = [
  {
    text: "InterviewAI is a game changer for folks interested in switching careers. I haven't interviewed in years and was really nervous. I switched from a sales associate to a supply chain manager all because of InterviewAI.",
    author: "D.A.",
    role: "Supply Chain Manager Offer @ Walmart",
  },
  {
    text: "Its answers for my finance technical questions were even better than my interview guides, especially because InterviewAI always tailors the answer to the question.",
    author: "J.B.",
    role: "Investment Banking Analyst Offer @ Goldman Sachs",
  },
  {
    text: "I utilized InterviewAI to enhance my technical interview capabilities. The real-time assistance helped me articulate my solutions clearly.",
    author: "E.W.",
    role: "Business Analyst Offer @ McKinsey & Co.",
  },
];

export default function Testimonials() {
  const navigate = useNavigate();

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-surface-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-primary-600 font-semibold mb-3 uppercase text-sm tracking-widest">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-surface-900 mb-6 drop-shadow-lg">
            What Our Customers Say
          </h2>
          <p className="text-surface-600 text-lg max-w-3xl mx-auto">
            Don’t just take our word for it. Our users have shared how InterviewAI
            transformed their career journeys.
          </p>
        </div>

        {/* Scrolling Testimonials */}
        <div className="overflow-x-auto scrollbar-hide relative">
          <div className="flex gap-8 animate-scroll-slow">
            {TESTIMONIALS.concat(TESTIMONIALS).map((t, i) => (
              <div
                key={i}
                className="min-w-[320px] max-w-sm bg-white rounded-3xl border border-surface-200 p-8 shadow-xl flex flex-col justify-between transform transition-transform hover:scale-105 hover:shadow-2xl"
              >
                {/* Quote Icon */}
                <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-6 shadow-md">
                  <svg
                    className="w-6 h-6 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Testimonial Text */}
                <p className="text-surface-700 leading-relaxed mb-6 italic text-base md:text-lg">
                  “{t.text}”
                </p>

                {/* Author */}
                <div>
                  <p className="font-semibold text-surface-900 text-lg">{t.author}</p>
                  <p className="text-sm text-surface-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button
            onClick={() => navigate("/sign-in")}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-10 py-4 rounded-full text-lg shadow-lg transition-all duration-300 hover:scale-105"
          >
            Try InterviewAI - Free
          </button>
        </div>
      </div>

      {/* Extra Styles */}
      <style>
        {`
          .animate-scroll-slow {
            display: flex;
            animation: scroll 30s linear infinite;
          }
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none; 
            scrollbar-width: none; 
          }
        `}
      </style>
    </section>
  );
}
