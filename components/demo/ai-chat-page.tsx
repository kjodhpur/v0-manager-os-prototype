'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  "Why is Riya's WWI so low?",
  'How can I improve team recognition?',
  'What should I prioritize this week?',
  'How do I reduce firefighting on my team?',
];

const GREETING: Message = {
  role: 'assistant',
  content:
    "Hi, I'm your AI Coach. I can help you understand your team's wellbeing signals and figure out what actions to take. What's on your mind?",
};

export function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [input]);

  // Cancel any request still in flight when the view unmounts.
  useEffect(() => () => abortRef.current?.abort(), []);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: text.trim() };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error(`Request failed with ${response.status}`);

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      if ((error as Error).name === 'AbortError') return;
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I couldn't reach the coaching service just now. Give it another try in a moment.",
        },
      ]);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const showSuggestions = !messages.some((m) => m.role === 'user');

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] flex-col bg-background lg:h-screen">
      <div className="flex shrink-0 items-center gap-3 border-b border-border bg-card px-4 py-3 lg:px-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20">
          <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-foreground">AI Coach</h2>
          <p className="text-xs text-muted-foreground">Powered by Gemini</p>
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6" aria-live="polite">
        {messages.map((msg, idx) => (
          <div
            key={`${msg.role}-${idx}`}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <span
              className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                msg.role === 'assistant'
                  ? 'bg-primary/20 text-primary'
                  : 'bg-muted text-foreground'
              }`}
            >
              {msg.role === 'assistant' ? (
                <Bot className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <User className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </span>

            <div
              className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'rounded-tr-sm bg-primary text-primary-foreground'
                  : 'rounded-tl-sm border border-border bg-card text-foreground'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Bot className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <div className="rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-3">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" aria-label="Thinking" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {showSuggestions && (
        <div className="flex shrink-0 flex-wrap gap-2 px-4 pb-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => sendMessage(s)}
              className="min-h-[40px] rounded-full border border-border bg-card px-3.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="shrink-0 px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="flex items-end gap-3 rounded-2xl border border-border bg-card px-4 py-3 transition-colors focus-within:border-primary/50">
          <label htmlFor="coach-input" className="sr-only">
            Ask the AI Coach about your team
          </label>
          <textarea
            id="coach-input"
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your team..."
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
          />

          <button
            type="button"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            aria-label="Send message"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Press Enter to send · Shift+Enter for a new line
        </p>
      </div>
    </div>
  );
}
