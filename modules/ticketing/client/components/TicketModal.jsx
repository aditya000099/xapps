import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Button } from '@xapps/ui';

export function TicketModal({ isOpen, onClose, ticket, contacts, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Open',
    priority: 'Normal',
    contactId: ''
  });

  useEffect(() => {
    if (ticket) {
      setFormData({
        title: ticket.title || '',
        description: ticket.description || '',
        status: ticket.status || 'Open',
        priority: ticket.priority || 'Normal',
        contactId: ticket.contactId || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'Open',
        priority: 'Normal',
        contactId: ''
      });
    }
  }, [ticket, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const statusOptions = [
    { label: 'Open', value: 'Open' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Resolved', value: 'Resolved' }
  ];

  const priorityOptions = [
    { label: 'Low', value: 'Low' },
    { label: 'Normal', value: 'Normal' },
    { label: 'High', value: 'High' }
  ];

  const contactOptions = [
    { label: 'None', value: '' },
    ...contacts.map(c => ({ label: c.name, value: c.id }))
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={ticket ? 'Edit Ticket' : 'Add Ticket'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <Input 
            value={formData.title} 
            onChange={e => setFormData({ ...formData, title: e.target.value })} 
            required 
            placeholder="e.g. Server down" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
            placeholder="Describe the issue..."
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <Select 
              options={statusOptions}
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <Select 
              options={priorityOptions}
              value={formData.priority}
              onChange={e => setFormData({ ...formData, priority: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contact</label>
          <Select 
            options={contactOptions}
            value={formData.contactId}
            onChange={e => setFormData({ ...formData, contactId: e.target.value })}
          />
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save Ticket</Button>
        </div>
      </form>
    </Modal>
  );
}
