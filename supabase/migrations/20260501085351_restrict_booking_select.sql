DROP POLICY IF EXISTS "Public can view taken slots" ON public.bookings;

CREATE POLICY "Admins can view bookings"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

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

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, authenticated, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO postgres, service_role;
