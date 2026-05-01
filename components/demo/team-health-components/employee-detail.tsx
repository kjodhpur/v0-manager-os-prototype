import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Employee, getColor, getColorClass, getBorderClass, getBgClass } from '@/lib/team-data';
import Pentagon from '@/components/demo/overview-components/pentagon';

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent': return 'bg-[var(--accent)]/30 text-[var(--fg)] border-[var(--accent)]';
    case 'high':   return 'bg-[var(--warning)]/30 text-[var(--fg)] border-[var(--warning)]';
    default:       return 'bg-[var(--primary)]/30 text-[var(--fg)] border-[var(--primary)]';
  }
};

interface Props {
  employee: Employee;
}

export default function EmployeeDetail({ employee }: Props) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const filteredActions = selectedComponent
    ? employee.actions.filter((a) => a.component === selectedComponent)
    : employee.actions;

  const activeLabel = selectedComponent ?? 'All Actions';
  const avg = employee.components.reduce((s, c) => s + c.value, 0) / employee.components.length;

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-auto p-6 lg:p-10 gap-8">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${getBgClass(employee.wwiScore)} ${getColorClass(employee.wwiScore)}`}>
          {employee.name.split(' ')[0][0]}{employee.name.split(' ')[1]?.[0] ?? ''}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--fg)]">{employee.name}</h1>
          <p className="text-sm text-[var(--fg)]/50">{employee.role}</p>
        </div>
        <div className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold border ${getBorderClass(employee.wwiScore)} ${getBgClass(employee.wwiScore)} ${getColorClass(employee.wwiScore)}`}>
          {employee.status}
        </div>
        <div className="text-right">
          <p className={`text-4xl font-bold ${getColorClass(employee.wwiScore)}`}>{employee.wwiScore}</p>
          <p className="text-xs text-[var(--fg)]/40 uppercase tracking-wider">WWI Score</p>
        </div>
      </div>

      {/* Pentagon + Actions */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--neutral)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[480px]">

          {/* Pentagon */}
          <div className="flex flex-col items-center justify-center p-8 border-b lg:border-b-0 lg:border-r border-[var(--border)] h-full">
            <p className="text-xl font-semibold uppercase tracking-widest text-[var(--fg)]">
              5-Component Signal
            </p>
            <Pentagon
              components={employee.components}
              selected={selectedComponent}
              onSelect={setSelectedComponent}
            />
          </div>

          {/* Actions */}
          <div className="p-6 flex flex-col h-full min-h-[480px]">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--fg)]">
                {activeLabel}
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
              <div className="h-full overflow-x-visible overflow-y-auto">
                <div className="grid grid-cols-1 gap-3 py-4 px-2">
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
                {/* Top fade */}
                <div className="pointer-events-none absolute top-0 left-0 w-full h-10 z-10"
                  style={{ background: 'linear-gradient(to bottom, var(--neutral) 0%, transparent 100%)' }} />
                {/* Bottom fade */}
                <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 z-10"
                  style={{ background: 'linear-gradient(to top, var(--neutral) 30%, transparent 100%)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Component breakdown bar */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--neutral)] p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--fg)]/50 mb-5">
          Component Breakdown
        </p>
        <div className="grid grid-cols-1 gap-4">
          {employee.components.map((comp) => (
            <button
              key={comp.name}
              onClick={() => setSelectedComponent(selectedComponent === comp.name ? null : comp.name)}
              className={`w-full text-left transition-all duration-200 rounded-lg p-1 ${selectedComponent === comp.name ? 'ring-1 ring-[var(--primary)]' : ''}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-[var(--fg)]/70">{comp.name}</span>
                <span className={`text-sm font-bold ${getColorClass(comp.value)}`}>{comp.value}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[var(--border)]">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${comp.value}%`, backgroundColor: getColor(comp.value) }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
