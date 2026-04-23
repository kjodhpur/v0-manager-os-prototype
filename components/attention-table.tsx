'use client';

import { TrendingDown } from 'lucide-react';

const attentionPeople = [
  { name: 'Riya Sharma', role: 'Staff Eng', whi: 41, trend: 'down', issue: 'Blocked + Overloaded', issueKind: 'risk' },
  { name: 'Sam Patel', role: 'Senior Eng', whi: 48, trend: 'down', issue: 'High firefighting', issueKind: 'warn' },
  { name: 'Olivia Chen', role: 'Eng', whi: 55, trend: 'neutral', issue: 'Recognition gap', issueKind: 'warn' },
];

const badgeStyles = {
  risk: { bg: 'rgba(255,107,107,0.12)', color: '#FF8A8A' },
  warn: { bg: 'rgba(255,179,71,0.12)', color: '#FFB347' },
  muted: { bg: '#1A1A1A', color: '#8B8B8B' },
};

export function AttentionTable() {
  return (
    <div className="border border-border bg-card rounded-[12px] overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-base font-semibold m-0">Attention Needed — Top 3 Employees</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {['Name', 'WHI', 'Issue', 'Action'].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attentionPeople.map((p) => (
              <tr key={p.name} className="border-b border-border hover:bg-muted/20 transition-colors">
                <td className="px-5 py-3 text-sm">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-muted-foreground text-xs ml-2">({p.role})</span>
                </td>
                <td className="px-5 py-3 text-sm">
                  <span className="font-semibold flex items-center gap-1">
                    {p.whi}
                    {p.trend === 'down' && (
                      <TrendingDown width={14} height={14} style={{ color: '#FF6B6B' }} />
                    )}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm">
                  <span
                    className="inline-block px-2.5 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: badgeStyles[p.issueKind as keyof typeof badgeStyles].bg,
                      color: badgeStyles[p.issueKind as keyof typeof badgeStyles].color,
                    }}
                  >
                    {p.issue}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm">
                  <button className="px-3 py-1 text-xs font-medium rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
