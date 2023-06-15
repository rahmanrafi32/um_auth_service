import { ErrorMessage } from './error'

export type commonErrorResponse = {
  statusCode: number
  message: string
  errorMessages: ErrorMessage[]
}

export type genericResponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}
