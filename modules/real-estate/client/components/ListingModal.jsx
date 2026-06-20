import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Button } from '@xapps/ui';

export function ListingModal({ isOpen, onClose, listing, agents, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    beds: '',
    baths: '',
    status: 'Active',
    agentId: ''
  });

  useEffect(() => {
    if (listing) {
      setFormData({
        title: listing.title || '',
        price: listing.price || '',
        beds: listing.beds || '',
        baths: listing.baths || '',
        status: listing.status || 'Active',
        agentId: listing.agentId || ''
      });
    } else {
      setFormData({
        title: '',
        price: '',
        beds: '',
        baths: '',
        status: 'Active',
        agentId: ''
      });
    }
  }, [listing, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Sold', value: 'Sold' }
  ];

  const agentOptions = [
    { label: 'None', value: '' },
    ...agents.map(a => ({ label: a.name, value: a.id }))
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={listing ? 'Edit Listing' : 'Add Listing'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <Input 
            value={formData.title} 
            onChange={e => setFormData({ ...formData, title: e.target.value })} 
            required 
            placeholder="e.g. 123 Main St" 
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price ($)</label>
            <Input 
              type="number"
              value={formData.price} 
              onChange={e => setFormData({ ...formData, price: e.target.value })} 
              placeholder="500000" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <Select 
              options={statusOptions}
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Beds</label>
            <Input 
              type="number"
              value={formData.beds} 
              onChange={e => setFormData({ ...formData, beds: e.target.value })} 
              placeholder="3" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Baths</label>
            <Input 
              type="number"
              step="0.5"
              value={formData.baths} 
              onChange={e => setFormData({ ...formData, baths: e.target.value })} 
              placeholder="2.5" 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Assigned Agent *</label>
          <Select 
            options={agentOptions}
            value={formData.agentId}
            onChange={e => setFormData({ ...formData, agentId: e.target.value })}
            required
          />
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save Listing</Button>
        </div>
      </form>
    </Modal>
  );
}
