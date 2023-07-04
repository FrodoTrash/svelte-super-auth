import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  passwordConfirm: z.string(),
}).required().refine((data) => data.password === data.passwordConfirm, {
  message: "passwords don't match",
  path: ['passwordConfirm']
});

export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6)
});

