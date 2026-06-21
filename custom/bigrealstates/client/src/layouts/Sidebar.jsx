import React from 'react';
import { NavLink } from 'react-router-dom';
import { getRegisteredModules } from '../module-registry.js';
import { clientConfig } from '../client-config.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import { SquaresFour, Users, Briefcase } from '@phosphor-icons/react';

export function Sidebar() {
  const { navItems } = getRegisteredModules();
  const { hasPermission } = useAuth();

  // Filter core navigation based on RBAC
  const coreNav = [
    { label: 'Dashboard', path: '/', icon: SquaresFour, permission: 'core:dashboard' },
  ].filter(item => hasPermission(item.permission));

  // Filter module navigation based on RBAC. 
  // We assume modules expose a 'requiredPermission' on their navItems if they want to be protected.
  const visibleNavItems = navItems.filter(item => {
    if (!item.requiredPermission) return true;
    return hasPermission(item.requiredPermission);
  });

  // Helper to render icons. We pass Phosphor icon components from the module registry,
  // or strings if we need to map them (for simplicity here, we assume the registry passes the component).
  return (
    <aside className="w-64 border-r border-sidebar-border bg-sidebar-bg flex flex-col h-full overflow-y-auto">
      <div className="p-6 border-b border-sidebar-border">
        <h2 className="text-xl font-bold text-sidebar-foreground">
          {clientConfig.logoText}
        </h2>
      </div>

      <nav className="flex-1 p-4 space-y-8">
        {/* Core Navigation */}
        <div>
          <p className="px-3 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2">
            Core CRM
          </p>
          <div className="space-y-1">
            {coreNav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sidebar-active text-sidebar-active-foreground'
                      : 'text-sidebar-foreground/80 hover:bg-sidebar-active/50 hover:text-sidebar-foreground'
                  }`
                }
              >
                <item.icon size={20} weight="duotone" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Modular Navigation */}
        {visibleNavItems.length > 0 && (
          <div>
            <p className="px-3 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2">
              Modules
            </p>
            <div className="space-y-1">
              {visibleNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-sidebar-active text-sidebar-active-foreground'
                        : 'text-sidebar-foreground/80 hover:bg-sidebar-active/50 hover:text-sidebar-foreground'
                    }`
                  }
                >
                  <item.icon size={20} weight="duotone" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
}
