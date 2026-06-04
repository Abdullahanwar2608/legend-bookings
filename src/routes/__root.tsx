import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Scissors } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function NotFoundComponent() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ background: "#000000" }}
    >
      <div className="max-w-md text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <Scissors className="h-5 w-5" style={{ color: "#FFE000" }} />
          <span className="font-display text-lg font-bold tracking-wide" style={{ color: "#FFE000" }}>
            LEGEND BARBER
          </span>
        </div>

        {/* 404 */}
        <h1
          className="font-display font-bold mb-4"
          style={{
            fontSize: "clamp(6rem, 20vw, 10rem)",
            lineHeight: 1,
            background: "linear-gradient(135deg, #FFE000, #FFC200)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </h1>

        <h2 className="text-xl font-semibold mb-3" style={{ color: "#FFE000" }}>
          Page not found · Sivua ei löydy
        </h2>
        <p className="text-sm mb-8" style={{ color: "rgba(255,224,0,0.55)" }}>
          The page you're looking for doesn't exist. / Hakemaasi sivua ei ole olemassa.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-black"
            style={{ background: "#FFE000" }}
          >
            ← Go Home · Etusivulle
          </Link>
          <Link
            to="/book"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border"
            style={{ borderColor: "rgba(255,224,0,0.4)", color: "#FFE000" }}
          >
            Book Appointment · Varaa aika
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundComponent,
});

function RootLayout() {
  const { i18n } = useTranslation();

  // Dynamically update <html lang="..."> to match the active language
  // so screen readers and search engines always get the correct signal.
  useEffect(() => {
    document.documentElement.lang = i18n.language ?? "fi";
  }, [i18n.language]);

  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}
