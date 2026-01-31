"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { OverviewPage } from "@/components/overview-page"
import { TeamHealthPage } from "@/components/team-health-page"
import { WorkDistributionPage } from "@/components/work-distribution-page"
import { RecognitionGrowthPage } from "@/components/recognition-growth-page"
import { ActionsPage } from "@/components/actions-page"
import { EmployeeDrawer } from "@/components/employee-drawer"
import { ActionModal } from "@/components/action-modal"
import type { Employee } from "@/lib/data"

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isActionModalOpen, setIsActionModalOpen] = useState(false)
  const [currentAction, setCurrentAction] = useState<{ title: string; description: string } | null>(null)

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
    // In a real app, this would trigger the actual action
    console.log("Action confirmed:", currentAction)
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

  const renderContent = () => {
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
      default:
        return <OverviewPage onEmployeeClick={handleEmployeeClick} onActionClick={handleActionClick} />
    }
  }

  return (
    <>
      <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
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
