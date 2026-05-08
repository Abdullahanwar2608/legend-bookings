-- Clean up old services and insert the new 4 services requested by the client
DELETE FROM public.services;

INSERT INTO public.services (name, price, duration, description, sort_order) VALUES
  ('Haircut', 15.00, '30 min', 'Precision haircut tailored to your style.', 1),
  ('Beard Trim', 10.00, '20 min', 'Detailed beard shaping and trimming.', 2),
  ('Shave', 10.00, '20 min', 'Classic straight razor hot towel shave.', 3),
  ('Kids Cut', 12.00, '25 min', 'Haircut for kids under 12.', 4);

-- Ensure the booked_slots view exists for the frontend to safely check availability without exposing PII
CREATE OR REPLACE VIEW public.booked_slots AS
SELECT booking_date, booking_time FROM public.bookings;

-- Grant access to anon and authenticated users so they can read the booked slots
GRANT SELECT ON public.booked_slots TO anon;
GRANT SELECT ON public.booked_slots TO authenticated;
