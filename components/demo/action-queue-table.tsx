"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Star, Plus, Upload, Calendar } from "lucide-react";
import { actionQueueItems } from "@/app/demo/data";

interface ActionQueueTableProps {
  onRowClick?: (itemId: string) => void;
}

export function ActionQueueTable({ onRowClick }: ActionQueueTableProps) {
  const [starredItems, setStarredItems] = useState<Set<string>>(new Set());

  const toggleStar = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarredItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  const getStatusColorClass = (color: string) => {
    switch (color) {
      case "rose":
        return "bg-rose-50 text-rose-700";
      case "amber":
        return "bg-amber-50 text-amber-700";
      case "blue":
        return "bg-blue-50 text-blue-700";
      case "green":
        return "bg-emerald-50 text-emerald-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const getPriorityColorClass = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-rose-50 text-rose-700";
      case "Medium":
        return "bg-amber-50 text-amber-700";
      case "Low":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg shadow-gray-200/50">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Action Queue</h3>
        <div className="flex items-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50">
            <Plus className="h-4 w-4" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50">
            <Upload className="h-4 w-4" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50">
            <Calendar className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              <th className="pb-3 pr-4"></th>
              <th className="pb-3 pr-4">Employee</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3 pr-4">Priority</th>
              <th className="pb-3 pr-4">Due Date</th>
              <th className="pb-3">Assigned</th>
            </tr>
          </thead>
          <tbody>
            {actionQueueItems.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick?.(item.id)}
                className="cursor-pointer border-b border-gray-50 transition-colors last:border-0 hover:bg-gray-50"
              >
                <td className="py-3 pr-4">
                  <button
                    onClick={(e) => toggleStar(item.id, e)}
                    className="text-gray-300 transition-colors hover:text-amber-400"
                  >
                    <Star
                      className={cn(
                        "h-4 w-4",
                        starredItems.has(item.id) && "fill-amber-400 text-amber-400"
                      )}
                    />
                  </button>
                </td>
                <td className="py-3 pr-4">
                  <span className="font-medium text-gray-900">{item.employee}</span>
                </td>
                <td className="py-3 pr-4">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                      getStatusColorClass(item.statusColor)
                    )}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                      getPriorityColorClass(item.priority)
                    )}
                  >
                    {item.priority}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <span className="text-sm text-gray-600">{item.dueDate}</span>
                </td>
                <td className="py-3">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                      item.assignedType === "ai"
                        ? "bg-purple-50 text-purple-700"
                        : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {item.assignedType === "ai" ? "AI-suggested" : "Manual"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
