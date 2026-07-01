import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useTranslation } from "react-i18next";
import { Cookie, Settings, BarChart2, Shield, MapPin, AlertCircle } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/cookie-policy")({
  component: CookiePolicyPage,
  head: () => ({
    meta: [
      { title: "Cookie Policy | Legend Fade Espoo" },
      {
        name: "description",
        content:
          "Legend Fade cookie policy. Learn how we use cookies on our Espoo barbershop website. GDPR-compliant. Everstinkuja 1, 02600 Espoo.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Cookie Policy | Legend Fade Espoo" },
      {
        property: "og:description",
        content: "Cookie policy for Legend Fade barbershop Espoo. GDPR compliant.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function CookiePolicyPage() {
  const { i18n } = useTranslation();
  const isFi = i18n.language === "fi";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = isFi
    ? [
        {
          icon: <Cookie className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "1. Mitä evästeet ovat?",
          body: "Evästeet ovat pieniä tekstitiedostoja, jotka tallennetaan laitteellesi verkkosivustolla vieraillessasi. Ne auttavat verkkosivustoa toimimaan oikein ja parantavat käyttökokemusta.",
        },
        {
          icon: <Settings className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "2. Miten käytämme evästeitä?",
          body: "Legend Fade voi käyttää evästeitä: verkkosivuston toiminnan varmistamiseen, käyttäjäasetusten muistamiseen (esim. kielivalinta), sivuston kävijäliikenteen ja suorituskyvyn analysointiin sekä käyttökokemuksen parantamiseen.",
        },
        {
          icon: <AlertCircle className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "3. Käyttämämme evästetyypit",
          body: "",
          subsections: [
            {
              title: "Välttämättömät evästeet",
              body: "Tarvitaan verkkosivuston toimintaan. Nämä evästeet ovat pakollisia eikä niitä voi poistaa käytöstä.",
            },
            {
              title: "Analytiikkaevästeet",
              body: "Auttavat ymmärtämään, miten kävijät käyttävät verkkosivustoa. Tiedot kerätään nimettömästi.",
            },
            {
              title: "Asetusevästeet",
              body: "Muistavat valitsemasi kielen ja muut asetukset parantaakseen käyttökokemustasi.",
            },
          ],
        },
        {
          icon: <BarChart2 className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "4. Kolmannen osapuolen palvelut",
          body: "Voimme käyttää kolmannen osapuolen palveluita, kuten Google Analyticsia, jotka voivat tallentaa evästeitä laitteellesi verkkosivuston käytön analysoimiseksi. Nämä palvelut keräävät tietoja nimettömästi.",
        },
        {
          icon: <Settings className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "5. Evästeiden hallinta",
          body: "Voit hyväksyä, estää tai poistaa evästeet selaimesi asetuksista milloin tahansa. Huomioithan, että joidenkin evästeiden poistaminen voi vaikuttaa verkkosivuston toimintaan.",
        },
        {
          icon: <Shield className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "6. Tietosuoja",
          body: "Evästeiden kautta mahdollisesti kerättäviä henkilötietoja käsitellään tietosuojakäytäntömme ja GDPR-lainsäädännön mukaisesti.",
        },
        {
          icon: <MapPin className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "7. Yhteystiedot",
          body: "Jos sinulla on kysyttävää evästekäytännöstämme, ota yhteyttä: legend.service.2810@gmail.com tai Everstinkuja 1, 02600 Espoo.",
        },
      ]
    : [
        {
          icon: <Cookie className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "1. What Are Cookies?",
          body: "Cookies are small text files stored on your device when you visit a website. They help websites function properly and improve the user experience.",
        },
        {
          icon: <Settings className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "2. How We Use Cookies",
          body: "Legend Fade may use cookies to: ensure website functionality, remember user preferences (e.g. language selection), analyse website traffic and performance, and improve website usability.",
        },
        {
          icon: <AlertCircle className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "3. Types of Cookies We Use",
          body: "",
          subsections: [
            {
              title: "Essential Cookies",
              body: "Required for the website to function properly. These cookies cannot be disabled.",
            },
            {
              title: "Analytics Cookies",
              body: "Help us understand how visitors use our website. Data is collected anonymously.",
            },
            {
              title: "Preference Cookies",
              body: "Remember your selected language and other settings to enhance your experience.",
            },
          ],
        },
        {
          icon: <BarChart2 className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "4. Third-Party Services",
          body: "We may use third-party services such as Google Analytics that place cookies on your device to collect anonymous website usage information. These services collect data anonymously.",
        },
        {
          icon: <Settings className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "5. Managing Cookies",
          body: "You can accept, reject, or delete cookies through your browser settings at any time. Please note that disabling certain cookies may affect website functionality.",
        },
        {
          icon: <Shield className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "6. Data Protection",
          body: "Any personal data collected through cookies is processed in accordance with our Privacy Policy and applicable GDPR regulations.",
        },
        {
          icon: <MapPin className="h-5 w-5 text-gold mt-0.5 shrink-0" />,
          title: "7. Contact",
          body: "For any questions regarding our Cookie Policy, please contact us at: legend.service.2810@gmail.com or Everstinkuja 1, 02600 Espoo, Finland.",
        },
      ];

  return (
    <div className="min-h-screen" style={{ background: "#000", color: "#FFE000" }}>
      <SiteHeader />
      <main className="pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center justify-center h-16 w-16 rounded-full border-2 mb-6"
              style={{ borderColor: "#FFE000" }}
            >
              <Cookie className="h-8 w-8" style={{ color: "#FFE000" }} />
            </div>
            <p className="tracking-[0.4em] text-xs mb-3 opacity-60">
              {isFi ? "— EVÄSTEKÄYTÄNTÖ —" : "— LEGAL —"}
            </p>
            <h1
              className="font-display text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "#FFE000" }}
            >
              {isFi ? "Evästekäytäntö" : "Cookie Policy"}
            </h1>
            <p className="text-sm opacity-50">
              {isFi
                ? "Voimassa 1.1.2025 alkaen · Päivitetty kesäkuu 2025"
                : "Effective from 1 Jan 2025 · Last updated June 2025"}
            </p>
          </div>

          {/* Intro */}
          <div
            className="rounded-2xl border p-6 mb-8 text-sm leading-relaxed opacity-80"
            style={{ borderColor: "rgba(255,224,0,0.2)", background: "#0f0f00" }}
          >
            {isFi
              ? "Tämä evästekäytäntö selittää, miten Legend Fade käyttää evästeitä ja vastaavia teknologioita verkkosivustollaan. Käyttämällä sivustoamme hyväksyt tämän käytännön mukaiset evästeet."
              : "This Cookie Policy explains how Legend Fade uses cookies and similar technologies on our website. By using our website, you consent to the use of cookies as described in this policy."}
          </div>

          {/* Sections */}
          <div className="space-y-4">
            {sections.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border p-6"
                style={{ borderColor: "rgba(255,224,0,0.15)", background: "#0a0a00" }}
              >
                <div className="flex gap-3 mb-3">
                  {s.icon}
                  <h2 className="font-semibold text-base" style={{ color: "#FFE000" }}>
                    {s.title}
                  </h2>
                </div>
                {s.body && (
                  <p className="text-sm leading-relaxed ml-8" style={{ color: "rgba(255,224,0,0.7)" }}>
                    {s.body}
                  </p>
                )}
                {s.subsections && (
                  <div className="ml-8 mt-3 space-y-3">
                    {s.subsections.map((sub, j) => (
                      <div
                        key={j}
                        className="rounded-xl border p-4"
                        style={{ borderColor: "rgba(255,224,0,0.1)", background: "#0f0f00" }}
                      >
                        <p className="text-sm font-semibold mb-1" style={{ color: "#FFE000" }}>
                          {sub.title}
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,224,0,0.65)" }}>
                          {sub.body}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact block */}
          <div
            className="mt-10 rounded-2xl border p-6 flex items-start gap-4"
            style={{ borderColor: "rgba(255,224,0,0.25)", background: "#0f0f00" }}
          >
            <MapPin className="h-5 w-5 mt-0.5 shrink-0" style={{ color: "#FFE000" }} />
            <div className="text-sm" style={{ color: "rgba(255,224,0,0.75)" }}>
              <p className="font-semibold mb-1" style={{ color: "#FFE000" }}>
                Legend Fade
              </p>
              <p>Everstinkuja 1, 02600 Espoo, Finland</p>
              <p>+358 44 9299266</p>
              <p style={{ color: "rgba(255,224,0,0.55)" }}>
                {isFi ? "Y-tunnus" : "Business ID"}: 3416230-7
              </p>
              <a
                href="mailto:legend.service.2810@gmail.com"
                className="hover:opacity-100 opacity-75 underline underline-offset-2"
              >
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
