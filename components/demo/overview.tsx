'use client';
import WWISummary from './wwi-summary';
import WWITrend from './wwi-trend';
import KeyActions from './key-actions';
import AtRiskEmployees from './at-risk-employees';
import "@/styles/globals.css";
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

  const getRiskColor = (score: number) => {
    if (score < 50) return 'warning';
    return 'healthy';
  };
  // For the header, we want a gradient text effect that goes from primary to accent color. We can achieve this with Tailwind's bg-gradient and text-transparent utilities.
  // bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent

  return (
    <div className="w-full max-h-[100vh] p-6 lg:p-12 overflow-x-hidden bg-text-[var(--bg)]">
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
      {/* Key Actions This Week */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 height-[400px]">
        {WWITrend(wwiTrendData, fairnessScore, fairnessTrend)}
        {KeyActions(keyActions)}
      </div>

      {/* At-Risk Employees */}
      {AtRiskEmployees(atRiskEmployees)}
    </div>
  );
}
