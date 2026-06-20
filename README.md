# XApps — Agency Platform Monorepo

A modular monorepo for building vertical-specific software (CRM, LMS, etc.) with plug-and-play niche modules (Real Estate, School, etc.).

Clone this repo for each customer. Pick the app, plug in the modules they need, ship.

---

## Structure

```text
xapps/
├── apps/                         ← Standalone apps (one per product)
│   ├── crm/
│   │   ├── client/               ← React (Vite + Tailwind v4)
│   │   └── server/               ← Express.js
│   └── lms/
│       ├── client/
│       └── server/
│
├── modules/                      ← Plug-and-play feature modules
│   ├── real-estate/              ← Real estate niche
│   │   ├── client/               ← React pages, components, routes
│   │   ├── server/               ← Express routes, controllers, services
│   │   ├── module.config.js      ← Module metadata
│   │   └── package.json          ← Exports: ./client, ./server, ./config
│   └── _template/                ← Used by create-module script
│
├── packages/                     ← Shared core libraries
│   ├── auth/                     ← JWT, OAuth, RBAC
│   ├── db/                       ← Prisma, MongoDB, Redis
│   ├── ui/                       ← Shared React components
│   ├── utils/                    ← Logger, rate limiter, analytics, error handler
│   ├── config/                   ← Env loading, DB config
│   ├── validation/               ← Zod/Joi schemas
│   └── types/                    ← JSDoc type definitions
│
└── scripts/                      ← Dev tooling
    ├── create-module.js          ← Scaffold a new module
    ├── dev.js                    ← Start dev servers
    └── setup.js                  ← First-time setup
```

---

## Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Frontend   | React 19, Vite 6, Tailwind CSS v4 |
| State Mgmt | Zustand & Redux         |
| Backend    | Express.js 5 (ESM)      |
| Database   | PostgreSQL (Prisma)     |
| Cache      | Redis                   |
| Logging    | Winston + Morgan        |
| Security   | Helmet, express-rate-limit |
| Analytics  | Google Analytics 4      |

---

## Setup

```bash
git clone <repo-url> xapps && cd xapps
npm install
cp .env.example .env
```

### Start the CRM app

```bash
# Terminal 1 — Frontend (http://localhost:5173)
npm -w @xapps/crm-client run dev

# Terminal 2 — Backend (http://localhost:4000)
npm -w @xapps/crm-server run dev
```

---

## How Modules Work

Every module exposes two clean entry points via its `package.json` exports:

```json
{
  "exports": {
    "./client": "./client/index.js",
    "./server": "./server/index.js"
  }
}
```

### Plugging a module into the backend

```javascript
// apps/crm/server/src/index.js
import { routes as realEstateRoutes } from '@xapps/module-real-estate/server';

app.use('/api/real-estate', realEstateRoutes);
```

### Plugging a module into the frontend

```javascript
// apps/crm/client/src/App.jsx
import { routes, navItems } from '@xapps/module-real-estate/client';
```

That's it. One import, one line to mount. No config files, no dynamic loaders.

---

## Creating a New Module

```bash
npm run create-module -- --name=school --display="School Management"
npm install
```

This scaffolds `modules/school/` with the full client + server structure, ready to import.

---

## Agency Workflow

1. **Clone** this repo for a new customer
2. **Pick the app** (e.g. `apps/crm`)
3. **Add modules** to the app's `package.json`:
   ```json
   "@xapps/module-real-estate": "*",
   "@xapps/module-school": "*"
   ```
4. **Import and mount** them in the app's server and client
5. **Deploy** only the app folder the customer needs

---

## Shared Packages

Packages separate **server** and **client** exports to prevent Node.js code from leaking into the browser:

```javascript
// In Express server code
import { logger, requestLogger, globalRateLimiter } from '@xapps/utils/server';

// In React client code
import { initAnalytics, trackPageView } from '@xapps/utils/client';
```

---

## Contributing

1. **ESM only** — use `import`/`export` everywhere. No `require()`.
2. **Modules are isolated** — a module can import from `packages/*` but never from another module.
3. **Apps are thin** — they just wire modules and packages together. Keep business logic in modules.
4. **Use shared UI** — always use `@xapps/ui` for components. Don't rebuild common UI inside modules.
