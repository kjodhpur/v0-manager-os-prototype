import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Employee, getColor, getColorClass, getBorderClass, getBgClass, getRiskLabel } from '@/lib/team-data';
import Pentagon from '@/components/demo/overview-components/pentagon';

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent': return 'bg-[var(--accent)]/15 text-foreground border-[var(--accent)]/50';
    case 'high':   return 'bg-[var(--warning)]/15 text-foreground border-[var(--warning)]/50';
    default:       return 'bg-primary/10 text-foreground border-primary/40';
  }
};

const initialsOf = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')
    .toUpperCase();

interface Props {
  employee: Employee;
}

export default function EmployeeDetail({ employee }: Props) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const filteredActions = selectedComponent
    ? employee.actions.filter((a) => a.component === selectedComponent)
    : employee.actions;

  const activeLabel = selectedComponent ?? 'All Actions';

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ${getBgClass(employee.wwiScore)} ${getColorClass(employee.wwiScore)}`}
        >
          {initialsOf(employee.name)}
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-2xl font-bold text-foreground">{employee.name}</h2>
          <p className="truncate text-sm text-muted-foreground">{employee.role}</p>
        </div>

        <div className="flex w-full items-center justify-between gap-4 sm:ml-auto sm:w-auto">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${getBorderClass(employee.wwiScore)} ${getBgClass(employee.wwiScore)} ${getColorClass(employee.wwiScore)}`}
          >
            {getRiskLabel(employee.wwiScore)}
          </span>
          <div className="text-right">
            <p className={`text-3xl font-bold leading-none tabular-nums sm:text-4xl ${getColorClass(employee.wwiScore)}`}>
              {employee.wwiScore}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
              WWI Score
            </p>
          </div>
        </div>
      </div>

      {/* Pentagon + Actions */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col items-center border-b border-border p-6 lg:border-b-0 lg:border-r">
            <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-foreground">
              5-Component Signal
            </h3>
            <p className="mt-1 text-center text-xs text-muted-foreground">
              Select a point to filter actions
            </p>
            <Pentagon
              components={employee.components}
              selected={selectedComponent}
              onSelect={setSelectedComponent}
            />
          </div>

          <div className="flex flex-col p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="truncate text-sm font-semibold uppercase tracking-wider text-foreground">
                {activeLabel}
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

            <ul className="flex flex-col gap-3 lg:max-h-[340px] lg:overflow-y-auto">
              {filteredActions.length === 0 ? (
                <li className="py-8 text-center text-sm text-muted-foreground">
                  No actions for this component.
                </li>
              ) : (
                filteredActions.map((action) => (
                  <li
                    key={`${action.component}-${action.title}`}
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

      {/* Component breakdown */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Component Breakdown
        </h3>
        <div className="flex flex-col gap-4">
          {employee.components.map((comp) => {
            const isSelected = selectedComponent === comp.name;
            return (
              <button
                key={comp.name}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedComponent(isSelected ? null : comp.name)}
                className={`w-full rounded-lg p-2 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isSelected ? 'ring-1 ring-primary' : ''
                }`}
              >
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <span className="truncate text-sm text-foreground/80">{comp.name}</span>
                  <span className={`text-sm font-bold tabular-nums ${getColorClass(comp.value)}`}>
                    {comp.value}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-border">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${comp.value}%`, backgroundColor: getColor(comp.value) }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
