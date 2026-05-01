import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-barber.jpg";
import { fetchActiveServices, type Service } from "@/lib/booking-store";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Star, MapPin, Phone, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Home,
});

const REVIEWS = [
  {
    name: "Marcus T.",
    rating: 5,
    text: "Best haircut I've had in years. The attention to detail is unmatched. Truly a premium experience.",
  },
  {
    name: "Daniel R.",
    rating: 5,
    text: "The hot towel shave is a ritual. I leave feeling like a new man every single time.",
  },
  {
    name: "Anthony L.",
    rating: 5,
    text: "Atmosphere, skill, and service are all top-tier. Legend lives up to the name.",
  },
];

function Home() {
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
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1280}
          className="h-full w-full object-cover blur-sm scale-110"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <p className="text-gold tracking-[0.4em] text-xs md:text-sm mb-6 font-medium">
          — EST. 2010 —
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          Legend <span className="text-gradient-gold">Barber</span> Shop
        </h1>
        <p className="text-lg md:text-2xl text-muted-foreground mb-10 font-light italic">
          Style That Defines You
        </p>
        <Link
          to="/book"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-8 py-4 text-base font-semibold text-gold-foreground shadow-gold hover:scale-105 transition-transform duration-300"
        >
          Book Appointment
        </Link>
      </div>
    </section>
  );
}

function Services() {
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
          <p className="text-gold tracking-[0.3em] text-xs mb-3">— OUR CRAFT —</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Premium <span className="text-gradient-gold">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every service crafted with precision, care, and the finest tools.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.id}
              className="group relative bg-card border border-border rounded-2xl p-7 hover:border-gold/50 transition-all duration-500 hover:-translate-y-1 shadow-elegant"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold">{s.name}</h3>
                <span className="text-2xl font-display text-gradient-gold font-bold">
                  ${s.price}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{s.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <span className="text-xs text-muted-foreground">{s.duration}</span>
                <Link
                  to="/book"
                  search={{ service: s.id } as never}
                  className="text-xs text-gold hover:underline"
                >
                  Book →
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
  return (
    <section id="reviews" className="py-24 px-6 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-gold tracking-[0.3em] text-xs mb-3">— TESTIMONIALS —</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            What Our <span className="text-gradient-gold">Clients</span> Say
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
              <p className="text-muted-foreground italic mb-6 leading-relaxed">"{r.text}"</p>
              <p className="font-semibold text-sm">{r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Message sent! We'll be in touch soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-gold tracking-[0.3em] text-xs mb-3">— GET IN TOUCH —</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Visit <span className="text-gradient-gold">Us</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4">
              <MapPin className="h-5 w-5 text-gold mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-sm text-muted-foreground">
                  123 King Street, Downtown
                  <br />
                  New York, NY 10001
                </p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4">
              <Phone className="h-5 w-5 text-gold mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4">
              <Clock className="h-5 w-5 text-gold mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Opening Hours</h3>
                <div className="text-sm text-muted-foreground space-y-0.5">
                  <p>Mon – Fri: 9:00 AM – 8:00 PM</p>
                  <p>Saturday: 9:00 AM – 6:00 PM</p>
                  <p>Sunday: 10:00 AM – 4:00 PM</p>
                </div>
              </div>
            </div>
            <div className="relative h-48 rounded-2xl overflow-hidden border border-border bg-card">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-gold mx-auto mb-2" />
                  <p className="text-sm font-medium">Map View</p>
                  <p className="text-xs text-muted-foreground">123 King Street, NY</p>
                </div>
              </div>
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
            </div>
          </div>
          <form
            onSubmit={onSubmit}
            className="bg-card border border-border rounded-2xl p-8 space-y-4 shadow-elegant"
          >
            <h3 className="font-display text-2xl font-semibold mb-2">Send a Message</h3>
            <Input
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
            />
            <Input
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              maxLength={255}
            />
            <Textarea
              placeholder="Your message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={1000}
            />
            <Button
              type="submit"
              className="w-full bg-gradient-gold text-gold-foreground hover:opacity-90"
            >
              <Send className="h-4 w-4 mr-2" /> Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
