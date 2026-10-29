import { ScoreRing } from '@/components/motion/score-ring';

export default function WWIOverviewCard({
  teamWWI,
  wwiTrend,
}: {
  teamWWI: number;
  wwiTrend: number;
}) {
  const trendUp = wwiTrend >= 0;

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-8 shadow-elev-1">
      <ScoreRing value={teamWWI} size={168} />

      <span
        className={`mt-5 flex flex-wrap items-center justify-center gap-x-1.5 text-base font-medium ${
          trendUp ? 'text-[var(--healthy)]' : 'text-[var(--risk)]'
        }`}
      >
        <span aria-hidden="true">{trendUp ? '↑' : '↓'}</span>
        <span className="tabular">{Math.abs(wwiTrend)}</span>
        <span className="text-sm font-normal text-muted-foreground">vs start of period</span>
      </span>
    </div>
  );
}
