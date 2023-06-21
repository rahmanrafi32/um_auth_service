import { ErrorMessage } from './error';

export type commonErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: ErrorMessage[];
};

export type GenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
