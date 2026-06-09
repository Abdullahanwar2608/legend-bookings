import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { MustacheIcon } from "./service-icons";

export function SiteFooter() {
  const { t, i18n } = useTranslation();
  const isFi = i18n.language === "fi";

  return (
    <footer className="border-t py-12 px-6" style={{ borderColor: "rgba(255,224,0,0.15)" }}>
      <div className="container mx-auto max-w-6xl">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MustacheIcon className="h-6 w-9" style={{ color: "#FFE000" }} />
              <span className="font-display tracking-wide uppercase font-bold" style={{ color: "#FFE000" }}>
                {t("footer.brand")}
              </span>
            </div>
            <p className="text-xs max-w-xs leading-relaxed" style={{ color: "rgba(255,224,0,0.5)" }}>
              {t("footer.about")}
            </p>
            <p className="text-xs mt-2" style={{ color: "rgba(255,224,0,0.4)" }}>
              Everstinkuja 1, 02600 Espoo · +358 44 9299266
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <p className="text-xs font-semibold tracking-widest mb-3 uppercase" style={{ color: "rgba(255,224,0,0.4)" }}>
                {isFi ? "Sivusto" : "Site"}
              </p>
              <ul className="space-y-2">
                {[
                  { to: "/" as const, label: isFi ? "Etusivu" : "Home" },
                  { to: "/book" as const, label: isFi ? "Varaa aika" : "Book Now" },
                  { to: "/about" as const, label: isFi ? "Meistä" : "About" },
                ].map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-xs transition-opacity hover:opacity-100"
                      style={{ color: "rgba(255,224,0,0.6)" }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest mb-3 uppercase" style={{ color: "rgba(255,224,0,0.4)" }}>
                {isFi ? "Juridinen" : "Legal"}
              </p>
              <ul className="space-y-2">
                {[
                  { to: "/privacy-policy" as const, label: isFi ? "Tietosuoja" : "Privacy Policy" },
                  { to: "/terms" as const, label: isFi ? "Käyttöehdot" : "Terms of Service" },
                ].map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-xs transition-opacity hover:opacity-100"
                      style={{ color: "rgba(255,224,0,0.6)" }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-2" style={{ borderColor: "rgba(255,224,0,0.1)" }}>
          <p className="text-xs" style={{ color: "rgba(255,224,0,0.35)" }}>
            © {new Date().getFullYear()} {t("footer.brand")}. {t("footer.rights")}
          </p>
          <p className="text-xs" style={{ color: "rgba(255,224,0,0.35)" }}>
            {isFi ? "Tehty Espoossa 🇫🇮" : "Made in Espoo 🇫🇮"}
          </p>
        </div>
      </div>
    </footer>
  );
}
