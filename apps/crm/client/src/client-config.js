/**
 * Client Configuration
 * 
 * This file is highly customizable per client repository. It dictates
 * which modules are loaded, UI branding overrides, and feature flags.
 */

export const clientConfig = {
  // General branding
  appName: 'XApps CRM',
  logoText: 'XApps',

  // Which extra modules should be loaded for this specific client?
  enabledModules: [
    'real-estate' // The real estate vertical module
  ],

  // Specific feature toggles
  features: {
    enableDeals: true,
    enableSupportTickets: false,
  },

  // Overrides for navigation (e.g. if a client wants 'Contacts' renamed to 'Clients')
  navigationOverrides: {
    contacts: {
      label: 'Clients'
    }
  }
};
