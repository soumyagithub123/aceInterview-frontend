// // src/components/Copilot/InterviewDomainSelection.jsx

// import React from 'react';
// import { Lock, Code, FileText, Phone, Video, Database, Megaphone, Crown } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useAppData } from '../../../context/AppDataContext';
// import { useAuth } from '../../Auth/AuthContext';

// const domains = [
//   {
//     name: 'General Interview',
//     description: 'Behavioral, Conceptual, and Technical Questions All-In-One',
//     icon: FileText,
//     available: true,
//     requiresPaid: false,
//     color: 'from-yellow-500 to-yellow-600'
//   },
//   {
//     name: 'Coding Interview',
//     description: 'One-Click Coding Interpreter Plugin for 30+ Programming Languages',
//     icon: Code,
//     available: true,
//     requiresPaid: true,
//     color: 'from-green-500 to-green-600'
//   },

//   {
//     name: 'Phone Interview',
//     description: 'Real-Time Interview Copilot for Calls on Another Device',
//     icon: Phone,
//     available: true,
//     requiresPaid: true,
//     color: 'from-blue-500 to-blue-600'
//   },
//   {
//     name: 'Professional Meeting',
//     description: 'AI Copilot and Meeting Notes For Your Professional Meetings',
//     icon: Video,
//     available: true,
//     requiresPaid: true,
//     color: 'from-purple-500 to-purple-600'
//   },
//   {
//     name: 'Software Engineering',
//     description: 'Algorithms, System Design Patterns, DevOps Standards and more',
//     icon: Code,
//     available: true,
//     requiresPaid: true,
//     color: 'from-indigo-500 to-indigo-600'
//   },
//   {
//     name: 'Data Science & Analytics',
//     description: 'SQL, Statistical Methods, Machine Learning Models, Data Visualization and more',
//     icon: Database,
//     available: true,
//     requiresPaid: true,
//     color: 'from-violet-500 to-violet-600'
//   },
//   {
//     name: 'Marketing',
//     description: 'Marketing Strategies, Digital Marketing, Brand Management and more',
//     icon: Megaphone,
//     available: true,
//     requiresPaid: true,
//     color: 'from-pink-500 to-pink-600'
//   }
// ];

// export default function InterviewDomainSelection({ onSelect }) {
//   const navigate = useNavigate();
//   const { isPaidUser, userProfile, currentPlan } = useAppData();
//   const { quota } = useAuth();

//   const handleDomainClick = (domain) => {
//     // ✅ Free domain - check quota for free users
//     if (!domain.requiresPaid) {
//       // Free users: check if sessions exhausted
//       if (!isPaidUser && quota && quota.sessions_remaining === 0) {
//         navigate('/pricing', {
//           state: { message: 'You have used all your free sessions. Please upgrade to continue.' }
//         });
//         return;
//       }
//       onSelect(domain.name);
//       return;
//     }

//     // 🔒 Paid domain - check subscription
//     if (domain.requiresPaid && !isPaidUser) {
//       // Redirect to pricing
//       navigate('/pricing', {
//         state: {
//           message: `Upgrade to unlock ${domain.name}`,
//           feature: domain.name
//         }
//       });
//       return;
//     }

//     // ✅ User has paid subscription
//     onSelect(domain.name);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {domains.map((domain, index) => {
//           const IconComponent = domain.icon;
//           const isLocked = domain.requiresPaid && !isPaidUser;
          
//           return (
//             <button
//               key={index}
//               onClick={() => handleDomainClick(domain)}
//               className={`bg-[#14141b] border border-gray-800 rounded-xl p-5 sm:p-6 text-left transition-all relative ${
//                 isLocked
//                   ? 'opacity-70 hover:opacity-100 cursor-pointer hover:border-yellow-500/50'
//                   : 'hover:border-purple-500/50 hover:bg-gray-900/50 cursor-pointer shadow-lg hover:shadow-purple-500/10'
//               }`}
//             >
//               {/* Lock/Crown Badge */}
//               {isLocked && (
//                 <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 rounded-full px-2.5 py-1">
//                   <Crown className="w-3.5 h-3.5 text-yellow-400" />
//                   <span className="text-[10px] font-semibold text-yellow-300">PRO</span>
//                 </div>
//               )}
              
//               {/* Icon */}
//               <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${domain.color} rounded-lg flex items-center justify-center mb-4 opacity-80`}>
//                 <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//               </div>

//               {/* Title */}
//               <h3 className="text-white font-semibold text-base mb-1 sm:mb-2">
//                 {domain.name}
//               </h3>

//               {/* Description */}
//               <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">
//                 {domain.description}
//               </p>

//               {/* Unlock Message */}
//               {isLocked && (
//                 <div className="mt-3 flex items-center gap-1.5 text-yellow-400 text-xs">
//                   <Lock className="w-3 h-3" />
//                   <span className="font-medium">Click to upgrade</span>
//                 </div>
//               )}
//             </button>
//           );
//         })}
//       </div>

//       {/* Info Banner */}
//       {!isPaidUser && (
//         <div className="rounded-xl border border-yellow-400/20 bg-gradient-to-r from-yellow-400/5 to-orange-400/5 p-4 flex items-start gap-3">
//           <Crown className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
//           <div>
//             <p className="text-white text-sm font-semibold">
//               Unlock All Interview Domains
//             </p>
//             <p className="text-gray-400 text-xs mt-1">
//               Upgrade to Pro to access all interview types, coding challenges, and advanced features.
//             </p>
//             <button
//               onClick={() => navigate('/pricing')}
//               className="mt-3 inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold px-4 py-2 rounded-lg text-xs hover:from-yellow-300 hover:to-orange-300 transition-all"
//             >
//               <Crown className="w-4 h-4" />
//               View Pricing
//             </button>
//           </div>
//         </div>
//       )}

//       {/* User Status */}
//       {userProfile && (
//         <div className="text-center">
//           <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs">
//             <div className={`w-2 h-2 rounded-full ${
//               isPaidUser ? 'bg-green-400' : 'bg-gray-400'
//             }`} />
//             <span className="text-white/70">
//               Current Plan: <span className="font-semibold text-white capitalize">
//                 {currentPlan || "free"}
//               </span>
//             </span>
//           </div>
//         </div>
//       )}

//       {/* ✅ SESSION QUOTA BANNER */}
//       {quota && (
//         <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className={`w-2 h-2 rounded-full ${
//               quota.is_unlimited ? 'bg-green-400' :
//               quota.sessions_remaining === 0 ? 'bg-red-400' :
//               quota.sessions_remaining <= 2 ? 'bg-yellow-400' : 'bg-green-400'
//             }`} />
//             <span className="text-sm text-white/70">
//               {quota.is_unlimited ? (
//                 <span className="text-green-400 font-medium">Unlimited Sessions</span>
//               ) : quota.sessions_remaining === 0 ? (
//                 <span className="text-red-400 font-medium">No sessions remaining</span>
//               ) : (
//                 <>
//                   <span className="text-white font-semibold">{quota.sessions_remaining}</span>
//                   <span className="text-white/50"> / {quota.sessions_limit} sessions remaining</span>
//                 </>
//               )}
//             </span>
//           </div>
//           <div className="flex items-center gap-2 text-xs text-white/40">
//             <span>{quota.session_duration_minutes} min / session</span>
//             {quota.can_extend && (
//               <span className="text-green-400/70">• Extendable</span>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Pagination Controls */}
//       <div className="flex justify-center gap-2 mt-4">
//         <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm sm:text-base font-semibold">
//           1
//         </button>
//         <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 text-gray-400 flex items-center justify-center text-sm sm:text-base font-semibold hover:bg-gray-700 transition-colors">
//           2
//         </button>
//       </div>
//     </div>
//   );
// }












// src/components/Copilot/InterviewDomainSelection.jsx
// ✅ UPDATED:
// 1. General Interview lock when free user has 0 sessions remaining
// 2. Session quota banner with remaining count from sessionQuota
// 3. Proper lock UI for exhausted free users

import React from 'react';
import { Lock, Code, FileText, Phone, Video, Database, Megaphone, Crown, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../../../context/AppDataContext';

const domains = [
  {
    name: 'General Interview',
    description: 'Behavioral, Conceptual, and Technical Questions All-In-One',
    icon: FileText,
    available: true,
    requiresPaid: false,  // Free users can use this BUT limited by session quota
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
  const { isPaidUser, userProfile, currentPlan, sessionQuota } = useAppData();

  // ✅ Free user ke sessions khatam ho gaye?
  const freeSessionsExhausted = !isPaidUser &&
    sessionQuota !== null &&
    !sessionQuota?.is_unlimited &&
    sessionQuota?.sessions_remaining === 0;

  const handleDomainClick = (domain) => {
    // ✅ General Interview: free users can use BUT sessions must be remaining
    if (!domain.requiresPaid) {
      if (freeSessionsExhausted) {
        // Free sessions khatam — pricing pe bhejo
        navigate('/pricing', {
          state: {
            message: 'You have used all your free sessions. Upgrade to continue.',
            feature: 'General Interview'
          }
        });
        return;
      }
      onSelect(domain.name);
      return;
    }

    // 🔒 Paid domain — subscription check
    if (domain.requiresPaid && !isPaidUser) {
      navigate('/pricing', {
        state: {
          message: `Upgrade to unlock ${domain.name}`,
          feature: domain.name
        }
      });
      return;
    }

    // ✅ Paid user - all good
    onSelect(domain.name);
  };

  // ✅ Session quota display values
  const quotaDisplay = (() => {
    if (!sessionQuota) return null;
    if (sessionQuota.is_unlimited) {
      return { type: 'unlimited', label: 'Unlimited sessions', color: 'green' };
    }
    const { sessions_remaining, session_limit, duration_limit_mins } = sessionQuota;
    if (sessions_remaining === 0) {
      return {
        type: 'exhausted',
        label: 'No sessions remaining',
        sub: 'Upgrade to continue',
        color: 'red',
        remaining: 0,
        total: session_limit,
        duration: duration_limit_mins,
      };
    }
    return {
      type: 'limited',
      label: `${sessions_remaining} of ${session_limit} sessions remaining`,
      sub: `${duration_limit_mins} min per session`,
      color: sessions_remaining <= 2 ? 'yellow' : 'green',
      remaining: sessions_remaining,
      total: session_limit,
      duration: duration_limit_mins,
    };
  })();

  return (
    <div className="space-y-6">

      {/* ✅ SESSION QUOTA BANNER — always show when quota is available */}
      {quotaDisplay && (
        <div className={`rounded-xl border p-4 flex items-center justify-between gap-4 ${
          quotaDisplay.color === 'red'
            ? 'border-red-500/30 bg-red-500/10'
            : quotaDisplay.color === 'yellow'
            ? 'border-yellow-500/30 bg-yellow-500/10'
            : 'border-green-500/20 bg-green-500/5'
        }`}>
          <div className="flex items-center gap-3 min-w-0">
            {/* Dot indicator */}
            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              quotaDisplay.color === 'red' ? 'bg-red-400' :
              quotaDisplay.color === 'yellow' ? 'bg-yellow-400' :
              'bg-green-400'
            }`} />

            <div className="min-w-0">
              <p className={`text-sm font-semibold truncate ${
                quotaDisplay.color === 'red' ? 'text-red-300' :
                quotaDisplay.color === 'yellow' ? 'text-yellow-300' :
                'text-green-300'
              }`}>
                {quotaDisplay.label}
              </p>
              {quotaDisplay.sub && (
                <p className="text-xs text-white/40 mt-0.5">{quotaDisplay.sub}</p>
              )}
            </div>
          </div>

          {/* Progress bar for limited users */}
          {quotaDisplay.type === 'limited' && (
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    quotaDisplay.color === 'yellow' ? 'bg-yellow-400' : 'bg-green-400'
                  }`}
                  style={{ width: `${(quotaDisplay.remaining / quotaDisplay.total) * 100}%` }}
                />
              </div>
              <span className="text-xs text-white/40">{quotaDisplay.remaining}/{quotaDisplay.total}</span>
            </div>
          )}

          {/* Upgrade button for exhausted */}
          {quotaDisplay.type === 'exhausted' && (
            <button
              onClick={() => navigate('/pricing')}
              className="shrink-0 flex items-center gap-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold px-3 py-1.5 rounded-lg text-xs hover:from-yellow-300 hover:to-orange-300 transition-all"
            >
              <Crown className="w-3.5 h-3.5" />
              Upgrade
            </button>
          )}
        </div>
      )}

      {/* ✅ Free sessions exhausted warning */}
      {freeSessionsExhausted && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-white text-sm font-semibold">Free Sessions Exhausted</p>
            <p className="text-gray-400 text-xs mt-1">
              You've used all 5 free lifetime sessions. Upgrade to Basic or Pro to continue using the Interview Copilot.
            </p>
            <button
              onClick={() => navigate('/pricing')}
              className="mt-2 inline-flex items-center gap-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold px-3 py-1.5 rounded-lg text-xs hover:from-yellow-300 hover:to-orange-300 transition-all"
            >
              <Crown className="w-3.5 h-3.5" />
              View Plans
            </button>
          </div>
        </div>
      )}

      {/* Domain Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {domains.map((domain, index) => {
          const IconComponent = domain.icon;

          // Lock conditions:
          // 1. Paid domain + not paid user → locked (PRO badge)
          // 2. Free domain + free sessions exhausted → locked (session exhausted)
          const isLockedByPlan = domain.requiresPaid && !isPaidUser;
          const isLockedByQuota = !domain.requiresPaid && freeSessionsExhausted;
          const isLocked = isLockedByPlan || isLockedByQuota;

          return (
            <button
              key={index}
              onClick={() => handleDomainClick(domain)}
              className={`bg-[#14141b] border border-gray-800 rounded-xl p-5 sm:p-6 text-left transition-all relative ${
                isLocked
                  ? 'opacity-70 hover:opacity-90 cursor-pointer hover:border-yellow-500/40'
                  : 'hover:border-purple-500/50 hover:bg-gray-900/50 cursor-pointer shadow-lg hover:shadow-purple-500/10'
              }`}
            >
              {/* PRO Badge — paid domain locked */}
              {isLockedByPlan && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 rounded-full px-2.5 py-1">
                  <Crown className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-[10px] font-semibold text-yellow-300">PRO</span>
                </div>
              )}

              {/* Sessions Exhausted Badge — General Interview locked */}
              {isLockedByQuota && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-red-500/20 border border-red-500/30 rounded-full px-2.5 py-1">
                  <Lock className="w-3 h-3 text-red-400" />
                  <span className="text-[10px] font-semibold text-red-300">0 left</span>
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
              {isLockedByPlan && (
                <div className="mt-3 flex items-center gap-1.5 text-yellow-400 text-xs">
                  <Lock className="w-3 h-3" />
                  <span className="font-medium">Click to upgrade</span>
                </div>
              )}

              {isLockedByQuota && (
                <div className="mt-3 flex items-center gap-1.5 text-red-400 text-xs">
                  <Lock className="w-3 h-3" />
                  <span className="font-medium">Free sessions used up</span>
                </div>
              )}

              {/* Free session count for General Interview (non-locked) */}
              {!domain.requiresPaid && !isLockedByQuota && quotaDisplay?.type === 'limited' && (
                <div className="mt-3 flex items-center gap-1.5 text-green-400/70 text-xs">
                  <span>{quotaDisplay.remaining} session{quotaDisplay.remaining !== 1 ? 's' : ''} remaining</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Upgrade Banner for non-paid users */}
      {!isPaidUser && (
        <div className="rounded-xl border border-yellow-400/20 bg-gradient-to-r from-yellow-400/5 to-orange-400/5 p-4 flex items-start gap-3">
          <Crown className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white text-sm font-semibold">
              Unlock All Interview Domains
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Upgrade to Basic or Pro to access all interview types and get more sessions.
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

      {/* Current Plan Status */}
      {userProfile && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs">
            <div className={`w-2 h-2 rounded-full ${isPaidUser ? 'bg-green-400' : 'bg-gray-400'}`} />
            <span className="text-white/70">
              Current Plan: <span className="font-semibold text-white capitalize">
                {currentPlan || "free"}
              </span>
            </span>
          </div>
        </div>
      )}

      {/* Pagination Controls — keep as-is */}
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