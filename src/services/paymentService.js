// src/services/paymentService.js

import { BACKEND_URL } from "../components/utils/config";
import { supabase } from "../database/supabaseClient";

/**
 * Create Razorpay order via backend
 * @param {number} amount - amount in INR
 * @param {string} plan - plan name (basic/pro)
 * @param {string} billingPeriod - monthly/quarterly/yearly
 */
export async function createOrder(amount, plan, billingPeriod = "monthly") {
  const session = await supabase.auth.getSession();
  const token = session?.data?.session?.access_token;

  if (!token) {
    throw new Error("User not authenticated");
  }

  const res = await fetch(`${BACKEND_URL}/api/payments/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      amount,
      plan,
      billing_period: billingPeriod,
      currency: "INR",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Create order failed: ${err}`);
  }

  return res.json();
}

/**
 * Verify Razorpay payment via backend
 * @param {Object} payload
 * {
 *   razorpay_order_id,
 *   razorpay_payment_id,
 *   razorpay_signature
 * }
 */
export async function verifyPayment(payload) {
  const session = await supabase.auth.getSession();
  const token = session?.data?.session?.access_token;

  if (!token) {
    throw new Error("User not authenticated");
  }

  const res = await fetch(`${BACKEND_URL}/api/payments/verify-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Payment verification failed: ${err}`);
  }

  return res.json();
}

/**
 * Get payment history
 */
export async function getPaymentHistory() {
  const session = await supabase.auth.getSession();
  const token = session?.data?.session?.access_token;

  if (!token) {
    throw new Error("User not authenticated");
  }

  const res = await fetch(`${BACKEND_URL}/api/payments/history`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch payment history: ${err}`);
  }

  return res.json();
}

/**
 * Get user quota
 */
export async function getUserQuota() {
  const session = await supabase.auth.getSession();
  const token = session?.data?.session?.access_token;

  if (!token) {
    throw new Error("User not authenticated");
  }

  const res = await fetch(`${BACKEND_URL}/api/payments/quota`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch quota: ${err}`);
  }

  return res.json();
}