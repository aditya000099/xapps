import contactsRouter from './routes/contacts.routes.js';
import { companiesBackendModule } from '@xapps/module-companies/server';

export const contactsBackendModule = {
  name: 'contacts',
  dependencies: [companiesBackendModule],
  register: (app) => {
    app.use('/api/contacts', contactsRouter);
  }
};
