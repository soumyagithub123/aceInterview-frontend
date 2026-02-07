// src/components/utils/razorpay.js

/**
 * Load Razorpay script dynamically
 */
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Open Razorpay checkout modal
 * @param {Object} options
 * {
 *   orderId: string,
 *   amount: number (in paise),
 *   description: string,
 *   userEmail: string,
 *   onSuccess: function,
 *   onFailure: function
 * }
 */
export const openRazorpayCheckout = async ({
  orderId,
  amount,
  description,
  userEmail,
  onSuccess,
  onFailure,
}) => {
  // Load Razorpay script
  const loaded = await loadRazorpayScript();

  if (!loaded) {
    alert("Razorpay SDK failed to load. Please check your internet connection.");
    return;
  }

  // Get Razorpay key from environment
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

  if (!razorpayKey) {
    alert("Payment system not configured. Please contact support.");
    return;
  }

  const options = {
    key: razorpayKey,
    amount: amount, // Already in paise
    currency: "INR",
    name: "Interview Assistant",
    description: description || "Subscription Payment",
    order_id: orderId,
    prefill: {
      email: userEmail || "",
    },
    theme: {
      color: "#7c3aed", // Purple theme
    },
    modal: {
      ondismiss: function() {
        console.log("Checkout form closed by user");
        if (onFailure) onFailure();
      },
    },
    handler: function(response) {
      console.log("Payment successful:", response);
      if (onSuccess) onSuccess(response);
    },
  };

  const razorpay = new window.Razorpay(options);

  razorpay.on("payment.failed", function(response) {
    console.error("Payment failed:", response.error);
    alert(`Payment failed: ${response.error.description}`);
    if (onFailure) onFailure();
  });

  razorpay.open();
};