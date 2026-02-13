import { useRef, useState } from "react";

export default function useAudioRecorder({
  reconnectingDeepgramWsRef,
}) {
  // ======================
  // STATE
  // ======================
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [showTabModal, setShowTabModal] = useState(false);
  const [tabAudioError, setTabAudioError] = useState("");

  // ======================
  // REFS
  // ======================
  const candidateStreamRef = useRef(null);
  const interviewerStreamRef = useRef(null);

  const candidateAudioContextRef = useRef(null);
  const interviewerAudioContextRef = useRef(null);

  const candidateProcessorRef = useRef(null);
  const interviewerProcessorRef = useRef(null);

  // ======================
  // MICROPHONE (CANDIDATE) - OPTIMIZED
  // ======================
  const startMicrophoneCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      candidateStreamRef.current = stream;

      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)({
        sampleRate: 16000,
      });
      candidateAudioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      
      // ✅ OPTIMIZED: Reduced buffer size from 4096 to 2048
      // This reduces latency by ~50% (from ~256ms to ~128ms at 16kHz)
      const processor = audioContext.createScriptProcessor(2048, 1, 1);
      candidateProcessorRef.current = processor;

      processor.onaudioprocess = (e) => {
        if (!reconnectingDeepgramWsRef.current || isPaused) return;

        const inputData = e.inputBuffer.getChannelData(0);
        const pcm16 = new Int16Array(inputData.length);

        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]));
          pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
        }

        reconnectingDeepgramWsRef.current.send({
          type: "candidate",
          audio: Array.from(pcm16),
        });
      };

      source.connect(processor);
      processor.connect(audioContext.destination);

      console.log("✓ Microphone started (2048 buffer - LOW LATENCY)");
    } catch (err) {
      console.error("Microphone error:", err);
      setTabAudioError("Microphone denied");
      throw err;
    }
  };

  // ======================
  // SYSTEM / TAB AUDIO - OPTIMIZED
  // ======================
  const startSystemAudioCapture = async () => {
    console.log("🎤 startSystemAudioCapture called");

    if (interviewerStreamRef.current) {
      console.warn("⚠️ Interviewer audio already capturing (interviewerStreamRef.current is SET)");
      return;
    }

    try {
      console.log("🖥️ Calling getDisplayMedia...");
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 1 },
          height: { ideal: 1 },
          frameRate: { ideal: 1 },
        },
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          suppressLocalAudioPlayback: false,
        },
      });
      console.log("✅ getDisplayMedia success", stream);

      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.stop();
        stream.removeTrack(videoTrack);
      }

      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length === 0) {
        throw new Error('No audio track. Enable "Share audio".');
      }

      interviewerStreamRef.current = stream;

      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)({
        sampleRate: 16000,
      });
      interviewerAudioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      
      // ✅ OPTIMIZED: Reduced buffer size from 4096 to 2048
      const processor = audioContext.createScriptProcessor(2048, 1, 1);
      interviewerProcessorRef.current = processor;

      processor.onaudioprocess = (e) => {
        if (!reconnectingDeepgramWsRef.current || isPaused) return;

        const inputData = e.inputBuffer.getChannelData(0);
        const pcm16 = new Int16Array(inputData.length);

        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]));
          pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
        }

        reconnectingDeepgramWsRef.current.send({
          type: "interviewer",
          audio: Array.from(pcm16),
        });
      };

      source.connect(processor);
      processor.connect(audioContext.destination);

      console.log("✓ System audio started (2048 buffer - LOW LATENCY)");
      setShowTabModal(false);
    } catch (err) {
      console.error("System audio error:", err);

      if (err.name === "NotAllowedError") {
        setTabAudioError("Screen share denied");
      } else if (err.message.includes("No audio track")) {
        setTabAudioError('No audio. Check "Share tab audio"');
        setShowTabModal(true);
      } else {
        setTabAudioError(`Failed: ${err.message}`);
      }

      throw err;
    }
  };

  // ======================
  // STOP / CLEANUP
  // ======================
  const stopAudioCapture = () => {
    if (candidateProcessorRef.current) {
      candidateProcessorRef.current.disconnect();
      candidateProcessorRef.current = null;
    }
    if (candidateAudioContextRef.current) {
      candidateAudioContextRef.current.close();
      candidateAudioContextRef.current = null;
    }
    if (candidateStreamRef.current) {
      candidateStreamRef.current.getTracks().forEach((t) => t.stop());
      candidateStreamRef.current = null;
    }

    if (interviewerProcessorRef.current) {
      interviewerProcessorRef.current.disconnect();
      interviewerProcessorRef.current = null;
    }
    if (interviewerAudioContextRef.current) {
      interviewerAudioContextRef.current.close();
      interviewerAudioContextRef.current = null;
    }
    if (interviewerStreamRef.current) {
      interviewerStreamRef.current.getTracks().forEach((t) => t.stop());
      interviewerStreamRef.current = null;
    }

    console.log("✓ Audio capture stopped");
  };

  // ======================
  // EXPOSE API
  // ======================
  const returnValue = {
    // state
    isRecording,
    setIsRecording,

    isPaused,
    setIsPaused,

    showTabModal,
    setShowTabModal,

    tabAudioError,
    setTabAudioError,

    // methods
    startMicrophoneCapture,
    startSystemAudioCapture,
    stopAudioCapture,
  };
  
  
  return returnValue;
}