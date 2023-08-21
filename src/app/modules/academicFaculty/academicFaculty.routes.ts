import express, { Router } from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  createFacultySchema,
  updateFacultyZodSchema,
} from './academicFaculty.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router: Router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(createFacultySchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  academicFacultyController.createFaculty
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY, ENUM_USER_ROLE.STUDENT),
  academicFacultyController.getSingleFaculty
);
router.patch(
  '/:id',
  validateRequest(updateFacultyZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
  academicFacultyController.updateFaculty
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  academicFacultyController.deleteFaculty
);

router.get('/', academicFacultyController.getAllFaculties);
export const academicFacultyRoutes = router;
