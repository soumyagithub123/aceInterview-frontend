// import React, { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// export default function PaymentFailure() {
//   const navigate = useNavigate();
//   const [params] = useSearchParams();

//   const txnid = params.get("txnid");
//   const amount = params.get("amount");

//   useEffect(() => {
//     setTimeout(() => navigate("/"), 3000);
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center px-4">
//       <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-700">
//         Payment Failed ❌
//       </h1>

//       <p className="text-base sm:text-lg mt-4 break-all">
//         Transaction ID: {txnid}
//       </p>

//       <p className="text-base sm:text-lg">
//         Amount Attempted: ₹{amount}
//       </p>

//       <p className="mt-6 text-sm sm:text-base text-gray-600">
//         Redirecting to homepage...
//       </p>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PaymentFailure() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [countdown, setCountdown] = useState(5);

  const txnid = params.get("txnid");
  const amount = params.get("amount");

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-red-100 px-4">
      <div className="w-full max-w-xs bg-white rounded-3xl shadow-2xl overflow-hidden animate-slideUp">
        {/* Icon */}
        <div className="flex justify-center pt-6 pb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg animate-bounce-in">
              <svg
                className="w-8 h-8 text-white animate-shake"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="absolute inset-0 w-16 h-16 bg-red-400 rounded-full animate-ping opacity-25"></div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center px-6 pb-5 animate-fadeIn">
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            Payment Failed
          </h1>
          <p className="text-xs text-gray-600">
            Transaction could not be completed
          </p>
        </div>

        {/* Details */}
        <div className="bg-gray-50 px-6 py-4 space-y-2.5 animate-fadeIn delay-100">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Amount</span>
            <span className="font-bold text-gray-900">₹{amount || "0"}</span>
          </div>

          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Transaction ID</span>
            <span className="font-mono text-gray-800">{txnid || "N/A"}</span>
          </div>

          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Status</span>
            <span className="inline-flex items-center gap-1 text-red-600 font-semibold">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
              Failed
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="p-6 space-y-2.5 animate-fadeIn delay-200">
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm"
          >
            Go Home
          </button>
        </div>

        {/* Footer with animated progress bar */}
        <div className="bg-gray-50 px-6 py-3 border-t">
          <div className="flex items-center justify-center gap-2">
            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-600 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 font-medium text-center">
              {" "}
              Redirecting you shortly…
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounceIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-bounce-in {
          animation: bounceIn 0.5s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
}