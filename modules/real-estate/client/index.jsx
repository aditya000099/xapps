import { List, House, IdentificationCard, Calendar } from '@phosphor-icons/react';
import routes from './routes.jsx';

export const realEstateModule = {
  name: 'real-estate',
  routes: routes,
  navItems: [
    { label: 'Listings', path: '/real-estate/listings', icon: List, requiredPermission: 'real-estate:access' },
    { label: 'Properties', path: '/real-estate/properties', icon: House, requiredPermission: 'real-estate:access' },
    { label: 'Agents', path: '/real-estate/agents', icon: IdentificationCard, requiredPermission: 'real-estate:access' },
    { label: 'Viewings', path: '/real-estate/viewings', icon: Calendar, requiredPermission: 'real-estate:access' },
  ]
};
