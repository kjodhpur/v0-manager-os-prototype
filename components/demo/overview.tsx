'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

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
      color: '#FF6B6B',
    },
    {
      name: 'Marcus T.',
      wwiScore: 51,
      status: 'At Risk',
      signals: 3,
      color: '#FFB347',
    },
    {
      name: 'Elena K.',
      wwiScore: 58,
      status: 'Elevated',
      signals: 2,
      color: '#FFC940',
    },
    {
      name: 'James B.',
      wwiScore: 65,
      status: 'Healthy',
      signals: 1,
      color: '#00B8A0',
    },
  ];

  const actions = [
    { title: 'Schedule 1:1', description: 'With Riya S.' },
    { title: 'Redistribute Tasks', description: 'Balance workload' },
    { title: 'Increase Recognition', description: 'Boost morale' },
    { title: 'Team Sync', description: 'Wellbeing check-in' },
  ];

  return (
    <div className="p-6 lg:p-12 w-full overflow-x-hidden max-lg:pb-24">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">Team Overview</h1>
        <p className="text-base text-muted-foreground">AI-powered insights into your team's wellbeing and engagement</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {kpiCards.map((card, idx) => (
          <div
            key={idx}
            className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
          >
            {/* Label */}
            <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wide">
              {card.label}
            </p>

            {/* Value */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-display font-bold text-foreground">
                  {card.value}
                </span>
                <span
                  className={`text-sm font-medium flex items-center gap-1 ${
                    card.changeType === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {card.changeType === 'up' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {card.change}
                </span>
              </div>
            </div>

            {/* Sparkline */}
            <div className="h-8 flex items-end gap-1 justify-between">
              {card.trend.map((val, i) => {
                const max = Math.max(...card.trend);
                const min = Math.min(...card.trend);
                const range = max - min || 1;
                const height = ((val - min) / range) * 100;
                return (
                  <div
                    key={i}
                    className="flex-1 bg-primary rounded-sm opacity-60 hover:opacity-100 transition-opacity"
                    style={{
                      height: `${height || 20}%`,
                      minHeight: '2px',
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Team Members Section */}
      <div className="mb-12">
        <h2 className="text-xl font-display font-bold mb-6">Team Members</h2>
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Wellbeing</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Signals</th>
              </tr>
            </thead>
            <tbody>
              {attentionItems.map((item, idx) => (
                <tr key={idx} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium">{item.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-semibold">{item.wwiScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="px-3 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: `${item.color}15`,
                        color: item.color,
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
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
      </div>

      {/* Recommended Actions */}
      <div>
        <h2 className="text-xl font-display font-bold mb-6">Recommended Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((action, idx) => (
            <div
              key={idx}
              className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer"
            >
              <p className="text-sm font-medium text-foreground">{action.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
