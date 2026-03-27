"use client";

import { AlertTriangle } from "lucide-react";

interface RiskFlag {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const riskFlags: RiskFlag[] = [
  {
    id: "1",
    icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    title: "Stretch work concentrated",
    description: "Top 2 employees get 65% of visible projects",
  },
  {
    id: "2",
    icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    title: "Recognition skew",
    description: "3 employees have zero public recognition",
  },
  {
    id: "3",
    icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    title: "Uneven 1:1 support",
    description: "Support time varies 3x across team",
  },
];

export function FairnessInsightsPanel() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      {/* Header */}
      <h2 className="text-lg font-bold text-gray-900 mb-1">Fairness Insights</h2>
      <p className="text-sm text-gray-600 mb-4">3 Risk Flags</p>

      {/* Risk flags list */}
      <div className="space-y-1">
        {riskFlags.map((flag, index) => (
          <div key={flag.id}>
            <div className="flex items-start gap-3 py-3 px-2">
              <div className="flex-shrink-0 mt-0.5">{flag.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-sm text-gray-900">{flag.title}</h3>
                <p className="text-xs text-gray-600 mt-0.5">{flag.description}</p>
              </div>
            </div>
            {index < riskFlags.length - 1 && (
              <div className="border-t border-gray-100" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
