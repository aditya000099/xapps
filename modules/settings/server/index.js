import settingsRouter from './routes/settings.routes.js';

export const settingsBackendModule = {
  name: 'settings',
  register: (app) => {
    app.use('/api/settings', settingsRouter);
  }
};
