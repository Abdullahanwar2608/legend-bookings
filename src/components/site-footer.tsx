import { Scissors } from "lucide-react";
import { useTranslation } from "react-i18next";

export function SiteFooter() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border/50 py-10 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Scissors className="h-4 w-4 text-gold" />
          <span className="font-display tracking-wide uppercase">{t('footer.brand')}</span>
        </div>
        <p className="text-xs text-muted-foreground text-center md:text-left">
          {t('footer.about')}
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {t('footer.brand')}. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
