export interface WWIComponent {
  name: string;
  shortName: string;
  value: number;
}

export interface Action {
  title: string;
  priority: 'urgent' | 'high' | 'medium';
  dueDate: string;
  component: string; // matches WWIComponent.name
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  status: string;
  wwiScore: number;
  components: WWIComponent[];
  actions: Action[];
}

/**
 * One set of risk bands drives every score colour and label in the demo, so a
 * "Critical" badge can never render in the healthy colour.
 *   >= 70 Healthy · 55-69 Elevated · 45-54 High Risk · < 45 Critical
 */
export const RISK_BANDS = [
  { min: 70, label: 'Healthy',   token: 'healthy' },
  { min: 55, label: 'Elevated',  token: 'warning' },
  { min: 45, label: 'High Risk', token: 'accent' },
  { min: -Infinity, label: 'Critical', token: 'risk' },
] as const;

const bandFor = (value: number) => RISK_BANDS.find((band) => value >= band.min) ?? RISK_BANDS[3];

export const getRiskLabel = (value: number) => bandFor(value).label;

export const getColor = (value: number) => `var(--${bandFor(value).token})`;

export const getColorClass = (value: number) => {
  switch (bandFor(value).token) {
    case 'healthy': return 'text-[var(--healthy)]';
    case 'warning': return 'text-[var(--warning)]';
    case 'accent':  return 'text-[var(--accent)]';
    default:        return 'text-[var(--risk)]';
  }
};

export const getBorderClass = (value: number) => {
  switch (bandFor(value).token) {
    case 'healthy': return 'border-[var(--healthy)]';
    case 'warning': return 'border-[var(--warning)]';
    case 'accent':  return 'border-[var(--accent)]';
    default:        return 'border-[var(--risk)]';
  }
};

export const getBgClass = (value: number) => {
  switch (bandFor(value).token) {
    case 'healthy': return 'bg-[var(--healthy)]/20';
    case 'warning': return 'bg-[var(--warning)]/20';
    case 'accent':  return 'bg-[var(--accent)]/20';
    default:        return 'bg-[var(--risk)]/20';
  }
};

export const EMPLOYEES: Employee[] = [
  {
    id: 'riya',
    name: 'Riya S.',
    role: 'Analyst',
    status: 'Critical',
    wwiScore: 41,
    components: [
      { name: 'Protection from Harm',  shortName: 'Protection',   value: 35 },
      { name: 'Work-Life Harmony',      shortName: 'Work-Life',  value: 38 },
      { name: 'Connection & Community', shortName: 'Connection',  value: 50 },
      { name: 'Mattering at Work',      shortName: 'Mattering',   value: 44 },
      { name: 'Opportunity for Growth', shortName: 'Growth',   value: 38 },
    ],
    actions: [
      { title: 'Schedule urgent 1:1 with Riya', priority: 'urgent', dueDate: 'Today', component: 'Protection from Harm' },
      { title: 'Review workload allocation',     priority: 'urgent', dueDate: 'Today', component: 'Work-Life Harmony' },
      { title: 'Connect her with a mentor',      priority: 'high',   dueDate: 'This week', component: 'Opportunity for Growth' },
      { title: 'Acknowledge recent contributions', priority: 'high', dueDate: 'This week', component: 'Mattering at Work' },
      { title: 'Invite to team social event',    priority: 'medium', dueDate: 'This month', component: 'Connection & Community' },
    ],
  },
  {
    id: 'sam',
    name: 'Sam J.',
    role: 'Operations',
    status: 'High Risk',
    wwiScore: 49,
    components: [
      { name: 'Protection from Harm',  shortName: 'Protection',   value: 45 },
      { name: 'Work-Life Harmony',      shortName: 'Work-Life',  value: 40 },
      { name: 'Connection & Community', shortName: 'Connection',  value: 60 },
      { name: 'Mattering at Work',      shortName: 'Mattering',   value: 55 },
      { name: 'Opportunity for Growth', shortName: 'Growth',   value: 45 },
    ],
    actions: [
      { title: 'Discuss workload balance with Sam', priority: 'urgent', dueDate: 'Tomorrow', component: 'Work-Life Harmony' },
      { title: 'Review safety concerns',            priority: 'high',   dueDate: 'This week', component: 'Protection from Harm' },
      { title: 'Create growth plan',                priority: 'high',   dueDate: 'This week', component: 'Opportunity for Growth' },
      { title: 'Pair with senior team member',      priority: 'medium', dueDate: 'This week', component: 'Connection & Community' },
    ],
  },
  {
    id: 'diego',
    name: 'Diego P.',
    role: 'Specialist',
    status: 'Elevated',
    wwiScore: 58,
    components: [
      { name: 'Protection from Harm',  shortName: 'Protection',   value: 60 },
      { name: 'Work-Life Harmony',      shortName: 'Work-Life',  value: 55 },
      { name: 'Connection & Community', shortName: 'Connection',  value: 65 },
      { name: 'Mattering at Work',      shortName: 'Mattering',   value: 58 },
      { name: 'Opportunity for Growth', shortName: 'Growth',   value: 52 },
    ],
    actions: [
      { title: 'Check in on project satisfaction', priority: 'medium', dueDate: 'This week', component: 'Mattering at Work' },
      { title: 'Identify stretch assignments',     priority: 'medium', dueDate: 'This week', component: 'Opportunity for Growth' },
      { title: 'Team lunch or outing',             priority: 'medium', dueDate: 'This month', component: 'Connection & Community' },
    ],
  },
  {
    id: 'aisha',
    name: 'Aisha K.',
    role: 'Engineer',
    status: 'Healthy',
    wwiScore: 78,
    components: [
      { name: 'Protection from Harm',  shortName: 'Protection',   value: 80 },
      { name: 'Work-Life Harmony',      shortName: 'Work-Life',  value: 75 },
      { name: 'Connection & Community', shortName: 'Connection',  value: 82 },
      { name: 'Mattering at Work',      shortName: 'Mattering',   value: 78 },
      { name: 'Opportunity for Growth', shortName: 'Growth',   value: 75 },
    ],
    actions: [
      { title: 'Nominate for recognition award',   priority: 'medium', dueDate: 'This month', component: 'Mattering at Work' },
      { title: 'Discuss leadership opportunities', priority: 'medium', dueDate: 'This month', component: 'Opportunity for Growth' },
    ],
  },
  {
    id: 'james',
    name: 'James T.',
    role: 'Designer',
    status: 'Healthy',
    wwiScore: 82,
    components: [
      { name: 'Protection from Harm',  shortName: 'Protection',   value: 85 },
      { name: 'Work-Life Harmony',      shortName: 'Work-Life',  value: 80 },
      { name: 'Connection & Community', shortName: 'Connection',  value: 88 },
      { name: 'Mattering at Work',      shortName: 'Mattering',   value: 82 },
      { name: 'Opportunity for Growth', shortName: 'Growth',   value: 75 },
    ],
    actions: [
      { title: 'Explore senior designer track',    priority: 'medium', dueDate: 'This month', component: 'Opportunity for Growth' },
    ],
  },
  {
    id: 'priya',
    name: 'Priya M.',
    role: 'Product Manager',
    status: 'Elevated',
    wwiScore: 61,
    components: [
      { name: 'Protection from Harm',  shortName: 'Protection',   value: 65 },
      { name: 'Work-Life Harmony',      shortName: 'Work-Life',  value: 52 },
      { name: 'Connection & Community', shortName: 'Connection',  value: 70 },
      { name: 'Mattering at Work',      shortName: 'Mattering',   value: 68 },
      { name: 'Opportunity for Growth', shortName: 'Growth',   value: 50 },
    ],
    actions: [
      { title: 'Review sprint load with Priya',    priority: 'high',   dueDate: 'This week', component: 'Work-Life Harmony' },
      { title: 'Clarify career path options',      priority: 'medium', dueDate: 'This week', component: 'Opportunity for Growth' },
    ],
  },
];

export function buildTeamContext() {
  return {
    schema: "WWI_TEAM_CONTEXT_V1",

    summary: {
      totalEmployees: EMPLOYEES.length,
      riskBands: {
        critical: EMPLOYEES.filter(e => e.wwiScore < 50).length,
        elevated: EMPLOYEES.filter(e => e.wwiScore >= 50 && e.wwiScore < 70).length,
        healthy: EMPLOYEES.filter(e => e.wwiScore >= 70).length,
      },
    },

    employees: EMPLOYEES.map((e) => ({
      id: e.id,
      name: e.name,
      role: e.role,
      status: e.status,
      wwiScore: e.wwiScore,

      components: e.components.map((c) => ({
        name: c.name,
        short: c.shortName,
        value: c.value,
      })),

      actions: e.actions.map((a) => ({
        title: a.title,
        priority: a.priority,
        due: a.dueDate,
        component: a.component,
      })),

      // derived signals (important for LLM reasoning)
      signals: {
        lowestComponent: e.components.reduce((min, c) =>
          c.value < min.value ? c : min
        ),
        highestComponent: e.components.reduce((max, c) =>
          c.value > max.value ? c : max
        ),
        urgentActions: e.actions.filter(a => a.priority === "urgent").length,
      },
    })),

    meta: {
      componentsTracked: [
        "Protection from Harm",
        "Work-Life Harmony",
        "Connection & Community",
        "Mattering at Work",
        "Opportunity for Growth",
      ],
    },
  };
}