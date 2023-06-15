import express, { Router } from 'express'
import { academicFacultyController } from './academicFaculty.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import {
  createFacultySchema,
  updateFacultyZodSchema,
} from './academicFaculty.validation'

const router: Router = express.Router()

router.post(
  '/create-faculty',
  validateRequest(createFacultySchema),
  academicFacultyController.createFaculty
)
router.get('/:id', academicFacultyController.getSingleFaculty)
router.patch(
  '/:id',
  validateRequest(updateFacultyZodSchema),
  academicFacultyController.updateFaculty
)
router.delete('/:id', academicFacultyController.deleteFaculty)

router.get('/', academicFacultyController.getAllFaculties)
export const facultyRoutes = router
