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
      <div className="mb-6" />

      <div className="w-full space-y-4 border-t border-white/5 pt-5 text-left">
        <div>
          <p className="text-label-sm text-outline uppercase tracking-wider mb-1">
            Ciclo Orbital
          </p>
          <p className="text-body-sm text-secondary-fixed-dim font-medium line-clamp-2">
            {user.lunar_cycle}
          </p>
        </div>
        <div>
          <p className="text-label-sm text-outline uppercase tracking-wider mb-1">
            Alcance Cósmico
          </p>
          <p className="text-body-sm text-secondary-fixed-dim font-medium line-clamp-2">
            {user.cosmic_reach}
          </p>
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
