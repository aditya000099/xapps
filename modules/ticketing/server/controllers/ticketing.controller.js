import { ticketingService } from '../services/ticketing.service.js';

export class TicketingController {
  async getTickets(req, res) {
    try {
      const tickets = await ticketingService.getAllTickets();
      res.json(tickets);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch tickets' });
    }
  }

  async create(req, res) {
    try {
      const { title, description, status, priority, contactId } = req.body;
      if (!title) return res.status(400).json({ error: 'Title is required' });
      
      const ticket = await ticketingService.createTicket({ 
        title, 
        description, 
        status: status || 'Open', 
        priority: priority || 'Normal',
        contactId 
      });
      res.status(201).json(ticket);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req, res) {
    try {
      const { title, description, status, priority, contactId } = req.body;
      const data = {};
      if (title !== undefined) data.title = title;
      if (description !== undefined) data.description = description;
      if (status !== undefined) data.status = status;
      if (priority !== undefined) data.priority = priority;
      if (contactId !== undefined) data.contactId = contactId;

      const ticket = await ticketingService.updateTicket(req.params.id, data);
      res.json(ticket);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req, res) {
    try {
      await ticketingService.deleteTicket(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const ticketingController = new TicketingController();
