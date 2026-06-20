import React, { useState, useEffect } from 'react';
import { Card, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge, Spinner, Button } from '@xapps/ui';
import { Plus, Trash, PencilSimple, DownloadSimple } from '@phosphor-icons/react';
import { InvoiceModal } from '../components/InvoiceModal.jsx';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  const fetchInvoices = async () => {
    try {
      const res = await fetch('/api/invoicing');
      const data = await res.json();
      if (Array.isArray(data)) setInvoices(data);
    } catch (err) { console.error(err); }
  };

  const fetchCompanies = async () => {
    try {
      const res = await fetch('/api/companies');
      const data = await res.json();
      if (Array.isArray(data)) setCompanies(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    Promise.all([fetchInvoices(), fetchCompanies()]).finally(() => setIsLoading(false));
  }, []);

  const handleCreate = () => {
    setEditingInvoice(null);
    setIsModalOpen(true);
  };

  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this invoice?')) return;
    try {
      await fetch(`/api/invoicing/${id}`, { method: 'DELETE' });
      fetchInvoices();
    } catch (err) { console.error(err); }
  };

  const handleSave = async (invoiceData) => {
    try {
      if (editingInvoice) {
        await fetch(`/api/invoicing/${editingInvoice.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(invoiceData)
        });
      } else {
        await fetch('/api/invoicing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(invoiceData)
        });
      }
      setIsModalOpen(false);
      fetchInvoices();
    } catch (err) { console.error(err); }
  };

  const handleDownloadPdf = (id) => {
    window.open(`/api/invoicing/${id}/pdf`, '_blank');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Draft': return 'secondary';
      case 'Sent': return 'primary';
      case 'Paid': return 'success';
      case 'Overdue': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Invoices</h1>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus size={16} /> Create Invoice
        </Button>
      </div>

      <Card>
        {isLoading ? (
          <div className="p-12 flex justify-center"><Spinner /></div>
        ) : invoices.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">No invoices found.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium">{inv.invoiceNumber}</TableCell>
                  <TableCell className="text-muted-foreground">{inv.company?.name || '-'}</TableCell>
                  <TableCell className="font-medium">${inv.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(inv.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(inv.status)}>
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleDownloadPdf(inv.id)} title="Download PDF">
                        <DownloadSimple size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(inv)}>
                        <PencilSimple size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-danger hover:bg-danger/10 hover:text-danger" onClick={() => handleDelete(inv.id)}>
                        <Trash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <InvoiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        invoice={editingInvoice}
        companies={companies}
        onSave={handleSave} 
      />
    </div>
  );
}
