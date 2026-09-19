import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Request a HeartMetrics demo or ask a question about privacy, integrations or pricing.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
