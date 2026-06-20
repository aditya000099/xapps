import { dealsService } from '../services/deals.service.js';

export class DealsController {
  async getAll(req, res) {
    try {
      const deals = await dealsService.getAllDeals();
      res.json(deals);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch deals' });
    }
  }

  async create(req, res) {
    try {
      const { title, amount, stage, expectedCloseDate, companyId } = req.body;
      if (!title) return res.status(400).json({ error: 'Title is required' });
      
      const deal = await dealsService.createDeal({ 
        title, 
        amount: Number(amount) || 0, 
        stage: stage || 'Lead', 
        expectedCloseDate: expectedCloseDate ? new Date(expectedCloseDate) : new Date(),
        companyId 
      });
      res.status(201).json(deal);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req, res) {
    try {
      const { title, amount, stage, expectedCloseDate, companyId } = req.body;
      const data = {};
      if (title !== undefined) data.title = title;
      if (amount !== undefined) data.amount = Number(amount);
      if (stage !== undefined) data.stage = stage;
      if (expectedCloseDate !== undefined) data.expectedCloseDate = new Date(expectedCloseDate);
      if (companyId !== undefined) data.companyId = companyId;

      const deal = await dealsService.updateDeal(req.params.id, data);
      res.json(deal);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req, res) {
    try {
      await dealsService.deleteDeal(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const dealsController = new DealsController();
