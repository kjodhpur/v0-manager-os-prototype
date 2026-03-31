'use client';

import { TrendingUp, AlertTriangle } from 'lucide-react';

export function DemoOverview() {
  const kpiCards = [
    {
      label: 'Team Work Wellbeing Index',
      value: '67',
      change: '+4',
      changeType: 'up',
      trend: [65, 66, 67, 66, 67, 67, 67],
    },
    {
      label: 'Avg Workload Hours',
      value: '42.3',
      change: '-2.1',
      changeType: 'down',
      trend: [45, 44, 43.5, 43, 42.8, 42.5, 42.3],
    },
    {
      label: 'Recognition Rate',
      value: '78%',
      change: '+12%',
      changeType: 'up',
      trend: [66, 68, 70, 72, 75, 77, 78],
    },
    {
      label: 'Team Engagement',
      value: '8.2/10',
      change: '+0.3',
      changeType: 'up',
      trend: [7.8, 7.9, 8.0, 8.1, 8.15, 8.2, 8.2],
    },
  ];

  const attentionItems = [
    {
      name: 'Riya S.',
      wwiScore: 43,
      status: 'Critical',
      signals: 4,
      color: '#E0607A',
    },
    {
      name: 'Marcus T.',
      wwiScore: 51,
      status: 'At Risk',
      signals: 3,
      color: '#C464A2',
    },
    {
      name: 'Elena K.',
      wwiScore: 58,
      status: 'Elevated',
      signals: 2,
      color: '#A87AC8',
    },
    {
      name: 'James B.',
      wwiScore: 65,
      status: 'Watch',
      signals: 1,
      color: '#9B9BE4',
    },
  ];

  return (
    <div className="p-4 lg:p-8 w-full overflow-x-hidden max-lg:pb-24">
      {/* Header */}
      <div className="mb-8 lg:mb-12">
        <h1 className="text-2xl lg:text-3xl font-display font-bold mb-2">Team Overview</h1>
        <p className="text-sm lg:text-base text-muted-foreground">Real-time insights into team health and performance</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
        {kpiCards.map((card, idx) => (
          <div
            key={idx}
            className="border border-border rounded-xl p-4 lg:p-6 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
          >
            {/* Label */}
            <p className="text-xs font-mono text-muted-foreground mb-3 lg:mb-4 uppercase tracking-wider">
              {card.label}
            </p>

            {/* Value */}
            <div className="mb-3 lg:mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl lg:text-3xl font-display font-bold text-gradient">
                  {card.value}
                </span>
                <span
                  className={`text-xs lg:text-sm font-medium ${
                    card.changeType === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {card.change}
                </span>
              </div>
            </div>

            {/* Mini sparkline */}
            <div className="h-8 flex items-end gap-1 justify-between">
              {card.trend.map((val, i) => {
                const max = Math.max(...card.trend);
                const min = Math.min(...card.trend);
                const range = max - min || 1;
                const height = ((val - min) / range) * 100;
                return (
                  <div
                    key={i}
                    className="flex-1 bg-primary/30 rounded-t opacity-60 hover:opacity-100 transition-opacity"
                    style={{ height: `${height || 20}%`, minHeight: '4px' }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Attention Needed Section */}
      <div className="border border-border rounded-xl overflow-hidden bg-card/50">
        <div className="border-b border-border px-4 lg:px-6 py-3 lg:py-4 bg-card flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0" />
          <h2 className="text-base lg:text-lg font-semibold">Attention Needed</h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm lg:text-base">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-mono text-muted-foreground uppercase">
                  Name
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-mono text-muted-foreground uppercase">
                  WWI
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-mono text-muted-foreground uppercase">
                  Status
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-mono text-muted-foreground uppercase">
                  Signals
                </th>
              </tr>
            </thead>
            <tbody>
              {attentionItems.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b border-border hover:bg-card/80 transition-colors"
                >
                  <td className="px-4 lg:px-6 py-3 lg:py-4">
                    <span className="font-medium text-sm lg:text-base">{item.name}</span>
                  </td>
                  <td className="px-4 lg:px-6 py-3 lg:py-4">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-display font-bold text-sm lg:text-base">{item.wwiScore}</span>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-3 lg:py-4">
                    <span
                      className="px-2 lg:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                      style={{
                        backgroundColor: `${item.color}20`,
                        color: item.color,
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-3 lg:py-4">
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full ${
                            i < item.signals ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recommended Actions */}
        <div className="border-t border-border px-4 lg:px-6 py-4 lg:py-6 bg-card/30">
          <h3 className="font-semibold mb-4 text-sm lg:text-base">Recommended Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <div className="border border-primary/30 rounded-lg p-3 lg:p-4 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
              <p className="text-xs lg:text-sm font-medium">Schedule 1:1 with Riya</p>
              <p className="text-xs text-muted-foreground mt-1">Immediate support needed</p>
            </div>
            <div className="border border-border rounded-lg p-3 lg:p-4 hover:border-primary/30 transition-colors cursor-pointer">
              <p className="text-xs lg:text-sm font-medium">Redistribute Tasks</p>
              <p className="text-xs text-muted-foreground mt-1">Balance workload across team</p>
            </div>
            <div className="border border-border rounded-lg p-3 lg:p-4 hover:border-primary/30 transition-colors cursor-pointer">
              <p className="text-xs lg:text-sm font-medium">Increase Recognition</p>
              <p className="text-xs text-muted-foreground mt-1">Boost team morale</p>
            </div>
            <div className="border border-border rounded-lg p-3 lg:p-4 hover:border-primary/30 transition-colors cursor-pointer">
              <p className="text-xs lg:text-sm font-medium">Team Meeting</p>
              <p className="text-xs text-muted-foreground mt-1">Discuss wellbeing initiatives</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
