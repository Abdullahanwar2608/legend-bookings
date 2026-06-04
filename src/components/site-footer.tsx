import { Scissors } from "lucide-react";
import { useTranslation } from "react-i18next";

export function SiteFooter() {
  const { t } = useTranslation();
  return (
    <footer className="border-t py-10 px-6" style={{ borderColor: "rgba(255,224,0,0.15)" }}>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Scissors className="h-4 w-4" style={{ color: "#FFE000" }} />
          <span className="font-display tracking-wide uppercase font-bold" style={{ color: "#FFE000" }}>
            {t("footer.brand")}
          </span>
        </div>
        <p className="text-xs text-center md:text-left" style={{ color: "rgba(255,224,0,0.55)" }}>
          {t("footer.about")}
        </p>
        <p className="text-xs" style={{ color: "rgba(255,224,0,0.55)" }}>
          © {new Date().getFullYear()} {t("footer.brand")}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
