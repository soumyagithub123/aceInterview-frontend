// // ============================================================================
// // InterviewAssist.jsx - Main Container Component (FIXED SINGLE PARAGRAPH)
// // ============================================================================
// import React, { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "./Auth/AuthContext";

// // Correct imports (NO components/ prefix)
// import InterviewHeader from "./InterviewHeader";
// import TranscriptPanel from "./TranscriptPanel";
// import QACopilot from "./QACopilot";
// import SettingsModal from "./SettingsModal";
// import TabAudioModal from "./TabAudioModal";
// import StatusBar from "./StatusBar";
// import { useAppData } from "../context/AppDataContext";

// // Utils
// import { ReconnectingWebSocket } from "./utils/websocket";
// import { getWebSocketUrl, BACKEND_URL } from "./utils/config";

// // ============================================================================
// // MAIN COMPONENT
// // ============================================================================
// export default function InterviewAssist() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { user, loading } = useAuth();

//     // ⭐ MANUAL GENERATE BUTTON HANDLER ⭐
//     async function handleManualGenerate(text) {
//         console.log("🟦 [ManualGenerate] Button clicked with text:", text);
//         try {
//             console.log("🟦 Sending request → /api/manual-generate");
//             const payload = {
//                 user_id: user?.id || "anonymous",
//                 message: text,
//                 model: settings.defaultModel || "gpt-4o",
//             };
//             console.log("🟦 Payload:", payload);

//             const res = await fetch("https://verve-ai-ukec.onrender.com/api/manual-generate", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(payload),
//             });

//             console.log("🟧 Server responded. Status:", res.status);
//             const data = await res.json();
//             console.log("🟩 Parsed response:", data);

//             if (data.answer) {
//                 console.log("🟩 Adding answer to UI:", data.answer);
//                 setQaList((prev) => [
//                     ...prev,
//                     {
//                         id: Date.now() + Math.random(),
//                         question: text,
//                         answer: data.answer,
//                     },
//                 ]);
//             } else {
//                 console.warn("⚠️ No answer returned from backend");
//             }
//         } catch (err) {
//             console.error("🔴 Manual generate failed:", err);
//         }
//     }

//     // Persona & Settings State
//     const [personaId] = useState(
//         location.state?.personaId || localStorage.getItem("selectedPersona") || null
//     );
//     const [personaData] = useState(() => {
//         if (location.state?.personaData) return location.state.personaData;
//         const saved = localStorage.getItem("selectedPersonaData");
//         try {
//             return saved ? JSON.parse(saved) : null;
//         } catch {
//             return null;
//         }
//     });
//     const [domain] = useState(
//         location.state?.domain || localStorage.getItem("selectedDomain") || ""
//     );
//     // Global Data
//     const { settings, reloadAll } = useAppData();

//     // Refs for settings to access inside callbacks/websockets without dependency issues
//     const settingsRef = useRef(settings);

//     // Update ref when settings change
//     useEffect(() => {
//         settingsRef.current = settings;
//     }, [settings]);

//     // Component States
//     const [isRecording, setIsRecording] = useState(false);
//     const [qaList, setQaList] = useState([]);
//     const [candidateTranscript, setCandidateTranscript] = useState([]);
//     const [interviewerTranscript, setInterviewerTranscript] = useState([]);
//     const [activeView, setActiveView] = useState("interviewer");
//     const [deepgramStatus, setDeepgramStatus] = useState("Ready");
//     const [qaStatus, setQaStatus] = useState("Ready");
//     const [showSettings, setShowSettings] = useState(false);
//     const [isPaused, setIsPaused] = useState(false);

//     const [showTabModal, setShowTabModal] = useState(false);
//     const [tabAudioError, setTabAudioError] = useState("");

//     // Current Q&A states
//     const [currentQuestion, setCurrentQuestion] = useState("");
//     const [currentAnswer, setCurrentAnswer] = useState("");
//     const [isGenerating, setIsGenerating] = useState(false);
//     const [isStreamingComplete, setIsStreamingComplete] = useState(false);

//     // ✅ Live paragraph display (final accumulated + interim preview)
//     const [currentCandidateParagraph, setCurrentCandidateParagraph] = useState("");
//     const [currentInterviewerParagraph, setCurrentInterviewerParagraph] = useState("");

//     // Temporary interim text (replaced on next update, never persisted)
//     const [candidateInterim, setCandidateInterim] = useState("");
//     const [interviewerInterim, setInterviewerInterim] = useState("");

//     // Refs
//     const deepgramWsRef = useRef(null);
//     const qaWsRef = useRef(null);
//     const reconnectingDeepgramWsRef = useRef(null);
//     const reconnectingQaWsRef = useRef(null);
//     const candidateStreamRef = useRef(null);
//     const interviewerStreamRef = useRef(null);
//     const candidateAudioContextRef = useRef(null);
//     const interviewerAudioContextRef = useRef(null);
//     const candidateProcessorRef = useRef(null);
//     const interviewerProcessorRef = useRef(null);

//     // Pause detection timer refs
//     const candidatePauseTimerRef = useRef(null);
//     const interviewerPauseTimerRef = useRef(null);

//     // Track state with refs to prevent race conditions
//     const candidateParagraphRef = useRef("");
//     const interviewerParagraphRef = useRef("");

//     // ============================================================================
//     // AUTH CHECK
//     // ============================================================================
//     useEffect(() => {
//         if (!loading && !user) {
//             navigate("/sign-in");
//         }
//     }, [user, loading, navigate]);

//     // ============================================================================
//     // ✅ FIXED: WORD-BY-WORD LIVE DISPLAY (NO DUPLICATION)
//     // ============================================================================
//     const handleDeepgramTranscript = (data) => {
//         const { stream, transcript, is_final, speech_final } = data;

//         if (!transcript || !transcript.trim()) return;

//         const pauseInterval = (settingsRef.current?.pauseInterval || 2.0) * 1000;

//         // Helper: Finalize paragraph and move to history
//         const finalizeParagraph = (ref, setState, setHistory, setInterim, sendToQA = false) => {
//             if (!ref.current) return;

//             const finalText = ref.current;
//             setHistory((prev) => [
//                 ...prev,
//                 {
//                     text: finalText,
//                     timestamp: new Date().toLocaleTimeString("en-US", {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                         second: "2-digit",
//                     }),
//                     id: Date.now() + Math.random(),
//                     stream,
//                 },
//             ]);

//             // ✅ Send ONLY interviewer text to Q&A
//             if (sendToQA && reconnectingQaWsRef.current) {
//                 reconnectingQaWsRef.current.send({
//                     type: "transcript",
//                     transcript: finalText,
//                     is_final: true,
//                     speech_final: true,
//                 });
//                 console.log("📤 Sent to Q&A:", finalText.substring(0, 50) + "...");
//             }

//             ref.current = "";
//             setState("");
//             setInterim("");
//         };

//         // ✅ CANDIDATE STREAM
//         if (stream === "candidate") {
//             if (candidatePauseTimerRef.current) {
//                 clearTimeout(candidatePauseTimerRef.current);
//             }

//             if (!is_final) {
//                 // ✅ Show interim text live (word by word)
//                 setCandidateInterim(transcript.trim());
//             } else {
//                 // ✅ Commit final text, clear interim
//                 setCandidateInterim("");
//                 candidateParagraphRef.current = candidateParagraphRef.current
//                     ? `${candidateParagraphRef.current} ${transcript.trim()}`
//                     : transcript.trim();

//                 setCurrentCandidateParagraph(candidateParagraphRef.current);

//                 // Set timer to finalize after pause
//                 candidatePauseTimerRef.current = setTimeout(() => {
//                     finalizeParagraph(
//                         candidateParagraphRef,
//                         setCurrentCandidateParagraph,
//                         setCandidateTranscript,
//                         setCandidateInterim,
//                         false // Don't send candidate speech to Q&A
//                     );
//                 }, pauseInterval);
//             }
//         }

//         // ✅ INTERVIEWER STREAM
//         if (stream === "interviewer") {
//             if (interviewerPauseTimerRef.current) {
//                 clearTimeout(interviewerPauseTimerRef.current);
//             }

//             if (!is_final) {
//                 // ✅ Show interim text live (word by word)
//                 setInterviewerInterim(transcript.trim());
//             } else {
//                 // ✅ Commit final text, clear interim
//                 setInterviewerInterim("");
//                 interviewerParagraphRef.current = interviewerParagraphRef.current
//                     ? `${interviewerParagraphRef.current} ${transcript.trim()}`
//                     : transcript.trim();

//                 setCurrentInterviewerParagraph(interviewerParagraphRef.current);

//                 // Set timer to finalize after pause
//                 interviewerPauseTimerRef.current = setTimeout(() => {
//                     finalizeParagraph(
//                         interviewerParagraphRef,
//                         setCurrentInterviewerParagraph,
//                         setInterviewerTranscript,
//                         setInterviewerInterim,
//                         true // ✅ Send interviewer speech to Q&A
//                     );
//                 }, pauseInterval);
//             }
//         }
//     };

//     // ============================================================================
//     // LEFT PANEL: DEEPGRAM DUAL-STREAM TRANSCRIPTION
//     // ============================================================================
//     const connectDeepgram = () => {
//         return new Promise((resolve, reject) => {
//             const languageMap = {
//                 English: "en",
//                 Spanish: "es",
//                 French: "fr",
//                 German: "de",
//                 Hindi: "hi",
//                 Mandarin: "zh",
//             };
//             const language = languageMap[settingsRef.current?.audioLanguage] || "en";
//             const wsUrl = getWebSocketUrl(`/ws/dual-transcribe?language=${language}`);

//             console.log(`🔗 Connecting to Deepgram: ${wsUrl}`);

//             const handleMessage = (event) => {
//                 try {
//                     const data = JSON.parse(event.data);
//                     if (data.type === "transcript") {
//                         handleDeepgramTranscript(data);
//                     } else if (data.type === "error") {
//                         setTabAudioError(data.message);
//                     } else if (data.type === "ready" || data.type === "connected") {
//                         console.log("✓ Deepgram:", data.message);
//                     }
//                 } catch (e) {
//                     console.error("Deepgram parse error:", e);
//                 }
//             };

//             const handleStatusChange = (status) => {
//                 if (status === "connected") {
//                     setDeepgramStatus("Connected");
//                     setTabAudioError("");
//                     resolve(reconnectingDeepgramWsRef.current);
//                 } else if (status === "reconnecting") {
//                     setDeepgramStatus("🔄 Reconnecting...");
//                 } else if (status === "disconnected") {
//                     setDeepgramStatus("Disconnected");
//                 }
//             };

//             reconnectingDeepgramWsRef.current = new ReconnectingWebSocket(
//                 wsUrl,
//                 handleMessage,
//                 handleStatusChange,
//                 5
//             );

//             reconnectingDeepgramWsRef.current
//                 .connect()
//                 .then(() => {
//                     deepgramWsRef.current = reconnectingDeepgramWsRef.current.ws;
//                 })
//                 .catch(reject);
//         });
//     };

//     const startMicrophoneCapture = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({
//                 audio: {
//                     channelCount: 1,
//                     sampleRate: 16000,
//                     echoCancellation: true,
//                     noiseSuppression: true,
//                     autoGainControl: true,
//                 },
//             });

//             candidateStreamRef.current = stream;

//             const audioContext = new (window.AudioContext ||
//                 window.webkitAudioContext)({
//                     sampleRate: 16000,
//                 });
//             candidateAudioContextRef.current = audioContext;

//             const source = audioContext.createMediaStreamSource(stream);
//             const processor = audioContext.createScriptProcessor(4096, 1, 1);
//             candidateProcessorRef.current = processor;

//             processor.onaudioprocess = (e) => {
//                 if (!reconnectingDeepgramWsRef.current || isPaused) return;

//                 const inputData = e.inputBuffer.getChannelData(0);
//                 const pcm16 = new Int16Array(inputData.length);

//                 for (let i = 0; i < inputData.length; i++) {
//                     const s = Math.max(-1, Math.min(1, inputData[i]));
//                     pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
//                 }

//                 reconnectingDeepgramWsRef.current.send({
//                     type: "candidate",
//                     audio: Array.from(pcm16),
//                 });
//             };

//             source.connect(processor);
//             processor.connect(audioContext.destination);

//             console.log("✓ Microphone started");
//         } catch (err) {
//             console.error("Microphone error:", err);
//             setTabAudioError("Microphone denied");
//             throw err;
//         }
//     };

//     const startSystemAudioCapture = async () => {
//         if (interviewerStreamRef.current) {
//             console.warn("⚠️ Interviewer audio already capturing");
//             return;
//         }

//         try {
//             const stream = await navigator.mediaDevices.getDisplayMedia({
//                 video: {
//                     width: { ideal: 1 },
//                     height: { ideal: 1 },
//                     frameRate: { ideal: 1 },
//                 },
//                 audio: {
//                     channelCount: 1,
//                     sampleRate: 16000,
//                     echoCancellation: false,
//                     noiseSuppression: false,
//                     autoGainControl: false,
//                     suppressLocalAudioPlayback: false,
//                 },
//             });

//             const videoTrack = stream.getVideoTracks()[0];
//             if (videoTrack) {
//                 videoTrack.stop();
//                 stream.removeTrack(videoTrack);
//             }

//             const audioTracks = stream.getAudioTracks();
//             if (audioTracks.length === 0) {
//                 throw new Error('No audio track. Enable "Share audio".');
//             }

//             interviewerStreamRef.current = stream;

//             const audioContext = new (window.AudioContext ||
//                 window.webkitAudioContext)({
//                     sampleRate: 16000,
//                 });
//             interviewerAudioContextRef.current = audioContext;

//             const source = audioContext.createMediaStreamSource(stream);
//             const processor = audioContext.createScriptProcessor(4096, 1, 1);
//             interviewerProcessorRef.current = processor;

//             processor.onaudioprocess = (e) => {
//                 if (!reconnectingDeepgramWsRef.current || isPaused) return;

//                 const inputData = e.inputBuffer.getChannelData(0);
//                 const pcm16 = new Int16Array(inputData.length);

//                 for (let i = 0; i < inputData.length; i++) {
//                     const s = Math.max(-1, Math.min(1, inputData[i]));
//                     pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
//                 }

//                 reconnectingDeepgramWsRef.current.send({
//                     type: "interviewer",
//                     audio: Array.from(pcm16),
//                 });
//             };

//             source.connect(processor);
//             processor.connect(audioContext.destination);

//             console.log("✓ System audio started");
//             setShowTabModal(false);
//         } catch (err) {
//             console.error("System audio error:", err);
//             if (err.name === "NotAllowedError") {
//                 setTabAudioError("Screen share denied");
//             } else if (err.message.includes("No audio track")) {
//                 setTabAudioError('No audio. Check "Share tab audio"');
//                 setShowTabModal(true);
//             } else {
//                 setTabAudioError(`Failed: ${err.message}`);
//             }
//             throw err;
//         }
//     };

//     const stopDeepgramCapture = () => {
//         // Clear timers
//         if (candidatePauseTimerRef.current) {
//             clearTimeout(candidatePauseTimerRef.current);
//         }
//         if (interviewerPauseTimerRef.current) {
//             clearTimeout(interviewerPauseTimerRef.current);
//         }

//         // Finalize any remaining paragraphs
//         if (candidateParagraphRef.current) {
//             setCandidateTranscript((prev) => [
//                 ...prev,
//                 {
//                     text: candidateParagraphRef.current,
//                     timestamp: new Date().toLocaleTimeString("en-US", {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                         second: "2-digit",
//                     }),
//                     id: Date.now() + Math.random(),
//                     stream: "candidate",
//                 },
//             ]);
//             candidateParagraphRef.current = "";
//             setCurrentCandidateParagraph("");
//         }

//         if (interviewerParagraphRef.current) {
//             setInterviewerTranscript((prev) => [
//                 ...prev,
//                 {
//                     text: interviewerParagraphRef.current,
//                     timestamp: new Date().toLocaleTimeString("en-US", {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                         second: "2-digit",
//                     }),
//                     id: Date.now() + Math.random(),
//                     stream: "interviewer",
//                 },
//             ]);

//             if (reconnectingQaWsRef.current) {
//                 reconnectingQaWsRef.current.send({
//                     type: "transcript",
//                     transcript: interviewerParagraphRef.current,
//                     is_final: true,
//                     speech_final: true,
//                 });
//             }

//             interviewerParagraphRef.current = "";
//             setCurrentInterviewerParagraph("");
//         }

//         // Stop audio processing
//         if (candidateProcessorRef.current) {
//             candidateProcessorRef.current.disconnect();
//             candidateProcessorRef.current = null;
//         }
//         if (candidateAudioContextRef.current) {
//             candidateAudioContextRef.current.close();
//             candidateAudioContextRef.current = null;
//         }
//         if (candidateStreamRef.current) {
//             candidateStreamRef.current.getTracks().forEach((track) => track.stop());
//             candidateStreamRef.current = null;
//         }

//         if (interviewerProcessorRef.current) {
//             interviewerProcessorRef.current.disconnect();
//             interviewerProcessorRef.current = null;
//         }
//         if (interviewerAudioContextRef.current) {
//             interviewerAudioContextRef.current.close();
//             interviewerAudioContextRef.current = null;
//         }
//         if (interviewerStreamRef.current) {
//             interviewerStreamRef.current.getTracks().forEach((track) => track.stop());
//             interviewerStreamRef.current = null;
//         }

//         if (reconnectingDeepgramWsRef.current) {
//             reconnectingDeepgramWsRef.current.close();
//             reconnectingDeepgramWsRef.current = null;
//         }

//         deepgramWsRef.current = null;
//         console.log("✓ Deepgram stopped");
//     };

//     // ============================================================================
//     // RIGHT PANEL: Q&A WITH AUTOMATIC RECONNECTION
//     // ============================================================================
//     const connectQA = () => {
//         return new Promise((resolve, reject) => {
//             const qaUrl = getWebSocketUrl("/ws/live-interview");
//             console.log(`🔗 Connecting to Q&A: ${qaUrl}`);

//             const handleMessage = (event) => {
//                 try {
//                     const data = JSON.parse(event.data);
//                     console.log("📩 Q&A:", data.type, data);

//                     switch (data.type) {
//                         case "ready":
//                         case "connected":
//                             setQaStatus("🤖 Q&A Active");
//                             break;

// //                         case "question_detected":
//                             if (data.question) {
//                                 console.log("❓ Question:", data.question);
//                                 setCurrentQuestion(data.question);
//                                 setCurrentAnswer("");
//                                 setIsGenerating(true);
//                                 setIsStreamingComplete(false);
//                             }
//                             break;

//                         // ✅ NEW: Handle streaming tokens (No Latency)
//                         // case "answer_delta":
//                         //     if (data.delta) {
//                         //         setIsGenerating(false); // Stop loading spinner, show text
//                         //         setCurrentAnswer((prev) => prev + data.delta);
//                         //     }
//                         //     break;

//                         // case "answer_ready":
//                         //     console.log("💬 Answer:", data);
//                         //     if (
//                         //         !data.answer ||
//                         //         typeof data.answer !== "string" ||
//                         //         data.answer.trim() === ""
//                         //     ) {
//                         //         console.error("❌ Invalid answer:", data.answer);
//                         //         setIsGenerating(false);
//                         //         break;
//                         //     }

//                         //     console.log("✅ Valid answer:", data.answer.substring(0, 100) + "...");
//                         //     setCurrentAnswer(data.answer);
//                         //     setIsGenerating(false);

//                         //     const streamingDuration = data.answer.length * 20 + 500;
//                         //     setTimeout(() => {
//                         //         setIsStreamingComplete(true);
//                         //         addQA({
//                         //             question: data.question || currentQuestion,
//                         //             answer: data.answer,
//                         //         });

//                         //         setTimeout(() => {
//                         //             setCurrentQuestion("");
//                         //             setCurrentAnswer("");
//                         //             setIsStreamingComplete(false);
//                         //         }, 1000);
//                         //     }, streamingDuration);
//                         //     break;

//                         case "answer_ready": {
//                             console.log("💬 Answer:", data);

//                             if (!data.answer || typeof data.answer !== "string") {
//                                 setIsGenerating(false);
//                                 break;
//                             }

//                             const pauseMs =
//                                 (settingsRef.current?.pauseInterval || 2) * 1000;

//                             // Still show loader while waiting
//                             setIsGenerating(true);

//                             setTimeout(() => {
//                                 // ✅ Show answer AFTER pause time
//                                 setCurrentAnswer(data.answer);
//                                 setIsGenerating(false);
//                                 setIsStreamingComplete(true);

//                                 addQA({
//                                 question: data.question || currentQuestion,
//                                 answer: data.answer,
//                                 });

//                                 // Reset current state
//                                 setTimeout(() => {
//                                 setCurrentQuestion("");
//                                 setCurrentAnswer("");
//                                 setIsStreamingComplete(false);
//                                 }, 300);
//                             }, pauseMs);

//                             break;
//                         }

//                         case "error":
//                             console.error("Q&A error:", data.message);
//                             setQaStatus(`⚠️ ${data.message}`);
//                             setIsGenerating(false);
//                             break;
//                     }
//                 } catch (err) {
//                     console.error("Parse error:", err);
//                 }
//             };

//             const handleStatusChange = (status) => {
//                 if (status === "connected") {
//                     setQaStatus("Initializing...");

//                     const initMessage = {
//                         type: "init",
//                         domain: domain || "Technical",
//                         user_id: user?.id || null,
//                         persona_id: personaId || null,
//                         position: personaData?.position || "",
//                         company_name: personaData?.company_name || "",
//                         company_description: personaData?.company_description || "",
//                         job_description: personaData?.job_description || "",
//                         resume_text: personaData?.resume_text || "",
//                         resume_filename: personaData?.resume_filename || "",
//                         custom_style_prompt: settingsRef.current?.custom_style_prompt || null,
//                         settings: {
//                             audioLanguage: settingsRef.current?.audioLanguage || "English",
//                             pauseInterval: settingsRef.current?.pauseInterval || 2.0,
//                             advancedQuestionDetection:
//                                 settingsRef.current?.advancedQuestionDetection !== false,
//                             selectedResponseStyleId:
//                                 settingsRef.current?.selectedResponseStyleId || "concise",
//                             responseStyle: settingsRef.current?.responseStyle || "professional",
//                             defaultModel: settingsRef.current?.defaultModel || "gpt-4o-mini",
//                             programmingLanguage: settingsRef.current?.programmingLanguage || "Python",
//                             interviewInstructions: settingsRef.current?.interviewInstructions || "",
//                             messageDirection: settingsRef.current?.messageDirection || "bottom",
//                             autoScroll: settingsRef.current?.autoScroll !== false,
//                         },
//                     };

//                     reconnectingQaWsRef.current?.send(initMessage);
//                     resolve(reconnectingQaWsRef.current);
//                 } else if (status === "reconnecting") {
//                     setQaStatus("🔄 Reconnecting...");
//                 } else if (status === "disconnected") {
//                     setQaStatus("Disconnected");
//                 }
//             };

//             reconnectingQaWsRef.current = new ReconnectingWebSocket(
//                 qaUrl,
//                 handleMessage,
//                 handleStatusChange,
//                 5
//             );

//             reconnectingQaWsRef.current
//                 .connect()
//                 .then(() => {
//                     qaWsRef.current = reconnectingQaWsRef.current.ws;
//                 })
//                 .catch(reject);
//         });
//     };

//     const stopQA = () => {
//         if (reconnectingQaWsRef.current) {
//             reconnectingQaWsRef.current.close();
//             reconnectingQaWsRef.current = null;
//         }
//         qaWsRef.current = null;
//         console.log("✓ Q&A stopped");
//     };

//     const addQA = (qa) => {
//         setQaList((prev) => {
//             const isDuplicate = prev.some(
//                 (item) =>
//                     item.question.trim().toLowerCase() === qa.question.trim().toLowerCase()
//             );
//             if (isDuplicate) return prev;

//             const newQA = { ...qa, id: Date.now() + Math.random() };
//             return [...prev, newQA];
//         });
//     };

//     const startRecording = async () => {
//         try {
//             setTabAudioError("");
//             await connectDeepgram();
//             await startMicrophoneCapture();
//             setShowTabModal(true);
//             await connectQA();
//             setIsRecording(true);
//             setDeepgramStatus("🎤 Recording (Select Tab)");
//             setQaStatus("🤖 Q&A Active");
//         } catch (err) {
//             console.error("Failed to start:", err);
//             stopDeepgramCapture();
//             stopQA();
//             setIsRecording(false);
//         }
//     };

//     const stopRecording = () => {
//         stopDeepgramCapture();
//         stopQA();
//         setIsRecording(false);
//         setDeepgramStatus("Stopped");
//         setQaStatus("Stopped");
//         candidateParagraphRef.current = "";
//         interviewerParagraphRef.current = "";
//         setCurrentCandidateParagraph("");
//         setCurrentInterviewerParagraph("");
//         setCandidateInterim("");
//         setInterviewerInterim("");
//     };

//     const handleTabAudioSelection = async () => {
//         try {
//             await startSystemAudioCapture();
//             setDeepgramStatus("🎤 Recording Active");
//         } catch (err) {
//             // Error handled in startSystemAudioCapture
//         }
//     };

//     useEffect(() => {
//         return () => {
//             stopDeepgramCapture();
//             stopQA();
//         };
//     }, []);

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-950 flex items-center justify-center">
//                 <div className="text-white text-xl">Loading...</div>
//             </div>
//         );
//     }

//     if (!user) return null;

//     return (
//         <div className="min-h-screen bg-gray-950 flex flex-col">
//             <InterviewHeader
//                 personaData={personaData}
//                 domain={domain}
//                 isRecording={isRecording}
//                 onStartRecording={startRecording}
//                 onStopRecording={stopRecording}
//                 onSettingsClick={() => setShowSettings(true)}
//                 onBackClick={() => navigate("/interview")}
//                 onExit={() => navigate("/interview")}
//             />

//             {showTabModal && isRecording && (
//                 <TabAudioModal
//                     onSelect={handleTabAudioSelection}
//                     onClose={() => {
//                         setShowTabModal(false);
//                         if (!interviewerStreamRef.current) {
//                             stopRecording();
//                         }
//                     }}
//                     errorMessage={tabAudioError}
//                 />
//             )}

//             {/* ================== MAIN CONTENT AREA ================== */}
//             <div className="flex-1 flex bg-gray-950">

//                 {/* ===== LEFT PANEL (30% • STICKY • OWN SCROLL) ===== */}
//                 <div className="w-[30%] border-r border-gray-800">
//                     <div className="sticky top-0 h-[calc(100vh-64px-48px)] overflow-y-auto">
//                         <TranscriptPanel
//                             activeView={activeView}
//                             onViewChange={setActiveView}
//                             interviewerTranscript={interviewerTranscript}
//                             candidateTranscript={candidateTranscript}
//                             currentInterviewerParagraph={currentInterviewerParagraph}
//                             currentCandidateParagraph={currentCandidateParagraph}
//                             interviewerInterim={interviewerInterim}
//                             candidateInterim={candidateInterim}
//                             isPaused={isPaused}
//                             onPauseToggle={() => setIsPaused(!isPaused)}
//                             isRecording={isRecording}
//                             onManualGenerate={handleManualGenerate}
//                             autoScroll={settings?.autoScroll}
//                         />
//                     </div>
//                 </div>

//                 {/* ===== RIGHT PANEL (70% • FREE SCROLL) ===== */}
//                 <div className="w-[70%] h-[calc(100vh-64px-48px)] overflow-y-auto">
//                     <QACopilot
//                         qaList={qaList}
//                         currentQuestion={currentQuestion}
//                         currentAnswer={currentAnswer}
//                         isGenerating={isGenerating}
//                         isStreamingComplete={isStreamingComplete}
//                         autoScroll={settings?.autoScroll}
//                     />
//                 </div>

//             </div>

//             <StatusBar
//                 deepgramStatus={deepgramStatus}
//                 qaStatus={qaStatus}
//                 isGenerating={isGenerating}
//                 isPaused={isPaused}
//             />

//             {showSettings && (
//                 <SettingsModal
//                     settings={settings}
//                     backendUrl={BACKEND_URL}
//                     onClose={() => setShowSettings(false)}
//                 />
//             )}
//         </div>
//     );
// }











// ============================================================================
// InterviewAssist.jsx - Main Container Component (FINAL WIRED + FIXED VERSION)
// ============================================================================
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";

// UI Components
import InterviewHeader from "../../InterviewAssistant/Interview/InterviewHeader";
import TranscriptPanel from "../../InterviewAssistant/Interview/TranscriptPanel";
import QACopilot from "../../InterviewAssistant/Interview/QACopilot";
import SettingsModal from "../../InterviewAssistant/Settings/SettingsPreviewModal";
import TabAudioModal from "../../InterviewAssistant/Interview/TabAudioModal";
import StatusBar from "../../InterviewAssistant/Interview/StatusBar";

// Context
import { useAppData } from "../../../context/AppDataContext";

// Hooks
import useAudioRecorder from "../../InterviewAssistant/hooks/useAudioRecorder";
import useTranscription from "../../InterviewAssistant/hooks/useTranscription";
import useQACopilot from "../../InterviewAssistant/hooks/useQACopilot";
import useInterviewStatus from "../../InterviewAssistant/hooks/useInterviewStatus";

// Utils
import { BACKEND_URL } from "../../utils/config";

export default function InterviewAssist() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // 🔥 DETECT MOCK MODE
  const isMockMode = location.pathname === "/mock-interview";
  const [showMockConfirm, setShowMockConfirm] = useState(false);

  // ============================================================================
  // PERSONA / DOMAIN
  // ============================================================================
  const [personaId] = useState(
    location.state?.personaId ||
      localStorage.getItem("selectedPersona") ||
      null
  );

  const [personaData] = useState(() => {
    if (location.state?.personaData) return location.state.personaData;
    const saved = localStorage.getItem("selectedPersonaData");
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [domain] = useState(
    location.state?.domain || localStorage.getItem("selectedDomain") || ""
  );

  // ============================================================================
  // GLOBAL SETTINGS
  // ============================================================================
  const { settings } = useAppData();

  const settingsRef = useRef(settings);
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  // ============================================================================
  // LOCAL UI STATE (IMPORTANT)
  // ============================================================================
  const [activeView, setActiveView] = useState("interviewer");
  const [showSettings, setShowSettings] = useState(false);

  // ============================================================================
  // HOOKS
  // ============================================================================
  const qa = useQACopilot({
    user,
    domain,
    personaId,
    personaData,
    settingsRef,
  });

  const transcription = useTranscription({
    settingsRef,
    reconnectingQaWsRef: qa.reconnectingQaWsRef,
  });

  const audio = useAudioRecorder({
    reconnectingDeepgramWsRef: transcription.reconnectingDeepgramWsRef,
  });

  const status = useInterviewStatus({
    isRecording: audio.isRecording,
    isPaused: audio.isPaused,
    deepgramStatus: transcription.deepgramStatus,
    qaStatus: qa.qaStatus,
    isGenerating: qa.isGenerating,
  });

  // ============================================================================
  // AUTH GUARD
  // ============================================================================
  useEffect(() => {
    if (!loading && !user) {
      navigate("/sign-in");
    }
  }, [user, loading, navigate]);

  // ============================================================================
  // RECORDING CONTROL (FLOW SAME)
  // ============================================================================
  const handleStartRequest = () => {
    if (isMockMode) {
      setShowMockConfirm(true);
    } else {
      startRecording();
    }
  };

  const startRecording = async () => {
    try {
      audio.setTabAudioError("");
      
      // 1. Initialize Session via API (Pre-load Resume/Style)
      const sessionId = await qa.initSession();
      if (!sessionId) {
        console.warn("❌ Session init failed, aborting start");
        return; 
      }

      await transcription.connectDeepgram();
      await audio.startMicrophoneCapture();
      if (!isMockMode) {
        audio.setShowTabModal(true);
      }
      await qa.connectQA();
      audio.setIsRecording(true);
    } catch (err) {
      console.error("Failed to start:", err);
      transcription.stopTranscription();
      qa.stopQA();
      audio.stopAudioCapture();
      audio.setIsRecording(false);
    }
  };

  const stopRecording = () => {
    transcription.stopTranscription();
    qa.stopQA();
    audio.stopAudioCapture();

    audio.setIsRecording(false);
    audio.setIsPaused(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      transcription.stopTranscription();
      qa.stopQA();
      audio.stopAudioCapture();
    };
  }, []);

  // ============================================================================
  // LOADING
  // ============================================================================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <InterviewHeader
        personaData={personaData}
        domain={domain}
        isRecording={audio.isRecording}
        onStartRecording={handleStartRequest}
        onStopRecording={stopRecording}
        onSettingsClick={() => setShowSettings(true)}
        onBackClick={() => navigate("/interview")}
        onExit={() => navigate("/interview")}
        isMockMode={isMockMode} // Pass this down if Header needs to change title or button text
      />

      {audio.showTabModal && audio.isRecording && (
        <TabAudioModal
          onSelect={audio.startSystemAudioCapture}
          onClose={() => {
            audio.setShowTabModal(false);
            if (!audio.isRecording) stopRecording();
          }}
          errorMessage={audio.tabAudioError}
        />
      )}

      {/* ================== MAIN CONTENT ================== */}
      <div className="flex-1 flex bg-gray-950">
        {/* LEFT PANEL */}
        <div className="w-[30%] border-r border-gray-800">
          <div className="sticky top-0 h-[calc(100vh-64px-48px)] overflow-y-auto">
            <TranscriptPanel
              activeView={isMockMode ? "candidate" : activeView} // 🔒 FORCE CANDIDATE VIEW IN MOCK
              onViewChange={isMockMode ? () => {} : setActiveView} // 🔒 DISABLE TOGGLE
              interviewerTranscript={transcription.interviewerTranscript}
              candidateTranscript={transcription.candidateTranscript}
              currentInterviewerParagraph={
                transcription.currentInterviewerParagraph
              }
              currentCandidateParagraph={
                transcription.currentCandidateParagraph
              }
              interviewerInterim={transcription.interviewerInterim}
              candidateInterim={transcription.candidateInterim}
              isPaused={audio.isPaused}
              onPauseToggle={() =>
                audio.setIsPaused(!audio.isPaused)
              }
              isRecording={audio.isRecording}
              onManualGenerate={qa.handleManualGenerate}
              autoScroll={settings?.autoScroll}
              isMockMode={isMockMode} // 🆕 Pass Mock Mode flag
            />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-[70%] h-[calc(100vh-64px-48px)] overflow-y-auto">
          <QACopilot
            qaList={qa.qaList}
            currentQuestion={qa.currentQuestion}
            currentAnswer={qa.currentAnswer}
            isGenerating={qa.isGenerating}
            isStreamingComplete={qa.isStreamingComplete}
            autoScroll={settings?.autoScroll}
            isMockMode={isMockMode} // 🆕 Pass Mock Mode flag
          />
        </div>
      </div>

      <StatusBar
        deepgramStatus={status.deepgramStatus}
        qaStatus={status.qaStatus}
        isGenerating={qa.isGenerating}
        isPaused={audio.isPaused}
      />

      {showSettings && (
        <SettingsModal
          settings={settings}
          backendUrl={BACKEND_URL}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* 🔥 MOCK CONFIRMATION MODAL */}
      {showMockConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#0F1115] border border-white/10 rounded-2xl shadow-2xl p-6">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Ready to Start Mock Interview?
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                The AI will listen to your answers and generate follow-up questions.
                Ensure your microphone is ready.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowMockConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowMockConfirm(false);
                    startRecording();
                  }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-white text-black hover:bg-gray-200 transition-colors"
                >
                  Start Mock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
