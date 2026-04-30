import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { SERVICES, TIME_SLOTS, saveBooking, isSlotTaken, type Booking } from "@/lib/booking-store";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ChevronLeft, Calendar as CalIcon, Clock, Scissors, User } from "lucide-react";
import { toast } from "sonner";

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
  const [serviceId, setServiceId] = useState<string>(search.service || "");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmedId, setConfirmedId] = useState<string | null>(null);

  const service = SERVICES.find((s) => s.id === serviceId);
  const today = new Date().toISOString().split("T")[0];
  const maxDate = useMemo(() => {
    const d = new Date(); d.setDate(d.getDate() + 60);
    return d.toISOString().split("T")[0];
  }, []);

  const handleConfirm = () => {
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
    if (isSlotTaken(date, time)) {
      toast.error("This slot was just booked. Pick another.");
      setStep(2); setTime("");
      return;
    }
    const booking: Booking = {
      id: crypto.randomUUID(),
      serviceId: service.id,
      serviceName: service.name,
      price: service.price,
      date, time, name: result.data.name, phone: result.data.phone,
      createdAt: new Date().toISOString(),
    };
    saveBooking(booking);
    setConfirmedId(booking.id);
    setStep(4);
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((s) => (
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
                <div className="flex justify-end pt-4">
                  <Button disabled={!serviceId} onClick={() => setStep(2)} className="bg-gradient-gold text-gold-foreground hover:opacity-90">Continue</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h2 className="text-xl font-semibold flex items-center gap-2"><CalIcon className="h-5 w-5 text-gold" /> Pick a date & time</h2>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Date</label>
                  <Input type="date" min={today} max={maxDate} value={date} onChange={(e) => { setDate(e.target.value); setTime(""); }} />
                </div>
                {date && (
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Available times</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {TIME_SLOTS.map((t) => {
                        const taken = isSlotTaken(date, t);
                        return (
                          <button
                            key={t}
                            disabled={taken}
                            onClick={() => setTime(t)}
                            className={`py-2.5 rounded-lg text-sm font-medium border transition-all ${
                              taken ? "border-border/30 text-muted-foreground/40 line-through cursor-not-allowed" :
                              time === t ? "border-gold bg-gold text-gold-foreground" : "border-border hover:border-gold/50"
                            }`}
                          >{t}</button>
                        );
                      })}
                    </div>
                  </div>
                )}
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
                  <Button variant="ghost" onClick={() => setStep(2)}><ChevronLeft className="h-4 w-4 mr-1" /> Back</Button>
                  <Button onClick={handleConfirm} className="bg-gradient-gold text-gold-foreground hover:opacity-90">Confirm Booking</Button>
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
