import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  changePasswordZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
} from './auth.validation';
import { authController } from './auth.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/login',
  validateRequest(loginZodSchema),
  authController.loginUser
);

router.post(
  '/refresh-token',
  validateRequest(refreshTokenZodSchema),
  authController.refreshToken
);

router.post(
  '/change-password',
  validateRequest(changePasswordZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  authController.changePassword
);
export const authRoutes = router;
