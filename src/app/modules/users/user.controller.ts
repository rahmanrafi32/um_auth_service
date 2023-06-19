import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import returnResponse from '../../../shared/returnResponse';
import httpStatus from 'http-status';
import { userService } from './user.service';

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { student, ...userData } = req.body;
    const result = await userService.createStudent(student, userData);
    returnResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  }
);

export const userController = {
  createStudent,
};
