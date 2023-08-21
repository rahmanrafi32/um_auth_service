import { Request, Response } from 'express';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import { ILoginUserResponse } from './auth.interface';
import returnResponse from '../../../shared/returnResponse';
import { authService } from './auth.service';
import httpStatus from 'http-status';

const loginUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { ...loginData } = req.body;
    const result: ILoginUserResponse = await authService.loginUser(loginData);
    const { refreshToken, ...response } = result;

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    returnResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully !',
      data: response,
    });
  }
);

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await authService.refreshToken(refreshToken);

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  returnResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  });
});

const changePassword = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    await authService.changePassword(req.body, req.user);

    returnResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password changed successfully !',
    });
  }
);

export const authController = {
  loginUser,
  refreshToken,
  changePassword,
};
