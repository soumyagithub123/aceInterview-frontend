// import { supabase } from "./supabaseClient";

// const KB_BUCKET = "knowledge-base";
// const API_BASE = import.meta.env.VITE_API_URL;

// if (!API_BASE) {
//   throw new Error("VITE_API_URL missing in .env");
// }

// // ===============================
// // GET USER KB ITEMS
// // ===============================
// export async function getUserKBItems() {
//   const {
//     data: { user },
//     error,
//   } = await supabase.auth.getUser();

//   if (error || !user) {
//     return { success: false, error: "Not authenticated" };
//   }

//   const res = await fetch(`${API_BASE}/api/kb/list/${user.id}`);
//   return await res.json();
// }

// // ===============================
// // UPLOAD FILE TO STORAGE ONLY
// // ===============================
// export async function uploadKBFile(file, userId) {
//   const ext = file.name.split(".").pop().toLowerCase();
//   const ts = Date.now();
//   const safeName = file.name
//     .replace(/\.[^/.]+$/, "")
//     .replace(/[^a-zA-Z0-9_-]/g, "_")
//     .slice(0, 40);

//   const filePath = `${userId}/${ts}_${safeName}.${ext}`;

//   const { error } = await supabase.storage
//     .from(KB_BUCKET)
//     .upload(filePath, file, {
//       contentType: file.type || "application/octet-stream",
//       upsert: false,
//     });

//   if (error) {
//     return { success: false, error: error.message };
//   }

//   const { data } = supabase.storage
//     .from(KB_BUCKET)
//     .getPublicUrl(filePath);

//   return {
//     success: true,
//     filePath,
//     fileUrl: data.publicUrl,
//   };
// }

// // ===============================
// // CREATE KB ENTRY (BACKEND ONLY)
// // ===============================
// export async function createKBItem(payload) {
//   const res = await fetch(`${API_BASE}/api/kb/create`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   return await res.json();
// }

// // ===============================
// // DELETE KB
// // ===============================
// export async function deleteKBItem(kbId) {
//   const res = await fetch(`${API_BASE}/api/kb/delete/${kbId}`, {
//     method: "DELETE",
//   });

//   return await res.json();
// }










// frontend/src/database/KnowledgeBaseService.js
// FIX: Private bucket support
// Ab file directly Supabase Storage pe nahi jaati
// Frontend → Backend (service role) → Supabase Storage (private)

import { supabase } from "./supabaseClient";

const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  throw new Error("VITE_API_URL missing in .env");
}

// ===============================
// HELPER: Get auth token
// ===============================
async function getAuthToken() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.access_token) {
    throw new Error("Not authenticated");
  }
  return session.access_token;
}

// ===============================
// GET USER KB ITEMS
// ===============================
export async function getUserKBItems() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { success: false, error: "Not authenticated" };
  }

  const token = await getAuthToken();
  const res = await fetch(`${API_BASE}/api/kb/list/${user.id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
}

// ===============================
// UPLOAD FILE — Backend ke through (Private Bucket Support)
// ===============================
// Pehle: Frontend → Supabase directly (public bucket only)
// Ab:    Frontend → Backend → Supabase (public + private dono kaam karte hain)
// ===============================
export async function uploadKBFile(file, userId) {
  try {
    const token = await getAuthToken();

    // FormData mein file aur metadata bhejo
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", userId);

    const res = await fetch(`${API_BASE}/api/kb/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Content-Type mat set karo — browser automatically multipart/form-data set karega
      },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: "Upload failed" }));
      return { success: false, error: err.detail || "Upload failed" };
    }

    return await res.json();
    // Returns: { success: true, filePath, fileUrl }

  } catch (err) {
    return { success: false, error: err.message };
  }
}

// ===============================
// CREATE KB ENTRY (BACKEND)
// ===============================
export async function createKBItem(payload) {
  const token = await getAuthToken();

  const res = await fetch(`${API_BASE}/api/kb/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  return await res.json();
}

// ===============================
// DELETE KB
// ===============================
export async function deleteKBItem(kbId) {
  const token = await getAuthToken();

  const res = await fetch(`${API_BASE}/api/kb/delete/${kbId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  return await res.json();
}