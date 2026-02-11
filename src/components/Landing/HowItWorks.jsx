
import React, { useEffect, useState } from "react";

const FEATURES = [
  {
    id: 1,
    title: "Live Transcription",
    description: "Capture every interview detail that would make crucial difference.",
    type: "transcription"
  },
  {
    id: 2,
    title: "Auto Question Detection",
    description: "Automatically detects questions for instant, precise answers.",
    type: "detection"
  },
  {
    id: 3,
    title: "Personalized AI Copilot",
    description: "Highlight skills & experience that align with company values.",
    type: "copilot"
  },
  {
    id: 4,
    title: "Interview Question Banks",
    description: "Practice extensive question banks with AI interviewer.",
    type: "questions"
  },
  {
    id: 5,
    title: "Latest AI Models",
    description: "Empowers interviews with best language models.",
    type: "models"
  },
  {
    id: 6,
    title: "Support 25+ Languages",
    description: "Interviewing for different language? No Worries.",
    type: "languages"
  }
];

// Live Transcription Animation
const TranscriptionAnimation = () => {
  const [lines, setLines] = useState([]);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const fullLines = [
      "Interviewer: Describe your experience with distributed systems.",
      "Candidate: I architected a microservices platform handling 100M+ requests daily.",
      "We implemented event-driven architecture using Kafka and Redis."
    ];

    let currentLine = 0;
    let currentChar = 0;
    let pauseCount = 0;

    const interval = setInterval(() => {
      if (pauseCount > 0) {
        pauseCount--;
        return;
      }

      if (currentLine < fullLines.length) {
        if (currentChar <= fullLines[currentLine].length) {
          setLines(prev => {
            const newLines = [...prev];
            newLines[currentLine] = fullLines[currentLine].slice(0, currentChar);
            return newLines;
          });
          currentChar++;
          setIsTyping(true);
        } else {
          currentLine++;
          currentChar = 0;
          pauseCount = 8;
        }
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setLines([]);
          currentLine = 0;
          currentChar = 0;
        }, 2000);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="ml-auto text-xs font-medium text-gray-500 flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            Recording
          </span>
        </div>
        <div className="space-y-3 min-h-[120px] font-mono text-sm">
          {lines.map((line, i) => (
            <div 
              key={i} 
              className={`leading-relaxed ${
                line.startsWith('Interviewer') 
                  ? 'text-blue-700 font-semibold' 
                  : 'text-gray-800'
              }`}
            >
              {line}
              {i === lines.length - 1 && isTyping && (
                <span className="inline-block w-2 h-4 bg-blue-600 ml-1 animate-pulse"></span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Auto Question Detection Animation - Professional version
const DetectionAnimation = () => {
  const [phase, setPhase] = useState(0);
  
  const conversation = [
    {
      speaker: "Interviewer",
      text: "Can you walk me through how you would approach building a scalable recommendation system?"
    }
  ];

  const analysisSteps = [
    { label: "Analyzing", color: "blue", icon: "⚡" },
    { label: "Question Detected", color: "green", icon: "✓" },
    { label: "Generating Response", color: "purple", icon: "🤖" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>

        {/* Question Text */}
        <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <div className="text-xs font-semibold text-blue-600 mb-1">
            {conversation[0].speaker}
          </div>
          <div className="text-sm text-gray-800 leading-relaxed">
            {conversation[0].text}
          </div>
        </div>

        {/* Analysis Steps */}
        <div className="space-y-2">
          {analysisSteps.map((step, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                phase > i
                  ? `bg-${step.color}-50 border-${step.color}-200 border-2`
                  : 'bg-gray-50 border-gray-200 border'
              }`}
            >
              <div className={`text-lg transition-transform duration-300 ${
                phase > i ? 'scale-110' : 'scale-100 opacity-50'
              }`}>
                {step.icon}
              </div>
              <div className={`text-sm font-medium transition-colors duration-300 ${
                phase > i ? `text-${step.color}-700` : 'text-gray-400'
              }`}>
                {step.label}
              </div>
              {phase > i && (
                <div className="ml-auto">
                  <div className={`w-2 h-2 rounded-full bg-${step.color}-500 animate-pulse`}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Personalized AI Copilot Animation
const CopilotAnimation = () => {
  const [activeCard, setActiveCard] = useState(1);
  
  const cards = [
    { 
      icon: "👤", 
      title: "Profile Match", 
      subtitle: "85% compatibility",
      color: "from-rose-500 to-pink-600",
      bgColor: "bg-rose-50"
    },
    { 
      icon: "🎯", 
      title: "Skills Aligned", 
      subtitle: "React, Node.js, AWS",
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-50"
    },
    { 
      icon: "🏆", 
      title: "Experience", 
      subtitle: "5+ years relevant",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex gap-4 justify-center items-center">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ${
                i === activeCard 
                  ? 'scale-110 -translate-y-2' 
                  : 'scale-90 opacity-40'
              }`}
            >
              <div className={`${card.bgColor} border-2 border-gray-200 rounded-2xl p-4 w-24 shadow-lg hover:shadow-xl transition-shadow`}>
                <div className="text-3xl mb-2 text-center">{card.icon}</div>
                <div className="text-xs font-bold text-gray-800 text-center leading-tight mb-1">
                  {card.title}
                </div>
                <div className="text-[10px] text-gray-600 text-center">
                  {card.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex gap-2 justify-center">
          {cards.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === activeCard ? 'bg-blue-600 w-8' : 'bg-gray-300 w-1.5'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Interview Question Banks Animation
const QuestionBanksAnimation = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const questions = [
    { 
      q: 'Design a distributed cache system with automatic failover and data consistency',
      category: "System Design",
      company: "Meta",
      difficulty: "Hard",
      color: "red"
    },
    {
      q: 'Implement a rate limiter using the token bucket algorithm',
      category: "Algorithms",
      company: "Google", 
      difficulty: "Medium",
      color: "yellow"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestion(prev => (prev + 1) % questions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative overflow-hidden min-h-[180px]">
        {questions.map((item, i) => (
          <div
            key={i}
            className={`transition-all duration-700 ${
              i === currentQuestion 
                ? 'opacity-100 translate-x-0 relative' 
                : i < currentQuestion
                ? 'opacity-0 absolute -translate-x-full'
                : 'opacity-0 absolute translate-x-full'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                item.difficulty === 'Hard' 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {item.difficulty}
              </span>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {item.category}
              </span>
            </div>
            
            <div className="text-base text-gray-900 mb-3 font-medium leading-relaxed">
              {item.q}
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-sm font-semibold text-gray-700">
                {item.company} Interview
              </span>
              <span className="text-xs text-gray-500">2 min ago</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Latest AI Models - With SVG logos
const ModelsAnimation = () => {
  const [active, setActive] = useState(0);

  const models = [
    { name: "ChatGPT", src: "/src/assets/homeimages/chatgpt.png" },
    { name: "Gemini", src: "/src/assets/homeimages/gemini.png" },
    { name: "Meta AI", src: "/src/assets/homeimages/metaai.png" },
    { name: "Perplexity", src: "/src/assets/homeimages/perplexity.png" },
    { name: "DeepSeek", src: "/src/assets/homeimages/deepseek.png" }
  ];

  useEffect(() => {
    const t = setInterval(
      () => setActive(p => (p + 1) % models.length),
      2000
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
        <div className="flex gap-4 justify-center items-center">
          {models.map((m, i) => (
            <div
              key={i}
              className={`w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-md transition-all ${
                i === active
                  ? "scale-125 ring-4 ring-blue-500"
                  : "opacity-60"
              }`}
            >
              <img
                src={m.src}
                alt={m.name}
                className="w-10 h-10 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// Support Languages - Country flags with proper images
// Support Languages - REAL flags
const LanguagesAnimation = () => {
  const [x, setX] = useState(0);

  const flags = [
    "us","de","fr","it","gb","es","br",
    "jp","kr","cn","in","ru"
  ];

  useEffect(() => {
    const i = setInterval(() => {
      setX(p => (p >= flags.length * 72 ? 0 : p + 1));
    }, 30);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full overflow-hidden">
        <div
          className="flex gap-3 transition-transform duration-100"
          style={{ transform: `translateX(-${x}px)` }}
        >
          {[...flags, ...flags].map((c, i) => (
            <div key={i} className="flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl border-2 border-gray-200 shadow-md flex items-center justify-center bg-white hover:scale-110 transition">
                <img
                  src={`https://flagcdn.com/w40/${c}.png`}
                  alt={c}
                  className="w-10 h-7 object-cover rounded-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ feature, index }) => {
  const renderAnimation = () => {
    switch (feature.type) {
      case "transcription": return <TranscriptionAnimation />;
      case "detection": return <DetectionAnimation />;
      case "copilot": return <CopilotAnimation />;
      case "questions": return <QuestionBanksAnimation />;
      case "models": return <ModelsAnimation />;
      case "languages": return <LanguagesAnimation />;
      default: return null;
    }
  };

  return (
    <div 
      className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 opacity-0 animate-fadeInUp"
      style={{ 
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'forwards'
      }}
    >
      {/* Animation Area */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 h-80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20"></div>
        {renderAnimation()}
      </div>
      
      {/* Content Area */}
      <div className="p-6 bg-white">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {feature.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

export default function HowItWorks() {
  return (
    <>
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How Interview AI works?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get real-time, personalized coaching tailored to your resume, job description, and company
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <FeatureCard key={feature.id} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-in;
        }
      `}</style>
    </>
  );
}