import { actionResult, superValidate } from 'sveltekit-superforms/server';
import type { RequestHandler } from './$types';
import { register } from '$lib/utils/schemas';

export const POST: RequestHandler = async ({ locals, request }) => {
	const form = await superValidate(request, register);

	if (!form.valid) return actionResult('error', 'form is not valid', { status: 500 });

	try {
		await locals.pb.collection('users').create(form.data);
		await locals.pb.collection('users').authWithPassword(form.data.username, form.data.password);
		console.log(form.data.username + ' logged in');
	} catch (error) {
		return actionResult('error', 'Something went wrong...', { status: 500 });
	}

	return actionResult('redirect', '/dashboard', { status: 303 });
};
