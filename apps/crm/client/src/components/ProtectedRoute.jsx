import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Spinner } from '@xapps/ui';

export function ProtectedRoute({ requiredPermission, children }) {
  const { user, isLoading, hasPermission } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-background text-center">
        <h1 className="text-3xl font-bold text-danger mb-2">Access Denied</h1>
        <p className="text-muted-foreground">You don't have permission to view this module.</p>
      </div>
    );
  }

  return children ? children : <Outlet />;
}
