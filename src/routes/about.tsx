import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useTranslation } from "react-i18next";
import { Scissors, Award, Clock, MapPin, Star, Heart } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Us | Legend Fade Espoo" },
      {
        name: "description",
        content:
          "Legend Fade — premium barber shop in Espoo. Expert cuts, beard trims & shaves. Everstinkuja 1, 02600 Espoo. Parturi Espoo.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "About | Legend Fade Espoo" },
      {
        property: "og:description",
        content: "Premium barbershop in Espoo. Expert grooming since 2010. Everstinkuja 1, 02600 Espoo.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

const STATS = [
  { value: "15+", labelFi: "Vuotta kokemusta", labelEn: "Years of experience" },
  { value: "5000+", labelFi: "Tyytyväistä asiakasta", labelEn: "Happy clients" },
  { value: "4", labelFi: "Palvelua", labelEn: "Services" },
  { value: "5★", labelFi: "Arvosana", labelEn: "Rating" },
];

const VALUES = [
  {
    icon: <Award className="h-6 w-6" style={{ color: "#FFE000" }} />,
    titleFi: "Laatu ennen kaikkea",
    titleEn: "Quality First",
    bodyFi: "Käytämme vain parhaita välineitä ja tuotteita varmistaaksemme ensiluokkaisen lopputuloksen joka kerta.",
    bodyEn: "We use only the best tools and products to ensure a premium result every single time.",
  },
  {
    icon: <Heart className="h-6 w-6" style={{ color: "#FFE000" }} />,
    titleFi: "Asiakaslähtöisyys",
    titleEn: "Client-Focused",
    bodyFi: "Jokainen asiakas saa henkilökohtaista palvelua. Kuuntelemme toiveesi ja toteutamme ne tarkasti.",
    bodyEn: "Every client receives personalised service. We listen to your wishes and execute them with precision.",
  },
  {
    icon: <Scissors className="h-6 w-6" style={{ color: "#FFE000" }} />,
    titleFi: "Ammattitaito",
    titleEn: "Craftsmanship",
    bodyFi: "Partureillamme on vuosien kokemus ja koulutus. Jokainen leikkaus on taideteos.",
    bodyEn: "Our barbers are trained and experienced. Every cut is a work of art.",
  },
];

function AboutPage() {
  const { i18n } = useTranslation();
  const isFi = i18n.language === "fi";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#000", color: "#FFE000" }}>
      <SiteHeader />
      <main className="pt-24 pb-20">

        {/* Hero */}
        <section className="relative py-20 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(255,224,0,0.07) 0%, transparent 70%)"
          }} />
          <div className="relative container mx-auto max-w-3xl">
            <p className="tracking-[0.4em] text-xs mb-4 opacity-60">
              {isFi ? "— MEISTÄ —" : "— ABOUT US —"}
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ color: "#FFE000" }}>
              Legend Fade
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,224,0,0.75)" }}>
              {isFi
                ? "Espoon sydämessä toimiva Legend Fade on enemmän kuin parturi — se on kokemus. Perustettu intohimosta hiustenleikkaukseen ja miesten hyvinvointiin."
                : "Based in the heart of Espoo, Legend Fade is more than a barbershop — it's an experience. Founded on a passion for precision cutting and men's grooming."}
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((s, i) => (
                <div key={i} className="rounded-2xl border p-6 text-center" style={{ borderColor: "rgba(255,224,0,0.2)", background: "#0a0a00" }}>
                  <p className="font-display text-4xl font-bold mb-2" style={{ color: "#FFE000" }}>{s.value}</p>
                  <p className="text-xs opacity-60">{isFi ? s.labelFi : s.labelEn}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-3xl">
            <div className="rounded-2xl border p-8 md:p-10" style={{ borderColor: "rgba(255,224,0,0.2)", background: "#0a0a00" }}>
              <div className="flex items-center gap-3 mb-6">
                <Scissors className="h-6 w-6" style={{ color: "#FFE000" }} />
                <h2 className="font-display text-2xl font-bold" style={{ color: "#FFE000" }}>
                  {isFi ? "Tarinamme" : "Our Story"}
                </h2>
              </div>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: "rgba(255,224,0,0.75)" }}>
                {isFi ? (
                  <>
                    <p>Legend Fade syntyi yhdestä yksinkertaisesta ajatuksesta: jokainen mies ansaitsee ensiluokkaisen parturikokemuksen. Espoo ansaitsee parturin, joka ymmärtää modernin miehen tarpeet.</p>
                    <p>Vuodesta 2010 alkaen olemme palvelleet espoolaisia — paikallisia asukkaita, perheitä ja ammattilaisia — tarjoten leikkauksia, partapalveluita ja täydellisiä viimeistelyitä.</p>
                    <p>Sijaitsemme Everstinkujalla, jossa sinua odottaa aina lämmin vastaanotto, tarkka työ ja hyvä fiilis.</p>
                  </>
                ) : (
                  <>
                    <p>Legend Fade was born from one simple idea: every man deserves a first-class barbershop experience. And Espoo deserves a barber who truly understands the modern man.</p>
                    <p>Since 2010, we have been serving the people of Espoo — locals, families, and professionals — delivering cuts, beard services, and immaculate finishes.</p>
                    <p>Located on Everstinkuja, you'll always find a warm welcome, sharp work, and good energy waiting for you.</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-display text-3xl font-bold text-center mb-10" style={{ color: "#FFE000" }}>
              {isFi ? "Arvomme" : "Our Values"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {VALUES.map((v, i) => (
                <div key={i} className="rounded-2xl border p-7 text-center" style={{ borderColor: "rgba(255,224,0,0.18)", background: "#0a0a00" }}>
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-full border mb-5" style={{ borderColor: "rgba(255,224,0,0.3)" }}>
                    {v.icon}
                  </div>
                  <h3 className="font-semibold text-base mb-3" style={{ color: "#FFE000" }}>
                    {isFi ? v.titleFi : v.titleEn}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,224,0,0.65)" }}>
                    {isFi ? v.bodyFi : v.bodyEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews teaser */}
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-3xl text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" style={{ color: "#FFE000" }} />)}
            </div>
            <p className="text-lg italic mb-2" style={{ color: "rgba(255,224,0,0.8)" }}>
              {isFi
                ? "\"Paras hiustenleikkaus vuosiin. Huomio yksityiskohtiin on vertaansa vailla. Aidosti ensiluokkainen kokemus.\""
                : "\"Best haircut I've had in years. The attention to detail is unmatched. Truly a premium experience.\""}
            </p>
            <p className="text-sm opacity-50">— Marcus T.</p>
          </div>
        </section>

        {/* Location + CTA */}
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-xl text-center">
            <div className="rounded-2xl border p-8 mb-8" style={{ borderColor: "rgba(255,224,0,0.25)", background: "#0a0a00" }}>
              <MapPin className="h-8 w-8 mx-auto mb-4" style={{ color: "#FFE000" }} />
              <p className="font-semibold mb-1" style={{ color: "#FFE000" }}>Everstinkuja 1, 02600 Espoo</p>
              <div className="text-sm mt-3 space-y-0.5" style={{ color: "rgba(255,224,0,0.6)" }}>
                <p>{isFi ? "Ma – Pe: 10:00 – 20:00" : "Mon – Fri: 10:00 – 20:00"}</p>
                <p>{isFi ? "La: 10:00 – 18:00" : "Sat: 10:00 – 18:00"}</p>
                <p>{isFi ? "Su: 12:00 – 18:00" : "Sun: 12:00 – 18:00"}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-black"
                style={{ background: "#FFE000" }}
              >
                <Clock className="h-4 w-4" />
                {isFi ? "Varaa aika" : "Book Appointment"}
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold border"
                style={{ borderColor: "rgba(255,224,0,0.4)", color: "#FFE000" }}
              >
                ← {isFi ? "Etusivu" : "Home"}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
