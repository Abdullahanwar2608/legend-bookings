export type Service = {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
};

export const SERVICES: Service[] = [
  { id: "classic-cut", name: "Classic Haircut", price: 30, duration: "45 min", description: "Precision scissor cut, wash, and style tailored to your face shape." },
  { id: "beard-trim", name: "Beard Trim & Shape", price: 20, duration: "30 min", description: "Sculpted beard line-up with hot towel and beard oil finish." },
  { id: "hot-shave", name: "Hot Towel Shave", price: 35, duration: "40 min", description: "Traditional straight razor shave with hot towel and aftercare." },
  { id: "cut-beard", name: "Cut + Beard Combo", price: 45, duration: "60 min", description: "Full haircut paired with beard grooming for a complete refresh." },
  { id: "kids-cut", name: "Kids Haircut", price: 22, duration: "30 min", description: "Patient, friendly cuts for ages 12 and under." },
  { id: "vip", name: "Legend VIP Experience", price: 80, duration: "90 min", description: "Cut, beard, hot shave, scalp massage, and complimentary drink." },
];

export const TIME_SLOTS = [
  "09:00", "09:45", "10:30", "11:15", "12:00",
  "13:30", "14:15", "15:00", "15:45", "16:30", "17:15", "18:00",
];

export type Booking = {
  id: string;
  serviceId: string;
  serviceName: string;
  price: number;
  date: string; // YYYY-MM-DD
  time: string;
  name: string;
  phone: string;
  createdAt: string;
};

const KEY = "legend_bookings_v1";

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveBooking(b: Booking) {
  const all = getBookings();
  all.push(b);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function isSlotTaken(date: string, time: string): boolean {
  return getBookings().some((b) => b.date === date && b.time === time);
}
