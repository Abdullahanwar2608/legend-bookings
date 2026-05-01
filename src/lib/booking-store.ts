import { supabase } from "@/integrations/supabase/client";

export type Service = {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  sort_order?: number;
  active?: boolean;
};

export const TIME_SLOTS = [
  "09:00", "09:45", "10:30", "11:15", "12:00",
  "13:30", "14:15", "15:00", "15:45", "16:30", "17:15", "18:00",
];

export type Booking = {
  id: string;
  service_id: string | null;
  service_name: string;
  price: number;
  booking_date: string;
  booking_time: string;
  customer_name: string;
  customer_phone: string;
  created_at: string;
};

export async function fetchActiveServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data || []).map((s) => ({ ...s, price: Number(s.price) }));
}

export async function fetchAllServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data || []).map((s) => ({ ...s, price: Number(s.price) }));
}

export async function fetchTakenSlots(date: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("booking_time")
    .eq("booking_date", date);
  if (error) throw error;
  return (data || []).map((b) => b.booking_time);
}

export async function createBooking(input: {
  service: Service;
  date: string;
  time: string;
  name: string;
  phone: string;
}): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .insert({
      service_id: input.service.id,
      service_name: input.service.name,
      price: input.service.price,
      booking_date: input.date,
      booking_time: input.time,
      customer_name: input.name,
      customer_phone: input.phone,
    })
    .select()
    .single();
  if (error) throw error;
  return { ...data, price: Number(data.price) } as Booking;
}

export async function fetchUpcomingBookings(): Promise<Booking[]> {
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .gte("booking_date", today)
    .order("booking_date", { ascending: true })
    .order("booking_time", { ascending: true });
  if (error) throw error;
  return (data || []).map((b) => ({ ...b, price: Number(b.price) })) as Booking[];
}

export async function fetchAllBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*");
  if (error) throw error;
  return (data || []).map((b) => ({ ...b, price: Number(b.price) })) as Booking[];
}
