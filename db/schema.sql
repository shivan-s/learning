CREATE TABLE IF NOT EXISTS topics (
    id INTEGER PRIMARY KEY,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT DEFAULT NULL,
    name VARCHAR(25)
);

CREATE TABLE IF NOT EXISTS learnings (
    id INTEGER PRIMARY KEY,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT DEFAULT NULL,
    content VARCHAR(255),
    topic_id INT,
    FOREIGN KEY (topic_id) REFERENCES topics (id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT OR IGNORE INTO topics (id, name) VALUES (1, 'Example');

INSERT OR IGNORE INTO learnings (id, content, topic_id) VALUES (
    1, 'This is an example learning. Must be less than 255 characters.', 1
),
(2, 'This is another example learning.', 1);

-- Topics

INSERT OR IGNORE INTO topics (id, name) VALUES (2, 'Programming'),
(3, 'Golf'),
(4, 'Flying'),
(5, 'Brazillian Jit-Jitsu'),
(6, 'Dancing'),
(7, 'Books'),
(8, 'Film'),
(9, 'Misc')
