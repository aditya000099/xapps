import React, { useState, useEffect } from 'react';
import { Card, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge, Spinner, Button } from '@xapps/ui';
import { Plus, Trash, PencilSimple } from '@phosphor-icons/react';
import { TicketModal } from '../components/TicketModal.jsx';

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);

  const fetchTickets = async () => {
    try {
      const res = await fetch('/api/ticketing');
      const data = await res.json();
      if (Array.isArray(data)) setTickets(data);
    } catch (err) { console.error(err); }
  };

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/contacts');
      const data = await res.json();
      if (Array.isArray(data)) setContacts(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    Promise.all([fetchTickets(), fetchContacts()]).finally(() => setIsLoading(false));
  }, []);

  const handleCreate = () => {
    setEditingTicket(null);
    setIsModalOpen(true);
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this ticket?')) return;
    try {
      await fetch(`/api/ticketing/${id}`, { method: 'DELETE' });
      fetchTickets();
    } catch (err) { console.error(err); }
  };

  const handleSave = async (ticketData) => {
    try {
      if (editingTicket) {
        await fetch(`/api/ticketing/${editingTicket.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ticketData)
        });
      } else {
        await fetch('/api/ticketing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ticketData)
        });
      }
      setIsModalOpen(false);
      fetchTickets();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Support Tickets</h1>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus size={16} /> Add Ticket
        </Button>
      </div>

      <Card>
        {isLoading ? (
          <div className="p-12 flex justify-center"><Spinner /></div>
        ) : tickets.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">No tickets found.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.title}</TableCell>
                  <TableCell className="text-muted-foreground">{ticket.contact?.name || '-'}</TableCell>
                  <TableCell>
                    <Badge variant={ticket.priority === 'High' ? 'danger' : ticket.priority === 'Normal' ? 'default' : 'secondary'}>
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={ticket.status === 'Open' ? 'warning' : ticket.status === 'Resolved' ? 'success' : 'default'}>
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(ticket)}>
                        <PencilSimple size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-danger hover:bg-danger/10 hover:text-danger" onClick={() => handleDelete(ticket.id)}>
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

      <TicketModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        ticket={editingTicket}
        contacts={contacts}
        onSave={handleSave} 
      />
    </div>
  );
}
