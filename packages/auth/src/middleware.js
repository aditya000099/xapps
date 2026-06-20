import { validateSession } from './session.js';
import { hasPermission } from './rbac.js';

/**
 * Express middleware to ensure the user is authenticated.
 * Reads the 'sessionId' cookie and validates it against Redis.
 */
export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.sessionId;
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const session = await validateSession(token);
    if (!session) {
      return res.status(401).json({ error: 'Session expired or invalid' });
    }

    // Attach user payload to the request
    req.user = {
      id: session.userId,
      email: session.email,
      name: session.name,
      role: session.role,
    };

    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(500).json({ error: 'Internal server error during authentication' });
  }
};

/**
 * Express middleware factory to ensure the user has a specific permission.
 * Must be used AFTER requireAuth.
 * @param {string} permission 
 */
export const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!hasPermission(req.user.role, permission)) {
      return res.status(403).json({ error: `Forbidden: requires ${permission} permission` });
    }

    next();
  };
};
