'use client';
import '@/styles/globals.css';
export default function WWIOverviewCard({ teamWWI, wwiTrend }: { teamWWI: number; wwiTrend: number }) {
    
    return (
        <div className="rounded-xl flex flex-col items-center justify-center p-8 border border-[var(--border)] bg-[var(--neutral)]">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--fg)]/50 mb-3">
            Work Wellbeing Index
          </p>
          <span className={`text-8xl font-bold bg-gradient-to-b ${
            teamWWI >= 50
              ? 'from-[var(--primary)] to-[var(--healthy)]'
              : 'from-[var(--warning)] to-[var(--accent)]'
          } bg-clip-text text-transparent leading-none`}>
            {teamWWI}
          </span>
          <span className={`mt-3 text-xl font-semibold flex items-center gap-1 ${
            wwiTrend >= 0 ? 'text-[var(--healthy)]' : 'text-[var(--accent)]'
          }`}>
            {wwiTrend >= 0 ? '↑' : '↓'} {Math.abs(wwiTrend)}
            <span className="text-sm font-normal text-[var(--fg)]/40 ml-1">vs prev period</span>
          </span>
        </div>
    )
}