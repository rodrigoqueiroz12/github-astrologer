import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { StarField } from "../components/StarField";

export function HomePage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) {
      setError("Insira um usuário do GitHub para consultar os astros.");
      return;
    }
    navigate(`/result/${trimmed}`);
  }

  return (
    <div className="font-body-md overflow-x-hidden min-h-screen flex flex-col">
      <StarField />
      <NavBar />
      <main className="flex-1 flex items-center px-gutter py-24">
        <section className="flex flex-col items-center text-center w-full max-w-max-width mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/20 text-primary border border-primary/20 mb-6 font-label-md text-label-md">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stars
            </span>
            ANÁLISE ORBITAL FASE 2.4 ATIVA
          </div>
          <h2 className="font-headline-xl text-[28px] md:text-headline-xl text-on-surface mb-8 max-w-3xl">
            Decifre o Padrão do seu Código Cósmico
          </h2>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary-fixed-dim rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
            <div className="relative flex flex-col md:flex-row gap-4 p-2 bg-surface-container-low rounded-xl border border-white/10">
              <div className="flex-grow flex items-center px-4">
                <span className="text-secondary-fixed-dim font-bold italic mr-2">
                  github.com/
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  placeholder="usuário..."
                  autoFocus
                  className="bg-transparent border-none text-on-surface placeholder:text-outline focus:ring-0 w-full font-body-lg text-body-lg outline-none caret-[#00e639] italic"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-on-primary font-bold px-8 py-4 rounded-lg flex items-center justify-center gap-2 whitespace-nowrap hover:bg-secondary-fixed-dim hover:text-on-primary hover:shadow-[0_0_20px_rgba(0,230,57,0.4)] transition-all active:scale-95"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  glass_cup
                </span>
                Gerar Mapa Astral
              </button>
            </div>
          </form>
          {error && (
            <p className="mt-3 text-error font-body-sm text-body-sm">{error}</p>
          )}
          <p className="mt-4 text-on-surface-variant font-body-sm text-body-sm">
            Escaneando histórico de commits em busca de alinhamentos celestiais
            e presságios de conflitos de merge.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
