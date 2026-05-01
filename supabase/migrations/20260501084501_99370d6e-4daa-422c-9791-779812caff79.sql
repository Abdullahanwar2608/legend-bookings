-- Lock down helper functions
alter function public.set_updated_at() set search_path = public;
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated, service_role;

-- Restrict booking public policies to anon + authenticated only (not service-internal roles)
drop policy "Anyone can create bookings" on public.bookings;
drop policy "Anyone can view booking slots" on public.bookings;

-- Public can only see slot date+time (handled at column level via a view)
create policy "Public can create bookings" on public.bookings
  for insert to anon, authenticated with check (
    length(customer_name) between 2 and 60
    and length(customer_phone) between 7 and 20
    and booking_date >= current_date
  );

create policy "Public can view taken slots" on public.bookings
  for select to anon, authenticated using (true);
