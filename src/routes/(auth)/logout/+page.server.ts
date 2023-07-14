import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

// ssr
// export const POST = ({ locals }) => {
// 	console.log(locals.user?.username + ' logged out');
// 	locals.pb.authStore.clear();
// 	locals.user = null;
// 	throw redirect(303, '/');
// };

export const actions: Actions = {
	default: async ({ locals }) => {
		console.log(locals.user?.username + ' logged out');
		locals.pb.authStore.clear();
		locals.user = null;
		throw redirect(303, '/');
	}
};
