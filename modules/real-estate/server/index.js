import realEstateRouter from './routes/real-estate.routes.js';

export const realEstateBackendModule = {
  name: 'real-estate',
  register: (app) => {
    app.use('/api/real-estate', realEstateRouter);
  }
};
