// import { useEffect, useRef, useState } from "react";
// import { ReconnectingWebSocket } from "../../utils/websocket";
// import { getWebSocketUrl } from "../../utils/config";

// export default function useTranscription({
//   settingsRef,
//   reconnectingQaWsRef,
// }) {
//   // ======================
//   // STATE
//   // ======================
//   const [candidateTranscript, setCandidateTranscript] = useState([]);
//   const [interviewerTranscript, setInterviewerTranscript] = useState([]);

//   const [currentCandidateParagraph, setCurrentCandidateParagraph] = useState("");
//   const [currentInterviewerParagraph, setCurrentInterviewerParagraph] =
//     useState("");

//   const [candidateInterim, setCandidateInterim] = useState("");
//   const [interviewerInterim, setInterviewerInterim] = useState("");

//   const [deepgramStatus, setDeepgramStatus] = useState("Ready");

//   // ======================
//   // REFS
//   // ======================
//   const deepgramWsRef = useRef(null);
//   const reconnectingDeepgramWsRef = useRef(null);

//   const candidateParagraphRef = useRef("");
//   const interviewerParagraphRef = useRef("");

//   const candidatePauseTimerRef = useRef(null);
//   const interviewerPauseTimerRef = useRef(null);

//   // ======================
//   // HANDLE TRANSCRIPT
//   // ======================
//   const handleDeepgramTranscript = (data) => {
//     const { stream, transcript, is_final } = data;
//     if (!transcript || !transcript.trim()) return;

//     const basePause =
//       (settingsRef.current?.pauseInterval || 2.0) * 1000;

//     // 🔥 interviewer faster, candidate normal
//     const pauseInterval =
//       stream === "interviewer"
//         ? Math.min(basePause, 700)
//         : basePause;

//     const finalizeParagraph = (
//       ref,
//       setState,
//       setHistory,
//       setInterim,
//       sendToQA = false
//     ) => {
//       if (!ref.current) return;

//       const finalText = ref.current;

//       setHistory((prev) => [
//         ...prev,
//         {
//           text: finalText,
//           timestamp: new Date().toLocaleTimeString("en-US", {
//             hour: "2-digit",
//             minute: "2-digit",
//             second: "2-digit",
//           }),
//           id: Date.now() + Math.random(),
//           stream,
//         },
//       ]);

//       // ✅ IMPORTANT: reset QA for every interviewer question
//       if (sendToQA && reconnectingQaWsRef.current) {
//         reconnectingQaWsRef.current.send({
//           type: "transcript",
//           transcript: finalText,
//           is_final: true,
//           speech_final: true,
//           reset: true, // ⭐ FIX
//         });

//         console.log("📤 Sent to Q&A:", finalText.substring(0, 50) + "...");
//       }

//       ref.current = "";
//       setState("");
//       setInterim("");
//     };

//     // ======================
//     // CANDIDATE
//     // ======================
//     if (stream === "candidate") {
//       if (candidatePauseTimerRef.current) {
//         clearTimeout(candidatePauseTimerRef.current);
//       }

//       if (!is_final) {
//         setCandidateInterim(transcript.trim());
//       } else {
//         setCandidateInterim("");

//         candidateParagraphRef.current = candidateParagraphRef.current
//           ? `${candidateParagraphRef.current} ${transcript.trim()}`
//           : transcript.trim();

//         setCurrentCandidateParagraph(candidateParagraphRef.current);

//         candidatePauseTimerRef.current = setTimeout(() => {
//           finalizeParagraph(
//             candidateParagraphRef,
//             setCurrentCandidateParagraph,
//             setCandidateTranscript,
//             setCandidateInterim,
//             false
//           );
//         }, pauseInterval);
//       }
//     }

//     // ======================
//     // INTERVIEWER
//     // ======================
//     if (stream === "interviewer") {
//       if (interviewerPauseTimerRef.current) {
//         clearTimeout(interviewerPauseTimerRef.current);
//       }

//       if (!is_final) {
//         setInterviewerInterim(transcript.trim());
//       } else {
//         setInterviewerInterim("");

//         interviewerParagraphRef.current = interviewerParagraphRef.current
//           ? `${interviewerParagraphRef.current} ${transcript.trim()}`
//           : transcript.trim();

//         setCurrentInterviewerParagraph(interviewerParagraphRef.current);

//         interviewerPauseTimerRef.current = setTimeout(() => {
//           finalizeParagraph(
//             interviewerParagraphRef,
//             setCurrentInterviewerParagraph,
//             setInterviewerTranscript,
//             setInterviewerInterim,
//             true
//           );
//         }, pauseInterval);
//       }
//     }
//   };

//   // ======================
//   // CONNECT DEEPGRAM
//   // ======================
//   const connectDeepgram = () => {
//     return new Promise((resolve, reject) => {
//       const languageMap = {
//         English: "en",
//         Spanish: "es",
//         French: "fr",
//         German: "de",
//         Hindi: "hi",
//         Mandarin: "zh",
//       };

//       const language =
//         languageMap[settingsRef.current?.audioLanguage] || "en";

//       const wsUrl = getWebSocketUrl(
//         `/ws/dual-transcribe?language=${language}`
//       );

//       console.log(`🔗 Connecting to Deepgram: ${wsUrl}`);

//       const handleMessage = (event) => {
//         try {
//           const data = JSON.parse(event.data);
//           if (data.type === "transcript") {
//             handleDeepgramTranscript(data);
//           } else if (data.type === "error") {
//             console.error("Deepgram error:", data.message);
//           } else if (
//             data.type === "ready" ||
//             data.type === "connected"
//           ) {
//             console.log("✓ Deepgram:", data.message);
//           }
//         } catch (e) {
//           console.error("Deepgram parse error:", e);
//         }
//       };

//       const handleStatusChange = (status) => {
//         if (status === "connected") {
//           setDeepgramStatus("Ready");
//           resolve(reconnectingDeepgramWsRef.current);
//         } else if (status === "reconnecting") {
//           setDeepgramStatus("🔄 Reconnecting...");
//         } else if (status === "disconnected") {
//           setDeepgramStatus("Disconnected");
//         }
//       };

//       reconnectingDeepgramWsRef.current = new ReconnectingWebSocket(
//         wsUrl,
//         handleMessage,
//         handleStatusChange,
//         5
//       );

//       reconnectingDeepgramWsRef.current
//         .connect()
//         .then(() => {
//           deepgramWsRef.current =
//             reconnectingDeepgramWsRef.current.ws;
//         })
//         .catch(reject);
//     });
//   };

//   // ======================
//   // STOP DEEPGRAM
//   // ======================
//   const stopTranscription = () => {
//     if (candidatePauseTimerRef.current) {
//       clearTimeout(candidatePauseTimerRef.current);
//     }
//     if (interviewerPauseTimerRef.current) {
//       clearTimeout(interviewerPauseTimerRef.current);
//     }

//     candidateParagraphRef.current = "";
//     interviewerParagraphRef.current = "";

//     setCurrentCandidateParagraph("");
//     setCurrentInterviewerParagraph("");
//     setCandidateInterim("");
//     setInterviewerInterim("");

//     if (reconnectingDeepgramWsRef.current) {
//       reconnectingDeepgramWsRef.current.close();
//       reconnectingDeepgramWsRef.current = null;
//     }

//     deepgramWsRef.current = null;
//     console.log("✓ Deepgram stopped");
//   };

//   // ======================
//   // CLEANUP
//   // ======================
//   useEffect(() => {
//     return () => {
//       stopTranscription();
//     };
//   }, []);

//   // ======================
//   // EXPOSE API
//   // ======================
//   return {
//     candidateTranscript,
//     interviewerTranscript,

//     currentCandidateParagraph,
//     currentInterviewerParagraph,

//     candidateInterim,
//     interviewerInterim,

//     deepgramStatus,

//     reconnectingDeepgramWsRef,

//     connectDeepgram,
//     stopTranscription,
//   };
// }





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
  // INTERNAL HELPERS
  // ======================
  const safeSendToQA = (payload) => {
    if (!reconnectingQaWsRef?.current) {
      console.warn("⚠️ [Transcription] QA WS not ready, skip send");
      return;
    }

    try {
      reconnectingQaWsRef.current.send(payload);
    } catch (err) {
      console.error("❌ [Transcription] Failed sending to QA:", err);
    }
  };

  // ======================
  // HANDLE TRANSCRIPT
  // ======================
  const handleDeepgramTranscript = (data) => {
    const { stream, transcript, is_final } = data;
    if (!transcript || !transcript.trim()) return;

    const basePause =
      (settingsRef.current?.pauseInterval || 2.0) * 1000;

    // interviewer faster, candidate normal
    const pauseInterval =
      stream === "interviewer"
        ? Math.min(basePause, 700)
        : basePause;

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
    // INTERVIEWER STREAM
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
