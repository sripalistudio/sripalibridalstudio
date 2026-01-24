-- =======================================================
-- SRIPALI STUDIO - FIXING POLICIES
-- Run this script in Supabase SQL Editor.
-- It will safely DROP existing policies and RE-CREATE them to ensure they work.
-- =======================================================

-- 1. GALLERY TABLE (Fixing Upload Error)
DROP POLICY IF EXISTS "Public can view gallery" ON gallery;
DROP POLICY IF EXISTS "Admins can manage gallery" ON gallery;
DROP POLICY IF EXISTS "Authenticated users can upload" ON gallery;

CREATE POLICY "Public can view gallery" 
ON gallery FOR SELECT 
USING (true);

-- Allow Admins (authenticated) to Do EVERYTHING (Select, Insert, Update, Delete)
CREATE POLICY "Admins can manage gallery" 
ON gallery FOR ALL 
USING (auth.role() = 'authenticated');


-- 2. STORAGE (Fixing Image Upload to Bucket)
-- Note: Policy names might vary, so we try to cover common names or just add ours.
-- If you have a specific policy name blocking it, you might need to drop it manually in the dashboard.
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Insert" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete" ON storage.objects;
DROP POLICY IF EXISTS "Give me access" ON storage.objects; -- Common default name

-- Public Read Access
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'gallery' );

-- Admin Insert Access
CREATE POLICY "Admin Insert" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'gallery' AND auth.role() = 'authenticated' );

-- Admin Delete Access
CREATE POLICY "Admin Delete" 
ON storage.objects FOR DELETE 
USING ( bucket_id = 'gallery' AND auth.role() = 'authenticated' );


-- 3. PACKAGES TABLE
DROP POLICY IF EXISTS "Public can view packages" ON packages;
DROP POLICY IF EXISTS "Admins can manage packages" ON packages;

CREATE POLICY "Public can view packages" 
ON packages FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage packages" 
ON packages FOR ALL 
USING (auth.role() = 'authenticated');


-- 4. BOOKINGS TABLE
DROP POLICY IF EXISTS "Public can create bookings" ON bookings;
DROP POLICY IF EXISTS "Public can view bookings" ON bookings;
DROP POLICY IF EXISTS "Admins can update bookings" ON bookings;
DROP POLICY IF EXISTS "Admins can delete bookings" ON bookings;

-- Public can Create
CREATE POLICY "Public can create bookings" 
ON bookings FOR INSERT 
WITH CHECK (true);

-- Authenticated Admins can View All
CREATE POLICY "Admins can view bookings" 
ON bookings FOR SELECT 
USING (auth.role() = 'authenticated');

-- Authenticated Admins can Update
CREATE POLICY "Admins can update bookings" 
ON bookings FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Authenticated Admins can Delete
CREATE POLICY "Admins can delete bookings" 
ON bookings FOR DELETE 
USING (auth.role() = 'authenticated');
