import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Calculate | HeartMetrics",
  description: "Built on the U.S. Surgeon General's Framework for Workplace Mental Health. See exactly how HeartMetrics measures the five essentials of worker well-being.",
  openGraph: {
    title: "How We Calculate — HeartMetrics",
    description: "No black boxes. Research-backed methodology grounded in the Surgeon General's 5 Essentials for Workplace Well-Being.",
  },
};

export default function HowWeCalculateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
