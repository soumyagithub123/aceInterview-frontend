// import React, { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useAppData } from "../../context/AppDataContext";

// export default function PaymentSuccess() {
//   const navigate = useNavigate();
//   const [params] = useSearchParams();
//   const { reloadAll } = useAppData();

//   const txnid = params.get("txnid");
//   const amount = params.get("amount");

//   useEffect(() => {
//     const syncAndRedirect = async () => {
//       try {
//         // 🔄 Refresh subscription + user data
//         await reloadAll();
//       } catch (e) {
//         console.error("Post-payment refresh failed", e);
//       }

//       // ⏱️ Small delay for UX
//       setTimeout(() => {
//         navigate("/interview"); // 👈 jahan unlock dikhana ho
//       }, 3000); //1500
//     };

//     syncAndRedirect();
//   }, []);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

//         .ps-root {
//           min-height: 100vh;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           background: #f0fdf7;
//           font-family: 'Sora', sans-serif;
//           padding: 1.5rem;
//           position: relative;
//           overflow: hidden;
//         }

//         /* Soft radial background blob */
//         .ps-root::before {
//           content: '';
//           position: absolute;
//           width: 600px;
//           height: 600px;
//           border-radius: 50%;
//           background: radial-gradient(circle, #bbf7d0 0%, transparent 70%);
//           top: -150px;
//           left: 50%;
//           transform: translateX(-50%);
//           z-index: 0;
//           animation: pulse-blob 4s ease-in-out infinite;
//         }

//         @keyframes pulse-blob {
//           0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.6; }
//           50% { transform: translateX(-50%) scale(1.08); opacity: 1; }
//         }

//         .ps-card {
//           position: relative;
//           z-index: 1;
//           background: #ffffff;
//           border-radius: 24px;
//           padding: 2.5rem 2rem;
//           max-width: 440px;
//           width: 100%;
//           box-shadow: 0 8px 40px rgba(22, 163, 74, 0.12), 0 2px 8px rgba(0,0,0,0.04);
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 0;
//           animation: card-rise 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
//         }

//         @keyframes card-rise {
//           from { opacity: 0; transform: translateY(32px) scale(0.95); }
//           to   { opacity: 1; transform: translateY(0) scale(1); }
//         }

//         /* Animated checkmark circle */
//         .ps-check-wrap {
//           width: 80px;
//           height: 80px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #22c55e, #16a34a);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin-bottom: 1.25rem;
//           box-shadow: 0 0 0 0 rgba(34,197,94,0.4);
//           animation: ring-ping 1.8s ease-out 0.4s infinite;
//         }

//         @keyframes ring-ping {
//           0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.45); }
//           70%  { box-shadow: 0 0 0 18px rgba(34,197,94,0); }
//           100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
//         }

//         .ps-check-wrap svg {
//           animation: check-draw 0.5s cubic-bezier(0.4,0,0.2,1) 0.2s both;
//         }

//         @keyframes check-draw {
//           from { opacity: 0; transform: scale(0.5) rotate(-10deg); }
//           to   { opacity: 1; transform: scale(1) rotate(0deg); }
//         }

//         .ps-title {
//           font-size: 1.6rem;
//           font-weight: 700;
//           color: #15803d;
//           margin: 0 0 0.35rem;
//           letter-spacing: -0.02em;
//           text-align: center;
//           animation: fade-up 0.5s ease 0.35s both;
//         }

//         .ps-subtitle {
//           font-size: 0.875rem;
//           color: #6b7280;
//           text-align: center;
//           margin: 0 0 1.75rem;
//           animation: fade-up 0.5s ease 0.45s both;
//         }

//         @keyframes fade-up {
//           from { opacity: 0; transform: translateY(10px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }

//         .ps-details {
//           width: 100%;
//           background: #f8fffe;
//           border: 1px solid #d1fae5;
//           border-radius: 14px;
//           overflow: hidden;
//           animation: fade-up 0.5s ease 0.55s both;
//         }

//         .ps-detail-row {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 0.9rem 1.25rem;
//           gap: 1rem;
//         }

//         .ps-detail-row + .ps-detail-row {
//           border-top: 1px solid #d1fae5;
//         }

//         .ps-detail-label {
//           font-size: 0.78rem;
//           font-weight: 600;
//           color: #6b7280;
//           text-transform: uppercase;
//           letter-spacing: 0.06em;
//           white-space: nowrap;
//         }

//         .ps-detail-value {
//           font-family: 'JetBrains Mono', monospace;
//           font-size: 0.85rem;
//           font-weight: 500;
//           color: #111827;
//           word-break: break-all;
//           text-align: right;
//         }

//         .ps-amount-badge {
//           display: inline-flex;
//           align-items: center;
//           background: #dcfce7;
//           color: #15803d;
//           border-radius: 8px;
//           padding: 0.2rem 0.65rem;
//           font-size: 1rem;
//           font-weight: 700;
//           font-family: 'JetBrains Mono', monospace;
//         }

//         /* Loading bar at bottom */
//         .ps-loader-wrap {
//           margin-top: 1.75rem;
//           width: 100%;
//           animation: fade-up 0.5s ease 0.65s both;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 0.6rem;
//         }

//         .ps-loader-label {
//           font-size: 0.78rem;
//           color: #9ca3af;
//           letter-spacing: 0.04em;
//         }

//         .ps-loader-bar {
//           width: 100%;
//           height: 5px;
//           background: #e5e7eb;
//           border-radius: 99px;
//           overflow: hidden;
//         }

//         .ps-loader-fill {
//           height: 100%;
//           width: 0%;
//           background: linear-gradient(90deg, #22c55e, #86efac);
//           border-radius: 99px;
//           animation: fill-bar 1.5s cubic-bezier(0.4,0,0.2,1) 0.7s forwards;
//         }

//         @keyframes fill-bar {
//           from { width: 0%; }
//           to   { width: 100%; }
//         }

//         /* Confetti dots */
//         .ps-confetti {
//           position: absolute;
//           z-index: 0;
//           width: 10px;
//           height: 10px;
//           border-radius: 50%;
//           opacity: 0;
//           animation: confetti-fall 2s ease-in forwards;
//         }

//         @keyframes confetti-fall {
//           0%   { opacity: 1; transform: translateY(0) rotate(0deg); }
//           100% { opacity: 0; transform: translateY(120px) rotate(360deg); }
//         }

//         @media (max-width: 480px) {
//           .ps-title { font-size: 1.35rem; }
//           .ps-card  { padding: 2rem 1.25rem; }
//         }
//       `}</style>

//       <div className="ps-root">
//         {/* Decorative confetti dots */}
//         {[
//           {
//             left: "20%",
//             top: "18%",
//             color: "#86efac",
//             delay: "0.2s",
//             size: "10px",
//           },
//           {
//             left: "75%",
//             top: "14%",
//             color: "#fde68a",
//             delay: "0.4s",
//             size: "8px",
//           },
//           {
//             left: "60%",
//             top: "22%",
//             color: "#a5f3fc",
//             delay: "0.1s",
//             size: "12px",
//           },
//           {
//             left: "30%",
//             top: "12%",
//             color: "#f9a8d4",
//             delay: "0.6s",
//             size: "7px",
//           },
//           {
//             left: "85%",
//             top: "30%",
//             color: "#c4b5fd",
//             delay: "0.3s",
//             size: "9px",
//           },
//           {
//             left: "10%",
//             top: "28%",
//             color: "#fca5a5",
//             delay: "0.5s",
//             size: "8px",
//           },
//         ].map((dot, i) => (
//           <span
//             key={i}
//             className="ps-confetti"
//             style={{
//               left: dot.left,
//               top: dot.top,
//               width: dot.size,
//               height: dot.size,
//               background: dot.color,
//               animationDelay: dot.delay,
//             }}
//           />
//         ))}

//         <div className="ps-card">
//           {/* Check icon */}
//           <div className="ps-check-wrap">
//             <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
//               <polyline
//                 points="8,19 15,26 28,11"
//                 stroke="white"
//                 strokeWidth="3.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>

//           <h1 className="ps-title">Payment Successful!</h1>
//           <p className="ps-subtitle">Your subscription is being activated</p>

//           {/* Transaction details */}
//           <div className="ps-details">
//             <div className="ps-detail-row">
//               <span className="ps-detail-label">Transaction ID</span>
//               <span className="ps-detail-value">{txnid || "N/A"}</span>
//             </div>
//             <div className="ps-detail-row">
//               <span className="ps-detail-label">Amount Paid</span>
//               <span className="ps-amount-badge">₹{amount || "0"}</span>
//             </div>
//           </div>

//           {/* Progress bar */}
//           <div className="ps-loader-wrap">
//             <span className="ps-loader-label">Redirecting you shortly…</span>
//             <div className="ps-loader-bar">
//               <div className="ps-loader-fill" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }











import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../Auth/AuthContext";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { reloadAll } = useAppData();
  const { refreshSubscription } = useAuth(); // ✅ Force refresh subscription

  const txnid = params.get("txnid");
  const amount = params.get("amount");

  useEffect(() => {
    const syncAndRedirect = async () => {
      try {
        // ✅ CRITICAL: Force refresh subscription (bypasses cache)
        await refreshSubscription();
        
        // 🔄 Then reload app data
        await reloadAll();
        
        console.log("✅ Payment success: Subscription & data refreshed");
      } catch (e) {
        console.error("❌ Post-payment refresh failed", e);
      }

      // ⏱️ Small delay for UX
      setTimeout(() => {
        navigate("/interview"); // 👈 jahan unlock dikhana ho
      }, 3000);
    };

    syncAndRedirect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        .ps-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #f0fdf7;
          font-family: 'Sora', sans-serif;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        /* Soft radial background blob */
        .ps-root::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, #bbf7d0 0%, transparent 70%);
          top: -150px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 0;
          animation: pulse-blob 4s ease-in-out infinite;
        }

        @keyframes pulse-blob {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.6; }
          50% { transform: translateX(-50%) scale(1.08); opacity: 1; }
        }

        .ps-card {
          position: relative;
          z-index: 1;
          background: #ffffff;
          border-radius: 24px;
          padding: 2.5rem 2rem;
          max-width: 440px;
          width: 100%;
          box-shadow: 0 8px 40px rgba(22, 163, 74, 0.12), 0 2px 8px rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          animation: card-rise 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        @keyframes card-rise {
          from { opacity: 0; transform: translateY(32px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Animated checkmark circle */
        .ps-check-wrap {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          box-shadow: 0 0 0 0 rgba(34,197,94,0.4);
          animation: ring-ping 1.8s ease-out 0.4s infinite;
        }

        @keyframes ring-ping {
          0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.45); }
          70%  { box-shadow: 0 0 0 18px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }

        .ps-check-wrap svg {
          animation: check-draw 0.5s cubic-bezier(0.4,0,0.2,1) 0.2s both;
        }

        @keyframes check-draw {
          from { opacity: 0; transform: scale(0.5) rotate(-10deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        .ps-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #15803d;
          margin: 0 0 0.35rem;
          letter-spacing: -0.02em;
          text-align: center;
          animation: fade-up 0.5s ease 0.35s both;
        }

        .ps-subtitle {
          font-size: 0.875rem;
          color: #6b7280;
          text-align: center;
          margin: 0 0 1.75rem;
          animation: fade-up 0.5s ease 0.45s both;
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ps-details {
          width: 100%;
          background: #f8fffe;
          border: 1px solid #d1fae5;
          border-radius: 14px;
          overflow: hidden;
          animation: fade-up 0.5s ease 0.55s both;
        }

        .ps-detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.9rem 1.25rem;
          gap: 1rem;
        }

        .ps-detail-row + .ps-detail-row {
          border-top: 1px solid #d1fae5;
        }

        .ps-detail-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          white-space: nowrap;
        }

        .ps-detail-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          font-weight: 500;
          color: #111827;
          word-break: break-all;
          text-align: right;
        }

        .ps-amount-badge {
          display: inline-flex;
          align-items: center;
          background: #dcfce7;
          color: #15803d;
          border-radius: 8px;
          padding: 0.2rem 0.65rem;
          font-size: 1rem;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
        }

        /* Loading bar at bottom */
        .ps-loader-wrap {
          margin-top: 1.75rem;
          width: 100%;
          animation: fade-up 0.5s ease 0.65s both;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
        }

        .ps-loader-label {
          font-size: 0.78rem;
          color: #9ca3af;
          letter-spacing: 0.04em;
        }

        .ps-loader-bar {
          width: 100%;
          height: 5px;
          background: #e5e7eb;
          border-radius: 99px;
          overflow: hidden;
        }

        .ps-loader-fill {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #22c55e, #86efac);
          border-radius: 99px;
          animation: fill-bar 1.5s cubic-bezier(0.4,0,0.2,1) 0.7s forwards;
        }

        @keyframes fill-bar {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* Confetti dots */
        .ps-confetti {
          position: absolute;
          z-index: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          opacity: 0;
          animation: confetti-fall 2s ease-in forwards;
        }

        @keyframes confetti-fall {
          0%   { opacity: 1; transform: translateY(0) rotate(0deg); }
          100% { opacity: 0; transform: translateY(120px) rotate(360deg); }
        }

        @media (max-width: 480px) {
          .ps-title { font-size: 1.35rem; }
          .ps-card  { padding: 2rem 1.25rem; }
        }
      `}</style>

      <div className="ps-root">
        {/* Decorative confetti dots */}
        {[
          {
            left: "20%",
            top: "18%",
            color: "#86efac",
            delay: "0.2s",
            size: "10px",
          },
          {
            left: "75%",
            top: "14%",
            color: "#fde68a",
            delay: "0.4s",
            size: "8px",
          },
          {
            left: "60%",
            top: "22%",
            color: "#a5f3fc",
            delay: "0.1s",
            size: "12px",
          },
          {
            left: "30%",
            top: "12%",
            color: "#f9a8d4",
            delay: "0.6s",
            size: "7px",
          },
          {
            left: "85%",
            top: "30%",
            color: "#c4b5fd",
            delay: "0.3s",
            size: "9px",
          },
          {
            left: "10%",
            top: "28%",
            color: "#fca5a5",
            delay: "0.5s",
            size: "8px",
          },
        ].map((dot, i) => (
          <span
            key={i}
            className="ps-confetti"
            style={{
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              background: dot.color,
              animationDelay: dot.delay,
            }}
          />
        ))}

        <div className="ps-card">
          {/* Check icon */}
          <div className="ps-check-wrap">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <polyline
                points="8,19 15,26 28,11"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="ps-title">Payment Successful!</h1>
          <p className="ps-subtitle">Your subscription is being activated</p>

          {/* Transaction details */}
          <div className="ps-details">
            <div className="ps-detail-row">
              <span className="ps-detail-label">Transaction ID</span>
              <span className="ps-detail-value">{txnid || "N/A"}</span>
            </div>
            <div className="ps-detail-row">
              <span className="ps-detail-label">Amount Paid</span>
              <span className="ps-amount-badge">₹{amount || "0"}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="ps-loader-wrap">
            <span className="ps-loader-label">Redirecting you shortly…</span>
            <div className="ps-loader-bar">
              <div className="ps-loader-fill" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}