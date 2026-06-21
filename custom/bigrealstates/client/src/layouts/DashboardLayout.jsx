import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar.jsx';
import { ThemeToggle, Avatar, Button } from '@xapps/ui';
import { useAuth } from '../contexts/AuthContext.jsx';
import { SignOut } from '@phosphor-icons/react';

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar (Desktop) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-6 bg-card border-b border-border shrink-0">
          <div className="flex items-center gap-4">
            {/* Mobile menu button could go here */}
            <h1 className="text-lg font-semibold text-foreground md:hidden">CRM</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="h-8 w-px bg-border"></div>
            <div className="flex items-center gap-3">
              <Avatar name={user?.name || 'User'} size="sm" />
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-foreground leading-none">{user?.name}</p>
                <p className="text-xs text-muted-foreground mt-1 capitalize">{user?.role?.replace('_', ' ')}</p>
              </div>
              <Button variant="ghost" size="sm" className="ml-2 px-2" onClick={handleLogout} title="Logout">
                <SignOut size={18} />
              </Button>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
