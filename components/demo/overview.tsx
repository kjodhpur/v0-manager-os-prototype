'use client';
import { useState } from 'react';
import WWIOverviewCard from './overview-components/wwi-overview-card';
import WWITrend from './overview-components/wwi-trend';
import WWIComponents from './overview-components/wwi-components';
import AtRiskEmployees from './overview-components/at-risk-employees';
import "@/styles/globals.css";
import { EMPLOYEES } from '@/lib/team-data';

type TimeRange = '2w' | '1m' | '3m' | '1y';

const TIME_RANGES: { label: string; value: TimeRange }[] = [
  { label: '2W', value: '2w' },
  { label: '1M', value: '1m' },
  { label: '3M', value: '3m' },
  { label: '1Y', value: '1y' },
];

// All trend data keyed by time range
const ALL_TREND_DATA: Record<TimeRange, { week: number; label: string; value: number }[]> = {
  '2w': [
    { week: 1, label: 'Wk 1', value: 66 },
    { week: 2, label: 'Wk 2', value: 72 },
  ],
  '1m': [
    { week: 1, label: 'Wk 1', value: 63 },
    { week: 2, label: 'Wk 2', value: 65 },
    { week: 3, label: 'Wk 3', value: 69 },
    { week: 4, label: 'Wk 4', value: 72 },
  ],
  '3m': [
    { week: 1,  label: 'Wk 1',  value: 58 },
    { week: 2,  label: 'Wk 2',  value: 60 },
    { week: 3,  label: 'Wk 3',  value: 61 },
    { week: 4,  label: 'Wk 4',  value: 62 },
    { week: 5,  label: 'Wk 5',  value: 63 },
    { week: 6,  label: 'Wk 6',  value: 64 },
    { week: 7,  label: 'Wk 7',  value: 63 },
    { week: 8,  label: 'Wk 8',  value: 65 },
    { week: 9,  label: 'Wk 9',  value: 67 },
    { week: 10, label: 'Wk 10', value: 69 },
    { week: 11, label: 'Wk 11', value: 70 },
    { week: 12, label: 'Wk 12', value: 72 },
  ],
  '1y': [
    { week: 1,  label: 'Jan', value: 54 },
    { week: 2,  label: 'Feb', value: 57 },
    { week: 3,  label: 'Mar', value: 59 },
    { week: 4,  label: 'Apr', value: 58 },
    { week: 5,  label: 'May', value: 61 },
    { week: 6,  label: 'Jun', value: 63 },
    { week: 7,  label: 'Jul', value: 62 },
    { week: 8,  label: 'Aug', value: 65 },
    { week: 9,  label: 'Sep', value: 67 },
    { week: 10, label: 'Oct', value: 68 },
    { week: 11, label: 'Nov', value: 70 },
    { week: 12, label: 'Dec', value: 72 },
  ],
};

// Summary stats per time range
const SUMMARY_BY_RANGE: Record<TimeRange, { teamWWI: number; wwiTrend: number; fairnessScore: number; fairnessTrend: number }> = {
  '2w': { teamWWI: 72, wwiTrend: 4,  fairnessScore: 74, fairnessTrend: -3 },
  '1m': { teamWWI: 70, wwiTrend: 7,  fairnessScore: 72, fairnessTrend: -1 },
  '3m': { teamWWI: 67, wwiTrend: 14, fairnessScore: 70, fairnessTrend:  2 },
  '1y': { teamWWI: 61, wwiTrend: 18, fairnessScore: 66, fairnessTrend:  8 },
};

const wwiComponents = [
  { name: 'Protection from Harm',  shortName: 'Protection', value: 72 },
  { name: 'Work-Life Harmony',     shortName: 'Work-Life',  value: 65 },
  { name: 'Connection & Community',shortName: 'Connection', value: 68 },
  { name: 'Mattering at Work',     shortName: 'Mattering',  value: 71 },
  { name: 'Opportunity for Growth',shortName: 'Growth',     value: 63 },
];

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

const atRiskEmployees = EMPLOYEES.filter((e) => e.wwiScore < 70).sort((a, b) => a.wwiScore - b.wwiScore).slice(0, 3);



export function DemoOverview() {
  const [timeRange, setTimeRange] = useState<TimeRange>('3m');

  const trendData = ALL_TREND_DATA[timeRange];
  const { teamWWI, wwiTrend, fairnessScore, fairnessTrend } = SUMMARY_BY_RANGE[timeRange];

  return (
    <div className="w-full max-h-[100vh] p-6 lg:p-12 overflow-x-hidden bg-text-[var(--bg)]">
      {/* Header */}
      <div className="mb-12 flex items-center gap-6 flex-wrap">
        <h1
          className="text-4xl lg:text-5xl font-bold text-[var(--fg)]"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Team Overview
        </h1>

        {/* Time range toggle */}
        <div className="ml-auto flex items-center bg-[var(--neutral)] border border-[var(--border)] rounded-lg p-1 gap-1">
          {TIME_RANGES.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setTimeRange(value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                timeRange === value
                  ? 'bg-[var(--primary)] text-[var(--fg)] shadow-sm'
                  : 'text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--neutral)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>


      {/* Big WWI Number and Trend + WWI Trend Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <WWIOverviewCard teamWWI={teamWWI} wwiTrend={wwiTrend} />
        <WWITrend wwiTrendData={trendData} />
      </div>

      <WWIComponents wwiComponents={wwiComponents} keyActions={keyActions} />

      {/* At-Risk Employees */}
      <AtRiskEmployees atRiskEmployees={atRiskEmployees} />
    </div>
  );
}