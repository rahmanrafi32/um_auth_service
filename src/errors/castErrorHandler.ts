import mongoose from 'mongoose'
import { ErrorMessage } from '../interfaces/error'

const castErrorHandler = (error: mongoose.Error.CastError) => {
  const statusCode = 400
  const errors: ErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid ID',
    },
  ]
  return {
    message: 'Cast Error',
    statusCode,
    errorMessages: errors,
  }
}

export default castErrorHandler
