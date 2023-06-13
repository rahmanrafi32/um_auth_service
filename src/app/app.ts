import express, { Express, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './middlewares/globalErrorHandler'
import routes from './routes'
import httpStatus from 'http-status'

export const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', routes)

//global handler
app.use(globalErrorHandler)

//not found error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})
