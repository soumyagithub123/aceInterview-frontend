//
import React from "react";
import { Check, FileText, Building2, Globe2, AlertTriangle } from "lucide-react";

function cn(...c) {
  return c.filter(Boolean).join(" ");
}

function Row({ icon: Icon, title, value, ok }) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 rounded-2xl border p-4",
        ok ? "border-emerald-400/20 bg-emerald-400/5" : "border-white/10 bg-white/[0.04]"
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={cn(
            "h-10 w-10 sm:h-11 sm:w-11 rounded-xl border grid place-items-center flex-shrink-0",
            ok ? "border-emerald-400/20 bg-emerald-400/10" : "border-white/10 bg-black/30"
          )}
        >
          {ok ? <Check className="h-5 w-5 text-emerald-300" /> : <Icon className="h-5 w-5 text-white/60" />}
        </div>

        <div className="min-w-0">
          <div className="text-white font-semibold text-sm sm:text-base">{title}</div>
          <div className={cn("text-xs sm:text-sm truncate", ok ? "text-white/70" : "text-white/45")}>
            {value}
          </div>
        </div>
      </div>

      <span
        className={cn(
          "self-start sm:self-auto text-xs font-semibold rounded-full px-3 py-1 border flex-shrink-0",
          ok ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200" : "border-white/10 bg-white/[0.03] text-white/55"
        )}
      >
        {ok ? "OK" : "Missing"}
      </span>
    </div>
  );
}

export default function LaunchChecklist({ persona, personaData, domain }) {
  const checklistItems = [
    {
      icon: Building2,
      title: "Persona",
      description: personaData?.name || (personaData?.position ? `${personaData.position} @ ${personaData.company_name}` : persona) || "No persona selected",
      status: !!persona,
    },
    {
      icon: Globe2,
      title: "Domain",
      description: domain || "No domain selected",
      status: !!domain,
    },
    {
      icon: FileText,
      title: "Resume",
      description: personaData?.resume_filename || "No resume attached",
      status: !!personaData?.resume_filename,
    },
  ];

  const allReady = checklistItems.every((x) => x.status);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-7 py-5 sm:py-6 border-b border-white/10 bg-gradient-to-r from-white/[0.06] to-transparent">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <h2 className="text-white text-base sm:text-lg font-semibold tracking-tight">
              Pre-flight Checklist
            </h2>
            <p className="text-white/55 text-xs sm:text-sm mt-1">
              Confirm your setup before launching the interview assistant.
            </p>
          </div>

          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold",
              allReady
                ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
                : "border-yellow-400/25 bg-yellow-400/10 text-yellow-100"
            )}
          >
            {allReady ? (
              <>
                <Check className="h-4 w-4" />
                Ready
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4" />
                Action needed
              </>
            )}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-7 space-y-6">
        {/* Persona summary */}
        {personaData ? (
          <div className="rounded-3xl border border-white/10 bg-black/30 p-4 sm:p-5">
            <div className="flex gap-4">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl border border-white/10 bg-white/[0.06] grid place-items-center flex-shrink-0">
                <span className="text-white font-semibold text-base sm:text-lg">
                  {personaData.company_name?.charAt(0)?.toUpperCase() || "C"}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-white font-semibold tracking-tight truncate">
                  {personaData.position || "Position"}
                </div>
                <div className="text-white/60 text-sm mt-0.5 truncate">
                  @{personaData.company_name || "Company"}
                </div>

                {personaData.company_description ? (
                  <p className="mt-3 text-sm text-white/55 line-clamp-2">
                    {personaData.company_description}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        {/* Checklist */}
        <div className="space-y-3">
          {checklistItems.map((item, idx) => (
            <Row
              key={idx}
              icon={item.icon}
              title={item.title}
              value={item.description}
              ok={item.status}
            />
          ))}
        </div>

        {/* System status */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-white font-semibold">System Status</div>
            <span className="inline-flex items-center gap-2 text-xs text-white/55">
              <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
              Live
            </span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-white/55">AI Assistant</span>
              <span className="text-emerald-200 font-semibold">Ready</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/55">Voice Recognition</span>
              <span className="text-emerald-200 font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/55">Context Engine</span>
              <span className="text-emerald-200 font-semibold">Loaded</span>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
          <div className="text-white font-semibold">Tips</div>
          <ul className="mt-3 text-sm text-white/55 space-y-2 list-disc pl-5">
            <li>Test your microphone before starting.</li>
            <li>Stay in a quiet environment.</li>
            <li>Keep your resume details handy.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
