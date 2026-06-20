import { List, IdentificationCard, Calendar, Handshake } from '@phosphor-icons/react';
import routes from './routes.jsx';

export const realEstateModule = {
  name: 'real-estate',
  routes: routes,
  navItems: [
    { label: 'Listings', path: '/real-estate/listings', icon: List, requiredPermission: 'real-estate:access' },
    { label: 'Agents', path: '/real-estate/agents', icon: IdentificationCard, requiredPermission: 'real-estate:access' },
    { label: 'Viewings', path: '/real-estate/viewings', icon: Calendar, requiredPermission: 'real-estate:access' },
    { label: 'Offers', path: '/real-estate/offers', icon: Handshake, requiredPermission: 'real-estate:access' },
  ]
};
