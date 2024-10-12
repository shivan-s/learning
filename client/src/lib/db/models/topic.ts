import BaseModel from './base';

export default class Topic extends BaseModel {
	#connect = this.db.selectFrom('topics').select(['name', 'id']);
	getAll(params?: { deleted?: boolean }) {
		const deleted = params?.deleted;
		return deleted
			? this.db.selectFrom('topics').select(['name', 'id']).execute()
			: this.#connect.execute();
	}
	execute() {
		return this.#connect.execute();
	}
	getbyId(id: string) {
		return this.#connect.where('id', '=', id).executeTakeFirstOrThrow();
	}
	getCount() {
		const { count: countFn } = this.db.fn;
		return this.db
			.selectFrom('topics')
			.select(countFn<number>('topics.id').as('count'))
			.executeTakeFirstOrThrow();
	}
}
