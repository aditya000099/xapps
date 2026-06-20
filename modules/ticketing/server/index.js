import ticketingRouter from './routes/ticketing.routes.js';

export const ticketingBackendModule = {
  name: 'ticketing',
  register: (app) => {
    app.use('/api/ticketing', ticketingRouter);
  }
};
