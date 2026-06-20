import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { logger } from './logger.js';

/**
 * Winston integrated with Morgan for HTTP request logging.
 */
export const requestLogger = morgan(
  process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }
);

/**
 * Helmet secures Express apps by setting various HTTP headers.
 */
export const securityHeaders = helmet();

/**
 * Standard CORS configuration allowing specific origins.
 */
export const corsOptions = {
  origin: process.env.FRONTEND_URL || '*', // Should be locked down in production
  credentials: true,
};
export const corsMiddleware = cors(corsOptions);

/**
 * Basic IP Rate Limiting
 */
export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true, 
  legacyHeaders: false, 
});

/**
 * Global Error Handler Middleware
 */
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  logger.error(`[Unhandled Error] ${err.message}`, { stack: err.stack, path: req.path });
  
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production' && status === 500 
    ? 'Internal Server Error' 
    : err.message;

  res.status(status).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    }
  });
};
