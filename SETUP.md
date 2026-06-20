# XApps Core CRM Infrastructure Setup

This guide explains how to spin up the required databases and start the Core CRM locally.

## 1. Start Infrastructure (Docker)

You will need Docker Desktop installed.

To start PostgreSQL, Redis, and MongoDB locally in the background, run:
```bash
docker-compose up -d
```

To stop the databases without deleting data:
```bash
docker-compose stop
```

To wipe all local database data completely:
```bash
docker-compose down -v
```

## 2. Environment Variables

Create a `.env` file in the root of `apps/crm/server/` (or your specific app root) with the following standard connection URIs that match the local Docker containers:

```env
# Postgres (Prisma)
PG_DATABASE_URL="postgresql://root:password@localhost:5432/xapps?schema=public"

# Redis (Caching, Sessions, BullMQ)
REDIS_URL="redis://localhost:6379"

# MongoDB (Unstructured Data)
MONGO_URI="mongodb://root:password@localhost:27017/xapps?authSource=admin"

# Server
PORT=8080
NODE_ENV=development
```

> **Production Note:** For live deployments, replace these local URIs with the connection strings provided by your managed hosting providers (AWS RDS, MongoDB Atlas, Upstash Redis).

## 3. Database Migrations

Once your Postgres database is running, push your Prisma schema:
```bash
npm -w @xapps/db run generate
npx prisma db push --schema=packages/db/prisma/schema.prisma
```

## 4. Run the Server

Finally, boot up the CRM server:
```bash
npm -w @xapps/crm-server run dev
```
