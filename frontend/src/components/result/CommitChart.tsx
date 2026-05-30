import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { AstralMap } from "../../types/astral";
import { GlassCard } from "../GlassCard";

interface Props {
  temporalRhythm: AstralMap["temporal_rhythm"];
}

const DAY_ORDER = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"] as const;

interface TooltipContentProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-container-low border border-white/10 rounded-lg px-3 py-2 text-center backdrop-blur-md">
      <p className="text-on-surface-variant font-label-md text-label-md">
        {label}
      </p>
      <p className="text-secondary-fixed-dim font-bold text-body-lg">
        {payload[0].value} commits
      </p>
    </div>
  );
}

export function CommitChart({ temporalRhythm }: Props) {
  const { chart_data, sync_rate } = temporalRhythm;

  const data = DAY_ORDER.map((day) => ({ day, commits: chart_data[day] }));
  const maxValue = Math.max(...data.map((d) => d.commits));

  return (
    <GlassCard className="p-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h4 className="font-headline-md text-headline-md text-on-surface">
            Ritmo Temporal
          </h4>
          <p className="text-outline text-body-sm">
            Velocidade Semanal de Commits no Plano Orbital
          </p>
        </div>
        <div className="text-right">
          <span className="text-secondary-fixed-dim text-headline-md font-bold">
            {sync_rate}
          </span>
          <p className="text-outline text-label-md font-label-md">
            TAXA DE SYNC
          </p>
        </div>
      </div>

      <svg width="0" height="0">
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ddb7ff" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#00e639" stopOpacity={0.6} />
          </linearGradient>
          <linearGradient id="barGradientMax" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ddb7ff" stopOpacity={1} />
            <stop offset="100%" stopColor="#00e639" stopOpacity={0.9} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          barCategoryGap="25%"
          margin={{ top: 8, right: 0, left: -28, bottom: 0 }}
        >
          <CartesianGrid
            vertical={false}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="4 4"
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#8a8fa8", fontSize: 12, fontWeight: 500 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#8a8fa8", fontSize: 11 }}
            allowDecimals={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
          />
          <Bar
            dataKey="commits"
            radius={[6, 6, 0, 0]}
            isAnimationActive
            animationDuration={900}
            animationEasing="ease-out"
          >
            {data.map((entry) => (
              <Cell
                key={entry.day}
                fill={
                  entry.commits === maxValue
                    ? "url(#barGradientMax)"
                    : "url(#barGradient)"
                }
                filter={entry.commits === maxValue ? "url(#glow)" : undefined}
                fillOpacity={entry.commits === maxValue ? 1 : 0.65}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
