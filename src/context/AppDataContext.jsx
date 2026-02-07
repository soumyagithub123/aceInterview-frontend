// src/context/AppDataContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";

// Services
import { settingsService } from "../services/settingsService";
import { responseStyleService } from "../services/responseStyleService";
import { getUserPersonas } from "../database/personaService";
import { getUserProfile, getUserQuota } from "../database/userService";

// Auth
import { useAuth } from "../components/Auth/AuthContext";

// Create context
const AppDataContext = createContext();
export const useAppData = () => useContext(AppDataContext);

export function AppDataProvider({ children }) {
  const { user } = useAuth();

  // GLOBAL STATES
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(null);
  const [styles, setStyles] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [quota, setQuota] = useState(null);

  const [error, setError] = useState(null);

  // 💳 DERIVED: Check if user has paid subscription
  const isPaidUser = userProfile?.subscription_tier !== "free" && 
                     userProfile?.subscription_status === "active";

  // AUTO-LOAD WHEN USER LOGS IN
  useEffect(() => {
    if (user) {
      preloadAllData();
    } else {
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
  const preloadAllData = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1️⃣ USER PROFILE (subscription status)
      const profileRes = await getUserProfile();
      if (profileRes.success) {
        setUserProfile(profileRes.data);
      }

      // 2️⃣ USER QUOTA (remaining sessions)
      const quotaRes = await getUserQuota();
      if (quotaRes.success) {
        setQuota(quotaRes.data);
      }

      // 3️⃣ SETTINGS
      const userSettings = await settingsService.loadSettingsWithFallback(user.id);
      setSettings(userSettings);

      // 4️⃣ RESPONSE STYLES
      const styleList = await responseStyleService.getAllStyles(user.id);
      setStyles(styleList);

      // 5️⃣ PERSONAS
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
  // 🎯 QUOTA CHECKS
  // =============================
  const canUseCopilot = () => {
    if (!quota) return false;
    if (quota.copilot.total === -1) return true; // unlimited
    return quota.copilot.remaining > 0;
  };

  const canUseMockInterview = () => {
    if (!quota) return false;
    if (quota.mock_interview.total === -1) return true; // unlimited
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

        // GLOBAL DATA
        settings,
        styles,
        personas,
        userProfile,
        quota,

        // SUBSCRIPTION
        isPaidUser,

        // QUOTA CHECKS
        canUseCopilot,
        canUseMockInterview,
        getQuotaMessage,

        // Reload function
        reloadAll: preloadAllData
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}