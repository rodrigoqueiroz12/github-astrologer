import type { AstralMap } from "../../types/astral";
import { GlassCard } from "../GlassCard";

interface Props {
  user: AstralMap["user"];
  astrolabe: AstralMap["astrolabe"];
}

export function UserProfileCard({ user, astrolabe }: Props) {
  return (
    <GlassCard className="p-6 flex flex-col items-center text-center">
      <a
        href={`https://github.com/${user.username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group mb-6"
      >
        <div className="w-28 h-28 rounded-full border-2 border-primary/60 group-hover:border-primary p-1 transition-all group-hover:shadow-[0_0_20px_rgba(221,183,255,0.3)]">
          <img
            src={user.avatar_url}
            alt={user.username}
            className="w-full h-full rounded-full bg-surface-container object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${user.username}&background=1a1030&color=ddb7ff&size=128`;
            }}
          />
        </div>
      </a>

      <h3 className="font-headline-md text-headline-md text-on-surface">
        @{user.username}
      </h3>
      <p className="text-outline font-label-md text-label-md mt-1 mb-6">
        Análise: {user.analysis_date}
      </p>

      <div className="w-full space-y-3 border-t border-white/5 pt-5">
        <div className="flex justify-between text-body-sm font-body-sm">
          <span className="text-on-surface-variant">Ciclo Orbital</span>
          <span className="text-secondary-fixed-dim font-medium">
            {user.lunar_cycle}
          </span>
        </div>
        <div className="flex justify-between text-body-sm font-body-sm">
          <span className="text-on-surface-variant">Alcance Cósmico</span>
          <span className="text-secondary-fixed-dim font-medium">
            {user.cosmic_reach}
          </span>
        </div>
        <div className="flex justify-between text-body-sm font-body-sm">
          <span className="text-on-surface-variant">Repositórios</span>
          <span className="text-primary font-medium">
            {astrolabe.zodiac_repos}
          </span>
        </div>
        <div className="flex justify-between text-body-sm font-body-sm">
          <span className="text-on-surface-variant">Fase</span>
          <span className="text-primary font-medium truncate ml-2 max-w-[120px] text-right">
            {astrolabe.constellation_phase}
          </span>
        </div>
        <div className="flex justify-between text-body-sm font-body-sm">
          <span className="text-on-surface-variant">Colaboração</span>
          <span className="text-primary font-medium truncate ml-2 max-w-[120px] text-right">
            {astrolabe.collaboration_flow}
          </span>
        </div>
      </div>

      <a
        href={`https://github.com/${user.username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-white/10 text-outline text-label-md font-label-md hover:border-primary/40 hover:text-primary transition-colors"
      >
        <span className="material-symbols-outlined text-sm">open_in_new</span>
        Ver no GitHub
      </a>
    </GlassCard>
  );
}
