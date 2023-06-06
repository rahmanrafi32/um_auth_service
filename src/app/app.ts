import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import userRoute from './modules/users/user.route'
import globalErrorHandler from './middlewares/globalErrorHandler'

export const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', userRoute)
app.get('/', (req: Request, res: Response): void => {
  res.status(200).json({ message: 'server is running successfully' })
})

app.use(globalErrorHandler)
