import { Handshake } from '@phosphor-icons/react';
import Deals from './pages/Deals.jsx';
import { companiesModule } from '@xapps/module-companies/client';

export const dealsModule = {
  name: 'deals',
  dependencies: [companiesModule],
  routes: [
    {
      path: '/deals',
      element: <Deals />,
      requiredPermission: 'deals:read',
    }
  ],
  navItems: [
    { label: 'Deals', path: '/deals', icon: Handshake, requiredPermission: 'deals:read' }
  ]
};
