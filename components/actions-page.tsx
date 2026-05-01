'use client';

import { AlertTriangle, Star, RefreshCw, Calendar, Unlock, CheckCircle2, ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const ALL_ACTIONS = [
  { id: 1, icon: 'alert-triangle', iconColor: '#FF6B6B', title: "Unblock Riya's 4 blocked tasks",    desc: "Schedule a 30-min unblock session with tech leads. Riya's tasks have been blocked for 4+ days, dragging her WHI score down.", effort: 'Medium', impact: 'High',   due: 'Today',      priority: 1, assignee: 'Riya S.' },
  { id: 2, icon: 'star',           iconColor: '#FFB347', title: "Recognize Olivia's platform work",   desc: "Post a public shoutout for three quiet wins this sprint. Olivia's recognition gap is 21 days — below the 30-day threshold.", effort: 'Low',    impact: 'Medium', due: 'Tomorrow',   priority: 2, assignee: 'Olivia K.' },
  { id: 3, icon: 'refresh-cw',     iconColor: '#00B8A0', title: 'Rotate stretch project opportunity', desc: "Give Jordan next quarter's design-review lead role. Stretch assignment rotation improves Growth scores across the team.", effort: 'Low',    impact: 'High',   due: 'This week',  priority: 3, assignee: 'Jordan M.' },
  { id: 4, icon: 'calendar',       iconColor: '#00B8A0', title: 'Schedule 1:1 with Sam',              desc: "Check in on firefighting load — no 1:1 in 3 weeks. Sam's Connection score is dropping due to missed check-ins.", effort: 'Low',    impact: 'Medium', due: 'This week',  priority: 4, assignee: 'Sam J.' },
  { id: 5, icon: 'unlock',         iconColor: '#00B8A0', title: "Clear Diego's meeting load",         desc: "Reassign 2 recurring meetings to free 3 hrs/week. Diego's after-hours signals are increasing.", effort: 'Medium', impact: 'Medium', due: 'Next week',  priority: 5, assignee: 'Diego P.' },
];

const ICONS: Record<string, React.ElementType> = { 'alert-triangle': AlertTriangle, 'star': Star, 'refresh-cw': RefreshCw, 'calendar': Calendar, 'unlock': Unlock };
const effortColor: Record<string, string> = { Low: '#5DD67A', Medium: '#FFB347', High: '#FF6B6B' };
const impactColor: Record<string, string> = { Low: '#8B8B8B', Medium: '#FFB347', High: '#FF6B6B' };
const priorityColor: Record<number, string> = { 1: '#FF6B6B', 2: '#FFB347', 3: '#00B8A0', 4: '#00B8A0', 5: '#8B8B8B' };

type SortBy = 'priority' | 'due' | 'assignee';
type ShowMode = 'all' | 'active';

export function ActionsPage({ onActionClick }: { onActionClick?: (id: number) => void }) {
  const [completed, setCompleted] = useState<number[]>([]);
  const [snoozed, setSnoozed]     = useState<number[]>([]);
  const [snoozeTimers, setSnoozeTimers] = useState<Record<number, number>>({});
  const [expanded, setExpanded]   = useState<number | null>(null);
  const [sortBy, setSortBy]       = useState<SortBy>('priority');
  const [showMode, setShowMode]   = useState<ShowMode>('all');
  const [search, setSearch]       = useState('');

  // Countdown tick for snoozed items
  useEffect(() => {
    const interval = setInterval(() => {
      setSnoozeTimers((prev) => {
        const updated = { ...prev };
        let changed = false;
        for (const id in updated) {
          if (updated[id] > 0) { updated[id]--; changed = true; }
          if (updated[id] <= 0) {
            setSnoozed((s) => s.filter((x) => x !== Number(id)));
            delete updated[id];
            changed = true;
          }
        }
        return changed ? updated : prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const snoozeAction = (id: number) => {
    setSnoozed((prev) => [...prev, id]);
    setSnoozeTimers((prev) => ({ ...prev, [id]: 30 }));
  };

  const dueOrder: Record<string, number> = { 'Today': 0, 'Tomorrow': 1, 'This week': 2, 'Next week': 3 };

  const filtered = ALL_ACTIONS.filter((a) => {
    if (completed.includes(a.id)) return false;
    if (showMode === 'active' && snoozed.includes(a.id)) return false;
    if (search) {
      const q = search.toLowerCase();
      return a.title.toLowerCase().includes(q) || a.assignee.toLowerCase().includes(q);
    }
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'priority': return a.priority - b.priority;
      case 'due': return (dueOrder[a.due] ?? 99) - (dueOrder[b.due] ?? 99);
      case 'assignee': return a.assignee.localeCompare(b.assignee);
      default: return 0;
    }
  });

  const active   = filtered.filter((a) => !snoozed.includes(a.id));
  const snoozedList = filtered.filter((a) => snoozed.includes(a.id));
  const doneList = ALL_ACTIONS.filter((a) => completed.includes(a.id));

  return (
    <div className="w-full min-h-screen bg-background p-6 lg:p-8 overflow-x-hidden">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold text-foreground">Actions</h1>
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-primary text-primary-foreground">{active.length}</span>
        </div>
        <p className="text-sm text-muted-foreground">Recommended actions ordered by importance</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by description or assignee..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><X className="w-3.5 h-3.5" /></button>}
        </div>

        {/* Show toggle */}
        <div className="flex rounded-lg border border-border overflow-hidden">
          {(['all', 'active'] as ShowMode[]).map((m) => (
            <button key={m} onClick={() => setShowMode(m)} className={`px-3 py-2 text-xs font-medium capitalize transition-colors ${showMode === m ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}>{m === 'all' ? 'Show all' : 'Active only'}</button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex rounded-lg border border-border overflow-hidden">
          {([['priority', 'Importance'], ['due', 'Due Date'], ['assignee', 'Assignee']] as [SortBy, string][]).map(([k, label]) => (
            <button key={k} onClick={() => setSortBy(k)} className={`px-3 py-2 text-xs font-medium transition-colors ${sortBy === k ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}>{label}</button>
          ))}
        </div>
      </div>

      {/* Active actions */}
      <div className="space-y-3 mb-8">
        {active.map((a) => {
          const Icon = ICONS[a.icon];
          const isExp = expanded === a.id;
          return (
            <div key={a.id} className="rounded-[12px] border border-border bg-card overflow-hidden transition-all">
              <div
                className="flex items-start gap-4 p-4 cursor-pointer hover:bg-muted/20 transition-colors"
                onClick={() => { setExpanded(isExp ? null : a.id); onActionClick?.(a.id); }}
              >
                {/* Priority indicator */}
                <div className="flex-shrink-0 mt-0.5 w-1 self-stretch rounded-full" style={{ backgroundColor: priorityColor[a.priority] }} />
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: a.iconColor }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium leading-snug">{a.title}</p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{a.due}</span>
                      {isExp ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                    <span>Assignee: <span className="text-foreground font-medium">{a.assignee}</span></span>
                    <span>Effort: <span className="font-medium" style={{ color: effortColor[a.effort] }}>{a.effort}</span></span>
                    <span>Impact: <span className="font-medium" style={{ color: impactColor[a.impact] }}>{a.impact}</span></span>
                  </div>
                </div>
              </div>

              {/* Expanded details */}
              {isExp && (
                <div className="px-4 pb-4 border-t border-border bg-muted/10">
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{a.desc}</p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); setCompleted((p) => [...p, a.id]); setExpanded(null); }}
                      className="px-4 py-1.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      ✓ Complete
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); snoozeAction(a.id); setExpanded(null); }}
                      className="px-4 py-1.5 text-xs font-medium rounded-lg border border-border text-muted-foreground hover:bg-muted/50 transition-colors"
                    >
                      Snooze 30s
                    </button>
                  </div>
                </div>
              )}

              {/* Quick action buttons (collapsed state) */}
              {!isExp && (
                <div className="flex gap-2 px-4 pb-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); setCompleted((p) => [...p, a.id]); }}
                    className="px-3 py-1 text-xs font-medium rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Complete
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); snoozeAction(a.id); }}
                    className="px-3 py-1 text-xs font-medium rounded border border-border text-muted-foreground hover:bg-muted/50 transition-colors"
                  >
                    Snooze
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {active.length === 0 && (
          <div className="rounded-[12px] border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground text-sm">No active actions. Great work!</p>
          </div>
        )}
      </div>

      {/* Snoozed */}
      {snoozedList.length > 0 && (
        <div className="mb-6">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">Snoozed</p>
          <div className="space-y-2">
            {snoozedList.map((a) => {
              const Icon = ICONS[a.icon];
              const remaining = snoozeTimers[a.id] ?? 0;
              return (
                <div key={a.id} className="flex items-center justify-between rounded-[10px] border border-border bg-card/50 p-3">
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" style={{ color: a.iconColor }} />
                    <div>
                      <p className="text-sm opacity-60">{a.title}</p>
                      <p className="text-xs text-muted-foreground">Returns in {remaining}s</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setSnoozed((p) => p.filter((id) => id !== a.id)); setSnoozeTimers((p) => { const n = { ...p }; delete n[a.id]; return n; }); }}
                    className="text-xs text-primary hover:underline"
                  >
                    Restore
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed */}
      {doneList.length > 0 && (
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">Completed</p>
          <div className="space-y-2">
            {doneList.map((a) => (
              <div key={a.id} className="flex items-center gap-3 rounded-[10px] border border-border bg-card/50 p-3 opacity-50">
                <CheckCircle2 className="w-4 h-4" style={{ color: '#5DD67A' }} />
                <p className="text-sm line-through text-muted-foreground">{a.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground mt-8">
        This product uses work-system signals (tasks, meetings, assignments). It does not read private messages by default.
      </p>
    </div>
  );
}
