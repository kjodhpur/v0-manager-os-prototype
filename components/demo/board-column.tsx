"use client";

import { cn } from "@/lib/utils";
import { Check, Calendar, Plus, MoreHorizontal } from "lucide-react";
import type { BoardColumn as BoardColumnType, TaskRow } from "@/app/demo/data";
import { teamMembers } from "@/app/demo/data";

interface BoardColumnProps {
  column: BoardColumnType;
  onTaskClick?: (taskId: string) => void;
  className?: string;
}

function TaskRowItem({ task, onTaskClick }: { task: TaskRow; onTaskClick?: (taskId: string) => void }) {
  const member = task.memberId ? teamMembers.find(m => m.id === task.memberId) : null;

  return (
    <div
      onClick={() => onTaskClick?.(task.id)}
      className="group flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-gray-50"
    >
      <div className="flex items-center gap-3">
        {/* Avatar or Plus icon */}
        {task.isUnassigned ? (
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400">
            <Plus className="h-4 w-4" />
          </div>
        ) : member ? (
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white"
            style={{
              background: `linear-gradient(135deg, ${member.gradientFrom}, ${member.gradientTo})`,
            }}
          >
            {member.initials}
          </div>
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600">
            {task.memberInitials}
          </div>
        )}

        {/* Text */}
        <div className="flex flex-col">
          {task.memberName && (
            <span className={cn("text-sm", task.isBold ? "font-semibold text-gray-900" : "font-medium text-gray-700")}>
              {task.memberName}
            </span>
          )}
          <span className={cn(
            "text-xs",
            task.isUnassigned ? "text-gray-500" : "text-gray-500"
          )}>
            {task.label}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        {task.hasMenu ? (
          <button className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        ) : (
          <>
            <button className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full border transition-colors",
              task.status === "complete"
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-gray-300 text-gray-400 hover:border-gray-400"
            )}>
              <Check className="h-3.5 w-3.5" />
            </button>
            <button className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-400 transition-colors hover:border-gray-400">
              <Calendar className="h-3.5 w-3.5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function BoardColumn({ column, onTaskClick, className }: BoardColumnProps) {
  if (column.isDark) {
    return (
      <div className={cn("flex flex-col", className)}>
        {/* Dark hero card */}
        <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-3xl bg-gray-900 p-6 text-center shadow-xl">
          <h3 className="text-xl font-semibold text-white">{column.title}</h3>
          <p className="mt-1 text-sm text-gray-400">Active</p>
        </div>
        {/* Label */}
        <p className="mt-3 text-center text-xs font-medium text-gray-500">{column.label}</p>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col", className)}>
      {/* White card */}
      <div className="flex min-h-[280px] flex-col rounded-3xl bg-white p-4 shadow-lg shadow-gray-200/50">
        {column.tasks.map((task) => (
          <TaskRowItem key={task.id} task={task} onTaskClick={onTaskClick} />
        ))}
      </div>
      {/* Label */}
      <p className="mt-3 text-center text-xs font-medium text-gray-500">{column.label}</p>
    </div>
  );
}
