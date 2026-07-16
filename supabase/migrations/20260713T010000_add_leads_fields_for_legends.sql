-- Add columns to leads table for admin-managed legend fields (MariaDB compatible)
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS image_url VARCHAR(1000) DEFAULT '';

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS questionnaire TEXT DEFAULT NULL;

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS type VARCHAR(100) DEFAULT 'tech';

-- Ensure organic column exists (should already be added earlier)
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS organic BOOLEAN DEFAULT false;
