'use client';

interface WHIComponent { name: string; value: number; }

export default function WWISummary(
  teamWHI: number,
  whiTrend: number,
  whiComponents: WHIComponent[],
) {
  const trendUp = whiTrend >= 0;

  return (
    <div className="rounded-[12px] border border-border bg-card p-6 mb-6">
      <div className="text-center mb-6">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
          Work Wellbeing Index
        </p>
        <div className="flex items-baseline justify-center gap-3">
          <span
            className="text-7xl font-bold tabular-nums"
            style={{
              background: 'linear-gradient(90deg,#00D1C1 0%,#34D98B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {teamWHI}
          </span>
          <span
            className="text-2xl font-semibold"
            style={{ color: trendUp ? '#34D98B' : '#D96B6B' }}
          >
            {trendUp ? '↑' : '↓'}
            {Math.abs(whiTrend)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">4-week average</p>
      </div>

      {/* 5-component breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-5 border-t border-border">
        {whiComponents.map((comp) => {
          const color =
            comp.value >= 70 ? '#34D98B' : comp.value >= 55 ? '#FFC940' : '#FF6B6B';
          return (
            <div key={comp.name} className="text-center">
              <p className="text-xs text-muted-foreground mb-1 leading-tight">{comp.name}</p>
              <p className="text-2xl font-bold tabular-nums" style={{ color }}>
                {comp.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
