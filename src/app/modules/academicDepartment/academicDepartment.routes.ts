import express from 'express'
import { validateRequest } from '../../middlewares/validateRequest'
import {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
} from './academicDepartment.validation'
import { academicDepartmentController } from './academicDepartment.controller'

const router = express.Router()

router.post(
  '/create-department',
  validateRequest(createAcademicDepartmentZodSchema),
  academicDepartmentController.createDepartment
)

router.get('/:id', academicDepartmentController.getSingleDepartment)

router.patch(
  '/:id',
  validateRequest(updateAcademicDepartmentZodSchema),
  academicDepartmentController.updateDepartment
)

router.delete('/:id', academicDepartmentController.deleteDepartment)

router.get('/', academicDepartmentController.getAllDepartments)

export const departmentRoutes = router
