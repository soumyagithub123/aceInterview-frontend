// src/components/Interview/Interview.jsx

import React, { useEffect, useMemo } from "react";
import { useAuth }       from "../../Auth/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

import Sidebar           from "../Sidebar";
import CopilotLaunchpad  from "../Copilot/CopilotLaunchpad";
import PersonasPage      from "../Persona/PersonasPage";
import KnowledgeBasePage from "../KnowledgeBase/KnowledgeBasePage"; // ← new
import QuestionsPage from "../questions/QuestionsPage";
import TrainCopilotPage from "../train/TrainCopilotPage";

// Subscription popup
import { useSubscriptionPopup } from "../hooks/useSubscriptionPopup";
import ExpiringPopup from "../../Payment/ExpiringPopup";

// ═══════════════════════════════════════════════════════
export default function Interview({ initialPage, mode }) {
  const { user, loading } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  const { showPopup, popupStatus, popupDays, closePopup } = useSubscriptionPopup();

  // ── Page detection ──────────────────────────────────
  const { currentPage, isMockMode } = useMemo(() => {
    const path = location.pathname;

    if (path === "/mock-interview")
      return { currentPage: "ai-mock",        isMockMode: true  };
    if (path.includes("/ai-mock"))
      return { currentPage: "ai-mock",        isMockMode: false };
    if (path.includes("/knowledge-base"))
      return { currentPage: "knowledge-base", isMockMode: false };
    if (path.includes("/personas"))
      return { currentPage: "personas",       isMockMode: false };
    if (path.includes("/questions"))
      return { currentPage: "questions",      isMockMode: false };
    if (path.includes("/train"))
      return { currentPage: "train",          isMockMode: false };

    return {
      currentPage: initialPage || "launchpad",
      isMockMode:  mode === "mock" && path === "/mock-interview",
    };
  }, [location.pathname, initialPage, mode]);

  // ── Auth redirect ────────────────────────────────────
  useEffect(() => {
    if (!loading && !user) navigate("/sign-in");
  }, [user, loading, navigate]);

  if (!user) return null;

  // ── Sidebar nav ──────────────────────────────────────
  const handleNavigate = (page) => {
    if (isMockMode) return;
    if (page === "launchpad") navigate("/interview");
    else navigate(`/interview/${page}`);
  };

  // ════════════════════════════════════════════════════
  return (
    <>
      {showPopup && (
        <ExpiringPopup
          status={popupStatus}
          daysRemaining={popupDays}
          onClose={closePopup}
        />
      )}

      <div className="min-h-screen bg-[#0a0a0f] flex">
        <Sidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          disabled={isMockMode}
        />

        <main className="flex-1 overflow-auto">
          {currentPage === "launchpad"      && <CopilotLaunchpad mode="interview" />}
          {currentPage === "ai-mock"        && <CopilotLaunchpad mode="mock" />}
          {currentPage === "personas"       && <PersonasPage />}
          {currentPage === "knowledge-base" && <KnowledgeBasePage />}  {/* ← standalone now */}
          {currentPage === "questions" && <QuestionsPage />}
          {currentPage === "train" && <TrainCopilotPage />}
        </main>
      </div>
    </>
  );
}





