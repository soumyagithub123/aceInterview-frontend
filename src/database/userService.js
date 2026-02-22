// // frontend/src/database/userService.js

// import { supabase } from "./supabaseClient";
// import { BACKEND_URL } from "../components/utils/config";

// /**
//  * User Service - Simplified for Supabase Auth
//  * Note: User profiles are auto-created via database trigger on signup
//  */

// // ========================================
// // 🆕 NEW: Backend API Functions
// // ========================================

// /**
//  * Get user profile from backend API (includes subscription status)
//  */
// export const getUserProfile = async () => {
//   try {
//     const session = await supabase.auth.getSession();
//     const token = session?.data?.session?.access_token;

//     if (!token) {
//       return { success: false, error: "Not authenticated" };
//     }



//     const res = await fetch(`${BACKEND_URL}/api/users/me`, {
//       method: "GET",
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) {
//       const errorText = await res.text();
//       console.error("❌ Failed to fetch user profile:", res.status, errorText);
//       throw new Error(`Failed to fetch user profile: ${res.status} ${errorText}`);
//     }

//     const data = await res.json();
//     return { success: true, data };

//   } catch (error) {
//     console.error("Error fetching user profile from backend:", error);
//     return { success: false, error: error.message };
//   }
// };

// /**
//  * Get user quota from backend API
//  */
// export const getUserQuota = async () => {
//   try {
//     const session = await supabase.auth.getSession();
//     const token = session?.data?.session?.access_token;

//     if (!token) {
//       return { success: false, error: "Not authenticated" };
//     }



//     const res = await fetch(`${BACKEND_URL}/api/payments/quota`, {
//       method: "GET",
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch quota");
//     }

//     const data = await res.json();
//     return { success: true, data };

//   } catch (error) {
//     console.error("Error fetching quota from backend:", error);
//     return { success: false, error: error.message };
//   }
// };

// // ========================================
// // EXISTING FUNCTIONS (Keep as is)
// // ========================================

// /**
//  * Get current user profile
//  */
// export const getCurrentUserProfile = async () => {
//   try {
//     const { data: { user }, error: authError } = await supabase.auth.getUser();
    
//     if (authError || !user) {
//       return { success: false, error: 'Not authenticated' };
//     }

//     const { data, error } = await supabase
//       .from("users")
//       .select("*")
//       .eq("id", user.id)
//       .single();

//     if (error) throw error;
//     return { success: true, data };
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     return { success: false, error: error.message };
//   }
// };

// /**
//  * Update user profile
//  */
// export const updateUserProfile = async (updates) => {
//   try {
//     const { data: { user }, error: authError } = await supabase.auth.getUser();
    
//     if (authError || !user) {
//       return { success: false, error: 'Not authenticated' };
//     }

//     const { data, error } = await supabase
//       .from("users")
//       .update({
//         full_name: updates.fullName,
//         updated_at: new Date().toISOString(),
//       })
//       .eq("id", user.id)
//       .select();

//     if (error) throw error;
//     return { success: true, data: data[0] };
//   } catch (error) {
//     console.error("Error updating user profile:", error);
//     return { success: false, error: error.message };
//   }
// };

// /**
//  * Update user subscription
//  */
// export const updateUserSubscription = async (subscriptionData) => {
//   try {
//     const { data: { user }, error: authError } = await supabase.auth.getUser();
    
//     if (authError || !user) {
//       return { success: false, error: 'Not authenticated' };
//     }

//     const { data, error } = await supabase
//       .from("users")
//       .update({
//         subscription_tier: subscriptionData.tier,
//         subscription_status: subscriptionData.status,
//         subscription_start_date: subscriptionData.startDate,
//         subscription_end_date: subscriptionData.endDate,
//         updated_at: new Date().toISOString(),
//       })
//       .eq("id", user.id)
//       .select();

//     if (error) throw error;
//     return { success: true, data: data[0] };
//   } catch (error) {
//     console.error("Error updating subscription:", error);
//     return { success: false, error: error.message };
//   }
// };

// /**
//  * Get user usage statistics
//  */
// export const getUserUsageStats = async () => {
//   try {
//     const { data: { user }, error: authError } = await supabase.auth.getUser();
    
//     if (authError || !user) {
//       return { success: false, error: 'Not authenticated' };
//     }

//     const { data, error } = await supabase
//       .from("user_usage")
//       .select("*")
//       .eq("user_id", user.id)
//       .single();

//     if (error) throw error;
//     return { success: true, data };
//   } catch (error) {
//     console.error("Error fetching usage stats:", error);
//     return { success: false, error: error.message };
//   }
// };

// /**
//  * Increment usage count for current user
//  * usageType: "copilot_session" | "mock_interview"
//  */
// export const updateUserUsage = async (usageType) => {
//   try {
//     const { data: { user }, error: authError } = await supabase.auth.getUser();
    
//     if (authError || !user) {
//       return { success: false, error: 'Not authenticated' };
//     }

//     // Fetch current usage
//     const { data: currentUsage, error: fetchError } = await supabase
//       .from("user_usage")
//       .select("*")
//       .eq("user_id", user.id)
//       .single();

//     if (fetchError) throw fetchError;

//     let updateData = {};
//     if (usageType === "copilot_session") {
//       updateData = {
//         copilot_sessions_used: (currentUsage?.copilot_sessions_used || 0) + 1,
//       };
//     } else if (usageType === "mock_interview") {
//       updateData = {
//         mock_interviews_used: (currentUsage?.mock_interviews_used || 0) + 1,
//       };
//     } else {
//       throw new Error("Invalid usage type");
//     }

//     // Update usage
//     const { data, error } = await supabase
//       .from("user_usage")
//       .update({
//         ...updateData,
//         updated_at: new Date().toISOString(),
//       })
//       .eq("user_id", user.id)
//       .select();

//     if (error) throw error;
//     return { success: true, data: data[0] };
//   } catch (error) {
//     console.error("Error updating usage:", error);
//     return { success: false, error: error.message };
//   }
// };









// frontend/src/database/userService.js
// ✅ UPDATED: getSessionQuota function added

import { supabase } from "./supabaseClient";
import { BACKEND_URL } from "../components/utils/config";

// ========================================
// Backend API Functions
// ========================================

/**
 * Get user profile from backend API (includes subscription status)
 */
export const getUserProfile = async () => {
  try {
    const session = await supabase.auth.getSession();
    const token = session?.data?.session?.access_token;

    if (!token) {
      return { success: false, error: "Not authenticated" };
    }

    const res = await fetch(`${BACKEND_URL}/api/users/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Failed to fetch user profile:", res.status, errorText);
      throw new Error(`Failed to fetch user profile: ${res.status}`);
    }

    const data = await res.json();
    return { success: true, data };

  } catch (error) {
    console.error("Error fetching user profile from backend:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Get user quota (copilot + mock sessions) from backend API
 */
export const getUserQuota = async () => {
  try {
    const session = await supabase.auth.getSession();
    const token = session?.data?.session?.access_token;

    if (!token) {
      return { success: false, error: "Not authenticated" };
    }

    const res = await fetch(`${BACKEND_URL}/api/payments/quota`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch quota");
    }

    const data = await res.json();
    return { success: true, data };

  } catch (error) {
    console.error("Error fetching quota from backend:", error);
    return { success: false, error: error.message };
  }
};

/**
 * ✅ NEW: Get session quota from backend
 * Returns how many sessions user has used/remaining + duration limit
 * 
 * Response shape:
 * {
 *   plan_type: "basic",
 *   billing_period: "monthly",
 *   session_limit: 10,
 *   sessions_used: 3,
 *   sessions_remaining: 7,
 *   duration_limit_mins: 60,
 *   is_unlimited: false
 * }
 */
export const getSessionQuota = async (userId) => {
  try {
    if (!userId) {
      return { success: false, error: "No user ID provided" };
    }

    const res = await fetch(`${BACKEND_URL}/session/quota/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Session quota fetch failed: ${res.status}`);
    }

    const data = await res.json();
    return { success: true, data };

  } catch (error) {
    console.error("Error fetching session quota:", error);
    return { success: false, error: error.message };
  }
};

// ========================================
// Supabase Direct Functions (Keep as is)
// ========================================

export const getCurrentUserProfile = async () => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return { success: false, error: 'Not authenticated' };
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { success: false, error: error.message };
  }
};

export const updateUserProfile = async (updates) => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return { success: false, error: 'Not authenticated' };
    }

    const { data, error } = await supabase
      .from("users")
      .update({
        full_name: updates.fullName,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select();

    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { success: false, error: error.message };
  }
};

export const updateUserSubscription = async (subscriptionData) => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return { success: false, error: 'Not authenticated' };
    }

    const { data, error } = await supabase
      .from("users")
      .update({
        subscription_tier: subscriptionData.tier,
        subscription_status: subscriptionData.status,
        subscription_start_date: subscriptionData.startDate,
        subscription_end_date: subscriptionData.endDate,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select();

    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error("Error updating subscription:", error);
    return { success: false, error: error.message };
  }
};

export const getUserUsageStats = async () => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return { success: false, error: 'Not authenticated' };
    }

    const { data, error } = await supabase
      .from("user_usage")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching usage stats:", error);
    return { success: false, error: error.message };
  }
};

export const updateUserUsage = async (usageType) => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return { success: false, error: 'Not authenticated' };
    }

    const { data: currentUsage, error: fetchError } = await supabase
      .from("user_usage")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (fetchError) throw fetchError;

    let updateData = {};
    if (usageType === "copilot_session") {
      updateData = {
        copilot_sessions_used: (currentUsage?.copilot_sessions_used || 0) + 1,
      };
    } else if (usageType === "mock_interview") {
      updateData = {
        mock_interviews_used: (currentUsage?.mock_interviews_used || 0) + 1,
      };
    } else {
      throw new Error("Invalid usage type");
    }

    const { data, error } = await supabase
      .from("user_usage")
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .select();

    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error("Error updating usage:", error);
    return { success: false, error: error.message };
  }
};