import type { AstralMap } from "../../types/astral";
import { GlassCard } from "../GlassCard";

interface Props {
  user: AstralMap["user"];
}

export function UserProfileCard({ user }: Props) {
  return (
    <GlassCard className="p-6 flex flex-col items-center text-center">
      <div className="w-32 h-32 rounded-full border-2 border-primary p-1 mb-6">
        <img
          src={user.avatar_url}
          alt={user.username}
          className="w-full h-full rounded-full bg-surface-container object-cover"
        />
      </div>
      <h3 className="font-headline-md text-headline-md text-on-surface">
        @{user.username}
      </h3>
      <p className="text-outline font-label-md text-label-md mt-1">
        Análise: {user.analysis_date}
      </p>
      <div className="mt-6 w-full space-y-3">
        <div className="flex justify-between text-body-sm font-body-sm">
          <span className="text-on-surface-variant">Ciclo Orbital</span>
          <span className="text-secondary-fixed-dim">{user.lunar_cycle}</span>
        </div>
        <div className="flex justify-between text-body-sm font-body-sm">
          <span className="text-on-surface-variant">Alcance Cósmico</span>
          <span className="text-secondary-fixed-dim">{user.cosmic_reach}</span>
        </div>
      </div>
    </GlassCard>
  );
}
