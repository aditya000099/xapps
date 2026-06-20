import React, { useState, useEffect } from 'react';
import { Card, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge, Button, Spinner } from '@xapps/ui';
import { MapPin, Plus } from '@phosphor-icons/react';

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/real-estate/listings')
      .then(res => res.json())
      .then(data => {
        setListings(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Property Listings</h1>
        <Button className="shrink-0 gap-2">
          <Plus size={18} weight="bold" />
          New Listing
        </Button>
      </div>

      <Card>
        {isLoading ? (
          <div className="p-12 flex justify-center"><Spinner /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Specs</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>
                    <div className="font-medium text-foreground">{listing.title}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin size={14} /> ID: {listing.id.slice(-6)}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    ${listing.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {listing.beds} bd • {listing.baths} ba
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {listing.agent?.name || 'Unassigned'}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={listing.status === 'Active' ? 'success' : listing.status === 'Pending' ? 'warning' : 'default'}
                      size="sm"
                    >
                      {listing.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
