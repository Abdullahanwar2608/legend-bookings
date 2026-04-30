import { Link } from "@tanstack/react-router";
import { Scissors } from "lucide-react";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50" : "bg-transparent"}`}>
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <Scissors className="h-5 w-5 text-gold" />
          <span className="font-display text-lg font-semibold tracking-wide">LEGEND</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="/#services" className="text-muted-foreground hover:text-gold transition-colors">Services</a>
          <a href="/#reviews" className="text-muted-foreground hover:text-gold transition-colors">Reviews</a>
          <a href="/#contact" className="text-muted-foreground hover:text-gold transition-colors">Contact</a>
        </nav>
        <Link
          to="/book"
          className="rounded-full bg-gradient-gold px-5 py-2 text-sm font-medium text-gold-foreground shadow-gold hover:opacity-90 transition-opacity"
        >
          Book Now
        </Link>
      </div>
    </header>
  );
}
