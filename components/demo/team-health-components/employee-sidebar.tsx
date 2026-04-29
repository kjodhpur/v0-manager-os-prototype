'use client';
import { Employee, getColorClass, getBorderClass, getBgClass } from '@/lib/team-data';

interface Props {
  employees: Employee[];
  selectedId: string;
  onSelect: (id: string) => void;
}
 
export default function EmployeeSidebar({ employees, selectedId, onSelect }: Props) {
  return (
    <>
      {employees.map((emp) => {
        const isSelected = emp.id === selectedId;
        const initials = emp.name.split(' ').map((n) => n[0]).join('');
 
        return (
          <button
            key={emp.id}
            onClick={() => onSelect(emp.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 transition-all duration-200 text-left border-l-2 ${
              isSelected
                ? `${getBorderClass(emp.wwiScore)} bg-[var(--fg)]/5`
                : 'border-transparent hover:bg-[var(--fg)]/5'
            }`}
          >
            {/* Avatar */}
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${getBgClass(emp.wwiScore)} ${getColorClass(emp.wwiScore)}`}>
              {initials}
            </div>
 
            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-medium truncate ${isSelected ? 'text-[var(--fg)]' : 'text-[var(--fg)]/70'}`}>
                {emp.name}
              </p>
              <p className="text-[10px] text-[var(--fg)]/40 truncate">{emp.role}</p>
            </div>
 
            {/* Score badge */}
            <span className={`text-xs font-bold flex-shrink-0 ${getColorClass(emp.wwiScore)}`}>
              {emp.wwiScore}
            </span>
          </button>
        );
      })}
    </>
  );
}
 