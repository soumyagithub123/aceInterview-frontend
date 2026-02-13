// // frontend/src/hooks/useSubscriptionPopup.js

// import { useState, useEffect, useRef } from "react";
// import { useAuth } from "../../Auth/AuthContext";

// /**
//  * useSubscriptionPopup
//  *
//  * Interview page pe import karo aur use karo:
//  *
//  *   const { showPopup, popupStatus, popupDays, closePopup } = useSubscriptionPopup();
//  *
//  * Behavior:
//  *  - User jab bhi /interview page pe aaye, ek baar popup dikhega (session-based)
//  *  - Tab band → dobara nahi aayega
//  *  - Naya tab / refresh → fir dikhega
//  *  - Sirf "expiring" (≤3 days) aur "expired" ke liye show hoga
//  *  - Free / active users ke liye nahi dikhega
//  */
// export function useSubscriptionPopup() {
//   const { subscriptionStatus, daysRemaining } = useAuth();

//   const [showPopup, setShowPopup]   = useState(false);
//   const [popupStatus, setPopupStatus] = useState(null);
//   const [popupDays, setPopupDays]   = useState(null);

//   // sessionShown — ek baar dikhaya, tab session mein dobara nahi
//   const sessionShown = useRef(false);

//   useEffect(() => {
//     // Already shown this session → skip
//     if (sessionShown.current) return;

//     // Only show for expiring or expired
//     if (
//       subscriptionStatus === "expiring" ||
//       subscriptionStatus === "expired"
//     ) {
//       const timer = setTimeout(() => {
//         setPopupStatus(subscriptionStatus);
//         setPopupDays(daysRemaining);
//         setShowPopup(true);
//         sessionShown.current = true;
//       }, 2500); // small delay for page to load

//       return () => clearTimeout(timer);
//     }
//   }, [subscriptionStatus, daysRemaining]);

//   const closePopup = () => setShowPopup(false);

//   return { showPopup, popupStatus, popupDays, closePopup };
// }






// frontend/src/components/hooks/useSubscriptionPopup.js

import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../Auth/AuthContext";
import { useLocation } from "react-router-dom";

/**
 * ✅ EXACT ROUTE POPUP
 * 
 * Shows popup ONLY on exact /interview route
 * NOT on /interview/personas, /interview/knowledge-base, etc
 * 
 * Behavior:
 * - /interview → Popup shows ✅
 * - /interview/personas → NO popup ❌
 * - /interview/knowledge-base → NO popup ❌
 * - Back to /interview → Popup shows again ✅
 */
export function useSubscriptionPopup() {
  const { subscriptionStatus, daysRemaining } = useAuth();
  const location = useLocation();

  const [showPopup, setShowPopup] = useState(false);
  const [popupStatus, setPopupStatus] = useState(null);
  const [popupDays, setPopupDays] = useState(null);

  // ✅ Track if popup shown for CURRENT route visit
  const shownForCurrentVisit = useRef(false);

  useEffect(() => {
    // ✅ Reset on route change
    shownForCurrentVisit.current = false;
    setShowPopup(false);
  }, [location.pathname]);

  useEffect(() => {
    // ✅ CRITICAL: Only show on EXACT /interview route
    const isExactInterviewRoute = location.pathname === "/interview";
    
    if (!isExactInterviewRoute) {
      console.log(`📍 Not on /interview (current: ${location.pathname}) - skipping popup`);
      return;
    }

    // Already shown for this visit → skip
    if (shownForCurrentVisit.current) {
      console.log("📦 Already shown for this /interview visit - skipping");
      return;
    }

    // Only show for expiring or expired
    if (
      subscriptionStatus === "expiring" ||
      subscriptionStatus === "expired"
    ) {
      console.log(`⚠️ Showing ${subscriptionStatus} popup on /interview (${daysRemaining} days)`);
      
      const timer = setTimeout(() => {
        setPopupStatus(subscriptionStatus);
        setPopupDays(daysRemaining);
        setShowPopup(true);
        
        // ✅ Mark as shown for THIS visit only
        shownForCurrentVisit.current = true;
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      console.log(`✅ Subscription ${subscriptionStatus} - no popup needed`);
    }
  }, [subscriptionStatus, daysRemaining, location.pathname]);

  const closePopup = () => {
    console.log("✅ Popup dismissed by user");
    setShowPopup(false);
    // shownForCurrentVisit stays true for THIS route visit
  };

  return { showPopup, popupStatus, popupDays, closePopup };
}