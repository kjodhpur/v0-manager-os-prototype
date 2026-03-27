"use client";

import { useState } from "react";
import Link from "next/link";
import { DemoSidebarExpanded } from "@/components/demo/demo-sidebar-expanded";
import { DemoHeader } from "@/components/demo/demo-header";
import { SmartNotificationBanner } from "@/components/demo/smart-notification-banner";
import { TeamFilterBar } from "@/components/demo/team-filter-bar";
import { WeeklyTeamInsightCard } from "@/components/demo/weekly-team-insight-card";
import { TeamPulseBoard } from "@/components/demo/team-pulse-board";
import { ActionQueueTable } from "@/components/demo/action-queue-table";
import { WellbeingJourneyCard } from "@/components/demo/wellbeing-journey-card";
import { RecommendedActionsSection } from "@/components/demo/recommended-actions-section";
import { FairnessInsightsPanel } from "@/components/demo/fairness-insights-panel";
import { EmployeeDetailPanel } from "@/components/demo/employee-detail-panel";

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleMemberClick = (memberId: string) => {
    setSelectedMemberId(memberId);
    setIsPanelOpen(true);
  };

  const handleTaskClick = (taskId: string) => {
    console.log("Task clicked:", taskId);
  };

  const handlePanelClose = () => {
    setIsPanelOpen(false);
    setSelectedMemberId(null);
  };

  const handleSidebarClick = (item: string) => {
    if (item === "back") {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Smart Notification Banner (pinned top) */}
      <SmartNotificationBanner />

      {/* Expanded Sidebar */}
      <DemoSidebarExpanded activeItem="overview" onItemClick={handleSidebarClick} />

      {/* Main Content Area */}
      <div className="ml-48 pt-16">
        {/* Header with Navigation Tabs */}
        <DemoHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
          notificationCount={2}
        />

        {/* Page Content */}
        <main className="p-6">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Team Pulse</h1>
            <p className="text-sm text-gray-500">
              Priya M. · Engineering Team A · Today, {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>

          {/* Team Filter Controls Bar */}
          <TeamFilterBar />

          {/* Weekly Team Insight Card */}
          <WeeklyTeamInsightCard />

          {/* 4 KPI Stat Cards Row (from TeamPulseBoard header) */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-xs text-gray-600 font-medium">Team WHI Average</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">67</p>
              <p className="text-xs text-green-600 mt-1">+4 from last week</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-xs text-gray-600 font-medium">High Risk Employees</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
              <p className="text-xs text-rose-600 mt-1">Need immediate attention</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-xs text-gray-600 font-medium">Blocked Work Items</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">11</p>
              <p className="text-xs text-amber-600 mt-1">Active blockers</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-xs text-gray-600 font-medium">Manager Fairness Score</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">74</p>
              <p className="text-xs text-blue-600 mt-1">Confidence: Medium</p>
            </div>
          </div>

          {/* Attention Needed Table */}
          <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Attention Needed - Top 5 Employees</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">WHI</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Issue</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">Riya S. (Analyst)</td>
                    <td className="py-3 px-4 text-rose-600 font-semibold">41</td>
                    <td className="py-3 px-4"><span className="inline-flex px-2 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-medium border border-rose-200">Blocked + Overloaded</span></td>
                    <td className="py-3 px-4"><button className="px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800">View</button></td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">Sam J. (Ops)</td>
                    <td className="py-3 px-4 text-amber-600 font-semibold">49</td>
                    <td className="py-3 px-4"><span className="inline-flex px-2 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200">High firefighting</span></td>
                    <td className="py-3 px-4"><button className="px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800">View</button></td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">Diego P. (Specialist)</td>
                    <td className="py-3 px-4 text-blue-600 font-semibold">52</td>
                    <td className="py-3 px-4"><span className="inline-flex px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200">Medium risk</span></td>
                    <td className="py-3 px-4"><button className="px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800">View</button></td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">Priya R. (Analyst)</td>
                    <td className="py-3 px-4 text-blue-600 font-semibold">55</td>
                    <td className="py-3 px-4"><span className="inline-flex px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200">Recognition gap</span></td>
                    <td className="py-3 px-4"><button className="px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800">View</button></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">Mason G. (Analyst)</td>
                    <td className="py-3 px-4 text-green-600 font-semibold">58</td>
                    <td className="py-3 px-4"><span className="inline-flex px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-200">Recognition gap</span></td>
                    <td className="py-3 px-4"><button className="px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800">View</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommended Actions + Fairness Insights (two-column row) */}
          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RecommendedActionsSection />
            </div>
            <div className="lg:col-span-1">
              <FairnessInsightsPanel />
            </div>
          </div>

          {/* Team Pulse Board - kept as-is */}
          {activeTab === "dashboard" && (
            <>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Team Pulse Board</h2>
              <TeamPulseBoard
                onMemberClick={handleMemberClick}
                onTaskClick={handleTaskClick}
              />
            </>
          )}

          {/* Bottom Grid: Action Queue + Wellbeing Journey */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <ActionQueueTable onRowClick={(id) => console.log("Row clicked:", id)} />
            </div>
            <div className="lg:col-span-2">
              <WellbeingJourneyCard />
            </div>
          </div>

          {/* Demo Mode Banner */}
          <div className="mt-6 rounded-2xl bg-gray-100 px-4 py-3 text-center">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Demo Mode</span> — You are viewing simulated sample data.{" "}
              <Link href="/demo" className="text-blue-600 hover:underline">
                Connect real tools
              </Link>{" "}
              in Integrations to see your team.
            </p>
          </div>

          {/* Trust Microcopy */}
          <p className="mt-4 text-center text-xs text-gray-500">
            This product uses work-system signals (tasks, meetings, assignments). It does not read private messages by default.
          </p>
        </main>
      </div>

      {/* Employee Detail Panel */}
      <EmployeeDetailPanel
        memberId={selectedMemberId}
        isOpen={isPanelOpen}
        onClose={handlePanelClose}
      />
    </div>
  );
}
