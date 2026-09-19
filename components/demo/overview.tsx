'use client';

import { useState } from 'react';
import WWIOverviewCard from './overview-components/wwi-overview-card';
import WWITrend from './overview-components/wwi-trend';
import WWIComponents from './overview-components/wwi-components';
import AtRiskEmployees from './overview-components/at-risk-employees';
import { EMPLOYEES } from '@/lib/team-data';

type TimeRange = '2w' | '1m' | '3m' | '1y';

const TIME_RANGES: { label: string; value: TimeRange }[] = [
  { label: '2W', value: '2w' },
  { label: '1M', value: '1m' },
  { label: '3M', value: '3m' },
  { label: '1Y', value: '1y' },
];

/**
 * Every headline number is derived from the same roster the Team page renders,
 * so the overview can never disagree with the employees it summarises.
 */
const TEAM_WWI = Math.round(
  EMPLOYEES.reduce((sum, e) => sum + e.wwiScore, 0) / EMPLOYEES.length,
);

const TEAM_COMPONENTS = EMPLOYEES[0].components.map((component, index) => ({
  name: component.name,
  shortName: component.shortName,
  value: Math.round(
    EMPLOYEES.reduce((sum, e) => sum + e.components[index].value, 0) / EMPLOYEES.length,
  ),
}));

/** Each series walks up to the live team score, so the trend and the headline agree. */
const buildSeries = (labels: string[], startValue: number) =>
  labels.map((label, index) => ({
    week: index + 1,
    label,
    value:
      index === labels.length - 1
        ? TEAM_WWI
        : Math.round(startValue + ((TEAM_WWI - startValue) * index) / (labels.length - 1)),
  }));

const ALL_TREND_DATA: Record<TimeRange, { week: number; label: string; value: number }[]> = {
  '2w': buildSeries(['Wk 1', 'Wk 2'], TEAM_WWI - 3),
  '1m': buildSeries(['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'], TEAM_WWI - 6),
  '3m': buildSeries(
    Array.from({ length: 12 }, (_, i) => `Wk ${i + 1}`),
    TEAM_WWI - 11,
  ),
  '1y': buildSeries(
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    TEAM_WWI - 16,
  ),
};

const keyActions = [
  { title: 'Schedule 1:1 with Riya S.',      priority: 'urgent', dueDate: 'Today',      components: ['Protection from Harm', 'Opportunity for Growth'] },
  { title: 'Redistribute workload',           priority: 'high',   dueDate: 'This week',  components: ['Work-Life Harmony', 'Protection from Harm'] },
  { title: 'Recognition review',              priority: 'medium', dueDate: 'This week',  components: ['Mattering at Work'] },
  { title: 'Team sync meeting',               priority: 'medium', dueDate: 'Tomorrow',   components: ['Connection & Community'] },
  { title: 'Offer PTO to overloaded members', priority: 'high',   dueDate: 'This week',  components: ['Work-Life Harmony'] },
  { title: 'Schedule team building event',    priority: 'medium', dueDate: 'Next week',  components: ['Connection & Community'] },
  { title: 'Career growth 1:1',               priority: 'medium', dueDate: 'This week',  components: ['Opportunity for Growth'] },
  { title: 'Reassign at-risk tasks',          priority: 'high',   dueDate: 'Today',      components: ['Protection from Harm'] },
];

const atRiskEmployees = [...EMPLOYEES]
  .filter((e) => e.wwiScore < 70)
  .sort((a, b) => a.wwiScore - b.wwiScore)
  .slice(0, 3);

export function DemoOverview() {
  const [timeRange, setTimeRange] = useState<TimeRange>('3m');

  const trendData = ALL_TREND_DATA[timeRange];
  const wwiTrend = TEAM_WWI - trendData[0].value;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <div className="mb-10 flex flex-wrap items-center gap-4">
        <h2 className="font-display text-3xl font-bold text-foreground lg:text-4xl">
          Team Overview
        </h2>

        <div
          className="ml-auto flex items-center gap-1 rounded-xl border border-border bg-card p-1"
          role="group"
          aria-label="Time range"
        >
          {TIME_RANGES.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTimeRange(value)}
              aria-pressed={timeRange === value}
              className={`min-h-[40px] rounded-lg px-3.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                timeRange === value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <WWIOverviewCard teamWWI={TEAM_WWI} wwiTrend={wwiTrend} />
        <WWITrend wwiTrendData={trendData} />
      </div>

      <WWIComponents wwiComponents={TEAM_COMPONENTS} keyActions={keyActions} />

      <AtRiskEmployees atRiskEmployees={atRiskEmployees} />
    </div>
  );
}
