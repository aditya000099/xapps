import { Gear } from '@phosphor-icons/react';
import routes from './routes.jsx';

export const settingsModule = {
  name: 'settings',
  routes: routes,
  navItems: [
    { label: 'Settings', path: '/settings', icon: Gear }
  ]
};
