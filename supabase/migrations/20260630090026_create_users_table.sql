-- Create users table for admin accounts
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contactform table
CREATE TABLE IF NOT EXISTS contactform (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255) NOT NULL,
  linkedin VARCHAR(500),
  message TEXT,
  purpose VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  source VARCHAR(255),
  company VARCHAR(255),
  linkedin VARCHAR(500),
  title VARCHAR(255),
  agreed BOOLEAN DEFAULT false,
  whatsapp BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contactform ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- RLS policies for users (admin only)
CREATE POLICY "select_users_admin" ON users FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "insert_users_admin" ON users FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_users_admin" ON users FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_users_admin" ON users FOR DELETE
  TO authenticated USING (true);

-- RLS policies for contactform
CREATE POLICY "select_contactform_admin" ON contactform FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "insert_contactform_public" ON contactform FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE POLICY "delete_contactform_admin" ON contactform FOR DELETE
  TO authenticated USING (true);

-- RLS policies for leads
CREATE POLICY "select_leads_admin" ON leads FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "insert_leads_public" ON leads FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE POLICY "delete_leads_admin" ON leads FOR DELETE
  TO authenticated USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_contactform_created_at ON contactform(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);