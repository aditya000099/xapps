import invoicingRouter from './routes/invoicing.routes.js';
import { companiesBackendModule } from '@xapps/module-companies/server';

export const invoicingBackendModule = {
  name: 'invoicing',
  dependencies: [companiesBackendModule],
  register: (app) => {
    app.use('/api/invoicing', invoicingRouter);
  }
};
