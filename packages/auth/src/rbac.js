/**
 * Role-Based Access Control Definitions
 *
 * Defines the standard roles available in the CRM and the specific permissions they hold.
 * This is used by the backend to guard API routes, and by the frontend to hide UI elements.
 */

// Define all possible permissions in the system.
// This list can grow as new modules are added (e.g. real-estate:write)
export const PERMISSIONS = {
  // Core CRM
  CORE_DASHBOARD: 'core:dashboard',
  COMPANIES_READ: 'companies:read',
  COMPANIES_WRITE: 'companies:write',
  CONTACTS_READ: 'contacts:read',
  CONTACTS_WRITE: 'contacts:write',
  DEALS_READ: 'deals:read',
  DEALS_WRITE: 'deals:write',
  TICKETS_READ: 'tickets:read',
  TICKETS_WRITE: 'tickets:write',
  INVOICES_READ: 'invoices:read',
  INVOICES_WRITE: 'invoices:write',

  // Extra Modules
  REAL_ESTATE_ACCESS: 'real-estate:access',
  REAL_ESTATE_WRITE: 'real-estate:write',
};

/**
 * Roles map to arrays of permissions.
 * 'admin' has a special wildcard '*' permission handled in the middleware.
 */
export const ROLES = {
  admin: ['*'],
  manager: [
    PERMISSIONS.CORE_DASHBOARD,
    PERMISSIONS.COMPANIES_READ,
    PERMISSIONS.COMPANIES_WRITE,
    PERMISSIONS.CONTACTS_READ,
    PERMISSIONS.CONTACTS_WRITE,
    PERMISSIONS.DEALS_READ,
    PERMISSIONS.DEALS_WRITE,
    PERMISSIONS.TICKETS_READ,
    PERMISSIONS.TICKETS_WRITE,
    PERMISSIONS.INVOICES_READ,
    PERMISSIONS.INVOICES_WRITE,
    PERMISSIONS.REAL_ESTATE_ACCESS,
    PERMISSIONS.REAL_ESTATE_WRITE,
  ],
  sales_rep: [
    PERMISSIONS.CORE_DASHBOARD,
    PERMISSIONS.COMPANIES_READ,
    PERMISSIONS.COMPANIES_WRITE,
    PERMISSIONS.CONTACTS_READ,
    PERMISSIONS.DEALS_READ,
    PERMISSIONS.DEALS_WRITE,
    PERMISSIONS.INVOICES_READ, // Can view invoices but not create them
    PERMISSIONS.REAL_ESTATE_ACCESS,
    PERMISSIONS.REAL_ESTATE_WRITE, // Practically, sales reps manage properties
  ],
  support: [
    PERMISSIONS.CORE_DASHBOARD,
    PERMISSIONS.CONTACTS_READ,
    PERMISSIONS.TICKETS_READ,
    PERMISSIONS.TICKETS_WRITE,
  ],
};

/**
 * Check if a role has a specific permission.
 * @param {string} role 
 * @param {string} permission 
 * @returns {boolean}
 */
export function hasPermission(role, permission) {
  const rolePermissions = ROLES[role] || [];
  if (rolePermissions.includes('*')) return true;
  return rolePermissions.includes(permission);
}
