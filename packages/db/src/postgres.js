/**
 * @xapps/db — PostgreSQL Connection (Prisma)
 *
 * Centralized Prisma client instance.
 * Ensures only one instance of PrismaClient is created to prevent connection exhaustion
 * during hot reloads in development or serverless bursts.
 */

import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

/** @type {PrismaClient} */
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
