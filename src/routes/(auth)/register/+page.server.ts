import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { fail, redirect } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms/server';
import { register } from '$lib/utils/schemas';

export const load: PageServerLoad = async () => {
	const form = await superValidate(register);

	return {
		form
	};
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const form = await superValidate(request, register);

		if (!form.valid)
			return fail(400, {
				form
			});

		try {
			await locals.pb.collection('users').create(form.data);
			await locals.pb.collection('users').authWithPassword(form.data.username, form.data.password);
		} catch (error) {
			return message(form, 'Something went wrong...', {
				status: 400
			});
		}

		throw redirect(303, '/dashboard');
	}
};
