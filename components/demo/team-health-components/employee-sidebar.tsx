import { Employee, getColorClass, getBorderClass, getBgClass } from '@/lib/team-data';

interface Props {
  employees: Employee[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const initialsOf = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')
    .toUpperCase();

export default function EmployeeSidebar({ employees, selectedId, onSelect }: Props) {
  if (employees.length === 0) {
    return <p className="px-4 py-6 text-sm text-muted-foreground">No team members yet.</p>;
  }

  return (
    <ul className="flex snap-x gap-1 overflow-x-auto p-1 lg:flex-col lg:gap-0 lg:overflow-visible lg:p-0">
      {employees.map((emp) => {
        const isSelected = emp.id === selectedId;

        return (
          <li key={emp.id} className="shrink-0 snap-start lg:shrink">
            <button
              type="button"
              onClick={() => onSelect(emp.id)}
              aria-current={isSelected ? 'true' : undefined}
              className={`flex min-h-[52px] w-full items-center gap-3 rounded-lg border-l-2 px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:rounded-none ${
                isSelected
                  ? `bg-muted ${getBorderClass(emp.wwiScore)}`
                  : 'border-transparent hover:bg-muted'
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${getBgClass(emp.wwiScore)} ${getColorClass(emp.wwiScore)}`}
              >
                {initialsOf(emp.name)}
              </span>

              <span className="min-w-0 flex-1">
                <span
                  className={`block truncate text-xs font-medium ${isSelected ? 'text-foreground' : 'text-foreground/70'}`}
                >
                  {emp.name}
                </span>
                <span className="block truncate text-[10px] text-muted-foreground">{emp.role}</span>
              </span>

              <span className={`shrink-0 text-xs font-bold tabular-nums ${getColorClass(emp.wwiScore)}`}>
                {emp.wwiScore}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
