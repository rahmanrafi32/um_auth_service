import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { adminController } from './admins.controller';
import updateAdmin from './admins.validation';
const router = express.Router();

router.get('/:id', adminController.getSingleAdmin);
router.get('/', adminController.getAllAdmins);

router.delete('/:id', adminController.deleteAdmin);

router.patch('/:id', validateRequest(updateAdmin), adminController.updateAdmin);

export const adminRoutes = router;
