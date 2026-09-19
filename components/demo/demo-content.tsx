'use client';

import { useSearchParams } from 'next/navigation';
import { Sidebar } from '@/components/demo/sidebar';
import { DemoOverview } from '@/components/demo/overview';
import { ActionsPage } from '@/components/actions-page';
import SettingsPage from '@/components/demo/settings-page';
import { AIChatPage } from '@/components/demo/ai-chat-page';
import TeamPage from '@/components/demo/team-health-page';

const PAGES = {
  overview: DemoOverview,
  actions: ActionsPage,
  'team-health': TeamPage,
  'settings-page': SettingsPage,
  'ai-chat-page': AIChatPage,
} as const;

type PageKey = keyof typeof PAGES;

const isPageKey = (value: string): value is PageKey => value in PAGES;

export function DemoContent() {
  const searchParams = useSearchParams();
  const requested = searchParams.get('page') ?? 'overview';
  // An unknown ?page= value resolves to the overview so the nav highlight and the
  // rendered view can never disagree.
  const page: PageKey = isPageKey(requested) ? requested : 'overview';
  const ActivePage = PAGES[page];

  return (
    <>
      <Sidebar page={page} />
      <main className="min-w-0 flex-1 pt-14 lg:pt-0">
        <h1 className="sr-only">HeartMetrics Demo</h1>
        <ActivePage />
      </main>
    </>
  );
}
