"use client";

import { Sparkles, RefreshCw, Clock } from "lucide-react";

export function WeeklyTeamInsightCard() {
  return (
    <div className="mb-6 rounded-3xl bg-white border-l-4 border-l-blue-600 p-6 shadow-sm">
      {/* Header with icon and title */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-blue-600 flex-shrink-0" />
          <h2 className="text-lg font-bold text-gray-900">Weekly Team Insight</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Updated 12:44 AM
          </span>
          <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Insight content */}
      <p className="text-sm text-gray-700 leading-relaxed mb-3">
        Your team&apos;s wellbeing dropped 4 points this week. Riya S. and Sam J. are showing early burnout signals based on meeting load and blocked work items. Recommend scheduling 1:1s to discuss workload and dependencies.
      </p>

      {/* AI badge */}
      <div className="flex items-center gap-1">
        <span className="inline-flex items-center gap-1 text-xs text-gray-600">
          <Sparkles className="h-3 w-3" />
          AI-generated · Based on team data from the last 7 days
        </span>
      </div>
    </div>
  );
}
