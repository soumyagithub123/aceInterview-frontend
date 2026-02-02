import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const txnid = params.get("txnid");
  const amount = params.get("amount");

  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 px-6">
      <div className="max-w-md w-full text-center animate-fade-in-up">
        <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-emerald-800 mb-2">Payment Successful</h1>
        <p className="text-emerald-600 mb-8">Thank you for your purchase!</p>

        <div className="bg-white rounded-2xl shadow-card p-6 border border-emerald-100 mb-8 text-left">
          <p className="text-surface-700 mb-2">
            <strong>Transaction ID:</strong> {txnid || "N/A"}
          </p>
          <p className="text-surface-700">
            <strong>Amount Paid:</strong> ₹{amount || "0"}
          </p>
        </div>

        <p className="text-surface-500 text-sm">Redirecting to homepage...</p>
      </div>
    </div>
  );
}
