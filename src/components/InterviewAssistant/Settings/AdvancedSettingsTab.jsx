import React from 'react';

export default function AdvancedSettingsTab({ messageDirection, setMessageDirection, autoScroll, setAutoScroll, programmingLanguage, setProgrammingLanguage, interviewInstructions, setInterviewInstructions, codingInstructions, setCodingInstructions }) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-white font-medium">Message Direction</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={messageDirection === 'bottom'} onChange={(e) => setMessageDirection(e.target.checked ? 'bottom' : 'top')} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
        <p className="text-gray-400 text-sm">Newer Interview Copilot messages appear at the {messageDirection}</p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-white font-medium">Auto Scroll</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={autoScroll} onChange={(e) => setAutoScroll(e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
        <p className="text-gray-400 text-sm">Enable auto scroll by default</p>
      </div>

      <div>
        <label className="text-white font-medium mb-2 block">Programming Language</label>
        <p className="text-gray-400 text-sm mb-3">Default Programming Language</p>
        <select value={programmingLanguage} onChange={(e) => setProgrammingLanguage(e.target.value)} className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option>Python</option>
          <option>JavaScript</option>
          <option>Java</option>
          <option>C++</option>
          <option>Go</option>
          <option>Rust</option>
          <option>TypeScript</option>
          <option>C#</option>
        </select>
      </div>

      <div>
        <label className="text-white font-medium mb-2 block">Additional Instruction (Interview Copilot)</label>
        <textarea value={interviewInstructions} onChange={(e) => setInterviewInstructions(e.target.value)} placeholder="Tell AI what to do or not to do (e.g. 'Don't use jargon' or 'Use most recent work experience')" className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px] resize-none" />
      </div>

      <div>
        <label className="text-white font-medium mb-2 block">Additional Instruction (Coding Copilot)</label>
        <textarea value={codingInstructions} onChange={(e) => setCodingInstructions(e.target.value)} placeholder="Instructions for coding solutions (e.g. 'Prefer clear code over optimized code' or 'Include detailed comments')" className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px] resize-none" />
      </div>
    </div>
  );
}
