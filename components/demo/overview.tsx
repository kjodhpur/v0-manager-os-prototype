'use client';

import WWISummary from './wwi-summary';
import WWITrend from './wwi-trend';
import KeyActions from './key-actions';
import AtRiskEmployees from './at-risk-employees';
import { Sparkles } from 'lucide-react';

// Hardcoded demo data — LOCKED
const teamWHI = 67;
const whiTrend = 4;
const fairnessScore = 74;
const fairnessTrend = -3;

const whiComponents = [
  { name: 'Protection from Harm',    value: 72 },
  { name: 'Work-Life Harmony',       value: 65 },
  { name: 'Connection & Community',  value: 68 },
  { name: 'Mattering at Work',       value: 71 },
  { name: 'Opportunity for Growth',  value: 63 },
];

const atRiskEmployees = [
  { name: 'Riya S.',  role: 'Analyst',    wwiScore: 41, status: 'Critical', riskLevel: 5 },
  { name: 'Sam J.',   role: 'Operations', wwiScore: 49, status: 'High',     riskLevel: 4 },
  { name: 'Diego P.', role: 'Specialist', wwiScore: 52, status: 'High',     riskLevel: 3 },
];

const keyActions = [
  { title: 'Schedule 1:1 with Riya S.',       priority: 'urgent', dueDate: 'Today' },
  { title: 'Redistribute workload from Riya', priority: 'high',   dueDate: 'This week' },
  { title: 'Recognition review — Olivia',     priority: 'high',   dueDate: 'This week' },
  { title: 'Team sync meeting',               priority: 'medium', dueDate: 'Tomorrow' },
];

const whiTrendData = [
  { week: 1, value: 62 },
  { week: 2, value: 63 },
  { week: 3, value: 64 },
  { week: 4, value: 64 },
  { week: 5, value: 65 },
  { week: 6, value: 66 },
  { week: 7, value: 67 },
];

// KPI card (design-system spec: mono label, large tabular number, colored delta)
function KPICard({
  label, value, delta, deltaUp, sub, subColor, brand,
}: {
  label: string; value: string; delta?: string; deltaUp?: boolean;
  sub?: string; subColor?: string; brand?: boolean;
}) {
  return (
    <div className="rounded-[10px] border border-border bg-card p-4">
      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className="flex items-baseline gap-2 mt-1.5">
        {brand ? (
          <span
            className="text-4xl font-bold tabular-nums"
            style={{
              background: 'linear-gradient(90deg,#00D1C1 0%,#34D98B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {value}
          </span>
        ) : (
          <span className="text-4xl font-bold tabular-nums">{value}</span>
        )}
        {delta && (
          <span
            className="text-xs font-semibold"
            style={{ color: deltaUp ? '#34D98B' : '#D96B6B' }}
          >
            {deltaUp ? '↑' : '↓'}{delta}
          </span>
        )}
      </div>
      {sub && (
        <p className="text-xs mt-1" style={{ color: subColor ?? '#8B8B8B' }}>
          {sub}
        </p>
      )}
    </div>
  );
}

export function DemoOverview() {
  return (
    <div className="w-full min-h-screen bg-background p-6 lg:p-8 overflow-x-hidden">

      {/* Header */}
      <div className="flex items-baseline justify-between mb-6">
        <h1 className="text-2xl font-bold">Team Overview</h1>
        <p className="text-xs text-muted-foreground">Updated 2 min ago · Week of Apr 14</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KPICard label="Team WHI"        value={String(teamWHI)}    delta="+4"    deltaUp  sub="Healthy range"          subColor="#34D98B" brand />
        <KPICard label="At-Risk"         value="2"                                          sub="Need attention"         subColor="#FF8A8A" />
        <KPICard label="Recognition gap" value="1"                                          sub="Olivia · 21 days"       subColor="#FFB347" />
        <KPICard label="Meeting load"    value="14.2h"              delta="1.1h"  deltaUp  sub="avg/person · down vs last wk" subColor="#34D98B" />
      </div>

      {/* AI insight + trend chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* AI insight */}
        <div
          className="rounded-[12px] border p-4"
          style={{ borderColor: 'rgba(0,184,160,0.25)', backgroundColor: 'rgba(0,184,160,0.05)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4" style={{ color: '#00B8A0' }} />
            <strong className="text-sm">Weekly team insight</strong>
            <span
              className="text-xs px-2 py-0.5 rounded-full ml-1"
              style={{ backgroundColor: 'rgba(0,184,160,0.15)', color: '#00B8A0' }}
            >
              AI · Haiku 4.5
            </span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Your team's wellbeing is trending upward this week.{' '}
            <strong className="text-foreground">Riya</strong> and{' '}
            <strong className="text-foreground">Sam</strong> need attention due to workload
            imbalance — consider redistributing 2–3 tasks from Riya to{' '}
            <em className="text-foreground">Olivia</em>, who currently has capacity.
          </p>
          <div className="flex gap-2 mt-3">
            <button className="px-3 py-1.5 text-xs font-medium rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              View suggestion
            </button>
            <button className="px-3 py-1.5 text-xs font-medium rounded border border-border text-muted-foreground hover:bg-muted/50 transition-colors">
              Dismiss
            </button>
          </div>
        </div>

        {/* Trend + fairness */}
        {WWITrend(whiTrendData, fairnessScore, fairnessTrend)}
      </div>

      {/* WHI summary (large score + 5 components) */}
      {WWISummary(teamWHI, whiTrend, whiComponents)}

      {/* Attention table */}
      {AtRiskEmployees(atRiskEmployees)}

      {/* Key actions + spacer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          {KeyActions(keyActions)}
        </div>
        <div className="rounded-[12px] border border-border bg-card p-4 flex flex-col justify-between">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">Quick stats</p>
          <div className="space-y-3">
            {[
              { label: 'Blocked tasks',    value: '11', color: '#FF6B6B' },
              { label: 'Avg weekly hours', value: '49.2h', color: '#FFB347' },
              { label: 'Fairness score',   value: String(fairnessScore), color: '#00B8A0' },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-lg font-bold tabular-nums" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust microcopy */}
      <p className="text-center text-xs text-muted-foreground mt-8">
        This product uses work-system signals (tasks, meetings, assignments). It does not read private messages by default.
      </p>
    </div>
  );
}
