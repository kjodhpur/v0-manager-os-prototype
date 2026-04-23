'use client';

import { Shield, Heart, Users, Lightbulb, Target } from 'lucide-react';

const essentials = [
  {
    id: 1, name: 'Protection from Harm', icon: Shield,
    description: 'Safe, respectful, and secure workplace',
    avgScore: 68, trend: 2,
    employees: [
      { name: 'Riya S.', score: 38, status: 'Critical' },
      { name: 'Sam J.',  score: 48, status: 'High' },
      { name: 'Diego P.',score: 54, status: 'Medium' },
    ],
  },
  {
    id: 2, name: 'Work-Life Harmony', icon: Heart,
    description: 'Balance between work and personal life',
    avgScore: 63, trend: 1,
    employees: [
      { name: 'Riya S.', score: 35, status: 'Critical' },
      { name: 'Sam J.',  score: 45, status: 'High' },
      { name: 'Diego P.',score: 50, status: 'Medium' },
    ],
  },
  {
    id: 3, name: 'Connection & Community', icon: Users,
    description: 'Belonging and social connection',
    avgScore: 72, trend: 3,
    employees: [
      { name: 'Riya S.', score: 42, status: 'High' },
      { name: 'Sam J.',  score: 50, status: 'Medium' },
      { name: 'Diego P.',score: 52, status: 'Good' },
    ],
  },
  {
    id: 4, name: 'Mattering at Work', icon: Target,
    description: 'Feeling valued and important',
    avgScore: 71, trend: 2,
    employees: [
      { name: 'Riya S.', score: 45, status: 'High' },
      { name: 'Sam J.',  score: 52, status: 'Medium' },
      { name: 'Diego P.',score: 54, status: 'Good' },
    ],
  },
  {
    id: 5, name: 'Opportunity for Growth', icon: Lightbulb,
    description: 'Learning and development opportunities',
    avgScore: 65, trend: 1,
    employees: [
      { name: 'Riya S.', score: 42, status: 'High' },
      { name: 'Sam J.',  score: 48, status: 'High' },
      { name: 'Diego P.',score: 50, status: 'Medium' },
    ],
  },
];

const statusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case 'critical': return { bg: 'rgba(255,107,107,0.12)', color: '#FF8A8A', border: 'rgba(255,107,107,0.2)' };
    case 'high':     return { bg: 'rgba(255,179,71,0.12)',  color: '#FFB347', border: 'rgba(255,179,71,0.25)' };
    case 'medium':   return { bg: 'rgba(255,201,64,0.12)',  color: '#FFC940', border: 'rgba(255,201,64,0.25)' };
    default:         return { bg: 'rgba(93,214,122,0.12)',  color: '#5DD67A', border: 'rgba(93,214,122,0.25)' };
  }
};

export function TeamHealthPage({ onEmployeeClick }: { onEmployeeClick?: (name: string) => void }) {
  return (
    <div className="w-full min-h-screen bg-background p-6 lg:p-8 overflow-x-hidden">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Team Wellbeing</h1>
        <p className="text-sm text-muted-foreground">
          5 Surgeon General essentials for workplace health
        </p>
      </div>

      <div className="space-y-4">
        {essentials.map((e) => {
          const Icon = e.icon;
          return (
            <div key={e.id} className="rounded-[12px] border border-border bg-card overflow-hidden">
              {/* Card header */}
              <div className="p-5 border-b border-border flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(0,184,160,0.1)' }}>
                    <Icon className="w-5 h-5" style={{ color: '#00B8A0' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{e.name}</p>
                    <p className="text-xs text-muted-foreground">{e.description}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Team avg</p>
                  <div className="flex items-baseline gap-1.5 justify-end">
                    <span
                      className="text-3xl font-bold tabular-nums"
                      style={{ color: '#00B8A0' }}
                    >
                      {e.avgScore}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: '#34D98B' }}>
                      ↑{e.trend}
                    </span>
                  </div>
                  {/* Score bar */}
                  <div className="w-24 h-1.5 rounded-full bg-border mt-1 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${e.avgScore}%`,
                        background: 'linear-gradient(90deg,#00B8A0,#34D98B)',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* At-risk rows */}
              <div className="p-4">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  At-risk members
                </p>
                <div className="space-y-2">
                  {e.employees.map((emp) => {
                    const s = statusStyle(emp.status);
                    return (
                      <div
                        key={emp.name}
                        className="flex items-center justify-between p-3 rounded-[8px] bg-muted/30 border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => onEmployeeClick?.(emp.name)}
                      >
                        <p className="text-sm font-medium">{emp.name}</p>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold tabular-nums">{emp.score}</span>
                          <span
                            className="text-xs font-medium px-2.5 py-1 rounded"
                            style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}` }}
                          >
                            {emp.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8">
        This product uses work-system signals (tasks, meetings, assignments). It does not read private messages by default.
      </p>
    </div>
  );
}
