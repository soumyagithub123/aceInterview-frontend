// src/components/Payment/Pricing.jsx

import React, { useState, useEffect } from "react";
import Navbar from "../Landing/Navbar";
import Footer from "../Landing/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { useAppData } from "../../context/AppDataContext";

import { createOrder, verifyPayment } from "../../services/paymentService";
import { openRazorpayCheckout } from "../utils/razorpay";
import { Check, Crown, Zap, ArrowRight } from "lucide-react";

export default function Pricing() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { reloadAll, userProfile, quota } = useAppData();

  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [loading, setLoading] = useState(false);

  // Show message if redirected from locked feature
  const redirectMessage = location.state?.message;
  const redirectFeature = location.state?.feature;

  useEffect(() => {
    if (redirectMessage) {
      // Clear the state after showing
      window.history.replaceState({}, document.title);
    }
  }, [redirectMessage]);

  // ---------------------------------------------------------
  // RAZORPAY PAYMENT FLOW
  // ---------------------------------------------------------
  const startPayment = async (plan) => {
    try {
      if (!user) {
        alert("Please login to purchase a plan.");
        return navigate("/sign-in");
      }

      if (plan.key === 'free') {
        return alert("Free plan is already active.");
      }

      setLoading(plan.key);

      // 1️⃣ Create order from backend
      const order = await createOrder(plan.amountINR, plan.key, billingPeriod);

      // 2️⃣ Open Razorpay checkout
      await openRazorpayCheckout({
        orderId: order.order_id,
        amount: order.amount,
        description: `${plan.title} (${billingPeriod})`,
        userEmail: user.email,

        onSuccess: async (response) => {
          try {
            // 3️⃣ Verify payment with backend
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            // 4️⃣ Reload user data
            await reloadAll();

            // 5️⃣ Redirect to success
            navigate("/payment/success", {
              state: {
                plan: plan.key,
                amount: plan.amountINR,
                paymentId: response.razorpay_payment_id,
              },
            });
          } catch (err) {
            console.error("VERIFY ERROR:", err);
            navigate("/payment/failure");
          }
        },

        onFailure: () => {
          navigate("/payment/failure");
        },
      });
    } catch (err) {
      console.error("PAYMENT ERROR:", err);
      alert("Unable to start payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------
  // PRICING PLANS
  // ---------------------------------------------------------
  const plans = [
    {
      key: "free",
      title: "Free",
      subtitle: "For Job Hunters",
      badge: null,
      amountINR: 0,
      price: "₹0",
      period: "forever",
      features: [
        "5 Copilot Sessions/month",
        "2 Mock Interviews/month",
        "1 Persona",
        "Basic AI models",
        "Community support"
      ],
      buttonText: "Current Plan",
      buttonStyle: "border-2 border-gray-700 text-gray-400 cursor-not-allowed",
      cardStyle: "bg-gray-900 border-2 border-gray-800",
      popular: false,
    },
    {
      key: "basic",
      title: "Basic",
      subtitle: "For Active Interviewees",
      badge: "POPULAR",
      amountINR:
        billingPeriod === "yearly"
          ? 479
          : billingPeriod === "quarterly"
          ? 449
          : 499,
      price:
        billingPeriod === "yearly"
          ? "₹479"
          : billingPeriod === "quarterly"
          ? "₹449"
          : "₹499",
      period: billingPeriod === "yearly" 
        ? "/month (billed yearly)" 
        : billingPeriod === "quarterly"
        ? "/month (billed quarterly)"
        : "/month",
      features: [
        "50 Copilot Sessions/month",
        "20 Mock Interviews/month",
        "3 Personas",
        "Export transcripts",
        "Standard support",
        "All Free features"
      ],
      buttonText: "Get Started",
      buttonStyle: "bg-white text-black hover:bg-gray-100",
      cardStyle: "bg-gray-900 border-2 border-gray-700",
      popular: true,
    },
    {
      key: "pro",
      title: "Pro",
      subtitle: "For Offer Seekers",
      badge: "BEST VALUE",
      amountINR:
        billingPeriod === "yearly"
          ? 959
          : billingPeriod === "quarterly"
          ? 899
          : 999,
      price:
        billingPeriod === "yearly"
          ? "₹959"
          : billingPeriod === "quarterly"
          ? "₹899"
          : "₹999",
      period: billingPeriod === "yearly" 
        ? "/month (billed yearly)" 
        : billingPeriod === "quarterly"
        ? "/month (billed quarterly)"
        : "/month",
      features: [
        "Unlimited Copilot Sessions",
        "Unlimited Mock Interviews",
        "10 Personas",
        "Advanced AI models (GPT-4, Claude)",
        "All interview domains unlocked",
        "Priority support",
        "Custom response styles",
        "All Basic features"
      ],
      buttonText: "Go Pro",
      buttonStyle: "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700",
      cardStyle: "bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-2 border-purple-500/50",
      popular: false,
    },
  ];

  // Calculate savings
  const getSavings = (plan) => {
    if (plan.key === 'free') return null;
    
    const monthly = plan.key === 'basic' ? 499 : 999;
    const current = plan.amountINR;
    
    if (billingPeriod === 'yearly') {
      const totalMonthly = monthly * 12;
      const totalYearly = current * 12;
      const savings = totalMonthly - totalYearly;
      const percentage = Math.round((savings / totalMonthly) * 100);
      return { amount: savings, percentage };
    }
    
    if (billingPeriod === 'quarterly') {
      const totalMonthly = monthly * 3;
      const totalQuarterly = current * 3;
      const savings = totalMonthly - totalQuarterly;
      const percentage = Math.round((savings / totalMonthly) * 100);
      return { amount: savings, percentage };
    }
    
    return null;
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-gray-950 via-purple-950/20 to-black px-4">
        <div className="max-w-7xl mx-auto">

          {/* Redirect Message */}
          {redirectMessage && (
            <div className="mb-8 max-w-2xl mx-auto bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-6 text-center">
              <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-white text-xl font-bold mb-2">{redirectMessage}</h3>
              {redirectFeature && (
                <p className="text-gray-400 text-sm">
                  Upgrade to unlock <span className="text-white font-semibold">{redirectFeature}</span> and more premium features
                </p>
              )}
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-semibold">Simple, Transparent Pricing</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Choose Your Plan
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Start free, upgrade when you're ready. Cancel anytime.
            </p>

            {/* Current Plan Info */}
            {userProfile && (
              <div className="mt-6 inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2.5">
                <div className={`w-2 h-2 rounded-full ${
                  userProfile.subscription_status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                }`} />
                <span className="text-white/70 text-sm">
                  Current: <span className="font-semibold text-white capitalize">
                    {userProfile.subscription_tier}
                  </span>
                </span>
                {quota && (
                  <>
                    <span className="text-white/30">•</span>
                    <span className="text-white/70 text-sm">
                      {quota.copilot.total === -1 ? 'Unlimited' : `${quota.copilot.remaining}/${quota.copilot.total}`} sessions left
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-white/5 rounded-2xl p-1.5 gap-1.5 border border-white/10">
              {["monthly", "quarterly", "yearly"].map((period) => (
                <button
                  key={period}
                  onClick={() => setBillingPeriod(period)}
                  className={`relative px-6 py-3 rounded-xl font-semibold transition-all ${
                    billingPeriod === period
                      ? "bg-white text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {period === "yearly" && billingPeriod === period && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      SAVE 20%
                    </span>
                  )}
                  {period === "quarterly" && billingPeriod === period && (
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      SAVE 10%
                    </span>
                  )}
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {plans.map((plan) => {
              const savings = getSavings(plan);
              const isCurrentPlan = userProfile?.subscription_tier === plan.key;

              return (
                <div
                  key={plan.key}
                  className={`rounded-3xl p-8 relative ${plan.cardStyle} ${
                    plan.popular ? 'transform scale-105 shadow-2xl' : ''
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                      {plan.badge}
                    </div>
                  )}

                  {/* Current Plan Badge */}
                  {isCurrentPlan && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      ACTIVE
                    </div>
                  )}

                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{plan.title}</h3>
                    <p className="text-gray-400 text-sm">{plan.subtitle}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-white mb-1">
                      {plan.price}
                    </div>
                    <div className="text-gray-400 text-sm">{plan.period}</div>
                    {savings && (
                      <div className="mt-2 inline-flex items-center gap-1 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
                        <span className="text-green-400 text-xs font-semibold">
                          Save ₹{savings.amount} ({savings.percentage}%)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    disabled={loading === plan.key || isCurrentPlan}
                    onClick={() => startPayment(plan)}
                    className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                      loading === plan.key
                        ? "opacity-50 cursor-not-allowed"
                        : isCurrentPlan
                        ? plan.buttonStyle
                        : plan.buttonStyle + " shadow-lg"
                    }`}
                  >
                    {loading === plan.key ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing…
                      </>
                    ) : isCurrentPlan ? (
                      plan.buttonText
                    ) : (
                      <>
                        {plan.buttonText}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 text-left">
              <details className="bg-white/5 border border-white/10 rounded-xl p-6">
                <summary className="text-white font-semibold cursor-pointer">
                  Can I upgrade or downgrade my plan?
                </summary>
                <p className="text-gray-400 mt-3 text-sm">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </details>
              
              <details className="bg-white/5 border border-white/10 rounded-xl p-6">
                <summary className="text-white font-semibold cursor-pointer">
                  What payment methods do you accept?
                </summary>
                <p className="text-gray-400 mt-3 text-sm">
                  We accept all major credit/debit cards, UPI, net banking, and wallets through Razorpay.
                </p>
              </details>
              
              <details className="bg-white/5 border border-white/10 rounded-xl p-6">
                <summary className="text-white font-semibold cursor-pointer">
                  What happens when my subscription expires?
                </summary>
                <p className="text-gray-400 mt-3 text-sm">
                  Your account will automatically downgrade to the free plan. All your data remains safe.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}