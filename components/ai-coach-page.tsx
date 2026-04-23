'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, ChevronDown, Copy, Check } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const EMPLOYEES = [
  {
    name: 'Riya S.', role: 'Analyst', wwiScore: 41, status: 'Critical - Overloaded',
    recentIssues: ['Workload 1.8x team average', '3 blocked tasks (4+ days)', '0 recognition in past 30 days'],
    aiContext: "Riya has been overloaded for 3 days straight. Her WHI sits at 41 (Critical). Key signals: workload at 1.8× team average, 3 tasks blocked 4+ days, and no recognition events in 30 days. Consider redistributing 2–3 blocked items to Olivia or Diego who have capacity this sprint.",
  },
  {
    name: 'Sam J.', role: 'Operations', wwiScore: 49, status: 'High - At Risk',
    recentIssues: ['Meeting load 2.2x average', 'Minimal growth opportunities', 'Recognition gap (2 events)'],
    aiContext: "Sam's high firefighting load (2.2× meeting average) is crowding out deep work. WHI: 49. Suggest a sprint retrospective to reset priorities, cancel or delegate 1–2 recurring meetings, and explore one stretch assignment to address the growth deficit.",
  },
  {
    name: 'Diego P.', role: 'Specialist', wwiScore: 52, status: 'Medium - Monitor',
    recentIssues: ['Workload trending up', 'Routine assignments predominant'],
    aiContext: "Diego's WHI (52) is in the monitor zone. His workload is trending up and his assignments are mostly routine (low growth %). A growth-oriented stretch task this quarter could meaningfully improve his engagement.",
  },
  {
    name: 'Olivia K.', role: 'Engineer', wwiScore: 71, status: 'Healthy',
    recentIssues: [],
    aiContext: "Olivia is in a healthy zone (WHI: 71) with available capacity. She's a strong candidate to receive redistributed tasks from Riya. Recognizing her recent quiet wins publicly would also reinforce her engagement.",
  },
  {
    name: 'Jordan M.', role: 'PM', wwiScore: 68, status: 'Healthy',
    recentIssues: [],
    aiContext: "Jordan is doing well (WHI: 68). No immediate action needed. Consider keeping current workload steady and monitoring for any changes in meeting load.",
  },
];

const AI_RESPONSES: Record<string, string[]> = {
  'draft feedback': [
    "Here's a draft feedback message:\n\n---\n\n\"[Name], I wanted to share some observations from this sprint. I can see you've been carrying a heavy load — [X] items in your queue vs. the team average of [Y]. That takes real resilience.\n\nI'd like to work together to redistribute a few of the blocked items so you have more breathing room. Would you be open to a 15-minute sync this week to triage together?\"\n\n---\n\nWant me to adjust the tone (more direct, warmer, shorter)?",
  ],
  'write recognition': [
    "Here's a recognition message you can send or post publicly:\n\n---\n\n\"I want to call out [Name]'s work on [project/task]. Despite a high workload this sprint, the quality and attention to detail didn't slip. That consistency under pressure is exactly the kind of thing that makes our team stronger. Thank you.\"\n\n---\n\nShould I make it more specific to recent work, or format it for Slack?",
  ],
  'difficult conversation': [
    "Here's a conversation guide for a difficult 1:1:\n\n**Opening (empathy first):**\n\"I wanted to check in — I've noticed some signals that suggest you might be stretched thin. How are you feeling about your current workload?\"\n\n**Show the data (non-blaming):**\n\"Looking at task data, your queue is running about 1.8× the team average. That's not sustainable, and I want to help fix it.\"\n\n**Offer solutions:**\n\"I'm thinking we redistribute [X] and [Y] to Olivia, who has capacity. Would that help?\"\n\n**Close with action:**\n\"Let's set a follow-up in 2 weeks to see if the pressure eases.\"\n\nWant me to adapt this for email, Slack, or in-person?",
  ],
};

const GENERIC_RESPONSES = [
  "Based on your team's current WHI data, here are some suggestions: Prioritize a 1:1 with your highest-risk employee this week. Consider redistributing blocked tasks to team members with available capacity. A public recognition message can meaningfully improve Mattering scores.",
  "I can help you draft feedback, write recognition messages, or prepare for a difficult conversation. Select a team member from the dropdown to get context-aware suggestions.",
  "Looking at overall team health: 2 members are in the at-risk zone, your fairness score has dipped slightly, and one recognition gap has exceeded 30 days. Would you like targeted suggestions for any of these?",
];

const SEED_CONVERSATIONS: Message[] = [
  { role: 'assistant', content: "Hi! I'm your AI Coach. I can help you draft feedback, write recognition messages, and prepare for difficult conversations — all with context from your team's live metrics. Select a team member above to get started.", timestamp: new Date(Date.now() - 5 * 60000) },
  { role: 'user', content: "I'm worried about Riya's workload", timestamp: new Date(Date.now() - 4 * 60000) },
  { role: 'assistant', content: "Riya has been overloaded for 3 days straight. Her WHI sits at 41 (Critical). Key signals: workload at 1.8× team average, 3 tasks blocked 4+ days, and no recognition events in 30 days.\n\nI'd recommend:\n1. Schedule a 1:1 this week\n2. Redistribute 2–3 blocked items to Olivia (she has capacity)\n3. Send a recognition message to start rebuilding her Mattering score\n\nWould you like me to draft any of those?", timestamp: new Date(Date.now() - 3 * 60000) },
];

export function AiCoachPage() {
  const searchParams = useSearchParams();
  const initialEmployee = searchParams.get('employee');

  const defaultEmployee = EMPLOYEES.find((e) => e.name === initialEmployee) ?? EMPLOYEES[0];

  const [messages, setMessages] = useState<Message[]>(SEED_CONVERSATIONS);
  const [input, setInput] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(defaultEmployee);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // If navigated here with ?employee=X, add a context message
  useEffect(() => {
    if (initialEmployee && initialEmployee !== EMPLOYEES[0].name) {
      const emp = EMPLOYEES.find((e) => e.name === initialEmployee);
      if (emp) {
        setSelectedEmployee(emp);
        const contextMsg: Message = {
          role: 'assistant',
          content: `I've loaded ${emp.name}'s context. ${emp.aiContext}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, contextMsg]);
      }
    }
  }, []);

  const getAiResponse = (userInput: string, employee: typeof EMPLOYEES[0]): string => {
    const lower = userInput.toLowerCase();
    if (lower.includes('draft feedback') || lower.includes('feedback')) return AI_RESPONSES['draft feedback'][0];
    if (lower.includes('recognition') || lower.includes('shoutout') || lower.includes('recognize')) return AI_RESPONSES['write recognition'][0];
    if (lower.includes('difficult') || lower.includes('conversation') || lower.includes('1:1') || lower.includes('meeting')) return AI_RESPONSES['difficult conversation'][0];
    if (lower.includes('workload') || lower.includes('overloaded') || lower.includes('blocked')) {
      return `Based on ${employee.name}'s profile (WHI: ${employee.wwiScore}): ${employee.aiContext}`;
    }
    const idx = Math.floor(Date.now() / 1000) % GENERIC_RESPONSES.length;
    return `For ${employee.name} (WHI: ${employee.wwiScore}, ${employee.status}): ${GENERIC_RESPONSES[idx]}`;
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = { role: 'user', content: trimmed, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = {
        role: 'assistant',
        content: getAiResponse(trimmed, selectedEmployee),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 700);
  };

  const handleQuickSuggestion = (text: string) => {
    setInput(text);
    inputRef.current?.focus();
  };

  const handleCopy = (content: string, idx: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const selectEmployee = (emp: typeof EMPLOYEES[0]) => {
    setSelectedEmployee(emp);
    setIsDropdownOpen(false);
    const ctxMsg: Message = {
      role: 'assistant',
      content: `Switched context to ${emp.name} (WHI: ${emp.wwiScore}, ${emp.status}). ${emp.aiContext}`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, ctxMsg]);
  };

  return (
    <div className="w-full bg-background flex flex-col overflow-hidden" style={{ height: 'calc(100vh - 56px)' }}>

      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4 flex-shrink-0">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl font-bold">AI Coach</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Context-aware guidance for your team</p>
          </div>

          {/* Employee selector */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted transition-colors text-left"
            >
              <div>
                <p className="text-sm font-semibold leading-none">{selectedEmployee.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{selectedEmployee.status}</p>
              </div>
              <div className="flex items-center gap-1 ml-2">
                <span className="text-lg font-bold tabular-nums" style={{ color: selectedEmployee.wwiScore < 50 ? '#FF6B6B' : selectedEmployee.wwiScore < 65 ? '#FFB347' : '#5DD67A' }}>
                  {selectedEmployee.wwiScore}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 w-56 rounded-lg border border-border bg-card shadow-xl z-20">
                {EMPLOYEES.map((emp) => (
                  <button
                    key={emp.name}
                    onClick={() => selectEmployee(emp)}
                    className="w-full text-left px-4 py-2.5 hover:bg-muted transition-colors border-b border-border last:border-0 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium">{emp.name}</p>
                      <p className="text-xs text-muted-foreground">{emp.role}</p>
                    </div>
                    <span className="text-sm font-bold tabular-nums" style={{ color: emp.wwiScore < 50 ? '#FF6B6B' : emp.wwiScore < 65 ? '#FFB347' : '#5DD67A' }}>
                      {emp.wwiScore}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Employee metrics card */}
        {selectedEmployee.recentIssues.length > 0 && (
          <div className="rounded-lg bg-muted/40 border border-border px-4 py-3">
            <div className="flex flex-wrap gap-2">
              {selectedEmployee.recentIssues.map((issue) => (
                <span key={issue} className="text-xs px-2.5 py-1 rounded-full bg-background border border-border text-muted-foreground">{issue}</span>
              ))}
            </div>
          </div>
        )}

        {/* Quick suggestions */}
        <div className="flex gap-2 mt-3">
          {['Draft feedback', 'Write recognition', 'Difficult conversation guide'].map((s) => (
            <button
              key={s}
              onClick={() => handleQuickSuggestion(s)}
              className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`relative max-w-2xl rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-muted text-foreground rounded-bl-sm'}`}>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              <div className="flex items-center justify-between gap-4 mt-2">
                <p className="text-xs opacity-50">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                {msg.role === 'assistant' && (
                  <button
                    onClick={() => handleCopy(msg.content, idx)}
                    className="text-xs opacity-50 hover:opacity-100 transition-opacity flex items-center gap-1"
                  >
                    {copiedIdx === idx ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedIdx === idx ? 'Copied' : 'Copy'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">AI Coach is typing...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card px-6 py-4 flex-shrink-0">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder={`Ask about ${selectedEmployee.name}, or type a quick suggestion above...`}
            className="flex-1 rounded-xl border border-border bg-background text-foreground px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          This product uses work-system signals only. It does not read private messages by default.
        </p>
      </div>
    </div>
  );
}
