CREATE TABLE IF NOT EXISTS topics (id VARCHAR(16) PRIMARY KEY, name TEXT);

CREATE TABLE IF NOT EXISTS learnings (
  id INTEGER PRIMARY KEY,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  deleted_at TEXT DEFAULT NULL,
  content VARCHAR(512),
  topic_id VARCHAR(16),
  FOREIGN KEY (topic_id) REFERENCES topics (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Topics
INSERT
OR IGNORE INTO topics (id, name)
VALUES
  ('bjj', 'Brazillian Jit-Jitsu'),
  ('dance', 'Latin Dancing')
