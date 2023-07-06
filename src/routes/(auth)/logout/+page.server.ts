import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals }) => {
		console.log(locals.user + ' logged out');
		locals.pb.authStore.clear();
		locals.user = null;
		throw redirect(303, '/');
	}
};
