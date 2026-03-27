"use client";

import { Plus, Upload, Calendar } from "lucide-react";
import { TeamAvatarStrip } from "./team-avatar-strip";
import { BoardColumn } from "./board-column";
import { AiMiniCards } from "./ai-mini-cards";
import { boardColumns } from "@/app/demo/data";

interface TeamPulseBoardProps {
  onTaskClick?: (taskId: string) => void;
  onMemberClick?: (memberId: string) => void;
}

export function TeamPulseBoard({ onTaskClick, onMemberClick }: TeamPulseBoardProps) {
  return (
    <section className="rounded-3xl bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 p-6 shadow-sm">
      {/* Board Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Active Team Monitoring</h2>
          <p className="text-sm text-gray-500">8 members · Live signals</p>
        </div>

        {/* Team Avatar Strip - Centered */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <TeamAvatarStrip onMemberClick={onMemberClick} />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-white hover:shadow-sm">
            <Plus className="h-5 w-5" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-white hover:shadow-sm">
            <Upload className="h-5 w-5" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-white hover:shadow-sm">
            <Calendar className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Board Columns with Connectors */}
      <div className="relative">
        {/* Connector SVG Overlay */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ zIndex: 10 }}
        >
          <defs>
            <style>
              {`
                @keyframes dash-flow {
                  to {
                    stroke-dashoffset: -20;
                  }
                }
                .animate-dash {
                  animation: dash-flow 1s linear infinite;
                }
              `}
            </style>
          </defs>
          {/* Line from col 1 to col 2 */}
          <line x1="22%" y1="50%" x2="27%" y2="50%" stroke="#d1d5db" strokeWidth="2" strokeDasharray="6 4" className="animate-dash" />
          <circle cx="22%" cy="50%" r="5" fill="#3b82f6" />
          <circle cx="27%" cy="50%" r="5" fill="#10b981" />
          
          {/* Line from col 2 to col 3 */}
          <line x1="47%" y1="50%" x2="52%" y2="50%" stroke="#d1d5db" strokeWidth="2" strokeDasharray="6 4" className="animate-dash" />
          <circle cx="47%" cy="50%" r="5" fill="#3b82f6" />
          <circle cx="52%" cy="50%" r="5" fill="#10b981" />
          
          {/* Curved line from col 3 to col 4 (AI hero card) */}
          <path d="M 72% 50% Q 75% 50%, 77% 50%" stroke="#6b7280" strokeWidth="2" fill="none" />
          <circle cx="72%" cy="50%" r="5" fill="#f59e0b" />
        </svg>

        {/* Columns Grid */}
        <div className="grid grid-cols-5 gap-4" style={{ position: "relative", zIndex: 1 }}>
          {/* First 3 columns - white cards */}
          {boardColumns.slice(0, 3).map((column) => (
            <BoardColumn
              key={column.id}
              column={column}
              onTaskClick={onTaskClick}
            />
          ))}

          {/* AI Coaching - dark hero card */}
          <BoardColumn
            column={boardColumns[3]}
            onTaskClick={onTaskClick}
          />

          {/* AI Queue - mini cards grid */}
          <div className="flex flex-col">
            <AiMiniCards />
            <p className="mt-3 text-center text-xs font-medium text-gray-500">AI Queue</p>
          </div>
        </div>
      </div>
    </section>
  );
}
