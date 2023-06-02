import { createLogger, format, Logger, transports } from 'winston'
import 'winston-daily-rotate-file'
import moment from 'moment'
import path from 'path'

const { combine, timestamp, label, printf } = format

const logFormatter = printf(({ level, message, label, timestamp }) => {
  const formattedTime = moment(timestamp).format('DD MMM YYYY HH:mm:ss')
  return `${formattedTime} [${label}] ${level}: ${message}`
})
export const infoLogger: Logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'Uni Management' }),
    timestamp(),
    logFormatter
  ),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'phu-%DATE%.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export const errorLogger: Logger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'Uni Management' }),
    timestamp(),
    logFormatter
  ),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'phu-%DATE%.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})
