import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Select } from '@xapps/ui';

export function ViewingModal({ isOpen, onClose, viewing, listings, agents, contacts, onSave }) {
  const [formData, setFormData] = useState({
    listingId: '',
    agentId: '',
    contactId: '',
    scheduledAt: '',
    status: 'Scheduled',
    notes: ''
  });

  useEffect(() => {
    if (viewing) {
      setFormData({
        listingId: viewing.listingId,
        agentId: viewing.agentId,
        contactId: viewing.contactId,
        scheduledAt: new Date(viewing.scheduledAt).toISOString().slice(0, 16),
        status: viewing.status,
        notes: viewing.notes || ''
      });
    } else {
      setFormData({
        listingId: '',
        agentId: '',
        contactId: '',
        scheduledAt: '',
        status: 'Scheduled',
        notes: ''
      });
    }
  }, [viewing, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      scheduledAt: new Date(formData.scheduledAt).toISOString()
    });
  };

  const listingOptions = [
    { label: 'Select a listing...', value: '' },
    ...listings.map(l => ({ label: l.title, value: l.id }))
  ];

  const contactOptions = [
    { label: 'Select a client...', value: '' },
    ...contacts.map(c => ({ label: c.name, value: c.id }))
  ];

  const agentOptions = [
    { label: 'Select an agent...', value: '' },
    ...agents.map(a => ({ label: a.name, value: a.id }))
  ];

  const statusOptions = [
    { label: 'Scheduled', value: 'Scheduled' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Cancelled', value: 'Cancelled' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={viewing ? "Edit Viewing" : "Schedule Viewing"}>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="block text-sm font-medium mb-1">Property Listing *</label>
          <Select
            options={listingOptions}
            value={formData.listingId}
            onChange={e => setFormData({...formData, listingId: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Client (Contact) *</label>
          <Select
            options={contactOptions}
            value={formData.contactId}
            onChange={e => setFormData({...formData, contactId: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Assigned Agent *</label>
          <Select
            options={agentOptions}
            value={formData.agentId}
            onChange={e => setFormData({...formData, agentId: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date & Time *</label>
          <Input
            type="datetime-local"
            value={formData.scheduledAt}
            onChange={e => setFormData({...formData, scheduledAt: e.target.value})}
            required
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <Select
            options={statusOptions}
            value={formData.status}
            onChange={e => setFormData({...formData, status: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <Input
            value={formData.notes}
            onChange={e => setFormData({...formData, notes: e.target.value})}
            placeholder="Gate code, special requests..."
            className="w-full"
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  );
}
