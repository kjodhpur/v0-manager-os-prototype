"use client";

import { cn } from "@/lib/utils";
import { teamMembers } from "@/app/demo/data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TeamAvatarStripProps {
  onMemberClick?: (memberId: string) => void;
}

export function TeamAvatarStrip({ onMemberClick }: TeamAvatarStripProps) {
  const getBadgeColorClass = (color?: string) => {
    switch (color) {
      case "rose":
        return "bg-rose-500";
      case "amber":
        return "bg-amber-500";
      case "blue":
        return "bg-blue-500";
      case "green":
        return "bg-emerald-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <TooltipProvider>
      <div className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 shadow-lg shadow-gray-200/50">
        {teamMembers.map((member, index) => (
          <Tooltip key={member.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => onMemberClick?.(member.id)}
                className="group relative"
              >
                {/* Avatar */}
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold text-white transition-transform group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${member.gradientFrom}, ${member.gradientTo})`,
                  }}
                >
                  {member.initials}
                </div>

                {/* Badge */}
                {member.badgeCount !== undefined && member.badgeCount > 0 && (
                  <span
                    className={cn(
                      "absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white",
                      getBadgeColorClass(member.badgeColor)
                    )}
                  >
                    {member.badgeCount}
                  </span>
                )}

                {/* Plus indicator for overflow */}
                {index === teamMembers.length - 1 && (
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-[10px] font-bold text-gray-700">
                    +
                  </span>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-gray-900 text-white">
              <div className="text-center">
                <p className="font-medium">{member.name}</p>
                <p className="text-xs text-gray-400">{member.role}</p>
                <p className="mt-1 text-xs">
                  WWI: <span className={cn(
                    "font-semibold",
                    member.whi < 50 ? "text-rose-400" : member.whi < 60 ? "text-amber-400" : "text-emerald-400"
                  )}>{member.whi}</span>
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
