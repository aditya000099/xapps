import React, { useState, useEffect } from 'react';
import { Modal, Input, Button } from '@xapps/ui';

export function CompanyModal({ isOpen, onClose, company, onSave }) {
  const [formData, setFormData] = useState({ name: '', website: '' });

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || '',
        website: company.website || ''
      });
    } else {
      setFormData({ name: '', website: '' });
    }
  }, [company, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={company ? 'Edit Company' : 'Add Company'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Company Name *</label>
          <Input 
            value={formData.name} 
            onChange={e => setFormData({ ...formData, name: e.target.value })} 
            required 
            placeholder="e.g. Acme Corp" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Website</label>
          <Input 
            type="url"
            value={formData.website} 
            onChange={e => setFormData({ ...formData, website: e.target.value })} 
            placeholder="e.g. https://acme.com" 
          />
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save Company</Button>
        </div>
      </form>
    </Modal>
  );
}
