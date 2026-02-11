// frontend/src/hooks/useSubscriptionPopup.js

import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../Auth/AuthContext";

/**
 * useSubscriptionPopup
 *
 * Interview page pe import karo aur use karo:
 *
 *   const { showPopup, popupStatus, popupDays, closePopup } = useSubscriptionPopup();
 *
 * Behavior:
 *  - User jab bhi /interview page pe aaye, ek baar popup dikhega (session-based)
 *  - Tab band → dobara nahi aayega
 *  - Naya tab / refresh → fir dikhega
 *  - Sirf "expiring" (≤3 days) aur "expired" ke liye show hoga
 *  - Free / active users ke liye nahi dikhega
 */
export function useSubscriptionPopup() {
  const { subscriptionStatus, daysRemaining } = useAuth();

  const [showPopup, setShowPopup]   = useState(false);
  const [popupStatus, setPopupStatus] = useState(null);
  const [popupDays, setPopupDays]   = useState(null);

  // sessionShown — ek baar dikhaya, tab session mein dobara nahi
  const sessionShown = useRef(false);

  useEffect(() => {
    // Already shown this session → skip
    if (sessionShown.current) return;

    // Only show for expiring or expired
    if (
      subscriptionStatus === "expiring" ||
      subscriptionStatus === "expired"
    ) {
      const timer = setTimeout(() => {
        setPopupStatus(subscriptionStatus);
        setPopupDays(daysRemaining);
        setShowPopup(true);
        sessionShown.current = true;
      }, 2500); // small delay for page to load

      return () => clearTimeout(timer);
    }
  }, [subscriptionStatus, daysRemaining]);

  const closePopup = () => setShowPopup(false);

  return { showPopup, popupStatus, popupDays, closePopup };
}