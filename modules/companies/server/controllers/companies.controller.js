import { companiesService } from '../services/companies.service.js';

export class CompaniesController {
  async getAll(req, res) {
    try {
      const companies = await companiesService.getAllCompanies();
      res.json(companies);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getById(req, res) {
    try {
      const company = await companiesService.getCompanyById(req.params.id);
      if (!company) return res.status(404).json({ error: 'Company not found' });
      res.json(company);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async create(req, res) {
    try {
      const { name, website } = req.body;
      if (!name) return res.status(400).json({ error: 'Name is required' });
      
      const company = await companiesService.createCompany({ name, website });
      res.status(201).json(company);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req, res) {
    try {
      const { name, website } = req.body;
      const company = await companiesService.updateCompany(req.params.id, { name, website });
      res.json(company);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req, res) {
    try {
      await companiesService.deleteCompany(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const companiesController = new CompaniesController();
