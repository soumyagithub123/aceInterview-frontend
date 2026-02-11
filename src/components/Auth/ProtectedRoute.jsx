// // frontend/src/components/Auth/ProtectedRoute.jsx

// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// /**
//  * ProtectedRoute — Guards routes based on auth + subscription status
//  *
//  * Props:
//  *  requirePaid   — only active/expiring subscribers allowed (paid routes)
//  *  blockExpired  — expired users get redirected even on free routes
//  *
//  * Subscription status flow:
//  *  free     → can access free routes, blocked on requirePaid routes
//  *  active   → full access everywhere
//  *  expiring → full access (popup shown separately in App.jsx)
//  *  expired  → blocked on blockExpired + requirePaid routes → /pricing
//  */
// export default function ProtectedRoute({
//   children,
//   requirePaid = false,
//   blockExpired = false,
// }) {
//   const {
//     user,
//     loading,
//     subscriptionStatus,
//     subscriptionLoading,
//   } = useAuth();

//   const location = useLocation();

//   const isLoading = loading || subscriptionLoading;

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
//         <div className="text-white text-center max-w-sm w-full">
//           <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-300 text-sm">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   // 🔐 Not logged in → sign in page
//   if (!user) {
//     return <Navigate to="/sign-in" replace state={{ from: location }} />;
//   }

//   // ❌ Expired subscription — block if route has blockExpired or requirePaid
//   if (
//     subscriptionStatus === "expired" &&
//     (blockExpired || requirePaid)
//   ) {
//     return <Navigate to="/pricing" replace />;
//   }

//   // 💳 Paid-only route — allow only active or expiring subscribers
//   if (
//     requirePaid &&
//     subscriptionStatus !== "active" &&
//     subscriptionStatus !== "expiring"
//   ) {
//     return <Navigate to="/pricing" replace />;
//   }

//   return children;
// }





// frontend/src/components/Auth/ProtectedRoute.jsx

// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// /**
//  * ProtectedRoute
//  *
//  * requirePaid = false  →  sirf login check (free + paid + expired sabko allow)
//  * requirePaid = true   →  sirf active/expiring paid users allowed
//  *
//  * NOTE: expired users ko /interview se block NAHI karna —
//  *       woh wahan ja sakte hain, UI mein cards locked hain already.
//  *       Popup alag se dikhega (App.jsx mein).
//  */
// export default function ProtectedRoute({ children, requirePaid = false }) {
//   const { user, loading, subscriptionStatus, subscriptionLoading } = useAuth();
//   const location = useLocation();

//   const isLoading = loading || subscriptionLoading;

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
//         <div className="text-white text-center max-w-sm w-full">
//           <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
//           <p className="text-gray-300 text-sm">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   // Not logged in → sign in
//   if (!user) {
//     return <Navigate to="/sign-in" replace state={{ from: location }} />;
//   }

//   // Paid-only route → allow only active or expiring subscribers
//   if (
//     requirePaid &&
//     subscriptionStatus !== "active" &&
//     subscriptionStatus !== "expiring"
//   ) {
//     return <Navigate to="/pricing" replace />;
//   }

//   return children;
// }





// frontend/src/components/Auth/ProtectedRoute.jsx

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

/**
 * ProtectedRoute
 *
 * requirePaid = false  →  sirf login check
 * requirePaid = true   →  active ya expiring subscribers hi allowed
 *
 * ✅ subscriptionLoading pe spinner NAHI — warna tab switch pe full screen flash hoga
 *    Sirf initial auth loading (loading) pe spinner dikhega
 */
export default function ProtectedRoute({ children, requirePaid = false }) {
  const { user, loading, subscriptionStatus } = useAuth();
  const location = useLocation();

  // ✅ Sirf initial session check pe spinner — subscriptionLoading yahan use nahi
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  // Paid-only route — active ya expiring hi allowed
  if (
    requirePaid &&
    subscriptionStatus !== "active" &&
    subscriptionStatus !== "expiring"
  ) {
    return <Navigate to="/pricing" replace />;
  }

  return children;
}