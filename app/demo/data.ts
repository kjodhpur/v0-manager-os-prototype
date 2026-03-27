// HeartMetrics Demo Dashboard Data
// Adapts the SugarCRM Customer Journey visual system to HeartMetrics

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  whi: number;
  status: "at-risk" | "monitor" | "stable";
  badgeCount?: number;
  badgeColor?: "rose" | "blue" | "amber" | "green";
  gradientFrom: string;
  gradientTo: string;
}

export interface TaskRow {
  id: string;
  memberId?: string;
  memberInitials?: string;
  memberName?: string;
  label: string;
  isBold?: boolean;
  isUnassigned?: boolean;
  status: "incomplete" | "complete" | "pending";
  hasMenu?: boolean;
}

export interface BoardColumn {
  id: string;
  title: string;
  label: string;
  isDark?: boolean;
  tasks: TaskRow[];
}

export interface ActionQueueItem {
  id: string;
  starred: boolean;
  employee: string;
  status: string;
  statusColor: "rose" | "amber" | "blue" | "green";
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  assignedType: "ai" | "manual";
}

// Team members for avatar strip
export const teamMembers: TeamMember[] = [
  { id: "1", name: "Riya S.", initials: "RS", role: "Analyst", whi: 41, status: "at-risk", badgeCount: 2, badgeColor: "rose", gradientFrom: "#f472b6", gradientTo: "#c084fc" },
  { id: "2", name: "Sam J.", initials: "SJ", role: "Ops", whi: 49, status: "at-risk", badgeCount: 2, badgeColor: "rose", gradientFrom: "#60a5fa", gradientTo: "#34d399" },
  { id: "3", name: "Diego P.", initials: "DP", role: "Specialist", whi: 52, status: "monitor", badgeCount: 3, badgeColor: "amber", gradientFrom: "#fbbf24", gradientTo: "#f97316" },
  { id: "4", name: "Mason G.", initials: "MG", role: "Analyst", whi: 58, status: "monitor", badgeCount: 2, badgeColor: "amber", gradientFrom: "#a78bfa", gradientTo: "#ec4899" },
  { id: "5", name: "Priya R.", initials: "PR", role: "Analyst", whi: 55, status: "monitor", badgeCount: 1, badgeColor: "blue", gradientFrom: "#14b8a6", gradientTo: "#06b6d4" },
  { id: "6", name: "Noah T.", initials: "NT", role: "Analyst", whi: 60, status: "stable", badgeColor: "green", gradientFrom: "#4ade80", gradientTo: "#22d3ee" },
  { id: "7", name: "Fatima A.", initials: "FA", role: "Analyst", whi: 66, status: "stable", gradientFrom: "#fb923c", gradientTo: "#facc15" },
  { id: "8", name: "Emma K.", initials: "EK", role: "Senior Analyst", whi: 78, status: "stable", gradientFrom: "#818cf8", gradientTo: "#c084fc" },
];

// Board columns for Team Pulse Board
export const boardColumns: BoardColumn[] = [
  {
    id: "workload",
    title: "Workload",
    label: "Workload",
    tasks: [
      { id: "w1", memberId: "1", memberInitials: "RS", memberName: "Riya S.", label: "Workload 9.2 / 10", status: "incomplete" },
      { id: "w2", memberId: "2", memberInitials: "SJ", memberName: "Sam J.", label: "Meeting load 5.5h/day", status: "incomplete" },
    ],
  },
  {
    id: "recognition",
    title: "Recognition",
    label: "Recognition",
    tasks: [
      { id: "r1", memberId: "3", memberInitials: "DP", memberName: "Diego P.", label: "Recognition gap detected", status: "incomplete" },
      { id: "r2", memberId: "4", memberInitials: "MG", memberName: "Mason G.", label: "Recognition gap detected", status: "incomplete" },
      { id: "r3", memberId: "5", memberInitials: "PR", memberName: "Priya R.", label: "No feedback this sprint", status: "incomplete" },
      { id: "r4", memberId: "1", memberInitials: "RS", memberName: "Riya S.", label: "Overdue recognition — 51 days", isBold: true, status: "pending", hasMenu: true },
      { id: "r5", memberId: "2", memberInitials: "SJ", memberName: "Sam J.", label: "Missed 1:1 — 18 days ago", isBold: true, status: "pending", hasMenu: true },
    ],
  },
  {
    id: "risk-signals",
    title: "Risk Signals",
    label: "Risk Signals",
    tasks: [
      { id: "rs1", label: "Identify burnout signal", isUnassigned: true, status: "incomplete" },
      { id: "rs2", label: "Check blocked items", isUnassigned: true, status: "incomplete" },
      { id: "rs3", memberId: "1", memberInitials: "RS", memberName: "Riya S.", label: "Estimate recovery time", isBold: true, status: "pending", hasMenu: true },
      { id: "rs4", memberId: "2", memberInitials: "SJ", memberName: "Sam J.", label: "Advise on workload redistribution", status: "pending", hasMenu: true },
      { id: "rs5", label: "Resolve dependency blocker", isUnassigned: true, status: "incomplete" },
    ],
  },
  {
    id: "ai-actions",
    title: "AI Coaching",
    label: "AI Actions",
    isDark: true,
    tasks: [],
  },
];

// AI suggested mini-cards
export const aiMiniCards = [
  { id: "ai1", label: "Reassign blocked PR" },
  { id: "ai2", label: "Send recognition to Riya" },
  { id: "ai3", label: "Schedule 1:1 — Sam J." },
  { id: "ai4", label: "Reduce meeting load" },
  { id: "ai5", label: "Acknowledge Diego" },
  { id: "ai6", label: "Review growth plan" },
];

// Action Queue items
export const actionQueueItems: ActionQueueItem[] = [
  { id: "aq1", starred: false, employee: "Riya S.", status: "High Risk", statusColor: "rose", priority: "High", dueDate: "Today", assignedType: "ai" },
  { id: "aq2", starred: false, employee: "Sam J.", status: "Firefighting", statusColor: "amber", priority: "High", dueDate: "Tomorrow", assignedType: "ai" },
  { id: "aq3", starred: false, employee: "Diego P.", status: "Recognition Gap", statusColor: "blue", priority: "Medium", dueDate: "In 2 days", assignedType: "manual" },
  { id: "aq4", starred: false, employee: "Priya R.", status: "Recognition Gap", statusColor: "blue", priority: "Medium", dueDate: "In 3 days", assignedType: "manual" },
  { id: "aq5", starred: false, employee: "Mason G.", status: "Stable", statusColor: "green", priority: "Low", dueDate: "This week", assignedType: "manual" },
];

// Wellbeing stats
export const wellbeingStats = {
  atRisk: 2,
  stable: 7,
  teamWWIAverage: 67,
  delta: 4,
};

// Navigation tabs
export const navTabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "team-flow", label: "Team Flow" },
  { id: "action-queue", label: "Action Queue" },
  { id: "recognition", label: "Recognition" },
  { id: "wellbeing", label: "Wellbeing" },
  { id: "fairness", label: "Fairness" },
  { id: "integrations", label: "Integrations" },
];
