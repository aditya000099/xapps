import React, { useState, useEffect } from 'react';
import { Card, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Button, Spinner } from '@xapps/ui';
import { Plus, Trash, PencilSimple } from '@phosphor-icons/react';
import { CompanyModal } from '../components/CompanyModal.jsx';

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const fetchCompanies = async () => {
    try {
      const res = await fetch('/api/companies');
      const data = await res.json();
      if (Array.isArray(data)) setCompanies(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCompanies().finally(() => setIsLoading(false));
  }, []);

  const handleCreate = () => {
    setEditingCompany(null);
    setIsModalOpen(true);
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this company?')) return;
    try {
      await fetch(`/api/companies/${id}`, { method: 'DELETE' });
      fetchCompanies();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (companyData) => {
    try {
      if (editingCompany) {
        await fetch(`/api/companies/${editingCompany.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(companyData)
        });
      } else {
        await fetch('/api/companies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(companyData)
        });
      }
      setIsModalOpen(false);
      fetchCompanies();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Companies</h1>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus size={16} /> Add Company
        </Button>
      </div>

      <Card>
        {isLoading ? (
          <div className="p-12 flex justify-center"><Spinner /></div>
        ) : companies.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">No companies found. Add one to get started!</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>
                    {c.website ? (
                      <a href={c.website} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                        {c.website}
                      </a>
                    ) : '-'}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(c)}>
                        <PencilSimple size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-danger hover:bg-danger/10 hover:text-danger" onClick={() => handleDelete(c.id)}>
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

      <CompanyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        company={editingCompany} 
        onSave={handleSave} 
      />
    </div>
  );
}
