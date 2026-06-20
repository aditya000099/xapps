import realEstateRouter from './routes/real-estate.routes.js';

export const realEstateBackendModule = {
  name: 'real-estate',
  register: (app) => {
    app.use('/api/real-estate', realEstateRouter);
  },
  getStats: async (prisma) => {
    const activeListings = await prisma.realEstateListing.count({ where: { status: 'Active' } });
    const pendingOffers = await prisma.realEstateOffer.count({ where: { status: 'Pending' } });
    return {
      'Active Listings': { value: activeListings, desc: 'Currently on market' },
      'Pending Offers': { value: pendingOffers, desc: 'Awaiting response' }
    };
  }
};
