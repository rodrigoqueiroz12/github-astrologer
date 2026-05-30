import type { AstralMap } from "../../types/astral";
import { GlassCard } from "../GlassCard";

interface Props {
  solarSign: AstralMap["solar_sign"];
}

export function SolarSignCard({ solarSign }: Props) {
  return (
    <GlassCard className="p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <span
          className="material-symbols-outlined text-primary/20 text-8xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          nightlight
        </span>
      </div>
      <h4 className="font-label-md text-label-md text-primary mb-2 flex items-center gap-2">
        <span className="material-symbols-outlined text-sm">wb_sunny</span>
        SIGNO SOLAR
      </h4>
      <h3 className="font-headline-xl text-headline-xl text-on-surface mb-4">
        Elemento Dominante: {solarSign.title}
      </h3>
      <p className="text-on-surface-variant text-body-md leading-relaxed max-w-lg">
        {solarSign.description}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        {solarSign.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded bg-surface-container-highest border border-white/5 text-primary text-label-md font-label-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}
