import invoicingRouter from './routes/invoicing.routes.js';

export const invoicingBackendModule = {
  name: 'invoicing',
  register: (app) => {
    app.use('/api/invoicing', invoicingRouter);
  }
};
