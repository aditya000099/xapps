import { PrismaClient } from '@prisma/client';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const prisma = new PrismaClient();
const scryptAsync = promisify(scrypt);

async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString('hex')}.${salt}`;
}

async function main() {
  console.log('Seeding Database...');
  
  // Clean up
  await prisma.session.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.realEstateViewing.deleteMany();
  await prisma.realEstateOffer.deleteMany();
  await prisma.deal.deleteMany();
  await prisma.realEstateListing.deleteMany();
  await prisma.realEstateAgent.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const adminPassword = await hashPassword('admin123');
  const userPassword = await hashPassword('user123');

  const admin = await prisma.user.create({
    data: {
      email: 'admin@xapps.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'admin'
    }
  });

  console.log('Created Admin User: admin@xapps.com / admin123');

  const user = await prisma.user.create({
    data: {
      email: 'agent@xapps.com',
      name: 'Agent Smith',
      password: userPassword,
      role: 'user'
    }
  });

  console.log('Created Agent User: agent@xapps.com / user123');

  // Create Companies
  const starkInd = await prisma.company.create({
    data: { name: 'Stark Industries', website: 'https://stark.com' }
  });
  const wayneEnt = await prisma.company.create({
    data: { name: 'Wayne Enterprises', website: 'https://wayne.com' }
  });

  // Create Contacts
  const tony = await prisma.contact.create({
    data: { name: 'Tony Stark', email: 'tony@stark.com', status: 'Active', companyId: starkInd.id }
  });
  const pepper = await prisma.contact.create({
    data: { name: 'Pepper Potts', email: 'pepper@stark.com', status: 'Active', companyId: starkInd.id }
  });
  const bruce = await prisma.contact.create({
    data: { name: 'Bruce Wayne', email: 'bruce@wayne.com', status: 'Active', companyId: wayneEnt.id }
  });

  // Create Deals
  await prisma.deal.create({
    data: { title: 'Arc Reactor Contract', amount: 5000000, stage: 'Proposal', expectedCloseDate: new Date('2026-12-31'), companyId: starkInd.id }
  });
  await prisma.deal.create({
    data: { title: 'Batmobile R&D', amount: 15000000, stage: 'Lead', expectedCloseDate: new Date('2027-06-01'), companyId: wayneEnt.id }
  });

  // Create Tickets
  await prisma.supportTicket.create({
    data: { title: 'Suit HUD glitched', description: 'The UI is freezing when in high altitude.', status: 'Open', priority: 'High', contactId: tony.id }
  });
  
  // Real Estate
  const agent1 = await prisma.realEstateAgent.create({
    data: { name: 'Phil Coulson', email: 'phil@shield.gov', role: 'Broker', phone: '555-0199' }
  });

  const listing1 = await prisma.realEstateListing.create({
    data: { title: 'Stark Tower Penthouse', price: 25000000, beds: 5, baths: 6.5, status: 'Active', agentId: agent1.id }
  });

  const listing2 = await prisma.realEstateListing.create({
    data: { title: 'Wayne Manor', price: 15000000, beds: 12, baths: 8.0, status: 'Active', agentId: agent1.id }
  });

  // Viewings
  await prisma.realEstateViewing.create({
    data: {
      scheduledAt: new Date(Date.now() + 86400000), // Tomorrow
      status: 'Scheduled',
      notes: 'Wants to see the arc reactor.',
      listingId: listing1.id,
      agentId: agent1.id,
      contactId: bruce.id // Bruce viewing Tony's penthouse
    }
  });

  await prisma.realEstateViewing.create({
    data: {
      scheduledAt: new Date(Date.now() - 86400000), // Yesterday
      status: 'Completed',
      notes: 'Very interested, might make an offer.',
      listingId: listing2.id,
      agentId: agent1.id,
      contactId: tony.id // Tony viewing Wayne Manor
    }
  });

  // Offers
  await prisma.realEstateOffer.create({
    data: {
      amount: 14500000,
      status: 'Pending',
      contingencies: 'Requires structural inspection of the batcave.',
      listingId: listing2.id,
      contactId: tony.id
    }
  });

  console.log('Database Seeding Complete!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
