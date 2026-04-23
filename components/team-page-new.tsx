'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react';
import { PentagonChart } from '@/components/demo/pentagon-chart';
import { useRouter } from 'next/navigation';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const TEAM_MEMBERS = [
  {
    name: 'Riya S.', role: 'Analyst', wwiScore: 41, status: 'Critical',
    components: [
      { label: 'Protection', value: 22, context: 'Workload 1.8× avg, 3 blocked tasks' },
      { label: 'Work-Life',  value: 28, context: 'Meeting load 5.5h/day (avg 2.5h)' },
      { label: 'Connection', value: 65, context: 'Team collaboration normal' },
      { label: 'Mattering',  value: 48, context: '2 recognition events last month' },
      { label: 'Growth',     value: 18, context: '4% stretch work (team avg 24%)' },
    ],
    metrics: {
      workload:    { hours: 9.2,  avgComparison: 1.8,  trend: 'up' },
      blocked:     { count: 3,    duration: 4 },
      meetingLoad: { hours: 5.5,  avgComparison: 2.2,  trend: 'up' },
      recognition: { count: 2,    lastDate: '30+ days ago' },
      growth:      { percentage: 4,  teamAvg: 24 },
    },
    insight: 'Redistribute 2–3 blocked items to Olivia who has capacity. Schedule a 1:1 and send a recognition message this week.',
  },
  {
    name: 'Sam J.', role: 'Operations', wwiScore: 49, status: 'High',
    components: [
      { label: 'Protection', value: 48, context: 'Workload slightly elevated' },
      { label: 'Work-Life',  value: 45, context: 'High meeting density crowding deep work' },
      { label: 'Connection', value: 50, context: '1:1 cadence missed last 2 weeks' },
      { label: 'Mattering',  value: 52, context: '3 recognition events this month' },
      { label: 'Growth',     value: 38, context: 'Mostly routine assignments' },
    ],
    metrics: {
      workload:    { hours: 7.8,  avgComparison: 1.56, trend: 'up' },
      blocked:     { count: 1,    duration: 2 },
      meetingLoad: { hours: 3.2,  avgComparison: 1.28, trend: 'stable' },
      recognition: { count: 3,    lastDate: '18 days ago' },
      growth:      { percentage: 12, teamAvg: 24 },
    },
    insight: 'Cancel or delegate 1–2 recurring meetings. Offer one stretch assignment to address the growth deficit.',
  },
  {
    name: 'Diego P.', role: 'Specialist', wwiScore: 52, status: 'Medium',
    components: [
      { label: 'Protection', value: 54, context: 'Workload trending up slightly' },
      { label: 'Work-Life',  value: 50, context: 'Meeting load at team average' },
      { label: 'Connection', value: 52, context: 'Collaboration metrics normal' },
      { label: 'Mattering',  value: 54, context: '5 recognition events this month' },
      { label: 'Growth',     value: 48, context: 'Stretch work at team average' },
    ],
    metrics: {
      workload:    { hours: 5.0,  avgComparison: 1.0,  trend: 'stable' },
      blocked:     { count: 0,    duration: 0 },
      meetingLoad: { hours: 2.5,  avgComparison: 1.0,  trend: 'stable' },
      recognition: { count: 5,    lastDate: '12 days ago' },
      growth:      { percentage: 24, teamAvg: 24 },
    },
    insight: 'Workload is in a healthy zone. Monitor for any increase next sprint. Consider one high-visibility project to boost Mattering.',
  },
  {
    name: 'Olivia K.', role: 'Engineer', wwiScore: 71, status: 'Good',
    components: [
      { label: 'Protection', value: 72, context: 'Workload sustainable and well-managed' },
      { label: 'Work-Life',  value: 68, context: 'Good work-life balance signals' },
      { label: 'Connection', value: 74, context: 'Strong collaboration & 1:1 cadence' },
      { label: 'Mattering',  value: 70, context: '8 recognition events this month' },
      { label: 'Growth',     value: 72, context: '32% stretch work (above avg)' },
    ],
    metrics: {
      workload:    { hours: 4.5,  avgComparison: 0.9,  trend: 'stable' },
      blocked:     { count: 0,    duration: 0 },
      meetingLoad: { hours: 2.0,  avgComparison: 0.8,  trend: 'stable' },
      recognition: { count: 8,    lastDate: '5 days ago' },
      growth:      { percentage: 32, teamAvg: 24 },
    },
    insight: 'Olivia has available capacity and strong health signals. She\'s an ideal candidate to receive redistributed tasks from Riya.',
  },
  {
    name: 'Jordan M.', role: 'PM', wwiScore: 68, status: 'Good',
    components: [
      { label: 'Protection', value: 70, context: 'Manageable workload' },
      { label: 'Work-Life',  value: 65, context: 'Slight after-hours signals detected' },
      { label: 'Connection', value: 72, context: 'Strong cross-team collaboration' },
      { label: 'Mattering',  value: 68, context: '6 recognition events this month' },
      { label: 'Growth',     value: 62, context: 'Mix of stretch and operational work' },
    ],
    metrics: {
      workload:    { hours: 5.5,  avgComparison: 1.1,  trend: 'stable' },
      blocked:     { count: 0,    duration: 0 },
      meetingLoad: { hours: 3.0,  avgComparison: 1.2,  trend: 'stable' },
      recognition: { count: 6,    lastDate: '8 days ago' },
      growth:      { percentage: 28, teamAvg: 24 },
    },
    insight: 'Jordan is performing well. Monitor the slight after-hours signal — consider reducing meeting load next sprint.',
  },
];

const TEAM_AVG_PENTAGON = [
  { label: 'Protection', value: 72 },
  { label: 'Work-Life',  value: 65 },
  { label: 'Connection', value: 68 },
  { label: 'Mattering',  value: 71 },
  { label: 'Growth',     value: 63 },
];

type SortKey = 'name' | 'wwiScore' | 'workload' | 'blocked' | 'meetings' | 'recognition' | 'growth';
type SortDir = 'asc' | 'desc';

const statusStyle = (s: string) =>
  s === 'Critical' ? { bg: 'rgba(255,107,107,0.12)', color: '#FF8A8A', border: 'rgba(255,107,107,0.2)' }
  : s === 'High' ? { bg: 'rgba(255,179,71,0.12)',  color: '#FFB347', border: 'rgba(255,179,71,0.25)' }
  : s === 'Medium' ? { bg: 'rgba(255,201,64,0.12)', color: '#FFC940', border: 'rgba(255,201,64,0.25)' }
  : { bg: 'rgba(93,214,122,0.12)', color: '#5DD67A', border: 'rgba(93,214,122,0.25)' };

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export function TeamPageNew() {
  const router = useRouter();
  const [selected, setSelected] = useState(TEAM_MEMBERS[0]);
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('wwiScore');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const sorted = [...TEAM_MEMBERS].sort((a, b) => {
    let av = 0, bv = 0;
    switch (sortKey) {
      case 'name': return sortDir === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      case 'wwiScore': av = a.wwiScore; bv = b.wwiScore; break;
      case 'workload': av = a.metrics.workload.hours; bv = b.metrics.workload.hours; break;
      case 'blocked': av = a.metrics.blocked.count; bv = b.metrics.blocked.count; break;
      case 'meetings': av = a.metrics.meetingLoad.hours; bv = b.metrics.meetingLoad.hours; break;
      case 'recognition': av = a.metrics.recognition.count; bv = b.metrics.recognition.count; break;
      case 'growth': av = a.metrics.growth.percentage; bv = b.metrics.growth.percentage; break;
    }
    return sortDir === 'asc' ? av - bv : bv - av;
  });

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k
      ? sortDir === 'asc' ? <ChevronUp className="w-3 h-3 inline ml-0.5" /> : <ChevronDown className="w-3 h-3 inline ml-0.5" />
      : <ArrowUpDown className="w-3 h-3 inline ml-0.5 opacity-30" />;

  const s = statusStyle(selected.status);

  return (
    <div className="w-full min-h-screen bg-background p-6 lg:p-8 overflow-x-hidden">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Team</h1>
        <p className="text-sm text-muted-foreground">Click a team member to see their detailed WHI breakdown</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Member list */}
        <div className="lg:col-span-1">
          <div className="rounded-[12px] border border-border bg-card overflow-hidden">
            {sorted.map((member) => {
              const ms = statusStyle(member.status);
              const isSelected = member.name === selected.name;
              return (
                <button
                  key={member.name}
                  onClick={() => setSelected(member)}
                  className={`w-full text-left px-4 py-3 border-b border-border last:border-0 transition-colors ${isSelected ? 'bg-primary/8' : 'hover:bg-muted/30'}`}
                  style={{ backgroundColor: isSelected ? 'rgba(0,184,160,0.06)' : undefined }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold flex items-center gap-2">
                        {member.name}
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />}
                      </p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold tabular-nums" style={{ color: ms.color }}>{member.wwiScore}</p>
                      <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ backgroundColor: ms.bg, color: ms.color, border: `1px solid ${ms.border}` }}>{member.status}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Detail panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Pentagon + header */}
          <div className="rounded-[12px] border border-border bg-card p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-xl font-bold">{selected.name}</h2>
                  <span className="text-sm text-muted-foreground">{selected.role}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-3xl font-bold tabular-nums">{selected.wwiScore}</span>
                  <span className="text-xs px-2.5 py-1 rounded font-medium" style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}` }}>{selected.status}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${showComparison ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground hover:bg-muted'}`}
                >
                  {showComparison ? 'Hide avg' : 'vs Team avg'}
                </button>
                <button
                  onClick={() => router.push(`/demo?page=ai-coach&employee=${encodeURIComponent(selected.name)}`)}
                  className="text-xs px-3 py-1.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Ask AI Coach
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="flex-shrink-0">
                <PentagonChart
                  individual={selected.components}
                  teamAvg={showComparison ? TEAM_AVG_PENTAGON : undefined}
                  size={220}
                />
                {showComparison && (
                  <div className="flex gap-4 justify-center mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><span className="inline-block w-4 h-0.5 bg-primary/60" />Individual</span>
                    <span className="flex items-center gap-1"><span className="inline-block w-4 h-px border-t border-dashed border-primary/40" />Team avg</span>
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2">
                {selected.components.map((c) => {
                  const col = c.value >= 60 ? '#5DD67A' : c.value >= 40 ? '#FFB347' : '#FF6B6B';
                  return (
                    <div key={c.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">{c.label}</span>
                        <span className="text-sm font-bold tabular-nums" style={{ color: col }}>{c.value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${c.value}%`, backgroundColor: col }} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{c.context}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Insight */}
            <div className="mt-4 pt-4 border-t border-border rounded-lg p-3" style={{ backgroundColor: 'rgba(0,184,160,0.05)', border: '1px solid rgba(0,184,160,0.2)' }}>
              <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: '#00B8A0' }}>AI Insight</p>
              <p className="text-sm text-muted-foreground">{selected.insight}</p>
            </div>
          </div>

          {/* Sortable metrics table */}
          <div className="rounded-[12px] border border-border bg-card overflow-hidden">
            <div className="px-5 py-3 border-b border-border">
              <p className="text-sm font-semibold">Detailed Metrics</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {[
                      { key: 'name' as SortKey, label: 'Member' },
                      { key: 'workload' as SortKey, label: 'Workload' },
                      { key: 'blocked' as SortKey, label: 'Blocked' },
                      { key: 'meetings' as SortKey, label: 'Meetings' },
                      { key: 'recognition' as SortKey, label: 'Recognition' },
                      { key: 'growth' as SortKey, label: 'Growth %' },
                    ].map((col) => (
                      <th
                        key={col.key}
                        onClick={() => toggleSort(col.key)}
                        className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground transition-colors select-none"
                      >
                        {col.label}<SortIcon k={col.key} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((member) => {
                    const ms = statusStyle(member.status);
                    const isExpanded = expandedInsight === member.name;
                    return (
                      <>
                        <tr
                          key={member.name}
                          className={`border-b border-border last:border-0 hover:bg-muted/20 transition-colors cursor-pointer ${member.name === selected.name ? 'bg-primary/5' : ''}`}
                          onClick={() => { setSelected(member); setExpandedInsight(isExpanded ? null : member.name); }}
                        >
                          <td className="px-4 py-3 text-sm">
                            <span className="font-medium">{member.name}</span>
                            <span className="ml-2 text-xs px-2 py-0.5 rounded" style={{ backgroundColor: ms.bg, color: ms.color }}>{member.status}</span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span style={{ color: member.metrics.workload.avgComparison > 1.5 ? '#FF6B6B' : '#5DD67A' }}>
                              {member.metrics.workload.hours}h
                            </span>
                            <span className="text-xs text-muted-foreground ml-1">({member.metrics.workload.avgComparison.toFixed(1)}×)</span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span style={{ color: member.metrics.blocked.count > 0 ? '#FF6B6B' : '#5DD67A' }}>
                              {member.metrics.blocked.count}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span style={{ color: member.metrics.meetingLoad.avgComparison > 1.3 ? '#FF6B6B' : '#5DD67A' }}>
                              {member.metrics.meetingLoad.hours}h
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span style={{ color: member.metrics.recognition.count < 3 ? '#FFB347' : '#5DD67A' }}>
                              {member.metrics.recognition.count}
                            </span>
                            <span className="text-xs text-muted-foreground ml-1">{member.metrics.recognition.lastDate}</span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span style={{ color: member.metrics.growth.percentage < member.metrics.growth.teamAvg ? '#FFB347' : '#5DD67A' }}>
                              {member.metrics.growth.percentage}%
                            </span>
                            <span className="text-xs text-muted-foreground ml-1">avg {member.metrics.growth.teamAvg}%</span>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr key={`${member.name}-insight`} className="bg-muted/20 border-b border-border">
                            <td colSpan={6} className="px-4 py-3">
                              <p className="text-xs text-muted-foreground">{member.insight}</p>
                              <button
                                onClick={(e) => { e.stopPropagation(); router.push(`/demo?page=ai-coach&employee=${encodeURIComponent(member.name)}`); }}
                                className="mt-2 text-xs text-primary hover:underline"
                              >
                                Ask AI Coach about {member.name} →
                              </button>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8">
        This product uses work-system signals (tasks, meetings, assignments). It does not read private messages by default.
      </p>
    </div>
  );
}
