// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../Landing/Navbar";
// import Footer from "../../Landing/Footer";
// import ToolsSection from "../../Landing/ToolsSection";

// export default function ResumeBuilder() {
//   const navigate = useNavigate();

//   const resumeFeatures = [
//     {
//       icon: "✍️",
//       title: "AI Writing",
//       description: "Share your thoughts, and let our AI optimize the language for you",
//     },
//     {
//       icon: "📄",
//       title: "Resume Template",
//       description: "Professional template that highlights your strengths",
//     },
//     {
//       icon: "🎯",
//       title: "ATS Optimized",
//       description: "Highlight key skills and experience to pass resume screening",
//     },
//   ];

//   const tools = [
//     { icon: "✏️", title: "AI Cover Letter", description: "Generate a cover letter that grabs recruiters' attention.", iconBg: "bg-primary-50", iconColor: "text-primary-600" },
//     { icon: "📋", title: "Resume Optimizer", description: "Optimize your resume to receive more job interviews.", iconBg: "bg-primary-50", iconColor: "text-primary-600" },
//     { icon: "🔍", title: "ATS Checker", description: "Check if your resume can pass resume screening system.", iconBg: "bg-primary-50", iconColor: "text-primary-600" },
//     { icon: "⭐", title: "Resume Rater", description: "Get a score and feedback to improve your resume.", iconBg: "bg-primary-50", iconColor: "text-primary-600" },
//     { icon: "📝", title: "Resume Formatter", description: "Reformat your resume for clean, professional layouts.", iconBg: "bg-primary-50", iconColor: "text-primary-600" },
//     { icon: "🔧", title: "Resume Fixer", description: "Quickly fix resume issues like formatting, grammar, etc.", iconBg: "bg-primary-50", iconColor: "text-primary-600" },
//     { icon: "💼", title: "Job Description Generator", description: "Craft perfect job descriptions for your resume.", iconBg: "bg-primary-50", iconColor: "text-primary-600" },
//     { icon: "✉️", title: "Thank-you Email Generator", description: "Write a polished thank-you email in seconds.", iconBg: "bg-primary-50", iconColor: "text-primary-600" },
//   ];

//   const reviews = [
//     { name: "Sarah Johnson", role: "Software Engineer", avatar: "SJ", rating: 5, text: "The AI Resume Builder helped me land my dream job at a top tech company! The ATS optimization feature was a game-changer.", color: "bg-primary-500" },
//     { name: "Michael Chen", role: "Product Manager", avatar: "MC", rating: 5, text: "I went from 2 interviews per month to 8! The resume templates are professional and the AI writing suggestions are spot-on.", color: "bg-purple-500" },
//     { name: "Emily Rodriguez", role: "Data Analyst", avatar: "ER", rating: 5, text: "Best investment in my career. The cover letter generator alone saved me hours of work. Highly recommend!", color: "bg-pink-500" },
//     { name: "David Kim", role: "Marketing Manager", avatar: "DK", rating: 5, text: "The ATS checker feature is incredible. My resume now passes through applicant tracking systems with ease. Got 3 offers in a month!", color: "bg-blue-500" },
//     { name: "Jessica Williams", role: "UX Designer", avatar: "JW", rating: 5, text: "Clean, modern templates and intelligent AI suggestions. This tool completely transformed my job search experience.", color: "bg-emerald-500" },
//     { name: "Alex Thompson", role: "Business Analyst", avatar: "AT", rating: 5, text: "From zero callbacks to multiple interview invites. The resume optimizer is worth every penny. Thank you!", color: "bg-amber-500" },
//   ];

//   const renderStars = (rating) => (
//     <div className="flex gap-1">
//       {[...Array(rating)].map((_, i) => (
//         <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
//           <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
//         </svg>
//       ))}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />

//       <section className="pt-28 pb-24 bg-gradient-to-br from-primary-50/50 via-white to-purple-50/30">
//         <div className="max-w-4xl mx-auto px-6 text-center">
//           <p className="text-primary-600 font-semibold mb-3 uppercase text-sm tracking-wide">
//             Free Tool
//           </p>
//           <h1 className="text-5xl md:text-6xl font-bold text-surface-900 mb-6">
//             AI Resume Builder
//           </h1>
//           <p className="text-xl text-surface-600 mb-8 leading-relaxed">
//             Harnesses the power of AI to create, optimize, and personalize your resume in no-time
//           </p>
//           <button
//             onClick={() => navigate("/interview")}
//             className="btn-primary px-8 py-4 text-lg"
//           >
//             Free Forever
//           </button>
//         </div>
//       </section>

//       <section className="py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-20 items-center">
//             <div>
//               <p className="text-primary-600 font-semibold mb-4 uppercase text-sm tracking-wide">
//                 Interview Made Easy
//               </p>
//               <h2 className="text-4xl md:text-5xl font-bold text-surface-900 mb-6">
//                 Get <span className="text-primary-600">20x</span> More Interview Invites
//               </h2>
//               <p className="text-xl text-surface-600 leading-relaxed">
//                 Tired of getting ghosted? Get 10x more interviews with AI Resume Builder
//               </p>
//             </div>

//             <div className="space-y-6">
//               {resumeFeatures.map((feature, index) => (
//                 <div
//                   key={index}
//                   className="card-base p-6 hover:-translate-y-1"
//                 >
//                   <div className="flex items-start gap-4">
//                     <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
//                       {feature.icon}
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-semibold text-surface-900 mb-2">
//                         {feature.title}
//                       </h3>
//                       <p className="text-surface-600">{feature.description}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-24 bg-surface-50">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <p className="text-primary-600 font-semibold mb-3 uppercase text-sm tracking-wide">
//               Free Toolkit
//             </p>
//             <h2 className="text-4xl md:text-5xl font-bold text-surface-900 mb-5">
//               Free Toolkit for Landing Jobs This Season
//             </h2>
//             <p className="text-xl text-surface-600 max-w-2xl mx-auto">
//               Tools that do the heavy lifting so you can focus on showing up strong
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-6">
//             {tools.map((tool, index) => (
//               <div
//                 key={index}
//                 className="card-base p-8 hover:-translate-y-1"
//               >
//                 <div className="flex items-start gap-4">
//                   <div className={`w-14 h-14 ${tool.iconBg} rounded-2xl flex items-center justify-center text-3xl flex-shrink-0`}>
//                     {tool.icon}
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-surface-900 mb-2">
//                       {tool.title}
//                     </h3>
//                     <p className="text-surface-600 leading-relaxed">{tool.description}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <ToolsSection />

//       <section className="py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-surface-900 mb-5">
//               Loved by Job Seekers Worldwide
//             </h2>
//             <p className="text-xl text-surface-600">
//               Join thousands who&apos;ve transformed their job search
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {reviews.map((review, index) => (
//               <div
//                 key={index}
//                 className="card-base p-6 hover:-translate-y-1"
//               >
//                 <div className="flex items-center gap-4 mb-4">
//                   <div className={`w-12 h-12 ${review.color} rounded-xl flex items-center justify-center text-white font-semibold`}>
//                     {review.avatar}
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-surface-900">{review.name}</h4>
//                     <p className="text-sm text-surface-500">{review.role}</p>
//                   </div>
//                 </div>
//                 <div className="mb-4">{renderStars(review.rating)}</div>
//                 <p className="text-surface-600 leading-relaxed">{review.text}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, TrendingUp, Target, FileText, Award, Star, Zap, CheckCircle } from "lucide-react";
import Navbar from "../../Landing/Navbar";
import Footer from "../../Landing/Footer";
import ToolsSection from "../../Landing/ToolsSection";

// Counter Animation Hook
function useCounter(end, duration = 2000, shouldStart = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);

  return count;
}

export default function ResumeBuilder() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // Counter values
  const successRate = useCounter(98, 2000, isVisible);
  const users = useCounter(50, 2000, isVisible);
  const rating = useCounter(49, 2000, isVisible);

  // Intersection Observer for triggering animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const resumeFeatures = [
    { 
      icon: <Sparkles className="w-7 h-7" />, 
      title: "AI Writing", 
      description: "Share your thoughts, and let our AI optimize the language for you",
      gradient: "from-blue-500 to-indigo-600"
    },
    { 
      icon: <FileText className="w-7 h-7" />, 
      title: "Resume Template", 
      description: "Professional template that highlights your strengths",
      gradient: "from-indigo-500 to-purple-600"
    },
    { 
      icon: <Target className="w-7 h-7" />, 
      title: "ATS Optimized", 
      description: "Highlight key skills and experience to pass resume screening",
      gradient: "from-purple-500 to-pink-600"
    },
  ];

  const tools = [
    { icon: "✏️", title: "AI Cover Letter", description: "Generate a cover letter that grabs recruiters' attention." },
    { icon: "📋", title: "Resume Optimizer", description: "Optimize your resume to receive more job interviews." },
    { icon: "🔍", title: "ATS Checker", description: "Check if your resume can pass resume screening system." },
    { icon: "⭐", title: "Resume Rater", description: "Get a score and feedback to improve your resume." },
    { icon: "📝", title: "Resume Formatter", description: "Reformat your resume for clean, professional layouts." },
    { icon: "🔧", title: "Resume Fixer", description: "Quickly fix resume issues like formatting, grammar, etc." },
    { icon: "💼", title: "Job Description Generator", description: "Craft perfect job descriptions for your resume." },
    { icon: "✉️", title: "Thank-you Email Generator", description: "Write a polished thank-you email in seconds." },
  ];

  const reviews = [
    { name: "Sarah Johnson", role: "Software Engineer", avatar: "SJ", rating: 5, text: "The AI Resume Builder helped me land my dream job at a top tech company! The ATS optimization feature was a game-changer.", color: "from-blue-500 to-indigo-600" },
    { name: "Michael Chen", role: "Product Manager", avatar: "MC", rating: 5, text: "I went from 2 interviews per month to 8! The resume templates are professional and the AI writing suggestions are spot-on.", color: "from-purple-500 to-pink-600" },
    { name: "Emily Rodriguez", role: "Data Analyst", avatar: "ER", rating: 5, text: "Best investment in my career. The cover letter generator alone saved me hours of work. Highly recommend!", color: "from-pink-500 to-rose-600" },
    { name: "David Kim", role: "Marketing Manager", avatar: "DK", rating: 5, text: "The ATS checker feature is incredible. My resume now passes through applicant tracking systems with ease. Got 3 offers in a month!", color: "from-blue-500 to-cyan-600" },
    { name: "Jessica Williams", role: "UX Designer", avatar: "JW", rating: 5, text: "Clean, modern templates and intelligent AI suggestions. This tool completely transformed my job search experience.", color: "from-emerald-500 to-teal-600" },
    { name: "Alex Thompson", role: "Business Analyst", avatar: "AT", rating: 5, text: "From zero callbacks to multiple interview invites. The resume optimizer is worth every penny. Thank you!", color: "from-amber-500 to-orange-600" },
  ];

  const renderStars = (rating) => (
    <div className="flex gap-1">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />*/}
        </div> 

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-200">
            <Sparkles className="w-4 h-4" />
            Free AI-Powered Tool
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            AI Resume 
            <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Builder
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            Harness the power of AI to create, optimize, and personalize your resume in minutes
          </p>

          <button
            onClick={() => navigate("/interview")}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-500/30 transition-all"
          >
            <Sparkles className="w-5 h-5" />
            Start Building Free
          </button>

          <p className="text-slate-500 text-sm mt-4">No credit card required • Always free</p>
        </div>
      </section>

      {/* Features Section - 3D Enhanced with Counter Animation */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #4f46e5 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="relative" id="stats-section">
              {/* Decorative 3D Element */}
              <div className="absolute -left-8 top-0 w-32 h-32 bg-gradient-to-br from-slate-200 to-slate-300 rounded-3xl blur-2xl opacity-50" />
              
              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg shadow-gray-200/80">
                  <TrendingUp className="w-4 h-4" />
                  Interview Made Easy
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  Get{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      20x
                    </span>
                  </span>
                  {" "}More Interview Invites
                </h2>
                
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  Tired of getting ghosted? Stand out with AI-powered resume optimization and land more interviews.
                </p>

                {/* Animated Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="relative">
                    <div className="relative bg-white rounded-2xl p-4 border border-slate-200 shadow-xl shadow-gray-300/60">
                      <div className="text-3xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {successRate}%
                      </div>
                      <div className="text-xs text-slate-600 mt-1">Success Rate</div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="relative bg-white rounded-2xl p-4 border border-slate-200 shadow-xl shadow-gray-300/60">
                      <div className="text-3xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {users}K+
                      </div>
                      <div className="text-xs text-slate-600 mt-1">Users</div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="relative bg-white rounded-2xl p-4 border border-slate-200 shadow-xl shadow-gray-300/60">
                      <div className="text-3xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {(rating / 10).toFixed(1)}★
                      </div>
                      <div className="text-xs text-slate-600 mt-1">Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Feature Cards with 3D Effect */}
            <div className="space-y-6">
              {resumeFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="relative"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {/* Main Card */}
                  <div className="relative bg-white rounded-2xl p-6 border-2 border-indigo-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] shadow-gray-300/50 transform transition-all duration-300">
                    <div className="flex items-start gap-5">
                      {/* Icon with 3D Effect */}
                      <div className="relative flex-shrink-0">
                        <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-white shadow-lg shadow-gray-400/40`}>
                          {feature.icon}
                        </div>
                      </div>

                      <div className="flex-1 pt-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                          {feature.title}
                          <CheckCircle className="w-5 h-5 text-indigo-500" />
                        </h3>
                        <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section - 3D Enhanced */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-slate-200/30 to-slate-300/30 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg shadow-gray-200/80">
              <Award className="w-4 h-4" />
              Free Toolkit
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5">
              Complete Job Search{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Toolkit
                </span>
              </span>
            </h2>
            
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to land your dream job, powered by AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool, i) => (
              <div
                key={i}
                className="relative"
              >
                {/* Main Card with 3D Shadow */}
                <div className="relative bg-white rounded-2xl p-8 border-2 border-indigo-50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] shadow-gray-300/40 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    {/* Icon Container with 3D Effect */}
                    <div className="relative flex-shrink-0">
                      <div className="relative w-16 h-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center text-3xl border-2 border-indigo-100 shadow-lg shadow-gray-300/50">
                        {tool.icon}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                        {tool.title}
                        <Zap className="w-4 h-4 text-indigo-500" />
                      </h3>
                      <p className="text-slate-600 leading-relaxed">{tool.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ToolsSection />

      {/* Testimonials Section with Animation */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Star className="w-4 h-4 fill-amber-700" />
              Trusted Worldwide
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5">
              Loved by Thousands Worldwide
            </h2>
            
            <p className="text-xl text-slate-600">
              Join professionals who've transformed their job search
            </p>
          </div>
        </div>

        {/* Scrolling Animation Container */}
        <div className="relative">
          <div className="flex gap-6 animate-scroll-left">
            {[...reviews, ...reviews].map((review, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[400px] bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${review.color} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{review.name}</h4>
                    <p className="text-sm text-slate-500">{review.role}</p>
                  </div>
                </div>
                
                <div className="mb-4">{renderStars(review.rating)}</div>
                
                <p className="text-slate-600 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>

          {/* Gradient Overlays */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>

        {/* Add keyframes for animation */}
        <style jsx>{`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll-left {
            animation: scroll-left 30s linear infinite;
          }

          .animate-scroll-left:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      <Footer />
    </div>
  );
}