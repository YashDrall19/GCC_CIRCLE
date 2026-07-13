-- Add active flag to legends and organic flag to leads for MySQL/MariaDB compatibility
ALTER TABLE legends
  ADD COLUMN IF NOT EXISTS active BOOLEAN NOT NULL DEFAULT TRUE;

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS organic BOOLEAN NOT NULL DEFAULT FALSE;
