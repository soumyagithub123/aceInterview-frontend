import React, { createContext, useContext, useState, useEffect } from 'react';

// Initial default settings
const DEFAULT_SETTINGS = {
  // Response Style
  selectedResponseStyleId: null,
  responseStyle: 'professional',
  
  // Audio Transcription
  audioLanguage: 'English',
  pauseInterval: 2.0,
  advancedQuestionDetection: true,
  
  // Models
  defaultModel: 'gpt-4o-mini',
  codingModel: 'gpt-4o-mini',
  
  // Advanced Settings
  messageDirection: 'bottom',
  autoScroll: true,
  programmingLanguage: 'Python',
  
  // Status for UI
  deepgramStatus: 'Ready',
  qaStatus: 'Ready',
  isGenerating: false,
  isPaused: false
};

// Create context
const CopilotSettingsContext = createContext();

// Context Provider component
export function CopilotSettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    // Load from localStorage on initial load
    try {
      const saved = localStorage.getItem('copilotSettings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Save to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem('copilotSettings', JSON.stringify(settings));
  }, [settings]);

  // Update individual setting
  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Update multiple settings at once
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Reset to defaults
  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const value = {
    // Current settings
    settings,
    
    // Update functions
    updateSetting,
    updateSettings,
    resetSettings,
    
    // Direct setters for common use cases
    setResponseStyle: (style) => updateSetting('selectedResponseStyleId', style),
    setAudioLanguage: (language) => updateSetting('audioLanguage', language),
    setPauseInterval: (interval) => updateSetting('pauseInterval', interval),
    setDefaultModel: (model) => updateSetting('defaultModel', model),
    setCodingModel: (model) => updateSetting('codingModel', model),
    setProgrammingLanguage: (language) => updateSetting('programmingLanguage', language),
    
    // Status setters
    setDeepgramStatus: (status) => updateSetting('deepgramStatus', status),
    setQaStatus: (status) => updateSetting('qaStatus', status),
    setIsGenerating: (generating) => updateSetting('isGenerating', generating),
    setIsPaused: (paused) => updateSetting('isPaused', paused)
  };

  return (
    <CopilotSettingsContext.Provider value={value}>
      {children}
    </CopilotSettingsContext.Provider>
  );
}

// Hook to use the context
export function useCopilotSettings() {
  const context = useContext(CopilotSettingsContext);
  if (!context) {
    throw new Error('useCopilotSettings must be used within a CopilotSettingsProvider');
  }
  return context;
}

export default CopilotSettingsContext;
