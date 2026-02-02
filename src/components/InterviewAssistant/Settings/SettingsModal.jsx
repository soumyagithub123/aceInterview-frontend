// src/components/InterviewAssistent/SettingsModal.jsx

import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../../Auth/AuthContext';
import { responseStyleService } from '../../../services/responseStyleService';
import { settingsService } from '../../../services/settingsService';

// Global app data context (preloaded on login)
import { useAppData } from '../../../context/AppDataContext';

// Imported Components
import ResponseStyleTab from './ResponseStyleTab';
import StyleCustomizationModal from './StyleCustomizationModal';
import AudioTranscriptionTab from './AudioTranscriptionTab';
import ModelsTab from './ModelsTab';
import AdvancedSettingsTab from './AdvancedSettingsTab';

export default function SettingsModal({ onClose }) {
  const { user } = useAuth();

  // Global data from provider
  const { settings, styles, loading: globalLoading, reloadAll } = useAppData();

  // Local UI state
  const [activeTab, setActiveTab] = useState("responseStyle");

  const [defaultModel, setDefaultModel] = useState("gpt-4o");
  const [codingModel, setCodingModel] = useState("gpt-4o");
  const [availableProviders, setAvailableProviders] = useState({});

  const [responseStyles, setResponseStyles] = useState([]);
  const [selectedStyleId, setSelectedStyleId] = useState(null);

  const [showStyleModal, setShowStyleModal] = useState(false);
  const [editingStyle, setEditingStyle] = useState(null);

  const [audioLanguage, setAudioLanguage] = useState('English');
  const [pauseInterval, setPauseInterval] = useState(2);
  const [advancedQuestionDetection, setAdvancedQuestionDetection] = useState(false);

  const [messageDirection, setMessageDirection] = useState('bottom');
  const [autoScroll, setAutoScroll] = useState(true);

  const [programmingLanguage, setProgrammingLanguage] = useState('Python');
  const [interviewInstructions, setInterviewInstructions] = useState('');
  const [codingInstructions, setCodingInstructions] = useState('');

  const [loading, setLoading] = useState(true); // local loading for UX while mapping
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const MODEL_LABELS = {
    "gpt-3.0-mini": "GPT-3.0 Mini",
    "gpt-3.0": "GPT-3.0",
    "gpt-3.1-mini": "GPT-3.1 Mini",
    "gpt-3.1": "GPT-3.1",
    "gpt-4.1-mini": "GPT-4.1 Mini",
    "gpt-4.1": "GPT-4.1",
    "gpt-4o-mini": "GPT-4o Mini",
    "gpt-4o": "GPT-4o",
    "gpt-o1-mini": "GPT-o1 Mini",
    "gemini-1.5-flash": "Gemini 1.5 Flash",
    "gemini-1.5-pro": "Gemini 1.5 Pro",
    "gemini-2.0-flash": "Gemini 2.0 Flash",
    "gemini-2.0-flash-lite": "Gemini 2.0 Flash Lite",
    "gemini-2.0-pro": "Gemini 2.0 Pro",
    "ollama": "Ollama (Local)"
  };

  // Map global context -> local UI state once data is available
  useEffect(() => {
    // If global data still loading, reflect it locally
    if (globalLoading) {
      setLoading(true);
      return;
    }

    // If no user or no settings, set defaults and stop
    if (!user || !settings) {
      setAudioLanguage('English');
      setPauseInterval(2);
      setAdvancedQuestionDetection(false);
      setMessageDirection('bottom');
      setAutoScroll(true);
      setProgrammingLanguage('Python');
      setInterviewInstructions('');
      setCodingInstructions('');
      setSelectedStyleId(null);
      setResponseStyles([]);
      setAvailableProviders({});
      setDefaultModel('gpt-4o');
      setCodingModel('gpt-4o');
      setLoading(false);
      return;
    }

    // Populate UI from settings
    setAudioLanguage(settings.audioLanguage ?? 'English');
    setPauseInterval(settings.pauseInterval ?? 2);
    setAdvancedQuestionDetection(settings.advancedQuestionDetection ?? false);
    setMessageDirection(settings.messageDirection ?? 'bottom');
    setAutoScroll(settings.autoScroll ?? true);
    setProgrammingLanguage(settings.programmingLanguage ?? 'Python');
    setInterviewInstructions(settings.interviewInstructions ?? '');
    setCodingInstructions(settings.codingInstructions ?? '');

    if (settings.defaultModel) setDefaultModel(settings.defaultModel);
    if (settings.codingModel) setCodingModel(settings.codingModel);

    setSelectedStyleId(settings.selectedResponseStyleId ?? null);

    // Styles from context
    setResponseStyles(styles || []);

    // availableProviders may be stored inside settings.availableProviders; fallback to defaults
    const modelProviders = settings.availableProviders || {};
    const merged = {};
    Object.keys(MODEL_LABELS).forEach(m => {
      merged[m] = modelProviders[m] !== undefined ? modelProviders[m] : true;
    });
    setAvailableProviders(merged);

    setLoading(false);
  }, [globalLoading, settings, styles, user]);

  // Save handler (saves to DB via settingsService, then reload global cache)
  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    setMessage({ type: '', text: '' });

    // 🔥 DETAILED CONFIGURATION LOG
    // Ye log tab dikhega jab saari fields validate ho chuki hongi
    console.group("🚀 Saving Main Settings...");
    console.log("User ID:", user.id);
    
    console.table({
      "Default Model": defaultModel,
      "Coding Model": codingModel,
      "Audio Language": audioLanguage,
      "Pause Interval": pauseInterval + " seconds",
      "Adv. Question Detection": advancedQuestionDetection ? "ON" : "OFF",
      "Message Direction": messageDirection,
      "Auto Scroll": autoScroll ? "Enabled" : "Disabled",
      "Programming Language": programmingLanguage,
      "Response Style ID": selectedStyleId || "None Selected"
    });

    console.log("Instructions Check:", {
      interview: interviewInstructions.length > 0 ? `${interviewInstructions.length} chars` : "Empty",
      coding: codingInstructions.length > 0 ? `${codingInstructions.length} chars` : "Empty"
    });
    console.groupEnd();

    try {
      // 1. SAVE TO DATABASE
      await settingsService.saveUserSettings(user.id, {
        audioLanguage,
        pauseInterval,
        advancedQuestionDetection,
        messageDirection,
        autoScroll,
        programmingLanguage,
        interviewInstructions,
        codingInstructions,
        selectedResponseStyleId: selectedStyleId,
        defaultModel,
        codingModel,
        availableProviders
      });

      // 2. FORCE GLOBAL REFRESH
      await reloadAll(); 

      console.log("✅ Settings saved and global state refreshed.");

      setMessage({ type: 'success', text: 'Settings saved successfully!' });

      setTimeout(() => {
        onClose(); 
      }, 200);

    } catch (err) {
      console.error("❌ Save Failed:", err);
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setSaving(false);
    }
  };


  // Style CRUD
  const handleCreateStyle = () => { setEditingStyle(null); setShowStyleModal(true); };
  const handleEditStyle = (style) => { setEditingStyle(style); setShowStyleModal(true); };

  const handleDeleteStyle = async (styleId) => {
    if (!user || !confirm('Are you sure you want to delete this style?')) return;
    try {
      await responseStyleService.deleteStyle(styleId, user.id);

      // locally update and refresh global cache
      const updatedStyles = responseStyles.filter(s => s.id !== styleId);
      setResponseStyles(updatedStyles);

      if (selectedStyleId === styleId) setSelectedStyleId(updatedStyles[0]?.id || null);

      if (typeof reloadAll === 'function') {
        await reloadAll();
      }

      setMessage({ type: 'success', text: 'Style deleted successfully' });
    } catch (error) {
      console.error('Error deleting style:', error);
      setMessage({ type: 'error', text: 'Failed to delete style' });
    }
  };

  const handleStyleSaved = async () => {
    try {
      // Refresh list from service and global cache
      const updated = await responseStyleService.getAllStyles(user.id);
      setResponseStyles(updated || []);

      if (typeof reloadAll === 'function') {
        await reloadAll();
      }

      setShowStyleModal(false);
      setMessage({ type: 'success', text: 'Style saved successfully!' });
    } catch (error) {
      console.error('Error refreshing styles:', error);
      setMessage({ type: 'error', text: 'Failed to refresh styles' });
    }
  };

  const modelOptions = Object.entries(availableProviders || {})
    .map(([value, isAvailable]) => ({
      value,
      label: MODEL_LABELS[value] || value,
      available: !!isAvailable
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  // -----------------------
  // RENDER
  // -----------------------
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a24] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-800 shadow-2xl">
        <div className="bg-[#14141b] px-6 py-4 flex items-center justify-between border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Copilot Parameters</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-[#14141b] px-6 border-b border-gray-800">
          <div className="flex gap-1">
            {['responseStyle', 'audioTranscription', 'models', 'advancedSettings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === tab ? 'border-purple-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
              >
                {tab === 'responseStyle' && 'Response Style'}
                {tab === 'audioTranscription' && 'Audio Transcription'}
                {tab === 'models' && 'Models'}
                {tab === 'advancedSettings' && 'Advanced Settings'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {loading || globalLoading ? (
            <div className="text-center text-gray-400 py-8">Loading settings...</div>
          ) : (
            <>
              {activeTab === 'responseStyle' && (
                <ResponseStyleTab
                  responseStyles={responseStyles}
                  selectedStyleId={selectedStyleId}
                  setSelectedStyleId={setSelectedStyleId}
                  onCreateStyle={handleCreateStyle}
                  onEditStyle={handleEditStyle}
                  onDeleteStyle={handleDeleteStyle}
                />
              )}

              {activeTab === 'audioTranscription' && (
                <AudioTranscriptionTab
                  audioLanguage={audioLanguage}
                  setAudioLanguage={setAudioLanguage}
                  pauseInterval={pauseInterval}
                  setPauseInterval={setPauseInterval}
                  advancedQuestionDetection={advancedQuestionDetection}
                  setAdvancedQuestionDetection={setAdvancedQuestionDetection}
                />
              )}

              {activeTab === 'models' && (
                <ModelsTab
                  defaultModel={defaultModel}
                  setDefaultModel={setDefaultModel}
                  codingModel={codingModel}
                  setCodingModel={setCodingModel}
                  modelOptions={modelOptions}
                />
              )}

              {activeTab === 'advancedSettings' && (
                <AdvancedSettingsTab
                  messageDirection={messageDirection}
                  setMessageDirection={setMessageDirection}
                  autoScroll={autoScroll}
                  setAutoScroll={setAutoScroll}
                  programmingLanguage={programmingLanguage}
                  setProgrammingLanguage={setProgrammingLanguage}
                  interviewInstructions={interviewInstructions}
                  setInterviewInstructions={setInterviewInstructions}
                  codingInstructions={codingInstructions}
                  setCodingInstructions={setCodingInstructions}
                />
              )}
            </>
          )}

          {message.text && (
            <div className={`mt-4 rounded-lg p-4 flex items-center gap-2 ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
              }`}>
              {message.type === 'success' ? <Check className="w-5 h-5 text-green-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
              <span className={message.type === 'success' ? 'text-green-400' : 'text-red-400'}>{message.text}</span>
            </div>
          )}
        </div>

        <div className="bg-[#14141b] px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-800">
          <button onClick={onClose} className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">Close</button>
          <button
            onClick={handleSave}
            disabled={saving || loading || globalLoading}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-700 disabled:to-gray-700 text-white font-semibold transition-all disabled:cursor-not-allowed rounded-lg"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {showStyleModal && (
        <StyleCustomizationModal
          style={editingStyle}
          onClose={() => setShowStyleModal(false)}
          onSave={handleStyleSaved}
          userId={user?.id}
        />
      )}
    </div>
  );
}
