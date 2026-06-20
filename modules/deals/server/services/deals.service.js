import { prisma } from '@xapps/db';

export class DealsService {
  async getAllDeals() {
    return prisma.deal.findMany({
      orderBy: { expectedCloseDate: 'asc' },
      include: { company: true }
    });
  }

  async getDealById(id) {
    return prisma.deal.findUnique({
      where: { id },
      include: { company: true }
    });
  }

  async createDeal(data) {
    return prisma.deal.create({ data });
  }

  async updateDeal(id, data) {
    return prisma.deal.update({
      where: { id },
      data
    });
  }

  async deleteDeal(id) {
    return prisma.deal.delete({
      where: { id }
    });
  }
}

export const dealsService = new DealsService();
