import { contactsService } from '../services/contacts.service.js';

export class ContactsController {
  async getAll(req, res) {
    try {
      const contacts = await contactsService.getAllContacts();
      res.json(contacts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  }

  async create(req, res) {
    try {
      if (!req.body.name) return res.status(400).json({ error: 'Name is required' });
      const contact = await contactsService.createContact(req.body);
      res.status(201).json(contact);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create contact' });
    }
  }

  async update(req, res) {
    try {
      const contact = await contactsService.updateContact(req.params.id, req.body);
      res.json(contact);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update contact' });
    }
  }

  async delete(req, res) {
    try {
      await contactsService.deleteContact(req.params.id);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete contact' });
    }
  }

  async getCompanies(req, res) {
    try {
      const companies = await contactsService.getCompanies();
      res.json(companies);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch companies' });
    }
  }
}

export const contactsController = new ContactsController();
