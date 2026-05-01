import { BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import "@/styles/globals.css";

interface Props {
  wwiTrendData: { week: number; label: string; value: number }[];
}

// Chart constants — must match the LineChart margin below
const CHART_HEIGHT = 300;
const MARGIN = { top: 10, right: 10, bottom: 20, left: 30 };
const PLOT_HEIGHT = CHART_HEIGHT - MARGIN.top - MARGIN.bottom;

// Map value (0–100) to y coordinate in userSpace
const valueToY = (value: number) => MARGIN.top + PLOT_HEIGHT * (1 - value / 100);

const getColor = (value: number) => {
  if (value >= 75) return 'var(--primary)';
  if (value >= 50) return 'var(--healthy)';
  if (value >= 25) return 'var(--warning)';
  return 'var(--accent)';
};

export default function WWITrend({ wwiTrendData }: Props) {
  return (
    <div className="lg:col-span-2 rounded-xl p-6 border border-border bg-[var(--neutral)] text-[var(--fg)]">
      <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-[var(--primary)]" />
        WWI Trend
      </h2>

      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <LineChart data={wwiTrendData} margin={MARGIN}>
          <defs>
            <linearGradient
              id="lineGradient"
              x1="0" y1={valueToY(0)}
              x2="0" y2={valueToY(100)}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="25%" stopColor="var(--warning)" />
              <stop offset="75%" stopColor="var(--healthy)" />
              <stop offset="100%" stopColor="var(--primary)" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border)" />
          <XAxis
            dataKey="label"
            stroke="var(--fg)"
            interval={0}
            angle={-45}
            textAnchor="end"
            height={50}
            />
          <YAxis domain={[0, 100]} stroke="var(--fg)" />
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={({ cx, cy, payload }) => (
              <circle
                key={`${payload.week}-${payload.value}`}
                cx={cx} cy={cy} r={4}
                fill={getColor(payload.value)}
                stroke="var(--neutral)"
                strokeWidth={2}
              />
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}