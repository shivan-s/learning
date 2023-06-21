import type { PageServerLoad } from './$types';
import { Learning } from '$lib/db';

export const load = (async ({ platform, url }) => {
	const q = url.searchParams.get('q');
	const topicFilter = url.searchParams.get('topic');
	const learning = new Learning(platform?.env?.DB);
	const randomLearning = learning.getRandom();
	const learningsCount = learning.getCount();
	return {
		learningsCount,
		randomLearning,
		q,
		topicId: topicFilter
	};
}) satisfies PageServerLoad;
