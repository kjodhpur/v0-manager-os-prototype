'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const members = [
  { name: 'Riya S.',  role: 'Analyst',    whi: 41, trend: -3, status: 'critical', components: [38, 35, 42, 45, 42], hrs: 58, mtg: 12, blocked: 4 },
  { name: 'Sam J.',   role: 'Operations', whi: 49, trend:  1, status: 'high',     components: [48, 45, 50, 52, 48], hrs: 52, mtg: 10, blocked: 3 },
  { name: 'Diego P.', role: 'Specialist', whi: 52, trend:  2, status: 'medium',   components: [54, 50, 52, 54, 50], hrs: 48, mtg:  8, blocked: 2 },
  { name: 'Priya R.', role: 'Analyst',    whi: 55, trend:  3, status: 'medium',   components: [58, 55, 60, 58, 54], hrs: 46, mtg:  7, blocked: 1 },
  { name: 'Mason G.', role: 'Analyst',    whi: 58, trend:  4, status: 'good',     components: [60, 58, 62, 64, 58], hrs: 42, mtg:  5, blocked: 0 },
];

const componentLabels = ['Harm', 'Harmony', 'Community', 'Mattering', 'Growth'];

const statusStyle = (status: string) => {
  switch (status) {
    case 'critical': return { color: '#FF8A8A', bg: 'rgba(255,107,107,0.12)', border: 'rgba(255,107,107,0.2)' };
    case 'high':     return { color: '#FFB347', bg: 'rgba(255,179,71,0.12)',  border: 'rgba(255,179,71,0.25)' };
    case 'medium':   return { color: '#FFC940', bg: 'rgba(255,201,64,0.12)',  border: 'rgba(255,201,64,0.25)' };
    default:         return { color: '#5DD67A', bg: 'rgba(93,214,122,0.12)',  border: 'rgba(93,214,122,0.25)' };
  }
};

const scoreColor = (v: number) => v < 50 ? '#FF6B6B' : v < 60 ? '#FFB347' : '#5DD67A';

export function TimelinePage() {
  return (
    <div className="w-full min-h-screen bg-background p-6 lg:p-8 overflow-x-hidden">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Team Flow</h1>
        <p className="text-sm text-muted-foreground">Individual wellbeing breakdown across the team</p>
      </div>

      <div className="space-y-4">
        {members.map((m) => {
          const s = statusStyle(m.status);
          const trendUp = m.trend > 0;
          const trendFlat = m.trend === 0;
          return (
            <div key={m.name} className="rounded-[12px] border border-border bg-card overflow-hidden">
              {/* Member header */}
              <div className="p-5 border-b border-border flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                    style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}` }}
                  >
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">WHI</p>
                  <div className="flex items-baseline gap-1.5 justify-end">
                    <span className="text-2xl font-bold tabular-nums" style={{ color: scoreColor(m.whi) }}>
                      {m.whi}
                    </span>
                    <span className="text-xs font-semibold flex items-center gap-0.5" style={{ color: trendFlat ? '#8B8B8B' : trendUp ? '#34D98B' : '#D96B6B' }}>
                      {trendFlat ? <Minus className="w-3 h-3" /> : trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {trendFlat ? '0' : `${trendUp ? '+' : ''}${m.trend}`}
                    </span>
                  </div>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded mt-1 inline-block"
                    style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}` }}
                  >
                    {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Component breakdown */}
              <div className="p-5">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">WHI Components</p>
                <div className="grid grid-cols-5 gap-3 mb-4">
                  {m.components.map((v, i) => (
                    <div key={i} className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">{componentLabels[i]}</p>
                      <p className="text-lg font-bold tabular-nums" style={{ color: scoreColor(v) }}>{v}</p>
                      <div className="h-1 rounded-full bg-border mt-1 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${v}%`, backgroundColor: scoreColor(v) }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick stats */}
                <div className="flex gap-4 pt-3 border-t border-border text-xs text-muted-foreground">
                  <span>Weekly hours: <strong className="text-foreground">{m.hrs}h</strong></span>
                  <span>Meetings: <strong className="text-foreground">{m.mtg}h</strong></span>
                  <span>
                    Blocked:{' '}
                    <strong style={{ color: m.blocked > 0 ? '#FF6B6B' : '#5DD67A' }}>
                      {m.blocked > 0 ? m.blocked : 'Clear'}
                    </strong>
                  </span>
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
