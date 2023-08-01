import { z } from 'zod';

export const login = z.object({
	username: z.string().min(3),
	password: z.string().min(8)
});

export const register = z
	.object({
		username: z.string().min(3),
		email: z.string().email(),
		password: z.string().min(8),
		passwordConfirm: z.string()
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "passwords don't match",
		path: ['passwordConfirm']
	});
