"use client"

import { employees, teamStats, oneOnOnes, surveys } from "@/lib/data"

/**
 * Builds a compact team context string for AI API calls.
 * This runs on the client and gets sent in POST bodies to API routes.
 * When you have a real DB, replace this with server-side data fetching in the routes.
 */
export function buildTeamContext() {
  const memberSummaries = employees.map((e) => ({
    id: e.id,
    name: e.name,
    role: e.role,
    wwi: e.wwi,
    wwiTrend: e.wwiTrend,
    workloadStatus: e.workloadStatus,
    issue: e.issue,
    sentiment: e.sentiment,
    wip: e.wip,
    meetingHours: e.meetingHours,
    blocked: e.blocked,
    publicRecognition: e.publicRecognition,
    privateRecognition: e.privateRecognition,
    stretch: e.stretch,
    firefighting: e.firefighting,
    drivers: e.drivers,
  }))

  const meetingSummaries = oneOnOnes.map((m) => ({
    employeeName: m.employeeName,
    nextDate: m.nextDate,
    lastDate: m.lastDate,
    status: m.status,
  }))

  return {
    teamStats,
    members: memberSummaries,
    meetings: meetingSummaries,
    activeSurveys: surveys.filter((s) => s.status === "active").length,
    currentDate: new Date().toISOString().split("T")[0],
  }
}

export function buildEmployeeContext(employeeId: string) {
  const employee = employees.find((e) => e.id === employeeId)
  const meeting = oneOnOnes.find((m) => m.employeeId === employeeId)
  return { employee, meeting }
}
