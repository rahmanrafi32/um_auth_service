import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { updateFacultyZodSchema } from './faculties.validation';
import { facultyController } from './faculties.controller';

const router = express.Router();

router.get('/:id', facultyController.getSingleFaculty);
router.get('/', facultyController.getAllFaculties);

router.patch(
  '/:id',
  validateRequest(updateFacultyZodSchema),
  facultyController.updateFaculty
);

router.delete('/:id', facultyController.deleteFaculty);

export const FacultyRoutes = router;
