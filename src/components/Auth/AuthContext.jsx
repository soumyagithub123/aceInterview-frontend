// // frontend/src/components/Auth/AuthContext.jsx

// import React, { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "../../database/supabaseClient";

// const AuthContext = createContext(null);

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }
//   return ctx;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 🔔 Subscription state
//   const [subscriptionStatus, setSubscriptionStatus] = useState(null);
//   const [daysRemaining, setDaysRemaining] = useState(null);
//   const [subscriptionLoading, setSubscriptionLoading] = useState(false);

//   // --------------------------------------------
//   // 🔥 FETCH SUBSCRIPTION STATUS
//   // --------------------------------------------
//   const fetchSubscriptionStatus = async (accessToken) => {
//     console.log("🟡 [SUB] START subscription check");

//     try {
//       setSubscriptionLoading(true);

//       // ✅ FIXED: VITE_API_URL (matches .env exactly)
//       const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:10000";
//       const url = `${baseUrl}/api/subscription/status`;

//       console.log("🟡 [SUB] URL:", url);

//       const res = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       });

//       console.log("🟡 [SUB] HTTP status:", res.status);

//       // Guard: agar HTML response aaye (504/502/404) toh crash na ho
//       const contentType = res.headers.get("content-type") || "";
//       if (!contentType.includes("application/json")) {
//         const text = await res.text();
//         console.error("❌ [SUB] Non-JSON response:", text.slice(0, 200));
//         throw new Error("Server returned non-JSON response");
//       }

//       const data = await res.json();
//       console.log("🟢 [SUB] RESPONSE:", data);

//       // ─────────────────────────────────────────────────────
//       // 🧪 TESTING MODE — popup / expired check karne ke liye
//       // Ek line uncomment karo, baaki comment rakho
//       // Production mein SABKO comment karke neeche waali 2 lines uncomment karo
//       // ─────────────────────────────────────────────────────

//       // ✅ POPUP TEST — abhi yeh active hai (2 din bache, popup dikhega)
//       setSubscriptionStatus("expiring"); setDaysRemaining(2); return;

//       // EXPIRED TEST — sab routes block ho jayenge
//       // setSubscriptionStatus("expired"); setDaysRemaining(0); return;

//       // ACTIVE TEST — normal paid user flow
//       // setSubscriptionStatus("active"); setDaysRemaining(25); return;

//       // FREE USER TEST — free user flow
//       // setSubscriptionStatus("free"); setDaysRemaining(0); return;

//       // ─────────────────────────────────────────────────────
//       // ✅ PRODUCTION — testing khatam hone ke baad
//       // upar ki sab lines comment karo aur yeh 2 uncomment karo:
//       // ─────────────────────────────────────────────────────
//       // setSubscriptionStatus(data.subscription_status);
//       // setDaysRemaining(data.days_remaining);

//     } catch (err) {
//       console.error("❌ [SUB] FAILED:", err);
//       setSubscriptionStatus(null);
//       setDaysRemaining(null);
//     } finally {
//       console.log("🟣 [SUB] END subscription check");
//       setSubscriptionLoading(false);
//     }
//   };

//   // --------------------------------------------
//   // 🔵 INITIAL SESSION CHECK
//   // --------------------------------------------
//   useEffect(() => {
//     console.log("🔵 [AUTH] Checking existing session");

//     supabase.auth.getSession().then(({ data: { session } }) => {
//       console.log("🔵 [AUTH] Session:", session);

//       setUser(session?.user ?? null);

//       if (session?.access_token) {
//         console.log("🔵 [AUTH] Calling subscription API");
//         fetchSubscriptionStatus(session.access_token);
//       }

//       setLoading(false);
//     });

//     // --------------------------------------------
//     // 🔄 AUTH STATE CHANGE LISTENER
//     // --------------------------------------------
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       console.log("🔄 [AUTH] State changed:", _event);

//       setUser(session?.user ?? null);

//       if (session?.access_token) {
//         fetchSubscriptionStatus(session.access_token);
//       } else {
//         setSubscriptionStatus(null);
//         setDaysRemaining(null);
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   // --------------------------------------------
//   // CONTEXT VALUE
//   // --------------------------------------------
//   const value = {
//     user,
//     loading,

//     subscriptionStatus,
//     daysRemaining,
//     subscriptionLoading,

//     signUp: async (email, password, fullName) => {
//       return await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           data: { full_name: fullName },
//         },
//       });
//     },

//     signIn: async (email, password) => {
//       return await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });
//     },

//     signOut: async () => {
//       setSubscriptionStatus(null);
//       setDaysRemaining(null);
//       return await supabase.auth.signOut();
//     },
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };





// frontend/src/components/Auth/AuthContext.jsx

// import React, { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "../../database/supabaseClient";

// const AuthContext = createContext(null);

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser]       = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [subscriptionStatus,  setSubscriptionStatus]  = useState(null);
//   const [daysRemaining,       setDaysRemaining]        = useState(null);
//   const [subscriptionLoading, setSubscriptionLoading] = useState(false);

//   // ─────────────────────────────────────────────────────────────
//   // FETCH SUBSCRIPTION STATUS FROM BACKEND
//   // ─────────────────────────────────────────────────────────────
//   const fetchSubscriptionStatus = async (accessToken) => {
//     console.log("🟡 [SUB] START subscription check");
//     try {
//       setSubscriptionLoading(true);

//       // ✅ VITE_API_URL — .env se match karta hai
//       const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:10000";
//       const url     = `${baseUrl}/api/subscription/status`;

//       console.log("🟡 [SUB] URL:", url);

//       const res = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization:  `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       });

//       console.log("🟡 [SUB] HTTP status:", res.status);

//       // Guard: HTML response aaye to crash na ho (504/502/404)
//       const contentType = res.headers.get("content-type") || "";
//       if (!contentType.includes("application/json")) {
//         const text = await res.text();
//         console.error("❌ [SUB] Non-JSON response:", text.slice(0, 200));
//         throw new Error("Server returned non-JSON response");
//       }

//       const data = await res.json();
//       console.log("🟢 [SUB] RESPONSE:", data);

//       setSubscriptionStatus(data.subscription_status);
//       setDaysRemaining(data.days_remaining);

//     } catch (err) {
//       console.error("❌ [SUB] FAILED:", err);
//       setSubscriptionStatus(null);
//       setDaysRemaining(null);
//     } finally {
//       console.log("🟣 [SUB] END subscription check");
//       setSubscriptionLoading(false);
//     }
//   };

//   // ─────────────────────────────────────────────────────────────
//   // INITIAL SESSION CHECK
//   // ─────────────────────────────────────────────────────────────
//   useEffect(() => {
//     console.log("🔵 [AUTH] Checking existing session");

//     supabase.auth.getSession().then(({ data: { session } }) => {
//       console.log("🔵 [AUTH] Session found:", !!session);
//       setUser(session?.user ?? null);

//       if (session?.access_token) {
//         fetchSubscriptionStatus(session.access_token);
//       }

//       setLoading(false);
//     });

//     // AUTH STATE CHANGE (login / logout / token refresh)
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         console.log("🔄 [AUTH] State changed:", _event);
//         setUser(session?.user ?? null);

//         if (session?.access_token) {
//           fetchSubscriptionStatus(session.access_token);
//         } else {
//           setSubscriptionStatus(null);
//           setDaysRemaining(null);
//         }
//       }
//     );

//     return () => subscription.unsubscribe();
//   }, []);

//   // ─────────────────────────────────────────────────────────────
//   // CONTEXT VALUE
//   // ─────────────────────────────────────────────────────────────
//   const value = {
//     user,
//     loading,
//     subscriptionStatus,
//     daysRemaining,
//     subscriptionLoading,

//     signUp: (email, password, fullName) =>
//       supabase.auth.signUp({
//         email,
//         password,
//         options: { data: { full_name: fullName } },
//       }),

//     signIn: (email, password) =>
//       supabase.auth.signInWithPassword({ email, password }),

//     signOut: async () => {
//       setSubscriptionStatus(null);
//       setDaysRemaining(null);
//       return supabase.auth.signOut();
//     },
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
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

  // initialCheckDone — sirf pehli baar session check ke liye
  // Tab switch pe yeh dobara true nahi hota → no full screen flash
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  const [subscriptionStatus,  setSubscriptionStatus]  = useState(null);
  const [daysRemaining,       setDaysRemaining]        = useState(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);

  // Subscription ko background mein fetch karo — UI block mat karo
  const fetchSubscriptionStatus = async (accessToken) => {
    if (!accessToken) return;
    console.log("🟡 [SUB] Fetching subscription status...");
    try {
      setSubscriptionLoading(true);

      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:10000";
      const url     = `${baseUrl}/api/subscription/status`;
      console.log("🟡 [SUB] URL:", url);

      const res = await fetch(url, {
        method:  "GET",
        headers: {
          Authorization:  `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log("🟡 [SUB] HTTP status:", res.status);

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await res.text();
        console.error("❌ [SUB] Non-JSON response:", text.slice(0, 150));
        throw new Error("Non-JSON response from server");
      }

      const data = await res.json();
      console.log("🟢 [SUB] Response:", data);

      setSubscriptionStatus(data.subscription_status);
      setDaysRemaining(data.days_remaining);

    } catch (err) {
      console.error("❌ [SUB] Failed:", err.message);
      // Don't reset status on background refresh failure
      // (keeps last known good value)
    } finally {
      setSubscriptionLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // INITIAL SESSION CHECK — sirf ek baar
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.access_token) {
        fetchSubscriptionStatus(session.access_token);
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
        console.log("🔄 [AUTH] State changed:", _event);

        // Token refresh → sirf subscription background mein update karo
        if (_event === "TOKEN_REFRESHED") {
          if (session?.access_token) {
            fetchSubscriptionStatus(session.access_token);
          }
          return;
        }

        setUser(session?.user ?? null);

        if (session?.access_token) {
          fetchSubscriptionStatus(session.access_token);
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
      setSubscriptionStatus(null);
      setDaysRemaining(null);
      return supabase.auth.signOut();
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