import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Button } from '@xapps/ui';

export function AgentModal({ isOpen, onClose, agent, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Broker'
  });

  useEffect(() => {
    if (agent) {
      setFormData({
        name: agent.name || '',
        email: agent.email || '',
        phone: agent.phone || '',
        role: agent.role || 'Broker'
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'Broker'
      });
    }
  }, [agent, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const roleOptions = [
    { label: 'Broker', value: 'Broker' },
    { label: 'Buying Agent', value: 'Buying Agent' },
    { label: 'Listing Agent', value: 'Listing Agent' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={agent ? 'Edit Agent' : 'Add Agent'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <Input 
            value={formData.name} 
            onChange={e => setFormData({ ...formData, name: e.target.value })} 
            required 
            placeholder="John Doe" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <Input 
            type="email"
            value={formData.email} 
            onChange={e => setFormData({ ...formData, email: e.target.value })} 
            required 
            placeholder="john@example.com" 
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <Input 
              type="tel"
              value={formData.phone} 
              onChange={e => setFormData({ ...formData, phone: e.target.value })} 
              placeholder="(555) 123-4567" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <Select 
              options={roleOptions}
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save Agent</Button>
        </div>
      </form>
    </Modal>
  );
}
