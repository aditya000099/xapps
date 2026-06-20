import { Buildings } from '@phosphor-icons/react';
import Companies from './pages/Companies.jsx';

export const companiesModule = {
  name: 'companies',
  routes: [
    {
      path: '/companies',
      element: <Companies />,
      requiredPermission: 'companies:read',
    }
  ],
  navItems: [
    { label: 'Companies', path: '/companies', icon: Buildings, requiredPermission: 'companies:read' }
  ]
};
