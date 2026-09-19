'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { EMPLOYEES } from '@/lib/team-data';
import EmployeeSidebar from '@/components/demo/team-health-components/employee-sidebar';
import EmployeeDetail from '@/components/demo/team-health-components/employee-detail';

const sorted = [...EMPLOYEES].sort((a, b) => a.wwiScore - b.wwiScore);

export default function TeamPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramId = searchParams.get('employeeId');

  // The URL is the single source of truth for selection, so deep links, the
  // back button and the at-risk cards all stay in agreement.
  const selectedId = sorted.some((e) => e.id === paramId) ? (paramId as string) : sorted[0].id;
  const employee = sorted.find((e) => e.id === selectedId) ?? sorted[0];

  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    setNotFound(Boolean(paramId) && !sorted.some((e) => e.id === paramId));
  }, [paramId]);

  const handleSelect = (id: string) => {
    router.push(`/demo?page=team-health&employeeId=${encodeURIComponent(id)}`, { scroll: false });
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-8 lg:py-8">
      {notFound && (
        <p
          role="status"
          className="mb-4 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-foreground"
        >
          We couldn&apos;t find that team member, so we&apos;re showing {employee.name} instead.
        </p>
      )}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Team list — a horizontal rail on mobile, a sticky column on desktop. */}
        <aside className="lg:sticky lg:top-8 lg:w-60 lg:shrink-0">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="border-b border-border px-4 py-3">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Team
              </h2>
            </div>
            <div className="lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto">
              <EmployeeSidebar employees={sorted} selectedId={selectedId} onSelect={handleSelect} />
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <EmployeeDetail key={selectedId} employee={employee} />
        </div>
      </div>
    </div>
  );
}
