import React from 'react';

export default function AudioTranscriptionTab({ audioLanguage, setAudioLanguage, pauseInterval, setPauseInterval, advancedQuestionDetection, setAdvancedQuestionDetection }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-white font-medium mb-2 block">Language</label>
        <p className="text-gray-400 text-sm mb-3">Language of the interview</p>
        <select value={audioLanguage} onChange={(e) => setAudioLanguage(e.target.value)} className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
          <option>Hindi</option>
          <option>Mandarin</option>
        </select>
      </div>

      <div>
        <label className="text-white font-medium mb-2 block">Pause Interval</label>
        <p className="text-gray-400 text-sm mb-3">Duration of pause to detect the end of speech and generate a new transcription paragraph (seconds)</p>
        <div className="flex items-center gap-4">
          <input type="number" min="1" max="10" value={pauseInterval} onChange={(e) => setPauseInterval(Number(e.target.value))} className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          <span className="text-gray-400">sec</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <label className="text-white font-medium block">Advanced Question Detection</label>
            <span className="bg-purple-600/20 text-purple-300 text-xs px-2 py-1 rounded-md inline-block mt-1">Experimental</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={advancedQuestionDetection} onChange={(e) => setAdvancedQuestionDetection(e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
        <p className="text-gray-400 text-sm">Intelligently filter conversation to focus on meaningful questions</p>
      </div>
    </div>
  );
}
