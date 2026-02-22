import React from 'react';
import { ChevronDown, Edit2, Trash2, Settings as SettingsIcon, Lock } from 'lucide-react';
import { useAppData } from '../../../context/AppDataContext';
import { useNavigate } from 'react-router-dom';

const FREE_STYLES = ['Concise', 'Conversational', 'Detailed'];

export default function ResponseStyleTab({ responseStyles, selectedStyleId, setSelectedStyleId, onCreateStyle, onEditStyle, onDeleteStyle }) {
  const { isPaidUser } = useAppData();
  const navigate = useNavigate();
  const selectedStyle = responseStyles.find(s => s.id === selectedStyleId) || null;

  const handleStyleChange = (e) => {
    const newStyleId = e.target.value;
    const style = responseStyles.find(s => s.id === newStyleId);
    
    if (!style) return;

    // Check if style is allowed
    const isAllowed = isPaidUser || FREE_STYLES.includes(style.style_name);
    
    if (!isAllowed) {
      // Redirect to pricing or show alert
      if (confirm("This style is available for Pro users. Upgrade to unlock?")) {
        navigate('/pricing');
      }
      return;
    }

    setSelectedStyleId(newStyleId);
  };

  const handleCustomizationClick = () => {
    if (!isPaidUser) {
      navigate('/pricing', { state: { message: "Upgrade to customize AI styles" } });
      return;
    }
    onCreateStyle();
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-white font-semibold mb-2 block">Copilot Style</label>
        <p className="text-gray-400 text-sm mb-4">Select how your AI assistant responds</p>

        <div className="relative mb-6">
          <select
            value={selectedStyleId || ''}
            onChange={handleStyleChange}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-purple-500/50"
          >
            {responseStyles.length === 0 && <option value="">No styles available</option>}
            {responseStyles.map(style => {
              const isAllowed = isPaidUser || FREE_STYLES.includes(style.style_name);
              return (
                <option key={style.id} value={style.id} disabled={!isAllowed} className={!isAllowed ? "text-gray-500 bg-gray-900" : ""}>
                  {style.style_name} 
                  {style.is_system_default ? '' : ' (Custom)'}
                  {!isAllowed ? ' 🔒 (Pro)' : ''}
                </option>
              );
            })}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>

        {selectedStyle && (
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-2">{selectedStyle.style_name}</h3>
                <p className="text-gray-400 text-sm mb-4">{selectedStyle.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Approximate Length</p>
                    <p className="text-gray-300 text-sm">{selectedStyle.approximate_length}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Tone</p>
                    <p className="text-gray-300 text-sm">{selectedStyle.tone}</p>
                  </div>
                </div>
              </div>

              {!selectedStyle.is_system_default && isPaidUser && (
                <div className="flex gap-2 ml-4">
                  <button onClick={() => onEditStyle(selectedStyle)} className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors" title="Edit style">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDeleteStyle(selectedStyle.id)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete style">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div>
              <p className="text-purple-400 text-sm font-medium mb-2">Example Response</p>
              <div className="bg-gray-800 rounded-lg p-4 max-h-64 overflow-y-auto">
                <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">{selectedStyle.example_response}</p>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={handleCustomizationClick} 
          className={`mt-6 w-full font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 border-2 ${
            isPaidUser 
              ? "bg-purple-600/20 hover:bg-purple-600/30 border-purple-500/50 hover:border-purple-500 text-purple-300"
              : "bg-gray-800/50 border-gray-700 text-gray-500 cursor-not-allowed hover:bg-gray-800"
          }`}
        >
          {isPaidUser ? <SettingsIcon className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
          Style Customization {isPaidUser ? "" : ""}
        </button>
      </div>
    </div>
  );
}
