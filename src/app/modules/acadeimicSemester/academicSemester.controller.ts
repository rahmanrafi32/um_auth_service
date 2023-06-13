import { academicSemesterService } from './academicSemester.service'
import { academicSemester } from './academicSemester.interface'
import catchAsync from '../../../shared/catchAsync'
import { NextFunction, Request, Response } from 'express'
import returnResponse from '../../../shared/returnResponse'
import httpStatus from 'http-status'

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

export const academicSemesterController = {
  createSemester,
}
