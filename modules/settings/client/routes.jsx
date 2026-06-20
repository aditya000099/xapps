import React, { lazy, Suspense } from 'react';
import { Spinner } from '@xapps/ui';

const Settings = lazy(() => import('./pages/Settings.jsx'));

const Loadable = (Component) => (props) => (
  <Suspense fallback={<div className="flex h-64 items-center justify-center"><Spinner size="lg" /></div>}>
    <Component {...props} />
  </Suspense>
);

const routes = [
  {
    path: '/settings',
    element: Loadable(Settings)({}),
  }
];

export default routes;
