'use client';

import { Heart, TrendingUp, Lightbulb, Calendar } from 'lucide-react';
import { useState } from 'react';

export function RecognitionGrowthPage() {
  const gapsData = [
    {
      id: 1,
      name: 'Riya S.',
      role: 'Analyst',
      daysSinceRecognition: 47,
      lastRecognized: '2 months ago',
      riskLevel: 'critical',
    },
    {
      id: 2,
      name: 'Sam J.',
      role: 'Operations',
      daysSinceRecognition: 38,
      lastRecognized: '5 weeks ago',
      riskLevel: 'high',
    },
    {
      id: 3,
      name: 'Diego P.',
      role: 'Specialist',
      daysSinceRecognition: 22,
      lastRecognized: '3 weeks ago',
      riskLevel: 'medium',
    },
  ];

  const recentRecognition = [
    {
      id: 1,
      recipient: 'Priya R.',
      giver: 'Manager',
      message: 'Exceptional work on the Q2 dashboard redesign',
      date: '2 days ago',
      type: 'appreciation',
    },
    {
      id: 2,
      recipient: 'Mason G.',
      giver: 'Manager',
      message: 'Led a great team sync meeting with thoughtful insights',
      date: '5 days ago',
      type: 'growth',
    },
    {
      id: 3,
      recipient: 'Diego P.',
      giver: 'Manager',
      message: 'Helped resolve critical production issue quickly',
      date: '1 week ago',
      type: 'appreciation',
    },
  ];

  const aiSuggestions = [
    {
      id: 1,
      employeeName: 'Riya S.',
      suggestion: 'Recognize her effort on recent project cleanup. Even small wins boost confidence when someone is struggling.',
      context: 'High risk, low recognition',
    },
    {
      id: 2,
      employeeName: 'Sam J.',
      suggestion: 'Call out her reliability in handling ops issues. Consistency is valuable and often overlooked.',
      context: 'High workload, good performance',
    },
    {
      id: 3,
      employeeName: 'Diego P.',
      suggestion: 'Recognize his mentoring of junior team members. Leadership contributions matter.',
      context: 'Peer recognition opportunity',
    },
  ];

  const [draftMessage, setDraftMessage] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getRecognitionBadgeColor = (type: string) => {
    switch (type) {
      case 'appreciation':
        return 'bg-pink-500/20 text-pink-400';
      case 'growth':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-blue-500/20 text-blue-400';
    }
  };

  return (
    <div className="w-full min-h-screen p-6 lg:p-12 overflow-x-hidden" style={{ backgroundColor: '#05050a' }}>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-2 text-white flex items-center gap-3">
          <Heart className="w-10 h-10 text-pink-400" />
          Recognition & Growth
        </h1>
        <p className="text-base text-gray-400">Monitor recognition gaps and AI-powered suggestions</p>
      </div>

      {/* Recognition Gaps */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Recognition Gaps</h2>
        <div className="space-y-4">
          {gapsData.map((gap) => (
            <div
              key={gap.id}
              className="rounded-lg border border-gray-700 p-6"
              style={{ backgroundColor: '#0d0d14' }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <p className="text-lg font-semibold text-white">{gap.name}</p>
                  <p className="text-sm text-gray-400">{gap.role}</p>
                  <p className="text-sm text-gray-500 mt-2">Last recognized: {gap.lastRecognized}</p>
                </div>

                <div className="flex flex-col items-start lg:items-end gap-2">
                  <span className={`px-3 py-1 rounded border text-sm font-medium ${getRiskColor(gap.riskLevel)}`}>
                    {gap.daysSinceRecognition} days without recognition
                  </span>
                  <button
                    onClick={() => setSelectedEmployee(gap.name)}
                    className="px-4 py-2 rounded-lg bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 border border-pink-500/50 font-medium text-sm transition-colors"
                  >
                    Recognize Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Draft Interface */}
      {selectedEmployee && (
        <div
          className="rounded-lg border border-pink-500/30 p-6 mb-12"
          style={{ backgroundColor: '#0d0d14' }}
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-1">Draft Recognition for {selectedEmployee}</h3>
            <p className="text-sm text-gray-400">Write a thoughtful recognition message</p>
          </div>

          <textarea
            value={draftMessage}
            onChange={(e) => setDraftMessage(e.target.value)}
            placeholder="What do you want to recognize them for?"
            className="w-full rounded-lg p-3 mb-4 bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50"
            rows={4}
          />

          <div className="flex gap-2">
            <button
              onClick={() => {
                setDraftMessage('');
                setSelectedEmployee(null);
              }}
              className="flex-1 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/50 font-medium transition-colors"
            >
              Send
            </button>
            <button
              onClick={() => {
                setDraftMessage('');
                setSelectedEmployee(null);
              }}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-700/30 text-gray-400 hover:bg-gray-700/50 border border-gray-700 font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* AI Coach Suggestions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          AI Coach Suggestions
        </h2>
        <div className="space-y-4">
          {aiSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="rounded-lg border border-blue-500/30 p-6"
              style={{ backgroundColor: '#0d0d14' }}
            >
              <div className="flex items-start gap-3 mb-2">
                <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="font-semibold text-white">{suggestion.employeeName}</p>
                  <p className="text-sm text-gray-300 mt-2">{suggestion.suggestion}</p>
                  <p className="text-xs text-gray-500 mt-3 italic">Context: {suggestion.context}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Recognition Log */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-green-400" />
          Recent Recognition
        </h2>
        <div className="space-y-4">
          {recentRecognition.map((rec) => (
            <div
              key={rec.id}
              className="rounded-lg border border-gray-700 p-6"
              style={{ backgroundColor: '#0d0d14' }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-lg font-semibold text-white">
                    {rec.recipient}
                    <span className="text-gray-400 font-normal text-sm ml-2">recognized by {rec.giver}</span>
                  </p>
                  <p className="text-gray-300 mt-2">{rec.message}</p>
                </div>
                <span className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap ml-4 ${getRecognitionBadgeColor(rec.type)}`}>
                  {rec.type}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-3">{rec.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
