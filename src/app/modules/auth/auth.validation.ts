import { z } from 'zod';

export const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

export const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

export const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Password is required',
    }),
    newPassword: z.string({
      required_error: 'Password is required',
    }),
  }),
});
