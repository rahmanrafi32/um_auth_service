import { academicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const createSemester = async (
  payload: academicSemester
): Promise<academicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code')
  }
  return await AcademicSemester.create(payload)
}

export const academicSemesterService = {
  createSemester,
}
