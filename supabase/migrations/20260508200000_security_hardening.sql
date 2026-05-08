-- ============================================================
-- LEGEND FADE — Security Hardening Migration
-- Run in: Supabase Dashboard → SQL Editor
-- ============================================================


-- ============================================================
-- FIX 1: Race Condition — Prevent double-booking the same slot
-- The bookings table already has unique(booking_date, booking_time)
-- This guard idempotently adds it if missing.
-- ============================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.bookings'::regclass
    AND contype = 'u'
    AND conname = 'bookings_date_time_unique'
  ) THEN
    ALTER TABLE public.bookings
      ADD CONSTRAINT bookings_date_time_unique UNIQUE (booking_date, booking_time);
  END IF;
END $$;

-- Speed up availability queries
CREATE INDEX IF NOT EXISTS bookings_date_time_idx ON public.bookings (booking_date, booking_time);


-- ============================================================
-- FIX 2: Privilege Escalation — Block users from self-promoting
-- to admin via profiles table update.
-- ============================================================

-- Remove any old permissive update policy
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- New safe policy: users can update their own row BUT role must stay unchanged
CREATE POLICY "Users can update own profile (no role escalation)"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
  );

-- Admins retain full update access
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'profiles'
    AND policyname = 'Admins can update any profile'
  ) THEN
    EXECUTE $policy$
      CREATE POLICY "Admins can update any profile"
        ON public.profiles
        FOR UPDATE
        TO authenticated
        USING (public.has_role(auth.uid(), 'admin'))
        WITH CHECK (public.has_role(auth.uid(), 'admin'));
    $policy$;
  END IF;
END $$;


-- ============================================================
-- FIX 3: Ensure RLS is ON for all tables (safety net)
-- ============================================================
ALTER TABLE public.services   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'profiles'
  ) THEN
    EXECUTE 'ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;';
  END IF;
END $$;
