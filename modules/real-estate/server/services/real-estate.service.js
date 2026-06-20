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

  async createAgent(data) {
    return prisma.realEstateAgent.create({ data });
  }

  async updateAgent(id, data) {
    return prisma.realEstateAgent.update({ where: { id }, data });
  }

  async deleteAgent(id) {
    return prisma.realEstateAgent.delete({ where: { id } });
  }

  async createListing(data) {
    return prisma.realEstateListing.create({ data });
  }

  async updateListing(id, data) {
    return prisma.realEstateListing.update({ where: { id }, data });
  }

  async deleteListing(id) {
    return prisma.realEstateListing.delete({ where: { id } });
  }

  // Viewings
  async getViewings() {
    return prisma.realEstateViewing.findMany({
      orderBy: { scheduledAt: 'asc' },
      include: { listing: true, agent: true, contact: true }
    });
  }

  async createViewing(data) {
    return prisma.realEstateViewing.create({ data });
  }

  async updateViewing(id, data) {
    return prisma.realEstateViewing.update({ where: { id }, data });
  }

  async deleteViewing(id) {
    return prisma.realEstateViewing.delete({ where: { id } });
  }

  // Offers
  async getOffers() {
    return prisma.realEstateOffer.findMany({
      orderBy: { createdAt: 'desc' },
      include: { listing: true, contact: true }
    });
  }

  async createOffer(data) {
    return prisma.realEstateOffer.create({ data });
  }

  async updateOffer(id, data) {
    return prisma.realEstateOffer.update({ where: { id }, data });
  }

  async deleteOffer(id) {
    return prisma.realEstateOffer.delete({ where: { id } });
  }
}

export const realEstateService = new RealEstateService();
