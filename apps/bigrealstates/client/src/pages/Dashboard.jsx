import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge, Spinner } from '@xapps/ui';

export function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center"><Spinner size="lg" /></div>;
  }

  if (!data) return <div>Failed to load dashboard</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Overview</h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <h3 className="text-sm font-medium text-muted-foreground">Total Contacts</h3>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold text-foreground">{data.stats.totalContacts.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-1">Across all accounts</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-sm font-medium text-muted-foreground">Active Contacts</h3>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold text-foreground">{data.stats.activeContacts.toLocaleString()}</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-sm font-medium text-muted-foreground">Pipeline Value</h3>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold text-foreground">
              ${(data.stats.pipelineValue / 1000000).toFixed(1)}M
            </p>
            <p className="text-sm text-muted-foreground mt-1">Expected this quarter</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-sm font-medium text-muted-foreground">Conversion Rate</h3>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold text-foreground">{data.stats.conversionRate}%</p>
          </CardBody>
        </Card>
      </div>

      <h2 className="text-xl font-bold text-foreground pt-4">Recent Activity</h2>
      <Card>
        <Table striped>
          <TableHeader>
            <TableRow>
              <TableHead>Contact</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.recentActivity.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">{activity.contact}</TableCell>
                <TableCell>{activity.action}</TableCell>
                <TableCell>
                  <Badge 
                    variant={activity.status === 'Active' ? 'success' : activity.status === 'Inactive' ? 'danger' : 'warning'} 
                    size="sm"
                  >
                    {activity.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(activity.date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
