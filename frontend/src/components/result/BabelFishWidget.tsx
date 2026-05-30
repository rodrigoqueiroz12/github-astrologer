import { useState } from "react";
import type { AstralMap } from "../../types/astral";
import { GlassCard } from "../GlassCard";
import { regenerateBabelFish } from "../../services/api";

interface Props {
  babelFish: AstralMap["babel_fish"];
  username: string;
}

export function BabelFishWidget({ babelFish, username }: Props) {
  const [current, setCurrent] = useState(babelFish);
  const [lines, setLines] = useState(babelFish.haiku.split("\n"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function realign() {
    setLoading(true);
    setError(null);
    try {
      const fresh = await regenerateBabelFish(username);
      setCurrent(fresh);
      setLines(fresh.haiku.split("\n"));
    } catch {
      setError("Mercúrio retrógrado bloqueou a transmissão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <GlassCard className="p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-on-tertiary-container">
            set_meal
          </span>
        </div>
        <div>
          <h4 className="font-bold text-on-surface leading-tight">
            Tradutor Peixe de Babel
          </h4>
          <p className="text-outline text-xs">commit → poesia cósmica</p>
        </div>
      </div>

      <div className="p-3 bg-black/50 rounded-lg border border-white/5 font-mono text-xs mb-4">
        <div className="text-secondary-fixed-dim mb-1 opacity-60">
          ENTRADA: {current.input_hash}
        </div>
        <p className="text-on-surface-variant leading-relaxed">
          {current.input_message}
        </p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <span
          className="material-symbols-outlined text-primary text-sm animate-bounce"
          style={{ animationDuration: "2s" }}
        >
          auto_awesome
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary-fixed-dim/30 to-transparent" />
      </div>

      <div className="flex-1 relative rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary-fixed-dim/5 overflow-hidden flex flex-col justify-center items-center p-6 mb-6 min-h-[140px]">
        <div
          className="absolute top-2 right-3 text-primary/10 text-7xl select-none"
          aria-hidden="true"
        >
          ✦
        </div>
        <div
          className="absolute bottom-2 left-3 text-secondary-fixed-dim/10 text-5xl select-none"
          aria-hidden="true"
        >
          ✦
        </div>
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <span
              className="material-symbols-outlined text-primary text-3xl"
              style={{ animation: "spin 1s linear infinite" }}
            >
              refresh
            </span>
            <p className="text-outline text-xs">Canalizando o cosmos...</p>
          </div>
        ) : (
          <div className="text-center transition-opacity duration-300">
            {lines.map((line, i) => (
              <p
                key={i}
                className="text-primary italic leading-loose"
                style={{ fontSize: i === 1 ? "1.05rem" : "0.95rem" }}
              >
                {line}
              </p>
            ))}
          </div>
        )}
        <div className="text-[10px] text-primary/40 font-bold uppercase tracking-widest mt-4">
          Astra-Haiku Gerado
        </div>
      </div>

      {error && <p className="text-error text-xs text-center mb-3">{error}</p>}

      <button
        onClick={realign}
        disabled={loading}
        className="w-full py-3 rounded-lg border border-primary/40 text-primary font-bold hover:bg-primary/10 hover:border-primary transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span
          className="material-symbols-outlined text-sm"
          style={loading ? { animation: "spin 1s linear infinite" } : undefined}
        >
          refresh
        </span>
        REALINHAR HARMÔNICOS
      </button>
    </GlassCard>
  );
}
