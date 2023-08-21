import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { ErrorMessage } from '../../interfaces/error';
import validationErrorHandler from '../../errors/validationErrorHandler';
import ApiError from '../../errors/ApiError';
import { errorLogger } from '../../shared/logger';
import { ZodError } from 'zod';
import zodErrorHandler from '../../errors/zodErrorHandler';
import castErrorHandler from '../../errors/castErrorHandler';

const globalErrorHandler: ErrorRequestHandler = (err, req, res) => {
  if (config.env === 'development') {
    console.log('global error handler', err);
  } else errorLogger.error('global error handler', err);

  let statusCode = 500;
  let message = 'Internal Server Error';
  let errorMessages: ErrorMessage[] = [];

  if (err?.name === 'ValidationError') {
    const validationError = validationErrorHandler(err);
    statusCode = validationError.statusCode;
    message = validationError.message;
    errorMessages = validationError.errorMessages;
  } else if (err instanceof ZodError) {
    const zodError = zodErrorHandler(err);
    statusCode = zodError?.statusCode;
    message = zodError?.message;
    errorMessages = zodError?.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err.message,
          },
        ]
      : [];
  } else if (err?.name === 'CastError') {
    const castError = castErrorHandler(err);
    statusCode = castError?.statusCode;
    message = castError?.message;
    errorMessages = castError?.message
      ? [
          {
            path: 'CastError',
            message: castError.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  });
};

export default globalErrorHandler;
