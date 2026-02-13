// src/components/InterviewAssistant/Train/TrainCopilotPage.jsx

import React from "react";

export default function TrainCopilotPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="max-w-xl w-full">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-10 shadow-xl">
          <div className="text-center space-y-6">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <svg
                className="w-8 h-8 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold text-white">
                Train Your Copilot
              </h2>
              <p className="text-slate-400">
                Customize your AI assistant for personalized interview
                preparation
              </p>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <span className="text-sm font-medium text-blue-300">
                Coming Soon
              </span>
            </div>

            {/* Description */}
            <div className="pt-2">
              <p className="text-slate-300 leading-relaxed">
                Fine-tune your AI copilot with industry-specific knowledge,
                custom evaluation criteria, and personalized feedback patterns
                to create your ideal interview training companion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}