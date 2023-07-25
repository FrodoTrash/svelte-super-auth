import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { type Handle, redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(PUBLIC_POCKETBASE_URL);

	// load the store data from the request cookie string
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		event.locals.pb.authStore.isValid && (await event.locals.pb.collection('users').authRefresh());
		event.locals.user = structuredClone(event.locals.pb.authStore.model);
	} catch (_) {
		// clear the auth store on failed refresh
		event.locals.pb.authStore.clear();
		event.locals.user = null;
	}

	if (event.route.id?.split('/')[1] === '(protected)')
		if (!event.locals.user) throw redirect(303, 'login');

	if (event.route.id?.split('/')[1] === '(auth)')
		if (event.route.id?.split('/')[2] !== 'logout')
			if (event.locals.user) throw redirect(303, 'dashboard');

	const response = await resolve(event);

	// send back the default 'pb_auth' cookie to the client with the latest store state
	response.headers.append(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ httpOnly: false })
	);

	return response;
};
