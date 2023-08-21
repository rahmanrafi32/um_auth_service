import express, { Router } from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { createFacultyZodSchema, createUserZodSchema } from './user.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router: Router = express.Router();

router.post(
  '/create-student',
  validateRequest(createUserZodSchema),
  userController.createStudent
);

router.post(
  '/create-faculty',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(createFacultyZodSchema),
  userController.createFaculty
);

// router.post(
//   '/create-admin',
//   validateRequest(createAdminZodSchema),
//   userController.createStudent
// );

export const userRoute = router;
