import { useState } from "react";
import type { AstralMap } from "../../types/astral";
import { GlassCard } from "../GlassCard";

interface Props {
  babelFish: AstralMap["babel_fish"];
}

export function BabelFishWidget({ babelFish }: Props) {
  const [enabled, setEnabled] = useState(true);
  const [lines, setLines] = useState(babelFish.haiku.split("\n"));

  function realign() {
    setLines((prev) => [...prev].sort(() => Math.random() - 0.5));
  }

  return (
    <GlassCard className="p-6 flex flex-col bg-gradient-to-br from-surface-container to-surface-container-highest border-primary/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-tertiary-container">
              set_meal
            </span>
          </div>
          <h4 className="font-bold text-on-surface">Tradutor Peixe de Babel</h4>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
        </label>
      </div>
      <div className="flex-grow space-y-4">
        <div className="p-3 bg-black/40 rounded border border-white/5 font-body-sm text-xs text-outline overflow-hidden">
          <div className="text-secondary-fixed-dim mb-1 opacity-50">
            ENTRADA: {babelFish.input_hash}
          </div>
          <p>{babelFish.input_message}</p>
        </div>
        <div className="flex justify-center py-2">
          <span className="material-symbols-outlined text-primary animate-bounce">
            expand_more
          </span>
        </div>
        <div className="p-4 bg-primary/10 rounded border border-primary/30 min-h-[100px] flex flex-col justify-center items-center text-center">
          {enabled ? (
            <>
              <p className="text-primary italic mb-2">
                {lines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < lines.length - 1 && <br />}
                  </span>
                ))}
              </p>
              <div className="text-[10px] text-primary/60 font-bold uppercase tracking-widest">
                Astra-Haiku Gerado
              </div>
            </>
          ) : (
            <p className="text-outline font-label-md text-label-md tracking-widest">
              {babelFish.input_hash}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={realign}
        className="mt-6 w-full py-3 rounded-lg border border-primary/50 text-primary font-bold hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined text-sm">refresh</span>
        REALINHAR HARMÔNICOS
      </button>
    </GlassCard>
  );
}
