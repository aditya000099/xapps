import { prisma } from '@xapps/db';

export class CompaniesService {
  async getAllCompanies() {
    return prisma.company.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getCompanyById(id) {
    return prisma.company.findUnique({
      where: { id },
      include: {
        contacts: true,
        deals: true
      }
    });
  }

  async createCompany(data) {
    return prisma.company.create({ data });
  }

  async updateCompany(id, data) {
    return prisma.company.update({
      where: { id },
      data
    });
  }

  async deleteCompany(id) {
    return prisma.company.delete({
      where: { id }
    });
  }
}

export const companiesService = new CompaniesService();
