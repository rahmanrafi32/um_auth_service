import express, { Express } from 'express'
import cors from 'cors'
import globalErrorHandler from './middlewares/globalErrorHandler'
import routes from './routes'

export const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', routes)

app.use(globalErrorHandler)
