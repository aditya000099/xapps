import ReactGA from 'react-ga4';
import { useEffect } from 'react';

/**
 * Initialize Google Analytics
 * @param {string} measurementId - e.g. "G-XXXXXXXXXX"
 */
export const initAnalytics = (measurementId) => {
  if (measurementId) {
    ReactGA.initialize(measurementId);
  } else {
    console.warn("Analytics: Measurement ID is missing");
  }
};

/**
 * Track a page view
 * @param {string} path - The page path e.g., window.location.pathname
 */
export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

/**
 * Track a custom event
 */
export const trackEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label
  });
};
