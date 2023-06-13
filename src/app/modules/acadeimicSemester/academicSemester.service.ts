import { academicSemester, genericResponse } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { paginationOption } from '../../../interfaces/paginationOption'
import calculatePagination from '../../../helper/paginationHelper'
import { SortOrder } from 'mongoose'

const createSemester = async (
  payload: academicSemester
): Promise<academicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code')
  }
  return await AcademicSemester.create(payload)
}

const getAllSemesters = async (
  payload: paginationOption
): Promise<genericResponse<academicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(payload)
  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const result = await AcademicSemester.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await AcademicSemester.count()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const academicSemesterService = {
  createSemester,
  getAllSemesters,
}
