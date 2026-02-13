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
//   const fetchSubscriptionStatus = async (accessToken) => {
//     if (!accessToken) return;
//     try {
//       setSubscriptionLoading(true);

//       const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:10000";
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
//         const text = await res.text();
//         throw new Error("Non-JSON response from server");
//       }

//       const data = await res.json();

//       setSubscriptionStatus(data.subscription_status);
//       setDaysRemaining(data.days_remaining);

//     } catch (err) {
//       // Don't reset status on background refresh failure
//       // (keeps last known good value)
//     } finally {
//       setSubscriptionLoading(false);
//     }
//   };

//   // ─────────────────────────────────────────────────────────────
//   // INITIAL SESSION CHECK — sirf ek baar
//   // ─────────────────────────────────────────────────────────────
//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setUser(session?.user ?? null);
//       if (session?.access_token) {
//         fetchSubscriptionStatus(session.access_token);
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
//             fetchSubscriptionStatus(session.access_token);
//           }
//           return;
//         }

//         setUser(session?.user ?? null);

//         if (session?.access_token) {
//           fetchSubscriptionStatus(session.access_token);
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
//       setSubscriptionStatus(null);
//       setDaysRemaining(null);
//       return supabase.auth.signOut();
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

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { supabase } from "../../database/supabaseClient";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Subscription state with caching
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [subscriptionTier, setSubscriptionTier] = useState("free");
  const [daysRemaining, setDaysRemaining] = useState(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);

  // ✅ Session-based cache to prevent repeated calls
  const subscriptionCache = useRef({
    data: null,
    timestamp: null,
    userId: null,
  });

  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // =========================================================
  // AUTH LISTENER
  // =========================================================
  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (mounted) {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      } catch (error) {
        console.error("Auth init error:", error);
        if (mounted) {
          setUser(null);
          setLoading(false);
        }
      }
    };

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          setUser(session?.user ?? null);

          // Clear cache on sign out
          if (event === "SIGNED_OUT") {
            subscriptionCache.current = {
              data: null,
              timestamp: null,
              userId: null,
            };
            setSubscriptionStatus(null);
            setSubscriptionTier("free");
            setDaysRemaining(null);
          }
        }
      }
    );

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  // =========================================================
  // FETCH SUBSCRIPTION (WITH SMART CACHING)
  // =========================================================
  const fetchSubscription = async (forceRefresh = false) => {
    if (!user) {
      setSubscriptionStatus(null);
      setSubscriptionTier("free");
      setDaysRemaining(null);
      return;
    }

    // ✅ Check cache first
    const now = Date.now();
    const cache = subscriptionCache.current;

    if (
      !forceRefresh &&
      cache.data &&
      cache.userId === user.id &&
      cache.timestamp &&
      now - cache.timestamp < CACHE_DURATION
    ) {
      console.log("📦 Using cached subscription data");
      setSubscriptionStatus(cache.data.subscription_status);
      setSubscriptionTier(cache.data.subscription_tier);
      setDaysRemaining(cache.data.days_remaining);
      return;
    }

    // ✅ Fetch from backend
    try {
      setSubscriptionLoading(true);

      const session = await supabase.auth.getSession();
      const token = session?.data?.session?.access_token;

      if (!token) {
        throw new Error("No auth token");
      }

      const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:10000";
      const res = await fetch(`${BACKEND_URL}/api/subscription/status`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Subscription API failed: ${res.status}`);
      }

      const data = await res.json();

      // ✅ Update cache
      subscriptionCache.current = {
        data,
        timestamp: now,
        userId: user.id,
      };

      setSubscriptionStatus(data.subscription_status || "free");
      setSubscriptionTier(data.subscription_tier || "free");
      setDaysRemaining(data.days_remaining || 0);

      console.log("✅ Subscription fetched and cached:", data);
    } catch (error) {
      console.error("❌ Error fetching subscription:", error);
      setSubscriptionStatus("free");
      setSubscriptionTier("free");
      setDaysRemaining(0);
    } finally {
      setSubscriptionLoading(false);
    }
  };

  // =========================================================
  // FETCH ON USER CHANGE (ONLY ONCE)
  // =========================================================
  useEffect(() => {
    if (user) {
      fetchSubscription();
    }
  }, [user]);

  // =========================================================
  // SIGN IN / SIGN UP / SIGN OUT
  // =========================================================
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const signUp = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // Clear cache
    subscriptionCache.current = {
      data: null,
      timestamp: null,
      userId: null,
    };
  };

  // =========================================================
  // REFRESH SUBSCRIPTION (FORCE)
  // =========================================================
  const refreshSubscription = () => fetchSubscription(true);

  // =========================================================
  // VALUE
  // =========================================================
  const value = {
    user,
    loading,
    subscriptionStatus,
    subscriptionTier,
    daysRemaining,
    subscriptionLoading,
    signIn,
    signUp,
    signOut,
    refreshSubscription,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}