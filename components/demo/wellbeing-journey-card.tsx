"use client";

import { useEffect, useState } from "react";
import { Plus, Upload, Calendar, TrendingUp } from "lucide-react";
import { wellbeingStats } from "@/app/demo/data";

interface WellbeingJourneyCardProps {
  className?: string;
}

function AnimatedArc({
  value,
  max,
  color,
  label,
  size = 140,
}: {
  value: number;
  max: number;
  color: string;
  label: string;
  size?: number;
}) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Animate the arc
    const arcDuration = 1000;
    const startTime = Date.now();

    const animateArc = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / arcDuration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(easeOut);

      if (progress < 1) {
        requestAnimationFrame(animateArc);
      }
    };

    // Animate the number
    const valueDuration = 800;
    const valueStartTime = Date.now();

    const animateValue = () => {
      const elapsed = Date.now() - valueStartTime;
      const progress = Math.min(elapsed / valueDuration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animateValue);
      }
    };

    requestAnimationFrame(animateArc);
    requestAnimationFrame(animateValue);
  }, [value]);

  const radius = size / 2 - 15;
  const circumference = Math.PI * radius; // Half circle
  const percentage = value / max;
  const strokeDashoffset = circumference * (1 - percentage * animatedValue);

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
        {/* Background arc */}
        <path
          d={`M 15 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 15} ${size / 2}`}
          fill="none"
          stroke="#f3f4f6"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Animated arc */}
        <path
          d={`M 15 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 15} ${size / 2}`}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 0.1s ease-out" }}
        />
        {/* Center text */}
        <text
          x={size / 2}
          y={size / 2 - 10}
          textAnchor="middle"
          className="text-3xl font-bold"
          fill="#1f2937"
        >
          {displayValue}
        </text>
      </svg>
      {/* Label on arc */}
      <div
        className="absolute rounded-full px-3 py-1 text-xs font-medium text-white"
        style={{
          backgroundColor: color,
          bottom: "15px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function WellbeingJourneyCard({ className }: WellbeingJourneyCardProps) {
  const [animatedWWI, setAnimatedWWI] = useState(0);

  useEffect(() => {
    const duration = 800;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setAnimatedWWI(Math.round(wellbeingStats.teamWWIAverage * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className={`rounded-3xl bg-white p-6 shadow-lg shadow-gray-200/50 ${className}`}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Wellbeing Journey</h3>
        <div className="flex items-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50">
            <Plus className="h-4 w-4" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50">
            <Upload className="h-4 w-4" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50">
            <Calendar className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex items-center justify-between">
        {/* Left: Team WWI Average */}
        <div className="flex flex-col">
          <p className="text-sm text-gray-500">Team WWI Average</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-gray-900">{animatedWWI}</span>
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-sm font-medium text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" />
              +{wellbeingStats.delta}
            </span>
          </div>
        </div>

        {/* Right: Arc Charts */}
        <div className="flex items-end gap-4">
          <AnimatedArc
            value={wellbeingStats.atRisk}
            max={10}
            color="#6366f1"
            label="At Risk"
          />
          <AnimatedArc
            value={wellbeingStats.stable}
            max={10}
            color="#f97316"
            label="Stable"
          />
        </div>
      </div>
    </div>
  );
}
