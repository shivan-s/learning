import type { PageServerLoad, Actions } from './$types';
import connection from '$lib/db';
import { sql } from 'kysely';

export const actions = {
	randomLearning: async ({ platform }) => {
		const db = connection(platform?.env?.DB);
		const randomLearning = await db
			.selectFrom('learnings')
			.where('learnings.deleted_at', 'is', null)
			.innerJoin('topics', 'learnings.topic_id', 'topics.id')
			.orderBy(sql`random()`)
			.select([
				'learnings.created_at as createdAt',
				'learnings.updated_at as updatedAt',
				'learnings.content as content',
				'topics.name as topic'
			])
			.limit(1)
			.executeTakeFirst();
		return {
			success: true,
			randomLearning
		};
	}
} satisfies Actions;

export const load = (async ({ platform, url }) => {
	const q = url.searchParams.get('q');
	const topicFilter = url.searchParams.get('topic');
	const db = connection(platform?.env?.DB);
	const { count } = db.fn;
	const learningsCount = (
		await db
			.selectFrom('learnings')
			.where('learnings.deleted_at', 'is', null)
			.select(count('id').as('count'))
			.executeTakeFirstOrThrow()
	).count;
	const randomLearning = await db
		.selectFrom('learnings')
		.where('learnings.deleted_at', 'is', null)
		.innerJoin('topics', 'learnings.topic_id', 'topics.id')
		.orderBy(sql`random()`)
		.select([
			'learnings.created_at as createdAt',
			'learnings.updated_at as updatedAt',
			'learnings.content as content',
			'topics.name as topic'
		])
		.limit(1)
		.executeTakeFirst();
	return {
		learningsCount,
		randomLearning,
		q,
		topicId: topicFilter
	};
}) satisfies PageServerLoad;
