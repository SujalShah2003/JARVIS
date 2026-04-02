# Jarvis

This repo is split into:

- `frontend/` — React + Vite UI
- `backend/` — Node.js API (LLM gateway)

## Prereqs

- Node.js 18+ (recommended 20+)
- (For free/open-source LLM) **Ollama** installed and running

### Ollama setup

1. Install Ollama: https://ollama.com
2. Pull/run a model (example):

```bash
ollama run llama3.1
```

## Run locally

### Backend

```bash
cd backend
npm install
# copy env template
copy .env.example .env
npm run dev
```

Backend runs at `http://localhost:8787`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5174` and proxies `/api/*` to the backend.
