import express, { Router } from 'express'
import { validateRequest } from '../../middlewares/validateRequest'
import { createAcademicSemesterZodSchema } from './academicSemester.validation'
import { academicSemesterController } from './academicSemester.controller'

const router: Router = express.Router()
router.post(
  '/create-semester',
  validateRequest(createAcademicSemesterZodSchema),
  academicSemesterController.createSemester
)

export const semesterRoute = router
