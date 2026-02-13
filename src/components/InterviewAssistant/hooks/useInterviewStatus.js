import { useEffect, useState } from "react";

export default function useInterviewStatus({
  isRecording,
  isPaused,
  deepgramStatus,
  qaStatus,
  isGenerating,
}) {
  // ======================
  // STATE
  // ======================
  const [finalDeepgramStatus, setFinalDeepgramStatus] = useState("Ready");
  const [finalQaStatus, setFinalQaStatus] = useState("Ready");

  // ======================
  // DEEPGRAM STATUS LOGIC
  // ======================
  useEffect(() => {
    if (!isRecording) {
      setFinalDeepgramStatus("Ready");
      return;
    }

    if (isPaused) {
      setFinalDeepgramStatus("Paused");
      return;
    }

    if (deepgramStatus === "Connecting…" || deepgramStatus === "Connecting") {
      setFinalDeepgramStatus("Connecting");
      return;
    }

    if (deepgramStatus === "Reconnecting…" || deepgramStatus === "🔄 Reconnecting…") {
      setFinalDeepgramStatus("Reconnecting");
      return;
    }

    setFinalDeepgramStatus(deepgramStatus || "Recording");
  }, [isRecording, isPaused, deepgramStatus]);

  // ======================
  // QA STATUS LOGIC
  // ======================
  useEffect(() => {
    if (!isRecording) {
      setFinalQaStatus("Ready");
      return;
    }

    if (isGenerating) {
      setFinalQaStatus("Thinking…");
      return;
    }

    if (
      qaStatus === "Initializing…" ||
      qaStatus === "Initializing..." ||
      qaStatus === "Connecting"
    ) {
      setFinalQaStatus("Initializing");
      return;
    }

    if (
      qaStatus === "🔄 Reconnecting..." ||
      qaStatus === "🔄 Reconnecting…"
    ) {
      setFinalQaStatus("Reconnecting");
      return;
    }

    setFinalQaStatus(qaStatus || "Active");
  }, [isRecording, isGenerating, qaStatus]);

  // ======================
  // EXPOSE (UNCHANGED)
  // ======================
  return {
    deepgramStatus: finalDeepgramStatus,
    qaStatus: finalQaStatus,
  };
}
