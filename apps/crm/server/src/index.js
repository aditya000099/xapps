import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { requestLogger, globalRateLimiter, globalErrorHandler } from '@xapps/utils/server';

const app = express();

// Security and Logging Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(globalRateLimiter);

// Core Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'crm' });
});

// Example route that throws an error to test the global handler
app.get('/api/error-test', (req, res, next) => {
  const err = new Error('This is a test error!');
  err.status = 400;
  next(err);
});

// Centralized Error Handler (must be the last middleware)
app.use(globalErrorHandler);

const PORT = process.env.PORT || (process.env.APP === 'crm' ? 4000 : 4001);
app.listen(PORT, () => {
  console.log(`CRM server running on port ${PORT}`);
});