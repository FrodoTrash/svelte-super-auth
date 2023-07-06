import { fail, type Actions, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

import { loginSchema } from '$lib/utils/schemas';

export const load = async (event) => {
	const form = await superValidate(event, loginSchema);

	return {
		form
	};
};

export const actions: Actions = {
	login: async (event) => {
		const form = await superValidate(event, loginSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await event.locals.pb
				.collection('users')
				.authWithPassword(form.data.username, form.data.password);
		} catch (error) {
			return message(form, 'something went wrong', {
				status: 400
			});
		}

		throw redirect(303, '/dashboard');
	}
};
