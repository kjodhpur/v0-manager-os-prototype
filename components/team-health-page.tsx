'use client';

import { TrendingUp, Shield, Heart, Users, Lightbulb, Target } from 'lucide-react';

export function TeamHealthPage() {
  const surgeonGeneralEssentials = [
    {
      id: 1,
      name: 'Protection from Harm',
      icon: Shield,
      description: 'Safe, respectful, and secure workplace',
      avgScore: 68,
      trend: 2,
      employees: [
        { name: 'Riya S.', score: 38, status: 'critical' },
        { name: 'Sam J.', score: 48, status: 'high' },
        { name: 'Diego P.', score: 54, status: 'medium' },
      ],
    },
    {
      id: 2,
      name: 'Work-Life Harmony',
      icon: Heart,
      description: 'Balance between work and personal life',
      avgScore: 63,
      trend: 1,
      employees: [
        { name: 'Riya S.', score: 35, status: 'critical' },
        { name: 'Sam J.', score: 45, status: 'high' },
        { name: 'Diego P.', score: 50, status: 'medium' },
      ],
    },
    {
      id: 3,
      name: 'Connection & Community',
      icon: Users,
      description: 'Belonging and social connection',
      avgScore: 72,
      trend: 3,
      employees: [
        { name: 'Riya S.', score: 42, status: 'high' },
        { name: 'Sam J.', score: 50, status: 'medium' },
        { name: 'Diego P.', score: 52, status: 'good' },
      ],
    },
    {
      id: 4,
      name: 'Mattering at Work',
      icon: Target,
      description: 'Feeling valued and important',
      avgScore: 71,
      trend: 2,
      employees: [
        { name: 'Riya S.', score: 45, status: 'high' },
        { name: 'Sam J.', score: 52, status: 'medium' },
        { name: 'Diego P.', score: 54, status: 'good' },
      ],
    },
    {
      id: 5,
      name: 'Opportunity for Growth',
      icon: Lightbulb,
      description: 'Learning and development opportunities',
      avgScore: 65,
      trend: 1,
      employees: [
        { name: 'Riya S.', score: 42, status: 'high' },
        { name: 'Sam J.', score: 48, status: 'high' },
        { name: 'Diego P.', score: 50, status: 'medium' },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-500/20 text-red-400';
      case 'high':
        return 'bg-orange-500/20 text-orange-400';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'good':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-blue-500/20 text-blue-400';
    }
  };

  return (
    <div className="w-full min-h-screen p-6 lg:p-12 overflow-x-hidden bg-background">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-2 text-foreground">Team Wellbeing</h1>
        <p className="text-base text-muted-foreground">Monitor the 5 Surgeon General essentials for workplace health</p>
      </div>

      {/* Essentials Grid */}
      <div className="space-y-8">
        {surgeonGeneralEssentials.map((essential) => {
          const Icon = essential.icon;
          return (
            <div
              key={essential.id}
              className="rounded-lg border border-border overflow-hidden"
              className="bg-card"
            >
              {/* Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-foreground">{essential.name}</p>
                      <p className="text-sm text-muted-foreground">{essential.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground text-sm">Team Average</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-blue-400">{essential.avgScore}</p>
                      <span className="text-green-400 font-semibold text-sm">↑{essential.trend}</span>
                    </div>
                  </div>
                </div>

                {/* Score Bar */}
                <div className="w-full h-2 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                    style={{ width: `${(essential.avgScore / 100) * 100}%` }}
                  />
                </div>
              </div>

              {/* Team Member Breakdown */}
              <div className="p-6">
                <p className="text-sm font-semibold text-muted-foreground mb-4 uppercase">At-Risk Team Members</p>
                <div className="space-y-3">
                  {essential.employees.map((emp, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{emp.name}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-bold text-foreground w-8 text-right">{emp.score}</p>
                        <span className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(emp.status)}`}>
                          {emp.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
