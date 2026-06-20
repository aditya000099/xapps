import React, { lazy, Suspense } from 'react';
import { Spinner } from '@xapps/ui';

const Listings = lazy(() => import('./pages/Listings.jsx'));
const Agents = lazy(() => import('./pages/Agents.jsx'));
const Viewings = lazy(() => import('./pages/Viewings.jsx'));
const Offers = lazy(() => import('./pages/Offers.jsx'));

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
    path: '/real-estate/viewings',
    element: Loadable(Viewings)({}),
    requiredPermission: 'real-estate:access',
  },
  {
    path: '/real-estate/offers',
    element: Loadable(Offers)({}),
    requiredPermission: 'real-estate:access',
  },
];

export default routes;
