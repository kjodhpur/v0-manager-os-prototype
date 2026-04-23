'use client';

import { BarChart3 } from 'lucide-react';

const wdEmployees = [
  { name: 'Riya Sharma', role: 'Staff Eng', wip: 18, hrs: 22, blocked: 4, status: 'Overloaded', mix: [15, 35, 40, 10] },
  { name: 'Sam Patel', role: 'Senior Eng', wip: 12, hrs: 14, blocked: 2, status: 'High', mix: [25, 30, 35, 10] },
  { name: 'Olivia Chen', role: 'Eng', wip: 7, hrs: 10, blocked: 0, status: 'Balanced', mix: [45, 30, 10, 15] },
];

const statusStyle = {
  Overloaded: { bg: 'rgba(255,107,107,0.12)', fg: '#FF8A8A', bd: 'rgba(255,107,107,0.2)' },
  High: { bg: 'rgba(255,179,71,0.12)', fg: '#FFB347', bd: 'rgba(255,179,71,0.25)' },
  Balanced: { bg: 'rgba(93,214,122,0.12)', fg: '#5DD67A', bd: 'rgba(93,214,122,0.25)' },
  Under: { bg: '#1A1A1A', fg: '#8B8B8B', bd: '#1A1A1A' },
};

const workTypeColors = ['#0C2C55', '#296374', '#629FAD', '#EDEDCE'];
const workTypeLabels = ['Strategic', 'Operational', 'Firefighting', 'Admin'];

export function WorkDistributionCompact() {
  return (
    <div className="border border-border bg-card rounded-[12px] overflow-hidden">
      <div className="p-4 border-b border-border flex items-center gap-2">
        <BarChart3 width={16} height={16} style={{ color: '#00B8A0' }} />
        <strong className="text-sm">Work Distribution</strong>
        <span className="text-xs text-muted-foreground">Workload balance</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {['Employee', 'Role', 'WIP', 'Mtg hrs', 'Blocked', 'Status', 'Mix'].map((h, i) => (
                <th
                  key={h}
                  className={`text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border ${
                    i >= 2 && i <= 4 ? 'text-center' : ''
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {wdEmployees.map((e) => {
              const s = statusStyle[e.status as keyof typeof statusStyle];
              return (
                <tr key={e.name} className="border-b border-border hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 text-sm">
                    <span className="font-medium">{e.name}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{e.role}</td>
                  <td className="px-4 py-3 text-sm text-center font-medium">{e.wip}</td>
                  <td className="px-4 py-3 text-sm text-center text-muted-foreground">{e.hrs}h</td>
                  <td className="px-4 py-3 text-sm text-center">
                    {e.blocked > 0 ? (
                      <span
                        className="inline-flex w-5 h-5 rounded-full items-center justify-center text-xs font-semibold text-white"
                        style={{ backgroundColor: '#FF6B6B' }}
                      >
                        {e.blocked}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">0</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className="inline-block px-2.5 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: s.bg,
                        color: s.fg,
                        borderColor: s.bd,
                        border: `1px solid ${s.bd}`,
                      }}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex h-4 rounded overflow-hidden gap-0" style={{ minWidth: '140px' }}>
                      {e.mix.map((pct, i) => (
                        <div
                          key={i}
                          style={{
                            width: `${pct}%`,
                            backgroundColor: workTypeColors[i],
                          }}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex gap-3 px-4 py-3 border-t border-border text-xs text-muted-foreground flex-wrap">
        {workTypeColors.map((color, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
            <span>{workTypeLabels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
