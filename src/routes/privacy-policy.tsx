import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useTranslation } from "react-i18next";
import { Shield, Eye, Database, Lock, Mail, MapPin } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy | Legend Barber Espoo" },
      {
        name: "description",
        content:
          "Legend Barber privacy policy. GDPR-compliant data practices for our Espoo barbershop. Everstinkuja 1, 02600 Espoo.",
      },
      { name: "robots", content: "index, follow" },
    ],
  }),
});

function PrivacyPolicyPage() {
  const { i18n } = useTranslation();
  const isFi = i18n.language === "fi";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = isFi
    ? [
        {
          icon: <Database className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "1. Mitä tietoja keräämme",
          body: "Keräämme seuraavia henkilötietoja varausten ja yhteydenottojen yhteydessä: nimi, puhelinnumero, sähköpostiosoite sekä palvelu- ja ajanvaraushistoria. Tietoja kerätään vain asiakaspalvelun toteuttamiseksi.",
        },
        {
          icon: <Eye className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "2. Miten käytämme tietojasi",
          body: "Käytämme tietojasi ainoastaan ajanvarausten hallintaan, asiakaspalveluun ja tiedottamiseen palveluistamme. Emme myy tai luovuta tietojasi kolmansille osapuolille markkinointitarkoituksiin.",
        },
        {
          icon: <Lock className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "3. Tietojen suojaus",
          body: "Tietosi tallennetaan Supabase-pilvipalveluun EU:n alueella. Käytämme SSL-salausta kaiken tietoliikenteen suojaamiseksi. Pääsy tietoihin on rajoitettu vain valtuutetuille henkilöille.",
        },
        {
          icon: <Shield className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "4. Oikeutesi (GDPR)",
          body: "Sinulla on oikeus pyytää pääsy omiin tietoihisi, oikaista virheelliset tiedot, pyytää tietojesi poistamista, vastustaa tietojen käsittelyä sekä siirtää tietosi toiselle palveluntarjoajalle. Ota yhteyttä: legend.service.2810@gmail.com.",
        },
        {
          icon: <Database className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "5. Säilytysaika",
          body: "Säilytämme asiakastietoja enintään 2 vuotta viimeisestä asioinnista, jonka jälkeen tiedot poistetaan automaattisesti järjestelmistämme.",
        },
        {
          icon: <Mail className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "6. Yhteydenotot",
          body: "Tietosuojaan liittyvissä kysymyksissä ota yhteyttä: legend.service.2810@gmail.com tai Everstinkuja 1, 02600 Espoo.",
        },
      ]
    : [
        {
          icon: <Database className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "1. Information We Collect",
          body: "We collect the following personal data when you make a booking or contact us: full name, phone number, email address, and appointment history. Data is collected solely for the purpose of delivering our services.",
        },
        {
          icon: <Eye className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "2. How We Use Your Data",
          body: "Your data is used exclusively for appointment management, customer service, and service-related communications. We do not sell or share your data with third parties for marketing purposes.",
        },
        {
          icon: <Lock className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "3. Data Security",
          body: "Your data is stored on Supabase cloud infrastructure located within the EU. All data in transit is protected by SSL/TLS encryption. Access is restricted to authorised personnel only.",
        },
        {
          icon: <Shield className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "4. Your Rights (GDPR)",
          body: "You have the right to access your data, rectify inaccurate data, request erasure, object to processing, and request data portability. To exercise your rights, contact: legend.service.2810@gmail.com.",
        },
        {
          icon: <Database className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "5. Retention Period",
          body: "We retain customer data for a maximum of 2 years from the last interaction, after which it is automatically deleted from our systems.",
        },
        {
          icon: <Mail className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "6. Contact",
          body: "For any privacy-related enquiries contact us at: legend.service.2810@gmail.com or Everstinkuja 1, 02600 Espoo, Finland.",
        },
      ];

  return (
    <div className="min-h-screen" style={{ background: "#000", color: "#FFE000" }}>
      <SiteHeader />
      <main className="pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full border-2 border-gold mb-6" style={{ borderColor: "#FFE000" }}>
              <Shield className="h-8 w-8" style={{ color: "#FFE000" }} />
            </div>
            <p className="tracking-[0.4em] text-xs mb-3 opacity-60">
              {isFi ? "— TIETOSUOJA —" : "— LEGAL —"}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: "#FFE000" }}>
              {isFi ? "Tietosuojaseloste" : "Privacy Policy"}
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
              ? "Legend Barber (\"me\", \"meidän\") kunnioittaa yksityisyyttäsi ja on sitoutunut suojelemaan henkilötietojasi EU:n yleisen tietosuoja-asetuksen (GDPR) mukaisesti. Tämä seloste kuvaa, miten keräämme, käytämme ja suojaamme tietojasi."
              : "Legend Barber (\"we\", \"us\") respects your privacy and is committed to protecting your personal data in accordance with the EU General Data Protection Regulation (GDPR). This policy describes how we collect, use, and protect your data."}
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

          {/* Contact block */}
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
