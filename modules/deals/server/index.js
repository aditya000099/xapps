import dealsRouter from './routes/deals.routes.js';
import { companiesBackendModule } from '@xapps/module-companies/server';

export const dealsBackendModule = {
  name: 'deals',
  dependencies: [companiesBackendModule],
  register: (app) => {
    app.use('/api/deals', dealsRouter);
  }
};
