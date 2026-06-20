import dealsRouter from './routes/deals.routes.js';

export const dealsBackendModule = {
  name: 'deals',
  register: (app) => {
    app.use('/api/deals', dealsRouter);
  }
};
