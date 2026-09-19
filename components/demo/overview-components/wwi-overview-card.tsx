import { getColor, getRiskLabel } from '@/lib/team-data';

export default function WWIOverviewCard({
  teamWWI,
  wwiTrend,
}: {
  teamWWI: number;
  wwiTrend: number;
}) {
  const trendUp = wwiTrend >= 0;

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-8">
      <h2 className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Work Wellbeing Index
      </h2>

      <span
        className="text-7xl font-bold leading-none tabular-nums lg:text-8xl"
        style={{ color: getColor(teamWWI) }}
      >
        {teamWWI}
      </span>

      <span className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {getRiskLabel(teamWWI)}
      </span>

      <span
        className={`mt-4 flex flex-wrap items-center justify-center gap-x-1.5 text-lg font-semibold ${
          trendUp ? 'text-[var(--healthy)]' : 'text-[var(--risk)]'
        }`}
      >
        <span aria-hidden="true">{trendUp ? '↑' : '↓'}</span>
        <span>{Math.abs(wwiTrend)}</span>
        <span className="text-sm font-normal text-muted-foreground">vs start of period</span>
      </span>
    </div>
  );
}
