import { Types } from 'mongoose'
import { academicFaculty } from '../academicFaculty/academicFaculty.interface'

export type academicDepartment = {
  title: string
  academicFaculty: Types.ObjectId | academicFaculty
}

export type academicDepartmentFilters = {
  searchTerm?: string
  academicFaculty?: Types.ObjectId
}
