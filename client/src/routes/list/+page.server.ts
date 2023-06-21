import type { PageServerLoad } from './$types';
import { Learning } from '$lib/db';
import Topic from '$lib/db/models/topic';

export const load = (async ({ platform, url, locals }) => {
	const { LIMIT } = locals;
	const q = url.searchParams.get('q');
	const topicFilter = url.searchParams.get('topic');
	const cursor = parseInt(url.searchParams.get('cursor') || '0');
	const topic = new Topic(platform?.env?.DB);
	const topics = topic.getAll().execute();
	const learning = new Learning(platform?.env?.DB);
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
