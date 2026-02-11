// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Hero() {
//   const navigate = useNavigate();

//   return (
//     <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 bg-gradient-to-br from-purple-300 via-purple-100 to-indigo-200 overflow-hidden">
//       {/* Decorative sparkles */}
//       <div className="absolute top-16 left-4 sm:left-10 text-purple-400 text-4xl sm:text-6xl opacity-30">✦</div>
//       <div className="absolute top-32 sm:top-40 right-6 sm:right-20 text-purple-300 text-3xl sm:text-4xl opacity-20">✦</div>
//       <div className="absolute top-52 sm:top-60 left-1/2 text-indigo-300 text-4xl sm:text-5xl opacity-20">✦</div>

//       {/* Main content */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center sm:text-left">
//         <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
//           Rambling answers,<br />
//           generic responses,<br />
//           nervous pauses?
//         </h1>

//         <p className="text-lg sm:text-xl md:text-2xl mb-2 text-gray-700">
//           Become interview-ready today with
//         </p>

//         <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#6C63FF] mb-8 sm:mb-10">
//           AI Interview Copilot
//         </p>

//         {/* Button */}
//         <div className="flex justify-center sm:justify-start">
//           <button
//             onClick={() => navigate("/interview")}
//             className="px-6 sm:px-8 py-3 sm:py-4 bg-indigo-900 text-white rounded-xl font-semibold text-base sm:text-lg hover:bg-indigo-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
//           >
//             Start Now for Free
//           </button>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 sm:mt-20 max-w-3xl mx-auto sm:mx-0">
//           <div className="group cursor-default text-center sm:text-left">
//             <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2 group-hover:scale-110 transition-transform">
//               10K+
//             </div>
//             <div className="text-gray-600 text-sm">Active Users</div>
//           </div>

//           <div className="group cursor-default text-center sm:text-left">
//             <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2 group-hover:scale-110 transition-transform">
//               95%
//             </div>
//             <div className="text-gray-600 text-sm">Success Rate</div>
//           </div>

//           <div className="group cursor-default text-center sm:text-left">
//             <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2 group-hover:scale-110 transition-transform">
//               50K+
//             </div>
//             <div className="text-gray-600 text-sm">Interviews Aced</div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }









import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function CountUpStat({ value, suffix, label, delay }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;

          setTimeout(() => {
            const timer = setInterval(() => {
              current += increment;
              if (current >= value) {
                setCount(value);
                clearInterval(timer);
              } else {
                setCount(Math.floor(current));
              }
            }, duration / steps);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, delay, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-500 text-sm mt-2 font-medium">{label}</div>
    </div>
  );
}

function TypewriterText({ text, delay = 0, speed = 30, isActive }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setDisplayedText("");
      setCurrentIndex(0);
      return;
    }

    const startDelay = setTimeout(() => {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex < text.length) {
            setDisplayedText(text.slice(0, prevIndex + 1));
            return prevIndex + 1;
          } else {
            clearInterval(timer);
            return prevIndex;
          }
        });
      }, speed);
      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(startDelay);
  }, [text, delay, speed, isActive]);

  return <>{displayedText}</>;
}

export default function Hero() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const cards = [
    {
      id: 0,
      title: "Interview Copilot",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      content: (isActive) => (
        <div className="space-y-4">
          <p className="text-gray-300 text-sm leading-relaxed">
            <TypewriterText 
              text="I am a seasoned Software Engineer with extensive experience in end-to-end application development."
              delay={200}
              speed={20}
              isActive={isActive}
            />
          </p>
          
          <ul className="space-y-2.5 text-gray-300 text-xs leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>
                <TypewriterText 
                  text="Over the past few years, I've had the opportunity to work with some dynamic organizations, enhancing my skill set and deepening my expertise."
                  delay={2500}
                  speed={15}
                  isActive={isActive}
                />
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>
                <TypewriterText 
                  text="Currently, I am with Tiktok/Bytedance in San Jose, CA, where I've been involved in creating applications using Golang and React for internal users."
                  delay={5000}
                  speed={15}
                  isActive={isActive}
                />
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>
                <TypewriterText 
                  text="I've also implemented Elastic Search to improve the searchability of applications and developed several user interfaces for internal portals using React and TypeScript."
                  delay={7500}
                  speed={15}
                  isActive={isActive}
                />
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 1,
      title: "Sentiments",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: (isActive) => (
        <div className="space-y-5">
          <div>
            <p className="text-gray-400 text-xs mb-3 font-medium">
              <TypewriterText 
                text="Recommended tones:"
                delay={200}
                speed={30}
                isActive={isActive}
              />
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-medium">
                Passionate
              </span>
              <span className="px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-medium">
                Ambition
              </span>
              <span className="px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-medium">
                Interested
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <span className="text-gray-400 text-xs font-medium">
                <TypewriterText 
                  text="Context Retrieval"
                  delay={1000}
                  speed={40}
                  isActive={isActive}
                />
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              <TypewriterText 
                text="Google's mission and values."
                delay={1800}
                speed={30}
                isActive={isActive}
              />
            </p>
            <ul className="space-y-1.5 text-gray-300 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span className="text-white font-medium">
                  <TypewriterText 
                    text="Move Fast"
                    delay={2800}
                    speed={40}
                    isActive={isActive}
                  />
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span className="text-white font-medium">
                  <TypewriterText 
                    text="Focus on Long-Term Impact"
                    delay={3200}
                    speed={40}
                    isActive={isActive}
                  />
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span className="text-white font-medium">
                  <TypewriterText 
                    text="Build Awesome Things"
                    delay={4200}
                    speed={40}
                    isActive={isActive}
                  />
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span className="text-white font-medium">
                  <TypewriterText 
                    text="Live in the Future"
                    delay={5000}
                    speed={40}
                    isActive={isActive}
                  />
                </span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveCard((prev) => (prev + 1) % cards.length);
        setIsTransitioning(false);
      }, 500);
    }, 12000);
    return () => clearInterval(interval);
  }, [cards.length]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleCardChange = (index) => {
    if (index !== activeCard) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveCard(index);
        setIsTransitioning(false);
      }, 500);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Content Grid - Left: Content, Right: Cards */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Left Side - All Content */}
          <div className="text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 mb-8 animate-fade-in shadow-sm hover:shadow-md transition-all duration-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">New</span>
              <span className="text-gray-700 text-sm font-medium">AI Interview Copilot</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6 animate-fade-in">
              Real-time assistance for{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                  live interviews
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 5 100 2 150 5C200 8 250 10 298 8" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#312E81" />
<stop offset="50%" stopColor="#1E1B4B" />
<stop offset="100%" stopColor="#312E81" />

                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in max-w-xl">
              Instant answers to any question during live interviews.{" "}
              <span className="text-gray-800 font-semibold">Guaranteed to land your dream job.</span>
            </p>

            {/* Social proof */}
            <div className="flex items-center gap-4 mb-8 animate-fade-in">
              <div className="flex -space-x-3">
                {[
                  'https://randomuser.me/api/portraits/men/32.jpg',
                  'https://randomuser.me/api/portraits/women/44.jpg',
                  'https://randomuser.me/api/portraits/men/46.jpg',
                  'https://randomuser.me/api/portraits/women/68.jpg',
                ].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`User ${i + 1}`}
                    className="w-10 h-10 rounded-full border-3 border-white shadow-lg hover:scale-110 transition-transform duration-300 object-cover"
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-blue-600 text-sm font-semibold">
                  11K+ Job Seekers
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="animate-fade-in">
              <button
                onClick={() => navigate("/interview")}
                className="group relative bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-10 py-5 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Try for free
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>
              <p className="text-sm text-gray-500 mt-3">No credit card required • Free forever</p>
            </div>
          </div>

          {/* Right Side - Animated Card with Swap Effect */}
          <div className="relative animate-fade-in">
            <div className="relative h-[550px] overflow-hidden">
              {cards.map((card, index) => {
                const isActive = index === activeCard;
                
                return (
                  <div
                    key={card.id}
                    className="absolute inset-0 transition-all duration-500 ease-out"
                    style={{
                      transform: isActive 
                        ? 'translateX(0) scale(1)' 
                        : index > activeCard 
                          ? 'translateX(100%) scale(0.9)' 
                          : 'translateX(-100%) scale(0.9)',
                      opacity: isActive ? 1 : 0,
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    <div
                      className="relative rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 h-full shadow-2xl border border-gray-700/50"
                      style={{
                        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                            {card.icon}
                          </div>
                          <span className="font-semibold text-white text-sm">{card.title}</span>
                        </div>
                        
                        {/* Tab indicators */}
                        <div className="flex gap-1.5">
                          {cards.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => handleCardChange(i)}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                i === activeCard 
                                  ? 'w-6 bg-indigo-500' 
                                  : 'w-1.5 bg-gray-600 hover:bg-gray-500'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Content with Typewriter */}
                      <div className="overflow-y-auto max-h-[420px] pr-2 custom-scrollbar">
                        {card.content(isActive)}
                      </div>

                      {/* Decorative gradient */}
                      <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom bar - Get tailored support */}
            <div className="mt-6 flex items-center gap-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-4 shadow-2xl border border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
              <span className="text-white text-sm font-medium flex-1 text-left">
                Get tailored support instantly
              </span>
            </div>
          </div>
        </div>

        {/* Stats with enhanced 3D cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {[
            { value: 96, suffix: "%", label: "Interview Success Rate" },
            { value: 7000, suffix: "+", label: "Interviews Aced" },
            { value: 1500, suffix: "+", label: "Hours of Interview Help" },
          ].map((stat, i) => (
            <div
              key={i}
              className="group relative transform transition-all duration-700  "
              style={{ perspective: "1000px" }}
            >
              <div
                className="relative rounded-2xl bg-white p-8 border border-gray-200/80"
                style={{
                  boxShadow: `
                    0 20px 40px -10px rgba(0, 0, 0, 0.15),
                    0 0 0 1px rgba(0, 0, 0, 0.05),
                    inset 0 1px 0 0 rgba(255, 255, 255, 0.9)
                  `,
                  transformStyle: "preserve-3d",
                  transform: "translateZ(20px)"
                }}
              >
               <div className="absolute inset-0 rounded-2xl bg-gradient-to-br 
from-indigo-900/0 via-indigo-900/0 to-indigo-900/0
 transition-all duration-500 pointer-events-none" />

                <CountUpStat
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  delay={i * 200}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
}