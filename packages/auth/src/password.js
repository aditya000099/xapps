import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

/**
 * Hash a password using scrypt.
 * Returns a combined string containing the salt and the derived key.
 * @param {string} password 
 * @returns {Promise<string>}
 */
export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString('hex')}.${salt}`;
}

/**
 * Verify a password against a stored hash securely, mitigating timing attacks.
 * @param {string} suppliedPassword 
 * @param {string} storedHash 
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(suppliedPassword, storedHash) {
  const [hashedPassword, salt] = storedHash.split('.');
  
  if (!hashedPassword || !salt) {
    return false;
  }

  const hashedPasswordBuf = Buffer.from(hashedPassword, 'hex');
  const suppliedPasswordBuf = await scryptAsync(suppliedPassword, salt, 64);

  // Use timingSafeEqual to prevent timing attacks
  return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
}
