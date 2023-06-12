import { Request, Response, NextFunction, RequestHandler } from 'express'

const catchAsync = (func: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

export default catchAsync
