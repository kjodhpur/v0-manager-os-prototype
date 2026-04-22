import "@/styles/globals.css";
export default function KeyActions(keyActions: { title: string; priority: string; dueDate: string }[]) {
    return (
      <div className="p-6 rounded-xl border border-border bg-[var(--neutral)] text-[var(--fg)]">
        <h2 className="text-xl font-bold mb-6">Key Actions This Week</h2>

        <div className="relative">
          {/* Top fade */}
          <div className="pointer-events-none absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[var(--neutral)] to-transparent z-10" />

          {/* Bottom fade */}
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[var(--neutral)] to-transparent z-10" />

          {/* Scrollable content */}
          <div className="p-2 grid grid-cols-1 gap-4 overflow-y-auto max-h-[300px] pb-4 pt-4">
            {keyActions.map((action, idx) => (
              <button
                key={idx}
                className={`rounded-lg p-4 border ${getPriorityColor(action.priority)}
                hover:scale-[1.02] transition-all duration-200 text-left w-full`}
              >
                <p className="font-medium">{action.title}</p>
                <p className="text-xs mt-2">Due: {action.dueDate}</p>
              </button>
            ))}
          </div>
        </div>
    </div>
    );
}
const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-[var(--accent)]/30 text-[var(--fg)] border-[var(--accent)]';
      case 'high':
        return 'bg-[var(--warning)]/30 text-[var(--fg)] border-[var(--warning)]';
      default:
        return 'bg-[var(--primary)]/30 text-[var(--fg)] border-[var(--primary)]';
    }
  };