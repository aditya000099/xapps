# XApps — Agency Platform Monorepo

A modular, app-centric monorepo for building and shipping vertical-specific software (CRM, LMS, Real Estate, etc.). 

This repository acts as the **master blueprint**. When onboarding a new customer, you clone this repo and customize their specific app (e.g., `apps/crm`) by plugging in the exact modules they need (e.g., `modules/real-estate`).

## Table of Contents
- [Architecture & How It Works](#architecture--how-it-works)
- [Tech Stack](#tech-stack)
- [Setup Guide](#setup-guide)
- [Development Guide](#development-guide)
- [Example: Plugging a Module into an App](#example-plugging-a-module-into-an-app)
- [Contributing Guidelines](#contributing-guidelines)

---

## Architecture & How It Works

We use an **App-Centric + Pluggable Module** architecture based on standard npm workspaces and native ES Modules (`import`/`export`).

```text
xapps/
├── apps/                    ← Standalone, concrete applications
│   ├── crm/                 ← CRM App
│   │   ├── client/          ← Vite React frontend
│   │   └── server/          ← Express backend
│   └── lms/                 ← LMS App
│
├── modules/                 ← Reusable features / niches
│   ├── real-estate/         ← Real Estate specific logic
│   ├── school/              ← School specific logic
│   └── tasks/               ← Shared task management
│
└── packages/                ← Shared core libraries
    ├── auth/
    ├── db/
    ├── ui/
    └── utils/
```

### The Concept

- **The Apps (`apps/`)**: These are fully standalone, deployable products. A CRM app has its own `client/` and its own `server/`.
- **The Modules (`modules/`)**: These are plug-and-play features. For example, if a Real Estate agency buys your CRM, you go into `apps/crm/package.json` and add `"@xapps/module-real-estate": "*"`. Then you simply import its routes into the CRM server, and its UI components into the CRM client.
- **The Packages (`packages/`)**: These are foundational libraries used everywhere (Database connection, UI component system, Authentication).

---

## Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Module Sys | Native ESM (`import`/`export`) |
| Frontend   | React 19, Vite 6, React Router 7 |
| State Mgmt | Zustand & Redux         |
| Backend    | Express.js 5            |
| Primary DB | PostgreSQL (Prisma ORM) |
| Cache      | Redis                   |

---

## Setup Guide

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL

### 2. Installation
Install dependencies from the root. This will automatically link all workspaces.
```bash
git clone <repo-url> xapps
cd xapps
npm install
```

### 3. Environment Variables
```bash
cp .env.example .env
```
Ensure your `PG_DATABASE_URL` is set correctly.

### 4. Database Setup
```bash
# Run migrations using the shared db package
npm -w @xapps/db run migrate
```

### 5. Start Development
To start a specific app (e.g., CRM):
```bash
# Terminal 1: Start CRM Frontend
npm -w @xapps/crm-client run dev

# Terminal 2: Start CRM Backend
npm -w @xapps/crm-server run dev
```

---

## Development Guide

### Writing Core Packages (`packages/`)
Put code here if it is completely un-opinionated and universal. Examples: Button components (`@xapps/ui`), date formatting (`@xapps/utils`), database connection setup (`@xapps/db`).

### Building Features/Niches (`modules/`)
Put code here if it represents a specific business vertical or reusable feature block (e.g., `real-estate`, `school`, `tasks`). A module should export an Express router for the backend, and React components/pages for the frontend.

### Assembling Applications (`apps/`)
An app is essentially an empty shell that wires together packages and modules. You configure an app specifically for a customer. You import their required modules and configure the main layouts.

---

## Example: Plugging a Module into an App

Let's plug the `tasks` module into the `crm` app.

### 1. Add the Dependency
In `apps/crm/server/package.json` and `apps/crm/client/package.json`:
```json
{
  "dependencies": {
    "@xapps/module-tasks": "*"
  }
}
```

### 2. Plug into the Backend
In `apps/crm/server/src/index.js`:
```javascript
import express from 'express';
import { taskRoutes } from '@xapps/module-tasks/server';

const app = express();

// Plug the module's routes into the core CRM app
app.use('/api/tasks', taskRoutes);

app.listen(4000);
```

### 3. Plug into the Frontend
In `apps/crm/client/src/App.jsx`:
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskBoard } from '@xapps/module-tasks/client';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tasks/*" element={<TaskBoard />} />
      </Routes>
    </BrowserRouter>
  );
}
```

That's it! The CRM app now has full task management capabilities.

---

## Contributing Guidelines

1. **Strict ESM**: Always use `import` and `export`. `require()` and `module.exports` are banned.
2. **Module Isolation**: Modules must be self-contained. A module cannot import another module. They can only import from `packages/*`.
3. **App Composition**: Apps (`apps/`) should contain as little business logic as possible. Their job is strictly to import and assemble modules.
