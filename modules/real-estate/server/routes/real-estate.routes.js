import { Router } from 'express';
import { requireAuth, requirePermission, PERMISSIONS } from '@xapps/auth';
import { realEstateController } from '../controllers/real-estate.controller.js';

const router = Router();

router.get('/listings', requireAuth, requirePermission(PERMISSIONS.REAL_ESTATE_ACCESS), realEstateController.getListings);
router.get('/agents', requireAuth, requirePermission(PERMISSIONS.REAL_ESTATE_ACCESS), realEstateController.getAgents);

export default router;
