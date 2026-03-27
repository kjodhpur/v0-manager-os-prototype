"use client";

import { ChevronDown, Calendar, Dot } from "lucide-react";
import { useState } from "react";

interface TeamFilterBarProps {
  onTeamChange?: (team: string) => void;
  onDateChange?: (range: string) => void;
}

export function TeamFilterBar({ onTeamChange, onDateChange }: TeamFilterBarProps) {
  const [selectedTeam, setSelectedTeam] = useState("AR Ops Team");
  const [selectedDate, setSelectedDate] = useState("Last 4 weeks");
  const [teamOpen, setTeamOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  const teams = [
    { name: "AR Ops Team", count: 10 },
    { name: "Engineering Team A", count: 8 },
    { name: "Product Team", count: 6 },
    { name: "Design Team", count: 5 },
  ];

  const dateRanges = [
    "Last 7 days",
    "Last 4 weeks",
    "Last 3 months",
    "Last 6 months",
  ];

  const handleTeamSelect = (team: string) => {
    setSelectedTeam(team);
    onTeamChange?.(team);
    setTeamOpen(false);
  };

  const handleDateSelect = (range: string) => {
    setSelectedDate(range);
    onDateChange?.(range);
    setDateOpen(false);
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      {/* Team Selector */}
      <div className="relative">
        <button
          onClick={() => setTeamOpen(!teamOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-white hover:border-gray-300 transition-colors text-sm font-medium text-gray-700"
        >
          <span>
            {selectedTeam} {teams.find(t => t.name === selectedTeam)?.count && `(${teams.find(t => t.name === selectedTeam)?.count})`}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
        {teamOpen && (
          <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {teams.map((team) => (
              <button
                key={team.name}
                onClick={() => handleTeamSelect(team.name)}
                className="w-full text-left px-4 py-2.5 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-sm"
              >
                <span className="font-medium text-gray-900">{team.name}</span>
                <span className="ml-2 text-gray-500">({team.count})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Date Range Selector */}
      <div className="relative">
        <button
          onClick={() => setDateOpen(!dateOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-white hover:border-gray-300 transition-colors text-sm font-medium text-gray-700"
        >
          <Calendar className="h-4 w-4 text-gray-500" />
          <span>{selectedDate}</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
        {dateOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {dateRanges.map((range) => (
              <button
                key={range}
                onClick={() => handleDateSelect(range)}
                className="w-full text-left px-4 py-2.5 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-sm font-medium text-gray-700"
              >
                {range}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Connection Status */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-50 border border-green-200 text-sm font-medium text-green-700">
        <Dot className="h-2 w-2 fill-green-600 text-green-600" />
        <span>Connected</span>
      </div>
    </div>
  );
}
