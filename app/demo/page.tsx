"use client";

import { useState } from "react";
import Link from "next/link";
import { DemoSidebar } from "@/components/demo/demo-sidebar";
import { DemoHeader } from "@/components/demo/demo-header";
import { TeamPulseBoard } from "@/components/demo/team-pulse-board";
import { ActionQueueTable } from "@/components/demo/action-queue-table";
import { WellbeingJourneyCard } from "@/components/demo/wellbeing-journey-card";
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
    // Extract member ID from task if applicable
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
      {/* Icon Sidebar */}
      <DemoSidebar activeItem="share" onItemClick={handleSidebarClick} />

      {/* Main Content Area */}
      <div className="ml-16">
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

          {/* Team Pulse Board - Main Section */}
          <TeamPulseBoard
            onMemberClick={handleMemberClick}
            onTaskClick={handleTaskClick}
          />

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
