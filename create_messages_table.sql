-- =======================================================
-- SRIPALI STUDIO - MESSAGES TABLE SETUP (FIXED)
-- Run this in Supabase SQL Editor
-- =======================================================

-- 1. Create Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  is_read boolean DEFAULT false
);

-- 2. Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies

-- Allow PUBLIC to SEND messages (Insert)
DROP POLICY IF EXISTS "Public can send messages" ON messages;
CREATE POLICY "Public can send messages" 
ON messages FOR INSERT 
WITH CHECK (true);

-- Allow ADMINS to VIEW messages
DROP POLICY IF EXISTS "Admins can view messages" ON messages;
CREATE POLICY "Admins can view messages" 
ON messages FOR SELECT 
USING (auth.role() = 'authenticated');

-- Allow ADMINS to UPDATE (Mark as read)
DROP POLICY IF EXISTS "Admins can update messages" ON messages;
CREATE POLICY "Admins can update messages" 
ON messages FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Allow ADMINS to DELETE messages
DROP POLICY IF EXISTS "Admins can delete messages" ON messages;
CREATE POLICY "Admins can delete messages" 
ON messages FOR DELETE 
USING (auth.role() = 'authenticated');
