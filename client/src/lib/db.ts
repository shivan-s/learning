import { Kysely, type Generated, SqliteDialect } from 'kysely';
import { D1Dialect } from 'kysely-d1';
import type { D1Database } from '@cloudflare/workers-types';
import Database from 'better-sqlite3';

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

export default function connection(d1Database?: D1Database) {
	if (d1Database) {
		return new Kysely<Database>({ dialect: new D1Dialect({ database: d1Database }) });
	}
	const db = new Database('temp.db', { verbose: console.log });
	db.prepare(
		`
          CREATE TABLE IF NOT EXISTS topics(
              id INT PRIMARY KEY,
              created_at TEXT DEFAULT CURRENT_TIMESTAMP,
              updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
              deleted_at TEXT DEFAULT NULL,
              name VARCHAR(25)
            )
      `
	).run();
	db.prepare(
		`
          CREATE TABLE IF NOT EXISTS learnings(
              id INT PRIMARY KEY,
              created_at TEXT DEFAULT CURRENT_TIMESTAMP,
              updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
              deleted_at TEXT DEFAULT NULL,
              content VARCHAR(255),
              topic_id INT,
              FOREIGN KEY(topic_id) REFERENCES topics(id)
              ON DELETE CASCADE ON UPDATE CASCADE
            )`
	).run();
	db.prepare(
		`
    INSERT OR IGNORE INTO topics(id, name) VALUES(1, 'Example')
            `
	).run();
	db.prepare(
		`
    INSERT OR IGNORE INTO learnings(id, content, topic_id) VALUES(
        1, 'This is an example learning. Must be less than 255 characters.', 1
      ),
        (2, 'This is another example learning.', 1)

            `
	).run();
	db.prepare(
		`
    INSERT OR IGNORE INTO topics (id, name) VALUES (2, 'Programming'),
    (3, 'Golf'),
    (4, 'Flying'),
    (5, 'BJJ');
    `
	).run();
	return new Kysely<Database>({
		dialect: new SqliteDialect({ database: db })
	});
}
