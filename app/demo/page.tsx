'use client';

import { Sidebar } from '@/components/demo/sidebar';
import { DemoOverview } from '@/components/demo/overview';
import { ActionsPage } from '@/components/actions-page';
import { RecognitionGrowthPage } from '@/components/recognition-growth-page';
import TeamHealthPage from '@/components/demo/team-health-page';
import { WorkDistributionPage } from '@/components/work-distribution-page';
import { IntegrationsPage } from '@/components/integrations-page';
import { SettingsPage } from '@/components/settings-page';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { AICoachPage } from '@/components/ai-coach-page';


function DemoContent({ page }: { page: string }) {

  const renderContent = () => {
    switch (page) {
      case 'team-health':
        return <TeamHealthPage />;
      case 'settings':
        return <SettingsPage/>;
      case 'ai-coach':
        return <AICoachPage/>;
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
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 'overview';
  
  return (
    <div className="max-h-[100vh]">
      <div className="bg-background">
        <div className="flex">
          <Sidebar page={page} />
          <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
            <div className = {'max-h-[100vh] flex-1 overflow-auto'}>
              <DemoContent page={page} />
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
