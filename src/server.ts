import mongoose from 'mongoose'
import 'dotenv/config'
import config from './config'
import { app } from './app/app'
import { errorLogger, infoLogger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', (error) => {
  errorLogger.error(error)
  process.exit(1)
})

let server: Server
async function bootstrap(): Promise<void> {
  try {
    await mongoose.connect(config.dbUrl as string)
    infoLogger.info('Successfully Connected To DB')
    server = app.listen(config.port, () => {
      infoLogger.info(
        `⚡️[server]: Server is running at http://localhost:${config.port}`
      )
    })
  } catch (err) {
    errorLogger.error('Failed to connect database')
  }

  process.on('unhandledRejection', (error) => {
    console.log('Unhandled rejection is detected. Server will be close soon...')
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()
