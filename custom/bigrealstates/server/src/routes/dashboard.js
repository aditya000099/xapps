import { Router } from 'express';
import { prisma } from '@xapps/db';
import { requireAuth, requirePermission, PERMISSIONS } from '@xapps/auth';

const router = Router();

// GET /api/dashboard/stats
router.get('/stats', requireAuth, requirePermission(PERMISSIONS.CORE_DASHBOARD), async (req, res) => {
  try {
    const registry = req.app.locals.registry;
    const stats = registry ? await registry.aggregateStats(prisma) : {};
    
    // Recent activity (e.g. 5 latest contacts added)
    const recentActivity = await prisma.contact.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, status: true, createdAt: true }
    });

    res.json({
      stats,
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
