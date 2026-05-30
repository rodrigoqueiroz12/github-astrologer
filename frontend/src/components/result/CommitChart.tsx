import type { AstralMap } from "../../types/astral";
import { GlassCard } from "../GlassCard";

interface Props {
  temporalRhythm: AstralMap["temporal_rhythm"];
}

const DAY_ORDER = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"] as const;

export function CommitChart({ temporalRhythm }: Props) {
  const { chart_data, sync_rate } = temporalRhythm;
  const maxValue = Math.max(...Object.values(chart_data));

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
      <div className="flex items-end justify-between h-48 gap-2">
        {DAY_ORDER.map((day) => {
          const value = chart_data[day];
          const heightPct = maxValue > 0 ? (value / maxValue) * 100 : 0;
          return (
            <div
              key={day}
              className="flex-1 relative group"
              style={{
                height: "100%",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <div
                className="w-full bg-secondary-fixed-dim/20 hover:bg-secondary-fixed-dim transition-colors rounded-t-sm relative"
                style={{ height: `${heightPct}%` }}
              >
                <div className="hidden group-hover:block absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] bg-secondary-fixed text-on-secondary px-1 rounded whitespace-nowrap">
                  {value} commits
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-4 text-outline font-label-md text-label-md">
        {DAY_ORDER.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
    </GlassCard>
  );
}
