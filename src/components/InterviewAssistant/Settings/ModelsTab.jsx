import React from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

export default function ModelsTab({ defaultModel, setDefaultModel, codingModel, setCodingModel, modelOptions }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-white font-semibold mb-2 block">Default Copilot Model</label>
        <p className="text-gray-400 text-sm mb-4">Select the AI model for general copilot interactions. Automatic fallback enabled if primary model fails.</p>
        <div className="relative">
          <select value={defaultModel} onChange={(e) => setDefaultModel(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-purple-500/50">
            {modelOptions.map(option => (
              <option key={option.value} value={option.value} disabled={!option.available}>
                {option.label} {!option.available ? '(Not Available)' : ''}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="text-white font-semibold mb-2 block">Coding Assistant Model</label>
        <p className="text-gray-400 text-sm mb-4">Select the AI model for coding-related tasks and technical questions</p>
        <div className="relative">
          <select value={codingModel} onChange={(e) => setCodingModel(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-purple-500/50">
            {modelOptions.map(option => (
              <option key={option.value} value={option.value} disabled={!option.available}>
                {option.label} {!option.available ? '(Not Available)' : ''}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-400 text-sm font-medium mb-1">Automatic Fallback Enabled</p>
            <p className="text-blue-300/80 text-xs">If your primary model fails or is unavailable, the system will automatically switch to the backup model to ensure uninterrupted service.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
