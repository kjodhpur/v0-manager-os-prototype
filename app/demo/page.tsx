import { Suspense } from 'react';
import { DemoContent } from '@/components/demo/demo-content';

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