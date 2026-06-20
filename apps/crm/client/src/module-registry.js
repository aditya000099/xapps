/**
 * Module Registry
 * 
 * Aggregates routes and navigation from all enabled modules defined in client-config.js.
 * This makes the CRM completely plug-and-play.
 */

import { clientConfig } from './client-config.js';
import { FrontendModuleRegistry } from '@xapps/core-client';
import { companiesModule } from '@xapps/module-companies/client';
import { contactsModule } from '@xapps/module-contacts/client';
import { dealsModule } from '@xapps/module-deals/client';
import { realEstateModule } from '@xapps/module-real-estate/client';
import { ticketingModule } from '@xapps/module-ticketing/client';
import { invoicingModule } from '@xapps/module-invoicing/client';

const registry = new FrontendModuleRegistry();

// Plug in the features we want for the Core CRM
registry.plug(companiesModule);
registry.plug(contactsModule);
registry.plug(dealsModule);
registry.plug(realEstateModule);
registry.plug(ticketingModule);
registry.plug(invoicingModule);

export function getRegisteredModules() {
  return {
    routes: registry.getRoutes(),
    navItems: registry.getNavItems(),
  };
}
