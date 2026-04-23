'use client';

import { Brain } from 'lucide-react';

export function AIInsightCard() {
  return (
    <div
      className="border rounded-[12px] p-4"
      style={{
        borderColor: 'rgba(0, 184, 160, 0.2)',
        backgroundColor: 'rgba(0, 184, 160, 0.05)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Brain width={16} height={16} style={{ color: '#00B8A0' }} />
        <strong className="text-sm">Weekly Team Insight</strong>
        <span
          className="text-xs px-2 py-0.5 rounded-full ml-1"
          style={{
            backgroundColor: 'rgba(0, 184, 160, 0.15)',
            color: '#00B8A0',
          }}
        >
          AI-generated
        </span>
      </div>
      <p className="text-sm leading-relaxed mb-3" style={{ color: '#C5CACC' }}>
        Your team's overall wellbeing is trending upward this week.{' '}
        <strong style={{ color: '#F8FAFC' }}>Riya</strong> and{' '}
        <strong style={{ color: '#F8FAFC' }}>Sam</strong> need immediate attention due to
        workload imbalance. Consider redistributing 2–3 tasks from Riya to Olivia who has
        capacity.
      </p>
      <div className="flex gap-2">
        <button
          className="px-3 py-1.5 text-xs font-medium rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          View suggestion
        </button>
        <button
          className="px-3 py-1.5 text-xs font-medium rounded border border-border text-muted-foreground hover:bg-muted/50 transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
