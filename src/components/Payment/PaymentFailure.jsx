import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PaymentFailure() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const txnid = params.get("txnid");
  const amount = params.get("amount");

  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50/30 px-6">
      <div className="max-w-md w-full text-center animate-fade-in-up">
        <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-red-800 mb-2">Payment Failed</h1>
        <p className="text-red-600 mb-8">We couldn&apos;t process your payment. Please try again.</p>

        <div className="bg-white rounded-2xl shadow-card p-6 border border-red-100 mb-8 text-left">
          <p className="text-surface-700 mb-2">
            <strong>Transaction ID:</strong> {txnid || "N/A"}
          </p>
          <p className="text-surface-700">
            <strong>Amount Attempted:</strong> ₹{amount || "0"}
          </p>
        </div>

        <p className="text-surface-500 text-sm">Redirecting to homepage...</p>
      </div>
    </div>
  );
}
