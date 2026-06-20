/**
 * @xapps/db — Redis Client
 *
 * ioredis client for caching, stateful sessions, and distributed locks.
 */

import { Redis } from 'ioredis';

const REDIS_URL = process.env.REDIS_URL;

const globalForRedis = global;

if (!globalForRedis.redis && REDIS_URL) {
  globalForRedis.redis = new Redis(REDIS_URL, {
    maxRetriesPerRequest: null, // Required by BullMQ
    enableReadyCheck: false,
    retryStrategy(times) {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
  });

  globalForRedis.redis.on('error', (err) => {
    console.error('❌ Redis connection error:', err);
  });

  globalForRedis.redis.on('connect', () => {
    console.log('✅ Redis connected successfully');
  });
}

/** @type {Redis} */
export const redis = globalForRedis.redis;

/**
 * Helper: Get cached JSON value
 */
export async function cacheGet(key) {
  if (!redis) return null;
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

/**
 * Helper: Set cached JSON value with TTL (seconds)
 */
export async function cacheSet(key, value, ttlSeconds = 3600) {
  if (!redis) return;
  await redis.setex(key, ttlSeconds, JSON.stringify(value));
}

/**
 * Helper: Delete key
 */
export async function cacheDel(key) {
  if (!redis) return;
  await redis.del(key);
}
