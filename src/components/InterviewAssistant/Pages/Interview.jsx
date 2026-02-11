// import React, { useEffect, useMemo } from "react";
// import { useAuth } from "../../Auth/AuthContext";
// import { useNavigate, useLocation } from "react-router-dom";

// import Sidebar from "../Sidebar";
// import CopilotLaunchpad from "../Copilot/CopilotLaunchpad";
// import PersonasPage from "../Persona/PersonasPage";

// export default function Interview({ initialPage, mode }) {
//   const { user, loading } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // 🔑 PAGE + MODE DETECTION
//   const { currentPage, isMockMode } = useMemo(() => {
//     // 🔥 MOCK INTERVIEW (NEW ROUTE)
//     if (location.pathname === "/mock-interview") {
//       return {
//         currentPage: "ai-mock",
//         isMockMode: true,
//       };
//     }

//     if (location.pathname.includes("/ai-mock"))
//       return { currentPage: "ai-mock", isMockMode: false }; // 🔓 Enable navigation
//     if (location.pathname.includes("/knowledge-base"))
//       return { currentPage: "knowledge-base", isMockMode: false };
//     if (location.pathname.includes("/personas"))
//       return { currentPage: "personas", isMockMode: false };
//     if (location.pathname.includes("/questions"))
//       return { currentPage: "questions", isMockMode: false };
//     if (location.pathname.includes("/train"))
//       return { currentPage: "train", isMockMode: false };

//     return {
//       currentPage: initialPage || "launchpad",
//       isMockMode: mode === "mock" && location.pathname === "/mock-interview",
//     };
//   }, [location.pathname, initialPage, mode]);

//   // 🔐 Redirect if not authenticated
//   useEffect(() => {
//     if (!loading && !user) {
//       navigate("/sign-in");
//     }
//   }, [user, loading, navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
//         <div className="text-white">Loading...</div>
//       </div>
//     );
//   }

//   if (!user) return null;

//   // 🔀 SIDEBAR NAV (mock mode locks navigation)
//   const handleNavigate = (page) => {
//     if (isMockMode) return; // 🔒 lock sidebar in mock interview

//     if (page === "launchpad") navigate("/interview");
//     else navigate(`/interview/${page}`);
//   };

//   return (
//     <div className="min-h-screen bg-[#0a0a0f] flex">
//       <Sidebar
//         currentPage={currentPage}
//         onNavigate={handleNavigate}
//         disabled={isMockMode}   // optional UI disable
//       />

//       <main className="flex-1 overflow-auto">
//         {/* LAUNCHPAD */}
//         {currentPage === "launchpad" && (
//           <CopilotLaunchpad mode="interview" />
//         )}

//         {/* 🔥 AI MOCK / MOCK INTERVIEW */}
//         {currentPage === "ai-mock" && (
//           <CopilotLaunchpad mode="mock" />
//         )}

//         {/* PERSONAS */}
//         {currentPage === "personas" && (
//           <PersonasPage mode="persona" />
//         )}

//         {/* KNOWLEDGE BASE */}
//         {currentPage === "knowledge-base" && (
//           <PersonasPage mode="knowledge-base" />
//         )}

//         {/* COMING SOON */}
//         {currentPage === "questions" && (
//           <div className="p-8 text-gray-400">Questions - Coming Soon</div>
//         )}

//         {currentPage === "train" && (
//           <div className="p-8 text-gray-400">Train Copilot - Coming Soon</div>
//         )}
//       </main>
//     </div>
//   );
// }







import React, { useEffect, useMemo } from "react";
import { useAuth } from "../../Auth/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

import Sidebar from "../Sidebar";
import CopilotLaunchpad from "../Copilot/CopilotLaunchpad";
import PersonasPage from "../Persona/PersonasPage";

// 🔔 Subscription popup — correct path: src/hooks/
import { useSubscriptionPopup } from "../hooks/useSubscriptionPopup";
import ExpiringPopup from "../../Payment/ExpiringPopup";

export default function Interview({ initialPage, mode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 🔔 Popup — /interview pe aate hi once per session show hoga
  const { showPopup, popupStatus, popupDays, closePopup } = useSubscriptionPopup();

  // 📍 PAGE + MODE DETECTION
  const { currentPage, isMockMode } = useMemo(() => {
    if (location.pathname === "/mock-interview") {
      return { currentPage: "ai-mock", isMockMode: true };
    }
    if (location.pathname.includes("/ai-mock"))
      return { currentPage: "ai-mock", isMockMode: false };
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

  // ProtectedRoute handles loading — yahan spinner nahi
  if (!user) return null;

  // 📲 SIDEBAR NAV
  const handleNavigate = (page) => {
    if (isMockMode) return;
    if (page === "launchpad") navigate("/interview");
    else navigate(`/interview/${page}`);
  };

  return (
    <>
      {/* 🔔 Subscription Popup */}
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
          {currentPage === "launchpad" && <CopilotLaunchpad mode="interview" />}
          {currentPage === "ai-mock"   && <CopilotLaunchpad mode="mock" />}
          {currentPage === "personas"  && <PersonasPage mode="persona" />}
          {currentPage === "knowledge-base" && <PersonasPage mode="knowledge-base" />}
          {currentPage === "questions" && <div className="p-8 text-gray-400">Questions - Coming Soon</div>}
          {currentPage === "train"     && <div className="p-8 text-gray-400">Train Copilot - Coming Soon</div>}
        </main>
      </div>
    </>
  );
}