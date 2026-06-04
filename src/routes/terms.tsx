import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useTranslation } from "react-i18next";
import { FileText, AlertCircle, CreditCard, Ban, RefreshCw, MapPin } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Service | Legend Barber Espoo" },
      {
        name: "description",
        content:
          "Terms of service for Legend Barber Espoo. Booking, cancellation and payment policies. Everstinkuja 1, 02600 Espoo.",
      },
      { name: "robots", content: "index, follow" },
    ],
  }),
});

function TermsPage() {
  const { i18n } = useTranslation();
  const isFi = i18n.language === "fi";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = isFi
    ? [
        {
          icon: <FileText className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "1. Palvelut",
          body: "Legend Barber tarjoaa parturi- ja kampaamopalveluita Espoossa, osoitteessa Everstinkuja 1, 02600 Espoo. Varaamalla ajan hyväksyt nämä käyttöehdot kokonaisuudessaan.",
        },
        {
          icon: <AlertCircle className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "2. Ajanvaraukset",
          body: "Ajanvaraukset voidaan tehdä verkkosivuston kautta tai puhelimitse. Varaus vahvistetaan, kun se näkyy järjestelmässä. Suosittelemme saapumaan 5 minuuttia ennen varattua aikaa.",
        },
        {
          icon: <RefreshCw className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "3. Peruutukset",
          body: "Peruutukset tulee tehdä vähintään 24 tuntia ennen varattua aikaa. Myöhäisiä peruutuksia tai saapumatta jättämistä voidaan veloittaa 50% palvelun hinnasta. Peruutukset: +358 44 9299266.",
        },
        {
          icon: <CreditCard className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "4. Hinnoittelu ja maksaminen",
          body: "Hinnat ilmoitetaan euroina (€) ja voivat muuttua ilman ennakkoilmoitusta. Maksu suoritetaan paikan päällä palvelun jälkeen. Hyväksymme käteisen ja yleisimmät maksukortit.",
        },
        {
          icon: <Ban className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "5. Vastuunrajoitus",
          body: "Legend Barber ei ole vastuussa mistään epäsuorista vahingoista, jotka johtuvat palvelujemme käytöstä. Korvausvastuu rajoittuu aina enintään kyseisen palvelun hintaan.",
        },
        {
          icon: <FileText className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "6. Muutokset ehtoihin",
          body: "Pidätämme oikeuden muuttaa näitä käyttöehtoja milloin tahansa. Muutokset astuvat voimaan heti julkaisemisen jälkeen. Jatkamalla palvelujemme käyttöä hyväksyt voimassa olevat ehdot.",
        },
      ]
    : [
        {
          icon: <FileText className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "1. Services",
          body: "Legend Barber provides barbershop and grooming services in Espoo at Everstinkuja 1, 02600 Espoo, Finland. By booking an appointment, you agree to these terms in full.",
        },
        {
          icon: <AlertCircle className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "2. Appointments",
          body: "Appointments may be booked via our website or by phone. A booking is confirmed once it appears in our system. We recommend arriving 5 minutes before your scheduled time.",
        },
        {
          icon: <RefreshCw className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "3. Cancellations",
          body: "Cancellations must be made at least 24 hours before the appointment. Late cancellations or no-shows may be charged 50% of the service price. To cancel: +358 44 9299266.",
        },
        {
          icon: <CreditCard className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "4. Pricing & Payment",
          body: "All prices are listed in euros (€) and are subject to change without prior notice. Payment is collected on-site after the service. We accept cash and major debit/credit cards.",
        },
        {
          icon: <Ban className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "5. Limitation of Liability",
          body: "Legend Barber is not liable for any indirect or consequential damages arising from the use of our services. Our liability is always capped at the price of the service rendered.",
        },
        {
          icon: <FileText className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "6. Changes to Terms",
          body: "We reserve the right to modify these terms at any time. Changes take effect immediately upon publication. Continued use of our services constitutes acceptance of the updated terms.",
        },
      ];

  return (
    <div className="min-h-screen" style={{ background: "#000", color: "#FFE000" }}>
      <SiteHeader />
      <main className="pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full border-2 mb-6" style={{ borderColor: "#FFE000" }}>
              <FileText className="h-8 w-8" style={{ color: "#FFE000" }} />
            </div>
            <p className="tracking-[0.4em] text-xs mb-3 opacity-60">
              {isFi ? "— KÄYTTÖEHDOT —" : "— LEGAL —"}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: "#FFE000" }}>
              {isFi ? "Käyttöehdot" : "Terms of Service"}
            </h1>
            <p className="text-sm opacity-50">
              {isFi
                ? "Voimassa 1.1.2025 alkaen · Päivitetty kesäkuu 2025"
                : "Effective from 1 Jan 2025 · Last updated June 2025"}
            </p>
          </div>

          {/* Intro */}
          <div className="rounded-2xl border p-6 mb-8 text-sm leading-relaxed opacity-80" style={{ borderColor: "rgba(255,224,0,0.2)", background: "#0f0f00" }}>
            {isFi
              ? "Nämä käyttöehdot koskevat kaikkia Legend Barberin palveluita ja verkkosivustoa. Palveluitamme käyttämällä sitoudut noudattamaan näitä ehtoja."
              : "These terms of service apply to all Legend Barber services and the website. By using our services, you agree to comply with these terms."}
          </div>

          {/* Sections */}
          <div className="space-y-4">
            {sections.map((s, i) => (
              <div key={i} className="rounded-2xl border p-6" style={{ borderColor: "rgba(255,224,0,0.15)", background: "#0a0a00" }}>
                <div className="flex gap-3 mb-3">
                  {s.icon}
                  <h2 className="font-semibold text-base" style={{ color: "#FFE000" }}>{s.title}</h2>
                </div>
                <p className="text-sm leading-relaxed ml-8" style={{ color: "rgba(255,224,0,0.7)" }}>{s.body}</p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-10 rounded-2xl border p-6 flex items-start gap-4" style={{ borderColor: "rgba(255,224,0,0.25)", background: "#0f0f00" }}>
            <MapPin className="h-5 w-5 mt-0.5 shrink-0" style={{ color: "#FFE000" }} />
            <div className="text-sm" style={{ color: "rgba(255,224,0,0.75)" }}>
              <p className="font-semibold mb-1" style={{ color: "#FFE000" }}>Legend Barber</p>
              <p>Everstinkuja 1, 02600 Espoo, Finland</p>
              <p>+358 44 9299266</p>
              <a href="mailto:legend.service.2810@gmail.com" className="hover:opacity-100 opacity-75 underline underline-offset-2">
                legend.service.2810@gmail.com
              </a>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black"
              style={{ background: "#FFE000" }}
            >
              ← {isFi ? "Takaisin etusivulle" : "Back to Home"}
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
