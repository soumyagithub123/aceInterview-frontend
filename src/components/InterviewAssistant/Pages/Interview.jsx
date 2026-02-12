import React, { useEffect, useMemo } from "react";
import { useAuth } from "../../Auth/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import QuestionsPage from "../Question/QuestionsPage";
import TrainCopilotPage from "../Train/TrainCopilotPage";
import Sidebar from "../Sidebar";
import CopilotLaunchpad from "../Copilot/CopilotLaunchpad";
import PersonasPage from "../Persona/PersonasPage";

export default function Interview({ initialPage, mode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 🔑 PAGE + MODE DETECTION
  const { currentPage, isMockMode } = useMemo(() => {
    // 🔥 MOCK INTERVIEW (NEW ROUTE)
    if (location.pathname === "/mock-interview") {
      return {
        currentPage: "ai-mock",
        isMockMode: true,
      };
    }

    if (location.pathname.includes("/ai-mock"))
      return { currentPage: "ai-mock", isMockMode: false }; // 🔓 Enable navigation
    if (location.pathname.includes("/knowledge-base"))
      return { currentPage: "knowledge-base", isMockMode: false };
    if (location.pathname.includes("/personas"))
      return { currentPage: "personas", isMockMode: false };
    if (location.pathname.includes("/questions"))
      return { currentPage: "questions", isMockMode: false };
    if (location.pathname.includes("/train"))
      return { currentPage: "train", isMockMode: false };

    return {
      currentPage: initialPage || "launchpad",
      isMockMode: mode === "mock" && location.pathname === "/mock-interview",
    };
  }, [location.pathname, initialPage, mode]);

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

  // 🔀 SIDEBAR NAV (mock mode locks navigation)
  const handleNavigate = (page) => {
    if (isMockMode) return; // 🔒 lock sidebar in mock interview

    if (page === "launchpad") navigate("/interview");
    else navigate(`/interview/${page}`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        disabled={isMockMode} // optional UI disable
      />

      <main className="flex-1 overflow-auto">
        {/* LAUNCHPAD */}
        {currentPage === "launchpad" && <CopilotLaunchpad mode="interview" />}

        {/* 🔥 AI MOCK / MOCK INTERVIEW */}
        {currentPage === "ai-mock" && <CopilotLaunchpad mode="mock" />}

        {/* PERSONAS */}
        {currentPage === "personas" && <PersonasPage mode="persona" />}

        {/* KNOWLEDGE BASE */}
        {currentPage === "knowledge-base" && (
          <PersonasPage mode="knowledge-base" />
        )}
        {/* QUESTIONS */}
        {currentPage === "questions" && <QuestionsPage />}

        {/* TRAIN COPILOT */}
        {currentPage === "train" && <TrainCopilotPage />}
      </main>
    </div>
  );
}
