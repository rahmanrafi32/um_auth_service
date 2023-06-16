import { Request, RequestHandler, Response } from 'express';
import { createUsers } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import returnResponse from '../../../shared/returnResponse';
import httpStatus from 'http-status';

export const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await createUsers(req.body);
    returnResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  }
);
