'use client';

import { useState } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi! Need help with something? I can assist with feedback, recognition, or team insights.",
    },
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: "That's a great question! Based on your team metrics, here's what I'd suggest...",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 500);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center z-40"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>

      {/* Chat modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 max-h-96 rounded-2xl border border-border bg-card shadow-2xl flex flex-col z-40 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border bg-card">
            <p className="text-sm font-semibold">AI Coach</p>
            <p className="text-xs text-muted-foreground">Ask for help</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs rounded-lg px-3 py-2 text-xs ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 bg-card flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask..."
              className="flex-1 rounded-lg border border-border bg-background text-foreground px-3 py-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim()}
              className="px-2.5 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
