import type { AstralMap } from "../../types/astral";
import { GlassCard } from "../GlassCard";

interface Props {
  astrolabe: AstralMap["astrolabe"];
}

export function AstrolabeSection({ astrolabe }: Props) {
  return (
    <GlassCard className="p-6 md:p-12 flex flex-col items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-secondary-fixed-dim rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-secondary-fixed-dim/50 rounded-full" />
      </div>
      <div className="relative z-10 flex flex-col items-center w-full">
        <h4 className="font-headline-md text-headline-md text-on-surface mb-2">
          O Astrolábio Digital
        </h4>
        <p className="text-outline mb-8 md:mb-12 max-w-xl text-center text-body-sm">
          Calculando poços gravitacionais de repositórios e caminhos de
          sincronização de branches pelo multiverso.
        </p>
        <div
          className="hidden md:flex w-64 h-64 rounded-full border-4 border-dashed border-primary/40 items-center justify-center relative"
          style={{ animation: "spin 60s linear infinite" }}
        >
          <div
            className="w-4 h-4 bg-secondary-fixed-dim rounded-full absolute -top-2"
            style={{ boxShadow: "0 0 15px #00e639" }}
          />
          <div
            className="w-4 h-4 bg-primary rounded-full absolute -bottom-2"
            style={{ boxShadow: "0 0 15px #ddb7ff" }}
          />
          <div
            className="w-48 h-48 rounded-full border border-secondary-fixed-dim/30 flex items-center justify-center"
            style={{ animation: "spin 30s linear infinite reverse" }}
          >
            <span className="material-symbols-outlined text-6xl text-on-surface-variant opacity-20">
              language
            </span>
          </div>
        </div>
        <div className="mt-0 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-3xl">
          {[
            {
              value: astrolabe.orbital_cycles,
              label: "CICLOS ORBITAIS",
              color: "text-primary",
            },
            {
              value: String(astrolabe.zodiac_repos),
              label: "REPOS DO ZODÍACO",
              color: "text-secondary-fixed-dim",
            },
            {
              value: astrolabe.collaboration_flow,
              label: "FLUXO DE COLABORAÇÃO",
              color: "text-primary",
            },
            {
              value: astrolabe.constellation_phase,
              label: "FASE CONSTEL.",
              color: "text-secondary-fixed-dim",
            },
          ].map(({ value, label, color }) => (
            <div key={label} className="text-center">
              <div className={`text-headline-md font-headline-md ${color}`}>
                {value}
              </div>
              <div className="text-label-md text-outline">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
