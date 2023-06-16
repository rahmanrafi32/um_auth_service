import mongoose from 'mongoose';
import { ErrorMessage } from '../interfaces/error';
import { commonErrorResponse } from '../interfaces/commonErrorResponse';

const validationErrorHandler = (
  err: mongoose.Error.ValidationError
): commonErrorResponse => {
  const errors: ErrorMessage[] = Object.values(err.errors).map(
    (element: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: element?.path,
        message: element?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    message: 'Validation Error',
    statusCode,
    errorMessages: errors,
  };
};

export default validationErrorHandler;
