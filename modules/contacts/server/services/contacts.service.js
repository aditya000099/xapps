import { prisma } from '@xapps/db';

export class ContactsService {
  async getAllContacts() {
    return prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
      include: { company: true }
    });
  }

  async createContact(data) {
    return prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        status: data.status,
        companyId: data.companyId || null,
      },
      include: { company: true }
    });
  }

  async updateContact(id, data) {
    return prisma.contact.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        status: data.status,
        companyId: data.companyId || null,
      },
      include: { company: true }
    });
  }

  async deleteContact(id) {
    return prisma.contact.delete({
      where: { id }
    });
  }

  async getCompanies() {
    return prisma.company.findMany({
      orderBy: { name: 'asc' }
    });
  }
}

export const contactsService = new ContactsService();
