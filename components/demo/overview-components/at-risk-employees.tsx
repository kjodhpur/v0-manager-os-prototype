'use client';
import "@/styles/globals.css";
import { useRouter } from 'next/navigation';

interface Employee {
  id: string;
  name: string;
  role: string;
  wwiScore: number;
  status: string;
  riskLevel: number;
}

interface Props {
  atRiskEmployees: Employee[];
}

export default function AtRiskEmployees({ atRiskEmployees }: Props) {
  const router = useRouter();
  
  const getRiskClass = (score: number) => {
    if (score < 50) return 'border-[var(--accent)] bg-[var(--accent)]/30 text-[var(--fg)]';
    if (score < 75) return 'border-[var(--warning)] bg-[var(--warning)]/30 text-[var(--fg)]';
    return 'border-[var(--healthy)] bg-[var(--healthy)]/30 text-[var(--fg)]';
  };
  const getRiskText = (score: number) => {
    if (score < 50) return 'text-[var(--accent)]';
    if (score < 75) return 'text-[var(--warning)]';
    return 'text-[var(--healthy)]';
  };
  const getRiskBg = (score: number) => {
    if (score < 50) return 'bg-[var(--accent)]';
    if (score < 75) return 'bg-[var(--warning)]';
    return 'bg-[var(--healthy)]';
  };

  return (
    
    <div className="rounded-xl p-6 border border-border bg-[var(--neutral)] text-[var(--fg)] mb-12">
      <h2 className="text-xl font-bold text-[var(--fg)] mb-6">At-Risk Employees</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {atRiskEmployees.map((emp, idx) => (
          <div
            key={idx}
            onClick={() => router.push(`/demo?page=team-health&employeeId=${emp.id}`)}
            className={`rounded-xl p-6 border cursor-pointer hover:opacity-90 hover:scale-[1.02] transition ${getRiskClass(emp.wwiScore)}`}
          >
            <div className="flex pointer-events-none items-start justify-between mb-4">
              <div>
                <p className="font-semibold text-lg">{emp.name}</p>
                <p className="text-sm">{emp.role}</p>
              </div>
              <span className={`pointer-events-none text-xs px-2 py-1 rounded ${getRiskClass(emp.wwiScore)}`}>
                {emp.status}
              </span>
            </div>
            <div className= "pointer-events-none mb-4">
              <p className="text-sm mb-1">Work Wellbeing Index</p>
              <p className={`text-3xl font-bold ${getRiskText(emp.wwiScore)}`}>{emp.wwiScore}</p>
            </div>
            <div className="pointer-events-none h-1 w-full rounded-full bg-[var(--border)]">
                <div
                    className={`h-full rounded-full ${getRiskBg(emp.wwiScore)}`}
                    style={{ width: `${emp.wwiScore}%` }}
                />
                </div>
          </div>
        ))}
      </div>
    </div>
  );
}