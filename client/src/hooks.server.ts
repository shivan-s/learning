import { Learning } from '$lib/db';
import Topic from '$lib/db/models/topic';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const { locals, platform } = event;
	locals.LIMIT = 10;
	locals.models = {
		learning: new Learning(platform?.env?.DB),
		topic: new Topic(platform?.env?.DB)
	};
	const response = await resolve(event);
	return response;
}) satisfies Handle;
