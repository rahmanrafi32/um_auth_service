import mongoose from 'mongoose'
import 'dotenv/config'
import config from './config'
import { app } from './app/app'
import { errorLogger, infoLogger } from './shared/logger'

async function connectDB() {
  try {
    await mongoose.connect(config.dbUrl as string)
    infoLogger.info('Successfully Connected To DB')
  } catch (err) {
    errorLogger.error('Failed to connect database')
  }
}

connectDB().then(() => {
  app.listen(config.port, () => {
    infoLogger.info(
      `⚡️[server]: Server is running at http://localhost:${config.port}`
    )
  })
})
