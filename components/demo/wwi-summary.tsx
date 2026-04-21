
const getRiskColor = (score: number) => {
    if (score < 50) return 'warning';
    return 'healthy';
};
export default function WWISummary(teamWWI: number, wwiTrend: number, wwiComponents: { name: string; value: number }[]) {
    return ( 
        <div
        className="rounded-xl 
                  p-8 
                  mb-12 
                  border-[var(--border)]
                  bg-[var(--fg)]
                  "
      >
        <div className={`text-center`}>
          <p className="text-border 
                        text-sm 
                        font-medium 
                        mb-4 
                        uppercase 
                        tracking-wider"> 
          Work Wellbeing Index </p>
          <div className="mb-6">
            <span className={`text-6xl font-bold 
            bg-gradient-to-r ${teamWWI >= 50 ? 'from-[var(--primary)] to-[var(--healthy)]' : 'from-[var(--warning)] to-[var(--accent)]'} bg-clip-text text-transparent`}>
              {teamWWI}
            </span>
            <span className={`ml-4 text-2xl font-semibold ${wwiTrend >= 0 ? 'text-[var(--healthy)]' : 'text-[var(--accent)]'}`}>
              {wwiTrend >= 0 ? '↑' : '↓'} {Math.abs(wwiTrend)}
            </span>
          </div>

          {/* 5-Component Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8 pt-8 border-t border-border">
            {wwiComponents.map((comp, idx) => (
              <div key={idx} className="text-center">
                <p className="text-xs mb-2 font-medium text-border">{comp.name}</p>
                <p className={`text-[var(--${getRiskColor(comp.value)})] text-3xl font-bold `}>{comp.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
}