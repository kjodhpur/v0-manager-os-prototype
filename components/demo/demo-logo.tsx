"use client";

import { Heart } from "lucide-react";

export function DemoLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Heart className="h-6 w-6 fill-rose-500 text-rose-500" />
      <span className="text-lg font-semibold text-gray-900">HeartMetrics</span>
    </div>
  );
}
