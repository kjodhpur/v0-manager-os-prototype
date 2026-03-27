"use client";

import { useEffect, useState } from "react";

interface ConnectorLinesProps {
  columnCount: number;
}

export function ConnectorLines({ columnCount }: ConnectorLinesProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate horizontal dashed lines between columns
  const lines = [];
  for (let i = 0; i < columnCount - 1; i++) {
    // Calculate positions based on column layout
    const startX = (i + 1) * (100 / columnCount) - 2; // End of current column
    const endX = (i + 1) * (100 / columnCount) + 2; // Start of next column

    lines.push(
      <g key={i}>
        {/* Dashed horizontal line */}
        <line
          x1={`${startX}%`}
          y1="50%"
          x2={`${endX}%`}
          y2="50%"
          stroke="#d1d5db"
          strokeWidth="2"
          strokeDasharray="6 4"
          className={mounted ? "animate-dash" : ""}
        />
        {/* Start dot */}
        <circle
          cx={`${startX}%`}
          cy="50%"
          r="4"
          fill="#3b82f6"
          className={mounted ? "animate-pulse-dot" : ""}
        />
        {/* End dot */}
        <circle
          cx={`${endX}%`}
          cy="50%"
          r="4"
          fill="#10b981"
          className={mounted ? "animate-pulse-dot" : ""}
          style={{ animationDelay: "0.5s" }}
        />
      </g>
    );
  }

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ zIndex: 1 }}
    >
      <defs>
        <style>
          {`
            @keyframes dash-flow {
              to {
                stroke-dashoffset: -20;
              }
            }
            @keyframes pulse-dot {
              0%, 100% {
                transform: scale(1);
                opacity: 1;
              }
              50% {
                transform: scale(1.2);
                opacity: 0.8;
              }
            }
            .animate-dash {
              animation: dash-flow 1s linear infinite;
            }
            .animate-pulse-dot {
              animation: pulse-dot 2s ease-in-out infinite;
              transform-origin: center;
              transform-box: fill-box;
            }
          `}
        </style>
      </defs>
      {lines}
    </svg>
  );
}
