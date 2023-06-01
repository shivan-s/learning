import { Kysely, type Generated } from 'kysely';
import { D1Dialect } from 'kysely-d1';
import type { D1Database } from '@cloudflare/workers-types';

interface Topic {
	id: Generated<number>;
	created_at: Date;
	updated_at: Date;
	deleted_at: Date | null;
	name: string;
}

interface Learning {
	id: Generated<number>;
	created_at: Date;
	updated_at: Date;
	deleted_at: Date | null;
	content: string;
	topic_id: number;
}

export interface Database {
	topics: Topic;
	learnings: Learning;
}

export default function connection(db: D1Database) {
	return new Kysely<Database>({ dialect: new D1Dialect({ database: db }) });
}
