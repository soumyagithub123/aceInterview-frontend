import { useRef, useState, useEffect } from "react";
import { ReconnectingWebSocket } from "../../utils/websocket";
import { getWebSocketUrl, BACKEND_URL } from "../../utils/config";

export default function useQACopilot({
  user,
  domain,
  personaId,
  personaData,
  settingsRef,
  isMockMode = false,
  existingSessionId = null, // ✅ NEW: Prop
  sessionData = null,       // ✅ NEW: Prop
  knowledgeBaseIds = [],
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

  // 🆕 MOCK MODE STATE
  const [currentMockQuestion, setCurrentMockQuestion] = useState("");
  const [mockQuestionAudio, setMockQuestionAudio] = useState(null);
  const [isWaitingForAnswer, setIsWaitingForAnswer] = useState(false);

  // 🔥 ANALYTICS STATE (NEW)
  const [analyticsData, setAnalyticsData] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [interviewStartTime, setInterviewStartTime] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(null);

  // ✅ NEW: Store KB data from passed session data
  const [knowledgeBasesData, setKnowledgeBasesData] = useState(
    sessionData?.knowledge_bases || []
  );

  // Track performance metrics
  const [performanceMetrics, setPerformanceMetrics] = useState({
    questions_answered: 0,
    total_score: 0,
    category_scores: {},
    question_details: [],
    strengths: [],
    improvements: [],
    speech_metrics: {
      total_words: 0,
      total_duration: 0,
      filler_words: 0,
    }
  });

  // ======================
  // REFS
  // ======================
  const qaWsRef = useRef(null);
  const reconnectingQaWsRef = useRef(null);
  const sessionIdRef = useRef(null);

  const audioRef = useRef(null);

  // Initialize Session ID on mount
  // Initialize Session ID on mount
  useEffect(() => {
    if (!sessionIdRef.current) {
      if (existingSessionId) {
        sessionIdRef.current = existingSessionId;
        console.log(`🆔 [Session] Using Existing Session ID: ${existingSessionId}`);
      } else {
        sessionIdRef.current =
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `session-${Date.now()}-${Math.random()
                .toString(36)
                .substr(2, 9)}`;

        console.log(
          `🆔 [Session] New Session ID Generated (Fallback): ${sessionIdRef.current}`
        );
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // ======================
  // ✅ INIT SESSION (Uses Existing)
  // ======================
  const initSession = async () => {
    // If we have an existing session ID (passed from Launchpad), just use it.
    if (existingSessionId) {
      if (!sessionIdRef.current) {
         sessionIdRef.current = existingSessionId;
      }
      
      // Update KB data if not already set (re-sync from prop if needed)
      if (sessionData?.knowledge_bases && knowledgeBasesData.length === 0) {
         setKnowledgeBasesData(sessionData.knowledge_bases);
      }

      console.log(`🚀 [useQACopilot] Session already initialized: ${existingSessionId}`);

       // 🔥 Start interview timer
      if (isMockMode && !interviewStartTime) {
        setInterviewStartTime(Date.now());
      }
      
      return existingSessionId;
    }

    // Fallback if no session ID passed (should rarely happen in new flow)
    console.warn("⚠️ No existing session ID passed to useQACopilot. Using local ID.");
    return sessionIdRef.current;
  };

  // ======================
  // 🆕 REQUEST MOCK QUESTION
  // ======================
  const requestMockQuestion = async (questionNumber) => {
    if (!reconnectingQaWsRef.current || !sessionIdRef.current) {
      console.error("❌ Cannot request mock question: WS not ready");
      return;
    }

    console.log(`🎤 [Mock] Requesting question #${questionNumber || "next"}`);
    setIsGenerating(true);
    setIsWaitingForAnswer(false);
    setQuestionStartTime(Date.now()); // 🔥 Track question start time

    reconnectingQaWsRef.current.send({
      type: "request_mock_question",
      question_number: questionNumber || 1,
      voice: settingsRef.current?.candidate_voice_settings?.voice || "alloy",
      include_audio: true,
    });
  };

  // ======================
  // 🆕 PLAY QUESTION AUDIO
  // ======================
  const playQuestionAudio = (base64Audio) => {
    if (!base64Audio) return;

    try {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
      audioRef.current = audio;

      audio.play();
      console.log("🔊 Playing mock question audio");

      audio.onended = () => {
        console.log("✅ Audio playback complete");
        setIsWaitingForAnswer(true);
      };

      audio.onerror = (err) => {
        console.error("❌ Audio playback error:", err);
        setIsWaitingForAnswer(true);
      };
    } catch (err) {
      console.error("❌ Failed to play audio:", err);
      setIsWaitingForAnswer(true);
    }
  };

  // ======================
  // 🆕 SUBMIT MOCK ANSWER
  // ======================
  const submitMockAnswer = async (answerText) => {
    if (!reconnectingQaWsRef.current || !currentMockQuestion) {
      console.error("❌ Cannot submit answer: No question active");
      return;
    }

    console.log("📤 [Mock] Submitting answer for evaluation");

    // 🔥 Calculate response time
    const responseTime = questionStartTime 
      ? Math.floor((Date.now() - questionStartTime) / 1000)
      : 0;

    reconnectingQaWsRef.current.send({
      type: "evaluate_answer",
      question: currentMockQuestion,
      answer: answerText,
      get_feedback: true,
      response_time_seconds: responseTime, // 🔥 NEW
    });

    setIsGenerating(true);
  };

  // ======================
  // 🔥 UPDATE PERFORMANCE METRICS
  // ======================
  const updatePerformanceMetrics = (questionData) => {
    setPerformanceMetrics(prev => {
      const newMetrics = { ...prev };
      
      // Add question details
      newMetrics.question_details.push(questionData);
      newMetrics.questions_answered += 1;
      
      // Update category scores
      if (questionData.category) {
        if (!newMetrics.category_scores[questionData.category]) {
          newMetrics.category_scores[questionData.category] = {
            total: 0,
            count: 0,
            scores: []
          };
        }
        newMetrics.category_scores[questionData.category].total += questionData.score || 0;
        newMetrics.category_scores[questionData.category].count += 1;
        newMetrics.category_scores[questionData.category].scores.push(questionData.score || 0);
      }

      // Update total score
      newMetrics.total_score += questionData.score || 0;

      return newMetrics;
    });
  };

  // ======================
  // 🔥 FINALIZE ANALYTICS
  // ======================
  const finalizeAnalytics = async () => {
    if (!isMockMode) return;

    const duration = interviewStartTime 
      ? Math.floor((Date.now() - interviewStartTime) / 60000)
      : 0;

    const categoryAnalysis = {};
    Object.entries(performanceMetrics.category_scores).forEach(([category, data]) => {
      const avgScore = data.count > 0 ? Math.round(data.total / data.count) : 0;
      
      // Calculate trend
      let trend = 'neutral';
      if (data.scores.length >= 2) {
        const firstHalf = data.scores.slice(0, Math.ceil(data.scores.length / 2));
        const secondHalf = data.scores.slice(Math.ceil(data.scores.length / 2));
        const avgFirst = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
        const avgSecond = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
        
        if (avgSecond > avgFirst + 5) trend = 'improving';
        else if (avgSecond < avgFirst - 5) trend = 'declining';
      }

      categoryAnalysis[category] = {
        avgScore,
        count: data.count,
        trend,
        scores: data.scores
      };
    });

    // Calculate strengths and improvements
    const strengths = Object.entries(categoryAnalysis)
      .filter(([, data]) => data.avgScore >= 70)
      .map(([category]) => category);

    const improvements = Object.entries(categoryAnalysis)
      .filter(([, data]) => data.avgScore < 60)
      .map(([category]) => category);

    const avgScore = performanceMetrics.questions_answered > 0
      ? Math.round(performanceMetrics.total_score / performanceMetrics.questions_answered)
      : 0;

    // Calculate time analysis
    const responseTimes = performanceMetrics.question_details.map(q => q.duration_seconds || 0);
    const avgResponseTime = responseTimes.length > 0 
      ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length) 
      : 0;
    
    const timeAnalysis = {
      avg_response_time: avgResponseTime,
      fastest_response: responseTimes.length > 0 ? Math.min(...responseTimes) : 0,
      slowest_response: responseTimes.length > 0 ? Math.max(...responseTimes) : 0,
      optimal_range: [60, 180]
    };

    // Calculate completion rate (assuming 5 questions for now or just based on answered)
    // For now we'll just say 100% of what was asked
    const completionRate = 100; 

    const analyticsPayload = {
      session_id: sessionIdRef.current,
      user_id: user?.id,
      persona_id: personaId,
      
      // Mapped fields for MockInterviewAnalytics
      overall_score: avgScore,
      total_questions: performanceMetrics.questions_answered,
      duration_minutes: duration,
      completion_rate: completionRate,
      
      categories: Object.entries(categoryAnalysis).reduce((acc, [key, val]) => {
        acc[key] = {
          score: val.avgScore,
          trend: val.trend,
          feedback: val.avgScore >= 80 ? 'Great performance' : val.avgScore >= 60 ? 'Good effort' : 'Needs improvement' 
        };
        return acc;
      }, {}),

      strengths: strengths.length > 0 ? strengths : ['Persistence', 'Completing the interview'],
      improvements: improvements.length > 0 ? improvements : ['Practice more questions to identify specific areas'],
      
      question_breakdown: performanceMetrics.question_details,
      
      time_analysis: timeAnalysis,
      
      // Default/Placeholder metrics if not tracked yet
      speech_metrics: {
        avg_words_per_minute: 130, // Placeholder
        filler_words_count: 5,     // Placeholder
        pause_frequency: 'moderate',
        clarity_score: 8.5
      },
      
      recommendations: [
        {
          title: 'Review Key Topics',
          description: 'Go over the questions you found difficult.',
          priority: 'high',
          resources: ['Documentation', 'Practice']
        }
      ]
    };

    console.log("📊 Analytics Payload:", analyticsPayload);
    setAnalyticsData(analyticsPayload);

    try {
      const res = await fetch(`${BACKEND_URL}/api/analytics/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(analyticsPayload),
      });

      if (res.ok) {
        console.log("✅ Analytics submitted successfully");
      }
    } catch (err) {
      console.error("❌ Failed to submit analytics:", err);
    }
  };

  // ======================
  // ADD Q&A
  // ======================
  const addQA = ({ question, answer }) => {
    if (!question || !answer) return;

    setQaList((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        question,
        answer,
      },
    ]);
  };

  // ======================
  // CONNECT QA (WS)
  // ======================
  const connectQA = async () => {
    return new Promise((resolve) => {
      const qaUrl = getWebSocketUrl("/ws/live-interview");

      console.log(`🔗 [QACopilot] Connecting to: ${qaUrl}`);
      setQaStatus("Connecting...");

      const handleMessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          switch (data.type) {
            case "init_complete":
              console.log("✅ [QACopilot] Init complete");
              setQaStatus("Ready");
              resolve();
              break;

            case "mock_question":
              console.log("🎤 [Mock] Question received");
              setCurrentMockQuestion(data.question || "");
              setCurrentQuestion(data.question || "");
              setIsGenerating(false);
              
              if (data.audio) {
                setMockQuestionAudio(data.audio);
                playQuestionAudio(data.audio);
              } else {
                setIsWaitingForAnswer(true);
              }
              break;

            case "feedback_generating":
              console.log("⏳ [Mock] Generating feedback...");
              setIsGenerating(true);
              break;

            case "answer_feedback":
              console.log("✅ [Mock] Feedback received");
              setIsGenerating(false);

              const responseTime = questionStartTime 
                ? Math.floor((Date.now() - questionStartTime) / 1000)
                : 0;

              const questionData = {
                number: performanceMetrics.questions_answered + 1,
                question: data.question || currentMockQuestion,
                category: data.category || 'general',
                score: data.score || 0,
                duration_seconds: responseTime,
                key_points_covered: data.key_points_covered || 0,
                key_points_expected: data.key_points_expected || 0,
                feedback: data.feedback || ''
              };

              updatePerformanceMetrics(questionData);

              addQA({
                question: data.question || currentMockQuestion,
                answer: `**Your Answer:**\n(Recorded)\n\n**Score: ${data.score || 0}/100**\n\n**AI Feedback:**\n${data.feedback}`,
              });

              setCurrentMockQuestion("");
              setCurrentQuestion("");
              setCurrentAnswer("");
              setIsWaitingForAnswer(false);
              break;

            case "answer_acknowledged":
              console.log("✅ [Mock] Answer acknowledged");
              setIsGenerating(false);
              setCurrentMockQuestion("");
              setCurrentQuestion("");
              setIsWaitingForAnswer(false);
              break;

            case "question_detected":
              if (isMockMode) break;

              if (!data.question) return;
              console.log("❓ [QACopilot] Question:", data.question);
              setCurrentQuestion(data.question);
              setCurrentAnswer("");
              setIsGenerating(true);
              setIsStreamingComplete(false);
              break;

            case "answer_delta":
              if (isMockMode) break;

              if (data.delta) {
                setIsGenerating(false);
                setCurrentAnswer((prev) => prev + data.delta);
              }
              break;

            case "answer_complete":
            case "answer_ready":
              if (isMockMode) break;

              console.log("✅ [QACopilot] Answer complete");

              if (data.answer && typeof data.answer === "string") {
                setCurrentAnswer(data.answer);
              }

              setIsGenerating(false);
              setIsStreamingComplete(true);

              addQA({
                question: data.question || currentQuestion,
                answer: data.answer || currentAnswer,
              });

              setCurrentQuestion("");
              setCurrentAnswer("");
              setIsStreamingComplete(false);
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

          const initMessage = {
            type: "init",
            session_id: sessionIdRef.current,
            domain: domain || "General",
            user_id: user?.id || null,
            is_mock_mode: isMockMode,
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

          reconnectingQaWsRef.current.send(initMessage);
          console.log("✅ [QACopilot] Init message sent");
        }

        if (status === "closed" || status === "error") {
          setQaStatus("⚠️ Disconnected");
        }
      };

      reconnectingQaWsRef.current = new ReconnectingWebSocket(
        qaUrl,
        handleMessage,
        handleStatusChange,
        3
      );

      // ✅ Trigger connection
      reconnectingQaWsRef.current.connect();

      qaWsRef.current = reconnectingQaWsRef.current;
      resolve();
    });
  };

  // ======================
  // STOP QA
  // ======================
  const stopQA = async () => {
    if (reconnectingQaWsRef.current && sessionIdRef.current) {
      console.log(
        `🛑 [QACopilot] Ending session: ${sessionIdRef.current}`
      );

      reconnectingQaWsRef.current.send({
        type: "session_end",
        session_id: sessionIdRef.current,
      });
    }

    if (isMockMode && interviewStartTime) {
      await finalizeAnalytics();
      setShowAnalytics(true);
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

    setCurrentMockQuestion("");
    setMockQuestionAudio(null);
    setIsWaitingForAnswer(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    console.log("✅ [QACopilot] Q&A stopped cleanly");
  };

  // ======================
  // MANUAL GENERATE
  // ======================
  const handleManualGenerate = async (text) => {
    try {
      console.log("✏️ [QACopilot] Manual generate");

      const payload = {
        user_id: user?.id || "anonymous",
        session_id: sessionIdRef.current,
        message: text,
        model: settingsRef.current?.defaultModel || "gpt-4o",
      };

      const res = await fetch(`${BACKEND_URL}/api/manual-generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

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
      console.error("❌ [QACopilot] Manual generate failed:", err);
    }
  };

  // ======================
  // EXPOSE API
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
    initSession,

    // MOCK MODE EXPORTS
    requestMockQuestion,
    submitMockAnswer,
    currentMockQuestion,
    isWaitingForAnswer,

    // ANALYTICS EXPORTS
    analyticsData,
    showAnalytics,
    setShowAnalytics,
    finalizeAnalytics,
    performanceMetrics,

    // ✅ NEW: KB DATA
    knowledgeBasesData,
  };
}