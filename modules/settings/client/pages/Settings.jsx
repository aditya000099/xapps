import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Input, Button, Spinner } from '@xapps/ui';
import { User, EnvelopeSimple, ShieldCheck } from '@phosphor-icons/react';

export default function Settings() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch('/api/settings/profile')
      .then(r => r.json())
      .then(data => {
        setProfile(data);
        setFormData({ name: data.name || '', email: data.email || '' });
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/settings/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setProfile(data);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-12 flex justify-center"><Spinner size="lg" /></div>;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your account settings and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-foreground">Profile Information</h2>
        </CardHeader>
        <CardBody>
          {message && (
            <div className={`p-3 rounded-md mb-4 text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2 text-foreground">
                  <User size={16} /> Full Name
                </label>
                <Input
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2 text-foreground">
                  <EnvelopeSimple size={16} /> Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-sm font-medium mb-1 flex items-center gap-2 text-foreground">
                <ShieldCheck size={16} /> Role
              </label>
              <div className="text-sm px-3 py-2 bg-muted/50 rounded-md border border-border inline-block capitalize">
                {profile?.role || 'User'}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-border">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
