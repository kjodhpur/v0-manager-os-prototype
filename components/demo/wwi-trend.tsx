import { BarChart3 } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import "@/styles/globals.css";
const stops = [
    { t: 0.0, color: 'var(--primary)' },
    { t: 0.33, color: 'var(--healthy)' },
    { t: 0.67, color: 'var(--warning)' },
    { t: 1.0, color: 'var(--accent)' },
];

const getRiskColor = (score: number) => {
    if (score < 50) return 'warning';
    return 'healthy';
};

export default function WWWITrend(wwiTrendData: { week: number; value: number }[], fairnessScore: number, fairnessTrend: number) {

    
    const durations = ['Sprint', 'Month', 'Quarter', 'Year'];
    const [selectedDuration] = ['Month']; // Default to Month

    // Calculate SVG line path for graph
    const maxValue = Math.max(...wwiTrendData.map(d => d.value));
    const minValue = Math.min(...wwiTrendData.map(d => d.value));
    const range = maxValue - minValue;
    const chartWidth = 400;
    const chartHeight = 150;
    const padding = 20;

    const points = wwiTrendData.map((d, i) => ({
        x: padding + (i / (wwiTrendData.length - 1)) * (chartWidth - 2 * padding),
        y: padding + (1 - (d.value - minValue) / range) * (chartHeight - 2 * padding),
        value: d.value,
    }));

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    
{/* Graph */}
    return (
            <div
            className="lg:col-span-2 rounded-xl p-6 border border-border bg-[var(--neutral)] text-[var(--fg)]"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[var(--primary)]" />
                    WWI Trend
                    </h2>
                    <div className="flex gap-2">
                    {durations.map((d) => (
                        <button
                        key={d}
                        className={`px-3 py-1 text-sm rounded transition-colors ${
                            d === selectedDuration
                            ? 'bg-[var(--primary)]/30 text-[var(--fg)] border border-[var(--primary)]/50'
                            : 'hover:text-[var(--primary)]'
                        }`}
                        >
                        {d}
                        </button>
                    ))}
                    </div>
            </div>

            {/* Line Chart */}
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={wwiTrendData}>
                    <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary)" />
                            <stop offset="33%" stopColor="var(--healthy)" />
                            <stop offset="67%" stopColor="var(--warning)" />
                            <stop offset="100%" stopColor="var(--accent)" />
                        </linearGradient>
                    </defs>

                    <CartesianGrid stroke="var(--fg)" />
                    <XAxis dataKey="week" stroke="var(--fg)" />
                    <YAxis domain={['auto', 'auto']} stroke="var(--fg)" />

                    <Line
                    type="monotone"
                    dataKey="value"
                    stroke="url(#lineGradient)"
                    strokeWidth={3}
                    dot={({ cx, cy, payload }) => {
                        const t = normalize(payload.value, minValue, maxValue);
                        return (
                                <circle
                                key={`${payload.week}-${payload.value}`}
                                cx={cx}
                                cy={cy}
                                r={4}
                                fill={getColor(t)}
                                stroke="var(--fg)"
                                strokeWidth={1}
                                />
                            );
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
// {/* Fairness Score Card */}
//         {/* <div
//           className="rounded-xl p-6 text-[var(--border)] bg-[var(--fg)]"
//         >
//             <div className = "rounded-xl border border-[var(--border)] flex flex-col items-center justify-center w-full h-full p-4">
//                 <p className=" text-medium font-medium mb-3 uppercase text-center">Manager Fairness Score</p>
//                 <p className={`text-5xl font-bold mb-2 text-[var(--${getRiskColor(fairnessScore)})]`}>
//                     {fairnessScore}
//                 </p>
//                 <p className={`text-lg font-semibold ${fairnessTrend <= 0 ? 'text-red-400' : 'text-green-400'}`}>
//                     {fairnessTrend <= 0 ? '↓' : '↑'} {Math.abs(fairnessTrend)}
//                 </p>
//             </div>
//         </div> */}

function getColor(t: number) {
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];

    if (t >= a.t && t <= b.t) {
      return t < (a.t + b.t) / 2 ? a.color : b.color;
    }
  }
  return stops[stops.length - 1].color;
}
export function normalize(value: number, min: number, max: number): number {
  const range = max - min;

  if (range === 0) return 0; // avoids divide-by-zero

  return 1 - (value - min) / range;
}