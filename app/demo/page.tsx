'use client';

import { Sidebar } from '@/components/demo/sidebar';
import { DemoOverview } from '@/components/demo/overview';
import { Navigation } from '@/components/landing/navigation';
import { ActionsPage } from '@/components/actions-page';
import { IntegrationsPage } from '@/components/integrations-page';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function TeamPage() {
  return (
    <div className="w-full min-h-screen bg-background p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Team</h1>
      <p className="text-muted-foreground">Team page coming soon...</p>
    </div>
  );
}

function AiCoachPage() {
  return (
    <div className="w-full min-h-screen bg-background p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">AI Coach</h1>
      <p className="text-muted-foreground">AI Coach page coming soon...</p>
    </div>
  );
}

function DemoContent() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 'overview';

  const renderContent = () => {
    switch (page) {
      case 'actions':
        return <ActionsPage onActionClick={() => {}} />;
      case 'team':
        return <TeamPage />;
      case 'ai-coach':
        return <AiCoachPage />;
      case 'settings':
        return <IntegrationsPage />;
      default:
        return <DemoOverview />;
    }
  };

  return (
    <main className="flex-1 overflow-auto">
      <h1 className="sr-only">HeartMetrics Demo</h1>
      {renderContent()}
    </main>
  );
}

export default function DemoPage() {
  return (
    <>
      <Navigation />
      <div className="pt-14 min-h-screen bg-background">
        <div className="flex">
          <Sidebar />
          <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
            <DemoContent />
          </Suspense>
        </div>
      </div>
    </>
  );
}
