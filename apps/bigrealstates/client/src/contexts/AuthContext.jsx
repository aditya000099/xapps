import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  permissions: [],
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  hasPermission: () => false,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSession = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setPermissions(data.permissions);
      } else {
        setUser(null);
        setPermissions([]);
      }
    } catch (err) {
      setUser(null);
      setPermissions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (res.ok) {
      await fetchSession(); // hydrate state
      return true;
    }
    return false;
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setPermissions([]);
  };

  const hasPermission = (permission) => {
    if (permissions.includes('*')) return true;
    return permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ user, permissions, isLoading, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
