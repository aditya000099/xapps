import express from 'express';
import { 
  logger, 
  requestLogger, 
  securityHeaders, 
  corsMiddleware, 
  globalRateLimiter, 
  errorHandler 
} from '@xapps/utils/server';
import { prisma, connectMongo, redis } from '@xapps/db';

import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import dashboardRouter from './routes/dashboard.js';

import { BackendModuleRegistry } from '@xapps/core-server';
import { companiesBackendModule } from '@xapps/module-companies/server';
import { contactsBackendModule } from '@xapps/module-contacts/server';
import { dealsBackendModule } from '@xapps/module-deals/server';
import { realEstateBackendModule } from '@xapps/module-real-estate/server';
import { ticketingBackendModule } from '@xapps/module-ticketing/server';
import { invoicingBackendModule } from '@xapps/module-invoicing/server';

const app = express();
const PORT = process.env.PORT || 8080;

async function bootstrap() {
  try {
    // 1. Connect to MongoDB
    await connectMongo();

    // 2. Setup Global Middlewares
    app.use(securityHeaders);
    app.use(corsMiddleware);
    app.use(express.json());
    app.use(cookieParser());
    app.use(requestLogger);
    
    // Apply rate limiter to all /api routes
    app.use('/api', globalRateLimiter);

    // Core Auth Routes
    app.use('/api/auth', authRouter);
    app.use('/api/dashboard', dashboardRouter);

    // Plug Modules
    const registry = new BackendModuleRegistry(app);
    app.locals.registry = registry; // Make registry accessible to routes like dashboard
    registry.plug(companiesBackendModule);
    registry.plug(contactsBackendModule);
    registry.plug(dealsBackendModule);
    registry.plug(realEstateBackendModule);
    registry.plug(ticketingBackendModule);
    registry.plug(invoicingBackendModule);
    
    // Import settings dynamically since it might not be at the top level
    try {
      const { settingsBackendModule } = await import('@xapps/module-settings/server');
      registry.plug(settingsBackendModule);
    } catch(e) {
      console.error('Failed to auto-plug settings module:', e);
    }

    app.get('/api/health', async (req, res) => {
      // Check connections
      const checks = {
        postgres: 'unknown',
        redis: 'unknown',
        mongo: 'unknown',
      };

      try {
        await prisma.$queryRaw`SELECT 1`;
        checks.postgres = 'connected';
      } catch (e) { checks.postgres = 'error'; }

      try {
        if (redis && redis.status === 'ready') checks.redis = 'connected';
        else checks.redis = 'error';
      } catch (e) { checks.redis = 'error'; }

      try {
        const { mongooseClient } = await import('@xapps/db');
        if (mongooseClient.connection.readyState === 1) checks.mongo = 'connected';
        else checks.mongo = 'error';
      } catch (e) { checks.mongo = 'error'; }

      const isHealthy = Object.values(checks).every(v => v === 'connected');

      res.status(isHealthy ? 200 : 503).json({
        status: isHealthy ? 'healthy' : 'degraded',
        timestamp: new Date().toISOString(),
        connections: checks
      });
    });

    // 4. Fallback and Error Handler
    app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
    app.use(errorHandler);

    // 5. Start Express
    app.listen(PORT, () => {
      logger.info(`🚀 CRM Server running on port ${PORT}`);
      logger.info(`🔧 Environment: ${process.env.NODE_ENV}`);
    });

  } catch (error) {
    logger.error('❌ Failed to bootstrap the server:', error);
    process.exit(1);
  }
}

// Graceful shutdown handling
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  await prisma.$disconnect();
  if (redis) redis.quit();
  process.exit(0);
});

bootstrap();