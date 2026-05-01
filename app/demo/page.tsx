'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sidebar } from '@/components/demo/sidebar';
import { DemoOverview } from '@/components/demo/overview';
import { ActionsPage } from '@/components/actions-page';
import { SettingsPage } from '@/components/settings-page';
import { AICoachPage } from '@/components/ai-coach-page';
import TeamPage from '@/components/demo/team-health-page';

function DemoContent() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 'overview';

  const renderContent = () => {
    switch (page) {
      case 'actions':    return <ActionsPage />;
      case 'team-health': return <TeamPage />;
      case 'settings':   return <SettingsPage />;
      case 'ai-coach':   return <AICoachPage />;
      default:           return <DemoOverview />;
    }
  };

  return (
    <>
      <Sidebar page={page} />
      <main className="flex-1 overflow-auto">
        <h1 className="sr-only">HeartMetrics Demo</h1>
        {renderContent()}
      </main>
    </>
  );
}

export default function DemoPage() {
  return (
    <div className="max-h-[100vh]">
      <div className="bg-background">
        <div className="flex">
          <Suspense fallback={
            <div className="flex-1 flex items-center justify-center">Loading...</div>
          }>
            <DemoContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}