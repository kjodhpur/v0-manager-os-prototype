'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  type Employee,
  getBgClass,
  getBorderClass,
  getColor,
  getColorClass,
  getRiskLabel,
} from '@/lib/team-data';

interface Props {
  atRiskEmployees: Employee[];
}

export default function AtRiskEmployees({ atRiskEmployees }: Props) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 lg:p-6" aria-labelledby="at-risk-heading">
      <h2 id="at-risk-heading" className="mb-6 text-xl font-bold text-foreground">
        At-Risk Employees
      </h2>

      {atRiskEmployees.length === 0 ? (
        <p className="py-6 text-sm text-muted-foreground">
          No one is below the attention threshold right now.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {atRiskEmployees.map((emp) => (
            <li key={emp.id}>
              <Link
                href={`/demo?page=team-health&employeeId=${encodeURIComponent(emp.id)}`}
                className={`group flex h-full flex-col rounded-xl border p-5 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${getBorderClass(emp.wwiScore)} bg-background`}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-foreground">{emp.name}</p>
                    <p className="truncate text-sm text-muted-foreground">{emp.role}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${getBgClass(emp.wwiScore)} ${getColorClass(emp.wwiScore)}`}
                  >
                    {getRiskLabel(emp.wwiScore)}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Work Wellbeing Index
                  </p>
                  <p className={`text-3xl font-bold tabular-nums ${getColorClass(emp.wwiScore)}`}>
                    {emp.wwiScore}
                  </p>
                </div>

                <div
                  className="h-1.5 w-full overflow-hidden rounded-full bg-border"
                  role="img"
                  aria-label={`${emp.name} scores ${emp.wwiScore} out of 100`}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${emp.wwiScore}%`, backgroundColor: getColor(emp.wwiScore) }}
                  />
                </div>

                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
                  View details
                  <ArrowRight
                    className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
