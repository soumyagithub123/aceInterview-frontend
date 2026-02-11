import React from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

// Group models by provider for cleaner UX
const PROVIDER_GROUPS = [
  {
    label: 'OpenAI',
    prefix: 'gpt',
  },
  {
    label: 'Google Gemini',
    prefix: 'gemini',
  },
  {
    label: 'Anthropic Claude',
    prefix: 'claude',
  },
  {
    label: 'DeepSeek',
    prefix: 'deepseek',
  },
  {
    label: 'Groq (Llama / Mixtral / Gemma)',
    prefixes: ['llama', 'mixtral', 'gemma'],
  },
];

function groupOptions(modelOptions) {
  const grouped = [];
  const used = new Set();

  for (const group of PROVIDER_GROUPS) {
    const prefixes = group.prefixes || [group.prefix];
    const matches = modelOptions.filter(
      (o) => !used.has(o.value) && prefixes.some((p) => o.value.startsWith(p))
    );
    if (matches.length > 0) {
      grouped.push({ groupLabel: group.label, options: matches });
      matches.forEach((o) => used.add(o.value));
    }
  }

  // Any remaining (unknown provider)
  const rest = modelOptions.filter((o) => !used.has(o.value));
  if (rest.length > 0) {
    grouped.push({ groupLabel: 'Other', options: rest });
  }

  return grouped;
}

function ModelSelect({ value, onChange, modelOptions, id }) {
  const groups = groupOptions(modelOptions);
  const hasOptions = modelOptions.length > 0;

  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-purple-500/50 disabled:opacity-50"
        disabled={!hasOptions}
      >
        {/* Placeholder shown when nothing matches or list is empty */}
        {(!hasOptions || !modelOptions.find((o) => o.value === value)) && (
          <option value="" disabled>
            {hasOptions ? '— select a model —' : 'Loading models…'}
          </option>
        )}

        {groups.map((group) => (
          <optgroup key={group.groupLabel} label={group.groupLabel}>
            {group.options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={!option.available}
              >
                {option.label}
                {!option.available ? ' (unavailable)' : ''}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
    </div>
  );
}

export default function ModelsTab({
  defaultModel,
  setDefaultModel,
  codingModel,
  setCodingModel,
  modelOptions,
}) {
  return (
    <div className="space-y-6">
      {/* Default Copilot Model */}
      <div>
        <label htmlFor="default-model" className="text-white font-semibold mb-2 block">
          Default Copilot Model
        </label>
        <p className="text-gray-400 text-sm mb-4">
          Select the AI model for general copilot interactions. Automatic fallback
          enabled if primary model fails.
        </p>
        <ModelSelect
          id="default-model"
          value={defaultModel}
          onChange={setDefaultModel}
          modelOptions={modelOptions}
        />
      </div>

      {/* Coding Assistant Model */}
      <div>
        <label htmlFor="coding-model" className="text-white font-semibold mb-2 block">
          Coding Assistant Model
        </label>
        <p className="text-gray-400 text-sm mb-4">
          Select the AI model for coding-related tasks and technical questions
        </p>
        <ModelSelect
          id="coding-model"
          value={codingModel}
          onChange={setCodingModel}
          modelOptions={modelOptions}
        />
      </div>

      {/* Info box */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-400 text-sm font-medium mb-1">
              Automatic Fallback Enabled
            </p>
            <p className="text-blue-300/80 text-xs">
              If your primary model fails or is unavailable, the system will
              automatically switch to the backup model to ensure uninterrupted
              service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}