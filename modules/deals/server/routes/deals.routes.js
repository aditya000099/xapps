import { Router } from 'express';
import { requireAuth, requirePermission, PERMISSIONS } from '@xapps/auth';
import { dealsController } from '../controllers/deals.controller.js';

const router = Router();

router.get('/', requireAuth, requirePermission(PERMISSIONS.DEALS_READ), dealsController.getAll);
router.post('/', requireAuth, requirePermission(PERMISSIONS.DEALS_WRITE), dealsController.create);
router.put('/:id', requireAuth, requirePermission(PERMISSIONS.DEALS_WRITE), dealsController.update);
router.delete('/:id', requireAuth, requirePermission(PERMISSIONS.DEALS_WRITE), dealsController.delete);

export default router;
