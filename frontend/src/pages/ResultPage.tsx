import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Footer } from "../components/Footer";
import { getAstralMap } from "../services/api";
import type { AstralMap } from "../types/astral";
import { StarField } from "../components/StarField";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { ErrorView } from "../components/ErrorView";
import { UserProfileCard } from "../components/result/UserProfileCard";
import { SolarSignCard } from "../components/result/SolarSignCard";
import { AscendantCard } from "../components/result/AscendantCard";
import { CommitChart } from "../components/result/CommitChart";
import { BabelFishWidget } from "../components/result/BabelFishWidget";
import { AstrolabeSection } from "../components/result/AstrolabeSection";

export function ResultPage() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AstralMap | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    const controller = new AbortController();
    setLoading(true);
    setData(null);
    setError(null);

    getAstralMap(username, controller.signal)
      .then(setData)
      .catch((e) => {
        if (axios.isCancel(e)) return;
        const raw: string =
          e.response?.data?.message ?? "Server error occurred.";
        const translations: Record<string, string> = {
          "GitHub user not found.":
            "Usuário não encontrado no GitHub. Verifique o nome e tente novamente.",
          "Could not generate astral map, try again later.":
            "Mercúrio entrou em colapso quântico. Tente novamente em outro ciclo lunar.",
          "Could not generate babel fish, try again later.":
            "O Peixe de Babel está dormindo. Tente novamente.",
          "Server error occurred.":
            "Erro nos servidores cósmicos. Tente novamente mais tarde.",
        };
        setError(translations[raw] ?? raw);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [username]);

  return (
    <div className="font-body-md overflow-x-hidden min-h-screen flex flex-col">
      <StarField />
      {/* background orb — decorative, non-interactive */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 opacity-[0.06]"
        aria-hidden="true"
      >
        <div
          className="w-[700px] h-[700px] rounded-full border-4 border-dashed border-primary relative flex items-center justify-center"
          style={{ animation: "spin 90s linear infinite" }}
        >
          <div
            className="w-5 h-5 bg-secondary-fixed-dim rounded-full absolute -top-2.5"
            style={{ boxShadow: "0 0 16px #00e639" }}
          />
          <div
            className="w-5 h-5 bg-primary rounded-full absolute -bottom-2.5"
            style={{ boxShadow: "0 0 16px #ddb7ff" }}
          />
          <div
            className="w-[560px] h-[560px] rounded-full border border-secondary-fixed-dim/60 flex items-center justify-center"
            style={{ animation: "spin 45s linear infinite reverse" }}
          >
            <span
              className="material-symbols-outlined text-on-surface-variant"
              style={{ fontSize: "10rem" }}
            >
              language
            </span>
          </div>
        </div>
      </div>
      <header className="w-full px-gutter py-4 flex items-center justify-between border-b border-white/10 bg-background/60 backdrop-blur-xl">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-primary hover:text-secondary-fixed-dim transition-colors group"
        >
          <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          <span className="font-label-md text-label-md">Nova consulta</span>
        </button>
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-primary text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_awesome
          </span>
          <span className="font-headline-md text-headline-md text-primary tracking-tight hidden sm:block">
            Astrologia de Commits GitHub
          </span>
        </div>
        <div className="hidden sm:block w-28" />
      </header>
      <main className="flex-1 pt-8 pb-24 px-gutter max-w-max-width mx-auto w-full flex flex-col">
        {loading && <LoadingOverlay />}
        {error && <ErrorView message={error} />}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4 h-full">
              <UserProfileCard user={data.user} astrolabe={data.astrolabe} />
            </div>
            <div className="md:col-span-8 h-full">
              <SolarSignCard
                solarSign={data.solar_sign}
                analysisDate={data.user.analysis_date}
              />
            </div>
            <div className="md:col-span-8 h-full">
              <CommitChart temporalRhythm={data.temporal_rhythm} />
            </div>
            <div className="md:col-span-4 h-full">
              <AscendantCard ascendant={data.ascendant} />
            </div>
            <div className="md:col-span-5 h-full">
              <BabelFishWidget
                babelFish={data.babel_fish}
                username={data.user.username}
              />
            </div>
            <div className="md:col-span-7">
              <AstrolabeSection astrolabe={data.astrolabe} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
