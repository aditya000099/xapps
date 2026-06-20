import dealsRouter from './routes/deals.routes.js';
import { companiesBackendModule } from '@xapps/module-companies/server';

export const dealsBackendModule = {
  name: 'deals',
  dependencies: [companiesBackendModule],
  register: (app) => {
    app.use('/api/deals', dealsRouter);
  },
  getStats: async (prisma) => {
    const deals = await prisma.deal.aggregate({
      _sum: { amount: true },
      where: { stage: { notIn: ['Lost'] } }
    });
    return {
      'Pipeline Value': { 
        value: `$${((deals._sum.amount || 0) / 1000000).toFixed(1)}M`, 
        desc: 'Expected total pipeline' 
      }
    };
  }
};
