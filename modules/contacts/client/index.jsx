import { Users } from '@phosphor-icons/react';
import Contacts from './pages/Contacts.jsx';

export const contactsModule = {
  name: 'contacts',
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
