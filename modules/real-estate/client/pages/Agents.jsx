import React, { useState, useEffect } from 'react';
import { Card, CardBody, Avatar, Button, Spinner } from '@xapps/ui';
import { EnvelopeSimple, Phone, PencilSimple, Trash, Plus } from '@phosphor-icons/react';
import { AgentModal } from '../components/AgentModal.jsx';

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);

  const fetchAgents = async () => {
    try {
      const res = await fetch('/api/real-estate/agents');
      const data = await res.json();
      if (Array.isArray(data)) setAgents(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchAgents().finally(() => setIsLoading(false));
  }, []);

  const handleCreate = () => {
    setEditingAgent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (agent) => {
    setEditingAgent(agent);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this agent?')) return;
    try {
      await fetch(`/api/real-estate/agents/${id}`, { method: 'DELETE' });
      fetchAgents();
    } catch (err) { console.error(err); }
  };

  const handleSave = async (agentData) => {
    try {
      if (editingAgent) {
        await fetch(`/api/real-estate/agents/${editingAgent.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(agentData)
        });
      } else {
        await fetch('/api/real-estate/agents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(agentData)
        });
      }
      setIsModalOpen(false);
      fetchAgents();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Our Agents</h1>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus size={16} /> Add Agent
        </Button>
      </div>

      {isLoading ? (
        <div className="p-12 flex justify-center"><Spinner /></div>
      ) : agents.length === 0 ? (
        <div className="p-12 text-center text-muted-foreground">No agents found. Add one to get started!</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <Card key={agent.id} className="relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(agent)}>
                  <PencilSimple size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="text-danger hover:bg-danger/10" onClick={() => handleDelete(agent.id)}>
                  <Trash size={16} />
                </Button>
              </div>
              <CardBody className="flex flex-col items-center text-center p-6">
                <Avatar name={agent.name} size="xl" className="mb-4" />
                <h3 className="text-lg font-bold text-foreground">{agent.name}</h3>
                <p className="text-sm text-primary font-medium mb-4">{agent.role}</p>
                
                <div className="w-full space-y-2 mt-4">
                  <Button variant="outline" fullWidth className="gap-2 justify-start">
                    <EnvelopeSimple size={18} />
                    {agent.email}
                  </Button>
                  <Button variant="outline" fullWidth className="gap-2 justify-start">
                    <Phone size={18} />
                    {agent.phone || 'No phone'}
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <AgentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        agent={editingAgent} 
        onSave={handleSave} 
      />
    </div>
  );
}
