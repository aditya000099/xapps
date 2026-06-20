import { Users } from '@phosphor-icons/react';
import Contacts from './pages/Contacts.jsx';
import { companiesModule } from '@xapps/module-companies/client';

export const contactsModule = {
  name: 'contacts',
  dependencies: [companiesModule],
  routes: [
    {
      path: '/contacts',
      element: <Contacts />,
      requiredPermission: 'contacts:read',
    }
  ],
  navItems: [
    { label: 'Contacts', path: '/contacts', icon: Users, requiredPermission: 'contacts:read' }
  ]
};
