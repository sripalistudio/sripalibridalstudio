-- =======================================================
-- SRIPALI STUDIO - MULTI-SITE MESSAGES
-- Run this in Supabase SQL Editor
-- =======================================================

-- 1. Add 'source' column to 'messages' table
ALTER TABLE messages 
ADD COLUMN IF NOT EXISTS source text DEFAULT 'Bridal';

-- 2. Update existing rows to 'Bridal' (optional since default takes care of new ones)
-- UPDATE messages SET source = 'Bridal' WHERE source IS NULL;
