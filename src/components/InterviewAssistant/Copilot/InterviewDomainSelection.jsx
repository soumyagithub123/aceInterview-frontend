// src/components/Copilot/InterviewDomainSelection.jsx

import React from 'react';
import { Lock, Code, FileText, Phone, Video, Database, Megaphone, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../../../context/AppDataContext';

const domains = [
  {
    name: 'General Interview',
    description: 'Behavioral, Conceptual, and Technical Questions All-In-One',
    icon: FileText,
    available: true,
    requiresPaid: false,
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    name: 'Coding Interview',
    description: 'One-Click Coding Interpreter Plugin for 30+ Programming Languages',
    icon: Code,
    available: true,
    requiresPaid: true,
    color: 'from-green-500 to-green-600'
  },
  {
    name: 'Online Assessment',
    description: 'Crack Online Tests Instantly with Powerful LLM Vision Technology',
    icon: FileText,
    available: true,
    requiresPaid: true,
    color: 'from-orange-500 to-orange-600'
  },
  {
    name: 'Phone Interview',
    description: 'Real-Time Interview Copilot for Calls on Another Device',
    icon: Phone,
    available: true,
    requiresPaid: true,
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Professional Meeting',
    description: 'AI Copilot and Meeting Notes For Your Professional Meetings',
    icon: Video,
    available: true,
    requiresPaid: true,
    color: 'from-purple-500 to-purple-600'
  },
  {
    name: 'Software Engineering',
    description: 'Algorithms, System Design Patterns, DevOps Standards and more',
    icon: Code,
    available: true,
    requiresPaid: true,
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    name: 'Data Science & Analytics',
    description: 'SQL, Statistical Methods, Machine Learning Models, Data Visualization and more',
    icon: Database,
    available: true,
    requiresPaid: true,
    color: 'from-violet-500 to-violet-600'
  },
  {
    name: 'Marketing',
    description: 'Marketing Strategies, Digital Marketing, Brand Management and more',
    icon: Megaphone,
    available: true,
    requiresPaid: true,
    color: 'from-pink-500 to-pink-600'
  }
];

export default function InterviewDomainSelection({ onSelect }) {
  const navigate = useNavigate();
  const { isPaidUser, userProfile } = useAppData();

  const handleDomainClick = (domain) => {
    // ✅ Free domain - anyone can use
    if (!domain.requiresPaid) {
      onSelect(domain.name);
      return;
    }

    // 🔒 Paid domain - check subscription
    if (domain.requiresPaid && !isPaidUser) {
      // Redirect to pricing
      navigate('/pricing', {
        state: {
          message: `Upgrade to unlock ${domain.name}`,
          feature: domain.name
        }
      });
      return;
    }

    // ✅ User has paid subscription
    onSelect(domain.name);
  };

  return (
    <div className="space-y-6">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {domains.map((domain, index) => {
          const IconComponent = domain.icon;
          const isLocked = domain.requiresPaid && !isPaidUser;
          
          return (
            <button
              key={index}
              onClick={() => handleDomainClick(domain)}
              className={`bg-[#14141b] border border-gray-800 rounded-xl p-5 sm:p-6 text-left transition-all relative ${
                isLocked
                  ? 'opacity-70 hover:opacity-100 cursor-pointer hover:border-yellow-500/50'
                  : 'hover:border-purple-500/50 hover:bg-gray-900/50 cursor-pointer shadow-lg hover:shadow-purple-500/10'
              }`}
            >
              {/* Lock/Crown Badge */}
              {isLocked && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 rounded-full px-2.5 py-1">
                  <Crown className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-[10px] font-semibold text-yellow-300">PRO</span>
                </div>
              )}
              
              {/* Icon */}
              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${domain.color} rounded-lg flex items-center justify-center mb-4 opacity-80`}>
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-white font-semibold text-base mb-1 sm:mb-2">
                {domain.name}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">
                {domain.description}
              </p>

              {/* Unlock Message */}
              {isLocked && (
                <div className="mt-3 flex items-center gap-1.5 text-yellow-400 text-xs">
                  <Lock className="w-3 h-3" />
                  <span className="font-medium">Click to upgrade</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Info Banner */}
      {!isPaidUser && (
        <div className="rounded-xl border border-yellow-400/20 bg-gradient-to-r from-yellow-400/5 to-orange-400/5 p-4 flex items-start gap-3">
          <Crown className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white text-sm font-semibold">
              Unlock All Interview Domains
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Upgrade to Pro to access all interview types, coding challenges, and advanced features.
            </p>
            <button
              onClick={() => navigate('/pricing')}
              className="mt-3 inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold px-4 py-2 rounded-lg text-xs hover:from-yellow-300 hover:to-orange-300 transition-all"
            >
              <Crown className="w-4 h-4" />
              View Pricing
            </button>
          </div>
        </div>
      )}

      {/* User Status */}
      {userProfile && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs">
            <div className={`w-2 h-2 rounded-full ${
              isPaidUser ? 'bg-green-400' : 'bg-gray-400'
            }`} />
            <span className="text-white/70">
              Current Plan: <span className="font-semibold text-white capitalize">
                {userProfile.subscription_tier}
              </span>
            </span>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-4">
        <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm sm:text-base font-semibold">
          1
        </button>
        <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 text-gray-400 flex items-center justify-center text-sm sm:text-base font-semibold hover:bg-gray-700 transition-colors">
          2
        </button>
      </div>
    </div>
  );
}