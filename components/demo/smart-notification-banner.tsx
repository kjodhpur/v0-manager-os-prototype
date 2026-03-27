"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface SmartNotificationBannerProps {
  nudges?: Array<{ id: string; message: string; action: string; actionLabel: string }>;
}

const defaultNudges = [
  {
    id: "1",
    message: "You haven't checked in with Mason in 18 days — schedule a 1:1?",
    action: "schedule",
    actionLabel: "Schedule",
  },
  {
    id: "2",
    message: "Riya's workload is at 9.2/10 — consider redistributing tasks",
    action: "redistribute",
    actionLabel: "View options",
  },
  {
    id: "3",
    message: "Sam hasn't received public recognition in 2 weeks",
    action: "recognize",
    actionLabel: "Give recognition",
  },
];

export function SmartNotificationBanner({ nudges = defaultNudges }: SmartNotificationBannerProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen || nudges.length === 0) return null;

  const current = nudges[currentIndex];
  const hasMultiple = nudges.length > 1;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? nudges.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === nudges.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-blue-50/95 border-b border-blue-100 px-6 py-3">
      <div className="flex items-center justify-between max-w-full">
        <div className="flex items-center gap-4 flex-1">
          {/* Notification icon */}
          <div className="flex-shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
              <span className="text-sm font-semibold text-blue-600">!</span>
            </div>
          </div>

          {/* Message */}
          <p className="text-sm text-gray-900 flex-1">{current.message}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Action button */}
          <button className="px-4 py-1.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
            {current.actionLabel}
          </button>

          {/* Navigation (if multiple nudges) */}
          {hasMultiple && (
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrevious}
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Previous nudge"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs text-gray-500 font-medium">
                {currentIndex + 1}/{nudges.length}
              </span>
              <button
                onClick={goToNext}
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Next nudge"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Dismiss button */}
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
