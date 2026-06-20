import { prisma } from '@xapps/db';

export class TicketingService {
  async getAllTickets() {
    return prisma.supportTicket.findMany({
      orderBy: { createdAt: 'desc' },
      include: { contact: true }
    });
  }

  async getTicketById(id) {
    return prisma.supportTicket.findUnique({
      where: { id },
      include: { contact: true }
    });
  }

  async createTicket(data) {
    return prisma.supportTicket.create({ data });
  }

  async updateTicket(id, data) {
    return prisma.supportTicket.update({
      where: { id },
      data
    });
  }

  async deleteTicket(id) {
    return prisma.supportTicket.delete({
      where: { id }
    });
  }
}

export const ticketingService = new TicketingService();
