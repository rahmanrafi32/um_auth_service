import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { ErrorMessage } from '../../interfaces/error'
import validationErrorHandler from '../../interfaces/validationErrorHandler'
import ApiError from '../../errors/ApiError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500
  let message = 'Internal Server Error'
  let errorMessages: ErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const validationError = validationErrorHandler(err)
    statusCode = validationError.statusCode
    message = validationError.message
    errorMessages = validationError.errorMessages
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })

  next()
}

export default globalErrorHandler
