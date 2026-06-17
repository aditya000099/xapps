/**
 * Real Estate Module — Server Entry
 *
 * Exports everything the API server needs to integrate this module:
 * - routes: Express router with all Real Estate endpoints
 * - services: Business logic classes
 * - migrations: Path to migration files
 *
 * The API module-loader calls this at startup.
 */

import routes from './routes';

export default {
  routes,
  // services: {},
  // migrationsPath: path.join(__dirname, 'migrations'),
};
