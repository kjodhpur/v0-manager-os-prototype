'use client';

import { useState } from 'react';

interface PentagonDatum {
  label: string;
  value: number;
  context?: string;
}

interface PentagonChartProps {
  individual: PentagonDatum[];
  teamAvg?: PentagonDatum[];
  size?: number;
}

const ANGLES = [-90, -18, 54, 126, 198].map((d) => (d * Math.PI) / 180);
const scoreColor = (v: number) => (v >= 60 ? '#5DD67A' : v >= 40 ? '#FFB347' : '#FF6B6B');

export function PentagonChart({ individual, teamAvg, size = 260 }: PentagonChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const cx = size / 2;
  const cy = size / 2;
  const maxR = (size / 2) * 0.68;

  const pt = (v: number, i: number) => {
    const r = (Math.max(v, 4) / 100) * maxR;
    return { x: cx + r * Math.cos(ANGLES[i]), y: cy + r * Math.sin(ANGLES[i]) };
  };

  const outerPt = (i: number) => {
    const r = maxR * 1.32;
    return { x: cx + r * Math.cos(ANGLES[i]), y: cy + r * Math.sin(ANGLES[i]) };
  };

  const poly = (pts: { x: number; y: number }[]) => pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  const indivPts = individual.map((d, i) => pt(d.value, i));
  const avgPts = teamAvg?.map((d, i) => pt(d.value, i));

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid rings */}
        {[20, 40, 60, 80, 100].map((level) => (
          <polygon
            key={level}
            points={poly(ANGLES.map((_, i) => pt(level, i)))}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {ANGLES.map((_, i) => {
          const o = pt(100, i);
          return (
            <line
              key={i}
              x1={cx.toFixed(1)} y1={cy.toFixed(1)}
              x2={o.x.toFixed(1)} y2={o.y.toFixed(1)}
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="1"
            />
          );
        })}

        {/* Team avg area */}
        {avgPts && (
          <polygon
            points={poly(avgPts)}
            fill="rgba(0,184,160,0.08)"
            stroke="rgba(0,184,160,0.35)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
        )}

        {/* Individual fill */}
        <polygon
          points={poly(indivPts)}
          fill="rgba(0,184,160,0.15)"
          stroke="rgba(0,184,160,0.65)"
          strokeWidth="2"
        />

        {/* Individual dots */}
        {individual.map((d, i) => {
          const p = indivPts[i];
          const color = scoreColor(d.value);
          const isH = hovered === i;
          return (
            <circle
              key={i}
              cx={p.x.toFixed(1)} cy={p.y.toFixed(1)}
              r={isH ? 8 : 5}
              fill={color}
              stroke="var(--background, white)"
              strokeWidth="2"
              style={{ cursor: 'pointer', transition: 'r 0.1s ease' }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          );
        })}

        {/* Labels */}
        {individual.map((d, i) => {
          const lp = outerPt(i);
          const color = scoreColor(d.value);
          return (
            <g key={i}>
              <text
                x={lp.x.toFixed(1)} y={(lp.y - 6).toFixed(1)}
                textAnchor="middle"
                fontSize="9"
                fill="currentColor"
                fillOpacity="0.55"
              >
                {d.label}
              </text>
              <text
                x={lp.x.toFixed(1)} y={(lp.y + 7).toFixed(1)}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={color}
              >
                {d.value}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hovered !== null && (
        <div className="absolute z-20 bg-card border border-border rounded-lg px-3 py-2 shadow-xl text-xs pointer-events-none"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', minWidth: 140 }}>
          <p className="font-semibold mb-0.5 text-foreground">{individual[hovered].label}</p>
          <p className="text-xl font-bold tabular-nums" style={{ color: scoreColor(individual[hovered].value) }}>
            {individual[hovered].value}
          </p>
          {individual[hovered].context && (
            <p className="mt-1 text-muted-foreground leading-snug">{individual[hovered].context}</p>
          )}
          {teamAvg && (
            <p className="mt-1 text-muted-foreground">Team avg: {teamAvg[hovered].value}</p>
          )}
        </div>
      )}
    </div>
  );
}
