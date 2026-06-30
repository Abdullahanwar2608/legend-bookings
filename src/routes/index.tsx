import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/background.webp";
import { fetchActiveServices, type Service } from "@/lib/booking-store";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Star, MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
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

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Everstinkuja+1%2C+02600%2C+Espoo";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Legend Fade | Premium Parturi Espoo" },
      {
        name: "description",
        content:
          "Legend Fade – parturi Espoossa. Hiustenleikkaus 15€, partapalvelut, lasten leikkaukset. Everstinkuja 1, 02600 Espoo. Barber Shop Espoo.",
      },
      { name: "keywords", content: "parturi espoo, barber shop espoo, haircut everstinkuja, mens haircut espoo, legend fade" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Legend Fade | Premium Parturi Espoo" },
      {
        property: "og:description",
        content: "Parturi Espoossa – hiustenleikkaus alkaen 15€. Everstinkuja 1, 02600 Espoo. Baraa aika nyt! Barber Espoo.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.legendfade.com" },
      { property: "og:site_name", content: "Legend Fade" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Legend Fade | Premium Parturi Espoo" },
      { name: "twitter:description", content: "Parturi Espoossa. Hiustenleikkaus, parta, lasten leikkaukset. Everstinkuja 1, Espoo." },
    ],
  }),
});

const REVIEWS = [
  {
    name: "Marcus T.",
    rating: 5,
    textEn: "Best haircut I've had in years. The attention to detail is unmatched. Truly a premium experience.",
    textFi: "Paras hiustenleikkaus vuosiin. Huomio yksityiskohtiin on vertaansa vailla. Aidosti ensiluokkainen kokemus.",
  },
  {
    name: "Daniel R.",
    rating: 5,
    textEn: "The hot towel shave is a ritual. I leave feeling like a new man every single time.",
    textFi: "Lämpimällä pyyhkellä tehtävä parranajo on kuin rituaali. Lähden joka kerta kuin uutena miehenä.",
  },
  {
    name: "Anthony L.",
    rating: 5,
    textEn: "Atmosphere, skill, and service are all top-tier. Legend lives up to the name.",
    textFi: "Tunnelma, ammattitaito ja palvelu ovat huipputasoa. Legend Fade todella ansaitsee nimensä.",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HairSalon"],
  name: "Legend Fade",
  url: "https://www.legendfade.com",
  telephone: "+358449299266",
  email: "legend.service.2810@gmail.com",
  priceRange: "€€",
  description: "Premium barbershop in Espoo, Finland. Haircuts, beard trims, shaves and kids cuts.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Everstinkuja 1",
    postalCode: "02600",
    addressLocality: "Espoo",
    addressCountry: "FI",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 60.2042,
    longitude: 24.656,
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "10:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "10:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "12:00", closes: "18:00" },
  ],
  hasMap: "https://www.google.com/maps/search/?api=1&query=Everstinkuja+1%2C+02600%2C+Espoo",
  sameAs: [],
};

function Home() {
  useEffect(() => {
    // Inject JSON-LD schema into <head>
    const existing = document.getElementById("jsonld-localbusiness");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "jsonld-localbusiness";
    script.type = "application/ld+json";
    script.text = JSON.stringify(JSON_LD);
    document.head.appendChild(script);
    return () => {
      document.getElementById("jsonld-localbusiness")?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Hero />
      <Services />
      <Reviews />
      <Contact />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1280}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover blur-sm scale-110"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <p className="tracking-[0.4em] text-xs md:text-sm mb-6 font-medium" style={{ color: "#FFE000" }}>
          {t("hero.est")}
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight" style={{ color: "#FFE000" }}>
          {t("hero.title")}
        </h1>
        <p className="text-lg md:text-2xl mb-10 font-light italic" style={{ color: "#FFE000" }}>
          {t("hero.style")}
        </p>
        <Link
          to="/book"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-8 py-4 text-base font-semibold text-black shadow-gold hover:scale-105 transition-transform duration-300"
        >
          {t("hero.bookAppt")}
        </Link>
      </div>
    </section>
  );
}

function Services() {
  const { t } = useTranslation();
  const [services, setServices] = useState<Service[]>([]);
  useEffect(() => {
    fetchActiveServices()
      .then(setServices)
      .catch(() => {});
  }, []);
  return (
    <section id="services" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-gold tracking-[0.3em] text-xs mb-3">{t("services.subtitle")}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("services.title")} <span className="text-gradient-gold">{t("services.titleHighlight")}</span>
          </h2>
          <p className="text-gold max-w-xl mx-auto">
            {t("services.desc")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.id}
              className="group relative bg-card border border-border rounded-2xl p-7 hover:border-gold/50 transition-all duration-500 hover:-translate-y-1 shadow-elegant flex flex-col"
            >
              {SERVICE_IMAGES[s.name] && (
                <div className="mb-4 -mx-7 -mt-7 overflow-hidden rounded-t-2xl bg-card">
                  <img
                    src={SERVICE_IMAGES[s.name]}
                    alt={s.name}
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gold">{t(`serviceItems.${s.name}.name`, { defaultValue: s.name })}</h3>
                <span className="text-2xl font-display text-gradient-gold font-bold">
                  €{s.price}
                </span>
              </div>
              <p className="text-sm text-gold mb-4 leading-relaxed">{t(`serviceItems.${s.name}.desc`, { defaultValue: s.description })}</p>
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <span className="text-xs text-gold">{s.duration}</span>
                <Link
                  to="/book"
                  search={{ service: s.id } as never}
                  className="text-xs text-gold hover:underline"
                >
                  {t("services.book")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const { t, i18n } = useTranslation();
  const isFi = i18n.language === "fi";
  return (
    <section id="reviews" className="py-24 px-6 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-gold tracking-[0.3em] text-xs mb-3">{t("reviews.subtitle")}</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            {t("reviews.title")} <span className="text-gradient-gold">{t("reviews.titleHighlight")}</span> {t("reviews.titleEnd")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-7 shadow-elegant">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-gold italic mb-6 leading-relaxed">"{isFi ? r.textFi : r.textEn}"</p>
              <p className="font-semibold text-sm text-gold">{r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [consent, setConsent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error(t("contact.namePlaceholder") ? "Please fill in all fields." : "Please fill in all fields.");
      return;
    }
    if (!consent) {
      toast.error(t("contact.consentRequired"));
      return;
    }
    // mailto: — opens the user's email client with the message pre-filled
    const subject = encodeURIComponent(`Website message from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    
    // Create an anchor element to trigger the mailto (more reliable than window.location)
    const link = document.createElement("a");
    link.href = `mailto:legend.service.2810@gmail.com?subject=${subject}&body=${body}`;
    link.click();
    
    toast.success(t("contact.sendBtn") + " - Opening email client…");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-gold tracking-[0.3em] text-xs mb-3">{t("contact.subtitle")}</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            {t("contact.title")} <span className="text-gradient-gold">{t("contact.titleHighlight")}</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Address — links to Google Maps */}
            <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4 hover:border-gold/40 transition-colors">
              <MapPin className="h-5 w-5 text-gold mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1 text-gold">{t("contact.address")}</h3>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gold hover:text-gold underline underline-offset-2 transition-colors"
                >
                  Everstinkuja 1, 02600, Espoo
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4">
              <Phone className="h-5 w-5 text-gold mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1 text-gold">{t("contact.phone")}</h3>
                <a
                  href="tel:+358449299266"
                  className="text-sm text-gold hover:text-gold transition-colors"
                >
                  +358 44 9299266
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4">
              <Mail className="h-5 w-5 text-gold mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1 text-gold">{t("contact.email")}</h3>
                <a
                  href="mailto:legend.service.2810@gmail.com"
                  className="text-sm text-gold hover:text-gold transition-colors"
                >
                  legend.service.2810@gmail.com
                </a>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4">
              <Clock className="h-5 w-5 text-gold mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1 text-gold">{t("contact.hours")}</h3>
                <div className="text-sm text-gold space-y-0.5">
                  <p>{t("contact.hours_mf")}</p>
                  <p>{t("contact.hours_sat")}</p>
                  <p>{t("contact.hours_sun")}</p>
                </div>
              </div>
            </div>

            {/* Map placeholder → Google Maps link */}
            <div className="relative h-48 rounded-2xl overflow-hidden border border-border bg-card hover:border-gold/40 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-gold mx-auto mb-2" />
                  <p className="text-sm font-medium text-gold">{t("contact.mapView")}</p>
                  <p className="text-xs text-gold mt-1">Everstinkuja 1, Espoo</p>
                </div>
              </a>
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
            </div>
          </div>

          {/* Contact Form — mailto: */}
          <form
            onSubmit={onSubmit}
            className="bg-card border border-border rounded-2xl p-8 space-y-4 shadow-elegant"
          >
            <h3 className="font-display text-2xl font-semibold mb-2 text-gold">{t("contact.sendMessage")}</h3>
            <Input
              placeholder={t("contact.namePlaceholder")}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
            />
            <Input
              type="email"
              placeholder={t("contact.emailPlaceholder")}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              maxLength={255}
            />
            <Textarea
              placeholder={t("contact.messagePlaceholder")}
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={1000}
            />
            {/* GDPR Consent Checkbox — text from drive document */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                id="contact-consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-yellow-400"
              />
              <span className="text-xs leading-relaxed" style={{ color: "#FFE000" }}>
                {t("contact.consentShort")}{" "}
                <Link to="/privacy-policy" className="underline underline-offset-2 hover:opacity-100" style={{ color: "#FFE000" }}>
                  {t("contact.consentPrivacy")}
                </Link>
                .
              </span>
            </label>
            <Button
              type="submit"
              className="w-full bg-gradient-gold text-black font-semibold hover:opacity-90"
            >
              <Send className="h-4 w-4 mr-2" /> {t("contact.sendBtn")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
