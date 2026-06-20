import { Router } from 'express';
import { requireAuth, requirePermission, PERMISSIONS } from '@xapps/auth';
import { invoicingController } from '../controllers/invoicing.controller.js';

const router = Router();

router.get('/', requireAuth, requirePermission(PERMISSIONS.INVOICES_READ), invoicingController.getInvoices);
router.post('/', requireAuth, requirePermission(PERMISSIONS.INVOICES_WRITE), invoicingController.create);
router.put('/:id', requireAuth, requirePermission(PERMISSIONS.INVOICES_WRITE), invoicingController.update);
router.delete('/:id', requireAuth, requirePermission(PERMISSIONS.INVOICES_WRITE), invoicingController.delete);
router.get('/:id/pdf', requireAuth, requirePermission(PERMISSIONS.INVOICES_READ), invoicingController.downloadPdf);

export default router;
