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
  plug(module) {
    if (this.modules.has(module.name)) {
      console.warn(`Module ${module.name} is already plugged in.`);
      return;
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
