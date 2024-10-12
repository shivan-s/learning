import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals }) => {
	const { learning } = locals.models;
	const q = url.searchParams.get('q');
	const topicFilter = url.searchParams.get('topic');
	const randomLearning = learning.getRandom();
	const learningsCount = learning.getCount();
	return {
		learningsCount,
		randomLearning,
		q,
		topicId: topicFilter
	};
};
