import { Ticket } from '@phosphor-icons/react';
import Tickets from './pages/Tickets.jsx';

export const ticketingModule = {
  name: 'ticketing',
  routes: [
    {
      path: '/ticketing',
      element: <Tickets />,
      requiredPermission: 'ticketing:access',
    }
  ],
  navItems: [
    { label: 'Support Tickets', path: '/ticketing', icon: Ticket, requiredPermission: 'ticketing:access' }
  ]
};
