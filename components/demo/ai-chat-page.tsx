'use client';
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
// ─── PASTE YOUR API KEY HERE ──────────────────────────────────────────────────
// Note: In production, move this to an environment variable:
//   1. Add to your .env.local:  NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-...
//   2. Replace above line with: const ANTHROPIC_API_KEY = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY ?? '';
// ─────────────────────────────────────────────────────────────────────────────


interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'Why is Riya\'s WWI so low?',
  'How can I improve team recognition?',
  'What should I prioritize this week?',
  'How do I reduce firefighting on my team?',
];

export function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi, I'm your AI Coach. I can help you understand your team's wellbeing signals and figure out what actions to take. What's on your mind?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [input]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: newMessages,
      }),
    });

      if (!response.ok) {
        throw new Error("API failed");
      }

      const data = await response.json();
      const reply = data.reply;

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Please check your API key and try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] bg-[var(--bg)]">

      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-[var(--border)] bg-[var(--neutral)] flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-[var(--primary)]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--fg)]">AI Coach</p>
          <p className="text-xs text-[var(--fg)]/40">Powered by Gemini</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs mt-0.5 ${
              msg.role === 'assistant'
                ? 'bg-[var(--primary)]/20 text-[var(--primary)]'
                : 'bg-[var(--fg)]/10 text-[var(--fg)]'
            }`}>
              {msg.role === 'assistant' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-[var(--primary)] text-white rounded-tr-sm'
                : 'bg-[var(--neutral)] border border-[var(--border)] text-[var(--fg)] rounded-tl-sm'
            }`}>
              {msg.content.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < msg.content.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center bg-[var(--primary)]/20 text-[var(--primary)]">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-[var(--neutral)] border border-[var(--border)] rounded-2xl rounded-tl-sm px-4 py-3">
              <Loader2 className="w-4 h-4 animate-spin text-[var(--fg)]/40" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggestions — only show before first user message */}
      { (
        <div className="flex-shrink-0 px-4 pb-3 flex gap-2 flex-wrap">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="text-xs px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--neutral)] text-[var(--fg)]/60 hover:text-[var(--fg)] hover:border-[var(--primary)]/50 transition-all duration-200"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex-shrink-0 px-4">
        <div className="flex items-end gap-4 bg-[var(--neutral)] border border-[var(--border)] rounded-2xl px-4 py-3 focus-within:border-[var(--primary)]/50 transition-colors">
          <textarea
          
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your team..."
            rows={1}
            className="flex-1 mb-1 items-center bg-transparent text-sm text-[var(--fg)] placeholder:text-[var(--fg)]/30 resize-none outline-none leading-relaxed"
          />

          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="flex-shrink-0 w-8 h-8 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-[10px] text-[var(--fg)]/25 text-center mt-2">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>

    </div>
  );
}