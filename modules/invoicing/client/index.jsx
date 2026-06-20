import { Receipt } from '@phosphor-icons/react';
import Invoices from './pages/Invoices.jsx';
import { companiesModule } from '@xapps/module-companies/client';

export const invoicingModule = {
  name: 'invoicing',
  dependencies: [companiesModule],
  routes: [
    {
      path: '/invoices',
      element: <Invoices />,
      requiredPermission: 'invoices:read',
    }
  ],
  navItems: [
    { label: 'Invoices', path: '/invoices', icon: Receipt, requiredPermission: 'invoices:read' }
  ]
};
