import type { ServerLoad } from '@sveltejs/kit';

import { superValidate } from 'sveltekit-superforms/server';
import { login } from '$lib/utils/schemas';

export const load: ServerLoad = async () => {
	const form = await superValidate(login);

	return {
		form
	};
};
