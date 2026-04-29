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

export const getColor = (value: number) => {
  if (value >= 75) return 'var(--primary)';
  if (value >= 50) return 'var(--healthy)';
  if (value >= 25) return 'var(--warning)';
  return 'var(--accent)';
};

export const getColorClass = (value: number) => {
  if (value >= 75) return 'text-[var(--primary)]';
  if (value >= 50) return 'text-[var(--healthy)]';
  if (value >= 25) return 'text-[var(--warning)]';
  return 'text-[var(--accent)]';
};

export const getBorderClass = (value: number) => {
  if (value >= 75) return 'border-[var(--primary)]';
  if (value >= 50) return 'border-[var(--healthy)]';
  if (value >= 25) return 'border-[var(--warning)]';
  return 'border-[var(--accent)]';
};

export const getBgClass = (value: number) => {
  if (value >= 75) return 'bg-[var(--primary)]/20';
  if (value >= 50) return 'bg-[var(--healthy)]/20';
  if (value >= 25) return 'bg-[var(--warning)]/20';
  return 'bg-[var(--accent)]/20';
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
