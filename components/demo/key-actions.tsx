'use client';

interface Action { title: string; priority: string; dueDate: string; }

const priorityConfig: Record<string, { color: string; bg: string; label: string }> = {
  urgent: { color: '#FF6B6B', bg: 'rgba(255,107,107,0.12)', label: 'Urgent' },
  high:   { color: '#FFB347', bg: 'rgba(255,179,71,0.12)',  label: 'High' },
  medium: { color: '#00B8A0', bg: 'rgba(0,184,160,0.1)',    label: 'Medium' },
};

export default function KeyActions(actions: Action[]) {
  return (
    <div className="rounded-[12px] border border-border bg-card p-5">
      <p className="text-sm font-semibold mb-4">Key Actions This Week</p>
      <div className="space-y-2">
        {actions.map((action, idx) => {
          const cfg = priorityConfig[action.priority] ?? priorityConfig.medium;
          return (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-[8px] border transition-colors hover:bg-muted/30 cursor-pointer"
              style={{ borderColor: cfg.color + '40', backgroundColor: cfg.bg }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ backgroundColor: cfg.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-snug">{action.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Due: {action.dueDate}</p>
              </div>
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ color: cfg.color, backgroundColor: cfg.bg, border: `1px solid ${cfg.color}40` }}
              >
                {cfg.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
