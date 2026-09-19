import { BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { getColor } from '@/lib/team-data';

interface Props {
  wwiTrendData: { week: number; label: string; value: number }[];
}

const CHART_HEIGHT = 300;
const MARGIN = { top: 10, right: 12, bottom: 4, left: 0 };
const X_AXIS_HEIGHT = 28;
// The gradient is positioned in user space, so it has to use the same plot box
// Recharts actually draws into — margins plus the reserved axis height.
const PLOT_HEIGHT = CHART_HEIGHT - MARGIN.top - MARGIN.bottom - X_AXIS_HEIGHT;
const valueToY = (value: number) => MARGIN.top + PLOT_HEIGHT * (1 - value / 100);

export default function WWITrend({ wwiTrendData }: Props) {
  // With 12+ points on a narrow card, showing every label turns the axis into a
  // solid block of text — thin them out instead of rotating them.
  const tickInterval = wwiTrendData.length > 8 ? Math.ceil(wwiTrendData.length / 6) - 1 : 0;

  return (
    <div className="rounded-xl border border-border bg-card p-5 text-foreground lg:col-span-2 lg:p-6">
      <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold">
        <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />
        WWI Trend
      </h2>

      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <LineChart data={wwiTrendData} margin={MARGIN}>
          <defs>
            <linearGradient
              id="lineGradient"
              x1="0"
              y1={valueToY(0)}
              x2="0"
              y2={valueToY(100)}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="var(--risk)" />
              <stop offset="45%" stopColor="var(--accent)" />
              <stop offset="55%" stopColor="var(--warning)" />
              <stop offset="70%" stopColor="var(--healthy)" />
              <stop offset="100%" stopColor="var(--healthy)" />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="var(--border)" vertical={false} />

          <XAxis
            dataKey="label"
            stroke="var(--fg-muted)"
            tickLine={false}
            axisLine={{ stroke: 'var(--border)' }}
            interval={tickInterval}
            height={X_AXIS_HEIGHT}
            tick={{ fontSize: 11 }}
            minTickGap={8}
          />
          <YAxis
            domain={[0, 100]}
            stroke="var(--fg-muted)"
            tickLine={false}
            axisLine={false}
            width={34}
            tick={{ fontSize: 11 }}
          />

          <Tooltip
            cursor={{ stroke: 'var(--border)' }}
            contentStyle={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '0.75rem',
              fontSize: '0.8125rem',
              color: 'var(--fg)',
            }}
            labelStyle={{ color: 'var(--fg-muted)' }}
            formatter={(value: number) => [value, 'WWI']}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            activeDot={{ r: 6 }}
            dot={({ cx, cy, payload }) => (
              <circle
                key={`${payload.week}-${payload.value}`}
                cx={cx}
                cy={cy}
                r={4}
                fill={getColor(payload.value)}
                stroke="var(--card)"
                strokeWidth={2}
              />
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
