import { realEstateService } from '../services/real-estate.service.js';

export class RealEstateController {
  async getListings(req, res) {
    try {
      const listings = await realEstateService.getListings();
      res.json(listings);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch listings' });
    }
  }

  async getAgents(req, res) {
    try {
      const agents = await realEstateService.getAgents();
      res.json(agents);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch agents' });
    }
  }

  // Agents CRUD
  async createAgent(req, res) {
    try {
      const { name, email, phone, role } = req.body;
      if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });
      const agent = await realEstateService.createAgent({ name, email, phone, role: role || 'Broker' });
      res.status(201).json(agent);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateAgent(req, res) {
    try {
      const agent = await realEstateService.updateAgent(req.params.id, req.body);
      res.json(agent);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteAgent(req, res) {
    try {
      await realEstateService.deleteAgent(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Listings CRUD
  async createListing(req, res) {
    try {
      const { title, price, beds, baths, status, agentId } = req.body;
      if (!title || !agentId) return res.status(400).json({ error: 'Title and Agent ID are required' });
      const listing = await realEstateService.createListing({ 
        title, 
        price: Number(price) || 0, 
        beds: Number(beds) || 0, 
        baths: Number(baths) || 0, 
        status: status || 'Active', 
        agentId 
      });
      res.status(201).json(listing);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateListing(req, res) {
    try {
      const data = { ...req.body };
      if (data.price !== undefined) data.price = Number(data.price);
      if (data.beds !== undefined) data.beds = Number(data.beds);
      if (data.baths !== undefined) data.baths = Number(data.baths);
      const listing = await realEstateService.updateListing(req.params.id, data);
      res.json(listing);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteListing(req, res) {
    try {
      await realEstateService.deleteListing(req.params.id);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete listing' });
    }
  }

  // Viewings
  async getViewings(req, res) {
    try {
      const viewings = await realEstateService.getViewings();
      res.json(viewings);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch viewings' });
    }
  }

  async createViewing(req, res) {
    try {
      const viewing = await realEstateService.createViewing(req.body);
      res.status(201).json(viewing);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create viewing' });
    }
  }

  async updateViewing(req, res) {
    try {
      const viewing = await realEstateService.updateViewing(req.params.id, req.body);
      res.json(viewing);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update viewing' });
    }
  }

  async deleteViewing(req, res) {
    try {
      await realEstateService.deleteViewing(req.params.id);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete viewing' });
    }
  }

  // Offers
  async getOffers(req, res) {
    try {
      const offers = await realEstateService.getOffers();
      res.json(offers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch offers' });
    }
  }

  async createOffer(req, res) {
    try {
      const offer = await realEstateService.createOffer(req.body);
      res.status(201).json(offer);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create offer' });
    }
  }

  async updateOffer(req, res) {
    try {
      const offer = await realEstateService.updateOffer(req.params.id, req.body);
      res.json(offer);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update offer' });
    }
  }

  async deleteOffer(req, res) {
    try {
      await realEstateService.deleteOffer(req.params.id);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete offer' });
    }
  }
}

export const realEstateController = new RealEstateController();
