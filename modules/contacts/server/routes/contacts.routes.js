import { Router } from 'express';
import { requireAuth, requirePermission, PERMISSIONS } from '@xapps/auth';
import { contactsController } from '../controllers/contacts.controller.js';

const router = Router();

router.get('/', requireAuth, requirePermission(PERMISSIONS.CONTACTS_READ), contactsController.getAll);
router.post('/', requireAuth, requirePermission(PERMISSIONS.CONTACTS_WRITE), contactsController.create);
router.put('/:id', requireAuth, requirePermission(PERMISSIONS.CONTACTS_WRITE), contactsController.update);
router.delete('/:id', requireAuth, requirePermission(PERMISSIONS.CONTACTS_DELETE), contactsController.delete);

router.get('/companies', requireAuth, requirePermission(PERMISSIONS.CONTACTS_READ), contactsController.getCompanies);

export default router;
