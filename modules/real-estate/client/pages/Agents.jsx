import React, { useState, useEffect } from 'react';
import { Card, CardBody, Avatar, Button, Spinner } from '@xapps/ui';
import { EnvelopeSimple, Phone } from '@phosphor-icons/react';

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/real-estate/agents')
      .then(res => res.json())
      .then(data => {
        setAgents(data);
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
        <h1 className="text-2xl font-bold text-foreground">Our Agents</h1>
      </div>

      {isLoading ? (
        <div className="p-12 flex justify-center"><Spinner /></div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <Card key={agent.id}>
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
    </div>
  );
}
