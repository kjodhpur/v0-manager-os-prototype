'use client';

import { BarChart3, AlertTriangle } from 'lucide-react';

const employees = [
  { name: 'Riya Sharma',  role: 'Staff Eng',   wip: 18, hrs: 22, blocked: 4, status: 'Overloaded', mix: [15, 35, 40, 10] },
  { name: 'Sam Patel',    role: 'Senior Eng',  wip: 12, hrs: 14, blocked: 2, status: 'High',       mix: [25, 30, 35, 10] },
  { name: 'Olivia Chen',  role: 'Eng',         wip:  7, hrs: 10, blocked: 0, status: 'Balanced',   mix: [45, 30, 10, 15] },
  { name: 'Jordan Lee',   role: 'Eng',         wip:  9, hrs: 11, blocked: 1, status: 'Balanced',   mix: [35, 35, 15, 15] },
  { name: 'Priya Desai',  role: 'Eng',         wip: 10, hrs: 13, blocked: 1, status: 'High',       mix: [30, 30, 25, 15] },
  { name: 'Diego Ortiz',  role: 'Eng',         wip:  6, hrs:  8, blocked: 0, status: 'Under',      mix: [55, 25,  5, 15] },
];

const statusStyle: Record<string, { bg: string; color: string; border: string }> = {
  Overloaded: { bg: 'rgba(255,107,107,0.12)', color: '#FF8A8A', border: 'rgba(255,107,107,0.2)' },
  High:       { bg: 'rgba(255,179,71,0.12)',  color: '#FFB347', border: 'rgba(255,179,71,0.25)' },
  Balanced:   { bg: 'rgba(93,214,122,0.12)',  color: '#5DD67A', border: 'rgba(93,214,122,0.25)' },
  Under:      { bg: 'rgba(139,139,139,0.1)',  color: '#8B8B8B', border: 'rgba(139,139,139,0.2)' },
};

const mixColors = ['#0C2C55', '#296374', '#629FAD', '#EDEDCE'];
const mixLabels = ['Strategic', 'Operational', 'Firefighting', 'Admin'];

export function WorkDistributionPage({ onEmployeeClick }: { onEmployeeClick?: (name: string) => void }) {
  return (
    <div className="w-full min-h-screen bg-background p-6 lg:p-8 overflow-x-hidden">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Work Distribution</h1>
        <p className="text-sm text-muted-foreground">Workload balance and allocation across the team</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Total blocked',    value: '11',    color: '#FF6B6B' },
          { label: 'Avg weekly hours', value: '49.2h', color: '#FFB347' },
          { label: 'Fairness score',   value: '65.8',  color: '#00B8A0' },
        ].map((s) => (
          <div key={s.label} className="rounded-[10px] border border-border bg-card p-4">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className="text-3xl font-bold tabular-nums mt-1" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Distribution table */}
      <div className="rounded-[12px] border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <BarChart3 className="w-4 h-4" style={{ color: '#00B8A0' }} />
          <strong className="text-sm">Work Distribution</strong>
          <span className="text-xs text-muted-foreground ml-1">workload balance per employee</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Employee', 'Role', 'WIP', 'Mtg hrs', 'Blocked', 'Status', 'Work type mix'].map((h, i) => (
                  <th
                    key={h}
                    className={`px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground border-b border-border ${
                      i >= 2 && i <= 4 ? 'text-center' : 'text-left'
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => {
                const s = statusStyle[e.status];
                return (
                  <tr
                    key={e.name}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors cursor-pointer"
                    onClick={() => onEmployeeClick?.(e.name)}
                  >
                    <td className="px-4 py-3 text-sm font-medium">{e.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{e.role}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-center">{e.wip}</td>
                    <td className="px-4 py-3 text-sm text-center text-muted-foreground">{e.hrs}h</td>
                    <td className="px-4 py-3 text-sm text-center">
                      {e.blocked > 0 ? (
                        <span className="inline-flex items-center gap-1" style={{ color: '#FF6B6B' }}>
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {e.blocked}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className="inline-block px-2.5 py-1 rounded text-xs font-medium"
                        style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}` }}
                      >
                        {e.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex h-4 rounded overflow-hidden" style={{ minWidth: 140 }}>
                        {e.mix.map((pct, i) => (
                          <div key={i} style={{ width: `${pct}%`, backgroundColor: mixColors[i] }} />
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex gap-4 px-4 py-3 border-t border-border flex-wrap">
          {mixColors.map((c, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c }} />
              {mixLabels[i]}
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8">
        This product uses work-system signals (tasks, meetings, assignments). It does not read private messages by default.
      </p>
    </div>
  );
}
