-- Add 'type' column to leads table (for admin-filled legend type)
ALTER TABLE leads
  ADD COLUMN `type` VARCHAR(64) DEFAULT NULL;

-- Optional: If you want a small set of allowed values, consider enforcing via CHECK in MySQL 8+ or use application-level validation.
