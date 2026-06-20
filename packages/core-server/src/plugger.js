export class BackendModuleRegistry {
  constructor(app) {
    this.app = app;
    this.modules = new Map();
  }

  /**
   * Plugs a backend module into the Express app.
   * @param {Object} module The module to plug in.
   * @param {string} module.name The unique name of the module.
   * @param {Function} module.register A function that takes the Express app and mounts its routes.
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

    try {
      module.register(this.app);
      this.modules.set(module.name, module);
      console.log(`🔌 Plugged in backend module: ${module.name}`);
    } catch (err) {
      console.error(`Failed to plug in module ${module.name}:`, err);
    }
  }

  getPluggedModules() {
    return Array.from(this.modules.keys());
  }
}
