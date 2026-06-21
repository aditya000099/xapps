import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { clientConfig } from '../client-config.js';
import { Card, CardHeader, CardBody, Input, Button, Badge } from '@xapps/ui';

export function Login() {
  const [email, setEmail] = useState('admin@xapps.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-sidebar-bg">
      <div className="w-full max-w-md p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">{clientConfig.logoText}</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Please login to your account.</p>
        </div>

        <Card>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded bg-danger/10 text-danger text-sm text-center">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                <Input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  fullWidth
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Password</label>
                <Input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  fullWidth
                />
              </div>

              <Button type="submit" fullWidth disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </CardBody>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">Demo Accounts:</p>
          <div className="flex justify-center gap-2 mt-2">
            <Badge variant="outline">admin@xapps.com</Badge>
            <Badge variant="outline">sales@xapps.com</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
