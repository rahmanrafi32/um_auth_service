import { ErrorMessage } from './error'

export type commonErrorResponse = {
  statusCode: number
  message: string
  errorMessages: ErrorMessage[]
}
