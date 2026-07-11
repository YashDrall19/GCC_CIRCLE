-- Legends feature schema for MariaDB 10.11
-- Run: mysql -u root -p gcc_circle < scripts/legends_schema.sql
-- Or execute via the /api/admin/seed-legends endpoint

CREATE TABLE IF NOT EXISTS legend_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS legends (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  designation VARCHAR(255) DEFAULT '',
  company VARCHAR(255) DEFAULT '',
  linkedin TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  quote TEXT DEFAULT '',
  type VARCHAR(50) NOT NULL DEFAULT 'tech',
  date VARCHAR(100) DEFAULT '',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS legend_answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  legend_id INT NOT NULL,
  question_id INT NOT NULL,
  answer TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_legend_question (legend_id, question_id),
  CONSTRAINT fk_answers_legend FOREIGN KEY (legend_id)
    REFERENCES legends(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_answers_question FOREIGN KEY (question_id)
    REFERENCES legend_questions(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_questions_display_order ON legend_questions(display_order);
CREATE INDEX idx_legends_created_at ON legends(created_at);
CREATE INDEX idx_answers_legend_id ON legend_answers(legend_id);
CREATE INDEX idx_answers_question_id ON legend_answers(question_id);
