import { prisma } from '@xapps/db';

export class InvoicingService {
  async getAllInvoices() {
    return prisma.invoice.findMany({
      orderBy: { dueDate: 'asc' },
      include: { company: true }
    });
  }

  async getInvoiceById(id) {
    return prisma.invoice.findUnique({
      where: { id },
      include: { company: true }
    });
  }

  async createInvoice(data) {
    return prisma.invoice.create({ data });
  }

  async updateInvoice(id, data) {
    return prisma.invoice.update({
      where: { id },
      data
    });
  }

  async deleteInvoice(id) {
    return prisma.invoice.delete({
      where: { id }
    });
  }
}

export const invoicingService = new InvoicingService();
