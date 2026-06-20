import React, { lazy, Suspense } from 'react';
import { Spinner } from '@xapps/ui';

// Lazy load module pages so they are chunked separately by Vite
const Listings = lazy(() => import('./pages/Listings.jsx'));
const Agents = lazy(() => import('./pages/Agents.jsx'));

// Simple loading wrapper
const Loadable = (Component) => (props) => (
  <Suspense fallback={<div className="flex h-64 items-center justify-center"><Spinner size="lg" /></div>}>
    <Component {...props} />
  </Suspense>
);

const routes = [
  {
    path: '/real-estate/listings',
    element: Loadable(Listings)({}),
    requiredPermission: 'real-estate:access',
  },
  {
    path: '/real-estate/agents',
    element: Loadable(Agents)({}),
    requiredPermission: 'real-estate:access',
  },
  {
    path: '/real-estate/properties',
    element: <div className="p-8 text-center text-muted-foreground">Properties Module (Coming Soon)</div>,
  },
  {
    path: '/real-estate/viewings',
    element: <div className="p-8 text-center text-muted-foreground">Viewings Module (Coming Soon)</div>,
  },
];

export default routes;
