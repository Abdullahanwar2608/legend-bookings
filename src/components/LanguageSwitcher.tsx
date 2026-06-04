import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const LANGUAGES = [
  { code: "fi", flag: "🇫🇮", name: "Finnish", native: "Suomi", label: "FIN" },
  { code: "en", flag: "🇬🇧", name: "English", native: "English", label: "ENG" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang =
    LANGUAGES.find((l) => l.code === i18n.language) ||
    LANGUAGES.find((l) => l.code === i18n.language.split("-")[0]) ||
    LANGUAGES[0];

  // Sync document lang + localStorage whenever language changes
  useEffect(() => {
    document.documentElement.dir = "ltr";
    document.documentElement.lang = currentLang.code;
    localStorage.setItem("app-lang", currentLang.code);
  }, [currentLang.code]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Switch language"
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-border hover:border-gold/50 hover:bg-gold/5 transition-all bg-card shadow-elegant"
      >
        <Globe className="h-4 w-4 text-gold" />
        <span className="text-sm font-bold tracking-wider text-gold">
          {currentLang.label}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-44 bg-card border border-border rounded-xl shadow-elegant overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="py-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => selectLanguage(lang.code)}
                className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 hover:bg-gold/10 transition-colors ${
                  currentLang.code === lang.code
                    ? "bg-gold/15 text-gold font-semibold"
                    : "text-foreground"
                }`}
              >
                <span className="text-xl leading-none">{lang.flag}</span>
                <div className="flex flex-col">
                  <span className="font-semibold">{lang.label}</span>
                  <span className="text-xs opacity-70">{lang.native}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
