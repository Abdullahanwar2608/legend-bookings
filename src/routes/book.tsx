import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import {
  TIME_SLOTS,
  createBooking,
  fetchActiveServices,
  fetchTakenSlots,
  type Service,
} from "@/lib/booking-store";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Check, ChevronLeft, Calendar as CalIcon, Clock, Scissors, User, Loader2 } from "lucide-react";
import { toast } from "sonner";

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function prettyDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
}

const searchSchema = z.object({ service: z.string().optional() });

export const Route = createFileRoute("/book")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Book Appointment — Legend Barber Shop" },
      { name: "description", content: "Book your premium barber appointment in seconds." },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const search = useSearch({ from: "/book" });
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [serviceId, setServiceId] = useState<string>(search.service || "");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [taken, setTaken] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmedId, setConfirmedId] = useState<string | null>(null);

  useEffect(() => {
    fetchActiveServices()
      .then(setServices)
      .catch(() => toast.error("Couldn't load services"))
      .finally(() => setLoadingServices(false));
  }, []);

  useEffect(() => {
    if (!date) { setTaken([]); return; }
    fetchTakenSlots(date).then(setTaken).catch(() => setTaken([]));
  }, [date]);

  const service = services.find((s) => s.id === serviceId);
  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);
  const maxDate = useMemo(() => { const d = new Date(); d.setDate(d.getDate() + 60); d.setHours(0,0,0,0); return d; }, []);
  const selectedDateObj = useMemo(() => {
    if (!date) return undefined;
    const [y, m, d] = date.split("-").map(Number);
    return new Date(y, m - 1, d);
  }, [date]);

  const selectedDateObj = useMemo(() => {
    if (!date) return undefined;
    const [y, m, d] = date.split("-").map(Number);
    return new Date(y, m - 1, d);
  }, [date]);

  const filteredTimeSlots = useMemo(() => {
    const now = new Date();
    const todayStr = formatDate(now);
    
    // If it's a future date, show all slots
    if (date !== todayStr) return TIME_SLOTS;

    // If it's today, filter slots by current time
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();

    return TIME_SLOTS.filter(slot => {
      const [slotHour, slotMin] = slot.split(':').map(Number);
      // Return true if the slot hour is in the future 
      // or if it's the current hour but the minute is in the future
      return slotHour > currentHour || (slotHour === currentHour && slotMin > currentMin);
    });
  }, [date]);

  
  const handleConfirm = async () => {
    const schema = z.object({
      name: z.string().trim().min(2, "Name too short").max(60),
      phone: z.string().trim().min(7, "Invalid phone").max(20).regex(/^[+\d\s()-]+$/, "Invalid phone"),
    });
    const result = schema.safeParse({ name, phone });
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    if (!service || !date || !time) return;
    setSubmitting(true);
    try {
      const booking = await createBooking({
        service, date, time,
        name: result.data.name,
        phone: result.data.phone,
      });
      setConfirmedId(booking.id);
      setStep(4);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "";
      if (msg.toLowerCase().includes("duplicate") || msg.includes("unique")) {
        toast.error("This slot was just booked. Pick another.");
        const fresh = await fetchTakenSlots(date).catch(() => []);
        setTaken(fresh);
        setTime("");
        setStep(2);
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="pt-28 pb-16 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-gold tracking-[0.3em] text-xs mb-3">— BOOKING —</p>
            <h1 className="text-4xl md:text-5xl font-bold">Reserve Your <span className="text-gradient-gold">Seat</span></h1>
          </div>

          <Stepper step={step} />

          <div className="mt-10 bg-card border border-border rounded-2xl p-6 md:p-10 shadow-elegant">
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Scissors className="h-5 w-5 text-gold" /> Choose a service</h2>
                {loadingServices ? (
                  <div className="py-12 text-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin inline mr-2" /> Loading services…</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setServiceId(s.id)}
                        className={`text-left p-4 rounded-xl border-2 transition-all ${serviceId === s.id ? "border-gold bg-gold/5" : "border-border hover:border-gold/40"}`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold">{s.name}</span>
                          <span className="text-gold font-bold">${s.price}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{s.duration}</p>
                      </button>
                    ))}
                  </div>
                )}
                <div className="flex justify-end pt-4">
                  <Button disabled={!serviceId} onClick={() => setStep(2)} className="bg-gradient-gold text-gold-foreground hover:opacity-90">Continue</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h2 className="text-xl font-semibold flex items-center gap-2"><CalIcon className="h-5 w-5 text-gold" /> Pick a date & time</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Select a date</label>
                    <div className="rounded-xl border border-border bg-background/40 p-2 flex justify-center">
                      <Calendar
                        mode="single"
                        selected={selectedDateObj}
                        onSelect={(d) => {
                          if (!d) { setDate(""); setTime(""); return; }
                          setDate(formatDate(d));
                          setTime("");
                        }}
                        disabled={(d) => d < today || d > maxDate}
                        className="pointer-events-auto"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Available times</label>
                    {!date ? (
                      <div className="rounded-xl border border-dashed border-border/60 p-8 text-center text-sm text-muted-foreground">
                        Pick a date to see open slots.
                      </div>
                    ) : (
                      <>
                        <p className="text-xs text-gold mb-3">{prettyDate(date)}</p>
                        <div className="grid grid-cols-3 gap-2">
                          {filteredTimeSlots.map((t) => {
                            const isTaken = taken.includes(t);
                            return (
                              <button
                                key={t}
                                disabled={isTaken}
                                onClick={() => setTime(t)}
                                className={`py-2.5 rounded-lg text-sm font-medium border transition-all ${
                                  isTaken ? "border-border/30 text-muted-foreground/40 line-through cursor-not-allowed" :
                                  time === t ? "border-gold bg-gold text-gold-foreground" : "border-border hover:border-gold/50"
                                }`}
                              >{t}</button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="ghost" onClick={() => setStep(1)}><ChevronLeft className="h-4 w-4 mr-1" /> Back</Button>
                  <Button disabled={!date || !time} onClick={() => setStep(3)} className="bg-gradient-gold text-gold-foreground hover:opacity-90">Continue</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <h2 className="text-xl font-semibold flex items-center gap-2"><User className="h-5 w-5 text-gold" /> Your details</h2>
                <div className="bg-background/50 rounded-xl p-4 text-sm space-y-1 border border-border/50">
                  <p><span className="text-muted-foreground">Service:</span> <span className="font-medium">{service?.name}</span> · <span className="text-gold font-semibold">${service?.price}</span></p>
                  <p><span className="text-muted-foreground">When:</span> <span className="font-medium">{date} at {time}</span></p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Full name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" maxLength={60} />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Phone number</label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 123-4567" maxLength={20} />
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="ghost" onClick={() => setStep(2)} disabled={submitting}><ChevronLeft className="h-4 w-4 mr-1" /> Back</Button>
                  <Button onClick={handleConfirm} disabled={submitting} className="bg-gradient-gold text-gold-foreground hover:opacity-90">
                    {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Booking…</> : "Confirm Booking"}
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && confirmedId && (
              <div className="text-center py-8 animate-in fade-in zoom-in duration-500">
                <div className="mx-auto h-20 w-20 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold mb-6">
                  <Check className="h-10 w-10 text-gold-foreground" strokeWidth={3} />
                </div>
                <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
                <p className="text-muted-foreground mb-6">We've reserved your spot. See you soon.</p>
                <div className="bg-background/50 rounded-xl p-5 max-w-sm mx-auto text-left text-sm space-y-2 border border-border/50 mb-8">
                  <p><span className="text-muted-foreground">Service:</span> <span className="font-medium">{service?.name}</span></p>
                  <p><span className="text-muted-foreground">Date:</span> <span className="font-medium">{date}</span></p>
                  <p><span className="text-muted-foreground">Time:</span> <span className="font-medium">{time}</span></p>
                  <p><span className="text-muted-foreground">Name:</span> <span className="font-medium">{name}</span></p>
                  <p><span className="text-muted-foreground">Confirmation #:</span> <span className="font-mono text-xs text-gold">{confirmedId.slice(0, 8).toUpperCase()}</span></p>
                </div>
                <Link to="/" className="inline-flex items-center justify-center rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-gold">
                  Back to Home
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  const labels = ["Service", "Date & Time", "Details", "Done"];
  return (
    <div className="flex items-center justify-between max-w-lg mx-auto">
      {labels.map((label, i) => {
        const n = i + 1;
        const active = step >= n;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all ${active ? "bg-gradient-gold text-gold-foreground border-transparent" : "border-border text-muted-foreground"}`}>
                {step > n ? <Check className="h-4 w-4" /> : n}
              </div>
              <span className={`text-xs mt-2 hidden sm:block ${active ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
            </div>
            {n < labels.length && <div className={`h-px flex-1 mx-2 ${step > n ? "bg-gold" : "bg-border"}`} />}
          </div>
        );
      })}
    </div>
  );
}
