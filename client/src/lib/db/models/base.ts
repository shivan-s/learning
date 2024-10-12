import connection from '../db';
import type { D1Database } from '@cloudflare/workers-types';

export default class BaseModel {
	db;
	constructor(db: D1Database) {
		this.db = connection(db);
	}
}
