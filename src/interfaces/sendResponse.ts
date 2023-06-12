export type sendResponse<T> = {
  statusCode: number
  success: boolean
  message?: string
  data?: T | null
}
