// // --------------------------------------------------
// // src/components/Payment/Pricing.jsx
// // PayU Payment (Same-tab redirect) – 100% popup-proof
// // --------------------------------------------------

// import React, { useState } from "react";
// import Navbar from "../Landing/Navbar";
// import Footer from "../Landing/Footer";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../Auth/AuthContext";

// import { createClient } from "@supabase/supabase-js";

// // Supabase Client
// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// );

// export default function Pricing() {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [billingPeriod, setBillingPeriod] = useState("quarterly");
//   const [loading, setLoading] = useState(false);

//   // ---------------------------------------------------------
//   // PAYMENT (Same Tab Redirect)
//   // ---------------------------------------------------------
//   const startPayment = async (plan) => {
//     try {
//       if (!user) {
//         alert("Please login to purchase a plan.");
//         return navigate("/sign-in");
//       }

//       setLoading(plan.key);

//       const payload = {
//         user_id: user.id,
//         plan: plan.key,
//         billing_period: billingPeriod,
//         amount: plan.amountINR.toString(),
//         firstname: user.user_metadata?.full_name || "User",
//         email: user.email,
//         phone: "9999999999",
//       };

//       const API_BASE = import.meta.env.DEV
//         ? "http://localhost:8000"
//         : import.meta.env.VITE_API_BASE_URL;

//       const res = await fetch(`${API_BASE}/payment/create`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!data?.form) {
//         console.error("PAYU ERROR:", data);
//         alert("Payment server error.");
//         setLoading(false);
//         return;
//       }

//       // ---- SAME TAB REDIRECT (No Popup Blocking) ----
//       const newDoc = document.open("text/html", "replace");
//       newDoc.write(data.form);
//       newDoc.close();

//       // No need to reset loading, page is replaced
//     } catch (err) {
//       console.error("PAYMENT ERROR:", err);
//       alert("Unable to process payment.");
//       setLoading(false);
//     }
//   };

//   // ---------------------------------------------------------
//   // PRICING PLANS
//   // ---------------------------------------------------------
//   const modernPlans = [
//     {
//       key: "free",
//       badge: "FREE",
//       badgeColor: "bg-indigo-600 text-white",
//       title: "For Job Hunters",
//       amountINR: 0,
//       price: "0",
//       originalPrice: null,
//       period: "/month",
//       features: [
//         "15-min Copilot Session x 3",
//         "AI Mock Interviews x 5",
//         "AI Resume Builder",
//         "Live Chat Support",
//       ],
//       buttonText: "Free",
//       buttonStyle: "border-2 border-gray-900 text-gray-900 hover:bg-gray-50",
//       cardStyle: "bg-white border-2 border-gray-200",
//     },
//     {
//       key: "standard",
//       badge: "STANDARD",
//       badgeColor: "bg-indigo-600 text-white",
//       title: "For Active Interviewees",
//       amountINR:
//         billingPeriod === "yearly"
//           ? 1445
//           : billingPeriod === "quarterly"
//           ? 3400
//           : 3825,
//       price:
//         billingPeriod === "yearly"
//           ? "14.45"
//           : billingPeriod === "quarterly"
//           ? "34"
//           : "38.25",
//       originalPrice:
//         billingPeriod === "yearly"
//           ? "17"
//           : billingPeriod === "quarterly"
//           ? "40"
//           : "45",
//       period: "/month",
//       features: [
//         "60-min Copilot Session x 5",
//         "Unlimited Mock Interviews",
//         "Question Banks",
//         "Interview Report",
//         "15 + AI Career Tools",
//         "Everything in Free",
//       ],
//       buttonText: "Get Started",
//       buttonStyle: "border-2 border-gray-900 text-gray-900 hover:bg-gray-50",
//       cardStyle: "bg-white border-2 border-gray-200",
//     },
//     {
//       key: "pro",
//       badge: "PRO",
//       badgeColor: "bg-yellow-400 text-gray-900",
//       title: "For Offer Seekers",
//       amountINR:
//         billingPeriod === "yearly"
//           ? 2550
//           : billingPeriod === "quarterly"
//           ? 5100
//           : 5950,
//       price:
//         billingPeriod === "yearly"
//           ? "25.5"
//           : billingPeriod === "quarterly"
//           ? "51"
//           : "59.5",
//       originalPrice:
//         billingPeriod === "yearly"
//           ? "30"
//           : billingPeriod === "quarterly"
//           ? "60"
//           : "70",
//       period: "/month",
//       features: [
//         "Unlimited 90-min Copilot Sessions",
//         "Unlimited Mock Interviews",
//         "Coding Copilot",
//         "Online Assessment Copilot",
//         "Industry Knowledge Add-Ons",
//         "Question Banks",
//         "Interview Report",
//         "Everything in Standard",
//       ],
//       buttonText: "Go Pro",
//       buttonStyle: "bg-white text-indigo-600 hover:bg-gray-50",
//       cardStyle: "bg-indigo-600 text-white",
//       bestValue: true,
//     },
//   ];

//   // ---------------------------------------------------------
//   // UI + PAYMENT BUTTON
//   // ---------------------------------------------------------
//   return (
//     <>
//       <Navbar />

//       <section className="min-h-screen py-24 bg-gradient-to-br from-surface-50 via-white to-primary-50/20">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <p className="text-primary-600 font-semibold mb-3 uppercase text-sm tracking-wide">
//               Pricing
//             </p>
//             <h2 className="text-4xl md:text-5xl font-bold text-surface-900 mb-4">
//               All-Inclusive Subscription
//             </h2>
//             <p className="text-surface-600 text-lg max-w-xl mx-auto">
//               Choose the plan that fits you best.
//             </p>
//           </div>

//           <div className="flex justify-center mb-16">
//             <div className="inline-flex bg-white rounded-2xl shadow-card p-1.5 gap-1">
//               {["yearly", "quarterly", "monthly"].map((period) => (
//                 <button
//                   key={period}
//                   onClick={() => setBillingPeriod(period)}
//                   className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
//                     billingPeriod === period
//                       ? "bg-primary-600 text-white shadow-lg"
//                       : "text-surface-600 hover:bg-surface-50"
//                   }`}
//                 >
//                   {period.charAt(0).toUpperCase() + period.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//             {modernPlans.map((plan, i) => (
//               <div
//                 key={i}
//                 className={`rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 ${
//                   plan.bestValue
//                     ? "bg-primary-600 text-white shadow-card-lg ring-2 ring-primary-400 ring-offset-4 ring-offset-white scale-[1.02]"
//                     : "bg-white border border-surface-200 shadow-card hover:shadow-card-hover"
//                 }`}
//               >
//                 <span className={`${plan.badgeColor} inline-block px-4 py-1.5 rounded-xl text-xs font-bold`}>
//                   {plan.badge}
//                 </span>

//                 <h3 className="text-xl font-semibold mt-5 mb-2">{plan.title}</h3>

//                 <div className="mb-8">
//                   {plan.originalPrice && (
//                     <span className={`text-xl mr-2 ${plan.bestValue ? "text-white/70" : "text-surface-400"}`}>
//                       <span className="line-through">${plan.originalPrice}</span>
//                     </span>
//                   )}
//                   <span className="text-5xl font-bold">{plan.price}</span>
//                   <span className={`ml-1 ${plan.bestValue ? "text-white/90" : "text-surface-600"}`}>
//                     {plan.period}
//                   </span>
//                 </div>

//                 <ul className="space-y-4 mb-8">
//                   {plan.features.map((f, j) => (
//                     <li key={j} className="flex items-start gap-3">
//                       <span className={plan.bestValue ? "text-white" : "text-primary-600"}>✔</span>
//                       <span className={plan.bestValue ? "text-white/95" : "text-surface-700"}>{f}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 <button
//                   disabled={loading === plan.key}
//                   onClick={() => startPayment(plan)}
//                   className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
//                     loading === plan.key
//                       ? "opacity-50 cursor-not-allowed"
//                       : plan.bestValue
//                       ? "bg-white text-primary-600 hover:bg-surface-50"
//                       : "border-2 border-surface-900 text-surface-900 hover:bg-surface-50"
//                   }`}
//                 >
//                   {loading === plan.key ? "Processing…" : plan.buttonText} →
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// }
// frontend/src/components/Payment/Pricing.jsx
// import React, { useState } from "react";
// import Navbar from "../Landing/Navbar";
// import Footer from "../Landing/Footer";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../Auth/AuthContext";

// export default function Pricing() {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [billingPeriod, setBillingPeriod] = useState("quarterly");
//   const [loading, setLoading] = useState(false);

//   // ---------------------------------------------------------
//   // RAZORPAY PAYMENT
//   // ---------------------------------------------------------
//   const startRazorpayPayment = (plan) => {
//     if (!user) {
//       alert("Please login to purchase a plan.");
//       return navigate("/sign-in");
//     }

//     setLoading(plan.key);

//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY, // Razorpay API key
//       amount: plan.amountINR * 100, // in paise
//       currency: "INR",
//       name: "Interview AI",
//       description: plan.title,
//       handler: function (response) {
//         // Payment success
//         navigate(
//           `/payment-success?txnid=${response.razorpay_payment_id}&amount=${plan.amountINR}`
//         );
//       },
//       modal: {
//         escape: true,
//         ondismiss: function () {
//           navigate("/payment-failure");
//         },
//       },
//       prefill: {
//         name: user.user_metadata?.full_name || "User",
//         email: user.email,
//         contact: "9999999999",
//       },
//       theme: { color: "#6366F1" },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//     setLoading(false);
//   };

//   // ---------------------------------------------------------
//   // PRICING PLANS
//   // ---------------------------------------------------------
//   const modernPlans = [
//     {
//       key: "free",
//       badge: "FREE",
//       badgeColor: "bg-indigo-600 text-white",
//       title: "For Job Hunters",
//       amountINR: 0,
//       price: "0",
//       period: "/month",
//       features: [
//         "15-min Copilot Session x 3",
//         "AI Mock Interviews x 5",
//         "AI Resume Builder",
//         "Live Chat Support",
//       ],
//       buttonText: "Free",
//       buttonStyle:
//         "border-2 border-gray-900 text-gray-900 hover:bg-gray-50",
//       cardStyle: "bg-white border-2 border-gray-200",
//     },
//     {
//       key: "standard",
//       badge: "STANDARD",
//       badgeColor: "bg-indigo-600 text-white",
//       title: "For Active Interviewees",
//       amountINR:
//         billingPeriod === "yearly"
//           ? 1445
//           : billingPeriod === "quarterly"
//           ? 3400
//           : 3825,
//       price:
//         billingPeriod === "yearly"
//           ? "14.45"
//           : billingPeriod === "quarterly"
//           ? "34"
//           : "38.25",
//       period: "/month",
//       features: [
//         "60-min Copilot Session x 5",
//         "Unlimited Mock Interviews",
//         "Question Banks",
//         "Interview Report",
//         "15 + AI Career Tools",
//         "Everything in Free",
//       ],
//       buttonText: "Get Started",
//       buttonStyle:
//         "border-2 border-gray-900 text-gray-900 hover:bg-gray-50",
//       cardStyle: "bg-white border-2 border-gray-200",
//     },
//     {
//       key: "pro",
//       badge: "PRO",
//       badgeColor: "bg-yellow-400 text-gray-900",
//       title: "For Offer Seekers",
//       amountINR:
//         billingPeriod === "yearly"
//           ? 2550
//           : billingPeriod === "quarterly"
//           ? 5100
//           : 5950,
//       price:
//         billingPeriod === "yearly"
//           ? "25.5"
//           : billingPeriod === "quarterly"
//           ? "51"
//           : "59.5",
//       period: "/month",
//       features: [
//         "Unlimited 90-min Copilot Sessions",
//         "Unlimited Mock Interviews",
//         "Coding Copilot",
//         "Online Assessment Copilot",
//         "Industry Knowledge Add-Ons",
//         "Question Banks",
//         "Interview Report",
//         "Everything in Standard",
//       ],
//       buttonText: "Go Pro",
//       buttonStyle: "bg-white text-indigo-600 hover:bg-gray-50",
//       cardStyle: "bg-indigo-600 text-white",
//       bestValue: true,
//     },
//   ];

//   // ---------------------------------------------------------
//   // UI + PAYMENT BUTTON
//   // ---------------------------------------------------------
//   return (
//     <>
//       <Navbar />

//       <section className="min-h-screen py-24 bg-gradient-to-br from-surface-50 via-white to-primary-50/20">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <p className="text-primary-600 font-semibold mb-3 uppercase text-sm tracking-wide">
//               Pricing
//             </p>
//             <h2 className="text-4xl md:text-5xl font-bold text-surface-900 mb-4">
//               All-Inclusive Subscription
//             </h2>
//             <p className="text-surface-600 text-lg max-w-xl mx-auto">
//               Choose the plan that fits you best.
//             </p>
//           </div>

//           <div className="flex justify-center mb-16">
//             <div className="inline-flex bg-white rounded-2xl shadow-card p-1.5 gap-1">
//               {["yearly", "quarterly", "monthly"].map((period) => (
//                 <button
//                   key={period}
//                   onClick={() => setBillingPeriod(period)}
//                   className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
//                     billingPeriod === period
//                       ? "bg-primary-600 text-white shadow-lg"
//                       : "text-surface-600 hover:bg-surface-50"
//                   }`}
//                 >
//                   {period.charAt(0).toUpperCase() + period.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//             {modernPlans.map((plan, i) => (
//               <div
//                 key={i}
//                 className={`rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 ${
//                   plan.bestValue
//                     ? "bg-primary-600 text-white shadow-card-lg ring-2 ring-primary-400 ring-offset-4 ring-offset-white scale-[1.02]"
//                     : "bg-white border border-surface-200 shadow-card hover:shadow-card-hover"
//                 }`}
//               >
//                 <span
//                   className={`${plan.badgeColor} inline-block px-4 py-1.5 rounded-xl text-xs font-bold`}
//                 >
//                   {plan.badge}
//                 </span>

//                 <h3 className="text-xl font-semibold mt-5 mb-2">{plan.title}</h3>

//                 <div className="mb-8">
//                   <span className="text-5xl font-bold">{plan.price}</span>
//                   <span className={`ml-1 ${plan.bestValue ? "text-white/90" : "text-surface-600"}`}>
//                     {plan.period}
//                   </span>
//                 </div>

//                 <ul className="space-y-4 mb-8">
//                   {plan.features.map((f, j) => (
//                     <li key={j} className="flex items-start gap-3">
//                       <span className={plan.bestValue ? "text-white" : "text-primary-600"}>✔</span>
//                       <span className={plan.bestValue ? "text-white/95" : "text-surface-700"}>
//                         {f}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>

//                 <button
//                   disabled={loading === plan.key}
//                   onClick={() => startRazorpayPayment(plan)}
//                   className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
//                     loading === plan.key
//                       ? "opacity-50 cursor-not-allowed"
//                       : plan.bestValue
//                       ? "bg-white text-primary-600 hover:bg-surface-50"
//                       : "border-2 border-surface-900 text-surface-900 hover:bg-surface-50"
//                   }`}
//                 >
//                   {loading === plan.key ? "Processing…" : plan.buttonText} →
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// }
// frontend/src/components/Payment/Pricing.jsx
// frontend/src/components/Payment/Pricing.jsx
import React, { useState } from "react";
import Navbar from "../Landing/Navbar";
import Footer from "../Landing/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

export default function Pricing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState("quarterly");
  const [loading, setLoading] = useState(false);

  // ---------------------------------------------------------
  // LOAD RAZORPAY SCRIPT
  // ---------------------------------------------------------
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ---------------------------------------------------------
  // RAZORPAY PAYMENT
  // ---------------------------------------------------------
  const startRazorpayPayment = async (plan) => {
    if (!user) {
      alert("Please login to purchase a plan.");
      return navigate("/sign-in");
    }

    setLoading(plan.key);

    const razorpayLoaded = await loadRazorpayScript();
    if (!razorpayLoaded) {
      alert("Failed to load Razorpay. Please try again.");
      setLoading(false);
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: plan.amountINR * 100,
      currency: "INR",
      name: "Interview AI",
      description: plan.title,
      handler: function (response) {
        navigate(
          `/payment-success?txnid=${response.razorpay_payment_id}&amount=${plan.amountINR}`
        );
      },
      modal: {
        escape: true,
        ondismiss: function () {
          navigate(`/payment-failure?txnid=N/A&amount=${plan.amountINR}`);
        },
      },
      prefill: {
        name: user.user_metadata?.full_name || "User",
        email: user.email,
        contact: "9999999999",
      },
      theme: { color: "#6366F1" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  // ---------------------------------------------------------
  // PRICING PLANS
  // ---------------------------------------------------------
  const modernPlans = [
    {
      key: "free",
      badge: "FREE",
      badgeColor: "bg-indigo-600 text-white",
      title: "For Job Hunters",
      amountINR: 0,
      price: "0",
      period: "/month",
      features: [
        "15-min Copilot Session x 3",
        "AI Mock Interviews x 5",
        "AI Resume Builder",
        "Live Chat Support",
      ],
      buttonText: "Free",
    },
    {
      key: "standard",
      badge: "STANDARD",
      badgeColor: "bg-indigo-600 text-white",
      title: "For Active Interviewees",
      amountINR:
        billingPeriod === "yearly"
          ? 1445
          : billingPeriod === "quarterly"
          ? 3400
          : 3825,
      price:
        billingPeriod === "yearly"
          ? "14.45"
          : billingPeriod === "quarterly"
          ? "34"
          : "38.25",
      period: "/month",
      features: [
        "60-min Copilot Session x 5",
        "Unlimited Mock Interviews",
        "Question Banks",
        "Interview Report",
        "15 + AI Career Tools",
        "Everything in Free",
      ],
      buttonText: "Get Started",
    },
    {
      key: "pro",
      badge: "PRO",
      badgeColor: "bg-yellow-400 text-gray-900",
      title: "For Offer Seekers",
      amountINR:
        billingPeriod === "yearly"
          ? 2550
          : billingPeriod === "quarterly"
          ? 5100
          : 5950,
      price:
        billingPeriod === "yearly"
          ? "25.5"
          : billingPeriod === "quarterly"
          ? "51"
          : "59.5",
      period: "/month",
      features: [
        "Unlimited 90-min Copilot Sessions",
        "Unlimited Mock Interviews",
        "Coding Copilot",
        "Online Assessment Copilot",
        "Industry Knowledge Add-Ons",
        "Question Banks",
        "Interview Report",
        "Everything in Standard",
      ],
      buttonText: "Go Pro",
      bestValue: true,
    },
  ];

  // ---------------------------------------------------------
  // UI + PAYMENT BUTTON
  // ---------------------------------------------------------
  return (
    <>
      <Navbar />

      <section className="min-h-screen py-32 bg-gradient-to-br from-surface-50 via-white to-primary-50/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* <p className="text-primary-600 font-semibold mb-3 uppercase text-sm tracking-wide">
              Pricing
            </p> */}
            <h2 className="text-4xl md:text-5xl font-bold text-surface-900 mb-4">
              All-Inclusive Subscription
            </h2>
            <p className="text-surface-600 text-lg max-w-xl mx-auto">
              Choose the plan that fits you best.
            </p>
          </div>

          {/* ----------------- BILLING PERIOD SWITCH ----------------- */}
          <div className="flex justify-center mb-16">
            <div className="relative w-96 bg-gray-200 rounded-full p-1 flex items-center">
              {["monthly", "quarterly", "yearly"].map((period, idx) => (
                <button
                  key={period}
                  onClick={() => setBillingPeriod(period)}
                 className={`flex-1 text-center py-2.5 font-semibold rounded-full transition-all duration-300 relative z-10 focus:outline-none focus:ring-0 active:outline-none active:ring-0 ${
  billingPeriod === period ? "text-white" : "text-gray-700"
 }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
              {/* Sliding Background */}
              <div
                className={`absolute top-0 left-1 w-1/3 h-14 bg-primary-600 rounded-full transition-all duration-300`}
                style={{
                  transform:
                    billingPeriod === "monthly"
                      ? "translateX(0%)"
                      : billingPeriod === "quarterly"
                      ? "translateX(100%)"
                      : "translateX(200%)",
                }}
              />
            </div>
          </div>

          {/* ----------------- PLANS ----------------- */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {modernPlans.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-3xl p-8 shadow-2xl transition-transform duration-300 transform  ${
                  
                  plan.bestValue
                    ? "bg-primary-600 text-white"
                    : "bg-white text-surface-900"
                }`}
                style={{
                  boxShadow:
                    plan.bestValue
                      ? "0 15px 35px rgba(99, 102, 241, 0.5)"
                      : "0 10px 25px rgba(0,0,0,0.15)",
                }}
              >
                <span
                  className={`${plan.badgeColor} inline-block px-4 py-1.5 rounded-xl text-xs font-bold`}
                >
                  {plan.badge}
                </span>

                <h3 className="text-xl font-semibold mt-5 mb-2">{plan.title}</h3>

                <div className="mb-8">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span
                    className={`ml-1 ${
                      plan.bestValue ? "text-white/90" : "text-surface-600"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span
                        className={plan.bestValue ? "text-white" : "text-primary-600"}
                      >
                        ✔
                      </span>
                      <span
                        className={plan.bestValue ? "text-white/95" : "text-surface-700"}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  disabled={loading === plan.key}
                  onClick={() => startRazorpayPayment(plan)}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
                    loading === plan.key
                      ? "opacity-50 cursor-not-allowed"
                      : plan.bestValue
                      ? "bg-white text-primary-600"
                      : "border-2 border-surface-900 text-surface-900"
                  }`}
                >
                  {loading === plan.key ? "Processing…" : plan.buttonText} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
