// import React from "react";
// import { useNavigate } from "react-router-dom";

// import homeimage1 from "../../assets/homeimages/homeimage1.png";
// import homeimage2 from "../../assets/homeimages/homeimage2.png";
// import homeimage3 from "../../assets/homeimages/homeimage3.png";

// const CheckIcon = () => (
//   <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
//     <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//     </svg>
//   </div>
// );

// export default function Features() {
//   const navigate = useNavigate();

//   const features = [
//     {
//       title: "Interview Practice",
//       description: "Prepare for your next interview with AI-powered practice sessions.",
//       bullets: [
//         "Unique interviews catered to the company & job",
//         "Instant feedback with clarity scores",
//         "Unlimited prep sessions on your time",
//       ],
//       cta: "Start Practicing",
//       image: homeimage1,
//       imageFirst: false,
//     },
//     {
//       title: "Real-time Assistance",
//       description: "Get real-time guidance and coaching during your interview.",
//       bullets: [
//         "Instant feedback tailored to you",
//         "Cross-platform on all devices",
//         "AI learns from your resume",
//         "Undetectable assistance",
//       ],
//       cta: "Activate",
//       image: homeimage2,
//       imageFirst: true,
//     },
//     {
//       title: "Question Bank",
//       description: "Prepare with real questions from real interviews at top companies.",
//       bullets: [
//         "Access 10,000+ real interview questions",
//         "Filter by difficulty & question type",
//         "Preview questions for your interview",
//       ],
//       cta: "Explore",
//       image: homeimage3,
//       imageFirst: false,
//     },
//   ];

//   return (
//     <section className="py-24 md:py-32 bg-surface-50">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         {features.map((feature, index) => (
//           <div
//             key={index}
//             className={`flex flex-col ${feature.imageFirst ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-16 lg:gap-24 mb-28 last:mb-0`}
//           >
//             <div className="flex-1 max-w-xl">
//               <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4 leading-tight">
//                 {feature.title}
//               </h2>
//               <p className="text-lg text-surface-600 mb-8 leading-relaxed">
//                 {feature.description}
//               </p>
//               <ul className="space-y-4 mb-8">
//                 {feature.bullets.map((bullet, i) => (
//                   <li key={i} className="flex items-start gap-3">
//                     <CheckIcon />
//                     <span className="text-surface-600">{bullet}</span>
//                   </li>
//                 ))}
//               </ul>
//               <button
//                 onClick={() => navigate("/interview")}
//                 className="btn-primary"
//               >
//                 {feature.cta}
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </button>
//             </div>
//             <div className="flex-1 w-full">
//               <div className="rounded-2xl shadow-card-soft overflow-hidden border border-surface-100 hover:shadow-card-hover transition-all duration-300">
//                 <img src={feature.image} alt={feature.title} className="w-full h-72 md:h-80 object-cover" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const CheckIcon = () => (
//   <svg
//     className="w-5 h-5 text-indigo-600 flex-shrink-0"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2.5}
//       d="M5 13l4 4L19 7"
//     />
//   </svg>
// );

// const InterviewPracticeVisual = () => (
//   <div className="relative w-full flex justify-center">
//     <div
//       className="relative w-full max-w-xl rounded-3xl bg-white border border-gray-200 p-10 shadow-2xl"
//       style={{
//         transform: "perspective(1600px) rotateX(5deg) rotateY(-8deg)",
//         transformStyle: "preserve-3d",
//       }}
//     >
//       <div className="flex items-center justify-between mb-8">
//         <div className="flex items-center gap-4">
//           <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center shadow-xl">
//             <svg
//               className="w-7 h-7 text-indigo-700"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
//               />
//             </svg>
//           </div>
//           <div>
//             <div className="font-bold text-gray-900 text-lg">AI Interview Coach</div>
//             <div className="text-sm text-gray-500">Practice Mode</div>
//           </div>
//         </div>

//         <span className="px-4 py-1.5 rounded-full bg-indigo-600 text-white text-sm font-semibold shadow-lg">
//           LIVE
//         </span>
//       </div>

//       <div className="space-y-6">
//         <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md">
//           <p className="text-gray-700">Tell me about a challenging project you worked on.</p>
//         </div>
//         <div className="bg-indigo-50 text-gray-900 rounded-2xl p-5 shadow-md ml-8">
//           <p>I handled a complex system migration where I optimized performance significantly.</p>
//         </div>
//         <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 shadow-md">
//           <p className="text-gray-700 font-medium">Feedback: Clear structure, confident delivery.</p>
//         </div>
//       </div>

//       <div
//         className="absolute -top-8 -right-8 bg-indigo-600 text-white rounded-3xl px-6 py-5 shadow-2xl border-4 border-white"
//         style={{ transform: "translateZ(50px)" }}
//       >
//         <div className="text-xs uppercase opacity-90">Clarity</div>
//         <div className="text-4xl font-black">95%</div>
//       </div>
//     </div>
//   </div>
// );

// const RealtimeAssistanceVisual = () => (
//   <div className="relative w-full flex justify-center">
//     <div
//       className="relative w-full max-w-2xl rounded-3xl bg-white border border-gray-200 p-12 shadow-2xl"
//       style={{ transform: "perspective(1800px) rotateX(4deg)" }}
//     >
//       <div className="flex items-center justify-between mb-10">
//         <div>
//           <h3 className="text-2xl font-bold text-gray-900">Real-Time AI</h3>
//           <p className="text-gray-500 text-sm">Live Interview Assistant</p>
//         </div>
//         <span className="px-5 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold shadow-lg">
//           ACTIVE
//         </span>
//       </div>

//       <div className="grid grid-cols-2 gap-6">
//         {[
//           ["Confidence", "94%"],
//           ["Clarity", "A+"],
//           ["Pace", "Ideal"],
//           ["Tone", "Professional"],
//         ].map(([label, value]) => (
//           <div
//             key={label}
//             className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md"
//           >
//             <div className="text-sm text-gray-500">{label}</div>
//             <div className="text-2xl font-bold text-indigo-700">{value}</div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-10 bg-indigo-50 rounded-2xl p-6 border border-gray-200 shadow-md">
//         <h4 className="font-semibold text-indigo-700 mb-4">AI Suggestions</h4>
//         <ul className="space-y-3 text-gray-700">
//           <li>✔ Strong STAR format usage</li>
//           <li>✔ Add metrics for stronger impact</li>
//         </ul>
//       </div>
//     </div>
//   </div>
// );

// const QuestionBankVisual = () => (
//   <div className="relative w-full flex justify-center">
//     <div
//       className="relative w-full max-w-xl rounded-3xl bg-white border border-gray-200 p-8 shadow-2xl"
//       style={{ transform: "perspective(1600px) rotateY(6deg)" }}
//     >
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-xl font-bold text-gray-900">Question Bank</h3>
//         <span className="px-4 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 font-bold shadow">
//           MEDIUM
//         </span>
//       </div>

//       <div className="space-y-4 mb-6">
//         <div className="h-3 w-full bg-gray-300 rounded-full shadow-inner" />
//         <div className="h-3 w-10/12 bg-gray-300 rounded-full shadow-inner" />
//         <div className="h-3 w-8/12 bg-gray-300 rounded-full shadow-inner" />
//       </div>

//       <div className="flex flex-wrap gap-2 mb-6">
//         {["Arrays", "Two Pointers", "Google", "Meta"].map((tag) => (
//           <span
//             key={tag}
//             className="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-50 text-indigo-700 border border-gray-200 shadow-sm"
//           >
//             {tag}
//           </span>
//         ))}
//       </div>

//       <div className="text-sm text-gray-600 font-semibold">Difficulty: 3 / 5</div>

//       <div
//         className="absolute -top-8 -right-8 bg-indigo-600 text-white rounded-3xl px-6 py-5 shadow-2xl border-4 border-white"
//       >
//         <div className="text-xs uppercase">Questions</div>
//         <div className="text-3xl font-black">10K+</div>
//       </div>
//     </div>
//   </div>
// );

// export default function Features() {
//   const navigate = useNavigate();

//   const features = [
//     {
//       label: "WHY CHOOSE",
//       title: "Interview Practice",
//       description: "Prepare with AI-powered mock interviews designed for your role.",
//       bullets: [
//         "Company-specific interviews",
//         "Instant clarity feedback",
//         "Unlimited practice sessions",
//       ],
//       cta: "Start Practicing",
//       visual: <InterviewPracticeVisual />,
//     },
//     {
//       label: "WHY CHOOSE",
//       title: "Real-Time Assistance",
//       description: "Get live AI guidance during your interview.",
//       bullets: [
//         "Personalized feedback",
//         "Works across all devices",
//         "Resume-aware AI",
//         "Undetectable support",
//       ],
//       cta: "Activate",
//       visual: <RealtimeAssistanceVisual />,
//     },
//     {
//       label: "WHY CHOOSE",
//       title: "Question Bank",
//       description: "Practice real interview questions from top companies.",
//       bullets: [
//         "10,000+ curated questions",
//         "Difficulty & topic filters",
//         "Preview before interviews",
//       ],
//       cta: "Explore",
//       visual: <QuestionBankVisual />,
//     },
//   ];

//   return (
//     <section className="py-24 px-4 bg-gray-50">
//       <div className="max-w-7xl mx-auto space-y-32">
//         {features.map((feature, index) => (
//           <div
//             key={index}
//             className={`flex flex-col ${
//               index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
//             } gap-20 items-center`}
//           >
//             <div className="flex-1 max-w-xl">
//               <span className="text-gray-600 text-sm font-bold uppercase tracking-wide">
//                 {feature.label}
//               </span>

//               <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-4">
//                 {feature.title}
//               </h2>

//               <p className="text-xl text-gray-700 mb-8">{feature.description}</p>

//               <ul className="space-y-4 mb-10">
//                 {feature.bullets.map((b, i) => (
//                   <li key={i} className="flex gap-3">
//                     <CheckIcon />
//                     <span className="text-gray-700 text-lg">{b}</span>
//                   </li>
//                 ))}
//               </ul>

//               <button
//                 onClick={() => navigate("/interview")}
//                 className="px-8 py-4 rounded-xl text-white font-semibold text-lg
//                 bg-indigo-600 hover:bg-indigo-700 transition-shadow duration-200 shadow-2xl"
//               >
//                 {feature.cta}
//               </button>
//             </div>

//             <div className="flex-1 w-full">{feature.visual}</div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-indigo-600 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const CircularProgress = ({ value, color, label }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="64"
          cy="64"
          r="45"
          stroke="#374151"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="64"
          cy="64"
          r="45"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className={`text-3xl font-bold ${color === "#f59e0b" ? "text-amber-500" : "text-emerald-500"}`}
        >
          {progress}
        </div>
        <div className="text-xs text-gray-400 mt-1">{label}</div>
      </div>
    </div>
  );
};

const ProgressBar = ({ delay = 0 }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(Math.random() * 40 + 60);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};
const InterviewReportVisual = () => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setScore(82), 300);
    return () => clearTimeout(t);
  }, []);

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        className="bg-gradient-to-br from-gray-900 to-gray-800 
        rounded-3xl p-6 shadow-2xl border border-gray-700"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">Interview Report</h3>
            <p className="text-sm text-gray-400">Behavioral · June 18, 2026</p>
          </div>
          <span
            className="px-4 py-1.5 rounded-full 
            bg-indigo-600/20 text-indigo-400 text-sm font-semibold"
          >
            AI
          </span>
        </div>

        {/* Pie Chart + Stats */}
        <div className="flex items-center gap-6 mb-6">
          {/* Pie Chart */}
          <div className="relative w-28 h-24 sm:w-28 sm:h-28">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="56"
                cy="56"
                r={radius}
                stroke="#374151"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="56"
                cy="56"
                r={radius}
                stroke="#6366f1"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-white">{score}%</div>
              <div className="text-xs text-gray-400">Overall</div>
            </div>
          </div>

          {/* Right Stats */}
          <div className="flex-1 space-y-3">
            {[
              ["Clarity", "88%"],
              ["Confidence", "84%"],
              ["Structure", "90%"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-gray-800/60 rounded-xl p-3 border border-gray-700"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{label}</span>
                  <span className="text-white font-semibold">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-gray-800/50 rounded-2xl p-5 border border-gray-700">
          <h4 className="text-sm font-semibold text-white mb-2">AI Feedback</h4>
          <p className="text-sm text-gray-300 leading-relaxed">
            Strong answers with clear flow. Add numbers & impact metrics to
            reach top score.
            <span className="inline-block w-0.5 h-4 bg-indigo-500 ml-1 animate-pulse" />
          </p>
        </div>
      </div>
    </div>
  );
};

const StealthModeVisual = () => {
  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-700">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white">Real-Time AI</h3>
            <p className="text-gray-400 text-sm">Live Interview Assistant</p>
          </div>
          <span className="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-semibold border border-emerald-500/30">
            ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            ["Confidence", "94%", "#f59e0b"],
            ["Clarity", "A+", "#10b981"],
            ["Pace", "Ideal", "#6366f1"],
            ["Tone", "Professional", "#ec4899"],
          ].map(([label, value, color], idx) => (
            <div
              key={label}
              className={`bg-gray-800/70 rounded-2xl p-5 border transition-all duration-300 ${
                activeMetric === idx
                  ? "border-indigo-500 shadow-lg shadow-indigo-500/20"
                  : "border-gray-700"
              }`}
            >
              <div className="text-sm text-gray-400 mb-1">{label}</div>
              <div className="text-2xl font-bold" style={{ color }}>
                {value}
              </div>
              <div className="mt-3 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: activeMetric === idx ? "100%" : "0%",
                    backgroundColor: color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h4 className="font-semibold text-indigo-400 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
            </svg>
            AI Suggestions
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-gray-300">
              <span className="text-emerald-500 mt-0.5">✔</span>
              <span>Strong STAR format usage</span>
            </li>
            <li className="flex items-start gap-3 text-gray-300">
              <span className="text-amber-500 mt-0.5">✔</span>
              <span>Add metrics for stronger impact</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const TrainModelVisual = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-700">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 flex items-center justify-center border border-indigo-500/30">
              <svg
                className="w-7 h-7 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <div className="font-bold text-white text-lg">
                AI Model Training
              </div>
              <div className="text-sm text-gray-400">Personalized Learning</div>
            </div>
          </div>
          <span className="px-4 py-1.5 rounded-full bg-indigo-600/20 text-indigo-400 text-sm font-semibold border border-indigo-500/30">
            TRAINING
          </span>
        </div>

        <div className="space-y-4 mb-5">
          <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-3">
              <p className="text-gray-300">Neural Network Optimization</p>
              <span className="text-indigo-400 font-semibold">{progress}%</span>
            </div>
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-5 border border-gray-700">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-500">10K+</div>
                <div className="text-xs text-gray-400 mt-1">Questions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-500">95%</div>
                <div className="text-xs text-gray-400 mt-1">Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-500">24/7</div>
                <div className="text-xs text-gray-400 mt-1">Available</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5">
          <div className="text-gray-400 mb-4">Recent Training Data</div>
          <div className="space-y-2">
            {[75, 90, 60].map((width, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CodingInterviewVisual = () => {
  const [typingProgress, setTypingProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-700"> */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 shadow-xl border border-gray-700 w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Code Challenge</h3>
          <span className="px-4 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-400 font-bold border border-emerald-500/30">
            EASY
          </span>
        </div>

        <div className="bg-gray-950 rounded-xl p-6 mb-6 font-mono text-sm border border-gray-700">
          <div className="text-emerald-500 mb-2">// Two Sum Problem</div>
          <div className="text-gray-400 mb-4">
            Given an array of integers, return indices of two numbers that add
            up to target.
          </div>
          <div className="text-purple-400">function</div>
          <div className="text-gray-300 ml-4">
            twoSum(nums, target) {"{"}
            <div className="ml-4 text-gray-500">
              <div
                className="h-1 bg-indigo-500 rounded transition-all duration-300"
                style={{ width: `${typingProgress}%` }}
              />
            </div>
            {"}"}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {["Arrays", "Hash Table", "Two Pointers", "Google", "Meta"].map(
            (tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-gray-800 text-gray-300 border border-gray-700"
              >
                {tag}
              </span>
            ),
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-400">
            Difficulty:{" "}
            <span className="text-emerald-500 font-semibold">3 / 5</span>
          </div>
          <div className="flex gap-4">
            <div className="text-amber-500">⭐ 4.8</div>
            <div className="text-gray-500">|</div>
            <div className="text-gray-400">1.2K solved</div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-indigo-400 font-semibold">Time Complexity</div>
            <div className="text-emerald-500 font-mono">O(n)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Features() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      label: "WHY CHOOSE",
      title: "Train your Model",
      description:
        "Personalize AI to understand your experience and interview style.",
      bullets: [
        "Resume-aware responses",
        "Custom training data",
        "Adaptive learning system",
      ],
      cta: "Start Training",
      visual: <TrainModelVisual />,
      buttonLabel: "Train your Model",
    },
    {
      label: "WHY CHOOSE",
      title: "Stealth Mode",
      description: "Get live AI guidance during your interview.",
      bullets: [
        "Personalized feedback",
        "Works across all devices",
        "Resume-aware AI",
        "Undetectable support",
      ],
      cta: "Activate",
      visual: <StealthModeVisual />,
      buttonLabel: "Stealth Mode",
    },
    {
      label: "WHY CHOOSE",
      title: "Coding Interview",
      description: "Practice coding challenges from top tech companies.",
      bullets: [
        "Real interview questions",
        "Multiple difficulty levels",
        "Company-specific prep",
      ],
      cta: "Start Coding",
      visual: <CodingInterviewVisual />,
      buttonLabel: "Coding Interview",
    },
    {
      label: "WHY CHOOSE",
      title: "Interview Report",
      description: "Get detailed analytics and feedback after every interview.",
      bullets: [
        "Comprehensive analysis",
        "Question-by-question breakdown",
        "AI-powered insights",
      ],
      cta: "View Report",
      visual: <InterviewReportVisual />,
      buttonLabel: "Interview Report",
    },
  ];

  return (
    // <section className="py-8 px-4 bg-gray-50">
    <section id="features" className="py-8 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-gray-600 text-sm font-bold uppercase tracking-wide mb-3">
            Advanced features
          </p>
          {/* <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"> */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            What Interview AI offers?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Transcribe interviews in real-time, analyze interview questions, and
            generate expert-level responses
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-2 flex-wrap">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-xl font-semibold text-base transition-all duration-500 ease-out ${
                activeTab === index
                  ? "bg-indigo-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 border border-gray-200 scale-100"
              }`}
            >
              {feature.buttonLabel}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="w-full flex flex-col lg:flex-row gap-10 mt-6">
          {/* Left Side - Text Content */}
          <div className="w-full lg:w-1/2 max-w-xl">
            <span className="text-gray-600 text-sm font-bold uppercase tracking-wide">
              {features[activeTab].label}
            </span>

            {/* <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-4"> */}
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-2">
              {features[activeTab].title}
            </h3>

            <p className="text-xl text-gray-700 mb-5 max-w-md leading-relaxed">
              {features[activeTab].description}
            </p>

            <ul className="space-y-3 mb-6">
              {features[activeTab].bullets.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <CheckIcon />
                  <span className="text-gray-700 text-lg">{b}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate("/interview")}
              className="px-6 py-3 rounded-xl text-white font-semibold text-lg
                bg-indigo-600 transition-all duration-200 shadow-2xl"
            >
              {features[activeTab].cta}
            </button>
          </div>

          {/* Right Side - Visual with Animation */}
          {/* <div className="flex-1 w-full relative overflow-hidden min-h-[700px] flex items-center justify-center"> */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl transition-all duration-500">
              {features[activeTab].visual}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
