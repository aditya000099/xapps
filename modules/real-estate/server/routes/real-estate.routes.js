import { Router } from 'express';
import { requireAuth, requirePermission, PERMISSIONS } from '@xapps/auth';
import { realEstateController } from '../controllers/real-estate.controller.js';

const router = Router();

router.get('/listings', requireAuth, requirePermission(PERMISSIONS.REAL_ESTATE_ACCESS), realEstateController.getListings);
router.post('/listings', requireAuth, requirePermission(PERMISSIONS.REAL_ESTATE_WRITE), realEstateController.createListing);
router.put('/listings/:id', requireAuth, requirePermission(PERMISSIONS.REAL_ESTATE_WRITE), realEstateController.updateListing);
router.delete('/listings/:id', requireAuth, requirePermission(PERMISSIONS.REAL_ESTATE_WRITE), realEstateController.deleteListing);

router.get('/agents', requireAuth, requirePermission(PERMISSIONS.REAL_ESTATE_ACCESS), realEstateController.getAgents);
router.post('/agents', requireAuth, requirePermission(PERMISSIONS.REAL_ESTATE_WRITE), realEstateController.createAgent);
router.put('/agents/:id', requireAuth, requirePermission(PERMISSIONS.REAL_ESTATE_WRITE), realEstateController.updateAgent);
router.delete('/agents/:id', requireAuth, requirePermission(PERMISSIONS.REAL_ESTATE_WRITE), realEstateController.deleteAgent);

// Viewings
router.get('/viewings', requireAuth, requirePermission(PERMISSIONS.REAL_ESTATE_ACCESS), realEstateController.getViewings);
router.post('/viewings', requireAuth, requirePermission(PERMISSIONS.REAL_ESTATE_WRITE), realEstateController.createViewing);
router.put('/viewings/:id', requireAuth, requirePermission(PERMISSIONS.REAL_ESTATE_WRITE), realEstateController.updateViewing);
router.delete('/viewings/:id', requireAuth, requirePermission(PERMISSIONS.REAL_ESTATE_WRITE), realEstateController.deleteViewing);

// Offers
router.get('/offers', requireAuth, requirePermission(PERMISSIONS.REAL_ESTATE_ACCESS), realEstateController.getOffers);
router.post('/offers', requireAuth, requirePermission(PERMISSIONS.REAL_ESTATE_WRITE), realEstateController.createOffer);
router.put('/offers/:id', requireAuth, requirePermission(PERMISSIONS.REAL_ESTATE_WRITE), realEstateController.updateOffer);
router.delete('/offers/:id', requireAuth, requirePermission(PERMISSIONS.REAL_ESTATE_WRITE), realEstateController.deleteOffer);

export default router;
