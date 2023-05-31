import express, { Express, Request, Response } from 'express'
import cors from 'cors'
export const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.status(200).json('server is running...')
})
