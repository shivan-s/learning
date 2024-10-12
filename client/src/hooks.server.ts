import { Learning } from '$lib/db';
import Topic from '$lib/db/models/topic';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { locals, platform } = event;
	console.log(platform);
	locals.LIMIT = 10;
	locals.models = {
		learning: new Learning(platform?.env?.DB),
		topic: new Topic(platform?.env?.DB)
	};
	const response = await resolve(event);
	return response;
};
