import { pb } from '$lib/utils/pocketbase';
import { type Handle, redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// before

	//@ts-expect-error type string || null not assignable
	pb.authStore.loadFromCookie(event.request.headers.get('cookie'));

	if (pb.authStore.isValid) {
		try {
			await pb.collection('users').authRefresh();
		} catch (_) {
			pb.authStore.clear();
		}
	}
	event.locals.pb = pb;
	event.locals.user = structuredClone(pb.authStore.model);

	console.log(event.route.id?.split('/')[1] === '(protected)');

	if (event.route.id?.split('/')[1] === '(protected)')
		if (!event.locals.user) throw redirect(303, 'login');

	const response = await resolve(event);

	// after
	response.headers.set('set-cookie', pb.authStore.exportToCookie({ httpOnly: false }));

	return response;
};
