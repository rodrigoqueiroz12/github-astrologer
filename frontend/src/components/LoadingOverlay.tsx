import { useEffect, useState } from "react";

const MESSAGES = [
  "Lendo as estrelas e ignorando o .gitignore...",
  "Calculando posição de Mercúrio Retrógrado...",
  "Consultando o oráculo do npm install...",
  "Alinhando chakras do seu histórico de commits...",
  "Decifrando presságios de conflito de merge...",
];

export function LoadingOverlay() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-12">
      <div
        className="w-64 h-64 rounded-full border-4 border-dashed border-primary/40 flex items-center justify-center relative"
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
      <p className="font-body-md text-body-md text-on-surface-variant text-center max-w-sm px-4">
        {MESSAGES[msgIndex]}
      </p>
    </div>
  );
}
