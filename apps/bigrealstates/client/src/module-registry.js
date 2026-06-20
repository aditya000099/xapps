/**
 * Module Registry
 * 
 * Aggregates routes and navigation from all enabled modules defined in client-config.js.
 * This makes the CRM completely plug-and-play.
 */

import { clientConfig } from './client-config.js';
import { FrontendModuleRegistry } from '@xapps/core-client';
import { contactsModule } from '@xapps/module-contacts/client';
import { dealsModule } from '@xapps/module-deals/client';
import { realEstateModule } from '@xapps/module-real-estate/client';

const registry = new FrontendModuleRegistry();

// Plug the modules into the CRM Shell
registry.plug(contactsModule);
registry.plug(dealsModule);
registry.plug(realEstateModule);

export function getRegisteredModules() {
  return {
    routes: registry.getRoutes(),
    navItems: registry.getNavItems(),
  };
}
