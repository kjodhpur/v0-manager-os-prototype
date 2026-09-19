'use client';

import { CheckCircle2, AlertCircle, ArrowDown, RotateCcw } from 'lucide-react';
import { useState } from 'react';

type Priority = 'urgent' | 'high' | 'medium';

interface ActionItem {
  id: number;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: Priority;
  status: 'pending' | 'done';
}

const INITIAL_ACTIONS: ActionItem[] = [
  {
    id: 1,
    title: 'Schedule urgent 1:1 with Riya S.',
    description: 'Address declining WWI and workload concerns',
    assignee: 'You',
    dueDate: 'Today',
    priority: 'urgent',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Review Sam J. workload distribution',
    description: 'Redistribute tasks to improve balance',
    assignee: 'You',
    dueDate: 'Tomorrow',
    priority: 'high',
    status: 'pending',
  },
  {
    id: 3,
    title: 'Conduct recognition review',
    description: 'Identify employees with low recognition',
    assignee: 'You',
    dueDate: 'This week',
    priority: 'high',
    status: 'pending',
  },
  {
    id: 4,
    title: 'Growth opportunity assignment',
    description: 'Assign stretch work to high performers',
    assignee: 'You',
    dueDate: 'Next week',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 5,
    title: 'Team engagement survey',
    description: 'Send pulse survey on team connection',
    assignee: 'You',
    dueDate: 'Next week',
    priority: 'medium',
    status: 'pending',
  },
];

const PRIORITY_STYLES: Record<Priority, string> = {
  urgent: 'bg-[var(--risk)]/15 text-[var(--risk)] border-[var(--risk)]/40',
  high: 'bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/40',
  medium: 'bg-primary/10 text-primary border-primary/40',
};

export function ActionsPage() {
  const [actions, setActions] = useState<ActionItem[]>(INITIAL_ACTIONS);

  const handleSnooze = (id: number) => {
    setActions((prev) => {
      const index = prev.findIndex((a) => a.id === id);
      if (index === -1) return prev;
      const next = [...prev];
      const [action] = next.splice(index, 1);
      next.push(action);
      return next;
    });
  };

  const setStatus = (id: number, status: ActionItem['status']) =>
    setActions((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));

  const activeActions = actions.filter((a) => a.status !== 'done');
  const completedActions = actions.filter((a) => a.status === 'done');

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 lg:px-8 lg:py-12">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-foreground lg:text-4xl">Action Queue</h2>
        <p className="mt-2 text-sm text-muted-foreground" aria-live="polite">
          {activeActions.length} active {activeActions.length === 1 ? 'action' : 'actions'},
          prioritised by importance
        </p>
      </header>

      <section aria-label="Active actions" className="mb-12 flex flex-col gap-4">
        {activeActions.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <CheckCircle2
              className="mx-auto mb-3 h-12 w-12 text-[var(--healthy)]"
              aria-hidden="true"
            />
            <p className="text-lg font-semibold text-foreground">All actions complete</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Completed actions are listed below.
            </p>
          </div>
        ) : (
          activeActions.map((action) => (
            <article
              key={action.id}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 lg:p-6"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 shrink-0 rounded-lg border p-1.5 ${PRIORITY_STYLES[action.priority]}`}
                    >
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-foreground lg:text-lg">
                        {action.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                    <span
                      className={`rounded-full border px-2.5 py-1 font-medium ${PRIORITY_STYLES[action.priority]}`}
                    >
                      {action.priority.charAt(0).toUpperCase() + action.priority.slice(1)} priority
                    </span>
                    <span className="text-muted-foreground">Due: {action.dueDate}</span>
                    <span className="text-muted-foreground">Assignee: {action.assignee}</span>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2 lg:flex-col">
                  <button
                    type="button"
                    onClick={() => setStatus(action.id, 'done')}
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--healthy)]/50 bg-[var(--healthy)]/15 px-4 text-sm font-medium text-[var(--healthy)] transition-colors hover:bg-[var(--healthy)]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:flex-none"
                  >
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Complete
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSnooze(action.id)}
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-muted px-4 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:flex-none"
                  >
                    <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                    Snooze
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      {completedActions.length > 0 && (
        <section aria-label="Completed actions">
          <h3 className="mb-4 text-lg font-bold text-foreground">Completed</h3>
          <div className="flex flex-col gap-3">
            {completedActions.map((action) => (
              <article
                key={action.id}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4"
              >
                <CheckCircle2
                  className="h-5 w-5 shrink-0 text-[var(--healthy)]"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-muted-foreground line-through">
                    {action.title}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus(action.id, 'pending')}
                  className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-lg px-3 text-xs font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  Undo
                </button>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
