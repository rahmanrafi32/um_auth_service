import express, { Router } from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { createUserZodSchema } from './user.validation';

const router: Router = express.Router();

router.post(
  '/create-student',
  validateRequest(createUserZodSchema),
  userController.createStudent
);

router.post(
  '/create-faculty',
  validateRequest(createUserZodSchema),
  userController.createStudent
);

router.post(
  '/create-admin',
  validateRequest(createUserZodSchema),
  userController.createStudent
);

export const userRoute = router;
