import { Kysely, type Generated, SqliteDialect } from 'kysely';
import { D1Dialect } from 'kysely-d1';
import type { D1Database } from '@cloudflare/workers-types';
/* import dummyDb from './dummy'; */

interface Topic {
	id: Generated<number>;
	created_at: Generated<Date>;
	updated_at: Generated<Date> | Date;
	deleted_at: Date | null;
	name: string;
}

interface Learning {
	id: Generated<number>;
	created_at: Generated<Date>;
	updated_at: Generated<Date> | Date;
	deleted_at: Date | null;
	content: string;
	topic_id: number;
}

export interface Database {
	topics: Topic;
	learnings: Learning;
}

export default function connection(db: D1Database) {
	/* const dialect = db ? new D1Dialect({ database: db }) : new SqliteDialect({ database: dummyDb() }); */
	const dialect = db && new D1Dialect({ database: db });
	if (!db) {
		console.warn('Connecting to Dummy database');
	}
	return new Kysely<Database>({ dialect });
}
