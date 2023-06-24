import type { PageServerLoad } from './$types';

export const load = (async ({ url, locals }) => {
	const { LIMIT } = locals;
	const { topic, learning } = locals.models;
	const q = url.searchParams.get('q');
	const topicFilter = url.searchParams.get('topic');
	const cursor = parseInt(url.searchParams.get('cursor') || '0');
	const topics = topic.getAll().execute();
	const learnings = learning.getAll({ topicFilter, q, limit: LIMIT, cursor });
	const learningsCount = (await learning.getCount()).count as number;
	let nextCursor: number | undefined;
	if (Math.floor(learningsCount / LIMIT) > cursor) {
		nextCursor = cursor + 1;
	}
	return {
		nextCursor,
		topics,
		learnings,
		q,
		topicId: topicFilter
	};
}) satisfies PageServerLoad;
