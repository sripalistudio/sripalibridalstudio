-- =======================================================
-- SRIPALI STUDIO - ADD HERO FLAG
-- Run this in Supabase SQL Editor
-- =======================================================

-- 1. Add 'is_hero' column to 'gallery' table
ALTER TABLE gallery 
ADD COLUMN IF NOT EXISTS is_hero boolean DEFAULT false;

-- 2. Update existing rows (Optional: Set all to false usually, or leave as default)
-- UPDATE gallery SET is_hero = false;
