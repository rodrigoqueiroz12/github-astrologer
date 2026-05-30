# Frontend Design — GitHub Commit Astrologer

**Date:** 2026-05-30  
**Deadline:** 2026-05-31 (hackathon)  
**Status:** Approved

---

## Stack

| Dependency       | Version | Purpose              |
| ---------------- | ------- | -------------------- |
| vite             | latest  | bundler + dev server |
| react            | 18      | UI framework         |
| typescript       | 5       | type safety          |
| react-router-dom | v7      | routing              |
| axios            | latest  | HTTP client          |
| tailwindcss      | v3      | styling              |
| @types/react     | latest  | TS types             |

**Fonts (Google Fonts CDN):** Sora + JetBrains Mono  
**Icons:** Material Symbols Outlined (Google Fonts CDN)  
**No external component library** — design system from DESIGN.md is self-contained.

---

## Routes

| Path                | Component    | Description         |
| ------------------- | ------------ | ------------------- |
| `/`                 | `HomePage`   | search input + hero |
| `/result/:username` | `ResultPage` | full astral map     |

---

## Project Structure

```
frontend/
  src/
    pages/
      HomePage.tsx
      ResultPage.tsx
    components/
      NavBar.tsx
      StarField.tsx
      GlassCard.tsx
      LoadingOverlay.tsx
      ErrorView.tsx
      result/
        UserProfileCard.tsx
        SolarSignCard.tsx
        AscendantCard.tsx
        CommitChart.tsx
        BabelFishWidget.tsx
        AstrolabeSection.tsx
    services/
      api.ts
    types/
      astral.ts
    App.tsx
    main.tsx
  tailwind.config.ts   # config from DESIGN.md (copy-paste)
  index.html           # Sora + JetBrains Mono + Material Symbols via CDN
```

---

## API Contract

> **Contrato entre Frontend (React) ↔ Backend (Laravel)**  
> Frontend desenvolve com mock enquanto backend implementa. Ambos alinham neste contrato.

### Endpoint

```
GET /api/astral/:username
```

### 200 OK

Estrutura conforme proposta do backend:

```ts
interface AstralMap {
  user: {
    username: string; // "octocat"
    avatar_url: string; // "https://avatars.githubusercontent.com/u/5832347?v=4"
    analysis_date: string; // "30/05/2026"
    lunar_cycle: string; // "Ciclo Lunar 4"
    cosmic_reach: string; // "Top 2%"
    // member_since omitido — removido do UI (decisão: 1.B)
  };
  solar_sign: {
    title: string; // "Java da Madrugada"
    description: string; // texto longo, humor astrológico
    tags: string[]; // ["PROGRAMADOR_VIGILANTE", "ÓRBITA_JAVA"]
  };
  ascendant: {
    name: string; // "Mercúrio Retrógit"
    status: string; // "Interferência Ativa"
    title: string; // "Programador Noturno"
    tags: string[]; // ["#ProfeciaDoBug", "#SorteNoStackOverflow"]
    quote: string; // "Um force-push durante esta fase..."
  };
  temporal_rhythm: {
    sync_rate: string; // "94%"
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
    input_hash: string; // "0xf3a1b2c"
    input_message: string; // mensagem original do commit
    haiku: string; // "A lua brilha no código 🌙\nMapas astrais..."
    // objeto único — botão "Realinhar" embaralha haiku no client (decisão: 2.B)
  };
  astrolabe: {
    orbital_cycles: string; // "42.1k"
    zodiac_repos: number; // 5
    collaboration_flow: string; // "Alta"
    constellation_phase: string; // "Alfa"
  };
}
```

### 4xx / 5xx

```ts
interface ApiError {
  error: string; // mensagem astrológica do Laravel — backend é responsável pelo humor
}
```

**Exemplos de error:**

- 404 user not found: `"Seu repositório é um buraco negro. Não encontramos vida inteligente ou commits aqui."`
- 404 no commits: `"As estrelas estão em silêncio. Nenhum commit encontrado neste plano astral."`
- 500: `"Mercúrio entrou em colapso quântico. Tente novamente em outro ciclo lunar."`

### Headers esperados

```
Content-Type: application/json
Access-Control-Allow-Origin: * (dev) | domínio prod
```

---

## Mock Strategy (Frontend Independence)

Frontend usa `src/services/mockData.ts` durante desenvolvimento:

```ts
// src/services/api.ts
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export async function getAstralMap(username: string): Promise<AstralMap> {
  if (USE_MOCK) return mockAstralMap(username);
  const { data } = await axios.get(`/api/astral/${username}`);
  return data;
}
```

`.env.local`:

```
VITE_USE_MOCK=true
VITE_API_BASE_URL=http://localhost:8000
```

Quando backend estiver pronto: `VITE_USE_MOCK=false`.

```

---

## Component Specs

### `HomePage`

- Full-page hero centered layout
- `<StarField>` fixed background
- `<NavBar>` fixed top
- Input: `github.com/[username input]` + terminal cursor blink
- Submit: validates non-empty → `navigate('/result/${username}')`
- No API call on this page

### `ResultPage`

- Fetches on mount via `api.getAstralMap(username)`
- States: `loading` → `<LoadingOverlay>` | `error` → `<ErrorView>` | `data` → grid
- 12-col grid (Tailwind):
  - `UserProfileCard` — col-span-3
  - `SolarSignCard` — col-span-6
  - `AscendantCard` — col-span-3
  - `CommitChart` — col-span-8
  - `BabelFishWidget` — col-span-4
  - `AstrolabeSection` — col-span-12

### `LoadingOverlay`

- Full-screen overlay, centered
- Astrolabe: outer ring `animate-[spin_60s_linear_infinite]` with 2 glowing dots
  (green `shadow-[0_0_15px_#00e639]` + purple `shadow-[0_0_15px_#ddb7ff]`)
- Inner ring: `animate-[spin_30s_linear_infinite_reverse]`
- Rotating message every 2s from array:
```

'Lendo as estrelas e ignorando o .gitignore...'
'Calculando posição de Mercúrio Retrógrado...'
'Consultando o oráculo do npm install...'
'Alinhando chakras do seu histórico de commits...'
'Decifrando presságios de conflito de merge...'

````

### `ErrorView`

- Centered, `<GlassCard>`
- Shows `error.message` from API (astro-flavored from backend)
- Fallback: `"Seu repositório é um buraco negro. Vida inteligente: não encontrada."`
- CTA button → `navigate('/')` ("Tentar Outro Usuário")

### `BabelFishWidget`

- Exibe `babel_fish.input_hash` + `babel_fish.input_message` como entrada
- **Toggle ON:** exibe `babel_fish.haiku` (quebrado em linhas por `\n`)
- **Toggle OFF:** exibe `babel_fish.input_hash` sem tradução
- Botão "Realinhar Harmônicos": embaralha as linhas do haiku no client (`haiku.split('\n').sort(() => Math.random() - 0.5).join('\n')`)
- Zero fetch extra — cosmético puro (decisão 2.B)

### `CommitChart`

- Pure CSS/Tailwind bar chart
- `temporal_rhythm.chart_data` → 7 barras, altura proporcional ao valor máximo
- Labels: SEG TER QUA QUI SEX SAB DOM (keys do objeto, nessa ordem)
- `temporal_rhythm.sync_rate` exibido no canto superior direito do card

### `GlassCard`

- Wrapper: `background: rgba(16,20,30,0.6)` + `backdrop-blur-[12px]` + `border border-white/5`
- Hover: `border-primary/30` + `translateY(-2px)`

### `StarField`

- `position: fixed`, `pointer-events: none`, `z-index: -1`
- 150 stars via JS on mount (random position, size, opacity, pulse animation)
- Same implementation as prototype `code.html`

---

## State Management

All state is local — no Context, no Redux.

```ts
// ResultPage
const [loading, setLoading] = useState(true);
const [data, setData] = useState<AstralMap | null>(null);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
api
  .getAstralMap(username)
  .then(setData)
  .catch((e) => setError(e.response?.data?.error ?? "Erro cósmico."))
  .finally(() => setLoading(false));
}, [username]);

// BabelFishWidget
const [enabled, setEnabled] = useState(true);
const [currentIndex, setCurrentIndex] = useState(0);
````

---

## Error Handling

| Scenario           | HTTP | UI                                        |
| ------------------ | ---- | ----------------------------------------- |
| Username not found | 404  | `<ErrorView>` with backend astro message  |
| No public commits  | 404  | `<ErrorView>` — distinct msg from backend |
| GitHub API timeout | 500  | `<ErrorView>` generic fallback            |
| Empty input        | —    | Inline validation, no navigate            |

---

## Design System (Tailwind Config)

Config copy-pasted from `DESIGN.md` frontmatter:

- Colors: deep space blues + neon purple (`#ddb7ff`) + terminal green (`#00e639`)
- Fonts: `headline-*` → Sora, `body-*` / `label-*` → JetBrains Mono
- Border radius: 2px (default) → 12px (xl)
- Spacing unit: 4px base

Custom CSS (global):

```css
.glass-card {
  background: rgba(16, 20, 30, 0.6);
  backdrop-filter: blur(12px);
}
.mystical-border::after {
  /* gradient border purple→green */
}
body {
  background: radial-gradient(purple nebula) + radial-gradient(green nebula);
}
```

---

## Non-Functional

| Requirement                 | Implementation                                                 |
| --------------------------- | -------------------------------------------------------------- |
| RNF01 ≤5s response          | Axios timeout: 8000ms, show loading state                      |
| RNF02 no token in frontend  | All GitHub calls via Laravel proxy `/api/astral/:username`     |
| RNF03 mobile-responsive     | Tailwind responsive prefixes (`md:`, `lg:`), mobile-first grid |
| RNF04 error messages        | `ErrorView` always shows astro-flavored string                 |
| RNF05 no duplicate requests | AbortController cancela chamada anterior ao montar/remontar    |
| RNF06 Docker                | Frontend + Backend rodam via Docker Compose                    |

---

## Concurrent Request Guard (RNF05)

`ResultPage` usa `AbortController` para cancelar chamada em-curso se o componente desmontar ou `username` mudar. Evita race conditions (React StrictMode dispara `useEffect` 2x em dev, usuário navega rápido, etc).

```ts
useEffect(() => {
  const controller = new AbortController();

  setLoading(true);
  setData(null);
  setError(null);

  api
    .getAstralMap(username, controller.signal)
    .then(setData)
    .catch((e) => {
      if (e.name === "CanceledError") return; // chamada abortada — ignorar
      setError(e.response?.data?.error ?? "Erro cósmico.");
    })
    .finally(() => setLoading(false));

  return () => controller.abort(); // cleanup: cancela se remontar
}, [username]);
```

```ts
// services/api.ts
export async function getAstralMap(
  username: string,
  signal?: AbortSignal,
): Promise<AstralMap> {
  if (USE_MOCK) return mockAstralMap(username);
  const { data } = await axios.get(`/api/astral/${username}`, { signal });
  return data;
}
```

---

## Docker (RNF06)

Frontend roda como serviço no Docker Compose do projeto.

```yaml
# docker-compose.yml (raiz do monorepo)
services:
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    environment:
      - VITE_API_BASE_URL=http://backend:8000
      - VITE_USE_MOCK=false
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8000:8000"
```

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

`--host 0.0.0.0` obrigatório para Vite dev server ser acessível fora do container.

---

## Out of Scope (MVP)

- Unit/integration tests
- Authentication
- History of previous readings
- Share button / OG image
- Dark/light mode toggle (dark only)
