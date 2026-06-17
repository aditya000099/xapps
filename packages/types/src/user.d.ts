/**
 * @xapps/types — User Type Definitions
 */

export type Permission = string;

export interface Role {
  name: string;
  permissions: Permission[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  tenantId: string;
  role: string;
  permissions: Permission[];
  avatar?: string;
}
