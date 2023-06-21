import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { adminFilterableFields } from './admins.constant';
import { paginationFields } from '../../../constants';
import { AdminService } from './admins.service';
import { IAdmin } from './admins.interface';
import returnResponse from '../../../shared/returnResponse';

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AdminService.getAllAdmins(filters, paginationOptions);

  returnResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.getSingleAdmin(id);

  returnResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully !',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AdminService.updateAdmin(id, updatedData);

  returnResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully !',
    data: result,
  });
});
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AdminService.deleteAdmin(id);

  returnResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully !',
    data: result,
  });
});

export const adminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
