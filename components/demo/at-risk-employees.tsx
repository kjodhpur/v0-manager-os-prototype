import "@/styles/globals.css";
export default function AtRiskEmployees(atRiskEmployees: { name: string; role: string; wwiScore: number; status: string; riskLevel: number }[]) {
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
                    className={`rounded-xl p-6 border ${getRiskClass(emp.wwiScore)}`}
                    >
                    <div className="flex items-start justify-between mb-4">
                        <div>
                        <p className="font-semibold text-lg">{emp.name}</p>
                        <p className="text-sm">{emp.role}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${getRiskClass(emp.wwiScore)}`}>{emp.status}</span>
                    </div>
                    <div className="mb-4">
                        <p className="text-sm mb-1">Work Wellbeing Index</p>
                        <p className={`text-3xl font-bold ${getRiskText(emp.wwiScore)}`}>{emp.wwiScore}</p>
                    </div>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 flex-1 rounded ${getRiskBg(emp.wwiScore)}`}
                        />
                        ))}
                    </div>
                    </div>
                ))}
            </div>
      </div>
    );
}