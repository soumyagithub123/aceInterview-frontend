// src/context/AppDataContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";

// Services
import { settingsService } from "../services/settingsService";
import { responseStyleService } from "../services/responseStyleService";
import { getUserPersonas } from "../database/personaService";
import { getUserProfile, getUserQuota } from "../database/userService";

// Auth
import { useAuth } from "../components/Auth/AuthContext";

const AppDataContext = createContext();
export const useAppData = () => useContext(AppDataContext);

export function AppDataProvider({ children }) {
  const { user, subscriptionStatus } = useAuth();

  const [loading,     setLoading]     = useState(true);
  const [settings,    setSettings]    = useState(null);
  const [styles,      setStyles]      = useState([]);
  const [personas,    setPersonas]    = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [quota,       setQuota]       = useState(null);
  const [error,       setError]       = useState(null);

  // ✅ isPaidUser — AuthContext ke subscriptionStatus se derive karo
  // DB mein subscription_status "active" hi rehta hai even after expiry
  // isliye hamesha backend ke calculated status pe depend karo
  const isPaidUser =
    subscriptionStatus === "active" || subscriptionStatus === "expiring";

  // Track previous user to avoid full reload on token refresh
  const lastUserIdRef = React.useRef(null);

  useEffect(() => {
    if (user) {
      const isNewUser = user.id !== lastUserIdRef.current;
      lastUserIdRef.current = user.id;
      preloadAllData(isNewUser);
    } else {
      lastUserIdRef.current = null;
      setSettings(null);
      setStyles([]);
      setPersonas([]);
      setUserProfile(null);
      setQuota(null);
      setLoading(false);
    }
  }, [user]);

  // =============================
  // 🔥 MASTER LOADER
  // =============================
  const preloadAllData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);

    try {
      const profileRes = await getUserProfile();
      if (profileRes.success) setUserProfile(profileRes.data);

      const quotaRes = await getUserQuota();
      if (quotaRes.success) setQuota(quotaRes.data);

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
  // QUOTA CHECKS
  // =============================
  const canUseCopilot = () => {
    if (!quota) return false;
    if (quota.copilot.total === -1) return true;
    return quota.copilot.remaining > 0;
  };

  const canUseMockInterview = () => {
    if (!quota) return false;
    if (quota.mock_interview.total === -1) return true;
    return quota.mock_interview.remaining > 0;
  };

  const getQuotaMessage = (type) => {
    if (!quota) return "Loading...";
    const data = type === "copilot" ? quota.copilot : quota.mock_interview;
    if (data.total === -1) return "Unlimited";
    return `${data.remaining}/${data.total} remaining`;
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
        quota,
        isPaidUser,
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