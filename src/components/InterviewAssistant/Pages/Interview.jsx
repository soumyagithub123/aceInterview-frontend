import React, { useEffect, useMemo } from "react";
import { useAuth } from "../../Auth/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

import Sidebar from "../Sidebar";
import CopilotLaunchpad from "../Copilot/CopilotLaunchpad";
import PersonasPage from "../Persona/PersonasPage";

export default function Interview({ initialPage }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 🔑 PAGE DETECTION (URL FIRST, FALLBACK initialPage)
  const currentPage = useMemo(() => {
    if (location.pathname.includes("/ai-mock")) return "ai-mock";
    if (location.pathname.includes("/knowledge-base")) return "knowledge-base";
    if (location.pathname.includes("/personas")) return "personas";
    if (location.pathname.includes("/questions")) return "questions";
    if (location.pathname.includes("/train")) return "train";

    return initialPage || "launchpad";
  }, [location.pathname, initialPage]);

  // 🔐 Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/sign-in");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  // 🔀 SIDEBAR NAV
  const handleNavigate = (page) => {
    if (page === "launchpad") navigate("/interview");
    else navigate(`/interview/${page}`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1 overflow-auto">
        {/* LAUNCHPAD */}
        {currentPage === "launchpad" && (
          <CopilotLaunchpad mode="interview" />
        )}

        {/* AI MOCK */}
        {currentPage === "ai-mock" && (
          <CopilotLaunchpad mode="mock" />
        )}

        {/* PERSONAS */}
        {currentPage === "personas" && (
          <PersonasPage mode="persona" />
        )}

        {/* KNOWLEDGE BASE */}
        {currentPage === "knowledge-base" && (
          <PersonasPage mode="knowledge-base" />
        )}

        {/* COMING SOON */}
        {currentPage === "questions" && (
          <div className="p-8 text-gray-400">Questions - Coming Soon</div>
        )}

        {currentPage === "train" && (
          <div className="p-8 text-gray-400">Train Copilot - Coming Soon</div>
        )}
      </main>
    </div>
  );
}
