// frontend/src/services/settingsService.js

import { supabase } from "../database/supabaseClient";

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:10000";

// ============================================================
// DEFAULT SETTINGS (used when user has no saved settings yet)
// ============================================================
const DEFAULT_SETTINGS = {
  audioLanguage: "English",
  pauseInterval: 2,
  advancedQuestionDetection: false,
  messageDirection: "bottom",
  autoScroll: true,
  programmingLanguage: "Python",
  interviewInstructions: "",
  codingInstructions: "",
  selectedResponseStyleId: null,
  defaultModel: "gpt-4o",
  codingModel: "gpt-4o",
  availableProviders: {},
};

// ============================================================
// DB row (snake_case) → app state (camelCase)
// ============================================================
function mapDbToSettings(row) {
  if (!row) return { ...DEFAULT_SETTINGS };
  return {
    audioLanguage:             row.audio_language              ?? DEFAULT_SETTINGS.audioLanguage,
    pauseInterval:             row.pause_interval              ?? DEFAULT_SETTINGS.pauseInterval,
    advancedQuestionDetection: row.advanced_question_detection ?? DEFAULT_SETTINGS.advancedQuestionDetection,
    messageDirection:          row.message_direction           ?? DEFAULT_SETTINGS.messageDirection,
    autoScroll:                row.auto_scroll                 ?? DEFAULT_SETTINGS.autoScroll,
    programmingLanguage:       row.programming_language        ?? DEFAULT_SETTINGS.programmingLanguage,
    interviewInstructions:     row.interview_instructions      ?? DEFAULT_SETTINGS.interviewInstructions,
    codingInstructions:        row.coding_instructions         ?? DEFAULT_SETTINGS.codingInstructions,
    selectedResponseStyleId:   row.selected_response_style_id  ?? DEFAULT_SETTINGS.selectedResponseStyleId,
    defaultModel:              row.default_model               ?? DEFAULT_SETTINGS.defaultModel,
    codingModel:               row.coding_model                ?? DEFAULT_SETTINGS.codingModel,
    availableProviders:        row.available_providers         ?? DEFAULT_SETTINGS.availableProviders,
  };
}

export const settingsService = {

  // ============================================================
  // ✅ REQUIRED BY AppDataContext
  // Loads settings from Supabase; returns safe defaults if no row
  // ============================================================
  loadSettingsWithFallback: async (userId) => {
    try {
      const { data, error } = await supabase
        .from("copilot_settings")
        .select("*")
        .eq("user_id", userId)
        .single();

      // PGRST116 = no row found — first-time user, return defaults
      if (error && error.code !== "PGRST116") {
        console.error("loadSettingsWithFallback DB error:", error);
        return { ...DEFAULT_SETTINGS };
      }

      return mapDbToSettings(data);
    } catch (err) {
      console.error("loadSettingsWithFallback error:", err);
      return { ...DEFAULT_SETTINGS };
    }
  },

  // ============================================================
  // ✅ REQUIRED BY SettingsModal — get raw DB row
  // ============================================================
  getUserSettings: async (userId) => {
    try {
      const { data, error } = await supabase
        .from("copilot_settings")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data || null;
    } catch (error) {
      console.error("getUserSettings error:", error);
      throw error;
    }
  },

  // ============================================================
  // ✅ REQUIRED BY SettingsModal — save / upsert settings
  // ============================================================
  saveUserSettings: async (userId, settingsPayload) => {
    try {
      const payload = {
        user_id:                     userId,
        audio_language:              settingsPayload.audioLanguage,
        pause_interval:              settingsPayload.pauseInterval,
        advanced_question_detection: settingsPayload.advancedQuestionDetection,
        message_direction:           settingsPayload.messageDirection,
        auto_scroll:                 settingsPayload.autoScroll,
        programming_language:        settingsPayload.programmingLanguage,
        interview_instructions:      settingsPayload.interviewInstructions,
        coding_instructions:         settingsPayload.codingInstructions,
        selected_response_style_id:  settingsPayload.selectedResponseStyleId,
        default_model:               settingsPayload.defaultModel,
        coding_model:                settingsPayload.codingModel,
        available_providers:         settingsPayload.availableProviders,
        updated_at:                  new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("copilot_settings")
        .upsert(payload, { onConflict: "user_id" })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("saveUserSettings error:", error);
      throw error;
    }
  },

  // ============================================================
  // ✅ REQUIRED BY SettingsModal — fetch live model availability
  // ============================================================
  getSystemModels: async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/models/status`);

      if (!res.ok) {
        throw new Error(`Models API returned ${res.status}`);
      }

      return await res.json();
      // Returns: { all_models, available_providers, providers, ... }
    } catch (error) {
      console.error("getSystemModels error:", error);
      throw error;
    }
  },
};