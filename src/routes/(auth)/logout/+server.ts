// import { redirect } from '@sveltejs/kit';
import { actionResult } from 'sveltekit-superforms/server';

// endpoint
export const POST = ({ locals }) => {
	console.log(locals.user?.username + ' logged out');
	locals.pb.authStore.clear();
	locals.user = null;
	return actionResult('redirect', '/', { status: 303 });
};

// export const actions: Actions = {
// 	default: async ({ locals }) => {
// 		console.log(locals.user?.username + ' logged out');
// 		locals.pb.authStore.clear();
// 		locals.user = null;
// 		throw redirect(303, '/');
// 	}
// };
