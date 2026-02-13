// // frontend/src/components/Auth/ProtectedRoute.jsx

// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// /**
//  * ProtectedRoute
//  *
//  * requirePaid = false  →  sirf login check
//  * requirePaid = true   →  active ya expiring subscribers hi allowed
//  *
//  * ✅ subscriptionLoading pe spinner NAHI — warna tab switch pe full screen flash hoga
//  *    Sirf initial auth loading (loading) pe spinner dikhega
//  */
// export default function ProtectedRoute({ children, requirePaid = false }) {
//   const { user, loading, subscriptionStatus } = useAuth();
//   const location = useLocation();

//   // ✅ Sirf initial session check pe spinner — subscriptionLoading yahan use nahi
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
//         <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   // Not logged in
//   if (!user) {
//     return <Navigate to="/sign-in" replace state={{ from: location }} />;
//   }

//   // Paid-only route — active ya expiring hi allowed
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
 * ✅ FIXED ProtectedRoute
 * 
 * requirePaid = false  →  Only login check (free + paid allowed)
 * requirePaid = true   →  Only active/expiring paid users allowed
 * 
 * Changes:
 * - No loading spinner on subscriptionLoading (prevents flash on tab switch)
 * - Only shows initial auth loading spinner
 * - Smooth navigation without flashing
 */
export default function ProtectedRoute({ children, requirePaid = false }) {
  const { user, loading, subscriptionStatus } = useAuth();
  const location = useLocation();

  // ✅ Only show spinner during initial auth check
  // NOT during subscription loading (prevents flash)
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in → sign in
  if (!user) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  // ✅ Paid-only route → allow only active or expiring subscribers
  if (
    requirePaid &&
    subscriptionStatus !== "active" &&
    subscriptionStatus !== "expiring"
  ) {
    return <Navigate to="/pricing" replace />;
  }

  return children;
}