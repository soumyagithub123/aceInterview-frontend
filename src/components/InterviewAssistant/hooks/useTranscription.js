import { useEffect, useRef, useState } from "react";
import { ReconnectingWebSocket } from "../../utils/websocket";
import { getWebSocketUrl } from "../../utils/config";

export default function useTranscription({
  settingsRef,
  reconnectingQaWsRef,
}) {
  // ======================
  // STATE
  // ======================
  const [candidateTranscript, setCandidateTranscript] = useState([]);
  const [interviewerTranscript, setInterviewerTranscript] = useState([]);

  const [currentCandidateParagraph, setCurrentCandidateParagraph] = useState("");
  const [currentInterviewerParagraph, setCurrentInterviewerParagraph] =
    useState("");

  const [candidateInterim, setCandidateInterim] = useState("");
  const [interviewerInterim, setInterviewerInterim] = useState("");

  const [deepgramStatus, setDeepgramStatus] = useState("Ready");

  // ======================
  // REFS
  // ======================
  const deepgramWsRef = useRef(null);
  const reconnectingDeepgramWsRef = useRef(null);

  const candidateParagraphRef = useRef("");
  const interviewerParagraphRef = useRef("");

  const candidatePauseTimerRef = useRef(null);
  const interviewerPauseTimerRef = useRef(null);

  // ======================
  // SAFE SEND TO QA
  // ======================
  const safeSendToQA = (message) => {
    if (reconnectingQaWsRef?.current) {
      try {
        reconnectingQaWsRef.current.send(message);
      } catch (err) {
        console.error("❌ [Transcription] Failed to send to QA:", err);
      }
    } else {
      console.warn("⚠️ [Transcription] QA WS not available");
    }
  };

  // ======================
  // ✅ SMART PAUSE DETECTION
  // ======================
  const hasStrongPauseIndicator = (text) => {
    if (!text) return false;
    
    // Question mark at end
    if (text.trim().endsWith('?')) return true;
    
    // Period/exclamation followed by capital letter
    if (/[.!]\s+[A-Z]/.test(text)) return true;
    
    // Multiple sentences
    if ((text.match(/[.!?]/g) || []).length >= 2) return true;
    
    return false;
  };

  // ======================
  // HANDLE TRANSCRIPT
  // ======================
  const handleDeepgramTranscript = (data) => {
    const { stream, transcript, is_final } = data;
    if (!transcript || !transcript.trim()) return;

    // ✅ OPTIMIZED PAUSE INTERVALS
    const basePause = (settingsRef.current?.pauseInterval || 2.0) * 1000;

    const finalizeParagraph = (
      ref,
      setState,
      setHistory,
      setInterim,
      sendToQA = false
    ) => {
      if (!ref.current) return;

      const finalText = ref.current;

      console.log(
        `📝 [Transcription] Final ${stream}:`,
        finalText.slice(0, 60)
      );

      setHistory((prev) => [
        ...prev,
        {
          text: finalText,
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          id: Date.now() + Math.random(),
          stream,
        },
      ]);

      // ⚠️ IMPORTANT:
      // ONLY interviewer finalized text is forwarded to QA
      if (sendToQA) {
        safeSendToQA({
          type: "transcript",
          transcript: finalText,
          is_final: true,
          speech_final: true,
          reset: true,
        });

        console.log(
          "📤 [Transcription → QA]",
          finalText.slice(0, 50) + "..."
        );
      }

      ref.current = "";
      setState("");
      setInterim("");
    };

    // ======================
    // CANDIDATE STREAM
    // ======================
    if (stream === "candidate") {
      if (candidatePauseTimerRef.current) {
        clearTimeout(candidatePauseTimerRef.current);
      }

      if (!is_final) {
        setCandidateInterim(transcript.trim());
      } else {
        setCandidateInterim("");

        candidateParagraphRef.current = candidateParagraphRef.current
          ? `${candidateParagraphRef.current} ${transcript.trim()}`
          : transcript.trim();

        setCurrentCandidateParagraph(candidateParagraphRef.current);

        // ✅ REDUCED from 2000ms to 1500ms
        const pauseInterval = 1500;

        candidatePauseTimerRef.current = setTimeout(() => {
          finalizeParagraph(
            candidateParagraphRef,
            setCurrentCandidateParagraph,
            setCandidateTranscript,
            setCandidateInterim,
            false
          );
        }, pauseInterval);
      }
    }

    // ======================
    // INTERVIEWER STREAM (OPTIMIZED)
    // ======================
    if (stream === "interviewer") {
      if (interviewerPauseTimerRef.current) {
        clearTimeout(interviewerPauseTimerRef.current);
      }

      if (!is_final) {
        setInterviewerInterim(transcript.trim());
      } else {
        setInterviewerInterim("");

        interviewerParagraphRef.current = interviewerParagraphRef.current
          ? `${interviewerParagraphRef.current} ${transcript.trim()}`
          : transcript.trim();

        setCurrentInterviewerParagraph(interviewerParagraphRef.current);

        // ✅ WAIT for full question: 2500ms of silence before sending to backend
        // This prevents the AI from answering only the FIRST fragment of a long question.
        // Deepgram fires is_final for each sentence chunk, but the interviewer may
        // still be speaking. We accumulate all chunks during the pause window and
        // send the complete text once the interviewer actually stops.
        const pauseInterval = 2500;

        interviewerPauseTimerRef.current = setTimeout(() => {
          finalizeParagraph(
            interviewerParagraphRef,
            setCurrentInterviewerParagraph,
            setInterviewerTranscript,
            setInterviewerInterim,
            true
          );
        }, pauseInterval);
      }
    }
  };
  
  // ======================
  // CONNECT DEEPGRAM
  // ======================
  const connectDeepgram = () => {
    return new Promise((resolve, reject) => {
      const languageMap = {
        English: "en",
        Spanish: "es",
        French: "fr",
        German: "de",
        Hindi: "hi",
        Mandarin: "zh",
      };

      const language =
        languageMap[settingsRef.current?.audioLanguage] || "en";

      const wsUrl = getWebSocketUrl(
        `/ws/dual-transcribe?language=${language}`
      );

      console.log(`🔗 [Deepgram] Connecting → ${wsUrl}`);
      setDeepgramStatus("Connecting…");

      const handleMessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === "transcript") {
            handleDeepgramTranscript(data);
          } else if (data.type === "error") {
            console.error("❌ [Deepgram] Error:", data.message);
          } else if (
            data.type === "ready" ||
            data.type === "connected"
          ) {
            console.log("✓ [Deepgram] Ready");
          }
        } catch (e) {
          console.error("❌ [Deepgram] Parse error:", e);
        }
      };

      const handleStatusChange = (status) => {
        if (status === "connected") {
          setDeepgramStatus("Ready");
          console.log("✅ [Deepgram] Connected");
          resolve(reconnectingDeepgramWsRef.current);
        } else if (status === "reconnecting") {
          setDeepgramStatus("🔄 Reconnecting…");
          console.warn("🔄 [Deepgram] Reconnecting");
        } else if (status === "disconnected") {
          setDeepgramStatus("Disconnected");
          console.warn("⚠️ [Deepgram] Disconnected");
        }
      };

      reconnectingDeepgramWsRef.current = new ReconnectingWebSocket(
        wsUrl,
        handleMessage,
        handleStatusChange,
        5
      );

      reconnectingDeepgramWsRef.current
        .connect()
        .then(() => {
          deepgramWsRef.current =
            reconnectingDeepgramWsRef.current.ws;
        })
        .catch((err) => {
          console.error("❌ [Deepgram] Connect failed:", err);
          reject(err);
        });
    });
  };

  // ======================
  // STOP TRANSCRIPTION
  // ======================
  const stopTranscription = () => {
    console.log("🛑 [Deepgram] Stopping transcription");

    if (candidatePauseTimerRef.current) {
      clearTimeout(candidatePauseTimerRef.current);
      candidatePauseTimerRef.current = null;
    }

    if (interviewerPauseTimerRef.current) {
      clearTimeout(interviewerPauseTimerRef.current);
      interviewerPauseTimerRef.current = null;
    }

    candidateParagraphRef.current = "";
    interviewerParagraphRef.current = "";

    setCurrentCandidateParagraph("");
    setCurrentInterviewerParagraph("");
    setCandidateInterim("");
    setInterviewerInterim("");

    if (reconnectingDeepgramWsRef.current) {
      reconnectingDeepgramWsRef.current.close();
      reconnectingDeepgramWsRef.current = null;
    }

    deepgramWsRef.current = null;
    setDeepgramStatus("Stopped");

    console.log("✓ [Deepgram] Transcription stopped cleanly");
  };

  // ======================
  // CLEANUP ON UNMOUNT
  // ======================
  useEffect(() => {
    return () => {
      console.log("♻️ [Deepgram] Cleanup on unmount");
      stopTranscription();
    };
  }, []);

  // ======================
  // EXPOSE API (UNCHANGED)
  // ======================
  return {
    candidateTranscript,
    interviewerTranscript,

    currentCandidateParagraph,
    currentInterviewerParagraph,

    candidateInterim,
    interviewerInterim,

    deepgramStatus,

    reconnectingDeepgramWsRef,

    connectDeepgram,
    stopTranscription,
  };
}