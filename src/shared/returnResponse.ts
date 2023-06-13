import { Response } from 'express'
import { sendResponse } from '../interfaces/sendResponse'

const returnResponse = <T>(res: Response, data: sendResponse<T>): void => {
  const responseData: sendResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data || null,
  }

  res.status(data.statusCode).json(responseData)
}

export default returnResponse
