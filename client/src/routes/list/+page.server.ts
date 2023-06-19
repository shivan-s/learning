import type { Actions, PageServerLoad } from './$types';
import connection from '$lib/db';
import { sql } from 'kysely';

export const actions = {
	fetchLearnings: async ({ url, request, platform, locals }) => {
		const { LIMIT } = locals;
		const topicFilter = url.searchParams.get('topic');
		const q = url.searchParams.get('q');
		const formData = await request.formData();
		const cursor = formData.get('cursor') as string;
		const db = connection(platform?.env?.DB);
		const learnings = await db
			.selectFrom('learnings')
			.where('learnings.deleted_at', 'is', null)
			.innerJoin('topics', 'learnings.topic_id', 'topics.id')
			.select([
				'learnings.created_at as createdAt',
				'learnings.updated_at as updatedAt',
				'learnings.content as content',
				'topics.name as topic'
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
		return { success: true, learnings, nextCursor };
	}
} satisfies Actions;

export const load = (async ({ platform, url, locals }) => {
	const { LIMIT } = locals;
	const q = url.searchParams.get('q');
	const topicFilter = url.searchParams.get('topic');
	const db = connection(platform?.env?.DB);
	const { count } = db.fn;
	const topics = await db
		.selectFrom('topics')
		.where('deleted_at', 'is', null)
		.select(['name', 'id'])
		.execute();
	const learningsCount = (
		await db
			.selectFrom('learnings')
			.where('learnings.deleted_at', 'is', null)
			.select(count('id').as('count'))
			.executeTakeFirstOrThrow()
	).count as number;
	const learnings = await db
		.selectFrom('learnings')
		.where('learnings.deleted_at', 'is', null)
		.innerJoin('topics', 'learnings.topic_id', 'topics.id')
		.select([
			'learnings.created_at as createdAt',
			'learnings.updated_at as updatedAt',
			'learnings.content as content',
			'topics.name as topic'
		])
		.$if(q !== null && q.length > 0, (qb) =>
			qb.where(({ or, cmpr }) => or([cmpr('content', 'like', q), cmpr('topics.name', 'like', q)]))
		)
		.$if(topicFilter !== null && topicFilter !== '-1', (qb) =>
			qb.where('topics.id', '=', parseInt(topicFilter ?? ''))
		)
		.orderBy('createdAt', 'desc')
		.limit(LIMIT)
		.execute();
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
		topics,
		learnings,
		randomLearning,
		q,
		topicId: topicFilter
	};
}) satisfies PageServerLoad;
