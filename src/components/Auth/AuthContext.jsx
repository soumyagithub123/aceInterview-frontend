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

//   // initialCheckDone — sirf pehli baar session check ke liye
//   // Tab switch pe yeh dobara true nahi hota → no full screen flash
//   const [initialCheckDone, setInitialCheckDone] = useState(false);

//   const [subscriptionStatus,  setSubscriptionStatus]  = useState(null);
//   const [daysRemaining,       setDaysRemaining]        = useState(null);
//   const [subscriptionLoading, setSubscriptionLoading] = useState(false);

//   // Subscription ko background mein fetch karo — UI block mat karo
//   const fetchSubscriptionStatus = async (accessToken, isBackground = false) => {
//     if (!accessToken) return;
//     try {
//       // Only show loading state if it's NOT a background refresh (e.g. initial login)
//       if (!isBackground) setSubscriptionLoading(true);

//       const baseUrl = import.meta.env.VITE_API_URL;
//       const url     = `${baseUrl}/api/subscription/status`;

//       const res = await fetch(url, {
//         method:  "GET",
//         headers: {
//           Authorization:  `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       });


//       const contentType = res.headers.get("content-type") || "";
//       if (!contentType.includes("application/json")) {
//         // const text = await res.text(); // Unused
//         throw new Error("Non-JSON response from server");
//       }

//       const data = await res.json();

//       setSubscriptionStatus(data.subscription_status);
//       setDaysRemaining(data.days_remaining);

//     } catch (err) {
//       // Don't reset status on background refresh failure
//       // (keeps last known good value)
//     } finally {
//       if (!isBackground) setSubscriptionLoading(false);
//     }
//   };

//   // ─────────────────────────────────────────────────────────────
//   // INITIAL SESSION CHECK — sirf ek baar
//   // ─────────────────────────────────────────────────────────────
//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setUser(session?.user ?? null);
//       if (session?.access_token) {
//         // Initial check: show loading
//         fetchSubscriptionStatus(session.access_token, false);
//       }
//       // ✅ Ab children render ho sakte hain
//       setInitialCheckDone(true);
//     });

//     // ─────────────────────────────────────────────────────────
//     // AUTH STATE CHANGE — tab switch, token refresh, login/logout
//     // Yahan loading SET NAHI karte — warna tab switch pe flash hoga
//     // ─────────────────────────────────────────────────────────
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       (_event, session) => {

//         // Token refresh → sirf subscription background mein update karo
//         if (_event === "TOKEN_REFRESHED") {
//           if (session?.access_token) {
//             // Token refresh: BACKGROUND update (no loading spinner)
//             fetchSubscriptionStatus(session.access_token, true);
//           }
//           return;
//         }

//         setUser(session?.user ?? null);

//         if (session?.access_token) {
//             // Auth change (login/tab switch?):
//             // If we have a user, it might be a re-focus. Let's do background for least disruption?
//             // Or if it IS a login event, we might want loading.
//             // Safe bet: background=true to avoid flicker if it's just a session recovery/switch
//             fetchSubscriptionStatus(session.access_token, true);
//         } else {
//           // Logout
//           setSubscriptionStatus(null);
//           setDaysRemaining(null);
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
//     loading: !initialCheckDone,   // true sirf pehle check tak
//     subscriptionStatus,
//     daysRemaining,
//     subscriptionLoading,
//     isPaidUser,

//     signUp: (email, password, fullName) =>
//       supabase.auth.signUp({
//         email,
//         password,
//         options: { data: { full_name: fullName } },
//       }),

//     signIn: (email, password) =>
//       supabase.auth.signInWithPassword({ email, password }),

//     signOut: async () => {
//       // ✅ Clear KB selection on logout
//       if (user?.id) {
//         localStorage.removeItem(`selectedKBIds_${user.id}`);
//       }
//       setSubscriptionStatus(null);
//       setDaysRemaining(null);
//       return supabase.auth.signOut();
//     },

//     refreshSubscription: async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (session?.access_token) {
//         await fetchSubscriptionStatus(session.access_token, false);
//       }
//     },
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {/* ✅ Children hamesha render hote hain initial check ke baad */}
//       {/* Tab switch pe koi flash/blank nahi hoga */}
//       {initialCheckDone ? children : (
//         <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
//           <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
//         </div>
//       )}
//     </AuthContext.Provider>
//   );
// };









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

  // initialCheckDone – sirf pehli baar session check ke liye
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  const [subscriptionStatus,  setSubscriptionStatus]  = useState(null);
  const [daysRemaining,       setDaysRemaining]        = useState(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);

  // ✅ NEW: Session quota state
  const [sessionQuota, setSessionQuota] = useState(null);
  const [quotaLoading, setQuotaLoading] = useState(false);

  // ─────────────────────────────────────────────────────────────
  // SUBSCRIPTION FETCH
  // ─────────────────────────────────────────────────────────────
  const fetchSubscriptionStatus = async (accessToken, isBackground = false) => {
    if (!accessToken) return;
    try {
      if (!isBackground) setSubscriptionLoading(true);

      const baseUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${baseUrl}/api/subscription/status`, {
        method:  "GET",
        headers: {
          Authorization:  `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error("Non-JSON response from server");
      }

      const data = await res.json();
      setSubscriptionStatus(data.subscription_status);
      setDaysRemaining(data.days_remaining);

    } catch (err) {
      // Keep last known value on background refresh failure
    } finally {
      if (!isBackground) setSubscriptionLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // ✅ NEW: SESSION QUOTA FETCH
  // Ye quota fetch karta hai backend se (plan_session_rules ke hisaab se)
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

      if (!res.ok) {
        console.warn("[AuthContext] Quota fetch failed:", res.status);
        return;
      }

      const data = await res.json();
      setSessionQuota(data);
      console.log("[AuthContext] Session quota loaded:", data);

    } catch (err) {
      console.warn("[AuthContext] Quota fetch error:", err.message);
      // Don't reset quota on error, keep last known value
    } finally {
      if (!isBackground) setQuotaLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // INITIAL SESSION CHECK – sirf ek baar
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.access_token) {
        fetchSubscriptionStatus(session.access_token, false);
      }
      if (session?.user?.id) {
        fetchSessionQuota(session.user.id, false);
      }
      setInitialCheckDone(true);
    });

    // AUTH STATE CHANGE
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {

        if (_event === "TOKEN_REFRESHED") {
          if (session?.access_token) {
            fetchSubscriptionStatus(session.access_token, true);
          }
          return;
        }

        setUser(session?.user ?? null);

        if (session?.access_token) {
          fetchSubscriptionStatus(session.access_token, true);
        }

        if (session?.user?.id) {
          fetchSessionQuota(session.user.id, true);
        } else {
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

    // ✅ NEW: Session quota exposed to whole app
    sessionQuota,
    quotaLoading,

    // ✅ NEW: Refresh quota manually (call after session ends)
    refreshSessionQuota: async () => {
      if (user?.id) {
        await fetchSessionQuota(user.id, false);
      }
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
      if (user?.id) {
        localStorage.removeItem(`selectedKBIds_${user.id}`);
      }
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
      // ✅ Also refresh session quota after plan change
      if (user?.id) {
        await fetchSessionQuota(user.id, false);
      }
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {initialCheckDone ? children : (
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </AuthContext.Provider>
  );
};