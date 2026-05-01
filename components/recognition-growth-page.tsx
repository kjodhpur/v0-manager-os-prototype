'use client';

import { Award, Sparkles, Calendar } from 'lucide-react';
import { useState } from 'react';

const gaps = [
  { id: 1, name: 'Riya S.',  role: 'Analyst',    days: 47, last: '2 months ago', risk: 'critical' },
  { id: 2, name: 'Sam J.',   role: 'Operations', days: 38, last: '5 weeks ago',  risk: 'high' },
  { id: 3, name: 'Diego P.', role: 'Specialist', days: 22, last: '3 weeks ago',  risk: 'medium' },
];

const suggestions = [
  { id: 1, name: 'Riya S.',  text: 'Recognize her effort on recent project cleanup — even small wins boost confidence when someone is struggling.', context: 'High risk, low recognition' },
  { id: 2, name: 'Sam J.',   text: 'Call out her reliability in handling ops issues. Consistency is valuable and often overlooked.', context: 'High workload, good performance' },
  { id: 3, name: 'Diego P.', text: 'Recognize his mentoring of junior team members. Leadership contributions matter.', context: 'Peer recognition opportunity' },
];

const recent = [
  { id: 1, recipient: 'Priya R.', giver: 'Manager', message: 'Exceptional work on the Q2 dashboard redesign', date: '2 days ago', type: 'appreciation' },
  { id: 2, recipient: 'Mason G.', giver: 'Manager', message: 'Led a great team sync meeting with thoughtful insights', date: '5 days ago', type: 'growth' },
  { id: 3, recipient: 'Diego P.', giver: 'Manager', message: 'Helped resolve critical production issue quickly', date: '1 week ago', type: 'appreciation' },
];

const riskStyle = (risk: string) => {
  switch (risk) {
    case 'critical': return { color: '#FF8A8A', bg: 'rgba(255,107,107,0.12)', border: 'rgba(255,107,107,0.2)' };
    case 'high':     return { color: '#FFB347', bg: 'rgba(255,179,71,0.12)',  border: 'rgba(255,179,71,0.25)' };
    default:         return { color: '#FFC940', bg: 'rgba(255,201,64,0.12)',  border: 'rgba(255,201,64,0.25)' };
  }
};

const typeStyle = (type: string) =>
  type === 'growth'
    ? { color: '#5DD67A', bg: 'rgba(93,214,122,0.12)' }
    : { color: '#FFB347', bg: 'rgba(255,179,71,0.12)' };

export function RecognitionGrowthPage({ onActionClick }: { onActionClick?: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [draft, setDraft] = useState('');

  return (
    <div className="w-full min-h-screen bg-background p-6 lg:p-8 overflow-x-hidden">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
          <Award className="w-6 h-6" style={{ color: '#FFB347' }} />
          Recognition
        </h1>
        <p className="text-sm text-muted-foreground">Recognition gaps and AI-powered suggestions</p>
      </div>

      {/* Recognition gaps */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold uppercase font-mono tracking-wider text-muted-foreground mb-3">
          Recognition gaps
        </h2>
        <div className="space-y-3">
          {gaps.map((g) => {
            const s = riskStyle(g.risk);
            return (
              <div key={g.id} className="rounded-[12px] border border-border bg-card p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-foreground">{g.name}</p>
                  <p className="text-xs text-muted-foreground">{g.role} · last recognized {g.last}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded"
                    style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}` }}
                  >
                    {g.days} days
                  </span>
                  <button
                    onClick={() => { setSelected(g.name); setDraft(''); }}
                    className="px-3 py-1.5 text-xs font-medium rounded transition-colors"
                    style={{ backgroundColor: 'rgba(255,179,71,0.15)', color: '#FFB347', border: '1px solid rgba(255,179,71,0.3)' }}
                  >
                    Recognize
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Draft panel */}
      {selected && (
        <div
          className="rounded-[12px] border p-4 mb-6"
          style={{ borderColor: 'rgba(255,179,71,0.3)', backgroundColor: 'rgba(255,179,71,0.05)' }}
        >
          <p className="text-sm font-semibold mb-1">Draft recognition for {selected}</p>
          <p className="text-xs text-muted-foreground mb-3">Write a thoughtful message</p>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="What do you want to recognize them for?"
            rows={3}
            className="w-full rounded-[8px] p-3 text-sm bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none mb-3"
          />
          <div className="flex gap-2">
            <button
              onClick={() => { setSelected(null); setDraft(''); onActionClick?.(); }}
              className="flex-1 py-2 text-xs font-medium rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Send
            </button>
            <button
              onClick={() => setSelected(null)}
              className="flex-1 py-2 text-xs font-medium rounded border border-border text-muted-foreground hover:bg-muted/50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* AI suggestions */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold uppercase font-mono tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" style={{ color: '#00B8A0' }} />
          AI Coach suggestions
        </h2>
        <div className="space-y-3">
          {suggestions.map((s) => (
            <div
              key={s.id}
              className="rounded-[12px] border p-4"
              style={{ borderColor: 'rgba(0,184,160,0.2)', backgroundColor: 'rgba(0,184,160,0.04)' }}
            >
              <p className="text-sm font-semibold mb-1">{s.name}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              <p className="text-xs mt-2 italic" style={{ color: '#8B8B8B' }}>Context: {s.context}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent recognition */}
      <div>
        <h2 className="text-sm font-semibold uppercase font-mono tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5" style={{ color: '#5DD67A' }} />
          Recent recognition
        </h2>
        <div className="space-y-3">
          {recent.map((r) => {
            const t = typeStyle(r.type);
            return (
              <div key={r.id} className="rounded-[12px] border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">
                      {r.recipient}
                      <span className="font-normal text-muted-foreground ml-2 text-xs">recognized by {r.giver}</span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{r.message}</p>
                  </div>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded flex-shrink-0"
                    style={{ backgroundColor: t.bg, color: t.color }}
                  >
                    {r.type}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{r.date}</p>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8">
        This product uses work-system signals (tasks, meetings, assignments). It does not read private messages by default.
      </p>
    </div>
  );
}
