import { Receipt } from '@phosphor-icons/react';
import Invoices from './pages/Invoices.jsx';

export const invoicingModule = {
  name: 'invoicing',
  routes: [
    {
      path: '/invoicing',
      element: <Invoices />,
      requiredPermission: 'invoicing:access',
    }
  ],
  navItems: [
    { label: 'Invoices', path: '/invoicing', icon: Receipt, requiredPermission: 'invoicing:access' }
  ]
};
