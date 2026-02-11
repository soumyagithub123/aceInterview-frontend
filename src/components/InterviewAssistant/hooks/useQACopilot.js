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
  useEffect(() => {
    if (!sessionIdRef.current) {
      sessionIdRef.current =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `session-${Date.now()}-${Math.random()
              .toString(36)
              .substr(2, 9)}`;

      console.log(
        `🆔 [Session] New Session ID Generated: ${sessionIdRef.current}`
      );
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // ======================
  // INIT SESSION (API)
  // ======================
  const initSession = async () => {
    try {
      console.log("🚀 Initializing Session via API...");

      const payload = {
        user_id: user?.id || "anonymous",
        persona_id: personaId,
        custom_style_prompt:
          settingsRef.current?.custom_style_prompt || null,
        is_mock_mode: isMockMode, // 🔥 NEW
      };

      const res = await fetch(`${BACKEND_URL}/session/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Session init failed");
      }

      const data = await res.json();
      console.log("✅ Session Initialized:", data);

      if (data.session_id) {
        sessionIdRef.current = data.session_id;
      }

      // 🔥 Start interview timer
      if (isMockMode) {
        setInterviewStartTime(Date.now());
      }

      return data.session_id;
    } catch (err) {
      console.error("🔴 Session Init Error:", err);
      setQaStatus(`Init Error: ${err.message}`);
      return null;
    }
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
        const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
        const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
        
        if (secondAvg > firstAvg + 5) trend = 'up';
        else if (secondAvg < firstAvg - 5) trend = 'down';
      }

      categoryAnalysis[category] = {
        score: avgScore,
        trend,
        feedback: getFeedbackForCategory(category, avgScore)
      };
    });

    const overallScore = performanceMetrics.questions_answered > 0
      ? Math.round(performanceMetrics.total_score / performanceMetrics.questions_answered)
      : 0;

    // Calculate time metrics
    const responseTimes = performanceMetrics.question_details
      .map(q => q.duration_seconds)
      .filter(t => t > 0);
    
    const avgResponseTime = responseTimes.length > 0
      ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length)
      : 0;

    const analytics = {
      overall_score: overallScore,
      total_questions: performanceMetrics.questions_answered,
      completion_rate: 100, // Can be calculated based on expected vs answered
      duration_minutes: duration,
      
      categories: categoryAnalysis,
      
      strengths: extractStrengths(performanceMetrics.question_details),
      improvements: extractImprovements(performanceMetrics.question_details),
      
      question_breakdown: performanceMetrics.question_details,
      
      time_analysis: {
        avg_response_time: avgResponseTime,
        fastest_response: responseTimes.length > 0 ? Math.min(...responseTimes) : 0,
        slowest_response: responseTimes.length > 0 ? Math.max(...responseTimes) : 0,
        optimal_range: [90, 180]
      },
      
      speech_metrics: {
        avg_words_per_minute: calculateWPM(performanceMetrics.speech_metrics),
        filler_words_count: performanceMetrics.speech_metrics.filler_words || 0,
        pause_frequency: 'moderate',
        clarity_score: 8.2
      },
      
      recommendations: generateRecommendations(performanceMetrics, categoryAnalysis)
    };

    setAnalyticsData(analytics);
    setShowAnalytics(true);

    return analytics;
  };

  // ======================
  // 🔥 HELPER FUNCTIONS
  // ======================
  const getFeedbackForCategory = (category, score) => {
    const feedbackMap = {
      communication: {
        high: 'Excellent communication skills demonstrated',
        medium: 'Good communication, room for improvement',
        low: 'Work on clarity and articulation'
      },
      technical: {
        high: 'Strong technical knowledge',
        medium: 'Solid fundamentals, deepen expertise',
        low: 'Focus on core technical concepts'
      },
      behavioral: {
        high: 'Great use of STAR method and examples',
        medium: 'Good examples, could be more specific',
        low: 'Provide more concrete examples'
      },
      problem_solving: {
        high: 'Excellent analytical approach',
        medium: 'Good problem-solving structure',
        low: 'Work on systematic problem breakdown'
      }
    };

    const level = score >= 80 ? 'high' : score >= 60 ? 'medium' : 'low';
    return feedbackMap[category]?.[level] || 'Continue practicing';
  };

  const extractStrengths = (questions) => {
    const strengths = [];
    const highScoreQuestions = questions.filter(q => (q.score || 0) >= 80);
    
    if (highScoreQuestions.length > 0) {
      strengths.push('Consistent high performance across multiple questions');
    }
    
    const categories = [...new Set(highScoreQuestions.map(q => q.category))];
    categories.forEach(cat => {
      strengths.push(`Strong ${cat} skills`);
    });

    return strengths.slice(0, 4);
  };

  const extractImprovements = (questions) => {
    const improvements = [];
    const lowScoreQuestions = questions.filter(q => (q.score || 0) < 70);
    
    lowScoreQuestions.forEach(q => {
      if (q.feedback) {
        improvements.push(q.feedback);
      }
    });

    return [...new Set(improvements)].slice(0, 4);
  };

  const calculateWPM = (speechMetrics) => {
    if (speechMetrics.total_duration === 0) return 140;
    return Math.round((speechMetrics.total_words / speechMetrics.total_duration) * 60);
  };

  const generateRecommendations = (metrics, categoryAnalysis) => {
    const recommendations = [];
    
    // Low scoring categories
    Object.entries(categoryAnalysis).forEach(([category, data]) => {
      if (data.score < 70) {
        recommendations.push({
          title: `Improve ${category} skills`,
          description: `Focus on strengthening your ${category} responses`,
          priority: 'high',
          resources: [`${category} guide`, 'Practice questions']
        });
      }
    });

    return recommendations;
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
              setQaStatus(isMockMode ? "🎤 Mock Interview Active" : "🤖 Q&A Active");
              break;

            case "reset_ack":
              setCurrentQuestion("");
              setCurrentAnswer("");
              setIsGenerating(false);
              setIsStreamingComplete(false);
              break;

            // 🆕 MOCK QUESTION RECEIVED
            case "mock_question":
              console.log("✅ [Mock] Question received:", data.question);
              setCurrentMockQuestion(data.question);
              setCurrentQuestion(data.question);
              setCurrentAnswer("");
              setIsGenerating(false);
              setMockQuestionAudio(data.audio);

              if (data.audio) {
                playQuestionAudio(data.audio);
              } else {
                setIsWaitingForAnswer(true);
              }
              break;

            // 🆕 MOCK ANSWER FEEDBACK
            case "feedback_generating":
              console.log("⏳ [Mock] Generating feedback...");
              setIsGenerating(true);
              break;

            case "answer_feedback":
              console.log("✅ [Mock] Feedback received");
              setIsGenerating(false);

              // 🔥 Calculate response time
              const responseTime = questionStartTime 
                ? Math.floor((Date.now() - questionStartTime) / 1000)
                : 0;

              // 🔥 Update analytics
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

            // REGULAR INTERVIEW MODE
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
            is_mock_mode: isMockMode, // 🔥 NEW
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

          console.log("📤 [QACopilot] Sending WS init");
          reconnectingQaWsRef.current?.send(initMessage);
          resolve(reconnectingQaWsRef.current);
        } else if (status === "reconnecting") {
          setQaStatus("🔄 Reconnecting...");
        } else if (status === "disconnected") {
          setQaStatus("Disconnected");
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

    // 🔥 Finalize analytics before closing
    if (isMockMode && interviewStartTime) {
      await finalizeAnalytics();
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
  // MANUAL GENERATE (SAFE)
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

    // 🔥 ANALYTICS EXPORTS (NEW)
    analyticsData,
    showAnalytics,
    setShowAnalytics,
    finalizeAnalytics,
    performanceMetrics,
  };
}