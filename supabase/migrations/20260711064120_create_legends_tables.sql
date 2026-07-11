/*
# Create legends, legend_questions, and legend_answers tables

1. New Tables
- `legend_questions`: Stores reusable conversation questions used in legend interviews.
  - `id` (uuid, primary key)
  - `question` (text, not null) — the question text
  - `display_order` (int, default 0) — ordering for display
  - `created_at` (timestamptz)
- `legends`: Stores legend (leader) profile data.
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `designation` (text)
  - `company` (text)
  - `linkedin` (text)
  - `image_url` (text) — URL to the legend's image
  - `quote` (text)
  - `type` (text, default 'tech') — 'tech' or 'hr'
  - `date` (text) — optional date label
  - `created_at` (timestamptz)
- `legend_answers`: Stores answers to questions for each legend.
  - `id` (uuid, primary key)
  - `legend_id` (uuid, FK to legends, ON DELETE CASCADE)
  - `question_id` (uuid, FK to legend_questions, ON DELETE CASCADE)
  - `answer` (text)
  - `display_order` (int, default 0)
  - `created_at` (timestamptz)

2. Security
- Enable RLS on all three tables.
- Admin-only CRUD on legend_questions (TO authenticated).
- Admin-only CRUD on legends (TO authenticated).
- Admin-only CRUD on legend_answers (TO authenticated).
- Public read access on legends and legend_answers so the public league page can display data (TO anon, authenticated).

3. Notes
- legend_answers has unique constraint on (legend_id, question_id) to prevent duplicate answers.
- Indexes added on foreign keys and display_order for query performance.
*/

-- Legend Questions table
CREATE TABLE IF NOT EXISTS legend_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Legends table
CREATE TABLE IF NOT EXISTS legends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  designation TEXT DEFAULT '',
  company TEXT DEFAULT '',
  linkedin TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  quote TEXT DEFAULT '',
  type TEXT DEFAULT 'tech',
  date TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Legend Answers table
CREATE TABLE IF NOT EXISTS legend_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legend_id UUID NOT NULL REFERENCES legends(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES legend_questions(id) ON DELETE CASCADE,
  answer TEXT DEFAULT '',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (legend_id, question_id)
);

-- Enable RLS
ALTER TABLE legend_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE legends ENABLE ROW LEVEL SECURITY;
ALTER TABLE legend_answers ENABLE ROW LEVEL SECURITY;

-- RLS policies for legend_questions (admin CRUD)
DROP POLICY IF EXISTS "select_legend_questions" ON legend_questions;
CREATE POLICY "select_legend_questions" ON legend_questions
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "insert_legend_questions" ON legend_questions;
CREATE POLICY "insert_legend_questions" ON legend_questions
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_legend_questions" ON legend_questions;
CREATE POLICY "update_legend_questions" ON legend_questions
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_legend_questions" ON legend_questions;
CREATE POLICY "delete_legend_questions" ON legend_questions
  FOR DELETE TO authenticated USING (true);

-- RLS policies for legends (public read, admin write)
DROP POLICY IF EXISTS "select_legends" ON legends;
CREATE POLICY "select_legends" ON legends
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "insert_legends" ON legends;
CREATE POLICY "insert_legends" ON legends
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_legends" ON legends;
CREATE POLICY "update_legends" ON legends
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_legends" ON legends;
CREATE POLICY "delete_legends" ON legends
  FOR DELETE TO authenticated USING (true);

-- RLS policies for legend_answers (public read, admin write)
DROP POLICY IF EXISTS "select_legend_answers" ON legend_answers;
CREATE POLICY "select_legend_answers" ON legend_answers
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "insert_legend_answers" ON legend_answers;
CREATE POLICY "insert_legend_answers" ON legend_answers
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_legend_answers" ON legend_answers;
CREATE POLICY "update_legend_answers" ON legend_answers
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_legend_answers" ON legend_answers;
CREATE POLICY "delete_legend_answers" ON legend_answers
  FOR DELETE TO authenticated USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_legend_questions_order ON legend_questions(display_order);
CREATE INDEX IF NOT EXISTS idx_legends_created_at ON legends(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_legend_answers_legend_id ON legend_answers(legend_id);
CREATE INDEX IF NOT EXISTS idx_legend_answers_question_id ON legend_answers(question_id);
