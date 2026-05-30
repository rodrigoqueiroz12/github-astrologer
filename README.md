# ✦ Astrologia de Commits GitHub

Descubra o seu mapa astral baseado no histórico de commits do GitHub. A IA analisa seus padrões de código e revela seu signo solar de programador, trânsito ascendente, ritmo temporal e haiku cósmico.

## Stack

| Camada   | Tecnologia                              |
| -------- | --------------------------------------- |
| Frontend | React 18 + Vite + TypeScript + Tailwind |
| Backend  | Laravel 13 + Sanctum                    |
| IA       | Gemini 2.5 Flash                        |
| Dados    | GitHub API                              |
| Infra    | Docker Compose + MySQL 8.4 + Redis      |

## Pré-requisitos

- Docker + Docker Compose
- Conta GitHub (para o `GITHUB_API_KEY`)
- Chave da API Gemini (para o `GEMINI_API_KEY`)

## Como rodar

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/github-astrologer.git
cd github-astrologer
```

### 2. Gere o APP_KEY do Laravel

```bash
docker compose run --rm backend php artisan key:generate --show
```

Copie a chave gerada (formato `base64:...`).

### 3. Crie o arquivo `.env` na raiz

```env
APP_KEY=base64:SUA_CHAVE_AQUI
GITHUB_API_KEY=ghp_SeuTokenGitHub
GEMINI_API_KEY=SuaChaveGemini
```

> O `.env` é lido pelo `docker-compose.yml` e repassado aos containers — não é necessário criar `.env` separado no `frontend/` ou `backend/`.

### 4. Suba os containers

```bash
docker compose up -d --build
```

### 5. Acesse

| Serviço  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:8000 |

Digite um usuário do GitHub e gere seu mapa astral.

## Variáveis de ambiente

| Variável         | Descrição                              | Obrigatório |
| ---------------- | -------------------------------------- | ----------- |
| `APP_KEY`        | Chave de criptografia do Laravel       | Sim         |
| `GITHUB_API_KEY` | Token de acesso à API do GitHub        | Sim         |
| `GEMINI_API_KEY` | Chave da API Gemini (Google AI Studio) | Sim         |

## Comandos úteis

```bash
# Ver logs do backend
docker compose logs -f backend

# Parar tudo
docker compose down

# Rebuild completo
docker compose up -d --build

# Rodar apenas o frontend em dev local (sem Docker)
cd frontend && npm install && npm run dev
```

## Estrutura

```
├── docker-compose.yml   # Orquestração dos serviços
├── .env                 # Secrets (não commitado)
├── frontend/            # React + Vite
└── backend/             # Laravel 13
```
