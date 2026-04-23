'use client';

import { TrendingDown, TrendingUp } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  wwiScore: number;
  status: string;
  components: { name: string; score: number; color: string }[];
  metrics: {
    workload: { hours: number; avgComparison: number };
    blockedItems: { count: number; duration: number };
    meetingLoad: { hours: number; avgComparison: number };
    recognition: number;
    growthPercentage: number;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: 'Riya S.',
    role: 'Analyst',
    wwiScore: 41,
    status: 'Critical',
    components: [
      { name: 'Protection from Harm', score: 22, color: '#FF6B6B' },
      { name: 'Work-Life Harmony', score: 28, color: '#FF6B6B' },
      { name: 'Connection & Community', score: 65, color: '#5DD67A' },
      { name: 'Mattering at Work', score: 48, color: '#FFB347' },
      { name: 'Opportunity for Growth', score: 18, color: '#FF6B6B' },
    ],
    metrics: {
      workload: { hours: 9.2, avgComparison: 1.8 },
      blockedItems: { count: 3, duration: 4 },
      meetingLoad: { hours: 5.5, avgComparison: 2.2 },
      recognition: 2,
      growthPercentage: 4,
    },
  },
  {
    name: 'Sam J.',
    role: 'Operations',
    wwiScore: 49,
    status: 'High',
    components: [
      { name: 'Protection from Harm', score: 48, color: '#FFB347' },
      { name: 'Work-Life Harmony', score: 45, color: '#FFB347' },
      { name: 'Connection & Community', score: 50, color: '#FFB347' },
      { name: 'Mattering at Work', score: 52, color: '#FFB347' },
      { name: 'Opportunity for Growth', score: 38, color: '#FFB347' },
    ],
    metrics: {
      workload: { hours: 7.8, avgComparison: 1.56 },
      blockedItems: { count: 1, duration: 2 },
      meetingLoad: { hours: 3.2, avgComparison: 1.28 },
      recognition: 3,
      growthPercentage: 12,
    },
  },
  {
    name: 'Diego P.',
    role: 'Specialist',
    wwiScore: 52,
    status: 'Medium',
    components: [
      { name: 'Protection from Harm', score: 54, color: '#FFB347' },
      { name: 'Work-Life Harmony', score: 50, color: '#FFB347' },
      { name: 'Connection & Community', score: 52, color: '#FFB347' },
      { name: 'Mattering at Work', score: 54, color: '#00B8A0' },
      { name: 'Opportunity for Growth', score: 48, color: '#FFB347' },
    ],
    metrics: {
      workload: { hours: 5.0, avgComparison: 1 },
      blockedItems: { count: 0, duration: 0 },
      meetingLoad: { hours: 2.5, avgComparison: 1 },
      recognition: 5,
      growthPercentage: 24,
    },
  },
  {
    name: 'Olivia K.',
    role: 'Engineer',
    wwiScore: 71,
    status: 'Good',
    components: [
      { name: 'Protection from Harm', score: 72, color: '#5DD67A' },
      { name: 'Work-Life Harmony', score: 68, color: '#5DD67A' },
      { name: 'Connection & Community', score: 74, color: '#5DD67A' },
      { name: 'Mattering at Work', score: 70, color: '#5DD67A' },
      { name: 'Opportunity for Growth', score: 72, color: '#5DD67A' },
    ],
    metrics: {
      workload: { hours: 4.5, avgComparison: 0.9 },
      blockedItems: { count: 0, duration: 0 },
      meetingLoad: { hours: 2.0, avgComparison: 0.8 },
      recognition: 8,
      growthPercentage: 32,
    },
  },
];

const statusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case 'critical':
      return { bg: 'rgba(255,107,107,0.12)', color: '#FF8A8A', border: 'rgba(255,107,107,0.2)' };
    case 'high':
      return { bg: 'rgba(255,179,71,0.12)', color: '#FFB347', border: 'rgba(255,179,71,0.25)' };
    case 'medium':
      return { bg: 'rgba(255,201,64,0.12)', color: '#FFC940', border: 'rgba(255,201,64,0.25)' };
    default:
      return { bg: 'rgba(93,214,122,0.12)', color: '#5DD67A', border: 'rgba(93,214,122,0.25)' };
  }
};

export function TeamPageNew() {
  return (
    <div className="w-full min-h-screen bg-background p-6 lg:p-8 overflow-x-hidden">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Team</h1>
        <p className="text-sm text-muted-foreground">
          Work Happiness Index scores and detailed metrics for all team members
        </p>
      </div>

      <div className="space-y-6">
        {teamMembers.map((member) => {
          const s = statusStyle(member.status);
          return (
            <div key={member.name} className="rounded-[12px] border border-border bg-card overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-border flex items-start justify-between gap-4 lg:items-center">
                <div>
                  <p className="font-semibold text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold tabular-nums">{member.wwiScore}</span>
                    <span
                      className="inline-block px-2.5 py-1 rounded text-xs font-medium"
                      style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}` }}
                    >
                      {member.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* 5 components grid */}
              <div className="px-6 py-4 border-b border-border">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  WWI Components
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                  {member.components.map((comp) => (
                    <div
                      key={comp.name}
                      className="rounded-[10px] p-3"
                      style={{
                        backgroundColor: comp.color + '15',
                        border: `1px solid ${comp.color}40`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium truncate">{comp.name.split(' ')[0]}</p>
                        <span className="text-sm font-bold tabular-nums" style={{ color: comp.color }}>
                          {comp.score}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${comp.score}%`, backgroundColor: comp.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed metrics */}
              <div className="px-6 py-4 space-y-4">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Detailed Metrics
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Workload */}
                  <div className="rounded-[10px] bg-muted/30 p-4 border border-border">
                    <p className="text-sm font-semibold mb-2">Workload</p>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{member.metrics.workload.hours}h/day</span>
                      <span
                        className="text-xs font-medium"
                        style={{
                          color:
                            member.metrics.workload.avgComparison > 1.5 ? '#FF6B6B' : '#5DD67A',
                        }}
                      >
                        {member.metrics.workload.avgComparison.toFixed(1)}x avg
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: `${Math.min(member.metrics.workload.avgComparison * 33.3, 100)}%`,
                          backgroundColor:
                            member.metrics.workload.avgComparison > 1.5 ? '#FF6B6B' : '#5DD67A',
                        }}
                      />
                    </div>
                  </div>

                  {/* Blocked Items */}
                  <div className="rounded-[10px] bg-muted/30 p-4 border border-border">
                    <p className="text-sm font-semibold mb-2">Blocked Items</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-muted-foreground">
                        {member.metrics.blockedItems.count} items
                      </span>
                      {member.metrics.blockedItems.count > 0 && (
                        <span className="text-xs text-muted-foreground">
                          {member.metrics.blockedItems.duration}+ days
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Meeting Load */}
                  <div className="rounded-[10px] bg-muted/30 p-4 border border-border">
                    <p className="text-sm font-semibold mb-2">Meeting Load</p>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{member.metrics.meetingLoad.hours}h/day</span>
                      <span
                        className="text-xs font-medium"
                        style={{
                          color:
                            member.metrics.meetingLoad.avgComparison > 1.3 ? '#FF6B6B' : '#5DD67A',
                        }}
                      >
                        {member.metrics.meetingLoad.avgComparison.toFixed(1)}x avg
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: `${Math.min(member.metrics.meetingLoad.avgComparison * 33.3, 100)}%`,
                          backgroundColor:
                            member.metrics.meetingLoad.avgComparison > 1.3 ? '#FF6B6B' : '#5DD67A',
                        }}
                      />
                    </div>
                  </div>

                  {/* Recognition */}
                  <div className="rounded-[10px] bg-muted/30 p-4 border border-border">
                    <p className="text-sm font-semibold mb-2">Recognition</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-muted-foreground">
                        {member.metrics.recognition} events
                      </span>
                      <span className="text-xs text-muted-foreground">This month</span>
                    </div>
                  </div>

                  {/* Growth */}
                  <div className="rounded-[10px] bg-muted/30 p-4 border border-border md:col-span-2">
                    <p className="text-sm font-semibold mb-2">Growth Work</p>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{member.metrics.growthPercentage}%</span>
                      <span className="text-xs text-muted-foreground">Team avg: 18%</span>
                    </div>
                    <div className="h-2 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: `${Math.min(member.metrics.growthPercentage, 100)}%`,
                          backgroundColor:
                            member.metrics.growthPercentage > 20 ? '#5DD67A' : '#FFB347',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust microcopy */}
      <p className="text-center text-xs text-muted-foreground mt-8">
        This product uses work-system signals (tasks, meetings, assignments). It does not read
        private messages by default.
      </p>
    </div>
  );
}
