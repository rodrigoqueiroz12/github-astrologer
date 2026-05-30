import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
        if (e.name === "CanceledError") return;
        setError(
          e.response?.data?.error ??
            "Mercúrio entrou em colapso quântico. Tente novamente em outro ciclo lunar.",
        );
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [username]);

  return (
    <div className="font-body-md overflow-x-hidden">
      <StarField />
      <main className="pt-12 pb-24 px-gutter max-w-max-width mx-auto">
        {loading && <LoadingOverlay />}
        {error && <ErrorView message={error} />}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4 lg:col-span-3">
              <UserProfileCard user={data.user} />
            </div>
            <div className="md:col-span-8 lg:col-span-6">
              <SolarSignCard solarSign={data.solar_sign} />
            </div>
            <div className="md:col-span-12 lg:col-span-3">
              <AscendantCard ascendant={data.ascendant} />
            </div>
            <div className="md:col-span-8">
              <CommitChart temporalRhythm={data.temporal_rhythm} />
            </div>
            <div className="md:col-span-4">
              <BabelFishWidget babelFish={data.babel_fish} />
            </div>
            <div className="md:col-span-12">
              <AstrolabeSection astrolabe={data.astrolabe} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
