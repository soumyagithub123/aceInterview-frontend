import React, { useEffect, useMemo } from "react";
import { useAuth } from "../../Auth/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

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

        {/* QUESTIONS - COMING SOON */}
        {currentPage === "questions" && (
          <div className="flex items-center justify-center min-h-screen p-8">
            <div className="max-w-xl w-full">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-10 shadow-xl">
                <div className="text-center space-y-6">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <svg
                      className="w-8 h-8 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <h2 className="text-3xl font-semibold text-white">
                      Question Bank
                    </h2>
                    <p className="text-slate-400">
                      Curate and organize your interview preparation questions
                    </p>
                  </div>

                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                    <span className="text-sm font-medium text-purple-300">
                      Coming Soon
                    </span>
                  </div>

                  {/* Description */}
                  <div className="pt-2">
                    <p className="text-slate-300 leading-relaxed">
                      Create custom question sets tailored to specific roles,
                      companies, and difficulty levels. Organize your
                      preparation materials and track your practice progress
                      efficiently.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TRAIN COPILOT - COMING SOON */}
        {currentPage === "train" && (
          <div className="flex items-center justify-center min-h-screen p-8">
            <div className="max-w-xl w-full">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-10 shadow-xl">
                <div className="text-center space-y-6">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <svg
                      className="w-8 h-8 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <h2 className="text-3xl font-semibold text-white">
                      Train Your Copilot
                    </h2>
                    <p className="text-slate-400">
                      Customize your AI assistant for personalized interview
                      preparation
                    </p>
                  </div>

                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                    <span className="text-sm font-medium text-blue-300">
                      Coming Soon
                    </span>
                  </div>

                  {/* Description */}
                  <div className="pt-2">
                    <p className="text-slate-300 leading-relaxed">
                      Fine-tune your AI copilot with industry-specific
                      knowledge, custom evaluation criteria, and personalized
                      feedback patterns to create your ideal interview training
                      companion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
