"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Schedule", href: "/schedule" },
  { label: "Game Reviews", href: "/reviews" },
  { label: "Commissions", href: "/commissions" },
  { label: "Gallery", href: "/gallery" },
  { label: "EWC", href: "/ewc" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent",
      )}
    >
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 border border-primary/40 group-hover:glow-purple transition-all duration-300">
              <Ruler className="w-4 h-4 text-primary fill-primary" />
            </div>
            <span className="font-display font-bold text-lg text-foreground tracking-tight">
              Sorrow<span className="text-primary">Akoji</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative group",
                      isActive
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300",
                        isActive ? "w-3/4" : "w-0 group-hover:w-3/4",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://twitch.tv/SorrowAkoji"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:opacity-90 glow-purple transition-all duration-200"
            >
              Watch Live
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
            <ul className="py-4 space-y-1 px-2" role="list">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className={cn(
                        "block px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                        isActive
                          ? "text-foreground bg-muted"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted",
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2">
                <a
                  href="https://twitch.tv/SorrowAkoji"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="block px-4 py-3 text-sm font-semibold text-center rounded-full bg-primary text-primary-foreground"
                >
                  Watch Live
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
