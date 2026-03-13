import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { responseStyleService } from '../../../services/responseStyleService';

export default function StyleCustomizationModal({ style, onClose, onSave, userId }) {
  const [formData, setFormData] = useState({
    styleName: style?.style_name || '',
    description: style?.description || '',
    approximateLength: style?.approximate_length || '~150 words',
    tone: style?.tone || 'Professional',
    exampleResponse: style?.example_response || ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setFormData({
      styleName: style?.style_name || '',
      description: style?.description || '',
      approximateLength: style?.approximate_length || '~150 words',
      tone: style?.tone || 'Professional',
      exampleResponse: style?.example_response || ''
    });
  }, [style]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.styleName || !formData.description || !formData.exampleResponse) {
      setError('Please fill in all required fields');
      return;
    }

    if (saving) return;

    setSaving(true);
    setError('');

    // 🔥 LOG 1: Log the attempt and the data being sent
    console.log(style ? "Updating existing style..." : "Creating new style...", {
      styleId: style?.id || 'New',
      userId: userId,
      payload: formData
    });

    try {
      // ✅ SINGLE SOURCE OF TRUTH (CREATE + UPDATE)
      const result = await responseStyleService.createOrUpdateStyle(
        userId,
        formData,
        style?.id || null
      );

      // 🔥 LOG 2: Log successful database response
      console.log("Style saved successfully to database:", result);

      await onSave();   // refresh styles / reloadAll
      onClose();

    } catch (err) {
      // 🔥 LOG 3: Log specific error details
      console.error("Error occurred while saving style:", err);
      setError('Failed to save style. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-[#1a1a24] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden border border-gray-800">
        <div className="bg-[#14141b] px-6 py-4 flex items-center justify-between border-b border-gray-800">
          <h3 className="text-xl font-bold text-white">{style ? 'Edit Response Style' : 'Create Custom Style'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-5">
            <div>
              <label className="text-white font-medium mb-2 block">Style Name <span className="text-red-400">*</span></label>
              <input type="text" value={formData.styleName} onChange={(e) => setFormData({ ...formData, styleName: e.target.value })} placeholder="e.g., Brief Professional, Storyteller, Technical Expert" className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>

            <div>
              <label className="text-white font-medium mb-2 block">Description <span className="text-red-400">*</span></label>
              <input type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Brief description of this response style" className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white font-medium mb-2 block">Approximate Length</label>
                <input type="text" value={formData.approximateLength} onChange={(e) => setFormData({ ...formData, approximateLength: e.target.value })} placeholder="e.g., ~150 words" className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>

              <div>
                <label className="text-white font-medium mb-2 block">Tone</label>
                <select value={formData.tone} onChange={(e) => setFormData({ ...formData, tone: e.target.value })} className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Friendly</option>
                  <option>Formal</option>
                  <option>Conversational</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-white font-medium mb-2 block">Example Response <span className="text-red-400">*</span></label>
              <p className="text-gray-400 text-sm mb-2">Provide an example answer in this style to help the AI understand your preferences</p>
              <textarea value={formData.exampleResponse} onChange={(e) => setFormData({ ...formData, exampleResponse: e.target.value })} placeholder="Write a sample response that demonstrates this style..." className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[200px] resize-none" />
              <p className="text-gray-500 text-xs mt-1">{formData.exampleResponse.length} characters</p>
            </div>

            {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3"><p className="text-red-400 text-sm">{error}</p></div>}
          </div>

          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-800">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-700 disabled:to-gray-700 text-white font-semibold rounded-lg transition-all disabled:cursor-not-allowed">
              {saving ? 'Saving...' : style ? 'Update Style' : 'Create Style'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
