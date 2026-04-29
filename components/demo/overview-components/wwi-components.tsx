'use client';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import "@/styles/globals.css";
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
    case 'urgent': return 'bg-[var(--accent)]/30 text-[var(--fg)] border-[var(--accent)]';
    case 'high':   return 'bg-[var(--warning)]/30 text-[var(--fg)] border-[var(--warning)]';
    default:       return 'bg-[var(--primary)]/30 text-[var(--fg)] border-[var(--primary)]';
  }
};

export default function WWIComponents({ wwiComponents, keyActions }: Props) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const filteredActions = selectedComponent
    ? keyActions.filter((a) => a.components.includes(selectedComponent))
    : keyActions;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--neutral)] text-[var(--fg)] mb-12 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[480px]">

        {/* Left: Pentagon */}
        <div className="flex flex-col items-center justify-center p-8 border-b lg:border-b-0 lg:border-r border-[var(--border)]">
          <p className="text-xl font-semibold uppercase tracking-widest text-[var(--fg)] mb-4">
            5-Component Signal
          </p>
          <Pentagon
            components={wwiComponents}
            selected={selectedComponent}
            onSelect={setSelectedComponent}
          />
        </div>

        {/* Right: Actions — fixed height on mobile, flex on desktop */}
        <div className="flex flex-col p-6 h-[360px] lg:h-full min-h-0">
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--fg)]">
              {selectedComponent ?? 'All Actions'}
            </h2>
            {selectedComponent && (
              <button
                onClick={() => setSelectedComponent(null)}
                className="text-xs text-[var(--primary)] flex items-center gap-1 hover:underline"
              >
                View all <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="relative flex-1 min-h-0">
            <div className="pointer-events-none absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[var(--neutral)] to-transparent z-10" />
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[var(--neutral)] to-transparent z-10" />
            <div className="absolute inset-0 overflow-y-auto">
              <div className="grid grid-cols-1 gap-3 py-4 px-1">
                {filteredActions.length === 0 ? (
                  <p className="text-sm text-[var(--fg)]/40 text-center py-8">
                    No actions for this component.
                  </p>
                ) : (
                  filteredActions.map((action, idx) => (
                    <button
                      key={idx}
                      className={`rounded-lg p-4 border ${getPriorityColor(action.priority)} hover:scale-[1.02] transition-all duration-200 text-left w-full`}
                    >
                      <p className="font-medium text-sm">{action.title}</p>
                      <p className="text-xs mt-1 opacity-60">Due: {action.dueDate}</p>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}