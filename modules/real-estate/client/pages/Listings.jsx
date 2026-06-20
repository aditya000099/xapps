import React, { useState, useEffect } from 'react';
import { Card, CardBody, Badge, Button, Spinner } from '@xapps/ui';
import { Bed, Bathtub, User, Plus, PencilSimple, Trash } from '@phosphor-icons/react';
import { ListingModal } from '../components/ListingModal.jsx';

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState(null);

  const fetchListings = async () => {
    try {
      const res = await fetch('/api/real-estate/listings');
      const data = await res.json();
      if (Array.isArray(data)) setListings(data);
    } catch (err) { console.error(err); }
  };

  const fetchAgents = async () => {
    try {
      const res = await fetch('/api/real-estate/agents');
      const data = await res.json();
      if (Array.isArray(data)) setAgents(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    Promise.all([fetchListings(), fetchAgents()]).finally(() => setIsLoading(false));
  }, []);

  const handleCreate = () => {
    setEditingListing(null);
    setIsModalOpen(true);
  };

  const handleEdit = (listing) => {
    setEditingListing(listing);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    try {
      await fetch(`/api/real-estate/listings/${id}`, { method: 'DELETE' });
      fetchListings();
    } catch (err) { console.error(err); }
  };

  const handleSave = async (listingData) => {
    try {
      if (editingListing) {
        await fetch(`/api/real-estate/listings/${editingListing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(listingData)
        });
      } else {
        await fetch('/api/real-estate/listings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(listingData)
        });
      }
      setIsModalOpen(false);
      fetchListings();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Property Listings</h1>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus size={16} /> Add Listing
        </Button>
      </div>

      {isLoading ? (
        <div className="p-12 flex justify-center"><Spinner /></div>
      ) : listings.length === 0 ? (
        <div className="p-12 text-center text-muted-foreground">No listings found. Add one to get started!</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {listings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10 bg-background/80 backdrop-blur-sm rounded-md p-1 shadow-sm">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(listing)}>
                  <PencilSimple size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-danger hover:bg-danger/10" onClick={() => handleDelete(listing.id)}>
                  <Trash size={16} />
                </Button>
              </div>

              {/* Placeholder image for real estate */}
              <div className="h-48 bg-muted w-full relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <span className="text-2xl font-bold text-white">
                    ${listing.price.toLocaleString()}
                  </span>
                  <Badge variant={listing.status === 'Active' ? 'success' : listing.status === 'Pending' ? 'warning' : 'default'}>
                    {listing.status}
                  </Badge>
                </div>
              </div>
              
              <CardBody className="p-5">
                <h3 className="text-lg font-semibold text-foreground mb-4 truncate" title={listing.title}>
                  {listing.title}
                </h3>
                
                <div className="flex items-center justify-between text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5">
                    <Bed size={18} />
                    <span>{listing.beds} Beds</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bathtub size={18} />
                    <span>{listing.baths} Baths</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center gap-2 text-sm text-muted-foreground">
                  <User size={16} />
                  <span>Listed by <span className="font-medium text-foreground">{listing.agent?.name || 'Unknown'}</span></span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <ListingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        listing={editingListing} 
        agents={agents}
        onSave={handleSave} 
      />
    </div>
  );
}
