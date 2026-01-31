export type TrendDirection = "up" | "down" | "neutral"
export type Confidence = "High" | "Medium" | "Low"
export type WorkloadStatus = "Overloaded" | "High" | "Balanced" | "Light"
export type IssueType = "Blocked + Overloaded" | "Medium risk" | "High firefighting" | "Declining" | "Recognition gap" | "Low recognition" | "None"

export interface Employee {
  id: string
  name: string
  role: string
  whi: number
  whiTrend: TrendDirection
  whiChange?: number
  confidence: Confidence
  wip: number
  meetingHours: number
  blocked: number
  avgBlockedDays?: number
  publicRecognition: number
  privateRecognition: number
  stretch: number
  visibility: number
  firefighting: number
  admin: number
  operational: number
  workloadStatus: WorkloadStatus
  issue: IssueType
  drivers: string[]
}

export interface Action {
  id: string
  title: string
  description: string
  effort: "Low" | "Medium" | "High"
  impact: "Low" | "Medium" | "High"
  icon: string
  category: string
}

export interface FairnessFlag {
  id: string
  title: string
  description: string
}

export const employees: Employee[] = [
  {
    id: "1",
    name: "Riya S.",
    role: "Analyst",
    whi: 41,
    whiTrend: "down",
    confidence: "High",
    wip: 9,
    meetingHours: 12.5,
    blocked: 3,
    avgBlockedDays: 4.2,
    publicRecognition: 0,
    privateRecognition: 1,
    stretch: 10,
    visibility: 10,
    firefighting: 20,
    admin: 5,
    operational: 55,
    workloadStatus: "Overloaded",
    issue: "Blocked + Overloaded",
    drivers: ["Workload", "Blockers", "Recognition"],
  },
  {
    id: "2",
    name: "Diego P.",
    role: "Specialist",
    whi: 52,
    whiTrend: "neutral",
    confidence: "Medium",
    wip: 8,
    meetingHours: 9,
    blocked: 1,
    publicRecognition: 0,
    privateRecognition: 1,
    stretch: 15,
    visibility: 15,
    firefighting: 20,
    admin: 5,
    operational: 60,
    workloadStatus: "High",
    issue: "Medium risk",
    drivers: ["Workload", "Recognition", "Growth"],
  },
  {
    id: "3",
    name: "Emma K.",
    role: "Senior Analyst",
    whi: 78,
    whiTrend: "up",
    confidence: "High",
    wip: 6,
    meetingHours: 6,
    blocked: 0,
    publicRecognition: 2,
    privateRecognition: 1,
    stretch: 25,
    visibility: 25,
    firefighting: 10,
    admin: 5,
    operational: 60,
    workloadStatus: "Balanced",
    issue: "None",
    drivers: ["Growth", "Recognition", "Workload"],
  },
  {
    id: "4",
    name: "Noah T.",
    role: "Analyst",
    whi: 60,
    whiTrend: "down",
    confidence: "Medium",
    wip: 7,
    meetingHours: 8.5,
    blocked: 2,
    publicRecognition: 1,
    privateRecognition: 0,
    stretch: 10,
    visibility: 10,
    firefighting: 20,
    admin: 5,
    operational: 65,
    workloadStatus: "High",
    issue: "Declining",
    drivers: ["Blockers", "Workload", "Growth"],
  },
  {
    id: "5",
    name: "Priya R.",
    role: "Analyst",
    whi: 55,
    whiTrend: "neutral",
    confidence: "High",
    wip: 5,
    meetingHours: 7,
    blocked: 0,
    publicRecognition: 0,
    privateRecognition: 0,
    stretch: 8,
    visibility: 8,
    firefighting: 12,
    admin: 5,
    operational: 75,
    workloadStatus: "Balanced",
    issue: "Recognition gap",
    drivers: ["Recognition", "Growth", "Workload"],
  },
  {
    id: "6",
    name: "Chen L.",
    role: "Team Lead",
    whi: 84,
    whiTrend: "up",
    confidence: "High",
    wip: 6,
    meetingHours: 10,
    blocked: 0,
    publicRecognition: 3,
    privateRecognition: 1,
    stretch: 40,
    visibility: 40,
    firefighting: 10,
    admin: 5,
    operational: 45,
    workloadStatus: "Balanced",
    issue: "None",
    drivers: ["Growth", "Recognition", "Inclusion"],
  },
  {
    id: "7",
    name: "Sam J.",
    role: "Ops",
    whi: 49,
    whiTrend: "down",
    confidence: "Medium",
    wip: 10,
    meetingHours: 5.5,
    blocked: 1,
    publicRecognition: 0,
    privateRecognition: 1,
    stretch: 5,
    visibility: 5,
    firefighting: 45,
    admin: 5,
    operational: 45,
    workloadStatus: "Overloaded",
    issue: "High firefighting",
    drivers: ["Workload", "Growth", "Recognition"],
  },
  {
    id: "8",
    name: "Fatima A.",
    role: "Analyst",
    whi: 66,
    whiTrend: "up",
    confidence: "High",
    wip: 6,
    meetingHours: 7.5,
    blocked: 0,
    publicRecognition: 1,
    privateRecognition: 0,
    stretch: 12,
    visibility: 12,
    firefighting: 13,
    admin: 5,
    operational: 70,
    workloadStatus: "Balanced",
    issue: "None",
    drivers: ["Workload", "Growth", "Recognition"],
  },
  {
    id: "9",
    name: "Mason G.",
    role: "Analyst",
    whi: 58,
    whiTrend: "neutral",
    confidence: "Medium",
    wip: 7,
    meetingHours: 8,
    blocked: 2,
    avgBlockedDays: 5.0,
    publicRecognition: 0,
    privateRecognition: 0,
    stretch: 10,
    visibility: 10,
    firefighting: 15,
    admin: 5,
    operational: 70,
    workloadStatus: "High",
    issue: "Recognition gap",
    drivers: ["Blockers", "Recognition", "Growth"],
  },
  {
    id: "10",
    name: "Olivia B.",
    role: "Junior",
    whi: 63,
    whiTrend: "up",
    confidence: "High",
    wip: 4,
    meetingHours: 6.5,
    blocked: 0,
    publicRecognition: 1,
    privateRecognition: 0,
    stretch: 20,
    visibility: 20,
    firefighting: 10,
    admin: 5,
    operational: 65,
    workloadStatus: "Light",
    issue: "None",
    drivers: ["Growth", "Workload", "Recognition"],
  },
]

export const actions: Action[] = [
  {
    id: "1",
    title: "Reduce overload for Riya",
    description: "Reassign 2 tasks to balance",
    effort: "Low",
    impact: "High",
    icon: "alert",
    category: "workload",
  },
  {
    id: "2",
    title: "Public recognition for Priya",
    description: "Draft team shoutout",
    effort: "Low",
    impact: "Medium",
    icon: "star",
    category: "recognition",
  },
  {
    id: "3",
    title: "Rotate next stretch project",
    description: "Assign to Olivia or Fatima",
    effort: "Medium",
    impact: "High",
    icon: "rotate",
    category: "growth",
  },
  {
    id: "4",
    title: "Unblock Mason dependency",
    description: "Schedule unblock meeting",
    effort: "Low",
    impact: "Medium",
    icon: "unblock",
    category: "blockers",
  },
  {
    id: "5",
    title: "Schedule 1:1 with Sam",
    description: "Repair support gap",
    effort: "Low",
    impact: "High",
    icon: "calendar",
    category: "support",
  },
]

export const fairnessFlags: FairnessFlag[] = [
  {
    id: "1",
    title: "Stretch work concentrated",
    description: "Top 2 employees get 65% of visible projects",
  },
  {
    id: "2",
    title: "Recognition skew",
    description: "3 employees have zero public recognition",
  },
  {
    id: "3",
    title: "Uneven 1:1 support",
    description: "Support time varies 3x across team",
  },
]

export const teamStats = {
  whiAverage: 67,
  whiTrend: "up" as TrendDirection,
  whiChange: 4,
  highRiskCount: 2,
  blockedWorkItems: 11,
  managerFairnessScore: 74,
  mfsTrend: "down" as TrendDirection,
  mfsChange: 3,
  mfsConfidence: "Medium" as Confidence,
  wipAverage: 6.8,
  meetingHoursAverage: 8.1,
  blockedAverage: 0.9,
}

export const topAttentionEmployees = employees
  .filter((e) => e.issue !== "None")
  .sort((a, b) => a.whi - b.whi)
  .slice(0, 5)
