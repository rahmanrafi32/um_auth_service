import express from 'express';
import { studentsController } from './students.controller';

const router = express.Router();

router.get('/', studentsController.getAllStudents);
router.get('/:id', studentsController.getStudentById);
router.delete('/:id', studentsController.deleteStudent);

export const studentsRoutes = router;
