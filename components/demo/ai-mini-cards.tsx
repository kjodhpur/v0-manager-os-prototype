"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { aiMiniCards } from "@/app/demo/data";

interface AiMiniCardsProps {
  onCardClick?: (cardId: string) => void;
}

export function AiMiniCards({ onCardClick }: AiMiniCardsProps) {
  const [clickedCard, setClickedCard] = useState<string | null>(null);

  const handleClick = (cardId: string) => {
    setClickedCard(cardId);
    onCardClick?.(cardId);
    
    // Reset after toast duration
    setTimeout(() => setClickedCard(null), 3000);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {aiMiniCards.map((card) => (
        <button
          key={card.id}
          onClick={() => handleClick(card.id)}
          className={cn(
            "rounded-2xl bg-white px-4 py-3 text-center text-xs font-medium shadow-lg shadow-gray-200/50 transition-all hover:scale-[1.02] hover:shadow-xl",
            clickedCard === card.id && "bg-emerald-50 text-emerald-700"
          )}
        >
          {card.label}
        </button>
      ))}

      {/* Toast notification */}
      {clickedCard && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm text-white shadow-2xl">
            <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Added to queue
          </div>
        </div>
      )}
    </div>
  );
}
