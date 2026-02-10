"use client"

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
  sentiment?: number
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

// ===== AI Coach / Nudge Types =====
export interface Nudge {
  id: string
  message: string
  actionLabel: string
  actionTarget: string
  category: "checkin" | "workload" | "recognition" | "survey" | "goal"
}

export interface Insight {
  id: string
  priority: "High" | "Medium" | "Low"
  category: "Workload" | "Recognition" | "Engagement" | "Retention Risk" | "Growth"
  title: string
  description: string
  whyItMatters: string
  suggestedAction: string
  suggestedActionLabel: string
  status: "active" | "acted" | "dismissed" | "snoozed"
  date: string
}

// ===== Notification Types =====
export interface Notification {
  id: string
  type: "alert" | "reminder" | "positive" | "action"
  title: string
  description: string
  time: string
  group: "today" | "this-week" | "earlier"
  read: boolean
  target?: string
}

// ===== 1:1 Meeting Types =====
export interface MeetingNote {
  id: string
  date: string
  summary: string
  actionItems: { text: string; completed: boolean }[]
}

export interface OneOnOne {
  id: string
  employeeId: string
  employeeName: string
  employeeRole: string
  nextDate: string
  nextTime: string
  lastDate: string
  status: "prepped" | "needs-prep" | "overdue"
  talkingPoints: string[]
  notes: MeetingNote[]
}

// ===== Pulse Survey Types =====
export interface SurveyQuestion {
  id: string
  text: string
  type: "scale" | "text" | "multiple-choice" | "emoji"
  options?: string[]
}

export interface Survey {
  id: string
  title: string
  status: "active" | "completed" | "draft"
  questions: SurveyQuestion[]
  responses: number
  total: number
  createdDate: string
  endDate: string
  frequency: "one-time" | "weekly" | "bi-weekly"
  anonymous: boolean
  results?: { questionId: string; distribution: number[] }[]
}

// ===== Goals / OKR Types =====
export interface KeyResult {
  id: string
  title: string
  progress: number
  target: string
  status: "On Track" | "At Risk" | "Behind"
}

export interface Objective {
  id: string
  title: string
  owner: string
  keyResults: KeyResult[]
  level: "team" | "individual"
  employeeId?: string
  dueDate: string
}

// ===== Timeline Types =====
export interface TimelineEvent {
  id: string
  type: "recognition" | "one-on-one" | "action" | "alert" | "survey"
  description: string
  timestamp: string
  details?: string
}

// ===== Report Types =====
export interface ReportTemplate {
  id: string
  title: string
  description: string
  lastGenerated: string
  sections: string[]
}

// ===== Recognition / Feedback Types =====
export interface FeedbackEntry {
  id: string
  senderId: string
  senderName: string
  recipientId: string
  recipientName: string
  type: "Praise" | "Constructive" | "Request"
  visibility: "Public" | "Private"
  content: string
  tags: string[]
  date: string
  likes: number
}

// ===== EMPLOYEE DATA =====
export const employees: Employee[] = [
  {
    id: "1", name: "Riya S.", role: "Analyst", whi: 41, whiTrend: "down", confidence: "High",
    wip: 9, meetingHours: 12.5, blocked: 3, avgBlockedDays: 4.2, publicRecognition: 0,
    privateRecognition: 1, stretch: 10, visibility: 10, firefighting: 20, admin: 5, operational: 55,
    workloadStatus: "Overloaded", issue: "Blocked + Overloaded", drivers: ["Workload", "Blockers", "Recognition"],
    sentiment: 35,
  },
  {
    id: "2", name: "Diego P.", role: "Specialist", whi: 52, whiTrend: "neutral", confidence: "Medium",
    wip: 8, meetingHours: 9, blocked: 1, publicRecognition: 0, privateRecognition: 1, stretch: 15,
    visibility: 15, firefighting: 20, admin: 5, operational: 60, workloadStatus: "High",
    issue: "Medium risk", drivers: ["Workload", "Recognition", "Growth"], sentiment: 50,
  },
  {
    id: "3", name: "Emma K.", role: "Senior Analyst", whi: 78, whiTrend: "up", confidence: "High",
    wip: 6, meetingHours: 6, blocked: 0, publicRecognition: 2, privateRecognition: 1, stretch: 25,
    visibility: 25, firefighting: 10, admin: 5, operational: 60, workloadStatus: "Balanced",
    issue: "None", drivers: ["Growth", "Recognition", "Workload"], sentiment: 80,
  },
  {
    id: "4", name: "Noah T.", role: "Analyst", whi: 60, whiTrend: "down", confidence: "Medium",
    wip: 7, meetingHours: 8.5, blocked: 2, publicRecognition: 1, privateRecognition: 0, stretch: 10,
    visibility: 10, firefighting: 20, admin: 5, operational: 65, workloadStatus: "High",
    issue: "Declining", drivers: ["Blockers", "Workload", "Growth"], sentiment: 55,
  },
  {
    id: "5", name: "Priya R.", role: "Analyst", whi: 55, whiTrend: "neutral", confidence: "High",
    wip: 5, meetingHours: 7, blocked: 0, publicRecognition: 0, privateRecognition: 0, stretch: 8,
    visibility: 8, firefighting: 12, admin: 5, operational: 75, workloadStatus: "Balanced",
    issue: "Recognition gap", drivers: ["Recognition", "Growth", "Workload"], sentiment: 52,
  },
  {
    id: "6", name: "Chen L.", role: "Team Lead", whi: 84, whiTrend: "up", confidence: "High",
    wip: 6, meetingHours: 10, blocked: 0, publicRecognition: 3, privateRecognition: 1, stretch: 40,
    visibility: 40, firefighting: 10, admin: 5, operational: 45, workloadStatus: "Balanced",
    issue: "None", drivers: ["Growth", "Recognition", "Inclusion"], sentiment: 85,
  },
  {
    id: "7", name: "Sam J.", role: "Ops", whi: 49, whiTrend: "down", confidence: "Medium",
    wip: 10, meetingHours: 5.5, blocked: 1, publicRecognition: 0, privateRecognition: 1, stretch: 5,
    visibility: 5, firefighting: 45, admin: 5, operational: 45, workloadStatus: "Overloaded",
    issue: "High firefighting", drivers: ["Workload", "Growth", "Recognition"], sentiment: 40,
  },
  {
    id: "8", name: "Fatima A.", role: "Analyst", whi: 66, whiTrend: "up", confidence: "High",
    wip: 6, meetingHours: 7.5, blocked: 0, publicRecognition: 1, privateRecognition: 0, stretch: 12,
    visibility: 12, firefighting: 13, admin: 5, operational: 70, workloadStatus: "Balanced",
    issue: "None", drivers: ["Workload", "Growth", "Recognition"], sentiment: 68,
  },
  {
    id: "9", name: "Mason G.", role: "Analyst", whi: 58, whiTrend: "neutral", confidence: "Medium",
    wip: 7, meetingHours: 8, blocked: 2, avgBlockedDays: 5.0, publicRecognition: 0, privateRecognition: 0,
    stretch: 10, visibility: 10, firefighting: 15, admin: 5, operational: 70, workloadStatus: "High",
    issue: "Recognition gap", drivers: ["Blockers", "Recognition", "Growth"], sentiment: 53,
  },
  {
    id: "10", name: "Olivia B.", role: "Junior", whi: 63, whiTrend: "up", confidence: "High",
    wip: 4, meetingHours: 6.5, blocked: 0, publicRecognition: 1, privateRecognition: 0, stretch: 20,
    visibility: 20, firefighting: 10, admin: 5, operational: 65, workloadStatus: "Light",
    issue: "None", drivers: ["Growth", "Workload", "Recognition"], sentiment: 70,
  },
]

export const actions: Action[] = [
  { id: "1", title: "Reduce overload for Riya", description: "Reassign 2 tasks to balance", effort: "Low", impact: "High", icon: "alert", category: "workload" },
  { id: "2", title: "Public recognition for Priya", description: "Draft team shoutout", effort: "Low", impact: "Medium", icon: "star", category: "recognition" },
  { id: "3", title: "Rotate next stretch project", description: "Assign to Olivia or Fatima", effort: "Medium", impact: "High", icon: "rotate", category: "growth" },
  { id: "4", title: "Unblock Mason dependency", description: "Schedule unblock meeting", effort: "Low", impact: "Medium", icon: "unblock", category: "blockers" },
  { id: "5", title: "Schedule 1:1 with Sam", description: "Repair support gap", effort: "Low", impact: "High", icon: "calendar", category: "support" },
]

export const fairnessFlags: FairnessFlag[] = [
  { id: "1", title: "Stretch work concentrated", description: "Top 2 employees get 65% of visible projects" },
  { id: "2", title: "Recognition skew", description: "3 employees have zero public recognition" },
  { id: "3", title: "Uneven 1:1 support", description: "Support time varies 3x across team" },
]

export const teamStats = {
  whiAverage: 67, whiTrend: "up" as TrendDirection, whiChange: 4,
  highRiskCount: 2, blockedWorkItems: 11, managerFairnessScore: 74,
  mfsTrend: "down" as TrendDirection, mfsChange: 3, mfsConfidence: "Medium" as Confidence,
  wipAverage: 6.8, meetingHoursAverage: 8.1, blockedAverage: 0.9,
}

export const orgAverages = {
  whiAverage: 62, highRiskCount: 3, blockedWorkItems: 8, managerFairnessScore: 69,
  engagement: 64, workloadBalance: 58, recognitionFreq: 55, oneOnOneCadence: 71, goalCompletion: 60,
}

export const topAttentionEmployees = employees
  .filter((e) => e.issue !== "None")
  .sort((a, b) => a.whi - b.whi)
  .slice(0, 5)

// ===== AI COACH NUDGES =====
export const nudges: Nudge[] = [
  { id: "1", message: "You haven't checked in with Mason in 18 days -- schedule a 1:1?", actionLabel: "Schedule", actionTarget: "meetings", category: "checkin" },
  { id: "2", message: "3 team members show elevated workload -- review distribution?", actionLabel: "Review", actionTarget: "work-distribution", category: "workload" },
  { id: "3", message: "Priya shipped 2 major features with no recognition -- send kudos?", actionLabel: "Recognize", actionTarget: "recognition-growth", category: "recognition" },
]

export const insights: Insight[] = [
  { id: "1", priority: "High", category: "Retention Risk", title: "Riya S. burnout risk escalating", description: "Riya's WHI dropped to 41 with 3 blocked items and 12.5h meetings weekly. Her workload has been elevated for 3 consecutive weeks.", whyItMatters: "Employees with WHI below 45 for more than 2 weeks are 3x more likely to disengage or leave within 90 days. Riya is a tenured analyst with deep domain knowledge.", suggestedAction: "Reassign 2 tasks and schedule a supportive 1:1 this week", suggestedActionLabel: "Take Action", status: "active", date: "2026-02-10" },
  { id: "2", priority: "High", category: "Workload", title: "Sam J. stuck in firefighting mode", description: "Sam spends 45% of time on firefighting tasks with only 5% on strategic work. WIP count at 10 is the highest on the team.", whyItMatters: "High firefighting ratios correlate with declining job satisfaction and reduced output quality. Sam hasn't had strategic work in 4 weeks.", suggestedAction: "Redistribute urgent tasks and assign one strategic project", suggestedActionLabel: "Redistribute", status: "active", date: "2026-02-10" },
  { id: "3", priority: "Medium", category: "Recognition", title: "Recognition gap widening for 4 team members", description: "Riya, Diego, Priya, and Mason have received zero public recognition in the last 30 days despite shipping work.", whyItMatters: "Teams with uneven recognition see 23% lower engagement scores. Unrecognized contributors are more likely to reduce discretionary effort.", suggestedAction: "Draft shoutouts for each team member this week", suggestedActionLabel: "Send Kudos", status: "active", date: "2026-02-09" },
  { id: "4", priority: "Medium", category: "Engagement", title: "Noah T. sentiment trending down", description: "Noah's WHI dropped from 68 to 60 over 3 weeks. He has 2 blocked items and his trend is consistently downward.", whyItMatters: "Declining trends that persist for 3+ weeks often indicate deeper issues like unclear goals, lack of support, or interpersonal friction.", suggestedAction: "Schedule a check-in 1:1 focused on support needs", suggestedActionLabel: "Schedule 1:1", status: "active", date: "2026-02-08" },
  { id: "5", priority: "Low", category: "Growth", title: "Olivia B. ready for stretch assignment", description: "Olivia's WHI is stable at 63 with light workload (WIP: 4). She has capacity and her growth signals indicate readiness.", whyItMatters: "Junior team members who receive stretch assignments within their first 6 months show 40% faster skill development.", suggestedAction: "Assign the next cross-functional project to Olivia", suggestedActionLabel: "Assign Project", status: "active", date: "2026-02-07" },
  { id: "6", priority: "Low", category: "Growth", title: "Stretch work too concentrated", description: "Chen and Emma hold 65% of all visible/strategic projects. 4 team members have less than 12% stretch work.", whyItMatters: "Concentrated stretch work leads to single points of failure and limits growth opportunities for the broader team.", suggestedAction: "Rotate next 2 stretch projects to under-represented members", suggestedActionLabel: "Rotate", status: "acted", date: "2026-02-05" },
  { id: "7", priority: "Medium", category: "Workload", title: "Team meeting hours above benchmark", description: "Team averages 8.1h meetings/week vs. org average of 6.5h. Riya and Chen exceed 10h weekly.", whyItMatters: "Excessive meetings reduce focus time and correlate with higher stress scores. The recommended cap is 8h/week.", suggestedAction: "Audit recurring meetings and cancel low-value ones", suggestedActionLabel: "Audit Meetings", status: "dismissed", date: "2026-02-03" },
]

// ===== NOTIFICATIONS =====
export const notifications: Notification[] = [
  { id: "1", type: "alert", title: "Riya's burnout risk moved to High", description: "WHI dropped to 41 with 3 blocked items", time: "2h ago", group: "today", read: false, target: "team-health" },
  { id: "2", type: "reminder", title: "1:1 with Mason is overdue by 5 days", description: "Last meeting was Feb 3. Schedule one soon.", time: "4h ago", group: "today", read: false, target: "meetings" },
  { id: "3", type: "positive", title: "Team sentiment is up 12% this week", description: "5 of 10 members show improved WHI scores", time: "6h ago", group: "today", read: false, target: "overview" },
  { id: "4", type: "action", title: "New pulse survey results ready", description: "Weekly check-in: 7/10 responded (70%)", time: "1d ago", group: "this-week", read: true, target: "surveys" },
  { id: "5", type: "reminder", title: "Quarterly goals due in 2 weeks", description: "5 of 12 goals still need updates", time: "2d ago", group: "this-week", read: true, target: "goals" },
  { id: "6", type: "positive", title: "Priya completed auth module ahead of schedule", description: "Consider recognizing this achievement", time: "3d ago", group: "this-week", read: true, target: "recognition-growth" },
  { id: "7", type: "alert", title: "Sam's firefighting ratio exceeded 40%", description: "Consider redistributing urgent tasks", time: "5d ago", group: "earlier", read: true, target: "work-distribution" },
  { id: "8", type: "action", title: "3 action items from last 1:1 still pending", description: "Review before next meeting with Diego", time: "1w ago", group: "earlier", read: true, target: "meetings" },
]

// ===== 1:1 MEETINGS =====
export const oneOnOnes: OneOnOne[] = [
  { id: "1", employeeId: "1", employeeName: "Riya S.", employeeRole: "Analyst", nextDate: "2026-02-12", nextTime: "10:00 AM", lastDate: "2026-01-29", status: "needs-prep",
    talkingPoints: ["Workload has been elevated for 3 consecutive weeks", "3 blocked items -- need to identify resolution paths", "No public recognition received in 30 days", "Sentiment trending downward"],
    notes: [{ id: "n1", date: "2026-01-29", summary: "Discussed workload concerns. Riya expressed frustration with blocked dependencies.", actionItems: [{ text: "Escalate blocked API dependency to platform team", completed: true }, { text: "Reassign 2 low-priority tasks to Diego", completed: false }, { text: "Draft recognition for Q4 analytics work", completed: false }] }] },
  { id: "2", employeeId: "2", employeeName: "Diego P.", employeeRole: "Specialist", nextDate: "2026-02-13", nextTime: "2:00 PM", lastDate: "2026-02-01", status: "needs-prep",
    talkingPoints: ["Medium risk flag -- WHI at 52", "Workload is high with 8 WIP items", "No public recognition in 30 days"],
    notes: [{ id: "n2", date: "2026-02-01", summary: "Diego wants more visibility into strategic projects. Discussed potential for cross-team collaboration.", actionItems: [{ text: "Connect Diego with Platform team lead", completed: true }, { text: "Share upcoming project pipeline", completed: false }] }] },
  { id: "3", employeeId: "3", employeeName: "Emma K.", employeeRole: "Senior Analyst", nextDate: "2026-02-14", nextTime: "11:00 AM", lastDate: "2026-02-05", status: "prepped",
    talkingPoints: ["Strong performance -- WHI at 78 and trending up", "Discuss growth goals and potential tech lead path", "Review mentoring of Olivia"],
    notes: [{ id: "n3", date: "2026-02-05", summary: "Great progress on analytics dashboard. Emma interested in tech lead responsibilities.", actionItems: [{ text: "Share tech lead competency framework", completed: true }, { text: "Assign Emma as mentor for Olivia", completed: true }] }] },
  { id: "4", employeeId: "4", employeeName: "Noah T.", employeeRole: "Analyst", nextDate: "2026-02-11", nextTime: "3:00 PM", lastDate: "2026-01-28", status: "overdue",
    talkingPoints: ["WHI declining from 68 to 60 over 3 weeks", "2 blocked items need resolution", "Sentiment trending down -- check in on support needs"],
    notes: [{ id: "n4", date: "2026-01-28", summary: "Noah mentioned feeling stuck on the data migration project. Needs clearer priorities.", actionItems: [{ text: "Clarify Q1 priority ranking", completed: false }, { text: "Pair Noah with Chen on migration", completed: true }] }] },
  { id: "5", employeeId: "5", employeeName: "Priya R.", employeeRole: "Analyst", nextDate: "2026-02-15", nextTime: "10:30 AM", lastDate: "2026-02-03", status: "prepped",
    talkingPoints: ["Shipped auth module ahead of schedule -- recognize!", "WHI at 55, stable but no recognition received", "Discuss growth opportunities"],
    notes: [{ id: "n5", date: "2026-02-03", summary: "Priya wants more challenging work. Auth module was a good stretch. Discuss recognition.", actionItems: [{ text: "Draft public recognition for auth module", completed: false }, { text: "Identify next stretch project", completed: false }] }] },
  { id: "6", employeeId: "7", employeeName: "Sam J.", employeeRole: "Ops", nextDate: "2026-02-11", nextTime: "4:00 PM", lastDate: "2026-01-25", status: "overdue",
    talkingPoints: ["WHI at 49 -- high risk", "45% firefighting ratio is unsustainable", "WIP at 10 is highest on team", "Need to redistribute urgent tasks"],
    notes: [{ id: "n6", date: "2026-01-25", summary: "Sam feels overwhelmed with on-call responsibilities. Wants to transition to more strategic work.", actionItems: [{ text: "Create on-call rotation to share load", completed: false }, { text: "Assign 1 strategic project to Sam", completed: false }] }] },
  { id: "7", employeeId: "6", employeeName: "Chen L.", employeeRole: "Team Lead", nextDate: "2026-02-16", nextTime: "9:00 AM", lastDate: "2026-02-07", status: "prepped",
    talkingPoints: ["Strong WHI at 84 -- top performer", "Discuss team-wide stretch work distribution", "Review fairness score trends"],
    notes: [{ id: "n7", date: "2026-02-07", summary: "Discussed upcoming quarter goals. Chen wants to mentor more junior members.", actionItems: [{ text: "Formalize mentorship program proposal", completed: false }] }] },
  { id: "8", employeeId: "8", employeeName: "Fatima A.", employeeRole: "Analyst", nextDate: "2026-02-17", nextTime: "1:00 PM", lastDate: "2026-02-04", status: "prepped",
    talkingPoints: ["WHI improving at 66", "Workload balanced", "Explore interest in cross-team projects"],
    notes: [{ id: "n8", date: "2026-02-04", summary: "Fatima expressed interest in data visualization projects. Good candidate for next stretch assignment.", actionItems: [{ text: "Share data viz project brief", completed: true }] }] },
  { id: "9", employeeId: "9", employeeName: "Mason G.", employeeRole: "Analyst", nextDate: "2026-02-12", nextTime: "2:30 PM", lastDate: "2026-01-23", status: "overdue",
    talkingPoints: ["No recognition in 30 days", "2 blocked items with avg 5 days blocked", "WHI flat at 58 -- needs attention"],
    notes: [{ id: "n9", date: "2026-01-23", summary: "Mason frustrated with dependency blockers. Needs better cross-team communication.", actionItems: [{ text: "Set up weekly sync with dependent team", completed: false }, { text: "Draft recognition for pipeline work", completed: false }] }] },
  { id: "10", employeeId: "10", employeeName: "Olivia B.", employeeRole: "Junior", nextDate: "2026-02-18", nextTime: "11:30 AM", lastDate: "2026-02-06", status: "prepped",
    talkingPoints: ["WHI at 63 and improving", "Light workload -- capacity for more", "Mentorship with Emma going well"],
    notes: [{ id: "n10", date: "2026-02-06", summary: "Olivia is ramping up quickly. Excited about the mentorship with Emma.", actionItems: [{ text: "Increase Olivia's task allocation by 1-2 items", completed: true }] }] },
]

// ===== PULSE SURVEYS =====
export const surveys: Survey[] = [
  {
    id: "1", title: "Weekly Team Check-in", status: "active",
    questions: [
      { id: "q1", text: "How supported do you feel this week?", type: "scale" },
      { id: "q2", text: "Rate your workload 1-5", type: "scale" },
      { id: "q3", text: "Is anything blocking your progress?", type: "text" },
      { id: "q4", text: "How would you describe your energy level?", type: "emoji", options: ["Very Low", "Low", "Okay", "Good", "Great"] },
    ],
    responses: 7, total: 10, createdDate: "2026-02-08", endDate: "2026-02-14", frequency: "weekly", anonymous: true,
    results: [
      { questionId: "q1", distribution: [0, 1, 2, 3, 1] },
      { questionId: "q2", distribution: [0, 2, 3, 1, 1] },
      { questionId: "q4", distribution: [1, 1, 2, 2, 1] },
    ],
  },
  {
    id: "2", title: "Sprint Retrospective Pulse", status: "completed",
    questions: [
      { id: "q5", text: "How well did the team collaborate this sprint?", type: "scale" },
      { id: "q6", text: "What could we improve next sprint?", type: "text" },
      { id: "q7", text: "Do you feel your workload was manageable?", type: "scale" },
    ],
    responses: 9, total: 10, createdDate: "2026-01-25", endDate: "2026-02-01", frequency: "bi-weekly", anonymous: true,
    results: [
      { questionId: "q5", distribution: [0, 1, 2, 4, 2] },
      { questionId: "q7", distribution: [1, 2, 3, 2, 1] },
    ],
  },
  {
    id: "3", title: "Q1 Manager Feedback", status: "completed",
    questions: [
      { id: "q8", text: "How well does your manager support your growth?", type: "scale" },
      { id: "q9", text: "Do you receive enough recognition?", type: "scale" },
      { id: "q10", text: "Any additional feedback?", type: "text" },
    ],
    responses: 8, total: 10, createdDate: "2026-01-10", endDate: "2026-01-17", frequency: "one-time", anonymous: true,
    results: [
      { questionId: "q8", distribution: [0, 1, 3, 3, 1] },
      { questionId: "q9", distribution: [1, 2, 2, 2, 1] },
    ],
  },
]

// ===== GOALS / OKRs =====
export const objectives: Objective[] = [
  {
    id: "o1", title: "Improve team delivery velocity by 20%", owner: "Alex M.", level: "team", dueDate: "2026-03-31",
    keyResults: [
      { id: "kr1", title: "Reduce average blocked days from 4.2 to 2.0", progress: 45, target: "2.0 days", status: "At Risk" },
      { id: "kr2", title: "Decrease WIP per person from 6.8 to 5.0", progress: 35, target: "5.0 avg", status: "Behind" },
      { id: "kr3", title: "Ship 15 features this quarter", progress: 60, target: "15 features", status: "On Track" },
    ],
  },
  {
    id: "o2", title: "Raise team WHI to 72+", owner: "Alex M.", level: "team", dueDate: "2026-03-31",
    keyResults: [
      { id: "kr4", title: "Zero employees below WHI 50", progress: 60, target: "0 employees", status: "At Risk" },
      { id: "kr5", title: "100% of team receives recognition monthly", progress: 40, target: "100%", status: "Behind" },
      { id: "kr6", title: "All 1:1s conducted within 14-day cadence", progress: 70, target: "100%", status: "On Track" },
      { id: "kr7", title: "Pulse survey participation above 80%", progress: 88, target: "80%", status: "On Track" },
    ],
  },
  {
    id: "o3", title: "Build analytics dashboard v2", owner: "Emma K.", level: "individual", employeeId: "3", dueDate: "2026-03-15",
    keyResults: [
      { id: "kr8", title: "Complete data pipeline refactor", progress: 80, target: "Done", status: "On Track" },
      { id: "kr9", title: "Launch 3 new chart types", progress: 67, target: "3 charts", status: "On Track" },
    ],
  },
  {
    id: "o4", title: "Reduce on-call burden for ops team", owner: "Sam J.", level: "individual", employeeId: "7", dueDate: "2026-03-31",
    keyResults: [
      { id: "kr10", title: "Create shared on-call rotation", progress: 20, target: "Done", status: "Behind" },
      { id: "kr11", title: "Automate 5 recurring incident responses", progress: 40, target: "5 automations", status: "At Risk" },
    ],
  },
  {
    id: "o5", title: "Complete data analyst certification", owner: "Olivia B.", level: "individual", employeeId: "10", dueDate: "2026-04-30",
    keyResults: [
      { id: "kr12", title: "Finish 8 of 10 course modules", progress: 75, target: "8 modules", status: "On Track" },
      { id: "kr13", title: "Pass practice exam with 85%+", progress: 60, target: "85% score", status: "On Track" },
    ],
  },
]

// ===== TIMELINE =====
export const timelineEvents: TimelineEvent[] = [
  { id: "t1", type: "recognition", description: "You recognized Emma K. for shipping the analytics dashboard", timestamp: "2026-02-10T09:30:00", details: "Public kudos shared in team channel" },
  { id: "t2", type: "one-on-one", description: "1:1 with Chen L. -- 1 action item logged", timestamp: "2026-02-07T14:00:00", details: "Discussed mentorship program proposal" },
  { id: "t3", type: "action", description: "Redistributed 2 tasks from Riya's backlog to Diego", timestamp: "2026-02-06T11:15:00", details: "Moved data validation and report generation tasks" },
  { id: "t4", type: "alert", description: "Sam J.'s firefighting ratio exceeded 40% threshold", timestamp: "2026-02-05T08:00:00", details: "Triggered automatic workload review recommendation" },
  { id: "t5", type: "survey", description: "Sprint retrospective pulse completed -- 90% response rate", timestamp: "2026-02-01T17:00:00", details: "Key insight: collaboration rated 3.8/5, workload rated 3.2/5" },
  { id: "t6", type: "one-on-one", description: "1:1 with Olivia B. -- 1 action item logged", timestamp: "2026-02-06T11:30:00", details: "Increased task allocation discussed" },
  { id: "t7", type: "recognition", description: "Chen L. recognized by VP for Q4 leadership", timestamp: "2026-01-30T10:00:00", details: "Cross-team recognition from leadership" },
  { id: "t8", type: "action", description: "Escalated Riya's blocked API dependency to platform team", timestamp: "2026-01-29T16:30:00", details: "Blocked for 4.2 days on average" },
  { id: "t9", type: "alert", description: "Riya S.'s WHI dropped below 45 -- burnout risk flagged", timestamp: "2026-01-28T09:00:00", details: "WHI at 41, down from 52 two weeks ago" },
  { id: "t10", type: "survey", description: "Q1 Manager Feedback survey completed -- 80% response rate", timestamp: "2026-01-17T17:00:00", details: "Manager support rated 3.5/5, recognition rated 3.0/5" },
  { id: "t11", type: "one-on-one", description: "1:1 with Priya R. -- 2 action items logged", timestamp: "2026-02-03T10:30:00", details: "Discussed recognition gap and stretch assignments" },
  { id: "t12", type: "action", description: "Created shared on-call rotation proposal for ops team", timestamp: "2026-01-26T14:00:00", details: "Aimed at reducing Sam's firefighting ratio" },
]

// ===== REPORTS =====
export const reportTemplates: ReportTemplate[] = [
  { id: "r1", title: "Weekly Team Health Summary", description: "KPIs, trends, at-risk members, and actions taken this week", lastGenerated: "2026-02-07", sections: ["KPI Summary", "At-Risk Members", "Actions Taken", "Upcoming 1:1s"] },
  { id: "r2", title: "Monthly Manager Review", description: "Full overview with charts, 1:1 cadence, survey results, and goal progress", lastGenerated: "2026-01-31", sections: ["Team Overview", "WHI Trends", "1:1 Cadence", "Survey Results", "Goal Progress", "Recognition Stats"] },
  { id: "r3", title: "Quarterly Business Review Snapshot", description: "High-level metrics formatted for leadership presentation", lastGenerated: "2025-12-31", sections: ["Executive Summary", "Team Health Score", "Delivery Metrics", "Retention Risk", "Key Wins"] },
]

// ===== FEEDBACK / RECOGNITION WALL =====
export const feedbackEntries: FeedbackEntry[] = [
  { id: "f1", senderId: "manager", senderName: "Alex M.", recipientId: "3", recipientName: "Emma K.", type: "Praise", visibility: "Public", content: "Outstanding work on the analytics dashboard. Your attention to detail and proactive communication made a huge difference.", tags: ["Technical", "Initiative"], date: "2026-02-10", likes: 5 },
  { id: "f2", senderId: "6", senderName: "Chen L.", recipientId: "10", recipientName: "Olivia B.", type: "Praise", visibility: "Public", content: "Olivia has been a fantastic mentee. She took ownership of the data pipeline task and delivered ahead of schedule.", tags: ["Initiative", "Collaboration"], date: "2026-02-08", likes: 3 },
  { id: "f3", senderId: "manager", senderName: "Alex M.", recipientId: "6", recipientName: "Chen L.", type: "Praise", visibility: "Public", content: "Chen's leadership during the sprint was exceptional. He proactively helped unblock two team members.", tags: ["Leadership", "Collaboration"], date: "2026-02-05", likes: 7 },
  { id: "f4", senderId: "manager", senderName: "Alex M.", recipientId: "4", recipientName: "Noah T.", type: "Constructive", visibility: "Private", content: "Noah, I've noticed your output has slowed. Let's talk about what support you need to get back on track.", tags: ["Communication"], date: "2026-02-04", likes: 0 },
  { id: "f5", senderId: "3", senderName: "Emma K.", recipientId: "8", recipientName: "Fatima A.", type: "Praise", visibility: "Public", content: "Fatima's data analysis on the Q4 report was thorough and insightful. Great collaboration!", tags: ["Technical", "Collaboration"], date: "2026-02-02", likes: 4 },
  { id: "f6", senderId: "manager", senderName: "Alex M.", recipientId: "1", recipientName: "Riya S.", type: "Request", visibility: "Private", content: "Riya, please flag blockers earlier so we can address them before they pile up. Happy to help prioritize.", tags: ["Communication"], date: "2026-01-30", likes: 0 },
]

// ===== MULTI-TEAM DATA =====
export const teams = [
  { id: "t1", name: "AR Ops Team", size: 10, whi: 67, engagement: 72, workloadBalance: 65, recognitionFreq: 60, cadence: 78, goalCompletion: 67 },
  { id: "t2", name: "Frontend Squad", size: 8, whi: 72, engagement: 75, workloadBalance: 70, recognitionFreq: 68, cadence: 82, goalCompletion: 74 },
  { id: "t3", name: "Platform Team", size: 12, whi: 59, engagement: 61, workloadBalance: 52, recognitionFreq: 45, cadence: 65, goalCompletion: 58 },
  { id: "t4", name: "Design Pod", size: 5, whi: 76, engagement: 80, workloadBalance: 78, recognitionFreq: 72, cadence: 90, goalCompletion: 80 },
]
