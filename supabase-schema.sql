-- Supabase Database Schema for ECO Engineering
-- Run this SQL in your Supabase SQL Editor to create the required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_name TEXT NOT NULL,
  customer TEXT NOT NULL,
  oem TEXT NOT NULL,
  operator TEXT NOT NULL,
  activity TEXT NOT NULL,
  no_of_sites INTEGER NOT NULL,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Equipment table
CREATE TABLE IF NOT EXISTS equipment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- P/O Projects table
CREATE TABLE IF NOT EXISTS po_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  po_date TEXT NOT NULL,
  client TEXT NOT NULL,
  product TEXT NOT NULL,
  project_status TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Careers table
CREATE TABLE IF NOT EXISTS careers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  employment_type TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  salary TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job Applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID REFERENCES careers(id) ON DELETE CASCADE,
  job_title TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  resume TEXT,
  cover_letter TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE po_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (you can restrict this later)
CREATE POLICY "Allow all operations on projects" ON projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on equipment" ON equipment FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on po_projects" ON po_projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on careers" ON careers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on job_applications" ON job_applications FOR ALL USING (true) WITH CHECK (true);

-- Contact Messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security for contact_messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy for contact_messages
CREATE POLICY "Allow all operations on contact_messages" ON contact_messages FOR ALL USING (true) WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_careers_is_active ON careers(is_active);
CREATE INDEX IF NOT EXISTS idx_job_applications_career_id ON job_applications(career_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
