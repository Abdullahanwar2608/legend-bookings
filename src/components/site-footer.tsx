import { Scissors } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 py-10 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Scissors className="h-4 w-4 text-gold" />
          <span className="font-display tracking-wide">LEGEND BARBER SHOP</span>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Legend Barber Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}
