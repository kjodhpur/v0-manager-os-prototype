<<<<<<< HEAD
import { Suspense } from 'react';
import { DemoContent } from '@/components/demo/demo-content';

export default function DemoPage() {
  return (
    <div className="max-h-[100vh]">
      <div className="bg-background">
=======
'use client';

import Link from 'next/link';
import { Sidebar } from '@/components/demo/sidebar';
import { DemoOverview } from '@/components/demo/overview';
import { ActionsPage } from '@/components/actions-page';
import { IntegrationsPage } from '@/components/integrations-page';
import { TeamPageNew } from '@/components/team-page-new';
import { AiCoachPage } from '@/components/ai-coach-page';
import { FloatingChatWidget } from '@/components/demo/floating-chat-widget';
import { HeartMetricsLogo } from '@/components/heart-metrics-logo';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function DemoHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-card/90 backdrop-blur-xl border-b border-border flex items-center px-4">
      <Link href="/" className="flex items-center">
        <HeartMetricsLogo variant="icon" size="lg" />
      </Link>
    </header>
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
        return <TeamPageNew />;
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
      <DemoHeader />
      <div className="pt-14 min-h-screen bg-background">
>>>>>>> refs/remotes/origin/main
        <div className="flex">
          <Suspense fallback={
            <div className="flex-1 flex items-center justify-center">Loading...</div>
          }>
            <DemoContent />
          </Suspense>
        </div>
      </div>
<<<<<<< HEAD
    </div>
=======
      <FloatingChatWidget />
    </>
>>>>>>> refs/remotes/origin/main
  );
}