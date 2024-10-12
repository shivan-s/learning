import { ColumnType, Kysely, type Generated } from 'kysely';
import { D1Dialect } from 'kysely-d1';
import type { D1Database } from '@cloudflare/workers-types';

interface Topic {
	id: Generated<string>;
	name: string;
}

interface Learning {
	id: Generated<number>;
	created_at: ColumnType<string, string | undefined, string>;
	updated_at: ColumnType<string, string | undefined, string | undefined>;
	deleted_at: string | null;
	content: string;
	topic_id: string;
}

export interface Database {
	topics: Topic;
	learnings: Learning;
}

export default function connection(db: D1Database) {
	const dialect = new D1Dialect({ database: db });
	return new Kysely<Database>({ dialect });
}
