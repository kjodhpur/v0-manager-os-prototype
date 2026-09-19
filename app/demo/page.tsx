import { Suspense } from 'react';
import type { Metadata } from 'next';
import { DemoContent } from '@/components/demo/demo-content';

export const metadata: Metadata = {
  title: 'Live Demo',
  description:
    'Explore the HeartMetrics manager dashboard with sample data — team wellbeing signals, at-risk detection and AI coaching.',
  robots: { index: false, follow: true },
};

export default function DemoPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Suspense
        fallback={
          <div className="flex min-h-screen flex-1 items-center justify-center">
            <span className="text-sm text-muted-foreground">Loading demo…</span>
          </div>
        }
      >
        <DemoContent />
      </Suspense>
    </div>
  );
}
