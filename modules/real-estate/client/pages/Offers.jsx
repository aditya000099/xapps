import React, { useState, useEffect } from 'react';
import { Card, Button, Spinner, Badge } from '@xapps/ui';
import { Plus, Trash, PencilSimple, Handshake, CurrencyDollar, FileText, HouseLine } from '@phosphor-icons/react';
import { OfferModal } from '../components/OfferModal.jsx';

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [listings, setListings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);

  const fetchData = async () => {
    try {
      const [offerRes, listRes, contRes] = await Promise.all([
        fetch('/api/real-estate/offers').then(r => r.json()),
        fetch('/api/real-estate/listings').then(r => r.json()),
        fetch('/api/contacts').then(r => r.json())
      ]);
      
      if (Array.isArray(offerRes)) setOffers(offerRes);
      if (Array.isArray(listRes)) setListings(listRes);
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
    setEditingOffer(null);
    setIsModalOpen(true);
  };

  const handleEdit = (offer) => {
    setEditingOffer(offer);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this offer?')) return;
    try {
      await fetch(`/api/real-estate/offers/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleSave = async (data) => {
    try {
      if (editingOffer) {
        await fetch(`/api/real-estate/offers/${editingOffer.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } else {
        await fetch('/api/real-estate/offers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) { console.error(err); }
  };

  if (isLoading) {
    return <div className="p-12 flex justify-center"><Spinner /></div>;
  }

  const pendingCount = offers.filter(o => o.status === 'Pending').length;
  const acceptedCount = offers.filter(o => o.status === 'Accepted').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Handshake size={28} className="text-primary" /> Property Offers
          </h1>
          <p className="text-muted-foreground text-sm mt-1 flex gap-4">
            <span>Pending: <strong>{pendingCount}</strong></span>
            <span>Accepted: <strong>{acceptedCount}</strong></span>
          </p>
        </div>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus size={16} /> New Offer
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {offers.map(offer => {
          const isAccepted = offer.status === 'Accepted';
          const isRejected = offer.status === 'Rejected';
          
          return (
            <Card key={offer.id} className="p-5 flex flex-col relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
              {/* Top Accent Bar based on status */}
              <div className={`absolute top-0 left-0 w-full h-1.5 ${
                isAccepted ? 'bg-green-500' : 
                isRejected ? 'bg-red-500' : 
                'bg-yellow-500'
              }`} />

              <div className="flex justify-between items-start mb-4 mt-1">
                <div>
                  <h3 className="text-sm text-muted-foreground font-medium mb-1 flex items-center gap-1.5">
                    <HouseLine size={16} /> {offer.listing?.title || 'Unknown Property'}
                  </h3>
                  <div className="flex items-end gap-1.5 text-foreground">
                    <CurrencyDollar size={24} className="text-primary" />
                    <span className="text-2xl font-bold leading-none">{offer.amount.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={isAccepted ? 'success' : isRejected ? 'danger' : 'warning'}>
                    {offer.status}
                  </Badge>
                  <div className="flex gap-1 mt-1">
                    <button onClick={() => handleEdit(offer)} className="p-1 text-muted-foreground hover:text-primary transition-colors">
                      <PencilSimple size={16} />
                    </button>
                    <button onClick={() => handleDelete(offer.id)} className="p-1 text-muted-foreground hover:text-danger transition-colors">
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-auto space-y-3 border-t border-border pt-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Buyer</span>
                  <span className="font-medium text-foreground">{offer.contact?.name || 'Unknown'}</span>
                </div>
                
                {offer.contingencies && (
                  <div className="flex items-start gap-2 text-sm bg-muted/30 p-2.5 rounded-md">
                    <FileText size={16} className="text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-muted-foreground italic leading-tight">
                      {offer.contingencies}
                    </span>
                  </div>
                )}
                
                <div className="text-xs text-muted-foreground text-right mt-2">
                  Submitted {new Date(offer.createdAt).toLocaleDateString()}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {offers.length === 0 && (
        <Card className="p-12 text-center text-muted-foreground">
          No offers found.
        </Card>
      )}

      <OfferModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        offer={editingOffer}
        listings={listings}
        contacts={contacts}
        onSave={handleSave} 
      />
    </div>
  );
}
