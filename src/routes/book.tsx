import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import {
  Check,
  ChevronLeft,
  Calendar as CalIcon,
  Clock,
  Scissors,
  User,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import haircutImg from "@/assets/haircut.webp";
import beardTrimImg from "@/assets/beardtrim.webp";
import shaveImg from "@/assets/shave.webp";
import kidsCutImg from "@/assets/kidscut.webp";

const SERVICE_IMAGES: Record<string, string> = {
  "Haircut": haircutImg,
  "Beard Trim": beardTrimImg,
  "Shave": shaveImg,
  "Kids Cut": kidsCutImg,
  "Haircut & Beard": haircutImg,
};

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function prettyDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

const searchSchema = z.object({ service: z.string().optional() });

export const Route = createFileRoute("/book")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Book Appointment | Legend Fade Espoo" },
      {
        name: "description",
        content:
          "Book your haircut, beard trim or shave at Legend Fade Espoo. Quick online booking. Everstinkuja 1, 02600 Espoo. Parturi Espoo.",
      },
      { name: "robots", content: "index, follow" },
      // Open Graph — Facebook & WhatsApp
      { property: "og:title", content: "Book Appointment | Legend Fade Espoo" },
      {
        property: "og:description",
        content:
          "Reserve your slot at Legend Fade in seconds. Haircut from 15€. Everstinkuja 1, 02600 Espoo, Finland.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://legend-bookings.vercel.app/book" },
      { property: "og:site_name", content: "Legend Fade" },
      { property: "og:image", content: "https://legend-bookings.vercel.app/images/hero-bg.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Legend Fade Espoo - Book Appointment" },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Book Appointment | Legend Fade Espoo" },
      {
        name: "twitter:description",
        content: "Reserve your slot at Legend Fade. Haircut from 15€. Espoo, Finland.",
      },
      { name: "twitter:image", content: "https://legend-bookings.vercel.app/images/hero-bg.jpg" },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const { t } = useTranslation();
  const search = useSearch({ from: "/book" });
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [serviceId, setServiceId] = useState<string>("");

  // Sync serviceId with URL search params once services are loaded
  useEffect(() => {
    if (search.service && !serviceId) {
      setServiceId(search.service);
    }
  }, [search.service, serviceId]);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [taken, setTaken] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmedId, setConfirmedId] = useState<string | null>(null);

  // Stability: Scroll to top on every step change to prevent scroll-loops
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  useEffect(() => {
    fetchActiveServices()
      .then(setServices)
      .catch(() => toast.error("Couldn't load services"))
      .finally(() => setLoadingServices(false));
  }, []);

  useEffect(() => {
    if (!date) {
      setTaken([]);
      return;
    }
    // AbortController prevents a slow response for an old date from
    // overwriting the state after the user has already picked a new date.
    let cancelled = false;
    fetchTakenSlots(date)
      .then((slots) => {
        if (!cancelled) setTaken(slots);
      })
      .catch((err) => {
        console.error("[fetchTakenSlots]", err);
        if (!cancelled) setTaken([]);
      });
    return () => {
      cancelled = true;
    };
  }, [date]);

  const service = services.find((s) => s.id === serviceId);
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const maxDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 60);
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // Stable date object — only recomputed when the date string changes.
  // We use a string comparison inside the memo to ensure we don't recreate the Date 
  // if the string hasn't changed.
  const selectedDateObj = useMemo(() => {
    if (!date) return undefined;
    const [y, m, d] = date.split("-").map(Number);
    return new Date(y, m - 1, d);
  }, [date]);

  // useCallback keeps these function references stable across renders.
  // Without this, the Calendar (DayPicker) receives a new function prop on
  // every render, forcing a full internal re-render which can create a
  // render → state-update → re-render loop with certain shadcn/ui versions.
  const handleDateSelect = useCallback((d: Date | undefined) => {
    if (!d) {
      setDate("");
      setTime("");
      return;
    }
    setDate(formatDate(d));
    setTime("");
  }, []);

  const isDateDisabled = useCallback((d: Date) => d < today || d > maxDate, [today, maxDate]);

  const handleConfirm = async () => {
    const schema = z.object({
      name: z.string().trim().min(2, "Name too short").max(60),
      phone: z
        .string()
        .trim()
        .min(7, "Invalid phone")
        .max(20)
        .regex(/^[+\d\s()-]+$/, "Invalid phone"),
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
        service,
        date,
        time,
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
        console.error("[Booking Error]", e);
        toast.error(msg || "Booking failed. Please try again.");
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
            <p className="text-gold tracking-[0.3em] text-xs mb-3">{t('booking.subtitle')}</p>
            <h1 className="text-4xl md:text-5xl font-bold">
              {t('booking.title')} <span className="text-gradient-gold">{t('booking.titleHighlight')}</span>
            </h1>
          </div>

          <Stepper step={step} />

          <div className="mt-10 bg-card border border-border rounded-2xl p-6 md:p-10 shadow-elegant">
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Scissors className="h-5 w-5 text-gold" /> {t('booking.chooseService')}
                </h2>
                {loadingServices ? (
                  <div className="py-12 text-center text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin inline mr-2" /> {t('booking.loadingServices')}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setServiceId(s.id)}
                        className={`text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${serviceId === s.id ? "border-gold bg-gold/5" : "border-border hover:border-gold/40"}`}
                      >
                        {SERVICE_IMAGES[s.name] && (
                          <img
                            src={SERVICE_IMAGES[s.name]}
                            alt={s.name}
                            loading="lazy"
                            decoding="async"
                            width={128}
                            height={128}
                            className="h-16 w-16 rounded-md object-cover flex-shrink-0"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-semibold">{t(`serviceItems.${s.name}.name`, { defaultValue: s.name })}</span>
                            <span className="text-gold font-bold">€{s.price}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{s.duration}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                <div className="flex justify-end pt-4">
                  <Button
                    disabled={!serviceId}
                    onClick={() => setStep(2)}
                    className="bg-gradient-gold text-gold-foreground hover:opacity-90"
                  >
                    {t('booking.continue')}
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <CalIcon className="h-5 w-5 text-gold" /> {t('booking.pickDate')}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      {t('booking.selectDate')}
                    </label>
                    <div className="rounded-xl border border-border bg-background/40 p-2 flex justify-center">
                      <Calendar
                        mode="single"
                        selected={selectedDateObj}
                        onSelect={handleDateSelect}
                        disabled={isDateDisabled}
                        className="pointer-events-auto"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {t('booking.availTimes')}
                    </label>
                    {!date ? (
                      <div className="rounded-xl border border-dashed border-border/60 p-8 text-center text-sm text-muted-foreground">
                        {t('booking.pickDateMsg')}
                      </div>
                    ) : (
                      <>
                        <p className="text-xs text-gold mb-3">{prettyDate(date)}</p>
                        <div className="grid grid-cols-3 gap-2">
                          {TIME_SLOTS.map((t) => {
                            const isTaken = taken.includes(t);
                            return (
                              <button
                                key={t}
                                disabled={isTaken}
                                onClick={() => setTime(t)}
                                className={`py-2.5 rounded-lg text-sm font-medium border transition-all ${
                                  isTaken
                                    ? "border-border/30 text-muted-foreground/40 line-through cursor-not-allowed"
                                    : time === t
                                      ? "border-gold bg-gold text-gold-foreground"
                                      : "border-border hover:border-gold/50"
                                }`}
                              >
                                {t}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="ghost" onClick={() => setStep(1)}>
                    <ChevronLeft className="h-4 w-4 mr-1" /> {t('booking.back')}
                  </Button>
                  <Button
                    disabled={!date || !time}
                    onClick={() => setStep(3)}
                    className="bg-gradient-gold text-gold-foreground hover:opacity-90"
                  >
                    {t('booking.continue')}
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <User className="h-5 w-5 text-gold" /> {t('booking.details')}
                </h2>
                <div className="bg-background/50 rounded-xl p-4 text-sm space-y-1 border border-border/50">
                  <p>
                    <span className="text-muted-foreground">{t('booking.serviceLabel')}</span>{" "}
                    <span className="font-medium">{service ? t(`serviceItems.${service.name}.name`, { defaultValue: service.name }) : ""}</span> ·{" "}
                    <span className="text-gold font-semibold">€{service?.price}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">{t('booking.when')}</span>{" "}
                    <span className="font-medium">
                      {date} at {time}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">{t('booking.fullName')}</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    maxLength={60}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                    {t('booking.phoneLabel')}
                  </label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    maxLength={20}
                  />
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="ghost" onClick={() => setStep(2)} disabled={submitting}>
                    <ChevronLeft className="h-4 w-4 mr-1" /> {t('booking.back')}
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    disabled={submitting}
                    className="bg-gradient-gold text-gold-foreground hover:opacity-90"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> {t('booking.bookingLoading')}
                      </>
                    ) : (
                      t('booking.confirm')
                    )}
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && confirmedId && (
              <div className="text-center py-8 animate-in fade-in zoom-in duration-500">
                <div className="mx-auto h-20 w-20 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold mb-6">
                  <Check className="h-10 w-10 text-gold-foreground" strokeWidth={3} />
                </div>
                <h2 className="text-3xl font-bold mb-2">{t('booking.success')}</h2>
                <p className="text-muted-foreground mb-6">
                  {t('booking.successMsg')}
                </p>
                <div className="bg-background/50 rounded-xl p-5 max-w-sm mx-auto text-left text-sm space-y-2 border border-border/50 mb-8">
                  <p>
                    <span className="text-muted-foreground">{t('booking.serviceLabel')}</span>{" "}
                    <span className="font-medium">{service ? t(`serviceItems.${service.name}.name`, { defaultValue: service.name }) : ""}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">{t('booking.dateLabel')}</span>{" "}
                    <span className="font-medium">{date}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">{t('booking.timeLabel')}</span>{" "}
                    <span className="font-medium">{time}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">{t('booking.nameLabel')}</span>{" "}
                    <span className="font-medium">{name}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">{t('booking.confLabel')}</span>{" "}
                    <span className="font-mono text-xs text-gold">
                      {confirmedId.slice(0, 8).toUpperCase()}
                    </span>
                  </p>
                </div>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-gold"
                >
                  {t('booking.backHome')}
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
  const { t } = useTranslation();
  const labels = [t('booking.step1'), t('booking.step2'), t('booking.step3'), t('booking.step4')];
  return (
    <div className="flex items-center justify-between max-w-lg mx-auto">
      {labels.map((label, i) => {
        const n = i + 1;
        const active = step >= n;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all ${active ? "bg-gradient-gold text-gold-foreground border-transparent" : "border-border text-muted-foreground"}`}
              >
                {step > n ? <Check className="h-4 w-4" /> : n}
              </div>
              <span
                className={`text-xs mt-2 hidden sm:block ${active ? "text-foreground" : "text-muted-foreground"}`}
              >
                {label}
              </span>
            </div>
            {n < labels.length && (
              <div className={`h-px flex-1 mx-2 ${step > n ? "bg-gold" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
