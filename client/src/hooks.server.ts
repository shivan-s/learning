import type { Handle } from '@sveltejs/kit';
import connection from '$lib/db';

export const handle = (async ({ event, resolve }) => {
	event.locals.db = connection(event.platform.env.db);
	const response = await resolve(event);
	return response;
}) satisfies Handle;
