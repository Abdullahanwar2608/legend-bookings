import { Link } from "@tanstack/react-router";
import { Scissors, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinks = [
    { href: "/#services", label: t("nav.services") },
    { href: "/#reviews", label: "Reviews" }, // I'll use hardcoded or wait, let's see translations. I didn't add Reviews to nav, but wait, 'Contact' is there. Let's add Reviews back if I didn't translate it, or just use English. Let's translate Contact.
    { href: "/#contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || open ? "bg-background/90 backdrop-blur-md border-b border-border/50" : "bg-transparent"}`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
          <Scissors className="h-5 w-5 text-gold" />
          <span className="font-display text-lg font-semibold tracking-wide">LEGEND</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            to="/book"
            className="hidden sm:inline-flex rounded-full bg-gradient-gold px-5 py-2 text-sm font-medium text-gold-foreground shadow-gold hover:opacity-90 transition-opacity"
          >
            {t("nav.bookNow")}
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:text-gold transition-colors"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96 border-t border-border/50" : "max-h-0"}`}
      >
        <nav className="container mx-auto flex flex-col px-6 py-4 gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base text-foreground hover:text-gold transition-colors border-b border-border/30"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/book"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex justify-center rounded-full bg-gradient-gold px-5 py-3 text-sm font-medium text-gold-foreground shadow-gold"
          >
            {t("nav.bookNow")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
