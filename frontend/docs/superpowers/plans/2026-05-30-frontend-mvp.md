# Frontend MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the GitHub Commit Astrologer React frontend — search input, astral map result page, loading/error states, Babel Fish widget, and Docker support.

**Architecture:** Vite SPA with React Router (2 routes: `/` and `/result/:username`). All state local to each page component. Mock service layer decoupled from real API via env flag. Prototype HTML (`code.html`) is the reference for all UI — port it component by component.

**Tech Stack:** Vite + React 18 + TypeScript 5 + React Router v7 + Axios + Tailwind CSS v3 + Google Fonts (Sora + JetBrains Mono) + Material Symbols

> **Note:** No unit tests — explicitly out of scope per design doc (hackathon MVP).

---

## File Map

```
frontend/
  src/
    types/
      astral.ts                   # AstralMap interface (single source of truth)
    services/
      api.ts                      # getAstralMap(username, signal?)
      mockData.ts                 # mock AstralMap for VITE_USE_MOCK=true
    components/
      StarField.tsx               # fixed star background (JS-generated)
      GlassCard.tsx               # glassmorphism card wrapper
      NavBar.tsx                  # fixed top navigation
      LoadingOverlay.tsx          # astrolabe spinner + rotating messages
      ErrorView.tsx               # astro-flavored error + CTA
      result/
        UserProfileCard.tsx       # avatar, username, analysis_date, lunar_cycle, cosmic_reach
        SolarSignCard.tsx         # solar_sign.title, description, tags
        AscendantCard.tsx         # ascendant.* + severity border
        CommitChart.tsx           # temporal_rhythm bar chart
        BabelFishWidget.tsx       # toggle + haiku shuffle
        AstrolabeSection.tsx      # decorative circles + astrolabe.* stats
    pages/
      HomePage.tsx                # search hero
      ResultPage.tsx              # 12-col grid, fetch with AbortController
    App.tsx                       # React Router setup
    main.tsx                      # entry point
    index.css                     # global styles (glass-card, star-field, body nebula)
  index.html                      # fonts + Material Symbols CDN links
  tailwind.config.ts              # full config from DESIGN.md
  vite.config.ts                  # proxy /api → backend
  .env.local                      # VITE_USE_MOCK, VITE_API_BASE_URL
  Dockerfile                      # node:20-alpine, --host 0.0.0.0
```

---

### Task 1: Project Setup + Tailwind Config

**Files:**

- Run in: `frontend/`
- Create: `tailwind.config.ts`
- Create: `src/index.css`
- Modify: `index.html`
- Create: `vite.config.ts`
- Create: `.env.local`

- [ ] **Step 1: Scaffold Vite project**

```bash
cd /path/to/github-astrologer/frontend
npm create vite@latest . -- --template react-ts
# quando perguntar se quer sobrescrever: y
```

- [ ] **Step 2: Install dependencies**

```bash
npm install react-router-dom axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p --ts
```

- [ ] **Step 3: Configure Tailwind**

Substitua o conteúdo de `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "tertiary-fixed": "#c9e6ff",
        "outline-variant": "#4d4354",
        "surface-container-low": "#181b25",
        "on-tertiary-container": "#002d43",
        outline: "#988d9f",
        "on-secondary-fixed": "#002203",
        "on-primary-fixed": "#2c0051",
        "on-surface": "#dfe2ef",
        "on-primary-container": "#400071",
        error: "#ffb4ab",
        "secondary-container": "#13ff43",
        "on-tertiary-fixed-variant": "#004c6e",
        "inverse-primary": "#842bd2",
        "on-primary-fixed-variant": "#6900b3",
        "surface-dim": "#0f131c",
        "on-secondary": "#003907",
        background: "#0f131c",
        "primary-fixed": "#f0dbff",
        secondary: "#ecffe3",
        "on-secondary-fixed-variant": "#00530e",
        "on-secondary-container": "#007117",
        "on-background": "#dfe2ef",
        "on-surface-variant": "#cfc2d6",
        "surface-tint": "#ddb7ff",
        "on-tertiary": "#00334d",
        "error-container": "#93000a",
        "primary-container": "#b76dff",
        "tertiary-fixed-dim": "#89ceff",
        "primary-fixed-dim": "#ddb7ff",
        "inverse-on-surface": "#2c303a",
        "tertiary-container": "#009ada",
        primary: "#ddb7ff",
        "on-primary": "#490080",
        "on-error": "#690005",
        "surface-container": "#1c1f29",
        surface: "#0f131c",
        "on-error-container": "#ffdad6",
        "surface-bright": "#353943",
        tertiary: "#89ceff",
        "inverse-surface": "#dfe2ef",
        "secondary-fixed-dim": "#00e639",
        "surface-container-highest": "#31353f",
        "surface-container-high": "#262a34",
        "secondary-fixed": "#72ff70",
        "on-tertiary-fixed": "#001e2f",
        "surface-container-lowest": "#0a0e17",
        "surface-variant": "#31353f",
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
      spacing: {
        gutter: "24px",
        "margin-desktop": "48px",
        "max-width": "1280px",
        "margin-mobile": "16px",
        unit: "4px",
      },
      fontFamily: {
        "headline-xl": ["Sora"],
        "body-md": ["JetBrains Mono"],
        "body-sm": ["JetBrains Mono"],
        "body-lg": ["JetBrains Mono"],
        "label-md": ["JetBrains Mono"],
        "headline-lg": ["Sora"],
        "headline-lg-mobile": ["Sora"],
        "headline-md": ["Sora"],
      },
      fontSize: {
        "headline-xl": [
          "48px",
          { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "label-md": ["12px", { lineHeight: "16px", fontWeight: "700" }],
        "headline-lg": [
          "32px",
          { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "headline-lg-mobile": [
          "28px",
          { lineHeight: "36px", fontWeight: "600" },
        ],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
      },
    },
  },
  plugins: [],
} satisfies Config;
```

- [ ] **Step 4: Global CSS**

Substitua `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #0a0e17;
  background-image:
    radial-gradient(
      circle at 20% 30%,
      rgba(132, 43, 210, 0.08) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(0, 230, 57, 0.05) 0%,
      transparent 50%
    );
  color: #dfe2ef;
}

.glass-card {
  background: rgba(16, 20, 30, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.glass-card:hover {
  border-color: rgba(221, 183, 255, 0.3);
  transform: translateY(-2px);
}

.mystical-border {
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.mystical-border::after {
  content: "";
  position: absolute;
  inset: -1px;
  background: linear-gradient(
    45deg,
    #ddb7ff,
    transparent,
    #00e639,
    transparent
  );
  z-index: -1;
  border-radius: inherit;
  opacity: 0.3;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
.terminal-cursor {
  display: inline-block;
  width: 8px;
  height: 18px;
  background: #00e639;
  animation: blink 1s step-end infinite;
  vertical-align: middle;
}

@keyframes pulse-star {
  0% {
    opacity: 0.2;
    transform: scale(0.8);
  }
  100% {
    opacity: 0.8;
    transform: scale(1.2);
  }
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #0a0e17;
}
::-webkit-scrollbar-thumb {
  background: #31353f;
  border-radius: 3px;
}
```

- [ ] **Step 5: Add fonts to index.html**

```html
<!doctype html>
<html lang="pt-BR" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>
      Astrologia de Commits GitHub | Seu Código Está Escrito nas Estrelas
    </title>
    <link
      href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Sora:wght@400;600;700;800&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Configure Vite proxy**

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_BASE_URL || "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
```

- [ ] **Step 7: Create .env.local**

```
VITE_USE_MOCK=true
VITE_API_BASE_URL=http://localhost:8000
```

- [ ] **Step 8: Verify dev server starts**

```bash
npm run dev
```

Esperado: servidor em `http://localhost:5173` sem erros.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore(frontend): setup vite + react + tailwind + fonts"
```

---

### Task 2: Types + Mock Data

**Files:**

- Create: `src/types/astral.ts`
- Create: `src/services/mockData.ts`

- [ ] **Step 1: Create AstralMap interface**

```ts
// src/types/astral.ts
export interface AstralMap {
  user: {
    username: string;
    avatar_url: string;
    analysis_date: string;
    lunar_cycle: string;
    cosmic_reach: string;
  };
  solar_sign: {
    title: string;
    description: string;
    tags: string[];
  };
  ascendant: {
    name: string;
    status: string;
    title: string;
    tags: string[];
    quote: string;
  };
  temporal_rhythm: {
    sync_rate: string;
    chart_data: {
      SEG: number;
      TER: number;
      QUA: number;
      QUI: number;
      SEX: number;
      SAB: number;
      DOM: number;
    };
  };
  babel_fish: {
    input_hash: string;
    input_message: string;
    haiku: string;
  };
  astrolabe: {
    orbital_cycles: string;
    zodiac_repos: number;
    collaboration_flow: string;
    constellation_phase: string;
  };
}

export interface ApiError {
  error: string;
}
```

- [ ] **Step 2: Create mock data**

```ts
// src/services/mockData.ts
import type { AstralMap } from "../types/astral";

export function mockAstralMap(username: string): AstralMap {
  return {
    user: {
      username,
      avatar_url: `https://avatars.githubusercontent.com/u/5832347?v=4`,
      analysis_date: new Date().toLocaleDateString("pt-BR"),
      lunar_cycle: "Ciclo Lunar 4",
      cosmic_reach: "Top 2%",
    },
    solar_sign: {
      title: "Java da Madrugada",
      description:
        'Sua aura de código irradia com a intensidade de mil máquinas de café expresso queimando. Você prospera nas horas sombrias, tecendo fios intrincados de concorrência enquanto o resto do mundo dorme. As estrelas sugerem que seu próximo push será lendário, desde que os níveis de cafeína permaneçam no estado crítico de "Zênite Elevado".',
      tags: ["PROGRAMADOR_VIGILANTE", "ÓRBITA_JAVA"],
    },
    ascendant: {
      name: "Mercúrio Retrógit",
      status: "Interferência Ativa",
      title: "Programador Noturno",
      tags: ["#ProfeciaDoBug", "#SorteNoStackOverflow"],
      quote:
        "Um force-push durante esta fase levará a uma transformação inesperada do repositório.",
    },
    temporal_rhythm: {
      sync_rate: "94%",
      chart_data: {
        SEG: 40,
        TER: 65,
        QUA: 90,
        QUI: 55,
        SEX: 45,
        SAB: 75,
        DOM: 30,
      },
    },
    babel_fish: {
      input_hash: "0xf3a1b2c",
      input_message:
        "feat: implement celestial rendering engine for star chart visualization [v2.0]",
      haiku:
        "A lua brilha no código 🌙\nMapas astrais florescem em neon ✨\nA branch main está em paz 🌌",
    },
    astrolabe: {
      orbital_cycles: "42.1k",
      zodiac_repos: 5,
      collaboration_flow: "Alta",
      constellation_phase: "Alfa",
    },
  };
}
```

- [ ] **Step 3: Commit**

```bash
git add src/types/astral.ts src/services/mockData.ts
git commit -m "feat(frontend): add AstralMap types and mock data"
```

---

### Task 3: API Service

**Files:**

- Create: `src/services/api.ts`

- [ ] **Step 1: Create api.ts**

```ts
// src/services/api.ts
import axios from "axios";
import type { AstralMap } from "../types/astral";
import { mockAstralMap } from "./mockData";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 8000,
});

export async function getAstralMap(
  username: string,
  signal?: AbortSignal,
): Promise<AstralMap> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 1500)); // simula latência
    return mockAstralMap(username);
  }
  const { data } = await client.get<AstralMap>(`/api/astral/${username}`, {
    signal,
  });
  return data;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/services/api.ts
git commit -m "feat(frontend): add API service with mock flag and AbortController support"
```

---

### Task 4: Base Components

**Files:**

- Create: `src/components/StarField.tsx`
- Create: `src/components/GlassCard.tsx`
- Create: `src/components/NavBar.tsx`
- Create: `src/components/ErrorView.tsx`

- [ ] **Step 1: StarField**

```tsx
// src/components/StarField.tsx
import { useEffect, useRef } from "react";

export function StarField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    for (let i = 0; i < 150; i++) {
      const star = document.createElement("div");
      const size = Math.random() * 2;
      const duration = 2 + Math.random() * 5;
      star.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        background-color: #fff;
        border-radius: 50%;
        opacity: ${Math.random()};
        box-shadow: 0 0 ${size * 2}px #fff;
        animation: pulse-star ${duration}s infinite alternate;
      `;
      container.appendChild(star);
    }

    return () => {
      while (container.firstChild) container.removeChild(container.firstChild);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-40"
      style={{ zIndex: -1 }}
    />
  );
}
```

- [ ] **Step 2: GlassCard**

```tsx
// src/components/GlassCard.tsx
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: Props) {
  return <div className={`glass-card rounded-xl ${className}`}>{children}</div>;
}
```

- [ ] **Step 3: NavBar**

```tsx
// src/components/NavBar.tsx
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-gutter py-4 max-w-max-width mx-auto left-0 right-0 bg-background/60 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center gap-4">
        <span
          className="material-symbols-outlined text-primary text-4xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          auto_awesome
        </span>
        <Link
          to="/"
          className="font-headline-md text-headline-md text-primary tracking-tight"
        >
          Astrologia de Commits GitHub
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <span className="text-primary font-bold border-b-2 border-primary pb-1">
          Mapas Astrais
        </span>
        <span className="text-on-surface-variant font-medium">
          Constelações
        </span>
        <span className="text-on-surface-variant font-medium">Zodíaco</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-primary cursor-pointer">
          settings
        </span>
        <span className="material-symbols-outlined text-primary cursor-pointer">
          auto_awesome
        </span>
      </div>
    </nav>
  );
}
```

- [ ] **Step 4: ErrorView**

```tsx
// src/components/ErrorView.tsx
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
    <div className="flex items-center justify-center min-h-[60vh] px-gutter">
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
```

- [ ] **Step 5: Commit**

```bash
git add src/components/
git commit -m "feat(frontend): add StarField, GlassCard, NavBar, ErrorView components"
```

---

### Task 5: LoadingOverlay

**Files:**

- Create: `src/components/LoadingOverlay.tsx`

- [ ] **Step 1: Create LoadingOverlay**

```tsx
// src/components/LoadingOverlay.tsx
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
      {/* Astrolabe */}
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

      {/* Mensagem rotativa */}
      <p className="font-body-md text-body-md text-on-surface-variant text-center max-w-sm px-4">
        {MESSAGES[msgIndex]}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LoadingOverlay.tsx
git commit -m "feat(frontend): add LoadingOverlay with astrolabe animation"
```

---

### Task 6: App Router

**Files:**

- Modify: `src/App.tsx`
- Modify: `src/main.tsx`

- [ ] **Step 1: Setup App.tsx com rotas**

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ResultPage } from "./pages/ResultPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/result/:username" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

- [ ] **Step 2: main.tsx**

```tsx
// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 3: Criar stubs das páginas para evitar erro de import**

```tsx
// src/pages/HomePage.tsx (stub)
export function HomePage() {
  return <div>Home</div>;
}
```

```tsx
// src/pages/ResultPage.tsx (stub)
export function ResultPage() {
  return <div>Result</div>;
}
```

- [ ] **Step 4: Verificar que o app compila sem erros**

```bash
npm run dev
```

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/main.tsx src/pages/
git commit -m "feat(frontend): setup React Router with home and result routes"
```

---

### Task 7: HomePage

**Files:**

- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Implementar HomePage**

```tsx
// src/pages/HomePage.tsx
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="font-body-md overflow-x-hidden">
      <StarField />
      <NavBar />

      <main className="pt-32 pb-24 px-gutter max-w-max-width mx-auto">
        <section className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/20 text-primary border border-primary/20 mb-6 font-label-md text-label-md">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stars
            </span>
            ANÁLISE ORBITAL FASE 2.4 ATIVA
          </div>

          {/* Headline */}
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-8 max-w-3xl">
            Decifre o Padrão do seu Código Cósmico
          </h2>

          {/* Search form */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary-fixed-dim rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
            <div className="relative flex flex-col md:flex-row gap-4 p-2 bg-surface-container-low rounded-xl border border-white/10">
              <div className="flex-grow flex items-center px-4">
                <span className="text-secondary-fixed-dim font-bold mr-2">
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
                  className="bg-transparent border-none text-on-surface placeholder:text-outline focus:ring-0 w-full font-body-lg text-body-lg outline-none"
                />
                <span className="terminal-cursor" />
              </div>
              <button
                type="submit"
                className="bg-primary text-on-primary font-bold px-8 py-4 rounded-lg flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(221,183,255,0.4)] transition-all active:scale-95"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  glass_cup
                </span>
                Gerar Mapa Astral Dev
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
    </div>
  );
}
```

- [ ] **Step 2: Testar manualmente**

Abrir `http://localhost:5173`:

- [ ] Hero visível com headline e input
- [ ] Submit com campo vazio mostra erro inline
- [ ] Submit com username navega para `/result/octocat`

- [ ] **Step 3: Commit**

```bash
git add src/pages/HomePage.tsx
git commit -m "feat(frontend): implement HomePage with search form"
```

---

### Task 8: Result Cards — UserProfileCard + SolarSignCard + AscendantCard

**Files:**

- Create: `src/components/result/UserProfileCard.tsx`
- Create: `src/components/result/SolarSignCard.tsx`
- Create: `src/components/result/AscendantCard.tsx`

- [ ] **Step 1: UserProfileCard**

```tsx
// src/components/result/UserProfileCard.tsx
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
```

- [ ] **Step 2: SolarSignCard**

```tsx
// src/components/result/SolarSignCard.tsx
import type { AstralMap } from "../../types/astral";
import { GlassCard } from "../GlassCard";

interface Props {
  solarSign: AstralMap["solar_sign"];
}

export function SolarSignCard({ solarSign }: Props) {
  return (
    <GlassCard className="p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <span
          className="material-symbols-outlined text-primary/20 text-8xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          nightlight
        </span>
      </div>
      <h4 className="font-label-md text-label-md text-primary mb-2 flex items-center gap-2">
        <span className="material-symbols-outlined text-sm">wb_sunny</span>
        SIGNO SOLAR
      </h4>
      <h3 className="font-headline-xl text-headline-xl text-on-surface mb-4">
        Elemento Dominante: {solarSign.title}
      </h3>
      <p className="text-on-surface-variant text-body-md leading-relaxed max-w-lg">
        {solarSign.description}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        {solarSign.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded bg-surface-container-highest border border-white/5 text-primary text-label-md font-label-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}
```

- [ ] **Step 3: AscendantCard**

```tsx
// src/components/result/AscendantCard.tsx
import type { AstralMap } from "../../types/astral";
import { GlassCard } from "../GlassCard";

interface Props {
  ascendant: AstralMap["ascendant"];
}

export function AscendantCard({ ascendant }: Props) {
  return (
    <GlassCard className="p-6 border-l-4 border-l-secondary-fixed-dim">
      <h4 className="font-label-md text-label-md text-secondary-fixed-dim mb-4">
        TRÂNSITO ASCENDENTE
      </h4>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-secondary-fixed-dim/10 rounded-lg">
          <span className="material-symbols-outlined text-secondary-fixed-dim">
            cyclone
          </span>
        </div>
        <div>
          <div className="text-on-surface font-bold">{ascendant.name}</div>
          <div className="text-outline text-body-sm">{ascendant.status}</div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-black/30 rounded-lg border border-white/5">
          <div className="text-on-surface-variant font-bold mb-1">
            {ascendant.title}
          </div>
          <div className="flex flex-wrap gap-2">
            {ascendant.tags.map((tag) => (
              <span
                key={tag}
                className="text-secondary-fixed-dim font-body-sm text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="text-body-sm text-outline italic">"{ascendant.quote}"</p>
      </div>
    </GlassCard>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/result/
git commit -m "feat(frontend): add UserProfileCard, SolarSignCard, AscendantCard"
```

---

### Task 9: CommitChart + BabelFishWidget

**Files:**

- Create: `src/components/result/CommitChart.tsx`
- Create: `src/components/result/BabelFishWidget.tsx`

- [ ] **Step 1: CommitChart**

```tsx
// src/components/result/CommitChart.tsx
import type { AstralMap } from "../../types/astral";
import { GlassCard } from "../GlassCard";

interface Props {
  temporalRhythm: AstralMap["temporal_rhythm"];
}

const DAY_ORDER = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"] as const;

export function CommitChart({ temporalRhythm }: Props) {
  const { chart_data, sync_rate } = temporalRhythm;
  const maxValue = Math.max(...Object.values(chart_data));

  return (
    <GlassCard className="p-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h4 className="font-headline-md text-headline-md text-on-surface">
            Ritmo Temporal
          </h4>
          <p className="text-outline text-body-sm">
            Velocidade Semanal de Commits no Plano Orbital
          </p>
        </div>
        <div className="text-right">
          <span className="text-secondary-fixed-dim text-headline-md font-bold">
            {sync_rate}
          </span>
          <p className="text-outline text-label-md font-label-md">
            TAXA DE SYNC
          </p>
        </div>
      </div>

      <div className="flex items-end justify-between h-48 gap-2">
        {DAY_ORDER.map((day) => {
          const value = chart_data[day];
          const heightPct = maxValue > 0 ? (value / maxValue) * 100 : 0;
          return (
            <div
              key={day}
              className="flex-1 relative group"
              style={{
                height: "100%",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <div
                className="w-full bg-secondary-fixed-dim/20 hover:bg-secondary-fixed-dim transition-colors rounded-t-sm relative"
                style={{ height: `${heightPct}%` }}
              >
                <div className="hidden group-hover:block absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] bg-secondary-fixed text-on-secondary px-1 rounded whitespace-nowrap">
                  {value} commits
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-4 text-outline font-label-md text-label-md">
        {DAY_ORDER.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
    </GlassCard>
  );
}
```

- [ ] **Step 2: BabelFishWidget**

```tsx
// src/components/result/BabelFishWidget.tsx
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
      {/* Header */}
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

      {/* Input */}
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

        {/* Output */}
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
```

- [ ] **Step 3: Commit**

```bash
git add src/components/result/CommitChart.tsx src/components/result/BabelFishWidget.tsx
git commit -m "feat(frontend): add CommitChart and BabelFishWidget"
```

---

### Task 10: AstrolabeSection

**Files:**

- Create: `src/components/result/AstrolabeSection.tsx`

- [ ] **Step 1: Implementar AstrolabeSection**

```tsx
// src/components/result/AstrolabeSection.tsx
import type { AstralMap } from "../../types/astral";
import { GlassCard } from "../GlassCard";

interface Props {
  astrolabe: AstralMap["astrolabe"];
}

export function AstrolabeSection({ astrolabe }: Props) {
  return (
    <GlassCard className="p-12 flex flex-col items-center justify-center overflow-hidden relative">
      {/* Decorative rings */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-secondary-fixed-dim rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-secondary-fixed-dim/50 rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <h4 className="font-headline-md text-headline-md text-on-surface mb-2">
          O Astrolábio Digital
        </h4>
        <p className="text-outline mb-12 max-w-xl text-center">
          Calculando poços gravitacionais de repositórios e caminhos de
          sincronização de branches pelo multiverso.
        </p>

        {/* Spinning astrolabe */}
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

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-3xl">
          {[
            {
              value: astrolabe.orbital_cycles,
              label: "CICLOS ORBITAIS",
              color: "text-primary",
            },
            {
              value: String(astrolabe.zodiac_repos),
              label: "REPOS DO ZODÍACO",
              color: "text-secondary-fixed-dim",
            },
            {
              value: astrolabe.collaboration_flow,
              label: "FLUXO DE COLABORAÇÃO",
              color: "text-primary",
            },
            {
              value: astrolabe.constellation_phase,
              label: "FASE CONSTEL.",
              color: "text-secondary-fixed-dim",
            },
          ].map(({ value, label, color }) => (
            <div key={label} className="text-center">
              <div className={`text-headline-md font-headline-md ${color}`}>
                {value}
              </div>
              <div className="text-label-md text-outline">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/result/AstrolabeSection.tsx
git commit -m "feat(frontend): add AstrolabeSection with spinning animation and stats"
```

---

### Task 11: ResultPage

**Files:**

- Modify: `src/pages/ResultPage.tsx`

- [ ] **Step 1: Implementar ResultPage com fetch + grid**

```tsx
// src/pages/ResultPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAstralMap } from "../services/api";
import type { AstralMap } from "../types/astral";
import { NavBar } from "../components/NavBar";
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
      <NavBar />

      <main className="pt-32 pb-24 px-gutter max-w-max-width mx-auto">
        {loading && <LoadingOverlay />}
        {error && <ErrorView message={error} />}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Row 1 */}
            <div className="md:col-span-4 lg:col-span-3">
              <UserProfileCard user={data.user} />
            </div>
            <div className="md:col-span-8 lg:col-span-6">
              <SolarSignCard solarSign={data.solar_sign} />
            </div>
            <div className="md:col-span-12 lg:col-span-3">
              <AscendantCard ascendant={data.ascendant} />
            </div>

            {/* Row 2 */}
            <div className="md:col-span-8">
              <CommitChart temporalRhythm={data.temporal_rhythm} />
            </div>
            <div className="md:col-span-4">
              <BabelFishWidget babelFish={data.babel_fish} />
            </div>

            {/* Row 3 */}
            <div className="md:col-span-12">
              <AstrolabeSection astrolabe={data.astrolabe} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
```

- [ ] **Step 2: Testar manualmente (com VITE_USE_MOCK=true)**

Abrir `http://localhost:5173`:

- [ ] Digitar qualquer username → navegar para `/result/username`
- [ ] Loading overlay visível por ~1.5s
- [ ] Grid aparece com todos os cards
- [ ] Babel Fish toggle liga/desliga
- [ ] "Realinhar Harmônicos" embaralha haiku
- [ ] Barra de commit chart com hover mostra valor
- [ ] Astrolabe gira

- [ ] **Step 3: Commit**

```bash
git add src/pages/ResultPage.tsx
git commit -m "feat(frontend): implement ResultPage with 12-col grid and AbortController"
```

---

### Task 12: Footer

**Files:**

- Create: `src/components/Footer.tsx`
- Modify: `src/pages/ResultPage.tsx`
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Footer**

```tsx
// src/components/Footer.tsx
export function Footer() {
  return (
    <footer className="w-full py-8 px-gutter flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-container-lowest border-t border-white/5">
      <div className="flex items-center gap-4">
        <span className="font-headline-md text-headline-md text-primary">
          GCA
        </span>
        <span className="font-label-md text-label-md text-outline">
          Desenvolvido por Try/Catchers
        </span>
      </div>
      <div className="text-outline font-label-md text-label-md">
        © 2026 Celestial Code Registry
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Adicionar Footer nas páginas**

Em `HomePage.tsx`, antes do `</div>` final:

```tsx
import { Footer } from "../components/Footer";
// ...dentro do return, após </main>:
<Footer />;
```

Em `ResultPage.tsx`, mesma coisa.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx src/pages/
git commit -m "feat(frontend): add Footer component"
```

---

### Task 13: Dockerfile

**Files:**

- Create: `frontend/Dockerfile`

- [ ] **Step 1: Criar Dockerfile**

```dockerfile
# frontend/Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

- [ ] **Step 2: Verificar build local**

```bash
docker build -t astrologer-frontend .
docker run -p 5173:5173 -e VITE_USE_MOCK=false -e VITE_API_BASE_URL=http://localhost:8000 astrologer-frontend
```

Esperado: `http://localhost:5173` acessível.

- [ ] **Step 3: Commit**

```bash
git add Dockerfile
git commit -m "feat(frontend): add Dockerfile for containerized dev"
```

---

### Task 14: Conectar ao Backend Real

**Files:**

- Modify: `.env.local`

- [ ] **Step 1: Mudar flag de mock**

```
VITE_USE_MOCK=false
VITE_API_BASE_URL=http://localhost:8000
```

- [ ] **Step 2: Testar fluxo completo**

- [ ] `http://localhost:5173` → digitar username real do GitHub
- [ ] Loading aparece enquanto backend processa
- [ ] Mapa astral renderiza com dados reais
- [ ] Usuário inexistente → `ErrorView` com mensagem do backend
- [ ] Navegação rápida (digitar 2 users seguidos) não causa race condition

- [ ] **Step 3: Commit se tudo ok**

```bash
git add .env.local
git commit -m "chore(frontend): switch to real API"
```

---

### Task 15: Mobile Responsiveness Check

- [ ] **Step 1: Abrir DevTools → toggle device toolbar → iPhone 14 (390px)**

Verificar:

- [ ] HomePage: input e botão empilhados (coluna), sem overflow horizontal
- [ ] ResultPage: cards em coluna única (`grid-cols-1` em mobile)
- [ ] NavBar: links desktop ocultos (`hidden md:flex`)
- [ ] CommitChart: barras visíveis sem overflow
- [ ] BabelFishWidget: haiku legível

- [ ] **Step 2: Ajustes se necessário**

`SolarSignCard`: headline grande pode precisar de `text-[28px]` em mobile:

```tsx
<h3 className="font-headline-xl text-headline-xl md:text-headline-xl text-[28px] text-on-surface mb-4">
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "fix(frontend): mobile responsive adjustments"
```
