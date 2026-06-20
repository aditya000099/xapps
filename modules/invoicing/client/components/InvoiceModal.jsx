import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Button } from '@xapps/ui';

export function InvoiceModal({ isOpen, onClose, invoice, companies, onSave }) {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    amount: '',
    status: 'Draft',
    dueDate: '',
    companyId: ''
  });

  useEffect(() => {
    if (invoice) {
      setFormData({
        invoiceNumber: invoice.invoiceNumber || '',
        amount: invoice.amount || '',
        status: invoice.status || 'Draft',
        dueDate: invoice.dueDate ? new Date(invoice.dueDate).toISOString().split('T')[0] : '',
        companyId: invoice.companyId || ''
      });
    } else {
      setFormData({
        invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
        amount: '',
        status: 'Draft',
        dueDate: '',
        companyId: ''
      });
    }
  }, [invoice, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const statusOptions = [
    { label: 'Draft', value: 'Draft' },
    { label: 'Sent', value: 'Sent' },
    { label: 'Paid', value: 'Paid' },
    { label: 'Overdue', value: 'Overdue' }
  ];

  const companyOptions = [
    { label: 'None', value: '' },
    ...companies.map(c => ({ label: c.name, value: c.id }))
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={invoice ? 'Edit Invoice' : 'Add Invoice'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Invoice Number *</label>
          <Input 
            value={formData.invoiceNumber} 
            onChange={e => setFormData({ ...formData, invoiceNumber: e.target.value })} 
            required 
            placeholder="INV-1001" 
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Amount ($)</label>
            <Input 
              type="number"
              value={formData.amount} 
              onChange={e => setFormData({ ...formData, amount: e.target.value })} 
              placeholder="1500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <Input 
              type="date"
              value={formData.dueDate} 
              onChange={e => setFormData({ ...formData, dueDate: e.target.value })} 
            />
          </div>
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
          <Button type="submit">Save Invoice</Button>
        </div>
      </form>
    </Modal>
  );
}
