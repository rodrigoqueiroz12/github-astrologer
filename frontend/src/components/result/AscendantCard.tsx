import type { AstralMap } from "../../types/astral";
import { GlassCard } from "../GlassCard";

interface Props {
  ascendant: AstralMap["ascendant"];
}

export function AscendantCard({ ascendant }: Props) {
  return (
    <GlassCard className="p-6 border-l-4 border-l-secondary-fixed-dim">
      <h4 className="font-label-md text-label-md text-secondary-fixed-dim mb-4">
        TRÂNSITO ASCENDENTE
      </h4>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-secondary-fixed-dim/10 rounded-lg">
          <span className="material-symbols-outlined text-secondary-fixed-dim">
            cyclone
          </span>
        </div>
        <div>
          <div className="text-on-surface font-bold">{ascendant.name}</div>
          <div className="text-outline text-body-sm">{ascendant.status}</div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-black/30 rounded-lg border border-white/5">
          <div className="text-on-surface-variant font-bold mb-1">
            {ascendant.title}
          </div>
          <div className="flex flex-wrap gap-2">
            {ascendant.tags.map((tag) => (
              <span
                key={tag}
                className="text-secondary-fixed-dim font-body-sm text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="text-body-sm text-outline italic">"{ascendant.quote}"</p>
      </div>
    </GlassCard>
  );
}
