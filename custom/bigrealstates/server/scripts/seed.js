import { prisma } from '@xapps/db';
import { hashPassword } from '@xapps/auth';

async function main() {
  console.log('Clearing old non-user data...');
  await prisma.realEstateListing.deleteMany({});
  await prisma.realEstateAgent.deleteMany({});
  await prisma.contact.deleteMany({});

  console.log('Seeding demo users...');
  const password = await hashPassword('password');

  const users = [
    { email: 'admin@xapps.com', name: 'Admin User', role: 'admin', password },
    { email: 'manager@xapps.com', name: 'Sales Manager', role: 'manager', password },
    { email: 'sales@xapps.com', name: 'Sales Rep', role: 'sales_rep', password },
    { email: 'support@xapps.com', name: 'Support Agent', role: 'support', password },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: { role: user.role, name: user.name },
      create: user,
    });
  }

  console.log('Seeding 20+ realistic contacts...');
  const contacts = [
    { name: 'Olivia Martin', email: 'olivia.martin@email.com', company: 'TechCorp', status: 'Active' },
    { name: 'Jackson Lee', email: 'jackson.lee@email.com', company: 'DesignIt', status: 'Active' },
    { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', company: 'DataSystems', status: 'Inactive' },
    { name: 'William Chen', email: 'william.chen@email.com', company: 'GlobalTrade', status: 'Active' },
    { name: 'Sofia Davis', email: 'sofia.davis@email.com', company: 'MarketingPro', status: 'Lead' },
    { name: 'Marcus Johnson', email: 'marcus.j@enterprise.com', company: 'Enterprise Ltd', status: 'Active' },
    { name: 'Emma Wilson', email: 'emma.w@startup.io', company: 'Startup.io', status: 'Lead' },
    { name: 'James Taylor', email: 'james.t@logistics.com', company: 'FastLogistics', status: 'Inactive' },
    { name: 'Ava Anderson', email: 'ava.a@medical.org', company: 'MedCare', status: 'Active' },
    { name: 'Lucas Thomas', email: 'lucas.t@finance.net', company: 'CapitalFinance', status: 'Active' },
    { name: 'Mia Martinez', email: 'mia.m@retail.com', company: 'ShopMart', status: 'Lead' },
    { name: 'Alexander White', email: 'alex.w@consulting.com', company: 'WhiteConsulting', status: 'Active' },
    { name: 'Charlotte Harris', email: 'charlotte.h@media.com', company: 'HarrisMedia', status: 'Active' },
    { name: 'Benjamin Clark', email: 'ben.c@construction.com', company: 'ClarkBuilders', status: 'Inactive' },
    { name: 'Amelia Lewis', email: 'amelia.l@edu.org', company: 'GlobalEdu', status: 'Active' },
    { name: 'Ethan Walker', email: 'ethan.w@auto.com', company: 'WalkerMotors', status: 'Lead' },
    { name: 'Harper Hall', email: 'harper.h@tech.net', company: 'TechSolutions', status: 'Active' },
    { name: 'Daniel Allen', email: 'daniel.a@food.com', company: 'FreshFoods', status: 'Active' },
    { name: 'Evelyn Young', email: 'evelyn.y@apparel.com', company: 'YoungApparel', status: 'Inactive' },
    { name: 'Matthew King', email: 'matt.k@sports.com', company: 'KingSports', status: 'Active' },
  ];

  await prisma.contact.createMany({ data: contacts });

  console.log('Seeding Real Estate Agents...');
  const agents = await Promise.all([
    prisma.realEstateAgent.create({
      data: { name: 'Sarah Jenkins', role: 'Senior Broker', email: 'sarah@realestate.com', phone: '+1 555-0101' }
    }),
    prisma.realEstateAgent.create({
      data: { name: 'Marcus Cole', role: 'Listing Agent', email: 'marcus@realestate.com', phone: '+1 555-0102' }
    }),
    prisma.realEstateAgent.create({
      data: { name: 'Elena Rodriguez', role: 'Buying Agent', email: 'elena@realestate.com', phone: '+1 555-0103' }
    }),
  ]);

  console.log('Seeding Real Estate Listings...');
  const listings = [
    { title: 'Modern Downtown Loft', price: 850000, beds: 2, baths: 2, status: 'Active', agentId: agents[0].id },
    { title: 'Suburban Family Home', price: 1200000, beds: 4, baths: 3, status: 'Pending', agentId: agents[1].id },
    { title: 'Luxury Penthouse', price: 3500000, beds: 3, baths: 3.5, status: 'Active', agentId: agents[0].id },
    { title: 'Cozy Studio Apartment', price: 4500000, beds: 1, baths: 1, status: 'Sold', agentId: agents[2].id },
    { title: 'Lakefront Estate', price: 5200000, beds: 6, baths: 5.5, status: 'Active', agentId: agents[0].id },
    { title: 'Historic Townhouse', price: 1750000, beds: 3, baths: 2.5, status: 'Active', agentId: agents[1].id },
    { title: 'Minimalist Condo', price: 620000, beds: 1, baths: 1, status: 'Pending', agentId: agents[2].id },
    { title: 'Ranch Style Home', price: 925000, beds: 4, baths: 2, status: 'Active', agentId: agents[1].id },
    { title: 'High-Rise Apartment', price: 1100000, beds: 2, baths: 2, status: 'Active', agentId: agents[0].id },
    { title: 'Country Villa', price: 2800000, beds: 5, baths: 4, status: 'Sold', agentId: agents[2].id },
  ];

  await prisma.realEstateListing.createMany({ data: listings });

  console.log('✅ Seed completed successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
