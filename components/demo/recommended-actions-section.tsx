"use client";

import { AlertCircle, Star, RotateCw, Unlock } from "lucide-react";

interface ActionCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  effort: "Low" | "Medium" | "High";
  impact: "Low" | "Medium" | "High";
}

const actionCards: ActionCard[] = [
  {
    id: "1",
    icon: <AlertCircle className="h-5 w-5 text-rose-500" />,
    title: "Reduce overload for Riya",
    subtitle: "Reassign 2 tasks to balance",
    effort: "Low",
    impact: "High",
  },
  {
    id: "2",
    icon: <Star className="h-5 w-5 text-amber-500" />,
    title: "Public recognition for Priya",
    subtitle: "Draft team shoutout",
    effort: "Low",
    impact: "Medium",
  },
  {
    id: "3",
    icon: <RotateCw className="h-5 w-5 text-blue-500" />,
    title: "Rotate next stretch project",
    subtitle: "Assign to Olivia or Fatima",
    effort: "Medium",
    impact: "High",
  },
  {
    id: "4",
    icon: <Unlock className="h-5 w-5 text-green-500" />,
    title: "Unblock Mason dependency",
    subtitle: "Schedule unblock meeting",
    effort: "Low",
    impact: "Medium",
  },
];

function PillBadge({ level }: { level: "Low" | "Medium" | "High" }) {
  const colors = {
    Low: "bg-green-50 text-green-700 border-green-200",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    High: "bg-rose-50 text-rose-700 border-rose-200",
  };
  return (
    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${colors[level]}`}>
      {level}
    </span>
  );
}

function ActionCardComponent({ card }: { card: ActionCard }) {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Icon and title */}
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 mt-1">{card.icon}</div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-sm">{card.title}</h3>
          <p className="text-xs text-gray-600 mt-0.5">{card.subtitle}</p>
        </div>
      </div>

      {/* Footer with effort and impact */}
      <div className="flex items-center gap-3 text-xs">
        <div className="flex items-center gap-1">
          <span className="text-gray-600 font-medium">Effort:</span>
          <PillBadge level={card.effort} />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-600 font-medium">Impact:</span>
          <PillBadge level={card.impact} />
        </div>
      </div>
    </div>
  );
}

export function RecommendedActionsSection() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-lg font-bold text-gray-900">This Week&apos;s Recommended Actions</h2>
        <span className="inline-flex items-center rounded-full bg-gray-900 px-3 py-1 text-xs font-bold text-white">
          5 actions
        </span>
      </div>

      {/* Grid of action cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {actionCards.map((card) => (
          <ActionCardComponent key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
