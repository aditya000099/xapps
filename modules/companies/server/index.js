import companiesRoutes from './routes/companies.routes.js';

export const companiesBackendModule = {
  name: 'companies',
  register: (app) => {
    app.use('/api/companies', companiesRoutes);
  }
};
