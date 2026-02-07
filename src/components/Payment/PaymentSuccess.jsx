import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppData } from "../../context/AppDataContext";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { reloadAll } = useAppData();

  const txnid = params.get("txnid");
  const amount = params.get("amount");

  useEffect(() => {
    const syncAndRedirect = async () => {
      try {
        // 🔄 Refresh subscription + user data
        await reloadAll();
      } catch (e) {
        console.error("Post-payment refresh failed", e);
      }

      // ⏱️ Small delay for UX
      setTimeout(() => {
        navigate("/interview-domain"); // 👈 jahan unlock dikhana ho
      }, 1500);
    };

    syncAndRedirect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700">
        Payment Successful 🎉
      </h1>

      <div className="mt-6 bg-white shadow-md rounded-xl px-4 sm:px-6 py-4 w-full max-w-md">
        <p className="text-sm sm:text-lg text-gray-700 break-all">
          <strong>Transaction ID:</strong> {txnid || "N/A"}
        </p>

        <p className="text-sm sm:text-lg text-gray-700 mt-2">
          <strong>Amount Paid:</strong> ₹{amount || "0"}
        </p>
      </div>

      <p className="mt-6 sm:mt-8 text-gray-600 text-xs sm:text-sm">
        Activating your subscription…
      </p>
    </div>
  );
}
