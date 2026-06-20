import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Button } from '@xapps/ui';

export function DealModal({ isOpen, onClose, deal, companies, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    stage: 'Lead',
    expectedCloseDate: '',
    companyId: ''
  });

  useEffect(() => {
    if (deal) {
      setFormData({
        title: deal.title || '',
        amount: deal.amount || '',
        stage: deal.stage || 'Lead',
        expectedCloseDate: deal.expectedCloseDate ? new Date(deal.expectedCloseDate).toISOString().split('T')[0] : '',
        companyId: deal.companyId || ''
      });
    } else {
      setFormData({
        title: '',
        amount: '',
        stage: 'Lead',
        expectedCloseDate: '',
        companyId: ''
      });
    }
  }, [deal, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const stageOptions = [
    { label: 'Lead', value: 'Lead' },
    { label: 'Qualification', value: 'Qualification' },
    { label: 'Proposal', value: 'Proposal' },
    { label: 'Won', value: 'Won' },
    { label: 'Lost', value: 'Lost' }
  ];

  const companyOptions = [
    { label: 'None', value: '' },
    ...companies.map(c => ({ label: c.name, value: c.id }))
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={deal ? 'Edit Deal' : 'Add Deal'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Deal Title *</label>
          <Input 
            value={formData.title} 
            onChange={e => setFormData({ ...formData, title: e.target.value })} 
            required 
            placeholder="e.g. Website Redesign" 
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Amount ($)</label>
            <Input 
              type="number"
              value={formData.amount} 
              onChange={e => setFormData({ ...formData, amount: e.target.value })} 
              placeholder="5000" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Expected Close Date</label>
            <Input 
              type="date"
              value={formData.expectedCloseDate} 
              onChange={e => setFormData({ ...formData, expectedCloseDate: e.target.value })} 
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Stage</label>
            <Select 
              options={stageOptions}
              value={formData.stage}
              onChange={e => setFormData({ ...formData, stage: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Company</label>
            <Select 
              options={companyOptions}
              value={formData.companyId}
              onChange={e => setFormData({ ...formData, companyId: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save Deal</Button>
        </div>
      </form>
    </Modal>
  );
}
