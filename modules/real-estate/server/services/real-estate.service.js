import { prisma } from '@xapps/db';

export class RealEstateService {
  async getListings() {
    return prisma.realEstateListing.findMany({
      orderBy: { createdAt: 'desc' },
      include: { agent: true }
    });
  }

  async getAgents() {
    return prisma.realEstateAgent.findMany({
      orderBy: { name: 'asc' },
    });
  }
}

export const realEstateService = new RealEstateService();
