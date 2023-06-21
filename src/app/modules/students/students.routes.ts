import express from 'express';
import { studentsController } from './students.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { updateStudentZodSchema } from './student.validation';

const router = express.Router();

router.get('/', studentsController.getAllStudents);
router.get('/:id', studentsController.getStudentById);
router.patch(
  '/:id',
  validateRequest(updateStudentZodSchema),
  studentsController.updateStudent
);
router.delete('/:id', studentsController.deleteStudent);

export const studentsRoutes = router;
