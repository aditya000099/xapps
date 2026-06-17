import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { initAnalytics, trackPageView } from '@xapps/utils/client';

// Helper component to track page views on route change
function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}

export default function App() {
  useEffect(() => {
    // Initialize GA4 with your Measurement ID (usually from process.env.VITE_GA_MEASUREMENT_ID)
    initAnalytics('G-XXXXXXXXXX');
  }, []);

  return (
    <BrowserRouter>
      <PageTracker />
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex justify-center items-center w-full bg-red-500 text-white p-3">
              Welcome to CRM
            </div>
          }
        />
        <Route path="/settings" element={<div>CRM Settings</div>} />
      </Routes>
    </BrowserRouter>
  );
}
