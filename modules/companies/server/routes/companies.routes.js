import { Router } from 'express';
import { requireAuth, requirePermission, PERMISSIONS } from '@xapps/auth';
import { companiesController } from '../controllers/companies.controller.js';

const router = Router();

router.get('/', requireAuth, requirePermission(PERMISSIONS.COMPANIES_READ), companiesController.getAll);
router.get('/:id', requireAuth, requirePermission(PERMISSIONS.COMPANIES_READ), companiesController.getById);
router.post('/', requireAuth, requirePermission(PERMISSIONS.COMPANIES_WRITE), companiesController.create);
router.put('/:id', requireAuth, requirePermission(PERMISSIONS.COMPANIES_WRITE), companiesController.update);
router.delete('/:id', requireAuth, requirePermission(PERMISSIONS.COMPANIES_WRITE), companiesController.delete);

export default router;
