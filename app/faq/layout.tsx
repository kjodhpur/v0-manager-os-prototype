import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Common questions about HeartMetrics: what data we read, how the Work Wellbeing Index is calculated, what employees can see, and how retention works.',
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
