import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { academicDepartmentService } from './academicDepartment.service';
import httpStatus from 'http-status';
import { academicDepartment } from './academicDepartment.interface';
import returnResponse from '../../../shared/returnResponse';
import pick from '../../../shared/pick';
import { academicDepartmentFilterableFields } from './academicDepartment.constants';
import { paginationFields } from '../../../constants';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await academicDepartmentService.createDepartment(req.body);

  returnResponse<academicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await academicDepartmentService.getAllDepartments(
    filters,
    paginationOptions
  );

  returnResponse<academicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic departments fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await academicDepartmentService.getSingleDepartment(id);

  returnResponse<academicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department fetched successfully',
    data: result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await academicDepartmentService.updateDepartment(id, req.body);

  returnResponse<academicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department updated successfully',
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await academicDepartmentService.deleteDepartment(id);

  returnResponse<academicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department deleted successfully',
    data: result,
  });
});

export const academicDepartmentController = {
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
  createDepartment,
};
