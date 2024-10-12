import { sql } from 'kysely';
import BaseModel from './base';

export default class Learning extends BaseModel {
	#connect = this.db
		.selectFrom('learnings')
		.where('learnings.deleted_at', 'is', null)
		.innerJoin('topics', 'learnings.topic_id', 'topics.id')
		.select([
			'learnings.id as learningId',
			'learnings.created_at as createdAt',
			'learnings.updated_at as updatedAt',
			'learnings.deleted_at as deletedAt',
			'learnings.content as content',
			'topics.name as topic',
			'topics.id as topicId'
		]);

	getAll(params: {
		topicFilter: string | null;
		q: string | null;
		limit: number | null;
		cursor: number | null;
		deleted?: boolean;
	}) {
		const { topicFilter, q, cursor, deleted } = params;
		const limit = params.limit || 10;
		let query = deleted
			? this.db
					.selectFrom('learnings')
					.innerJoin('topics', 'learnings.topic_id', 'topics.id')
					.select([
						'learnings.id as learningId',
						'learnings.created_at as createdAt',
						'learnings.updated_at as updatedAt',
						'learnings.deleted_at as deletedAt',
						'learnings.content as content',
						'topics.name as topic',
						'topics.id as topicId'
					])
			: this.#connect;
		if (q !== null && q.trim().length > 0) {
			query = query.where(({ or, cmpr }) =>
				or([cmpr('content', 'like', q), cmpr('topics.name', 'like', q)])
			);
		}
		if (topicFilter !== null && topicFilter !== '-1') {
			query = query.where('topics.id', '=', topicFilter);
		}

		return query
			.orderBy('createdAt', 'desc')
			.offset(cursor || 0 * limit)
			.limit(limit)
			.execute();
	}

	getbyId(id: number) {
		return this.#connect.where('learnings.id', '=', id).executeTakeFirstOrThrow();
	}

	getRandom() {
		return this.#connect
			.orderBy(sql`random()`)
			.limit(1)
			.executeTakeFirst();
	}
	getCount() {
		const { count: countFn } = this.db.fn;
		const count = this.db
			.selectFrom('learnings')
			.where('learnings.deleted_at', 'is', null)
			.select(countFn('learnings.id').as('count'))
			.executeTakeFirstOrThrow() as Promise<{ count: number }>;
		return count;
	}
	create(params: { topicId: string; content: string }) {
		const { topicId, content } = params;
		return this.db
			.insertInto('learnings')
			.values({ topic_id: topicId, content })
			.returning([
				'learnings.id as learningId',
				'learnings.created_at as createdAt',
				'learnings.content as content'
			])
			.executeTakeFirstOrThrow();
	}
	update(params: { learningId: number; topicId: string; content: string }) {
		const { topicId, learningId, content } = params;
		const now = new Date().toUTCString();
		return this.db
			.updateTable('learnings')
			.set({
				updated_at: now,
				topic_id: topicId,
				content
			})
			.where('learnings.id', '=', learningId)
			.returning([
				'learnings.id as learningId',
				'learnings.created_at as createdAt',
				'learnings.content as content'
			])
			.executeTakeFirstOrThrow();
	}
	delete(params: { learningId: number }) {
		const { learningId } = params;
		const now = new Date().toUTCString();
		return this.db
			.updateTable('learnings')
			.set({ deleted_at: now })
			.where('learnings.id', '=', learningId)
			.returning([
				'learnings.id as learningId',
				'learnings.created_at as createdAt',
				'learnings.content as content'
			])
			.executeTakeFirstOrThrow();
	}
	undelete(params: { learningId: number }) {
		const { learningId } = params;
		return this.db
			.updateTable('learnings')
			.set({ deleted_at: null })
			.where('learnings.id', '=', learningId)
			.returning(['id as learningId', 'created_at as createdAt', 'content as content'])
			.executeTakeFirstOrThrow();
	}
}
