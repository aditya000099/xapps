// Real Estate Module Manifest
// Defines metadata, routing, permissions, and settings for the Real Estate vertical.
export default {
  name: 'real-estate',
  displayName: 'Real Estate',
  icon: 'building',
  version: '1.0.0',
  description: 'Real Estate Management — listings, properties, agents, viewings',
  basePath: '/real-estate',
  apiPrefix: '/api/real-estate',
  dependencies: [],
  requiredPermissions: ['real-estate:access'],
  databases: ['postgres'],
  settings: {
    enableViewings: { type: 'boolean', default: true },
    maxListingsPerAgent: { type: 'number', default: 100 },
  },
};
