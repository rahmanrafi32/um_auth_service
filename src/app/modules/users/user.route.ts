import express, { Router } from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  createAdminZodSchema,
  createFacultyZodSchema,
  createUserZodSchema,
} from './user.validation';

const router: Router = express.Router();

router.post(
  '/create-student',
  validateRequest(createUserZodSchema),
  userController.createStudent
);

router.post(
  '/create-faculty',
  validateRequest(createFacultyZodSchema),
  userController.createStudent
);

router.post(
  '/create-admin',
  validateRequest(createAdminZodSchema),
  userController.createStudent
);

export const userRoute = router;
