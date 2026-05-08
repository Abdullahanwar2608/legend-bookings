import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const LANGUAGES = [
  { code: "en", flag: "🇬🇧", name: "English", native: "English" },
  { code: "ar", flag: "🇸🇦", name: "Arabic", native: "العربية" },
  { code: "ur", flag: "🇵🇰", name: "Urdu", native: "اردو" },
  { code: "fr", flag: "🇫🇷", name: "French", native: "Français" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang =
    LANGUAGES.find((l) => l.code === i18n.language) ||
    LANGUAGES.find((l) => l.code === i18n.language.split("-")[0]) ||
    LANGUAGES[0];

  // Sync document dir + lang + localStorage whenever language changes
  useEffect(() => {
    document.documentElement.dir = ["ar", "ur"].includes(currentLang.code) ? "rtl" : "ltr";
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
        <span className="text-sm font-medium">
          {currentLang.flag} {currentLang.code.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-52 bg-card border border-border rounded-xl shadow-elegant overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="py-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => selectLanguage(lang.code)}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-background/50 transition-colors ${
                  currentLang.code === lang.code
                    ? "bg-gold/10 text-gold"
                    : "text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl leading-none">{lang.flag}</span>
                  <span className="font-medium">{lang.native}</span>
                </div>
                <span className="text-xs text-muted-foreground">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
