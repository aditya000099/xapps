/**
 * @xapps/types — Module Type Definitions
 */

export interface ModuleManifest {
  name: string;
  displayName: string;
  icon: string;
  version: string;
  description: string;
  basePath: string;
  apiPrefix: string;
  dependencies: string[];
  requiredPermissions: string[];
  databases: string[];
  settings: Record<string, unknown>;
}

export interface ModuleClientExport {
  routes: unknown[];
  navItems: unknown[];
}

export interface ModuleServerExport {
  routes: unknown[];
  services: Record<string, unknown>;
  migrationsPath: string;
}
