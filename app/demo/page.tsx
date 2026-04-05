'use client';

import { Sidebar } from '@/components/demo/sidebar';
import { DemoOverview } from '@/components/demo/overview';
import { Navigation } from '@/components/landing/navigation';
import { TimelinePage } from '@/components/timeline-page';
import { ActionsPage } from '@/components/actions-page';
import { RecognitionGrowthPage } from '@/components/recognition-growth-page';
import { TeamHealthPage } from '@/components/team-health-page';
import { WorkDistributionPage } from '@/components/work-distribution-page';
import { IntegrationsPage } from '@/components/integrations-page';
import { SettingsPage } from '@/components/settings-page';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function DemoContent() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 'overview';

  const renderContent = () => {
    switch (page) {
      case 'timeline':
        return <TimelinePage />;
      case 'actions':
        return <ActionsPage onActionClick={() => {}} />;
      case 'recognition':
        return <RecognitionGrowthPage onEmployeeClick={() => {}} onActionClick={() => {}} />;
      case 'team-health':
        return <TeamHealthPage onEmployeeClick={() => {}} />;
      case 'work-distribution':
        return <WorkDistributionPage onEmployeeClick={() => {}} />;
      case 'integrations':
        return <IntegrationsPage />;
      case 'settings':
        return <SettingsPage />;
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
