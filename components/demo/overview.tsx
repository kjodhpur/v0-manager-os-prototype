'use client';

import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import "@/styles/globals.css";
import WWISummary from './wwi-summary';
export function DemoOverview() {
  // Hardcoded demo data - LOCKED
  const teamWWI = 72;
  const wwiTrend = 4;
  const fairnessScore = 74;
  const fairnessTrend = -3;
  const wwiComponents = [
    { name: 'Protection from Harm', value: 72 },
    { name: 'Work-Life Harmony', value: 65 },
    { name: 'Connection & Community', value: 68 },
    { name: 'Mattering at Work', value: 71 },
    { name: 'Opportunity for Growth', value: 63 },
  ];

  const atRiskEmployees = [
    { name: 'Riya S.', role: 'Analyst', wwiScore: 41, status: 'Critical', riskLevel: 5 },
    { name: 'Sam J.', role: 'Operations', wwiScore: 49, status: 'High', riskLevel: 4 },
    { name: 'Diego P.', role: 'Specialist', wwiScore: 52, status: 'High', riskLevel: 3 },
  ];

  const keyActions = [
    { title: 'Schedule 1:1 with Riya S.', priority: 'urgent', dueDate: 'Today' },
    { title: 'Redistribute workload', priority: 'high', dueDate: 'This week' },
    { title: 'Recognition review', priority: 'medium', dueDate: 'This week' },
    { title: 'Team sync meeting', priority: 'medium', dueDate: 'Tomorrow' },
  ];

  // WWI trend data (hardcoded 12-week trend)
  const wwiTrendData = [
    { week: 1, value: 62 },
    { week: 2, value: 63 },
    { week: 3, value: 64 },
    { week: 4, value: 64 },
    { week: 5, value: 65 },
    { week: 6, value: 66 },
    { week: 7, value: 67 },
  ];

  const durations = ['Sprint', 'Month', 'Quarter', 'Year'];
  const [selectedDuration] = ['Month']; // Default to Month

  // Calculate SVG line path for graph
  const maxValue = Math.max(...wwiTrendData.map(d => d.value));
  const minValue = Math.min(...wwiTrendData.map(d => d.value));
  const range = maxValue - minValue;
  const chartWidth = 400;
  const chartHeight = 180;
  const padding = 20;

  const points = wwiTrendData.map((d, i) => ({
    x: padding + (i / (wwiTrendData.length - 1)) * (chartWidth - 2 * padding),
    y: padding + (1 - (d.value - minValue) / range) * (chartHeight - 2 * padding),
    value: d.value,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getRiskColor = (score: number) => {
    if (score < 50) return 'warning';
    return 'healthy';
  };
  // For the header, we want a gradient text effect that goes from primary to accent color. We can achieve this with Tailwind's bg-gradient and text-transparent utilities.
  // bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent

  return (
    <div className="w-full min-h-screen p-6 lg:p-12 overflow-x-hidden bg-text-[var(--bg)]">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl 
                      lg:text-5xl 
                      font-bold 
                      mb-2 
                      text-[var(--fg)]
        " style={{ fontFamily: 'Georgia, serif' }}>
          Team Overview
        </h1>
      </div>

      {/* Main WWI Card */}
      {WWISummary(teamWWI, wwiTrend, wwiComponents)}

      {/* Duration Selector & WWI Trend Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Graph */}
        <div
          className="lg:col-span-2 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              WWI Trend
            </h2>
            <div className="flex gap-2">
              {durations.map((d) => (
                <button
                  key={d}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    d === selectedDuration
                      ? 'bg-blue-500/30 text-blue-400 border border-blue-500/50'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Line Chart */}
          <svg width="100%" height="200" viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full">
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((frac) => (
              <line
                key={frac}
                x1={padding}
                y1={padding + frac * (chartHeight - 2 * padding)}
                x2={chartWidth - padding}
                y2={padding + frac * (chartHeight - 2 * padding)}
                stroke="#333"
                strokeWidth="1"
                strokeDasharray="4"
              />
            ))}

            {/* Line */}
            <path d={pathD} stroke="url(#lineGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8BA8F0" />
                <stop offset="100%" stopColor="#E0607A" />
              </linearGradient>
            </defs>

            {/* Data points */}
            {points.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="4" fill="#8BA8F0" stroke="#0d0d14" strokeWidth="2" />
            ))}
          </svg>

          {/* X-axis labels */}
          <div className="flex justify-between mt-4 text-xs text-gray-500">
            <span>Week 1</span>
            <span>Week 4</span>
            <span>Week 7</span>
          </div>
        </div>

        {/* Fairness Score Card */}
        <div
          className="rounded-xl p-6 border border-gray-700 flex flex-col justify-center items-center"
        >
          <p className="text-gray-400 text-sm font-medium mb-3 uppercase">Manager Fairness Score</p>
          <p className="text-5xl font-bold text-white mb-2">{fairnessScore}</p>
          <p className={`text-lg font-semibold ${fairnessTrend <= 0 ? 'text-red-400' : 'text-green-400'}`}>
            {fairnessTrend <= 0 ? '↓' : '↑'} {Math.abs(fairnessTrend)}
          </p>
        </div>
      </div>

      {/* Key Actions This Week */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">Key Actions This Week</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyActions.map((action, idx) => (
            <div
              key={idx}
              className={`rounded-lg p-4 border ${getPriorityColor(action.priority)}`}
            >
              <p className="font-medium text-white">{action.title}</p>
              <p className="text-xs text-gray-400 mt-2">Due: {action.dueDate}</p>
            </div>
          ))}
        </div>
      </div>

      {/* At-Risk Employees */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">At-Risk Employees</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {atRiskEmployees.map((emp, idx) => (
            <div
              key={idx}
              className="rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-semibold text-white text-lg">{emp.name}</p>
                  <p className="text-sm text-gray-400">{emp.role}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400">{emp.status}</span>
              </div>
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-1">Work Wellbeing Index</p>
                <p className={`text-3xl font-bold ${getRiskColor(emp.wwiScore)}`}>{emp.wwiScore}</p>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded ${i < emp.riskLevel ? 'bg-red-500' : 'bg-gray-700'}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
