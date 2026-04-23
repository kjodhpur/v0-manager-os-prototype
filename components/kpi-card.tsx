'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaKind?: 'up' | 'down' | 'neutral';
  sub?: string;
  subColor?: string;
}

export function KPICard({ label, value, delta, deltaKind, sub, subColor }: KPICardProps) {
  const deltaColor =
    deltaKind === 'up' ? '#5DD67A' : deltaKind === 'down' ? '#FF6B6B' : '#8B8B8B';
  const deltaIcon =
    deltaKind === 'up' ? TrendingUp : deltaKind === 'down' ? TrendingDown : null;

  return (
    <div className="border border-border bg-card rounded-[12px] p-4">
      <div className="text-xs font-medium text-muted-foreground uppercase">{label}</div>
      <div className="flex items-baseline gap-2 mt-2">
        <div className="text-4xl font-bold leading-none tracking-tight">{value}</div>
        {delta && deltaIcon && (
          <div className="flex items-center gap-1" style={{ color: deltaColor }}>
            {deltaIcon({ width: 14, height: 14 })}
            <span className="text-sm font-medium">{delta}</span>
          </div>
        )}
      </div>
      {sub && (
        <div className="text-xs mt-2" style={{ color: subColor || '#8B8B8B' }}>
          {sub}
        </div>
      )}
    </div>
  );
}
