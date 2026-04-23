'use client';

import { TrendingDown, TrendingUp } from 'lucide-react';

interface Employee {
  name: string;
  role: string;
  wwiScore: number;
  status: string;
  riskLevel: number;
}

const riskConfig = (score: number) => {
  if (score < 50) return { color: '#FF6B6B', bg: 'rgba(255,107,107,0.08)', border: 'rgba(255,107,107,0.25)' };
  if (score < 60) return { color: '#FFB347', bg: 'rgba(255,179,71,0.08)',  border: 'rgba(255,179,71,0.25)' };
  return              { color: '#34D98B', bg: 'rgba(52,217,139,0.08)',   border: 'rgba(52,217,139,0.25)' };
};

export default function AtRiskEmployees(employees: Employee[]) {
  return (
    <div className="rounded-[12px] border border-border bg-card overflow-hidden mb-6">
      <div className="px-5 py-3 border-b border-border">
        <h3 className="text-sm font-semibold">Attention Needed — Top Employees</h3>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            {['Name', 'WHI', 'Status', 'Action'].map((h) => (
              <th
                key={h}
                className="px-5 py-3 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground border-b border-border"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => {
            const cfg = riskConfig(emp.wwiScore);
            return (
              <tr key={emp.name} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-5 py-3 text-sm">
                  <span className="font-medium">{emp.name}</span>
                  <span className="text-muted-foreground text-xs ml-2">({emp.role})</span>
                </td>
                <td className="px-5 py-3 text-sm">
                  <span className="font-semibold flex items-center gap-1.5">
                    {emp.wwiScore}
                    {emp.riskLevel >= 4
                      ? <TrendingDown className="w-3.5 h-3.5" style={{ color: '#FF6B6B' }} />
                      : <TrendingUp className="w-3.5 h-3.5" style={{ color: '#34D98B' }} />}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm">
                  <span
                    className="inline-block px-2.5 py-1 rounded text-xs font-medium"
                    style={{ backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm">
                  <button className="px-3 py-1 text-xs font-medium rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
