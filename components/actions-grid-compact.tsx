'use client';

import { AlertTriangle, Star, RefreshCw, Calendar, Unlock } from 'lucide-react';

const actions = [
  { id: 1, icon: AlertTriangle, iconColor: '#FF6B6B', title: "Unblock Riya's 4 blocked tasks", desc: 'Schedule a 30-min unblock session with tech leads.', effort: 'Medium', impact: 'High' },
  { id: 2, icon: Star, iconColor: '#FFB347', title: "Recognize Olivia's platform work", desc: 'Post a public shoutout for three quiet wins this sprint.', effort: 'Low', impact: 'Medium' },
  { id: 3, icon: RefreshCw, iconColor: '#00B8A0', title: 'Rotate stretch project opportunity', desc: "Give Jordan next quarter's design-review lead role.", effort: 'Low', impact: 'High' },
  { id: 4, icon: Calendar, iconColor: '#00B8A0', title: 'Schedule 1:1 with Sam', desc: 'Check in on firefighting load — no 1:1 in 3 weeks.', effort: 'Low', impact: 'Medium' },
  { id: 5, icon: Unlock, iconColor: '#00B8A0', title: "Clear Priya's meeting load", desc: 'Reassign 2 recurring meetings to free 3 hrs/week.', effort: 'Medium', impact: 'Medium' },
];

const effortColor = { Low: '#5DD67A', Medium: '#FFB347', High: '#FF6B6B' };
const impactColor = { Low: '#8B8B8B', Medium: '#FFB347', High: '#FF6B6B' };

export function ActionsGridCompact() {
  return (
    <div className="border border-border bg-card rounded-[12px] p-4">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-base font-semibold m-0">This Week's Actions</h3>
        <span className="text-xs font-medium text-primary-foreground bg-primary rounded px-2 py-0.5">
          {actions.length}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
        {actions.map((a) => {
          const IconComponent = a.icon;
          return (
            <div
              key={a.id}
              className="border border-border rounded-[10px] p-3 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex gap-2 mb-2">
                <IconComponent width={18} height={18} style={{ color: a.iconColor, flexShrink: 0 }} />
                <div>
                  <div className="text-xs font-medium leading-tight">{a.title}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-snug">{a.desc}</div>
                </div>
              </div>
              <div className="flex gap-2 items-center text-xs text-muted-foreground">
                <span>Effort:</span>
                <span
                  className="px-2 py-0.5 rounded text-xs font-medium"
                  style={{
                    backgroundColor: `${effortColor[a.effort as keyof typeof effortColor]}20`,
                    color: effortColor[a.effort as keyof typeof effortColor],
                  }}
                >
                  {a.effort}
                </span>
                <span className="ml-auto">Impact:</span>
                <span style={{ color: impactColor[a.impact as keyof typeof impactColor], fontWeight: 500 }}>
                  {a.impact}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
