// frontend/src/components/Payment/ExpiringPopup.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * ExpiringPopup
 *
 * Props:
 *   status        — "expiring" | "expired"
 *   daysRemaining — number
 *   onClose       — function
 */
export default function ExpiringPopup({ status, daysRemaining, onClose }) {
  const navigate = useNavigate();
  const isExpired = status === "expired";

  const handleUpgrade = () => {
    onClose();
    navigate("/pricing");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4">
      <div className="relative bg-gradient-to-br from-[#1a1a22] to-[#0f0f15]
                      text-white rounded-2xl p-7 max-w-sm w-full shadow-2xl
                      border border-white/10">

        {/* Close X — only for expiring, not expired */}
        {!isExpired && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition text-lg leading-none"
          >
            ✕
          </button>
        )}

        <div className="text-center">
          {/* Icon */}
          <div className="text-5xl mb-4">
            {isExpired ? "🔒" : "⚠️"}
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold mb-2">
            {isExpired ? "Subscription Expire Ho Gayi" : "Subscription Expiring Soon!"}
          </h2>

          {/* Message */}
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            {isExpired ? (
              <>
                Aapka premium plan{" "}
                <span className="text-red-400 font-semibold">expire ho chuka hai</span>.{" "}
                Coding Interview, Online Assessment, Phone Interview aur baaki
                premium features dobara use karne ke liye naya plan lo.
              </>
            ) : (
              <>
                Aapka premium plan sirf{" "}
                <span className="text-yellow-400 font-bold">
                  {daysRemaining} {daysRemaining === 1 ? "din" : "din"} mein expire
                </span>{" "}
                ho jaayega. Abhi renew karo taaki koi feature band na ho.
              </>
            )}
          </p>

          {/* Primary CTA */}
          <button
            onClick={handleUpgrade}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all mb-3
              ${isExpired
                ? "bg-red-600 hover:bg-red-500 shadow-lg shadow-red-900/40"
                : "bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-900/40"
              }`}
          >
            {isExpired ? "🔓 Naya Plan Lo" : "⚡ Abhi Renew Karo"}
          </button>

          {/* Secondary — dismiss */}
          <button
            onClick={onClose}
            className="w-full text-gray-500 hover:text-gray-300 text-xs transition py-1"
          >
            {isExpired ? "Baad mein dekhta hoon" : "Baad mein remind karo"}
          </button>
        </div>
      </div>
    </div>
  );
}