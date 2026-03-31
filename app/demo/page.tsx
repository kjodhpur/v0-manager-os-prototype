'use client';

import { Sidebar } from '@/components/demo/sidebar';
import { DemoOverview } from '@/components/demo/overview';
import { Navigation } from '@/components/landing/navigation';

export default function DemoPage() {
  return (
    <>
      <Navigation />
      <div className="pt-14 min-h-screen bg-background">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <h1 className="sr-only">HeartMetrics Demo</h1>
            <DemoOverview />
          </main>
        </div>
      </div>
    </>
  );
}
