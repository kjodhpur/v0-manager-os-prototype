'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, ChevronDown } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface EmployeeMetrics {
  name: string;
  wwiScore: number;
  status: string;
  recentIssues: string[];
}

const employees: EmployeeMetrics[] = [
  {
    name: 'Riya S.',
    wwiScore: 41,
    status: 'Critical - Overloaded',
    recentIssues: [
      'Workload 1.8x team average',
      '3 blocked tasks (4+ days)',
      '0 recognition in past 30 days',
    ],
  },
  {
    name: 'Sam J.',
    wwiScore: 49,
    status: 'High - At Risk',
    recentIssues: [
      'Meeting load 2.2x average',
      'Minimal growth opportunities',
      'Recognition gap (2 events)',
    ],
  },
  {
    name: 'Diego P.',
    wwiScore: 52,
    status: 'Medium - Monitor',
    recentIssues: [
      'Workload trending up',
      'Recent performance on critical project',
    ],
  },
  {
    name: 'Olivia K.',
    wwiScore: 71,
    status: 'Healthy',
    recentIssues: [],
  },
];

const exampleConversations: Message[] = [
  {
    role: 'assistant',
    content:
      "Hi! I'm your AI Coach. I can help you draft feedback, write recognition messages, prepare for difficult conversations, and get context-aware suggestions for your team. Who would you like to discuss today?",
    timestamp: new Date(Date.now() - 5 * 60000),
  },
  {
    role: 'user',
    content: 'I want to talk to Riya about her workload',
    timestamp: new Date(Date.now() - 4 * 60000),
  },
  {
    role: 'assistant',
    content:
      "Riya's WHI is currently 41 (Critical), with her biggest stressors being workload (1.8x team average), blocked tasks, and lack of recent recognition. Here's a suggested approach:\n\n**In your 1:1:**\n1. Start with empathy: acknowledge the workload\n2. Show data: \"Your tasks average 9.2h/day vs. 5h for the team\"\n3. Offer solutions: redistribute 2-3 items to Olivia or Diego\n4. Recognition: highlight her recent contributions\n\nWould you like me to draft a specific message?",
    timestamp: new Date(Date.now() - 3 * 60000),
  },
  {
    role: 'user',
    content: 'Help me draft a recognition message for her work on the Q2 project',
    timestamp: new Date(Date.now() - 2 * 60000),
  },
  {
    role: 'assistant',
    content:
      'Here\'s a recognition message:\n\n---\n\n"Riya, I wanted to recognize your excellent work on the Q2 project. Despite the workload challenges, your attention to detail and commitment to quality didn\'t slip. That\'s a real strength.\n\nI also want to acknowledge that I know you\'ve been stretched thin lately. I\'m working on redistributing some tasks to give you breathing room. You deserve to feel sustainable in this role.\n\nThank you for everything you\'re putting in."\n\n---\n\nWould you like me to adjust the tone or add anything?',
    timestamp: new Date(Date.now() - 1 * 60000),
  },
];

export function AiCoachPage() {
  const [messages, setMessages] = useState<Message[]>(exampleConversations);
  const [input, setInput] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeMetrics>(employees[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');

    setTimeout(() => {
      const assistantMessage: Message = {
        role: 'assistant',
        content:
          'I understand. Based on ' +
          selectedEmployee.name +
          "'s current metrics (WHI: " +
          selectedEmployee.wwiScore +
          ', Status: ' +
          selectedEmployee.status +
          '), here are some suggestions...',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 500);
  };

  return (
    <div className="w-full h-screen bg-background flex flex-col overflow-hidden">
      <div className="border-b border-border bg-card p-4 lg:p-6">
        <h1 className="text-2xl font-bold mb-4">AI Coach</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Get help drafting feedback, recognition messages, and difficult conversations
        </p>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full lg:w-64 px-4 py-2 rounded-lg border border-border bg-background text-foreground flex items-center justify-between hover:bg-muted transition-colors"
          >
            <div className="text-left">
              <p className="text-sm font-semibold">{selectedEmployee.name}</p>
              <p className="text-xs text-muted-foreground">{selectedEmployee.status}</p>
            </div>
            <ChevronDown className="w-4 h-4" />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full mt-2 w-full lg:w-64 rounded-lg border border-border bg-card shadow-lg z-10">
              {employees.map((emp) => (
                <button
                  key={emp.name}
                  onClick={() => {
                    setSelectedEmployee(emp);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-muted transition-colors border-b border-border last:border-0"
                >
                  <p className="text-sm font-semibold">{emp.name}</p>
                  <p className="text-xs text-muted-foreground">{emp.status}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedEmployee.recentIssues.length > 0 && (
          <div className="mt-4 rounded-lg bg-muted/30 p-4 border border-border">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
              Recent Issues
            </p>
            <ul className="space-y-1">
              {selectedEmployee.recentIssues.map((issue, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-2xl rounded-lg p-4 ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              <p className="text-xs mt-2 opacity-70">
                {msg.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border bg-card p-4 lg:p-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask for help drafting feedback, recognition, or conversation prep..."
            className="flex-1 rounded-lg border border-border bg-background text-foreground px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
