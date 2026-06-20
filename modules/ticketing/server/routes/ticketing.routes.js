import { Router } from 'express';
import { requireAuth, requirePermission, PERMISSIONS } from '@xapps/auth';
import { ticketingController } from '../controllers/ticketing.controller.js';

const router = Router();

router.get('/', requireAuth, requirePermission(PERMISSIONS.TICKETS_READ), ticketingController.getTickets);
router.post('/', requireAuth, requirePermission(PERMISSIONS.TICKETS_WRITE), ticketingController.create);
router.put('/:id', requireAuth, requirePermission(PERMISSIONS.TICKETS_WRITE), ticketingController.update);
router.delete('/:id', requireAuth, requirePermission(PERMISSIONS.TICKETS_WRITE), ticketingController.delete);

export default router;
