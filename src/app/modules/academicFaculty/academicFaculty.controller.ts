import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { academicFacultyService } from './academicFaculty.service'
import { academicFaculty } from './academicFaculty.interface'
import returnResponse from '../../../shared/returnResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { academicFacultyFilterableFields } from './academicFaculty.constants'
import { paginationFields } from '../../../constants'

const createFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result: academicFaculty = await academicFacultyService.createFaculty(
      req.body
    )
    returnResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty created successfully',
      data: result,
    })
  }
)

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await academicFacultyService.getAllFaculties(
    filters,
    paginationOptions
  )

  returnResponse<academicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculties retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await academicFacultyService.getSingleFaculty(req.params.id)

  returnResponse<academicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty fetched successfully',
    data: result,
  })
})

const updateFaculty = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const updatedData = req.body
    const result = await academicFacultyService.updateFaculty(id, updatedData)

    returnResponse<academicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty updated successfully',
      data: result,
    })
  })
)

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await academicFacultyService.deleteByIdFromDB(id)

  returnResponse<academicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty deleted successfully',
    data: result,
  })
})

export const academicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
