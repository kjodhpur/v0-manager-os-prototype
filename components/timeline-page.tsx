'use client';

import { Users, TrendingUp } from 'lucide-react';

export function TimelinePage() {
  // Hardcoded team members with full data
  const teamMembers = [
    {
      name: 'Riya S.',
      role: 'Analyst',
      wwiScore: 41,
      trend: -3,
      components: [
        { name: 'Protection from Harm', value: 38 },
        { name: 'Work-Life Harmony', value: 35 },
        { name: 'Connection & Community', value: 42 },
        { name: 'Mattering at Work', value: 45 },
        { name: 'Opportunity for Growth', value: 42 },
      ],
      metrics: [
        { label: 'Weekly Workload', value: '58h', unit: 'hours', status: 'critical' },
        { label: 'Meetings This Week', value: '12', unit: 'hours', status: 'high' },
        { label: 'Recognition (30d)', value: '1', unit: 'events', status: 'critical' },
        { label: 'Growth Opportunities', value: '0', unit: 'assigned', status: 'critical' },
      ],
    },
    {
      name: 'Sam J.',
      role: 'Operations',
      wwiScore: 49,
      trend: 1,
      components: [
        { name: 'Protection from Harm', value: 48 },
        { name: 'Work-Life Harmony', value: 45 },
        { name: 'Connection & Community', value: 50 },
        { name: 'Mattering at Work', value: 52 },
        { name: 'Opportunity for Growth', value: 48 },
      ],
      metrics: [
        { label: 'Weekly Workload', value: '52h', unit: 'hours', status: 'high' },
        { label: 'Meetings This Week', value: '10', unit: 'hours', status: 'high' },
        { label: 'Recognition (30d)', value: '2', unit: 'events', status: 'medium' },
        { label: 'Growth Opportunities', value: '1', unit: 'assigned', status: 'medium' },
      ],
    },
    {
      name: 'Diego P.',
      role: 'Specialist',
      wwiScore: 52,
      trend: 2,
      components: [
        { name: 'Protection from Harm', value: 54 },
        { name: 'Work-Life Harmony', value: 50 },
        { name: 'Connection & Community', value: 52 },
        { name: 'Mattering at Work', value: 54 },
        { name: 'Opportunity for Growth', value: 50 },
      ],
      metrics: [
        { label: 'Weekly Workload', value: '48h', unit: 'hours', status: 'medium' },
        { label: 'Meetings This Week', value: '8', unit: 'hours', status: 'medium' },
        { label: 'Recognition (30d)', value: '3', unit: 'events', status: 'good' },
        { label: 'Growth Opportunities', value: '2', unit: 'assigned', status: 'good' },
      ],
    },
    {
      name: 'Priya R.',
      role: 'Analyst',
      wwiScore: 55,
      trend: 3,
      components: [
        { name: 'Protection from Harm', value: 56 },
        { name: 'Work-Life Harmony', value: 52 },
        { name: 'Connection & Community', value: 56 },
        { name: 'Mattering at Work', value: 58 },
        { name: 'Opportunity for Growth', value: 54 },
      ],
      metrics: [
        { label: 'Weekly Workload', value: '46h', unit: 'hours', status: 'good' },
        { label: 'Meetings This Week', value: '7', unit: 'hours', status: 'good' },
        { label: 'Recognition (30d)', value: '4', unit: 'events', status: 'good' },
        { label: 'Growth Opportunities', value: '3', unit: 'assigned', status: 'good' },
      ],
    },
    {
      name: 'Mason G.',
      role: 'Analyst',
      wwiScore: 58,
      trend: 4,
      components: [
        { name: 'Protection from Harm', value: 60 },
        { name: 'Work-Life Harmony', value: 56 },
        { name: 'Connection & Community', value: 58 },
        { name: 'Mattering at Work', value: 60 },
        { name: 'Opportunity for Growth', value: 56 },
      ],
      metrics: [
        { label: 'Weekly Workload', value: '42h', unit: 'hours', status: 'healthy' },
        { label: 'Meetings This Week', value: '5', unit: 'hours', status: 'healthy' },
        { label: 'Recognition (30d)', value: '5', unit: 'events', status: 'excellent' },
        { label: 'Growth Opportunities', value: '4', unit: 'assigned', status: 'excellent' },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-500/20 text-red-400';
      case 'high':
        return 'bg-orange-500/20 text-orange-400';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'good':
      case 'healthy':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-blue-500/20 text-blue-400';
    }
  };

  const getWWIColor = (score: number) => {
    if (score < 50) return 'text-red-400';
    if (score < 55) return 'text-orange-400';
    if (score < 60) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="w-full min-h-screen p-6 lg:p-12 overflow-x-hidden" style={{ backgroundColor: '#05050a' }}>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-2 text-white flex items-center gap-3">
          <Users className="w-10 h-10 text-blue-400" />
          Team Flow
        </h1>
        <p className="text-base text-gray-400">Monitor individual team member wellbeing and metrics</p>
      </div>

      {/* Team Members List */}
      <div className="space-y-8">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-gray-700 overflow-hidden"
            style={{ backgroundColor: '#0d0d14' }}
          >
            {/* Member Header */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-white">{member.name}</p>
                  <p className="text-sm text-gray-400">{member.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm mb-1">Work Wellbeing Index</p>
                  <div className="flex items-baseline gap-2">
                    <p className={`text-4xl font-bold ${getWWIColor(member.wwiScore)}`}>{member.wwiScore}</p>
                    <span className={`text-lg font-semibold ${member.trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {member.trend >= 0 ? '↑' : '↓'} {Math.abs(member.trend)}
                    </span>
                  </div>
                </div>
              </div>

              {/* 5-Component Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-gray-700">
                {member.components.map((comp, cidx) => (
                  <div key={cidx} className="text-center">
                    <p className="text-xs text-gray-500 mb-2">{comp.name}</p>
                    <p className="text-xl font-bold text-blue-400">{comp.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700 bg-gray-900/50">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Metric</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {member.metrics.map((metric, midx) => (
                    <tr key={midx} className="border-b border-gray-700 last:border-0 hover:bg-gray-900/30">
                      <td className="px-6 py-4 text-sm font-medium text-white">{metric.label}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="font-semibold text-white">{metric.value}</span>
                        <span className="text-gray-500 ml-1">{metric.unit}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded text-xs font-medium uppercase ${getStatusColor(metric.status)}`}
                        >
                          {metric.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
