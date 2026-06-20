import { Router } from 'express';
import { prisma } from '@xapps/db';
import { requireAuth, requirePermission, PERMISSIONS } from '@xapps/auth';

const router = Router();

// GET /api/dashboard/stats
router.get('/stats', requireAuth, requirePermission(PERMISSIONS.CORE_DASHBOARD), async (req, res) => {
  try {
    // Basic aggregation for dashboard
    const totalContacts = await prisma.contact.count();
    const activeContacts = await prisma.contact.count({ where: { status: 'Active' } });
    
    // Recent activity (e.g. 5 latest contacts added)
    const recentActivity = await prisma.contact.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, status: true, createdAt: true }
    });

    res.json({
      stats: {
        totalContacts,
        activeContacts,
        pipelineValue: 1250000, // Dummy for now since Deals module isn't built
        conversionRate: 18.5,
      },
      recentActivity: recentActivity.map(c => ({
        id: c.id,
        contact: c.name,
        action: 'Added as Contact',
        status: c.status,
        date: c.createdAt
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

export default router;
