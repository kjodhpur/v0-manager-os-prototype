'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Pentagon from './pentagon';

interface WWIComponent {
  name: string;
  shortName: string;
  value: number;
}

interface Action {
  title: string;
  priority: string;
  dueDate: string;
  components: string[];
}

interface Props {
  wwiComponents: WWIComponent[];
  keyActions: Action[];
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent': return 'bg-[var(--risk)]/15 text-foreground border-[var(--risk)]/50';
    case 'high':   return 'bg-[var(--accent)]/15 text-foreground border-[var(--accent)]/50';
    default:       return 'bg-primary/10 text-foreground border-primary/40';
  }
};

export default function WWIComponents({ wwiComponents, keyActions }: Props) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const filteredActions = selectedComponent
    ? keyActions.filter((a) => a.components.includes(selectedComponent))
    : keyActions;

  return (
    <div className="mb-8 overflow-hidden rounded-xl border border-border bg-card text-foreground">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col items-center border-b border-border p-6 lg:border-b-0 lg:border-r">
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-foreground">
            5-Component Signal
          </h2>
          <p className="mt-1 text-center text-xs text-muted-foreground">
            Select a point to filter actions
          </p>
          <Pentagon
            components={wwiComponents}
            selected={selectedComponent}
            onSelect={setSelectedComponent}
          />
        </div>

        <div className="flex flex-col p-5 lg:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="truncate text-sm font-semibold uppercase tracking-wider text-foreground">
              {selectedComponent ?? 'All Actions'}
            </h3>
            {selectedComponent && (
              <button
                type="button"
                onClick={() => setSelectedComponent(null)}
                className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                View all <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </button>
            )}
          </div>

          <ul
            tabIndex={0}
            className="flex flex-col gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:max-h-[380px] lg:overflow-y-auto"
          >
            {filteredActions.length === 0 ? (
              <li className="py-8 text-center text-sm text-muted-foreground">
                No actions for this component.
              </li>
            ) : (
              filteredActions.map((action) => (
                <li
                  key={action.title}
                  className={`rounded-xl border p-4 ${getPriorityColor(action.priority)}`}
                >
                  <p className="text-sm font-medium">{action.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Due: {action.dueDate}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
