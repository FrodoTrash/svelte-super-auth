import type { ServerLoad } from '@sveltejs/kit';

import { superValidate } from 'sveltekit-superforms/server';
import { register } from '$lib/utils/schemas';

export const load: ServerLoad = async () => {
	const form = await superValidate(register);

	return {
		form
	};
};
