import { academicSemesterService } from './academicSemester.service'
import { academicSemester } from './academicSemester.interface'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import returnResponse from '../../../shared/returnResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants'
import { filterAbleFields } from './academicSemester.constant'

const createSemester = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { ...academicSemesterData } = req.body
    const result: academicSemester =
      await academicSemesterService.createSemester(academicSemesterData)
    returnResponse<academicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    })
  }
)

const getAllSemesters = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const filters = pick(req.query, filterAbleFields)
    const paginationOptions = pick(req.query, paginationFields)

    const result = await academicSemesterService.getAllSemesters(
      paginationOptions,
      filters
    )

    returnResponse<academicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      meta: result.meta,
      data: result.data,
    })
  }
)

const getSemesterById = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await academicSemesterService.getSemesterById(req.params.id)

    returnResponse<academicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      meta: undefined,
      data: result,
    })
  }
)

const updateSemester = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result: academicSemester | null =
      await academicSemesterService.updateSemester(req.params.id, req.body)

    returnResponse<academicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      meta: undefined,
      data: result,
    })
  }
)

const deleteSemester = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    await academicSemesterService.deleteSemester(req.params.id)
    returnResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester deleted successfully',
    })
  }
)

export const academicSemesterController = {
  createSemester,
  getAllSemesters,
  getSemesterById,
  updateSemester,
  deleteSemester,
}
