import Database from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';

export default function localDb<T>() {
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
	return new Kysely<T>({
		dialect: new SqliteDialect({ database: db })
	});
}
