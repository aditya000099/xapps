# Creating a New Client Project Guide

The XApps ecosystem uses a plug-and-play architecture. To create a completely isolated deployment for a new client (like `bigrealstates`), you do not need to rewrite the CRM or duplicate complex logic. You simply create a "shell" application and plug in the modules you need.

## Running the `bigrealstates` Client

If you want to boot up the `bigrealstates` proof-of-concept right now, you need two terminals.

**Terminal 1 (Backend - Port 8081):**

```bash
npm -w @xapps/bigrealstates-server run dev
```

**Terminal 2 (Frontend - Port 5174):**

```bash
npm -w @xapps/bigrealstates-client run dev
```

Once running, navigate to `http://localhost:5174`. You will notice that only the **Contacts**, **Deals**, and **Real Estate** modules are loaded. Ticketing and Invoicing are completely omitted!

---

## How to Setup a New Client Project

Follow these steps when onboarding a new client that needs a custom permutation of modules.

### Step 1: Create the Shell Folders

Create the backend and frontend folders inside the `apps/` directory.

```bash
mkdir -p apps/client-name/server
mkdir -p apps/client-name/client
```

### Step 2: Configure the Backend (`apps/client-name/server`)

Create a `package.json` specifying the required core packages and ONLY the modules you want.

```json
{
  "name": "@xapps/client-name-server",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "@xapps/auth": "^1.0.0",
    "@xapps/db": "^1.0.0",
    "@xapps/utils": "^1.0.0",
    "@xapps/core-server": "^1.0.0",
    "@xapps/module-contacts": "^1.0.0",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.18.2"
  }
}
```

Create `src/index.js` and use the **Backend Plugger**:

```javascript
import express from 'express';
import { BackendModuleRegistry } from '@xapps/core-server';
import { contactsBackendModule } from '@xapps/module-contacts/server';

const app = express();
// Add core middleware (cors, cookies, auth routing) here...

// Plug in the selected modules
const registry = new BackendModuleRegistry(app);
registry.plug(contactsBackendModule);

app.listen(8082, () => console.log('Server running!'));
```

### Step 3: Configure the Frontend (`apps/client-name/client`)

Create a `package.json` with your UI dependencies and the matching frontend modules.

```json
{
  "name": "@xapps/client-name-client",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "@xapps/ui": "^1.0.0",
    "@xapps/core-client": "^1.0.0",
    "@xapps/module-contacts": "^1.0.0",
    "react": "^19.0.0",
    "react-router-dom": "^7.1.1"
  }
}
```

Create `src/module-registry.js` and use the **Frontend Plugger**:

```javascript
import { FrontendModuleRegistry } from '@xapps/core-client';
import { contactsModule } from '@xapps/module-contacts/client';

const registry = new FrontendModuleRegistry();
registry.plug(contactsModule);

export function getRegisteredModules() {
  return {
    routes: registry.getRoutes(),
    navItems: registry.getNavItems(),
  };
}
```

### Step 4: Install & Run

Run NPM install from the root monorepo to link everything together using NPM Workspaces:

```bash
npm i
npm -w @xapps/client-name-server run dev
```

> [!TIP]
> **Environment Variables**
> Always ensure your new backend shell has its own `.env` file with a unique `PORT` (so it doesn't clash with other apps running locally) and its own `MONGO_URI` if the client requires a completely isolated database instance.
>
