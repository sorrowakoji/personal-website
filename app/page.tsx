import Link from "next/link";
import {
  Calendar,
  BookOpen,
  Sparkles,
  ImageIcon,
  ArrowRight,
} from "lucide-react";
import { Hero } from "@/components/hero";

const sections = [
  {
    href: "/schedule",
    icon: Calendar,
    label: "Schedule",
    description: "See when I'm live next.",
    accent: "text-accent",
    accentBg: "bg-accent/10 border-accent/20",
    hoverBorder: "hover:border-accent/50",
  },
  {
    href: "/reviews",
    icon: BookOpen,
    label: "Game Reviews",
    description: "My honest takes on the games I play on stream.",
    accent: "text-primary",
    accentBg: "bg-primary/10 border-primary/20",
    hoverBorder: "hover:border-primary/50",
  },
  {
    href: "/commissions",
    icon: Sparkles,
    label: "Commissions",
    description: "Commission custom content or services.",
    accent: "text-amber-400",
    accentBg: "bg-amber-400/10 border-amber-400/20",
    hoverBorder: "hover:border-amber-400/50",
  },
  {
    href: "/fanart",
    icon: ImageIcon,
    label: "Fanart Gallery",
    description: "A gallery of incredible art made by the community.",
    accent: "text-green-400",
    accentBg: "bg-green-400/10 border-green-400/20",
    hoverBorder: "hover:border-green-400/50",
  },
];

export default function HomePage() {
  return (
    <main>
      <Hero />

      {/* Feature cards section */}
      <section
        className="relative py-24 overflow-hidden"
        aria-labelledby="explore-heading"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-border" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-60 rounded-full bg-primary/6 blur-[100px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="explore-heading"
              className="font-display font-bold text-3xl sm:text-4xl text-foreground"
            >
              Explore the Site
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto">
              Everything in one place — stream schedule, reviews, commissions,
              and fan love.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sections.map(
              ({
                href,
                icon: Icon,
                label,
                description,
                accent,
                accentBg,
                hoverBorder,
              }) => (
                <Link
                  key={href}
                  href={href}
                  className={`group flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card ${hoverBorder} hover:bg-card/80 transition-all duration-300`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center ${accentBg}`}
                  >
                    <Icon className={`w-5 h-5 ${accent}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-foreground mb-1.5">
                      {label}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {description}
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-semibold ${accent} group-hover:gap-2 transition-all duration-200`}
                  >
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
