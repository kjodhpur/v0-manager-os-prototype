import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QR Code',
  description: 'Scan or share a link to the HeartMetrics live demo.',
  robots: { index: false, follow: true },
};

export default function QrLayout({ children }: { children: React.ReactNode }) {
  return children;
}
