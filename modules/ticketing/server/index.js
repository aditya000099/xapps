import ticketingRouter from './routes/ticketing.routes.js';
import { companiesBackendModule } from '@xapps/module-companies/server';

export const ticketingBackendModule = {
  name: 'ticketing',
  dependencies: [companiesBackendModule],
  register: (app) => {
    app.use('/api/ticketing', ticketingRouter);
  }
};
