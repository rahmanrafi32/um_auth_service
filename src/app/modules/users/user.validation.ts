import { z } from 'zod'

export const createUserZodSchema = z.object({
  body: z.object({
    user: z.object({
      role: z.string({
        required_error: 'Role is required',
      }),
    }),
  }),
})
