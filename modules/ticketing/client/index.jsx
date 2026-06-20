import { Ticket } from '@phosphor-icons/react';
import Tickets from './pages/Tickets.jsx';
import { companiesModule } from '@xapps/module-companies/client';

export const ticketingModule = {
  name: 'ticketing',
  dependencies: [companiesModule],
  routes: [
    {
      path: '/tickets',
      element: <Tickets />,
      requiredPermission: 'tickets:read',
    }
  ],
  navItems: [
    { label: 'Tickets', path: '/tickets', icon: Ticket, requiredPermission: 'tickets:read' }
  ]
};
