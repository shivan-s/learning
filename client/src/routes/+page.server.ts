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

export const load = (async ({ platform, url, locals }) => {
	const { LIMIT } = locals;
	const q = url.searchParams.get('q');
	const topicFilter = url.searchParams.get('topic');
	const cursor = url.searchParams.get('cursor');
	const db = connection(platform?.env?.DB);
	const { count } = db.fn;
	const topics = await db
		.selectFrom('topics')
		.where('deleted_at', 'is', null)
		.select(['name', 'id'])
		.execute();
	const learningsTotal = await db
		.selectFrom('learnings')
		.where('learnings.deleted_at', 'is', null)
		.select(count('id').as('count'))
		.executeTakeFirst();
	const learnings = await db
		.selectFrom('learnings')
		.where('learnings.deleted_at', 'is', null)
		.innerJoin('topics', 'learnings.topic_id', 'topics.id')
		.select([
			'learnings.created_at as createdAt',
			'learnings.updated_at as updatedAt',
			'learnings.content as content',
			'topics.name as topic',
			count('learnings.id').as('numLearnings')
		])
		.$if(q !== null && q.length > 0, (qb) =>
			qb.where(({ or, cmpr }) => or([cmpr('content', 'like', q), cmpr('topics.name', 'like', q)]))
		)
		.$if(topicFilter !== null && topicFilter !== '-1', (qb) =>
			qb.where('topics.id', '=', parseInt(topicFilter ?? ''))
		)
		.orderBy('createdAt', 'desc')
		.limit(LIMIT)
		.$if(cursor !== null, (qb) => qb.offset((parseInt(cursor || '0') || 0) * LIMIT))
		.execute();
	const nextCursor = parseInt(cursor || '0') || 0 + 1;
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
		learningsTotal,
		nextCursor,
		topics,
		learnings,
		randomLearning,
		q,
		topicId: topicFilter
	};
}) satisfies PageServerLoad;
