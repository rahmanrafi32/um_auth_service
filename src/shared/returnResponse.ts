import { Response } from 'express'
import { sendResponse } from '../interfaces/sendResponse'

const returnResponse = <T>(res: Response, data: sendResponse<T>): void => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data || null,
  })
}

export default returnResponse
