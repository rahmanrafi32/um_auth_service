import { academicSemesterService } from './academicSemester.service'
import { academicSemester } from './academicSemester.interface'
import catchAsync from '../../../shared/catchAsync'
import { NextFunction, Request, Response } from 'express'
import returnResponse from '../../../shared/returnResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { pagination } from '../../../constants'

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { ...academicSemesterData } = req.body
    const result: academicSemester =
      await academicSemesterService.createSemester(academicSemesterData)
    returnResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    })
    next()
  }
)

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const paginationOptions = pick(req.query, pagination)

    const result = await academicSemesterService.getAllSemesters(
      paginationOptions
    )

    returnResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      meta: result.meta,
      data: result.data,
    })
    next()
  }
)

export const academicSemesterController = {
  createSemester,
  getAllSemesters,
}
