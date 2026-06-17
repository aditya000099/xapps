/**
 * @xapps/types — Tenant Type Definitions
 */

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  enabledModules: string[];
  settings: Record<string, unknown>;
  createdAt: Date;
}

export interface TenantConfig {
  modules: string[];
  theme: Record<string, string>;
  features: Record<string, boolean>;
}
