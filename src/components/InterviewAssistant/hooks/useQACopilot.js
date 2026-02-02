// import { useRef, useState, useEffect } from "react";
// import { ReconnectingWebSocket } from "../../utils/websocket";
// import { getWebSocketUrl, BACKEND_URL } from "../../utils/config";

// export default function useQACopilot({
//   user,
//   domain,
//   personaId,
//   personaData,
//   settingsRef,
// }) {
//   // ======================
//   // STATE
//   // ======================
//   const [qaList, setQaList] = useState([]);

//   const [currentQuestion, setCurrentQuestion] = useState("");
//   const [currentAnswer, setCurrentAnswer] = useState("");

//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isStreamingComplete, setIsStreamingComplete] = useState(false);

//   const [qaStatus, setQaStatus] = useState("Ready");

//   // ======================
//   // REFS
//   // ======================
//   const qaWsRef = useRef(null);
//   const reconnectingQaWsRef = useRef(null);
  
//   // ✅ SESSION ID REF (Persists for the duration of this component mount)
//   const sessionIdRef = useRef(null);

//   // Initialize Session ID on mount
//   useEffect(() => {
//     if (!sessionIdRef.current) {
//         // Use crypto.randomUUID if available, else fallback
//         sessionIdRef.current = typeof crypto !== 'undefined' && crypto.randomUUID 
//             ? crypto.randomUUID() 
//             : `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            
//         console.log(`🆔 [Session] New Session ID Generated: ${sessionIdRef.current}`);
//     }
    
//     // Cleanup on unmount (Optional: Send session_end here if not already stopped)
//     return () => {
//         // We can't reliably send WS messages in cleanup if socket is closing, 
//         // but 'stopQA' is usually called explicitly.
//     };
//   }, []);

//   // ======================
//   // INIT SESSION (API)
//   // ======================
//   const initSession = async () => {
//     try {
//         console.log("🚀 Initializing Session via API...");
        
//         const payload = {
//             user_id: user?.id || "anonymous",
//             persona_id: personaId,
//             custom_style_prompt: settingsRef.current?.custom_style_prompt || null,
//         };

//         const res = await fetch(`${BACKEND_URL}/session/init`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload),
//         });

//         if (!res.ok) {
//             const err = await res.json();
//             throw new Error(err.detail || "Session init failed");
//         }

//         const data = await res.json();
//         console.log("✅ Session Initialized:", data);
        
//         // UPDATE SESSION ID REF
//         if (data.session_id) {
//             sessionIdRef.current = data.session_id;
//         }
        
//         return data.session_id;

//     } catch (err) {
//         console.error("🔴 Session Init Error:", err);
//         setQaStatus(`Init Error: ${err.message}`);
//         return null;
//     }
//   };

//   // ======================
//   // ADD QA (DEDUP SAFE)
//   // ======================
//   const addQA = (qa) => {
//     setQaList((prev) => {
//       const isDuplicate = prev.some(
//         (item) =>
//           item.question.trim().toLowerCase() ===
//           qa.question.trim().toLowerCase()
//       );
//       if (isDuplicate) return prev;

//       return [
//         ...prev,
//         {
//           ...qa,
//           id: Date.now() + Math.random(),
//         },
//       ];
//     });
//   };

//   // ======================
//   // CONNECT QA
//   // ======================
//   const connectQA = () => {
//     return new Promise((resolve, reject) => {
//       const qaUrl = getWebSocketUrl("/ws/live-interview");
//       console.log(`🔗 Connecting to Q&A: ${qaUrl}`);

//       const handleMessage = (event) => {
//         try {
//           const data = JSON.parse(event.data);
//           // console.log("📩 Q&A:", data.type, data); // Commented out to reduce noise, enable if needed

//           switch (data.type) {
//             case "ready":
//             case "connected":
//               setQaStatus("🤖 Q&A Active");
//               break;

//             // 🔥 RESET HANDLING (IMPORTANT)
//             case "reset_ack": {
//               setCurrentQuestion("");
//               setCurrentAnswer("");
//               setIsGenerating(false);
//               setIsStreamingComplete(false);
//               break;
//             }

//             case "question_detected": {
//               if (!data.question) return;

//               setCurrentQuestion(data.question);
//               setCurrentAnswer("");
//               setIsGenerating(true);
//               setIsStreamingComplete(false);
//               break;
//             }

//             // ✅ NEW: Handle streaming tokens (No Latency)
//             // case "answer_delta": {
//                 // if (data.delta) {
//                 // setIsGenerating(false);
//                 // setCurrentAnswer((prev) => prev + data.delta);
//                 // }
//                 // break;
//             // }

//             case "answer_ready": {
//               if (!data.answer || typeof data.answer !== "string") {
//                 setIsGenerating(false);
//                 break;
//               }

//               // ✅ instant render (no double pause wait)
//               setCurrentAnswer(data.answer);
//               setIsGenerating(false);
//               setIsStreamingComplete(true);

//               addQA({
//                 question: data.question || currentQuestion,
//                 answer: data.answer,
//               });

//               // reset for next turn
//               setTimeout(() => {
//                 setCurrentQuestion("");
//                 setCurrentAnswer("");
//                 setIsStreamingComplete(false);
//               }, 300);

//               break;
//             }

//             case "error":
//               console.error("Q&A error:", data.message);
//               setQaStatus(`⚠️ ${data.message}`);
//               setIsGenerating(false);
//               break;
//           }
//         } catch (err) {
//           console.error("Parse error:", err);
//         }
//       };

//       const handleStatusChange = (status) => {
//         if (status === "connected") {
//           setQaStatus("Initializing...");
          
//           console.log(`🚀 [Session] Initializing Session: ${sessionIdRef.current}`);

//           const initMessage = {
//             type: "init",
//             // ✅ SEND SESSION ID
//             session_id: sessionIdRef.current,
            
//             domain: domain || "Technical",
//             user_id: user?.id || null,
//             persona_id: personaId || null,

//             position: personaData?.position || "",
//             company_name: personaData?.company_name || "",
//             company_description:
//               personaData?.company_description || "",
//             job_description:
//               personaData?.job_description || "",
//             resume_text: personaData?.resume_text || "",
//             resume_filename:
//               personaData?.resume_filename || "",

//             custom_style_prompt:
//               settingsRef.current?.custom_style_prompt || null,

//             settings: {
//               audioLanguage:
//                 settingsRef.current?.audioLanguage || "English",
//               pauseInterval:
//                 settingsRef.current?.pauseInterval || 2.0,
//               advancedQuestionDetection:
//                 settingsRef.current
//                   ?.advancedQuestionDetection !== false,
//               selectedResponseStyleId:
//                 settingsRef.current?.selectedResponseStyleId ||
//                 "concise",
//               responseStyle:
//                 settingsRef.current?.responseStyle ||
//                 "professional",
//               defaultModel:
//                 settingsRef.current?.defaultModel ||
//                 "gpt-4o-mini",
//               programmingLanguage:
//                 settingsRef.current?.programmingLanguage ||
//                 "Python",
//               interviewInstructions:
//                 settingsRef.current?.interviewInstructions ||
//                 "",
//               messageDirection:
//                 settingsRef.current?.messageDirection || "bottom",
//               autoScroll:
//                 settingsRef.current?.autoScroll !== false,
//             },
//           };

//           reconnectingQaWsRef.current?.send(initMessage);
//           resolve(reconnectingQaWsRef.current);
//         } else if (status === "reconnecting") {
//           setQaStatus("🔄 Reconnecting...");
//           console.log(`🔄 [Session] Reconnecting Session: ${sessionIdRef.current} (Resume should be cached)`);
//         } else if (status === "disconnected") {
//           setQaStatus("Disconnected");
//         }
//       };

//       reconnectingQaWsRef.current = new ReconnectingWebSocket(
//         qaUrl,
//         handleMessage,
//         handleStatusChange,
//         5
//       );

//       reconnectingQaWsRef.current
//         .connect()
//         .then(() => {
//           qaWsRef.current = reconnectingQaWsRef.current.ws;
//         })
//         .catch(reject);
//     });
//   };

//   // ======================
//   // STOP QA
//   // ======================
//   const stopQA = () => {
//     // ✅ SEND SESSION END SIGNAL
//     if (reconnectingQaWsRef.current && sessionIdRef.current) {
//         console.log(`🛑 [Session] Ending Session: ${sessionIdRef.current}`);
//         reconnectingQaWsRef.current.send({
//             type: "session_end",
//             session_id: sessionIdRef.current
//         });
//     }

//     if (reconnectingQaWsRef.current) {
//       reconnectingQaWsRef.current.close();
//       reconnectingQaWsRef.current = null;
//     }
//     qaWsRef.current = null;

//     setCurrentQuestion("");
//     setCurrentAnswer("");
//     setIsGenerating(false);

//     console.log("✓ Q&A stopped");
//   };

//   // ======================
//   // MANUAL GENERATE (unchanged)
//   // ======================
//   const handleManualGenerate = async (text) => {
//     try {
//       const payload = {
//         user_id: user?.id || "anonymous",
//         // ✅ Include session_id in manual generate too if supported by backend endpoint
//         session_id: sessionIdRef.current, 
//         message: text,
//         model: settingsRef.current?.defaultModel || "gpt-4o",
//       };

//       const res = await fetch(
//         "https://verve-ai-ukec.onrender.com/api/manual-generate",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );

//       const data = await res.json();

//       if (data.answer) {
//         setQaList((prev) => [
//           ...prev,
//           {
//             id: Date.now() + Math.random(),
//             question: text,
//             answer: data.answer,
//           },
//         ]);
//       }
//     } catch (err) {
//       console.error("Manual generate failed:", err);
//     }
//   };

//   // ======================
//   // EXPOSE API
//   // ======================
//   return {
//     qaList,
//     currentQuestion,
//     currentAnswer,
//     isGenerating,
//     isStreamingComplete,
//     qaStatus,

//     reconnectingQaWsRef,

//     connectQA,
//     stopQA,
//     handleManualGenerate,
//     initSession,
//   };
// }



import { useRef, useState, useEffect } from "react";
import { ReconnectingWebSocket } from "../../utils/websocket";
import { getWebSocketUrl, BACKEND_URL } from "../../utils/config";

export default function useQACopilot({
  user,
  domain,
  personaId,
  personaData,
  settingsRef,
}) {
  // ======================
  // STATE
  // ======================
  const [qaList, setQaList] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isStreamingComplete, setIsStreamingComplete] = useState(false);

  const [qaStatus, setQaStatus] = useState("Ready");

  // ======================
  // REFS
  // ======================
  const qaWsRef = useRef(null);
  const reconnectingQaWsRef = useRef(null);

  // ✅ SESSION ID REF (comes from Launchpad now)
  const sessionIdRef = useRef(null);

  // ======================
  // SESSION ID INIT (FROM STORAGE)
  // ======================
  useEffect(() => {
    const storedSessionId = sessionStorage.getItem("sessionId");

    if (!storedSessionId) {
      console.error("❌ [QACopilot] No sessionId found. Launch Copilot first.");
      setQaStatus("Session not initialized");
      return;
    }

    sessionIdRef.current = storedSessionId;
    console.log("🆔 [QACopilot] Using existing session:", storedSessionId);

    return () => {
      // cleanup handled in stopQA()
    };
  }, []);

  // ======================
  // ❌ OLD INIT SESSION API
  // ======================
  /**
   * ⚠️ INTENTIONALLY KEPT BUT NOT AUTO-USED
   * Launchpad now owns session creation (Prompt-1)
   * This is here only for backward / debug safety
   */
  const initSession = async () => {
    console.warn(
      "⚠️ [QACopilot] initSession() called, but session is expected to be pre-initialized"
    );
    return sessionIdRef.current;
  };

  // ======================
  // ADD QA (DEDUP SAFE)
  // ======================
  const addQA = (qa) => {
    setQaList((prev) => {
      const isDuplicate = prev.some(
        (item) =>
          item.question.trim().toLowerCase() ===
          qa.question.trim().toLowerCase()
      );
      if (isDuplicate) return prev;

      return [
        ...prev,
        {
          ...qa,
          id: Date.now() + Math.random(),
        },
      ];
    });
  };

  // ======================
  // CONNECT QA (WS)
  // ======================
  const connectQA = () => {
    return new Promise((resolve, reject) => {
      if (!sessionIdRef.current) {
        console.error("❌ [QACopilot] connectQA called without sessionId");
        reject("No sessionId");
        return;
      }

      const qaUrl = getWebSocketUrl("/ws/live-interview");
      console.log(`🔗 [QACopilot] Connecting WS → ${qaUrl}`);

      const handleMessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          switch (data.type) {
            case "ready":
            case "connected":
              setQaStatus("🤖 Q&A Active");
              break;

            case "reset_ack":
              setCurrentQuestion("");
              setCurrentAnswer("");
              setIsGenerating(false);
              setIsStreamingComplete(false);
              break;

            case "question_detected":
              if (!data.question) return;
              console.log("❓ [QACopilot] Question:", data.question);
              setCurrentQuestion(data.question);
              setCurrentAnswer("");
              setIsGenerating(true);
              setIsStreamingComplete(false);
              break;

            case "answer_ready":
              if (!data.answer) {
                setIsGenerating(false);
                break;
              }

              console.log("✅ [QACopilot] Answer received");

              setCurrentAnswer(data.answer);
              setIsGenerating(false);
              setIsStreamingComplete(true);

              addQA({
                question: data.question || currentQuestion,
                answer: data.answer,
              });

              setTimeout(() => {
                setCurrentQuestion("");
                setCurrentAnswer("");
                setIsStreamingComplete(false);
              }, 300);
              break;

            case "error":
              console.error("❌ [QACopilot] WS error:", data.message);
              setQaStatus(`⚠️ ${data.message}`);
              setIsGenerating(false);
              break;
          }
        } catch (err) {
          console.error("❌ WS parse error:", err);
        }
      };
      const handleStatusChange = (status) => {
        if (status === "connected") {
          setQaStatus("Initializing...");
          console.log(
            `🚀 [QACopilot] WS connected. Using session: ${sessionIdRef.current}`
          );

          // 🔐 MINIMAL INIT MESSAGE (IMPORTANT)
          const initMessage = {
            type: "init",

            // ✅ SESSION CONTEXT (PRIMARY)
            session_id: sessionIdRef.current,

            // 🟡 Optional runtime hints (NOT MEMORY)
            domain: domain || "General",
            user_id: user?.id || null,

            // ⚠️ NO resume_text
            // ⚠️ NO job_description
            // ⚠️ NO persona dump
            // ⚠️ NO prompt build here

            custom_style_prompt:
              settingsRef.current?.custom_style_prompt || null,

            settings: {
              pauseInterval:
                settingsRef.current?.pauseInterval || 2.0,
              defaultModel:
                settingsRef.current?.defaultModel || "gpt-4o",
              programmingLanguage:
                settingsRef.current?.programmingLanguage || "Python",
            },
          };

          console.log(
            "📤 [QACopilot] Sending WS init (session-memory only)"
          );

          reconnectingQaWsRef.current?.send(initMessage);
          resolve(reconnectingQaWsRef.current);
        } else if (status === "reconnecting") {
          setQaStatus("🔄 Reconnecting...");
          console.log(
            `🔄 [QACopilot] Reconnecting with session: ${sessionIdRef.current}`
          );
        } else if (status === "disconnected") {
          setQaStatus("Disconnected");
          console.warn(
            `⚠️ [QACopilot] WS disconnected for session: ${sessionIdRef.current}`
          );
        }
      };

      reconnectingQaWsRef.current = new ReconnectingWebSocket(
        qaUrl,
        handleMessage,
        handleStatusChange,
        5
      );

      reconnectingQaWsRef.current
        .connect()
        .then(() => {
          qaWsRef.current = reconnectingQaWsRef.current.ws;
        })
        .catch((err) => {
          console.error("❌ [QACopilot] WS connect failed:", err);
          reject(err);
        });
    });
  };

  // ======================
  // STOP QA (SESSION END)
  // ======================
  const stopQA = () => {
    if (reconnectingQaWsRef.current && sessionIdRef.current) {
      console.log(
        `🛑 [QACopilot] Ending session: ${sessionIdRef.current}`
      );

      reconnectingQaWsRef.current.send({
        type: "session_end",
        session_id: sessionIdRef.current,
      });
    }

    if (reconnectingQaWsRef.current) {
      reconnectingQaWsRef.current.close();
      reconnectingQaWsRef.current = null;
    }

    qaWsRef.current = null;

    setCurrentQuestion("");
    setCurrentAnswer("");
    setIsGenerating(false);
    setIsStreamingComplete(false);

    console.log("✓ [QACopilot] Q&A stopped cleanly");
  };

  // ======================
  // MANUAL GENERATE (SAFE)
  // ======================
  const handleManualGenerate = async (text) => {
    try {
      console.log("✍️ [QACopilot] Manual generate");

      const payload = {
        user_id: user?.id || "anonymous",
        session_id: sessionIdRef.current,
        message: text,
        model: settingsRef.current?.defaultModel || "gpt-4o",
      };

      const res = await fetch(
        `${BACKEND_URL}/api/manual-generate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (data.answer) {
        setQaList((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            question: text,
            answer: data.answer,
          },
        ]);
      }
    } catch (err) {
      console.error(
        "❌ [QACopilot] Manual generate failed:",
        err
      );
    }
  };

  // ======================
  // EXPOSE API (UNCHANGED)
  // ======================
  return {
    qaList,
    currentQuestion,
    currentAnswer,
    isGenerating,
    isStreamingComplete,
    qaStatus,

    reconnectingQaWsRef,

    connectQA,
    stopQA,
    handleManualGenerate,
    initSession, // kept for backward safety
  };
}
