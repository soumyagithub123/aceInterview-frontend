// import React from "react";
// import {
//   Sparkles,
//   MessageSquare,
//   Users,
//   Briefcase,
//   HelpCircle,
//   User,
// } from "lucide-react";
// import { useAuth } from "../Auth/AuthContext";

// export default function Sidebar({ currentPage, onNavigate }) {
//   const { user } = useAuth();

//   const getInitials = () => {
//     if (user?.user_metadata?.full_name) {
//       const parts = user.user_metadata.full_name.trim().split(" ");
//       return parts.length >= 2
//         ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
//         : parts[0][0].toUpperCase();
//     }
//     return user?.email?.[0]?.toUpperCase() || "U";
//   };

//   const getUserName = () => {
//     if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
//     if (user?.email) return user.email;
//     return "User";
//   };

//   const NavButton = ({ icon: Icon, label, page }) => {
//     const isActive = currentPage === page;

//     return (
//       <button
//         onClick={() => onNavigate(page)}
//         className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
//           isActive
//             ? "bg-white/10 text-white border border-primary-500/30"
//             : "text-surface-400 hover:text-white hover:bg-white/5"
//         }`}
//       >
//         <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-primary-300" : "text-surface-500"}`} />
//         {label}
//       </button>
//     );
//   };

//   return (
//     <aside className="w-[260px] min-w-[260px] h-screen bg-[#0f1115] border-r border-white/5 flex flex-col sticky top-0">
//       <div className="px-5 py-6 border-b border-white/5">
//         <div className="flex items-center gap-2">
//           <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
//             <Sparkles className="w-5 h-5 text-white" />
//           </div>
//           <span className="text-lg font-semibold text-surface-300">Interview</span>
//           <span className="text-lg font-semibold text-primary-400">AI</span>
//         </div>
//       </div>

//       <div className="px-5 py-4 border-b border-white/5">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
//             <span className="text-white font-semibold text-sm">{getInitials()}</span>
//           </div>
//           <div className="min-w-0">
//             <p className="text-white text-sm font-medium truncate">
//               {getUserName()}
//             </p>
//             <p className="text-surface-500 text-xs">
//               Free Plan • Manage
//             </p>
//           </div>
//         </div>
//       </div>

//       <nav className="flex-1 px-4 py-5 overflow-y-auto">
//         <div className="mb-6">
//           <p className="text-surface-500 text-xs font-semibold uppercase tracking-wider mb-3 px-1">
//             Interview
//           </p>
//           <div className="space-y-1">
//             <NavButton icon={Sparkles} label="AI Interview Copilot" page="launchpad" />
//             <NavButton icon={MessageSquare} label="AI Mock" page="ai-mock" />
//             <NavButton icon={Users} label="Personas" page="personas" />
//           </div>
//         </div>

//         <div>
//           <p className="text-surface-500 text-xs font-semibold uppercase tracking-wider mb-3 px-1">
//             Prepare
//           </p>
//           <div className="space-y-1">
//             <NavButton icon={Briefcase} label="Jobs" page="jobs" />
//             <NavButton icon={HelpCircle} label="Questions" page="questions" />
//             <NavButton icon={User} label="Train Copilot" page="train" />
//           </div>
//         </div>
//       </nav>
//     </aside>
//   );
// }

import React from "react";
import {
  Sparkles,
  MessageSquare,
  Users,
  Briefcase,
  HelpCircle,
  User,
} from "lucide-react";
import { useAuth } from "../Auth/AuthContext";

export default function Sidebar({ currentPage, onNavigate }) {
  const { user } = useAuth();

  const getInitials = () => {
    if (user?.user_metadata?.full_name) {
      const parts = user.user_metadata.full_name.trim().split(" ");
      return parts.length >= 2
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : parts[0][0].toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || "U";
  };

  const getUserName = () => {
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
    if (user?.email) return user.email;
    return "User";
  };

  const NavButton = ({ icon: Icon, label, page }) => {
    const isActive = currentPage === page;

    return (
      <button
        onClick={() => onNavigate(page)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`}
      >
        <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-indigo-600" : "text-gray-500"}`} />
        {label}
      </button>
    );
  };

  return (
    <aside className="w-[260px] min-w-[260px] h-screen bg-white border-r border-gray-200 flex flex-col sticky top-0 shadow-sm">
      <div className="px-5 py-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900">Interview</span>
          <span className="text-lg font-semibold text-indigo-600">AI</span>
        </div>
      </div>

      <div className="px-5 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center shadow-sm">
            <span className="text-indigo-700 font-semibold text-sm">{getInitials()}</span>
          </div>
          <div className="min-w-0">
            <p className="text-gray-900 text-sm font-medium truncate">
              {getUserName()}
            </p>
            <p className="text-gray-500 text-xs">
              Free Plan • Manage
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-5 overflow-y-auto">
        <div className="mb-6">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3 px-1">
            Interview
          </p>
          <div className="space-y-1">
            <NavButton icon={Sparkles} label="AI Interview Copilot" page="launchpad" />
            <NavButton icon={MessageSquare} label="AI Mock" page="ai-mock" />
            <NavButton icon={Users} label="Personas" page="personas" />
          </div>
        </div>

        <div>
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3 px-1">
            Prepare
          </p>
          <div className="space-y-1">
            <NavButton icon={Briefcase} label="Jobs" page="jobs" />
            <NavButton icon={HelpCircle} label="Questions" page="questions" />
            <NavButton icon={User} label="Train Copilot" page="train" />
          </div>
        </div>
      </nav>
    </aside>
  );
}
