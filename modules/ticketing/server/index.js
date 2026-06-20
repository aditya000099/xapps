import ticketingRouter from './routes/ticketing.routes.js';
import { companiesBackendModule } from '@xapps/module-companies/server';

export const ticketingBackendModule = {
  name: 'ticketing',
  dependencies: [companiesBackendModule],
  register: (app) => {
    app.use('/api/ticketing', ticketingRouter);
  },
  getStats: async (prisma) => {
    const openTickets = await prisma.supportTicket.count({ where: { status: 'Open' } });
    return {
      'Open Tickets': { value: openTickets, desc: 'Awaiting resolution' }
    };
  }
};
