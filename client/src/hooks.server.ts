import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const { locals } = event;
	locals.LIMIT = 10;
	const response = await resolve(event);
	return response;
}) satisfies Handle;
