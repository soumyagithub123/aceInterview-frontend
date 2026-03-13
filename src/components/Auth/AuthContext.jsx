// // frontend/src/components/Auth/AuthContext.jsx

// import React, { createContext, useContext, useEffect, useState, useRef } from "react";
// import { supabase } from "../../database/supabaseClient";

// const AuthContext = createContext(null);

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// };

// export const AuthProvider = ({ children }) => {
//   const [user,    setUser]    = useState(null);

//   // initialCheckDone – sirf pehli baar session check ke liye
//   const [initialCheckDone, setInitialCheckDone] = useState(false);

//   const [subscriptionStatus,  setSubscriptionStatus]  = useState(null);
//   const [daysRemaining,       setDaysRemaining]        = useState(null);
//   const [subscriptionLoading, setSubscriptionLoading] = useState(false);

//   // ✅ NEW: Session quota state
//   const [sessionQuota, setSessionQuota] = useState(null);
//   const [quotaLoading, setQuotaLoading] = useState(false);

//   // ─────────────────────────────────────────────────────────────
//   // SUBSCRIPTION FETCH
//   // ─────────────────────────────────────────────────────────────
//   const fetchSubscriptionStatus = async (accessToken, isBackground = false) => {
//     if (!accessToken) return;
//     try {
//       if (!isBackground) setSubscriptionLoading(true);

//       const baseUrl = import.meta.env.VITE_API_URL;
//       const res = await fetch(`${baseUrl}/api/subscription/status`, {
//         method:  "GET",
//         headers: {
//           Authorization:  `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const contentType = res.headers.get("content-type") || "";
//       if (!contentType.includes("application/json")) {
//         throw new Error("Non-JSON response from server");
//       }

//       const data = await res.json();
//       setSubscriptionStatus(data.subscription_status);
//       setDaysRemaining(data.days_remaining);

//     } catch (err) {
//       // Keep last known value on background refresh failure
//     } finally {
//       if (!isBackground) setSubscriptionLoading(false);
//     }
//   };

//   // ─────────────────────────────────────────────────────────────
//   // ✅ NEW: SESSION QUOTA FETCH
//   // Ye quota fetch karta hai backend se (plan_session_rules ke hisaab se)
//   // ─────────────────────────────────────────────────────────────
//   const fetchSessionQuota = async (userId, isBackground = false) => {
//     if (!userId) return;
//     try {
//       if (!isBackground) setQuotaLoading(true);

//       const baseUrl = import.meta.env.VITE_API_URL;
//       const res = await fetch(`${baseUrl}/session/quota/${userId}`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       });

//       if (!res.ok) {
//         console.warn("[AuthContext] Quota fetch failed:", res.status);
//         return;
//       }

//       const data = await res.json();
//       setSessionQuota(data);
//       console.log("[AuthContext] Session quota loaded:", data);

//     } catch (err) {
//       console.warn("[AuthContext] Quota fetch error:", err.message);
//       // Don't reset quota on error, keep last known value
//     } finally {
//       if (!isBackground) setQuotaLoading(false);
//     }
//   };

//   // ─────────────────────────────────────────────────────────────
//   // INITIAL SESSION CHECK – sirf ek baar
//   // ─────────────────────────────────────────────────────────────
//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setUser(session?.user ?? null);
//       if (session?.access_token) {
//         fetchSubscriptionStatus(session.access_token, false);
//       }
//       if (session?.user?.id) {
//         fetchSessionQuota(session.user.id, false);
//       }
//       setInitialCheckDone(true);
//     });

//     // AUTH STATE CHANGE
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       (_event, session) => {

//         if (_event === "TOKEN_REFRESHED") {
//           if (session?.access_token) {
//             fetchSubscriptionStatus(session.access_token, true);
//           }
//           return;
//         }

//         setUser(session?.user ?? null);

//         if (session?.access_token) {
//           fetchSubscriptionStatus(session.access_token, true);
//         }

//         if (session?.user?.id) {
//           fetchSessionQuota(session.user.id, true);
//         } else {
//           setSubscriptionStatus(null);
//           setDaysRemaining(null);
//           setSessionQuota(null);
//         }
//       }
//     );

//     return () => subscription.unsubscribe();
//   }, []);

//   // ─────────────────────────────────────────────────────────────
//   // DERIVED
//   // ─────────────────────────────────────────────────────────────
//   const isPaidUser =
//     subscriptionStatus === "active" || subscriptionStatus === "expiring";

//   const value = {
//     user,
//     loading: !initialCheckDone,
//     subscriptionStatus,
//     daysRemaining,
//     subscriptionLoading,
//     isPaidUser,

//     // ✅ NEW: Session quota exposed to whole app
//     sessionQuota,
//     quotaLoading,

//     // ✅ NEW: Refresh quota manually (call after session ends)
//     refreshSessionQuota: async () => {
//       if (user?.id) {
//         await fetchSessionQuota(user.id, false);
//       }
//     },

//     signUp: (email, password, fullName) =>
//       supabase.auth.signUp({
//         email,
//         password,
//         options: { data: { full_name: fullName } },
//       }),

//     signIn: (email, password) =>
//       supabase.auth.signInWithPassword({ email, password }),

//     signOut: async () => {
//       if (user?.id) {
//         localStorage.removeItem(`selectedKBIds_${user.id}`);
//       }
//       setSubscriptionStatus(null);
//       setDaysRemaining(null);
//       setSessionQuota(null);
//       return supabase.auth.signOut();
//     },

//     refreshSubscription: async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (session?.access_token) {
//         await fetchSubscriptionStatus(session.access_token, false);
//       }
//       // ✅ Also refresh session quota after plan change
//       if (user?.id) {
//         await fetchSessionQuota(user.id, false);
//       }
//     },
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {initialCheckDone ? children : (
//         <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
//           <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
//         </div>
//       )}
//     </AuthContext.Provider>
//   );
// };





// frontend/src/components/Auth/AuthContext.jsx
// FIX: getUser() with 5s timeout — kabhi infinite spinner nahi hoga
// Strategy: getSession() se fast UI, background mein getUser() se server validate

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../database/supabaseClient";

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [daysRemaining, setDaysRemaining] = useState(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);

  const [sessionQuota, setSessionQuota] = useState(null);
  const [quotaLoading, setQuotaLoading] = useState(false);

  // ─────────────────────────────────────────────────────────────
  // FORCE LOGOUT — deleted user pe call karo
  // ─────────────────────────────────────────────────────────────
  const forceLogout = async (userId = null) => {
    console.warn("[AuthContext] Force logout — invalid session");
    if (userId) localStorage.removeItem(`selectedKBIds_${userId}`);
    setUser(null);
    setSubscriptionStatus(null);
    setDaysRemaining(null);
    setSessionQuota(null);
    await supabase.auth.signOut();
  };

  // ─────────────────────────────────────────────────────────────
  // SUBSCRIPTION FETCH
  // ─────────────────────────────────────────────────────────────
  const fetchSubscriptionStatus = async (accessToken, isBackground = false) => {
    if (!accessToken) return;
    try {
      if (!isBackground) setSubscriptionLoading(true);
      const baseUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${baseUrl}/api/subscription/status`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      // 401 = user deleted ya token invalid → force logout
      if (res.status === 401) {
        await forceLogout();
        return;
      }

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) return;

      const data = await res.json();
      setSubscriptionStatus(data.subscription_status);
      setDaysRemaining(data.days_remaining);
    } catch (err) {
      // Network error — keep last known value
    } finally {
      if (!isBackground) setSubscriptionLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // SESSION QUOTA FETCH
  // ─────────────────────────────────────────────────────────────
  const fetchSessionQuota = async (userId, isBackground = false) => {
    if (!userId) return;
    try {
      if (!isBackground) setQuotaLoading(true);
      const baseUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${baseUrl}/session/quota/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) return;
      const data = await res.json();
      setSessionQuota(data);
    } catch (err) {
      // Keep last known value
    } finally {
      if (!isBackground) setQuotaLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // INITIAL SESSION CHECK
  // Flow:
  // 1. getSession() — instant, local token (no network) → UI unblock karo
  // 2. Background mein getUser() — server validate (deleted user detect)
  // 3. setInitialCheckDone(true) HAMESHA finally mein — kabhi hang nahi
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Step 1: Local session check — instant
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.user) {
          setUser(null);
          return; // finally mein setInitialCheckDone(true) hoga
        }

        // Step 2: Local session mila — turant UI dikhao
        setUser(session.user);

        // Step 3: Background mein server verify — 5s timeout
        const verifyWithTimeout = Promise.race([
          supabase.auth.getUser(),
          new Promise((resolve) =>
            setTimeout(
              () => resolve({ timedOut: true, data: { user: null } }),
              5000
            )
          ),
        ]);

        verifyWithTimeout.then(async (result) => {
          if (result.timedOut) {
            console.warn("[AuthContext] Server verify timed out — using local session");
            return;
          }
          const { data: { user: serverUser }, error } = result;
          if (error || !serverUser) {
            // User deleted ya token expired
            await forceLogout(session.user?.id);
          }
          // Server ne confirm kiya — user already set hai, kuch nahi karna
        });

        // Step 4: Subscription + quota (background, UI block nahi)
        if (session.access_token) {
          fetchSubscriptionStatus(session.access_token, false);
        }
        fetchSessionQuota(session.user.id, false);

      } catch (err) {
        console.error("[AuthContext] Init error:", err);
        setUser(null);
      } finally {
        // ✅ HAMESHA yahan aayega — infinite spinner impossible
        setInitialCheckDone(true);
      }
    };

    initAuth();

    // AUTH STATE CHANGE LISTENER
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (_event === "TOKEN_REFRESHED") {
          if (session?.access_token) {
            fetchSubscriptionStatus(session.access_token, true);
          }
          return;
        }

        if (_event === "SIGNED_OUT") {
          setUser(null);
          setSubscriptionStatus(null);
          setDaysRemaining(null);
          setSessionQuota(null);
          return;
        }

        if (_event === "SIGNED_IN") {
          if (session?.user) {
            setUser(session.user);
            if (session.access_token) {
              fetchSubscriptionStatus(session.access_token, true);
            }
            fetchSessionQuota(session.user.id, true);
          }
          return;
        }

        // Default
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
          setSubscriptionStatus(null);
          setDaysRemaining(null);
          setSessionQuota(null);
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
    loading: !initialCheckDone,
    subscriptionStatus,
    daysRemaining,
    subscriptionLoading,
    isPaidUser,
    sessionQuota,
    quotaLoading,

    refreshSessionQuota: async () => {
      if (user?.id) await fetchSessionQuota(user.id, false);
    },

    signUp: (email, password, fullName) =>
      supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      }),

    signIn: (email, password) =>
      supabase.auth.signInWithPassword({ email, password }),

    signOut: async () => {
      if (user?.id) localStorage.removeItem(`selectedKBIds_${user.id}`);
      setSubscriptionStatus(null);
      setDaysRemaining(null);
      setSessionQuota(null);
      return supabase.auth.signOut();
    },

    refreshSubscription: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        await fetchSubscriptionStatus(session.access_token, false);
      }
      if (user?.id) await fetchSessionQuota(user.id, false);
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {initialCheckDone ? (
        children
      ) : (
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </AuthContext.Provider>
  );
};