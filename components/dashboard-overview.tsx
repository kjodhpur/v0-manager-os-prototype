'use client';

import { KPICard } from './kpi-card';
import { AIInsightCard } from './ai-insight-card';
import { AttentionTable } from './attention-table';
import { WorkDistributionCompact } from './work-distribution-compact';
import { ActionsGridCompact } from './actions-grid-compact';

export function DashboardOverview() {
  return (
    <div className="w-full min-h-screen bg-background p-6 lg:p-8 overflow-x-hidden">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">Team Overview</h1>
        <p className="text-base text-muted-foreground">Updated 2 min ago · Week of Apr 14</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard label="Team WHI" value="67" delta="+4" deltaKind="up" sub="Healthy range" subColor="#5DD67A" />
        <KPICard label="At-Risk" value="2" sub="Need attention" subColor="#FF8A8A" />
        <KPICard label="Recognition Gaps" value="1" sub="Olivia · 21 days" subColor="#FFB347" />
        <KPICard
          label="Meeting Load"
          value="14.2h"
          delta="-1.1h"
          deltaKind="down"
          sub="avg/person · down from last wk"
          subColor="#5DD67A"
        />
      </div>

      {/* AI Insight + Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <AIInsightCard />
        <div className="border border-border bg-card rounded-[12px] p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#00B8A0' }} />
            <strong className="text-sm">WHI Trend · 4 weeks</strong>
          </div>
          <svg viewBox="0 0 400 100" className="w-full h-20">
            <defs>
              <linearGradient id="trend-gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#00B8A0" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00B8A0" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,70 L80,65 L160,58 L240,52 L320,45 L400,40 L400,100 L0,100 Z"
              fill="url(#trend-gradient)"
            />
            <path d="M0,70 L80,65 L160,58 L240,52 L320,45 L400,40" stroke="#00B8A0" strokeWidth="2" fill="none" />
          </svg>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>W1</span>
            <span>W2</span>
            <span>W3</span>
            <span>W4</span>
          </div>
        </div>
      </div>

      {/* Attention Table */}
      <div className="mb-6">
        <AttentionTable />
      </div>

      {/* Actions Grid */}
      <div className="mb-6">
        <ActionsGridCompact />
      </div>

      {/* Trust Microcopy */}
      <p className="text-center text-xs text-muted-foreground mt-8">
        This product uses work-system signals (tasks, meetings, assignments). It does not read private messages by default.
      </p>
    </div>
  );
}
