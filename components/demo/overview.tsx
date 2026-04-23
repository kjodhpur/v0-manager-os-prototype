'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles, X, TrendingDown, TrendingUp, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PentagonChart } from './pentagon-chart';

// ─── DATA ────────────────────────────────────────────────────────────────────

const DURATION_DATA: Record<string, { label: string; whi: number; points: { label: string; value: number }[] }> = {
  Sprint: {
    label: '2-week sprint',
    whi: 65,
    points: [
      { label: 'Mon', value: 63 }, { label: 'Tue', value: 64 }, { label: 'Wed', value: 63 },
      { label: 'Thu', value: 65 }, { label: 'Fri', value: 65 }, { label: 'Mon', value: 66 },
      { label: 'Tue', value: 67 },
    ],
  },
  Month: {
    label: '4-week month',
    whi: 67,
    points: [
      { label: 'W1', value: 62 }, { label: 'W2', value: 63 }, { label: 'W3', value: 64 },
      { label: 'W4', value: 64 }, { label: 'W5', value: 65 }, { label: 'W6', value: 66 },
      { label: 'W7', value: 67 },
    ],
  },
  Quarter: {
    label: '12-week quarter',
    whi: 64,
    points: [
      { label: 'W1', value: 58 }, { label: 'W2', value: 59 }, { label: 'W3', value: 60 },
      { label: 'W4', value: 61 }, { label: 'W5', value: 62 }, { label: 'W6', value: 62 },
      { label: 'W7', value: 63 }, { label: 'W8', value: 63 }, { label: 'W9', value: 64 },
      { label: 'W10', value: 64 }, { label: 'W11', value: 65 }, { label: 'W12', value: 67 },
    ],
  },
  Year: {
    label: '12-month year',
    whi: 62,
    points: [
      { label: 'Jan', value: 55 }, { label: 'Feb', value: 56 }, { label: 'Mar', value: 57 },
      { label: 'Apr', value: 58 }, { label: 'May', value: 59 }, { label: 'Jun', value: 60 },
      { label: 'Jul', value: 61 }, { label: 'Aug', value: 62 }, { label: 'Sep', value: 63 },
      { label: 'Oct', value: 63 }, { label: 'Nov', value: 65 }, { label: 'Dec', value: 67 },
    ],
  },
};

const TEAM_PENTAGON = [
  { label: 'Protection', value: 72, context: 'Team workload mostly manageable' },
  { label: 'Work-Life', value: 65, context: 'Riya and Sam showing after-hours signals' },
  { label: 'Connection', value: 68, context: '1:1 cadence healthy for most' },
  { label: 'Mattering', value: 71, context: '2 recognition gaps flagged' },
  { label: 'Growth', value: 63, context: 'Stretch work concentration on 2 members' },
];

const INDIVIDUAL_SCORES = [
  { name: 'Riya S.',  role: 'Analyst',    whi: 41, trend: -3, status: 'Critical' },
  { name: 'Sam J.',   role: 'Operations', whi: 49, trend: -1, status: 'High' },
  { name: 'Diego P.', role: 'Specialist', whi: 52, trend: +2, status: 'Medium' },
  { name: 'Olivia K.', role: 'Engineer',  whi: 71, trend: +4, status: 'Good' },
  { name: 'Jordan M.', role: 'PM',        whi: 68, trend: +1, status: 'Good' },
];

const AT_RISK = [
  { name: 'Riya S.',  role: 'Analyst',    wwiScore: 41, status: 'Critical', riskLevel: 5 },
  { name: 'Sam J.',   role: 'Operations', wwiScore: 49, status: 'High',     riskLevel: 4 },
  { name: 'Diego P.', role: 'Specialist', wwiScore: 52, status: 'High',     riskLevel: 3 },
];

const RISK_EXPANDED: Record<string, string[]> = {
  'Riya S.':  ['Workload 1.8x avg', '3 blocked tasks (4+ days)', 'No recognition in 30 days'],
  'Sam J.':   ['Meeting load 2.2x avg', 'Minimal growth work', '2 recognition events only'],
  'Diego P.': ['Workload trending up', 'Mostly routine assignments'],
};

const INITIAL_ACTIONS = [
  { id: 1, title: 'Schedule 1:1 with Riya S.',       priority: 'urgent', dueDate: 'Today' },
  { id: 2, title: 'Redistribute workload from Riya', priority: 'high',   dueDate: 'This week' },
  { id: 3, title: 'Recognition review — Olivia',     priority: 'high',   dueDate: 'This week' },
  { id: 4, title: 'Team sync meeting',               priority: 'medium', dueDate: 'Tomorrow' },
];

const INITIAL_NOTIFICATIONS = [
  { id: 1, text: 'Riya S. has been overloaded for 3 days. Action recommended.' },
  { id: 2, text: "Sam J.'s meeting load is 2.2× team average this sprint." },
];

const PRIORITY_CFG: Record<string, { color: string; bg: string; label: string }> = {
  urgent: { color: '#FF6B6B', bg: 'rgba(255,107,107,0.12)', label: 'Urgent' },
  high:   { color: '#FFB347', bg: 'rgba(255,179,71,0.12)',  label: 'High' },
  medium: { color: '#00B8A0', bg: 'rgba(0,184,160,0.1)',    label: 'Medium' },
};

const riskColor = (score: number) =>
  score < 50
    ? { color: '#FF6B6B', bg: 'rgba(255,107,107,0.08)', border: 'rgba(255,107,107,0.25)' }
    : score < 60
    ? { color: '#FFB347', bg: 'rgba(255,179,71,0.08)',  border: 'rgba(255,179,71,0.25)' }
    : { color: '#34D98B', bg: 'rgba(52,217,139,0.08)',  border: 'rgba(52,217,139,0.25)' };

const statusColor = (s: string) =>
  s === 'Critical' ? '#FF6B6B' : s === 'High' ? '#FFB347' : s === 'Good' ? '#5DD67A' : '#FFC940';

// ─── TREND LINE GRAPH ─────────────────────────────────────────────────────────

function TrendGraph({
  points, duration,
}: { points: { label: string; value: number }[]; duration: string }) {
  const [tooltip, setTooltip] = useState<{ idx: number; x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const W = 360, H = 90, pad = 12;

  const vals = points.map((p) => p.value);
  const min = Math.min(...vals) - 3;
  const max = Math.max(...vals) + 3;

  const sx = (i: number) => pad + (i / (points.length - 1)) * (W - pad * 2);
  const sy = (v: number) => pad + (1 - (v - min) / (max - min)) * (H - pad * 2);

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${sx(i).toFixed(1)},${sy(p.value).toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L${sx(points.length - 1).toFixed(1)},${H} L${sx(0).toFixed(1)},${H} Z`;

  const trend = points[points.length - 1].value - points[0].value;

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold">WWI Trend · {duration}</p>
        <span className={`text-xs font-semibold ${trend >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {trend >= 0 ? '↑' : '↓'}{Math.abs(trend)} this period
        </span>
      </div>

      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full h-20"
        onMouseLeave={() => setTooltip(null)}
        onMouseMove={(e) => {
          if (!svgRef.current) return;
          const rect = svgRef.current.getBoundingClientRect();
          const mx = ((e.clientX - rect.left) / rect.width) * W;
          let closest = 0;
          let minDist = Infinity;
          points.forEach((_, i) => { const d = Math.abs(sx(i) - mx); if (d < minDist) { minDist = d; closest = i; } });
          setTooltip({ idx: closest, x: sx(closest), y: sy(points[closest].value) });
        }}
      >
        <defs>
          <linearGradient id="trend-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#00B8A0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00B8A0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#trend-area)" />
        <path d={linePath} stroke="#00B8A0" strokeWidth="2" fill="none" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={sx(i).toFixed(1)} cy={sy(p.value).toFixed(1)} r="3" fill="#00B8A0" />
        ))}
        {tooltip && (
          <>
            <line x1={tooltip.x} y1={pad} x2={tooltip.x} y2={H - pad} stroke="#00B8A0" strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.5" />
            <circle cx={tooltip.x} cy={tooltip.y} r="5" fill="#00B8A0" />
          </>
        )}
      </svg>

      <div className="flex justify-between text-xs text-muted-foreground mt-1 px-1">
        {points.map((p, i) => (
          <span key={i} className={tooltip?.idx === i ? 'text-primary font-semibold' : ''}>{p.label}</span>
        ))}
      </div>

      {tooltip && (
        <div className="absolute top-6 right-0 bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-lg pointer-events-none z-10">
          <p className="font-mono text-muted-foreground">{points[tooltip.idx].label}</p>
          <p className="text-lg font-bold tabular-nums text-primary">{points[tooltip.idx].value}</p>
          {tooltip.idx > 0 && (
            <p className={`text-xs font-semibold ${points[tooltip.idx].value >= points[tooltip.idx - 1].value ? 'text-emerald-400' : 'text-red-400'}`}>
              {points[tooltip.idx].value >= points[tooltip.idx - 1].value ? '↑' : '↓'}
              {Math.abs(points[tooltip.idx].value - points[tooltip.idx - 1].value)} vs prev
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export function DemoOverview() {
  const router = useRouter();
  const [duration, setDuration] = useState<string>('Month');
  const [whiView, setWhiView] = useState<'team' | 'individual'>('team');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [snoozed, setSnoozed] = useState<number[]>([]);
  const [snoozeTimers, setSnoozeTimers] = useState<Record<number, number>>({});
  const [dismissed, setDismissed] = useState<number[]>([]);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Auto-dismiss notifications after 10s
  useEffect(() => {
    const timers = notifications
      .filter((n) => !dismissed.includes(n.id))
      .map((n) =>
        setTimeout(() => setDismissed((prev) => [...prev, n.id]), 10000)
      );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Snooze countdown ticks
  useEffect(() => {
    const interval = setInterval(() => {
      setSnoozeTimers((prev) => {
        const updated = { ...prev };
        let changed = false;
        for (const id in updated) {
          if (updated[id] > 0) { updated[id]--; changed = true; }
          if (updated[id] <= 0) { setSnoozed((s) => s.filter((x) => x !== Number(id))); delete updated[id]; changed = true; }
        }
        return changed ? updated : prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const snoozeAction = (id: number) => {
    setSnoozed((prev) => [...prev, id]);
    setSnoozeTimers((prev) => ({ ...prev, [id]: 30 })); // 30-second demo timer
  };

  const activeActions = INITIAL_ACTIONS.filter((a) => !snoozed.includes(a.id));
  const snoozedActions = INITIAL_ACTIONS.filter((a) => snoozed.includes(a.id));

  const durData = DURATION_DATA[duration];
  const visibleNotifs = notifications.filter((n) => !dismissed.includes(n.id));

  const navigateToCoach = (employeeName: string) => {
    router.push(`/demo?page=ai-coach&employee=${encodeURIComponent(employeeName)}`);
  };

  return (
    <div className="w-full min-h-screen bg-background p-6 lg:p-8 overflow-x-hidden">

      {/* Dismissible notifications */}
      {visibleNotifs.length > 0 && (
        <div className="mb-5 space-y-2">
          {visibleNotifs.map((n) => (
            <div key={n.id} className="flex items-start gap-3 rounded-[10px] border border-red-400/25 bg-red-500/8 px-4 py-3" style={{ backgroundColor: 'rgba(255,107,107,0.07)', borderColor: 'rgba(255,107,107,0.25)' }}>
              <span className="text-base leading-none mt-0.5">🔔</span>
              <p className="flex-1 text-sm" style={{ color: '#FF8A8A' }}>{n.text}</p>
              <button onClick={() => setDismissed((p) => [...p, n.id])} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Updated 2 min ago · Week of Apr 14</p>
        </div>

        {/* Duration selector */}
        <div className="flex gap-1 rounded-lg border border-border p-1 bg-card">
          {['Sprint', 'Month', 'Quarter', 'Year'].map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${
                duration === d
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Team WWI', value: String(durData.whi), delta: duration === 'Month' ? '+4' : duration === 'Sprint' ? '+2' : duration === 'Quarter' ? '+9' : '+12', up: true, sub: 'Healthy range', subColor: '#34D98B', brand: true },
          { label: 'At-Risk', value: '2', sub: 'Need attention', subColor: '#FF8A8A' },
          { label: 'Recognition Gap', value: '1', sub: 'Olivia · 21 days', subColor: '#FFB347' },
          { label: 'Meeting Load', value: '14.2h', delta: '1.1h', up: false, sub: 'avg/person · ↓ vs last wk', subColor: '#34D98B' },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-[10px] border border-border bg-card p-4">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{kpi.label}</p>
            <div className="flex items-baseline gap-2 mt-1.5">
              {kpi.brand ? (
                <span className="text-4xl font-bold tabular-nums" style={{ background: 'linear-gradient(90deg,#00D1C1,#34D98B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{kpi.value}</span>
              ) : (
                <span className="text-4xl font-bold tabular-nums">{kpi.value}</span>
              )}
              {kpi.delta && <span className="text-xs font-semibold" style={{ color: kpi.up ? '#34D98B' : '#D96B6B' }}>{kpi.up ? '↑' : '↓'}{kpi.delta}</span>}
            </div>
            {kpi.sub && <p className="text-xs mt-1" style={{ color: kpi.subColor ?? '#8B8B8B' }}>{kpi.sub}</p>}
          </div>
        ))}
      </div>

      {/* Main row: AI insight + trend graph */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* AI insight */}
        <div className="rounded-[12px] border p-4" style={{ borderColor: 'rgba(0,184,160,0.25)', backgroundColor: 'rgba(0,184,160,0.05)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4" style={{ color: '#00B8A0' }} />
            <strong className="text-sm">Weekly team insight</strong>
            <span className="text-xs px-2 py-0.5 rounded-full ml-1" style={{ backgroundColor: 'rgba(0,184,160,0.15)', color: '#00B8A0' }}>AI · Haiku 4.5</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Your team's wellbeing is trending upward this {duration === 'Sprint' ? 'sprint' : duration.toLowerCase()}.{' '}
            <strong className="text-foreground">Riya</strong> and <strong className="text-foreground">Sam</strong> need attention due to workload imbalance — consider redistributing 2–3 tasks from Riya to <em className="text-foreground">Olivia</em>, who currently has capacity.
          </p>
          <div className="flex gap-2 mt-3">
            <button onClick={() => navigateToCoach('Riya S.')} className="px-3 py-1.5 text-xs font-medium rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity">View Riya's profile</button>
            <button className="px-3 py-1.5 text-xs font-medium rounded border border-border text-muted-foreground hover:bg-muted/50 transition-colors">Dismiss</button>
          </div>
        </div>

        {/* Trend graph */}
        <div className="lg:col-span-2 rounded-[12px] border border-border bg-card p-5">
          <TrendGraph points={durData.points} duration={durData.label} />
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Manager Fairness Score</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold tabular-nums">74</span>
                <span className="text-sm font-semibold flex items-center gap-1" style={{ color: '#D96B6B' }}>
                  <TrendingDown className="w-3 h-3" />↓3
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Confidence: high</p>
          </div>
        </div>
      </div>

      {/* WWI Score Card (toggle) + Pentagon */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* WWI toggle card */}
        <div className="rounded-[12px] border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Work Wellbeing Index</p>
            <button
              onClick={() => setWhiView(whiView === 'team' ? 'individual' : 'team')}
              className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              {whiView === 'team' ? 'Individual view →' : '← Team view'}
            </button>
          </div>

          {whiView === 'team' ? (
            <>
              <div className="flex items-baseline justify-center gap-3 my-4">
                <span className="text-7xl font-bold tabular-nums" style={{ background: 'linear-gradient(90deg,#00D1C1,#34D98B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{durData.whi}</span>
                <span className="text-2xl font-semibold" style={{ color: '#34D98B' }}>↑4</span>
              </div>
              <p className="text-xs text-muted-foreground text-center mb-4">{durData.label} average</p>
              <div className="grid grid-cols-5 gap-2 pt-4 border-t border-border">
                {TEAM_PENTAGON.map((c) => {
                  const col = c.value >= 70 ? '#34D98B' : c.value >= 55 ? '#FFC940' : '#FF6B6B';
                  return (
                    <div key={c.label} className="text-center">
                      <p className="text-[10px] text-muted-foreground mb-1 leading-tight">{c.label}</p>
                      <p className="text-xl font-bold tabular-nums" style={{ color: col }}>{c.value}</p>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="space-y-2">
              {INDIVIDUAL_SCORES.map((m) => (
                <div key={m.name} className="flex items-center justify-between p-3 rounded-[8px] border border-border hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => navigateToCoach(m.name)}>
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold tabular-nums">{m.whi}</span>
                      <span className={`text-xs font-semibold ${m.trend >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {m.trend >= 0 ? '↑' : '↓'}{Math.abs(m.trend)}
                      </span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ color: statusColor(m.status), backgroundColor: statusColor(m.status) + '20' }}>{m.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pentagon chart */}
        <div className="rounded-[12px] border border-border bg-card p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">5-Component Signal</p>
          <div className="flex justify-center">
            <PentagonChart individual={TEAM_PENTAGON} size={240} />
          </div>
          <div className="flex gap-4 justify-center mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-emerald-400 inline-block" />60+ Healthy</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-amber-400 inline-block" />40-59 Monitor</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-red-400 inline-block" />&lt;40 At Risk</span>
          </div>
        </div>
      </div>

      {/* At-risk table */}
      <div className="rounded-[12px] border border-border bg-card overflow-hidden mb-6">
        <div className="px-5 py-3 border-b border-border">
          <h3 className="text-sm font-semibold">Attention Needed — Top Employees</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              {['Name', 'WWI', 'Status', 'Action'].map((h) => (
                <th key={h} className="px-5 py-3 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground border-b border-border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AT_RISK.map((emp) => {
              const cfg = riskColor(emp.wwiScore);
              const isExpanded = expandedRow === emp.name;
              return (
                <>
                  <tr
                    key={emp.name}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors cursor-pointer"
                    onClick={() => setExpandedRow(isExpanded ? null : emp.name)}
                  >
                    <td className="px-5 py-3 text-sm">
                      <span className="font-medium">{emp.name}</span>
                      <span className="text-muted-foreground text-xs ml-2">({emp.role})</span>
                    </td>
                    <td className="px-5 py-3 text-sm">
                      <span className="font-semibold flex items-center gap-1.5">
                        {emp.wwiScore}
                        {emp.riskLevel >= 4
                          ? <TrendingDown className="w-3.5 h-3.5" style={{ color: '#FF6B6B' }} />
                          : <TrendingUp className="w-3.5 h-3.5" style={{ color: '#34D98B' }} />}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm">
                      <span className="inline-block px-2.5 py-1 rounded text-xs font-medium" style={{ backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>{emp.status}</span>
                    </td>
                    <td className="px-5 py-3 text-sm">
                      <button
                        onClick={(e) => { e.stopPropagation(); navigateToCoach(emp.name); }}
                        className="px-3 py-1 text-xs font-medium rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr key={`${emp.name}-expanded`} className="bg-muted/20 border-b border-border">
                      <td colSpan={4} className="px-5 py-3">
                        <div className="flex flex-wrap gap-2">
                          {(RISK_EXPANDED[emp.name] ?? []).map((signal) => (
                            <span key={signal} className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground">{signal}</span>
                          ))}
                          <button onClick={() => navigateToCoach(emp.name)} className="text-xs px-2.5 py-1 rounded-full border text-primary hover:bg-primary/10 transition-colors" style={{ borderColor: 'rgba(0,184,160,0.35)' }}>
                            Get AI suggestions →
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Key actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-[12px] border border-border bg-card p-5">
          <p className="text-sm font-semibold mb-4">Key Actions This Week</p>
          <div className="space-y-2">
            {activeActions.map((action) => {
              const cfg = PRIORITY_CFG[action.priority] ?? PRIORITY_CFG.medium;
              return (
                <div key={action.id} className="flex items-center gap-3 p-3 rounded-[8px] border transition-colors hover:bg-muted/30" style={{ borderColor: cfg.color + '40', backgroundColor: cfg.bg }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-snug">{action.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Due: {action.dueDate}</p>
                  </div>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0" style={{ color: cfg.color, backgroundColor: cfg.bg, border: `1px solid ${cfg.color}40` }}>{cfg.label}</span>
                  <button
                    onClick={() => snoozeAction(action.id)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 flex-shrink-0"
                    title="Snooze 30 sec (demo)"
                  >
                    <Clock className="w-3 h-3" />
                    Snooze
                  </button>
                </div>
              );
            })}
          </div>

          {snoozedActions.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">Snoozed</p>
              {snoozedActions.map((action) => (
                <div key={action.id} className="flex items-center justify-between py-2 text-xs text-muted-foreground opacity-60">
                  <span>{action.title}</span>
                  <span className="tabular-nums">{snoozeTimers[action.id] ?? 0}s</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick stats */}
        <div className="rounded-[12px] border border-border bg-card p-4 flex flex-col justify-between">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">Quick Stats</p>
          <div className="space-y-4">
            {[
              { label: 'Blocked tasks',    value: '11',   color: '#FF6B6B' },
              { label: 'Avg weekly hours', value: '49.2h', color: '#FFB347' },
              { label: 'Fairness score',   value: '74',   color: '#00B8A0' },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-lg font-bold tabular-nums" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8">
        This product uses work-system signals (tasks, meetings, assignments). It does not read private messages by default.
      </p>
    </div>
  );
}
