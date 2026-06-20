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
}

export const realEstateController = new RealEstateController();
