import type { Handle } from '@sveltejs/kit';
import connection from '$lib/db';

export const handle = (async ({ event, resolve }) => {
	const { platform, locals } = event;
	locals.db = connection(platform?.env?.DB);
	const response = await resolve(event);
	return response;
}) satisfies Handle;
