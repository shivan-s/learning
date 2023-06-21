import BaseModel from './base';

export default class Topic extends BaseModel {
	#connect = this.db.selectFrom('topics').where('deleted_at', 'is', null).select(['name', 'id']);

	getAll() {
		/* this.#connect = this.#connect; */
		return this;
	}

	execute() {
		return this.#connect.execute();
	}

	getbyId(id: number) {
		return this.#connect.where('id', '=', id).executeTakeFirstOrThrow();
	}

	getCount() {
		const { count } = this.db.fn;
		return this.#connect.select(count('id').as('count')).executeTakeFirstOrThrow();
	}
}
