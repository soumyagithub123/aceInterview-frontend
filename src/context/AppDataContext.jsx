// / src/context/AppDataContext.jsx

// import React, { createContext, useContext, useState, useEffect } from "react";

// // Services
// import { settingsService } from "../services/settingsService";
// import { responseStyleService } from "../services/responseStyleService";
// import { getUserPersonas } from "../database/personaService";
// import { getUserProfile } from "../database/userService";

// // Auth
// import { useAuth } from "../components/Auth/AuthContext";

// const AppDataContext = createContext();
// export const useAppData = () => useContext(AppDataContext);

// export function AppDataProvider({ children }) {
//   const { user, subscriptionStatus, subscriptionTier, quota } = useAuth();

//   const [loading, setLoading] = useState(true);
//   const [settings, setSettings] = useState(null);
//   const [styles, setStyles] = useState([]);
//   const [personas, setPersonas] = useState([]);
//   const [userProfile, setUserProfile] = useState(null);
//   const [error, setError] = useState(null);

//   // ✅ isPaidUser - Derived from AuthContext subscription status
//   const isPaidUser =
//     subscriptionStatus === "active" || subscriptionStatus === "expiring";

//   // Track previous user to avoid full reload on token refresh
//   const lastUserIdRef = React.useRef(null);

//   useEffect(() => {
//     if (user?.id) {
//       // Only reload if user ID actually changed
//       if (user.id !== lastUserIdRef.current) {
//         lastUserIdRef.current = user.id;
//         preloadAllData(true); // showLoading=true for new user
//       } else {
//         // Same user (e.g. token refresh) — do nothing or silent update
//         // Optional: preloadAllData(false) if you want silent background refresh
//       }
//     } else {
//       // No user
//       lastUserIdRef.current = null;
//       setSettings(null);
//       setStyles([]);
//       setPersonas([]);
//       setUserProfile(null);
//       setLoading(false);
//     }
//   }, [user?.id]); // ✅ Dependency only on ID, not full user object

//   // =============================
//   // 🔥 MASTER LOADER
//   // =============================
//   const preloadAllData = async (showLoading = true) => {
//     if (showLoading) setLoading(true);
//     setError(null);

//     try {
//       const profileRes = await getUserProfile();
//       if (profileRes.success) setUserProfile(profileRes.data);

//       const userSettings = await settingsService.loadSettingsWithFallback(user.id);
//       setSettings(userSettings);

//       const styleList = await responseStyleService.getAllStyles(user.id);
//       setStyles(styleList);

//       const personaRes = await getUserPersonas();
//       if (personaRes.success) {
//         setPersonas(personaRes.data);
//       } else {
//         setError(personaRes.error || "Failed to load personas");
//       }
//     } catch (err) {
//       console.error("GLOBAL PRELOAD ERROR:", err);
//       setError("Failed to load app data");
//     }

//     setLoading(false);
//   };

//   // =============================
//   // ✅ SIMPLIFIED ACCESS CHECKS (NO QUOTA)
//   // =============================
//   const canUseCopilot = () => {
//     // ✅ Unlimited for all paid users
//     return isPaidUser;
//   };

//   const canUseMockInterview = () => {
//     // ✅ Unlimited for all paid users
//     return isPaidUser;
//   };

//   const getQuotaMessage = (type) => {
//     // ✅ Show unlimited for paid users
//     if (isPaidUser) return "Unlimited";
//     if (subscriptionStatus === "expired") return "Plan Expired";
//     return "Free Plan";
//   };

//   return (
//     <AppDataContext.Provider
//       value={{
//         loading,
//         error,
//         settings,
//         styles,
//         personas,
//         userProfile,
//         isPaidUser,
//         currentPlan: isPaidUser ? (userProfile?.subscription_tier || "free") : "free",
//         quota,             // ✅ Session quota info from backend
//         subscriptionTier,
//         canUseCopilot,
//         canUseMockInterview,
//         getQuotaMessage,
//         reloadAll: preloadAllData,
//       }}
//     >
//       {children}
//     </AppDataContext.Provider>
//   );
// }











// src/context/AppDataContext.jsx
// ✅ UPDATED: Session quota ab AuthContext se aata hai (no duplicate fetch)
// Purana code preserve kiya hai comments mein

import React, { createContext, useContext, useState, useEffect } from "react";

// Services
import { settingsService } from "../services/settingsService";
import { responseStyleService } from "../services/responseStyleService";
import { getUserPersonas } from "../database/personaService";
import { getUserProfile } from "../database/userService";

// Auth
import { useAuth } from "../components/Auth/AuthContext";

const AppDataContext = createContext();
export const useAppData = () => useContext(AppDataContext);

export function AppDataProvider({ children }) {
  // ✅ sessionQuota aur refreshSessionQuota ab AuthContext se aate hain
  const { user, subscriptionStatus, subscriptionTier, sessionQuota, quotaLoading, refreshSessionQuota } = useAuth();

  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(null);
  const [styles, setStyles] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  // ✅ isPaidUser - Derived from AuthContext subscription status
  const isPaidUser =
    subscriptionStatus === "active" || subscriptionStatus === "expiring";

  // Track previous user to avoid full reload on token refresh
  const lastUserIdRef = React.useRef(null);

  useEffect(() => {
    if (user?.id) {
      if (user.id !== lastUserIdRef.current) {
        lastUserIdRef.current = user.id;
        preloadAllData(true);
      }
    } else {
      lastUserIdRef.current = null;
      setSettings(null);
      setStyles([]);
      setPersonas([]);
      setUserProfile(null);
      setLoading(false);
    }
  }, [user?.id]);

  // =============================
  // 🔥 MASTER LOADER
  // =============================
  const preloadAllData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);

    try {
      const profileRes = await getUserProfile();
      if (profileRes.success) setUserProfile(profileRes.data);

      const userSettings = await settingsService.loadSettingsWithFallback(user.id);
      setSettings(userSettings);

      const styleList = await responseStyleService.getAllStyles(user.id);
      setStyles(styleList);

      const personaRes = await getUserPersonas();
      if (personaRes.success) {
        setPersonas(personaRes.data);
      } else {
        setError(personaRes.error || "Failed to load personas");
      }
    } catch (err) {
      console.error("GLOBAL PRELOAD ERROR:", err);
      setError("Failed to load app data");
    }

    setLoading(false);
  };

  // =============================
  // ✅ ACCESS CHECKS
  // =============================
  const canUseCopilot = () => isPaidUser;
  const canUseMockInterview = () => isPaidUser;

  // ✅ NEW: Session quota display helper
  // Returns readable string like "7 / 10" or "Unlimited"
  const getSessionQuotaDisplay = () => {
    if (!sessionQuota) return null;
    if (sessionQuota.is_unlimited) return "Unlimited";
    return {
      used: sessionQuota.sessions_used,
      remaining: sessionQuota.sessions_remaining,
      total: sessionQuota.session_limit,
      durationMins: sessionQuota.duration_limit_mins,
      plan: sessionQuota.plan_type,
    };
  };

  const getQuotaMessage = (type) => {
    if (isPaidUser) return "Unlimited";
    if (subscriptionStatus === "expired") return "Plan Expired";
    return "Free Plan";
  };

  return (
    <AppDataContext.Provider
      value={{
        loading,
        error,
        settings,
        styles,
        personas,
        userProfile,
        isPaidUser,
        currentPlan: isPaidUser ? (userProfile?.subscription_tier || "free") : "free",

        // ✅ Session quota (from AuthContext, no extra fetch)
        sessionQuota,
        quotaLoading,
        getSessionQuotaDisplay,
        refreshSessionQuota,   // call this after session ends to refresh count

        subscriptionTier,
        canUseCopilot,
        canUseMockInterview,
        getQuotaMessage,
        reloadAll: preloadAllData,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}