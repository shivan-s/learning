import { sql } from 'kysely';
import BaseModel from './base';

export default class Learning extends BaseModel {
	#connect = this.db
		.selectFrom('learnings')
		.where('learnings.deleted_at', 'is', null)
		.innerJoin('topics', 'learnings.topic_id', 'topics.id')
		.select([
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
	}) {
		const { topicFilter, q, cursor } = params;
		const limit = params.limit || 10;
		return this.#connect
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
		const { count } = this.db.fn;
		return this.#connect.select(count('learnings.id').as('count')).executeTakeFirstOrThrow();
	}
}
