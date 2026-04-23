'use client';

import { TrendingDown } from 'lucide-react';

interface DataPoint { week: number; value: number; }

export default function WWITrend(
  data: DataPoint[],
  fairnessScore: number,
  fairnessTrend: number,
) {
  const W = 360;
  const H = 100;
  const pad = 8;
  const min = Math.min(...data.map((d) => d.value)) - 2;
  const max = Math.max(...data.map((d) => d.value)) + 2;

  const x = (i: number) => pad + (i / (data.length - 1)) * (W - pad * 2);
  const y = (v: number) => pad + (1 - (v - min) / (max - min)) * (H - pad * 2);

  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(d.value)}`).join(' ');
  const areaPath = `${linePath} L${x(data.length - 1)},${H} L${x(0)},${H} Z`;

  const trendUp = fairnessTrend >= 0;

  return (
    <div className="lg:col-span-2 rounded-[12px] border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold">WHI Trend · {data.length} weeks</p>
        <div className="flex gap-1">
          {['Sprint', 'Month', 'Quarter'].map((d, i) => (
            <button
              key={d}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                i === 1
                  ? 'bg-primary/15 text-primary border border-primary/30'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-24">
        <defs>
          <linearGradient id="whi-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#00B8A0" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00B8A0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#whi-area)" />
        <path d={linePath} stroke="#00B8A0" strokeWidth="2" fill="none" strokeLinejoin="round" />
        {data.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d.value)} r="3" fill="#00B8A0" />
        ))}
      </svg>

      <div className="flex justify-between text-xs text-muted-foreground mt-1 px-1">
        {data.map((d) => (
          <span key={d.week}>W{d.week}</span>
        ))}
      </div>

      {/* Manager Fairness Score */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Manager Fairness Score
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold tabular-nums">{fairnessScore}</span>
            <span
              className="text-sm font-semibold flex items-center gap-1"
              style={{ color: trendUp ? '#34D98B' : '#D96B6B' }}
            >
              {!trendUp && <TrendingDown className="w-3 h-3" />}
              {trendUp ? '↑' : '↓'}
              {Math.abs(fairnessTrend)}
            </span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Confidence: high</p>
      </div>
    </div>
  );
}
