'use client';
import { useState } from 'react';
import { EMPLOYEES } from '@/lib/team-data';
import EmployeeSidebar from '@/components/demo/team-health-components/employee-sidebar';
import EmployeeDetail from '@/components/demo/team-health-components/employee-detail';

const sorted = [...EMPLOYEES].sort((a, b) => a.wwiScore - b.wwiScore);

export default function TeamPage() {
  const [selectedId, setSelectedId] = useState(sorted[0].id);
  const raw = sorted.find((e) => e.id === selectedId) ?? sorted[0];
  const employee = raw;
 
  return (
    <div className="flex p-4 h-full min-h-0 pl-10">
 
      {/* Floating sidebar card */}
      <aside className="flex-shrink-0 w-52 self-start sticky pt-8">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--neutral)] shadow-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--border)]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--fg)]/50">
              Team
            </p>
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-12rem)]">
            <EmployeeSidebar
              employees={sorted}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </div>
      </aside>
 
      {/* Detail panel */}
      <div className="flex-1 min-w-0 overflow-auto">
        <EmployeeDetail key={selectedId} employee={employee} />
      </div>
 
    </div>
  );
}
 
