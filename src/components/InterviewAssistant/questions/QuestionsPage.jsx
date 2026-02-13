
import React from "react";

export default function QuestionsPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="max-w-xl w-full">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-10 shadow-xl">
          <div className="text-center space-y-6">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <svg
                className="w-8 h-8 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold text-white">
                Question Bank
              </h2>
              <p className="text-slate-400">
                Curate and organize your interview preparation questions
              </p>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
              <span className="text-sm font-medium text-purple-300">
                Coming Soon
              </span>
            </div>

            {/* Description */}
            <div className="pt-2">
              <p className="text-slate-300 leading-relaxed">
                Create custom question sets tailored to specific roles,
                companies, and difficulty levels. Organize your preparation
                materials and track your practice progress efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}