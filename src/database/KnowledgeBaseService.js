import { supabase } from "./supabaseClient";

const KB_BUCKET = "knowledge-base";
const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  throw new Error("VITE_API_URL missing in .env");
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

  const res = await fetch(`${API_BASE}/api/kb/list/${user.id}`);
  return await res.json();
}

// ===============================
// UPLOAD FILE TO STORAGE ONLY
// ===============================
export async function uploadKBFile(file, userId) {
  const ext = file.name.split(".").pop().toLowerCase();
  const ts = Date.now();
  const safeName = file.name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .slice(0, 40);

  const filePath = `${userId}/${ts}_${safeName}.${ext}`;

  const { error } = await supabase.storage
    .from(KB_BUCKET)
    .upload(filePath, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

  if (error) {
    return { success: false, error: error.message };
  }

  const { data } = supabase.storage
    .from(KB_BUCKET)
    .getPublicUrl(filePath);

  return {
    success: true,
    filePath,
    fileUrl: data.publicUrl,
  };
}

// ===============================
// CREATE KB ENTRY (BACKEND ONLY)
// ===============================
export async function createKBItem(payload) {
  const res = await fetch(`${API_BASE}/api/kb/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return await res.json();
}

// ===============================
// DELETE KB
// ===============================
export async function deleteKBItem(kbId) {
  const res = await fetch(`${API_BASE}/api/kb/delete/${kbId}`, {
    method: "DELETE",
  });

  return await res.json();
}
