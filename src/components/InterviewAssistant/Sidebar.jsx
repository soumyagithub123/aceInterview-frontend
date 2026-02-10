// responsive

import React from "react";
import {
  Sparkles,
  MessageSquare,
  Users,
  BookOpen,
  HelpCircle,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { useAppData } from "../../context/AppDataContext";


export default function Sidebar({ currentPage, onNavigate }) {
  const { user } = useAuth();
  const { userProfile } = useAppData();
  const navigate = useNavigate();


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

  const plan = userProfile?.subscription_tier || "free";
  const planColor = 
    plan === "pro" ? "text-yellow-400" : 
    plan === "basic" ? "text-green-400" : 
    "text-gray-500";


  const NavButton = ({ icon: Icon, label, page }) => {
    const isActive = currentPage === page;

    return (
      <button
        onClick={() => onNavigate(page)}
        className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 rounded-lg text-sm font-medium transition-all
          ${
            isActive
              ? "bg-[#1D1E22] text-white border border-purple-500/30"
              : "text-gray-400 hover:text-white hover:bg-[#1A1B1F]"
          }`}
      >
        <Icon className={`w-5 h-5 ${isActive ? "text-purple-300" : "text-gray-500"}`} />
        <span className="hidden sm:inline">{label}</span>
      </button>
    );
  };

  return (
    <aside
      className="
        h-screen bg-[#141518] border-r border-[#1F2024]
        flex flex-col sticky top-0
        w-[72px] sm:w-[220px] lg:w-[260px]
      "
    >
      {/* Header Logo */}
      <div className="px-4 sm:px-5 py-5 border-b border-[#1F2024]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#1D1E22] rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-purple-300" />
          </div>
          <span className="hidden sm:inline text-[17px] font-semibold text-white">
            InterviewAI
          </span>
        </div>
      </div>

      {/* User Profile */}
      <div className="px-4 sm:px-5 py-4 border-b border-[#1F2024]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1D1E22] flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {getInitials()}
            </span>
          </div>
          <div className="hidden sm:block min-w-0">
            <p className="text-white text-sm font-medium truncate">
              {getUserName()}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] mt-0.5">
               <span className={`font-semibold capitalize ${planColor}`}>
                 {plan} Plan
               </span>
               <span className="text-gray-600">•</span>
               <button 
                 onClick={() => navigate("/pricing")}
                 className="text-gray-400 hover:text-white transition-colors hover:underline"
               >
                 Manage
               </button>
            </div>

          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 sm:px-4 py-4 overflow-y-auto">
        {/* Interview */}
        <div className="mb-6">
          <p className="hidden sm:block text-gray-500 text-[11px] font-semibold uppercase mb-2 px-1">
            INTERVIEW
          </p>

          <NavButton icon={Sparkles} label="AI Interview Copilot" page="launchpad" />
          <NavButton icon={MessageSquare} label="AI Mock" page="ai-mock" />
          <NavButton icon={Users} label="Personas" page="personas" />
        </div>

        {/* Prepare */}
        <div>
          <p className="hidden sm:block text-gray-500 text-[11px] font-semibold uppercase mb-2 px-1">
            PREPARE
          </p>

          <NavButton icon={BookOpen} label="Knowledge Base" page="knowledge-base" />
          <NavButton icon={HelpCircle} label="Questions" page="questions" />
          <NavButton icon={User} label="Train Copilot" page="train" />
        </div>
      </nav>
    </aside>
  );
}

