"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { OverviewPage } from "@/components/overview-page"
import { TeamHealthPage } from "@/components/team-health-page"
import { WorkDistributionPage } from "@/components/work-distribution-page"
import { RecognitionGrowthPage } from "@/components/recognition-growth-page"
import { ActionsPage } from "@/components/actions-page"
import { IntegrationsPage } from "@/components/integrations-page"
import { SettingsPage } from "@/components/settings-page"
import { EmployeeDrawer } from "@/components/employee-drawer"
import { ActionModal } from "@/components/action-modal"
import { OnboardingWizard } from "@/components/onboarding-wizard"
import { DashboardSkeleton } from "@/components/dashboard-skeleton"
import type { Employee } from "@/lib/data"

export default function AppDashboard() {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isActionModalOpen, setIsActionModalOpen] = useState(false)
  const [currentAction, setCurrentAction] = useState<{ title: string; description: string } | null>(null)

  const handleTabChange = (tab: string) => {
    setIsLoading(true)
    setActiveTab(tab)
    setTimeout(() => setIsLoading(false), 400)
  }

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
    setSelectedEmployee(null)
  }

  const handleActionClick = (action: { title: string; description: string }) => {
    setCurrentAction(action)
    setIsActionModalOpen(true)
  }

  const handleActionModalClose = () => {
    setIsActionModalOpen(false)
    setCurrentAction(null)
  }

  const handleActionConfirm = () => {
    setIsActionModalOpen(false)
    setCurrentAction(null)
  }

  const handleDrawerAction = (actionType: string, employee: Employee) => {
    let action = { title: "", description: "" }
    switch (actionType) {
      case "unblock":
        action = {
          title: `Schedule unblock meeting for ${employee.name}`,
          description: "Create a meeting to resolve blocking issues",
        }
        break
      case "recognize":
        action = {
          title: `Draft recognition for ${employee.name}`,
          description: "Create a public shoutout for this employee",
        }
        break
      case "reassign":
        action = {
          title: `Reassign tasks for ${employee.name}`,
          description: "Reduce workload by reassigning tasks to other team members",
        }
        break
      case "1on1":
        action = {
          title: `Schedule 1:1 with ${employee.name}`,
          description: "Set up a one-on-one meeting to discuss support needs",
        }
        break
    }
    setCurrentAction(action)
    setIsActionModalOpen(true)
  }

  if (showOnboarding) {
    return <OnboardingWizard onComplete={() => setShowOnboarding(false)} />
  }

  const renderContent = () => {
    if (isLoading) return <DashboardSkeleton />
    switch (activeTab) {
      case "overview":
        return <OverviewPage onEmployeeClick={handleEmployeeClick} onActionClick={handleActionClick} />
      case "team-health":
        return <TeamHealthPage onEmployeeClick={handleEmployeeClick} />
      case "work-distribution":
        return <WorkDistributionPage onEmployeeClick={handleEmployeeClick} />
      case "recognition-growth":
        return <RecognitionGrowthPage onEmployeeClick={handleEmployeeClick} onActionClick={handleActionClick} />
      case "actions":
        return <ActionsPage onActionClick={handleActionClick} />
      case "integrations":
        return <IntegrationsPage />
      case "settings":
        return <SettingsPage />
      default:
        return <OverviewPage onEmployeeClick={handleEmployeeClick} onActionClick={handleActionClick} />
    }
  }

  return (
    <>
      <DashboardLayout activeTab={activeTab} onTabChange={handleTabChange}>
        {renderContent()}
      </DashboardLayout>

      <EmployeeDrawer
        employee={selectedEmployee}
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        onAction={handleDrawerAction}
      />

      <ActionModal
        isOpen={isActionModalOpen}
        onClose={handleActionModalClose}
        onConfirm={handleActionConfirm}
        title={currentAction?.title || "Confirm Action"}
        description={currentAction?.description || ""}
      />
    </>
  )
}
