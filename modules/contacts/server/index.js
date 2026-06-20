import contactsRouter from './routes/contacts.routes.js';

export const contactsBackendModule = {
  name: 'contacts',
  register: (app) => {
    app.use('/api/contacts', contactsRouter);
  }
};
