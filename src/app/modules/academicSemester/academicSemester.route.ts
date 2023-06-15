import express, { Router } from 'express'
import { validateRequest } from '../../middlewares/validateRequest'
import {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
} from './academicSemester.validation'
import { academicSemesterController } from './academicSemester.controller'

const router: Router = express.Router()
router.post(
  '/create-semester',
  validateRequest(createAcademicSemesterZodSchema),
  academicSemesterController.createSemester
)
router.get('/', academicSemesterController.getAllSemesters)
router.get('/:id', academicSemesterController.getSemesterById)
router.patch(
  '/:id',
  validateRequest(updateAcademicSemesterZodSchema),
  academicSemesterController.updateSemester
)
router.delete('/:id', academicSemesterController.deleteSemester)

export const semesterRoute = router
