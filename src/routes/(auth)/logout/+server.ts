import { actionResult } from 'sveltekit-superforms/server';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
	console.log(locals.user?.username + ' logged out');
	locals.pb.authStore.clear();
	locals.user = null;
	return actionResult('redirect', '/', { status: 303 });
};
