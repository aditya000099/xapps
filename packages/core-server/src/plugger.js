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
  plug(module) {
    if (this.modules.has(module.name)) {
      console.warn(`Module ${module.name} is already plugged in.`);
      return;
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
