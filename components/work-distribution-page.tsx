'use client';

import { Clock, AlertTriangle, BarChart3 } from 'lucide-react';

export function WorkDistributionPage() {
  const teamMembers = [
    {
      name: 'Riya S.',
      role: 'Analyst',
      weeklyHours: 58,
      meetingHours: 12,
      blockedItems: 4,
      fairnessScore: 42,
      status: 'overloaded',
    },
    {
      name: 'Sam J.',
      role: 'Operations',
      weeklyHours: 52,
      meetingHours: 10,
      blockedItems: 3,
      fairnessScore: 58,
      status: 'high',
    },
    {
      name: 'Diego P.',
      role: 'Specialist',
      weeklyHours: 48,
      meetingHours: 8,
      blockedItems: 2,
      fairnessScore: 72,
      status: 'balanced',
    },
    {
      name: 'Priya R.',
      role: 'Analyst',
      weeklyHours: 46,
      meetingHours: 7,
      blockedItems: 1,
      fairnessScore: 75,
      status: 'balanced',
    },
    {
      name: 'Mason G.',
      role: 'Analyst',
      weeklyHours: 42,
      meetingHours: 5,
      blockedItems: 0,
      fairnessScore: 82,
      status: 'healthy',
    },
  ];

  const totalBlockedItems = 11; // LOCKED

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overloaded':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'balanced':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'healthy':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getFairnessColor = (score: number) => {
    if (score < 50) return 'text-red-400';
    if (score < 70) return 'text-orange-400';
    return 'text-green-400';
  };

  return (
    <div className="w-full min-h-screen p-6 lg:p-12 overflow-x-hidden bg-background">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-2 text-foreground flex items-center gap-3">
          <BarChart3 className="w-10 h-10 text-blue-400" />
          Work Distribution
        </h1>
        <p className="text-base text-muted-foreground">Monitor workload balance and allocation fairness</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div
          className="rounded-lg border border-border p-6"
          className="bg-card"
        >
          <p className="text-muted-foreground text-sm font-medium mb-2 uppercase">Total Blocked Items</p>
          <p className="text-4xl font-bold text-red-400">{totalBlockedItems}</p>
          <p className="text-xs text-gray-500 mt-2">Items preventing progress</p>
        </div>

        <div
          className="rounded-lg border border-border p-6"
          className="bg-card"
        >
          <p className="text-muted-foreground text-sm font-medium mb-2 uppercase">Avg Weekly Hours</p>
          <p className="text-4xl font-bold text-blue-400">49.2h</p>
          <p className="text-xs text-gray-500 mt-2">Slightly above target</p>
        </div>

        <div
          className="rounded-lg border border-border p-6"
          className="bg-card"
        >
          <p className="text-muted-foreground text-sm font-medium mb-2 uppercase">Fairness Score</p>
          <p className="text-4xl font-bold text-yellow-400">65.8</p>
          <p className="text-xs text-gray-500 mt-2">Average allocation equity</p>
        </div>
      </div>

      {/* Team Workload Table */}
      <div
        className="rounded-lg border border-border overflow-hidden"
        className="bg-card"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Team Member</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Weekly Hours</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Meeting Time</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Blocked Items</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Fairness</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, idx) => (
                <tr key={idx} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-border overflow-hidden">
                        <div
                          className={`h-full ${
                            member.weeklyHours > 55
                              ? 'bg-red-500'
                              : member.weeklyHours > 50
                              ? 'bg-orange-500'
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min((member.weeklyHours / 60) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm text-foreground font-medium">{member.weeklyHours}h</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-card-foreground">{member.meetingHours}h</span>
                  </td>
                  <td className="px-6 py-4">
                    {member.blockedItems > 0 ? (
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-400 font-medium">{member.blockedItems}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-green-400">Clear</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-bold ${getFairnessColor(member.fairnessScore)}`}>
                      {member.fairnessScore}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded text-xs font-medium border ${getStatusColor(
                        member.status
                      )}`}
                    >
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 text-xs text-gray-500">
        <p className="font-semibold text-muted-foreground mb-2">Status Reference:</p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Overloaded (55+ hours)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span>High (50-55 hours)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>Balanced (45-50 hours)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Healthy (&lt;45 hours)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
