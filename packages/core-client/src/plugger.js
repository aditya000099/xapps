export class FrontendModuleRegistry {
  constructor() {
    this.modules = new Map();
    this.routes = [];
    this.navItems = [];
  }

  /**
   * Plugs a frontend module into the React app.
   * @param {Object} module The module to plug in.
   * @param {string} module.name The unique name of the module.
   * @param {Array} module.routes React Router route definitions.
   * @param {Array} module.navItems Sidebar navigation items.
   */
  plug(module, isAutoPlugged = false) {
    if (!module) return;
    
    if (this.modules.has(module.name)) {
      return;
    }

    if (module.dependencies && Array.isArray(module.dependencies)) {
      for (const dep of module.dependencies) {
        this.plug(dep, true);
      }
    }

    if (isAutoPlugged) {
      console.warn(`⚠️ Warning: Module '${module.name}' was auto-plugged as a dependency. It is recommended to explicitly plug this module in your code.`);
    }

    this.modules.set(module.name, module);

    if (module.routes) {
      this.routes.push(...module.routes);
    }

    if (module.navItems) {
      this.navItems.push(...module.navItems);
    }

    console.log(`🔌 Plugged in frontend module: ${module.name}`);
  }

  getRoutes() {
    return this.routes;
  }

  getNavItems() {
    return this.navItems;
  }
}
