-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique(user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Admins can view roles" on public.user_roles
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can manage roles" on public.user_roles
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Services
create table public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10,2) not null check (price >= 0),
  duration text not null,
  description text not null default '',
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.services enable row level security;

create policy "Anyone can view active services" on public.services
  for select using (active = true or public.has_role(auth.uid(), 'admin'));

create policy "Admins can insert services" on public.services
  for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update services" on public.services
  for update to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete services" on public.services
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger services_updated_at before update on public.services
  for each row execute function public.set_updated_at();

-- Bookings
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references public.services(id) on delete set null,
  service_name text not null,
  price numeric(10,2) not null,
  booking_date date not null,
  booking_time text not null,
  customer_name text not null,
  customer_phone text not null,
  created_at timestamptz not null default now(),
  unique(booking_date, booking_time)
);

alter table public.bookings enable row level security;

create policy "Anyone can create bookings" on public.bookings
  for insert with check (true);

create policy "Anyone can view booking slots" on public.bookings
  for select using (true);

create policy "Admins can update bookings" on public.bookings
  for update to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete bookings" on public.bookings
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create index bookings_date_idx on public.bookings(booking_date);

-- Seed services
insert into public.services (name, price, duration, description, sort_order) values
  ('Classic Haircut', 30, '45 min', 'Precision scissor cut, wash, and style tailored to your face shape.', 1),
  ('Beard Trim & Shape', 20, '30 min', 'Sculpted beard line-up with hot towel and beard oil finish.', 2),
  ('Hot Towel Shave', 35, '40 min', 'Traditional straight razor shave with hot towel and aftercare.', 3),
  ('Cut + Beard Combo', 45, '60 min', 'Full haircut paired with beard grooming for a complete refresh.', 4),
  ('Kids Haircut', 22, '30 min', 'Patient, friendly cuts for ages 12 and under.', 5),
  ('Legend VIP Experience', 80, '90 min', 'Cut, beard, hot shave, scalp massage, and complimentary drink.', 6);
