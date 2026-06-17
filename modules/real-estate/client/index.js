/**
 * Real Estate Module — Client Entry
 *
 * Exports everything the shell needs to integrate this module:
 * - routes: React Router route definitions
 * - navItems: Sidebar navigation entries
 */

export { default as routes } from './routes';

export const navItems = [
  { label: 'Listings', path: '/real-estate/listings', icon: 'list' },
  { label: 'Properties', path: '/real-estate/properties', icon: 'home' },
  { label: 'Agents', path: '/real-estate/agents', icon: 'user-tie' },
  { label: 'Viewings', path: '/real-estate/viewings', icon: 'calendar' },
];
