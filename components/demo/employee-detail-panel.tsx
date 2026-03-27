"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { teamMembers } from "@/app/demo/data";

interface EmployeeDetailPanelProps {
  memberId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EmployeeDetailPanel({ memberId, isOpen, onClose }: EmployeeDetailPanelProps) {
  const member = memberId ? teamMembers.find(m => m.id === memberId) : null;

  if (!member) return null;

  const metrics = [
    { label: "Workload", value: "8.2/10", status: "warning" },
    { label: "Recognition", value: "0 (30d)", status: "danger" },
    { label: "Meetings", value: "12.5h/wk", status: "warning" },
    { label: "Growth", value: "Low", status: "danger" },
    { label: "1:1 Recency", value: "18 days", status: "warning" },
    { label: "WWI Score", value: String(member.whi), status: member.whi < 50 ? "danger" : member.whi < 60 ? "warning" : "good" },
  ];

  const suggestedActions = [
    { label: "Reassign 2 tasks", type: "primary" },
    { label: "Send recognition", type: "secondary" },
    { label: "Schedule 1:1", type: "secondary" },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-[360px] transform bg-white shadow-2xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ borderTopLeftRadius: "24px", borderBottomLeftRadius: "24px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold text-white"
              style={{
                background: `linear-gradient(135deg, ${member.gradientFrom}, ${member.gradientTo})`,
              }}
            >
              {member.initials}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="p-6">
          <h4 className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-500">
            Key Metrics
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className={cn(
                  "rounded-2xl p-4",
                  metric.status === "danger" && "bg-rose-50",
                  metric.status === "warning" && "bg-amber-50",
                  metric.status === "good" && "bg-emerald-50"
                )}
              >
                <p className="text-xs text-gray-500">{metric.label}</p>
                <p
                  className={cn(
                    "text-lg font-semibold",
                    metric.status === "danger" && "text-rose-700",
                    metric.status === "warning" && "text-amber-700",
                    metric.status === "good" && "text-emerald-700"
                  )}
                >
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Actions */}
        <div className="border-t border-gray-100 p-6">
          <h4 className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-500">
            Suggested Actions
          </h4>
          <div className="flex flex-col gap-3">
            {suggestedActions.map((action) => (
              <button
                key={action.label}
                className={cn(
                  "w-full rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                  action.type === "primary"
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                )}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
