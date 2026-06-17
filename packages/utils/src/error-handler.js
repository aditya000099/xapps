import { logger } from './logger.js';

export const globalErrorHandler = (err, req, res, next) => {
  // Log the error
  logger.error(err.message, { 
    stack: err.stack, 
    path: req.path,
    method: req.method
  });

  // Determine status code
  const statusCode = err.statusCode || err.status || 500;

  // Format the response securely (don't leak stack traces in prod)
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
