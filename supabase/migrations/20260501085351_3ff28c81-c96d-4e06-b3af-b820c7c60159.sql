-- 1. Drop the overly permissive SELECT policy that exposed PII
DROP POLICY IF EXISTS "Public can view taken slots" ON public.bookings;

-- 2. Add an admin-only SELECT policy
CREATE POLICY "Admins can view bookings"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. Create a SECURITY DEFINER function that exposes ONLY booking_date and booking_time
CREATE OR REPLACE FUNCTION public.get_taken_slots(_date date)
RETURNS TABLE(booking_time text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT booking_time FROM public.bookings WHERE booking_date = _date;
$$;
GRANT EXECUTE ON FUNCTION public.get_taken_slots(date) TO anon, authenticated;

-- 4. Restrict has_role execution to prevent abuse
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, authenticated, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO postgres, service_role;