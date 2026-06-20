import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { DashboardLayout } from './layouts/DashboardLayout.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Login } from './pages/Login.jsx';
import { getRegisteredModules } from './module-registry.js';
import { clientConfig } from './client-config.js';

export default function App() {
  const { routes: moduleRoutes } = getRegisteredModules();

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardLayout />}>
              {/* Core CRM Routes */}
              <Route index element={<Dashboard />} />

              {/* Dynamically Injected Module Routes */}
              {moduleRoutes.map((route) => (
                <Route 
                  key={route.path} 
                  path={route.path.replace(/^\//, '')} 
                  element={
                    // Each module route can optionally define a requiredPermission in the registry
                    route.requiredPermission 
                      ? <ProtectedRoute requiredPermission={route.requiredPermission}>{route.element}</ProtectedRoute>
                      : route.element
                  } 
                />
              ))}

              {/* 404 Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
