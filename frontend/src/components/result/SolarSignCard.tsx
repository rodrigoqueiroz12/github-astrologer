import type { AstralMap } from "../../types/astral";
import { GlassCard } from "../GlassCard";

interface Props {
  solarSign: AstralMap["solar_sign"];
  analysisDate: string;
}

export function SolarSignCard({ solarSign, analysisDate }: Props) {
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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h4 className="font-label-md text-label-md text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">wb_sunny</span>
            SIGNO SOLAR
          </h4>
          <p className="font-mono text-xs tracking-widest text-secondary-fixed-dim uppercase">
            ✦ Elemento Dominante
          </p>
        </div>
        <span className="text-outline font-label-md text-label-md">
          Análise: {analysisDate}
        </span>
      </div>
      <h3 className="font-headline-xl text-[24px] md:text-headline-xl text-on-surface mb-4 leading-tight">
        {solarSign.title.includes(":")
          ? (() => {
              const [main, ...rest] = solarSign.title.split(":");
              return (
                <>
                  <span>{main.trim()}</span>
                  <br />
                  <span className="text-[18px] md:text-[22px] text-on-surface/80 font-semibold">
                    {rest.join(":").trim()}
                  </span>
                </>
              );
            })()
          : solarSign.title}
      </h3>
      <p className="text-on-surface-variant text-body-md leading-relaxed w-full">
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
