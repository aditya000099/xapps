import contactsRouter from './routes/contacts.routes.js';
import { companiesBackendModule } from '@xapps/module-companies/server';

export const contactsBackendModule = {
  name: 'contacts',
  dependencies: [companiesBackendModule],
  register: (app) => {
    app.use('/api/contacts', contactsRouter);
  },
  getStats: async (prisma) => {
    const totalContacts = await prisma.contact.count();
    const activeContacts = await prisma.contact.count({ where: { status: 'Active' } });
    return {
      'Total Contacts': { value: totalContacts, desc: 'Across all accounts' },
      'Active Contacts': { value: activeContacts }
    };
  }
};
