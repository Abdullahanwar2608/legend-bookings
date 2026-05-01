import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient-gold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">This page doesn't exist.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-gradient-gold px-5 py-2.5 text-sm font-medium text-gold-foreground"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Legend Barber Shop — Style That Defines You" },
      {
        name: "description",
        content:
          "Premium barber shop offering haircuts, beard trims, shaves and more. Book your appointment online.",
      },
      { property: "og:title", content: "Legend Barber Shop — Style That Defines You" },
      {
        property: "og:description",
        content:
          "Premium barber shop offering haircuts, beard trims, shaves and more. Book your appointment online.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Legend Barber Shop — Style That Defines You" },
      {
        name: "twitter:description",
        content:
          "Premium barber shop offering haircuts, beard trims, shaves and more. Book your appointment online.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/90812db7-2f2b-46ac-a0b9-8073f22af59c/id-preview-2e7f6412--09e6ceac-9aeb-426c-abf1-e77356edf53d.lovable.app-1777582421344.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/90812db7-2f2b-46ac-a0b9-8073f22af59c/id-preview-2e7f6412--09e6ceac-9aeb-426c-abf1-e77356edf53d.lovable.app-1777582421344.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: () => <Outlet />,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}
