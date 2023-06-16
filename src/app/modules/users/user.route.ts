import express, { Router } from 'express';
import { createUser } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { createUserZodSchema } from './user.validation';

const router: Router = express.Router();

router.post('/create-user', validateRequest(createUserZodSchema), createUser);

export const userRoute = router;
