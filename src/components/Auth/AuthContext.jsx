// frontend/src/components/Auth/AuthContext.jsx

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { supabase } from "../../database/supabaseClient";

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(null);

  // initialCheckDone — sirf pehli baar session check ke liye
  // Tab switch pe yeh dobara true nahi hota → no full screen flash
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  const [subscriptionStatus,  setSubscriptionStatus]  = useState(null);
  const [daysRemaining,       setDaysRemaining]        = useState(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);

  // Subscription ko background mein fetch karo — UI block mat karo
  const fetchSubscriptionStatus = async (accessToken, isBackground = false) => {
    if (!accessToken) return;
    try {
      // Only show loading state if it's NOT a background refresh (e.g. initial login)
      if (!isBackground) setSubscriptionLoading(true);

      const baseUrl = import.meta.env.VITE_API_URL;
      const url     = `${baseUrl}/api/subscription/status`;

      const res = await fetch(url, {
        method:  "GET",
        headers: {
          Authorization:  `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });


      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        // const text = await res.text(); // Unused
        throw new Error("Non-JSON response from server");
      }

      const data = await res.json();

      setSubscriptionStatus(data.subscription_status);
      setDaysRemaining(data.days_remaining);

    } catch (err) {
      // Don't reset status on background refresh failure
      // (keeps last known good value)
    } finally {
      if (!isBackground) setSubscriptionLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // INITIAL SESSION CHECK — sirf ek baar
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.access_token) {
        // Initial check: show loading
        fetchSubscriptionStatus(session.access_token, false);
      }
      // ✅ Ab children render ho sakte hain
      setInitialCheckDone(true);
    });

    // ─────────────────────────────────────────────────────────
    // AUTH STATE CHANGE — tab switch, token refresh, login/logout
    // Yahan loading SET NAHI karte — warna tab switch pe flash hoga
    // ─────────────────────────────────────────────────────────
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {

        // Token refresh → sirf subscription background mein update karo
        if (_event === "TOKEN_REFRESHED") {
          if (session?.access_token) {
            // Token refresh: BACKGROUND update (no loading spinner)
            fetchSubscriptionStatus(session.access_token, true);
          }
          return;
        }

        setUser(session?.user ?? null);

        if (session?.access_token) {
            // Auth change (login/tab switch?):
            // If we have a user, it might be a re-focus. Let's do background for least disruption?
            // Or if it IS a login event, we might want loading.
            // Safe bet: background=true to avoid flicker if it's just a session recovery/switch
            fetchSubscriptionStatus(session.access_token, true);
        } else {
          // Logout
          setSubscriptionStatus(null);
          setDaysRemaining(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ─────────────────────────────────────────────────────────────
  // DERIVED
  // ─────────────────────────────────────────────────────────────
  const isPaidUser =
    subscriptionStatus === "active" || subscriptionStatus === "expiring";

  const value = {
    user,
    loading: !initialCheckDone,   // true sirf pehle check tak
    subscriptionStatus,
    daysRemaining,
    subscriptionLoading,
    isPaidUser,

    signUp: (email, password, fullName) =>
      supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      }),

    signIn: (email, password) =>
      supabase.auth.signInWithPassword({ email, password }),

    signOut: async () => {
      // ✅ Clear KB selection on logout
      if (user?.id) {
        localStorage.removeItem(`selectedKBIds_${user.id}`);
      }
      setSubscriptionStatus(null);
      setDaysRemaining(null);
      return supabase.auth.signOut();
    },

    refreshSubscription: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        await fetchSubscriptionStatus(session.access_token, false);
      }
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {/* ✅ Children hamesha render hote hain initial check ke baad */}
      {/* Tab switch pe koi flash/blank nahi hoga */}
      {initialCheckDone ? children : (
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </AuthContext.Provider>
  );
};





