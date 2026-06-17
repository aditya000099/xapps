import morgan from 'morgan';
import { logger } from './logger.js';

// Setup Morgan to stream HTTP logs directly to Winston
const stream = {
  write: (message) => logger.http(message.trim())
};

// Skip logging for health checks or successful static requests if desired
const skip = (req, res) => {
  return req.url === '/api/health' && res.statusCode === 200;
};

// Use the 'tiny' format for Morgan, but you can customize this
export const requestLogger = morgan('tiny', { stream, skip });
