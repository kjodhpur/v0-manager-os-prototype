'use client';

import { AlertTriangle, Star, RefreshCw, Calendar, Unlock, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const initialActions = [
  { id: 1, icon: 'alert-triangle', iconColor: '#FF6B6B', title: "Unblock Riya's 4 blocked tasks",    desc: 'Schedule a 30-min unblock session with tech leads.', effort: 'Medium', impact: 'High',   due: 'Today' },
  { id: 2, icon: 'star',           iconColor: '#FFB347', title: "Recognize Olivia's platform work",   desc: 'Post a public shoutout for three quiet wins this sprint.', effort: 'Low',    impact: 'Medium', due: 'Tomorrow' },
  { id: 3, icon: 'refresh-cw',     iconColor: '#00B8A0', title: 'Rotate stretch project opportunity', desc: "Give Jordan next quarter's design-review lead role.", effort: 'Low',    impact: 'High',   due: 'This week' },
  { id: 4, icon: 'calendar',       iconColor: '#00B8A0', title: 'Schedule 1:1 with Sam',              desc: 'Check in on firefighting load — no 1:1 in 3 weeks.',  effort: 'Low',    impact: 'Medium', due: 'This week' },
  { id: 5, icon: 'unlock',         iconColor: '#00B8A0', title: "Clear Priya's meeting load",          desc: 'Reassign 2 recurring meetings to free 3 hrs/week.',   effort: 'Medium', impact: 'Medium', due: 'Next week' },
];

const ICONS: Record<string, React.ElementType> = {
  'alert-triangle': AlertTriangle,
  'star': Star,
  'refresh-cw': RefreshCw,
  'calendar': Calendar,
  'unlock': Unlock,
};

const effortColor: Record<string, string> = { Low: '#5DD67A', Medium: '#FFB347', High: '#FF6B6B' };
const impactColor: Record<string, string> = { Low: '#8B8B8B', Medium: '#FFB347', High: '#FF6B6B' };

export function ActionsPage({ onActionClick }: { onActionClick?: (id: number) => void }) {
  const [completed, setCompleted] = useState<number[]>([]);
  const [snoozed, setSnoozed]     = useState<number[]>([]);

  const active      = initialActions.filter((a) => !completed.includes(a.id) && !snoozed.includes(a.id));
  const snoozedList = initialActions.filter((a) => snoozed.includes(a.id));
  const doneList    = initialActions.filter((a) => completed.includes(a.id));

  return (
    <div className="w-full min-h-screen bg-background p-6 lg:p-8 overflow-x-hidden">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold text-foreground">Actions</h1>
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-primary text-primary-foreground">
            {active.length}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">This week's recommended actions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mb-8">
        {active.map((a) => {
          const Icon = ICONS[a.icon];
          return (
            <div
              key={a.id}
              className="rounded-[12px] border border-border bg-card p-4 hover:shadow-md transition-all cursor-pointer"
              onClick={() => onActionClick?.(a.id)}
            >
              <div className="flex gap-3 mb-3">
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: a.iconColor }} />
                <div>
                  <p className="text-sm font-medium leading-snug">{a.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{a.desc}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <span>Effort:</span>
                  <span className="px-2 py-0.5 rounded font-medium" style={{ backgroundColor: `${effortColor[a.effort]}18`, color: effortColor[a.effort] }}>{a.effort}</span>
                  <span className="ml-1">Impact:</span>
                  <span className="font-medium" style={{ color: impactColor[a.impact] }}>{a.impact}</span>
                </div>
                <span>{a.due}</span>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={(e) => { e.stopPropagation(); setCompleted((p) => [...p, a.id]); }} className="flex-1 py-1.5 text-xs font-medium rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity">Complete</button>
                <button onClick={(e) => { e.stopPropagation(); setSnoozed((p) => [...p, a.id]); }} className="flex-1 py-1.5 text-xs font-medium rounded border border-border text-muted-foreground hover:bg-muted/50 transition-colors">Snooze</button>
              </div>
            </div>
          );
        })}
      </div>

      {snoozedList.length > 0 && (
        <div className="mb-6">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">Snoozed</p>
          <div className="space-y-2">
            {snoozedList.map((a) => {
              const Icon = ICONS[a.icon];
              return (
                <div key={a.id} className="flex items-center justify-between rounded-[10px] border border-border bg-card/50 p-3 opacity-60">
                  <div className="flex items-center gap-3"><Icon className="w-4 h-4" style={{ color: a.iconColor }} /><p className="text-sm">{a.title}</p></div>
                  <button onClick={() => setSnoozed((p) => p.filter((id) => id !== a.id))} className="text-xs text-primary hover:underline">Restore</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

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
