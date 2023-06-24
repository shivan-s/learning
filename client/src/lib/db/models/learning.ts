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
			'learnings.content as content',
			'topics.name as topic'
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
		const baseQuery = deleted
			? this.db
					.selectFrom('learnings')
					.innerJoin('topics', 'learnings.topic_id', 'topics.id')
					.select([
						'learnings.id as learningId',
						'learnings.created_at as createdAt',
						'learnings.updated_at as updatedAt',
						'learnings.deleted_at as deletedAt',
						'learnings.content as content',
						'topics.name as topic'
					])
			: this.#connect;
		return baseQuery
			.$if(q !== null && q.length > 0, (qb) =>
				qb.where(({ or, cmpr }) => or([cmpr('content', 'like', q), cmpr('topics.name', 'like', q)]))
			)
			.$if(topicFilter !== null && topicFilter !== '-1', (qb) =>
				qb.where('topics.id', '=', parseInt(topicFilter ?? ''))
			)
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
	create(params: { topicId: number; content: string }) {
		const { topicId, content } = params;
		return this.db
			.insertInto('learnings')
			.values(({ selectFrom }) => ({
				topic_id: selectFrom('topics').where('id', '=', topicId).select(['id']).limit(1),
				content: content
			}))
			.returning((eb) => [
				'learnings.id as learningId',
				'learnings.created_at as createdAt',
				'learnings.content as content',
				eb
					.selectFrom(['topics', 'learnings'])
					.whereRef('learnings.topic_id', '=', 'topics.id')
					.select('topics.name as topic')
					.limit(1)
			])
			.executeTakeFirstOrThrow();
	}
	update(params: { learningId: number; topicId: number; content: string }) {
		const { topicId, learningId, content } = params;
		return this.db
			.updateTable('learnings')
			.set(({ selectFrom }) => ({
				topic_id: selectFrom('topics').where('id', '=', topicId).select(['id']).limit(1),
				content
			}))
			.where('learnings.id', '=', learningId)
			.returning((eb) => [
				'learnings.id as learningId',
				'learnings.created_at as createdAt',
				'learnings.content as content',
				eb
					.selectFrom(['topics', 'learnings'])
					.whereRef('learnings.topic_id', '=', 'topics.id')
					.select('topics.name as topic')
					.limit(1)
			])
			.executeTakeFirstOrThrow();
	}
	delete(params: { learningId: number }) {
		const { learningId } = params;
		const now = new Date(Date.now());
		return this.db
			.updateTable('learnings')
			.set({ deleted_at: now })
			.where('learnings.id', '=', learningId)
			.returning((eb) => [
				'learnings.id as learningId',
				'learnings.created_at as createdAt',
				'learnings.content as content',
				eb
					.selectFrom(['topics', 'learnings'])
					.whereRef('learnings.topic_id', '=', 'topics.id')
					.select('topics.name as topic')
					.limit(1)
			])
			.executeTakeFirstOrThrow();
	}
	undelete(params: { learningId: number }) {
		const { learningId } = params;
		return this.db
			.updateTable('learnings')
			.set({ deleted_at: null })
			.where('learnings.id', '=', learningId)
			.returning((eb) => [
				'id as learningId',
				'created_at as createdAt',
				'content as content',
				eb
					.selectFrom(['topics', 'learnings'])
					.whereRef('learnings.topic_id', '=', 'topics.id')
					.select('name as topic')
					.limit(1)
			])
			.executeTakeFirstOrThrow();
	}
}
