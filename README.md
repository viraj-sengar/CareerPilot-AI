# 🚀 CareerPilot AI — Modern Full-Stack Monorepo

CareerPilot AI is an AI-powered career co-pilot featuring resume analysis, skill-gap detection, mock interviews, dynamic roadmaps, and career intelligence.

---

## 📁 Repository Structure

```
CareerPilot AI/
├── backend/                       # 🟢 Dedicated Backend (Port 5000)
│   ├── src/
│   │   ├── controllers/           # API request controllers (AI, user)
│   │   ├── routes/                # Express REST endpoints
│   │   ├── services/              # Gemini & realistic built-in fallback AI
│   │   ├── db/                    # Prisma client singleton
│   │   ├── types/                 # Backend TypeScript interfaces
│   │   └── server.ts              # Express application entrypoint
│   ├── prisma/                    # SQLite database & Prisma schema
│   │   ├── schema.prisma
│   │   ├── dev.db
│   │   └── seed.js
│   ├── .env                       # Backend environment settings
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                      # 🔵 Dedicated Frontend (Port 3000)
│   ├── src/
│   │   ├── app/                   # Next.js 15 App Router pages
│   │   │   ├── (auth)/            # Login, Register, Forgot Password
│   │   │   ├── (dashboard)/       # Assistant, Roadmap, Interview, Resume, etc.
│   │   │   ├── onboarding/        # Onboarding flow
│   │   │   ├── layout.tsx         # Root layout with theme & navigation
│   │   │   └── page.tsx           # High-converting landing page
│   │   ├── components/            # UI components, layout headers, sidebars
│   │   ├── context/               # Global application state (AppContext)
│   │   └── lib/                   # Client types & demo data
│   ├── next.config.ts             # Proxies /api/* to http://localhost:5000
│   ├── tailwind.config.ts         # Design system & dark theme tokens
│   ├── package.json
│   └── tsconfig.json
│
├── package.json                   # Monorepo root workspace orchestrator
└── README.md
```

---

## ⚡ Quick Start

### 1. Install All Dependencies
```bash
npm run install:all
```

### 2. Run Both Services Together
```bash
npm run dev
```
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🛠 Individual Commands

| Command | Description |
|---|---|
| `npm run dev` | Runs both backend & frontend concurrently |
| `npm run dev:frontend` | Runs only the Next.js frontend on port 3000 |
| `npm run dev:backend` | Runs only the Express backend on port 5000 |
| `npm run build` | Builds both backend and frontend for production |
| `npm run build:frontend` | Builds the frontend Next.js production bundle |
| `npm run build:backend` | Compiles the backend TypeScript into `dist/` |
