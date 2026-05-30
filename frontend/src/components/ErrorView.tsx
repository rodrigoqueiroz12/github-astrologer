import { useNavigate } from "react-router-dom";
import { GlassCard } from "./GlassCard";

interface Props {
  message?: string;
}

const FALLBACK =
  "Seu repositório é um buraco negro. Vida inteligente: não encontrada.";

export function ErrorView({ message }: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center px-gutter">
      <GlassCard className="p-12 max-w-lg w-full text-center">
        <span className="material-symbols-outlined text-6xl text-error mb-4 block">
          dark_mode
        </span>
        <p className="font-body-lg text-body-lg text-on-surface mb-8">
          {message || FALLBACK}
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-8 py-3 rounded-lg border border-primary/50 text-primary font-bold hover:bg-primary/10 transition-colors"
        >
          Tentar Outro Usuário
        </button>
      </GlassCard>
    </div>
  );
}
