import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, Minus, Clock, MessageSquare, 
  Target, Award, AlertCircle, CheckCircle, XCircle,
  BarChart3, PieChart, Activity, Sparkles, Download,
  RefreshCw, ChevronRight, Zap, Brain, Lightbulb
} from 'lucide-react';

/**
 * MockInterviewAnalytics Component
 * 
 * Displays comprehensive performance analytics after a mock interview
 * 
 * Props:
 * - analyticsData: Object containing all performance metrics
 * - onClose: Function to close the analytics view
 * - onRetake: Function to retake the interview
 * - onDownloadReport: Function to download detailed report
 */

export default function MockInterviewAnalytics({ 
  analyticsData, 
  onClose, 
  onRetake,
  onDownloadReport 
}) {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data structure (replace with actual data from backend)
  const mockData = analyticsData || {
    overall_score: 78,
    total_questions: 8,
    completion_rate: 100,
    duration_minutes: 24,
    
    categories: {
      communication: { score: 82, trend: 'up', feedback: 'Clear and articulate responses' },
      technical_knowledge: { score: 75, trend: 'neutral', feedback: 'Good foundational knowledge' },
      problem_solving: { score: 80, trend: 'up', feedback: 'Structured approach to challenges' },
      behavioral: { score: 72, trend: 'down', feedback: 'Could use more specific examples' }
    },

    strengths: [
      'Excellent communication skills',
      'Strong technical foundation',
      'Good time management',
      'Confident delivery'
    ],

    improvements: [
      'Provide more concrete examples from past experience',
      'Deeper dive into system design concepts',
      'Better handling of edge cases in problem-solving',
      'More structured STAR method in behavioral answers'
    ],

    question_breakdown: [
      {
        number: 1,
        question: 'Tell me about yourself',
        category: 'behavioral',
        score: 85,
        duration_seconds: 120,
        key_points_covered: 4,
        key_points_expected: 5,
        feedback: 'Well-structured introduction, could have mentioned leadership experience'
      },
      {
        number: 2,
        question: 'Why do you want to work here?',
        category: 'behavioral',
        score: 70,
        duration_seconds: 90,
        key_points_covered: 3,
        key_points_expected: 4,
        feedback: 'Good enthusiasm, but lacked specific company research'
      },
      {
        number: 3,
        question: 'Explain the difference between REST and GraphQL',
        category: 'technical',
        score: 88,
        duration_seconds: 180,
        key_points_covered: 7,
        key_points_expected: 7,
        feedback: 'Comprehensive answer with real-world examples'
      },
      // Add more questions...
    ],

    time_analysis: {
      avg_response_time: 135,
      fastest_response: 85,
      slowest_response: 210,
      optimal_range: [90, 180]
    },

    speech_metrics: {
      avg_words_per_minute: 142,
      filler_words_count: 12,
      pause_frequency: 'moderate',
      clarity_score: 8.2
    },

    recommendations: [
      {
        title: 'Practice STAR Method',
        description: 'Structure behavioral answers using Situation, Task, Action, Result framework',
        priority: 'high',
        resources: ['STAR Method Guide', 'Example Responses']
      },
      {
        title: 'Deep Dive into System Design',
        description: 'Study scalability patterns and architectural trade-offs',
        priority: 'medium',
        resources: ['System Design Primer', 'Case Studies']
      },
      {
        title: 'Research Company Culture',
        description: 'Prepare company-specific talking points and questions',
        priority: 'high',
        resources: ['Company Blog', 'Glassdoor Reviews']
      }
    ]
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-emerald-500/10 border-emerald-500/20';
    if (score >= 60) return 'bg-amber-500/10 border-amber-500/20';
    return 'bg-rose-500/10 border-rose-500/20';
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-emerald-400" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-rose-400" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Hero Score Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-600/20 via-fuchsia-600/10 to-transparent p-8">
        <div className="absolute -top-24 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-medium text-purple-200">Overall Performance</span>
            </div>
            <div className={`text-7xl font-bold mb-2 ${getScoreColor(mockData.overall_score)}`}>
              {mockData.overall_score}
              <span className="text-3xl text-gray-400">/100</span>
            </div>
            <p className="text-gray-300 text-lg">
              {mockData.overall_score >= 80 ? 'Excellent Performance!' : 
               mockData.overall_score >= 60 ? 'Good Job!' : 'Keep Practicing!'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-400">Questions</span>
              </div>
              <div className="text-2xl font-bold text-white">{mockData.total_questions}</div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-gray-400">Duration</span>
              </div>
              <div className="text-2xl font-bold text-white">{mockData.duration_minutes}m</div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-gray-400">Completion</span>
              </div>
              <div className="text-2xl font-bold text-white">{mockData.completion_rate}%</div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-gray-400">WPM</span>
              </div>
              <div className="text-2xl font-bold text-white">{mockData.speech_metrics.avg_words_per_minute}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(mockData.categories).map(([key, data]) => (
          <div key={key} className={`rounded-xl border p-5 ${getScoreBgColor(data.score)}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white capitalize">
                    {key.replace('_', ' ')}
                  </h3>
                  {getTrendIcon(data.trend)}
                </div>
                <p className="text-xs text-gray-400 mt-1">{data.feedback}</p>
              </div>
              <div className={`text-3xl font-bold ${getScoreColor(data.score)}`}>
                {data.score}
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full ${data.score >= 80 ? 'bg-emerald-400' : data.score >= 60 ? 'bg-amber-400' : 'bg-rose-400'}`}
                style={{ width: `${data.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Strengths & Improvements */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Key Strengths</h3>
          </div>
          <ul className="space-y-3">
            {mockData.strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-gray-200 text-sm">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">Areas to Improve</h3>
          </div>
          <ul className="space-y-3">
            {mockData.improvements.map((improvement, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-gray-200 text-sm">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const QuestionBreakdownTab = () => (
    <div className="space-y-4">
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h3 className="text-sm font-medium text-gray-300 mb-2">Performance by Question</h3>
        <p className="text-xs text-gray-500">Detailed analysis of each interview question</p>
      </div>

      {mockData.question_breakdown.map((q) => (
        <div key={q.number} className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-5 hover:border-purple-500/30 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <span className="text-sm font-bold text-purple-300">Q{q.number}</span>
                </div>
                <h4 className="text-white font-medium">{q.question}</h4>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-md border border-blue-500/30 capitalize">
                  {q.category}
                </span>
                <span className="text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {Math.floor(q.duration_seconds / 60)}m {q.duration_seconds % 60}s
                </span>
                <span className="text-gray-400">
                  Covered {q.key_points_covered}/{q.key_points_expected} key points
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-3xl font-bold ${getScoreColor(q.score)}`}>
                {q.score}
              </div>
              <div className="text-xs text-gray-500">Score</div>
            </div>
          </div>

          {/* Score bar */}
          <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-3">
            <div 
              className={`h-full ${q.score >= 80 ? 'bg-emerald-400' : q.score >= 60 ? 'bg-amber-400' : 'bg-rose-400'}`}
              style={{ width: `${q.score}%` }}
            />
          </div>

          {/* Feedback */}
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="flex items-start gap-2">
              <Brain className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300">{q.feedback}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const InsightsTab = () => (
    <div className="space-y-6">
      {/* Time Analysis */}
      <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/5 border border-blue-500/20 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Response Time Analysis</h3>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-xs text-gray-400 mb-1">Average</div>
            <div className="text-2xl font-bold text-white">{mockData.time_analysis.avg_response_time}s</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-xs text-gray-400 mb-1">Fastest</div>
            <div className="text-2xl font-bold text-emerald-400">{mockData.time_analysis.fastest_response}s</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-xs text-gray-400 mb-1">Slowest</div>
            <div className="text-2xl font-bold text-amber-400">{mockData.time_analysis.slowest_response}s</div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="text-xs text-gray-400 mb-2">Optimal Range: {mockData.time_analysis.optimal_range[0]}-{mockData.time_analysis.optimal_range[1]}s</div>
          <p className="text-sm text-gray-300">
            Your average response time is within the optimal range, showing good pacing and thoughtfulness.
          </p>
        </div>
      </div>

      {/* Speech Metrics */}
      <div className="bg-gradient-to-br from-purple-600/10 to-fuchsia-600/5 border border-purple-500/20 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Speech Quality Metrics</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Words Per Minute</span>
              <span className="text-xl font-bold text-white">{mockData.speech_metrics.avg_words_per_minute}</span>
            </div>
            <div className="text-xs text-emerald-400">✓ Optimal pace (120-160 WPM)</div>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Filler Words</span>
              <span className="text-xl font-bold text-white">{mockData.speech_metrics.filler_words_count}</span>
            </div>
            <div className="text-xs text-amber-400">Could be reduced further</div>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Pause Frequency</span>
              <span className="text-xl font-bold text-white capitalize">{mockData.speech_metrics.pause_frequency}</span>
            </div>
            <div className="text-xs text-emerald-400">✓ Good balance</div>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Clarity Score</span>
              <span className="text-xl font-bold text-white">{mockData.speech_metrics.clarity_score}/10</span>
            </div>
            <div className="text-xs text-emerald-400">✓ Clear articulation</div>
          </div>
        </div>
      </div>

      {/* Personalized Recommendations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          Personalized Recommendations
        </h3>

        {mockData.recommendations.map((rec, idx) => (
          <div key={idx} className={`border rounded-xl p-5 ${
            rec.priority === 'high' 
              ? 'bg-rose-500/10 border-rose-500/20' 
              : 'bg-blue-500/10 border-blue-500/20'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-white">{rec.title}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    rec.priority === 'high'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}>
                    {rec.priority} priority
                  </span>
                </div>
                <p className="text-sm text-gray-300">{rec.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {rec.resources.map((resource, ridx) => (
                <button
                  key={ridx}
                  className="text-xs px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors flex items-center gap-1"
                >
                  {resource}
                  <ChevronRight className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-[#0F1115] border border-white/10 rounded-2xl p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-purple-400" />
                  Interview Performance Analytics
                </h1>
                <p className="text-gray-400">
                  Comprehensive analysis of your mock interview performance
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onDownloadReport}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download Report</span>
                </button>
                <button
                  onClick={onRetake}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-medium transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">Retake Interview</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-[#0F1115] border border-white/10 rounded-2xl mb-6 overflow-hidden">
            <div className="flex border-b border-white/10 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: PieChart },
                { id: 'questions', label: 'Question Breakdown', icon: MessageSquare },
                { id: 'insights', label: 'Insights & Tips', icon: Brain }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-purple-600/20 text-purple-300 border-b-2 border-purple-500'
                        : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && <OverviewTab />}
              {activeTab === 'questions' && <QuestionBreakdownTab />}
              {activeTab === 'insights' && <InsightsTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}