import { useEffect, useState, useRef } from "react";
import { Globe } from "lucide-react";

const LANGUAGES = [
  { code: "en", flag: "🇬🇧", name: "English", native: "English", dir: "ltr" },
  { code: "ar", flag: "🇸🇦", name: "Arabic", native: "العربية", dir: "rtl" },
  { code: "ur", flag: "🇵🇰", name: "Urdu", native: "اردو", dir: "rtl" },
  { code: "fr", flag: "🇫🇷", name: "French", native: "Français", dir: "ltr" },
];

const SUPPORTED = ["en", "ar", "ur", "fr"];

function getCurrentLang() {
  const saved = localStorage.getItem("app-lang");
  return LANGUAGES.find((l) => l.code === saved) || LANGUAGES[0];
}

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(getCurrentLang);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

  const selectLanguage = (lang: typeof LANGUAGES[0]) => {
    if (lang.code === currentLang.code) {
      setIsOpen(false);
      return;
    }
    // Save and reload — guarantees i18n initializes fresh with the new language
    localStorage.setItem("app-lang", lang.code);
    window.location.reload();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-border hover:border-gold/50 hover:bg-gold/5 transition-all bg-card shadow-elegant"
        aria-label="Switch language"
      >
        <Globe className="h-4 w-4 text-gold" />
        <span className="text-sm font-medium">{currentLang.flag} {currentLang.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-52 bg-card border border-border rounded-xl shadow-elegant overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => selectLanguage(lang)}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-background/50 transition-colors ${
                  currentLang.code === lang.code ? "bg-gold/10 text-gold" : "text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{lang.flag}</span>
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
