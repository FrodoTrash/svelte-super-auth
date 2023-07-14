import type { LayoutServerLoad } from './$types';
// import { superValidate } from 'sveltekit-superforms/server';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (locals.user) {
		return { user: locals.user };
	}
	return {
		user: null
	};
};
