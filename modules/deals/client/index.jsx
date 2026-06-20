import { Briefcase } from '@phosphor-icons/react';
import Deals from './pages/Deals.jsx';

export const dealsModule = {
  name: 'deals',
  routes: [
    {
      path: '/deals',
      element: <Deals />,
      requiredPermission: 'deals:read',
    }
  ],
  navItems: [
    { label: 'Deals', path: '/deals', icon: Briefcase, requiredPermission: 'deals:read' }
  ]
};
