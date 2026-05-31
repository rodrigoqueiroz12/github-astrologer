import type { AstralMap } from "../../types/astral";
import { GlassCard } from "../GlassCard";

interface Props {
  astrolabe: AstralMap["astrolabe"];
}

export function AstrolabeSection({ astrolabe }: Props) {
  return (
    <GlassCard className="p-6 relative overflow-hidden h-full">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-secondary-fixed-dim rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary rounded-full" />
      </div>
      <div className="relative z-10 flex flex-col items-center w-full h-full justify-between gap-6">
        <div className="flex flex-col items-center w-full">
          <h4 className="font-headline-md text-headline-md text-on-surface mb-1">
            O Astrolábio Digital
          </h4>
          <p className="text-outline text-body-sm text-center max-w-md">
            Calculando poços gravitacionais de repositórios e caminhos de
            sincronização de branches pelo multiverso.
          </p>
        </div>
        <blockquote className="w-full border-l-2 border-primary/60 pl-4 italic text-on-surface-variant text-body-md leading-relaxed">
          {astrolabe.orbital_cycles}
        </blockquote>
        <div className="grid grid-cols-3 gap-6 w-full">
          <div className="text-center">
            <div className="text-[2.5rem] font-bold leading-none text-secondary-fixed-dim">
              {astrolabe.zodiac_repos}
            </div>
            <div className="text-label-md text-outline mt-1">
              REPOS DO ZODÍACO
            </div>
          </div>
          <div className="text-center">
            <div className="text-body-sm text-primary leading-snug line-clamp-3" title={astrolabe.collaboration_flow}>
              {astrolabe.collaboration_flow}
            </div>
            <div className="text-label-md text-outline mt-2">
              FLUXO DE COLABORAÇÃO
            </div>
          </div>
          <div className="text-center">
            <div className="text-body-sm text-secondary-fixed-dim leading-snug line-clamp-3" title={astrolabe.constellation_phase}>
              {astrolabe.constellation_phase}
            </div>
            <div className="text-label-md text-outline mt-2">FASE CONSTEL.</div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
