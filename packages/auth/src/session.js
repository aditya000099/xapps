import { randomBytes, createHash } from 'crypto';
import { redis } from '@xapps/db';

const SESSION_PREFIX = 'session:';
const SESSION_EXPIRY_SECONDS = 7 * 24 * 60 * 60; // 7 days

/**
 * Generate a highly secure random session token.
 */
function generateSessionToken() {
  return randomBytes(32).toString('hex');
}

/**
 * Hash the session token before storing/looking it up in Redis.
 * This prevents a compromised Redis database from leaking active sessions.
 */
function hashToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

/**
 * Create a new stateful session.
 * @param {string} userId - The user's ID
 * @param {object} metadata - Additional info (e.g., ip, userAgent)
 * @returns {Promise<string>} The raw session token (to be sent to the client as an HttpOnly cookie)
 */
export async function createSession(userId, metadata = {}) {
  const token = generateSessionToken();
  const hashedToken = hashToken(token);

  const sessionData = {
    userId,
    createdAt: Date.now(),
    ...metadata,
  };

  // Store in Redis with TTL
  await redis.setex(
    `${SESSION_PREFIX}${hashedToken}`,
    SESSION_EXPIRY_SECONDS,
    JSON.stringify(sessionData)
  );

  return token;
}

/**
 * Validate a session token and return the session data.
 * Features automatic token sliding (session extension on active use).
 * @param {string} token - The raw session token from the user's cookie
 * @returns {Promise<object|null>} The session data or null if invalid/expired
 */
export async function validateSession(token) {
  if (!token) return null;

  const hashedToken = hashToken(token);
  const key = `${SESSION_PREFIX}${hashedToken}`;

  const dataStr = await redis.get(key);
  if (!dataStr) return null;

  // Slide expiration: reset the TTL since the user is active
  await redis.expire(key, SESSION_EXPIRY_SECONDS);

  return JSON.parse(dataStr);
}

/**
 * Invalidate/destroy a session (Logout).
 * @param {string} token 
 */
export async function destroySession(token) {
  if (!token) return;
  const hashedToken = hashToken(token);
  await redis.del(`${SESSION_PREFIX}${hashedToken}`);
}

/**
 * Invalidate ALL sessions for a user (e.g., password change or security breach).
 * This requires scanning or maintaining a reverse lookup set in Redis.
 * For simplicity, we can maintain a `user_sessions:${userId}` set.
 */
export async function destroyAllUserSessions(userId) {
  const userSessionsKey = `user_sessions:${userId}`;
  const hashedTokens = await redis.smembers(userSessionsKey);
  
  if (hashedTokens.length > 0) {
    const keysToDelete = hashedTokens.map(t => `${SESSION_PREFIX}${t}`);
    await redis.del(...keysToDelete, userSessionsKey);
  }
}
