import winston from 'winston';

const { combine, timestamp, printf, colorize, json, errors } = winston.format;

const consoleFormat = combine(
  colorize(),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf(({ level, message, timestamp, stack }) => {
    if (stack) {
      return `${timestamp} ${level}: ${message}\n${stack}`;
    }
    return `${timestamp} ${level}: ${message}`;
  })
);

// We output structured JSON in production for Datadog/ELK integration,
// but human-readable text with colors in development.
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    errors({ stack: true }),
    process.env.NODE_ENV === 'production' ? json() : consoleFormat
  ),
  transports: [
    new winston.transports.Console(),
  ],
});
