-- Supabase Schema for Eco Engineering Admin Panel
-- Run this SQL in your Supabase SQL Editor to create all required tables

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_name TEXT NOT NULL,
  customer TEXT NOT NULL,
  oem TEXT NOT NULL,
  operator TEXT NOT NULL,
  activity TEXT NOT NULL,
  no_of_sites INTEGER NOT NULL DEFAULT 0,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Equipment Table
CREATE TABLE IF NOT EXISTS equipment (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- P/O Projects Table
CREATE TABLE IF NOT EXISTS po_projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  po_date TEXT NOT NULL,
  client TEXT NOT NULL,
  product TEXT NOT NULL,
  project_status TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Careers Table
CREATE TABLE IF NOT EXISTS careers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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

-- Job Applications Table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE po_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (for admin access)
-- Projects policies
CREATE POLICY "Allow all operations on projects" ON projects FOR ALL USING (true) WITH CHECK (true);

-- Equipment policies
CREATE POLICY "Allow all operations on equipment" ON equipment FOR ALL USING (true) WITH CHECK (true);

-- P/O Projects policies
CREATE POLICY "Allow all operations on po_projects" ON po_projects FOR ALL USING (true) WITH CHECK (true);

-- Careers policies
CREATE POLICY "Allow all operations on careers" ON careers FOR ALL USING (true) WITH CHECK (true);

-- Job Applications policies
CREATE POLICY "Allow all operations on job_applications" ON job_applications FOR ALL USING (true) WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_equipment_created_at ON equipment(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_po_projects_created_at ON po_projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_careers_created_at ON careers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_careers_is_active ON careers(is_active);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON job_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_applications_career_id ON job_applications(career_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
