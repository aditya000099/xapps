import React, { useState, useEffect } from 'react';
import { Card, Button, Spinner, Badge } from '@xapps/ui';
import { Plus, Trash, PencilSimple } from '@phosphor-icons/react';
import { DealModal } from '../components/DealModal.jsx';

const STAGES = ['Lead', 'Qualification', 'Proposal', 'Won', 'Lost'];

export default function Deals() {
  const [deals, setDeals] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);

  const fetchDeals = async () => {
    try {
      const res = await fetch('/api/deals');
      const data = await res.json();
      if (Array.isArray(data)) setDeals(data);
    } catch (err) { console.error(err); }
  };

  const fetchCompanies = async () => {
    try {
      const res = await fetch('/api/companies'); // using the new module
      const data = await res.json();
      if (Array.isArray(data)) setCompanies(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    Promise.all([fetchDeals(), fetchCompanies()]).finally(() => setIsLoading(false));
  }, []);

  const handleCreate = () => {
    setEditingDeal(null);
    setIsModalOpen(true);
  };

  const handleEdit = (deal) => {
    setEditingDeal(deal);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this deal?')) return;
    try {
      await fetch(`/api/deals/${id}`, { method: 'DELETE' });
      fetchDeals();
    } catch (err) { console.error(err); }
  };

  const handleSave = async (dealData) => {
    try {
      if (editingDeal) {
        await fetch(`/api/deals/${editingDeal.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dealData)
        });
      } else {
        await fetch('/api/deals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dealData)
        });
      }
      setIsModalOpen(false);
      fetchDeals();
    } catch (err) { console.error(err); }
  };

  const handleDragStart = (e, deal) => {
    e.dataTransfer.setData('dealId', deal.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, targetStage) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData('dealId');
    if (!dealId) return;

    const deal = deals.find(d => d.id === dealId);
    if (!deal || deal.stage === targetStage) return;

    // Optimistic update
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, stage: targetStage } : d));

    try {
      await fetch(`/api/deals/${dealId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: targetStage })
      });
    } catch (err) {
      console.error(err);
      fetchDeals(); // Revert on failure
    }
  };

  if (isLoading) {
    return <div className="p-12 flex justify-center"><Spinner /></div>;
  }

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Sales Pipeline</h1>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus size={16} /> Add Deal
        </Button>
      </div>

      <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
        {STAGES.map(stage => {
          const stageDeals = deals.filter(d => d.stage === stage);
          return (
            <div 
              key={stage}
              className="flex-shrink-0 w-80 flex flex-col bg-muted/30 rounded-lg p-3"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage)}
            >
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="font-semibold">{stage}</h3>
                <Badge variant="secondary">{stageDeals.length}</Badge>
              </div>
              
              <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
                {stageDeals.map(deal => (
                  <Card 
                    key={deal.id} 
                    className="p-4 cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors"
                    draggable
                    onDragStart={(e) => handleDragStart(e, deal)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm leading-tight">{deal.title}</h4>
                      <div className="flex gap-1">
                        <button onClick={() => handleEdit(deal)} className="text-muted-foreground hover:text-primary transition-colors">
                          <PencilSimple size={14} />
                        </button>
                        <button onClick={() => handleDelete(deal.id)} className="text-muted-foreground hover:text-danger transition-colors">
                          <Trash size={14} />
                        </button>
                      </div>
                    </div>
                    {deal.company && (
                      <p className="text-xs text-muted-foreground mb-3">{deal.company.name}</p>
                    )}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">${deal.amount.toLocaleString()}</span>
                      <span className="text-muted-foreground">{new Date(deal.expectedCloseDate).toLocaleDateString()}</span>
                    </div>
                  </Card>
                ))}
                {stageDeals.length === 0 && (
                  <div className="flex-1 border-2 border-dashed border-border/50 rounded-lg flex items-center justify-center text-sm text-muted-foreground min-h-[100px]">
                    Drop here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <DealModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        deal={editingDeal}
        companies={companies}
        onSave={handleSave} 
      />
    </div>
  );
}
