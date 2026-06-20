import React, { useState, useEffect } from 'react';
import { Card, Button, Spinner, Badge } from '@xapps/ui';
import { Plus, Trash, PencilSimple, Calendar, Clock, MapPin, User, CheckCircle, XCircle } from '@phosphor-icons/react';
import { ViewingModal } from '../components/ViewingModal.jsx';

export default function Viewings() {
  const [viewings, setViewings] = useState([]);
  const [listings, setListings] = useState([]);
  const [agents, setAgents] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingViewing, setEditingViewing] = useState(null);

  const fetchData = async () => {
    try {
      const [viewRes, listRes, agentRes, contRes] = await Promise.all([
        fetch('/api/real-estate/viewings').then(r => r.json()),
        fetch('/api/real-estate/listings').then(r => r.json()),
        fetch('/api/real-estate/agents').then(r => r.json()),
        fetch('/api/contacts').then(r => r.json())
      ]);
      
      if (Array.isArray(viewRes)) setViewings(viewRes);
      if (Array.isArray(listRes)) setListings(listRes);
      if (Array.isArray(agentRes)) setAgents(agentRes);
      if (Array.isArray(contRes)) setContacts(contRes);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = () => {
    setEditingViewing(null);
    setIsModalOpen(true);
  };

  const handleEdit = (viewing) => {
    setEditingViewing(viewing);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to cancel and delete this viewing?')) return;
    try {
      await fetch(`/api/real-estate/viewings/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleSave = async (data) => {
    try {
      if (editingViewing) {
        await fetch(`/api/real-estate/viewings/${editingViewing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } else {
        await fetch('/api/real-estate/viewings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) { console.error(err); }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Completed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Scheduled': return <Clock size={16} className="inline mr-1" />;
      case 'Completed': return <CheckCircle size={16} className="inline mr-1" />;
      case 'Cancelled': return <XCircle size={16} className="inline mr-1" />;
      default: return null;
    }
  };

  if (isLoading) {
    return <div className="p-12 flex justify-center"><Spinner /></div>;
  }

  // Group viewings by date for the list view
  const groupedViewings = viewings.reduce((acc, viewing) => {
    const date = new Date(viewing.scheduledAt).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    if (!acc[date]) acc[date] = [];
    acc[date].push(viewing);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Calendar size={28} className="text-primary" /> Property Viewings
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Manage showing appointments with clients.</p>
        </div>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus size={16} /> Schedule Viewing
        </Button>
      </div>

      {Object.keys(groupedViewings).length === 0 ? (
        <Card className="p-12 text-center text-muted-foreground">
          No viewings scheduled yet.
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedViewings).map(([date, dateViewings]) => (
            <div key={date} className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">{date}</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {dateViewings.map(viewing => (
                  <Card key={viewing.id} className="p-5 flex flex-col hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center ${getStatusColor(viewing.status)}`}>
                        {getStatusIcon(viewing.status)}
                        {viewing.status}
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => handleEdit(viewing)} className="p-1.5 text-muted-foreground hover:bg-muted rounded-md transition-colors">
                          <PencilSimple size={16} />
                        </button>
                        <button onClick={() => handleDelete(viewing.id)} className="p-1.5 text-muted-foreground hover:bg-danger/10 hover:text-danger rounded-md transition-colors">
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-3">
                        <Clock size={18} className="text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {new Date(viewing.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-foreground line-clamp-1">{viewing.listing?.title || 'Unknown Property'}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <User size={18} className="text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Client: <span className="text-foreground font-medium">{viewing.contact?.name || 'Unknown'}</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Agent: {viewing.agent?.name || 'Unknown'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {viewing.notes && (
                      <div className="mt-4 pt-3 border-t border-border text-xs text-muted-foreground italic">
                        "{viewing.notes}"
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <ViewingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        viewing={editingViewing}
        listings={listings}
        agents={agents}
        contacts={contacts}
        onSave={handleSave} 
      />
    </div>
  );
}
