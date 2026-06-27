import Link from "next/link";
import { Ruler } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { socialLinks } from "@/types/socials";

const navGroups = [
  {
    title: "Explore",
    links: [
      { label: "Schedule", href: "/schedule" },
      { label: "Game Reviews", href: "/reviews" },
      { label: "Commissions", href: "/commissions" },
      { label: "Fanart Gallery", href: "/fanart" },
    ],
  },
  {
    title: "Channels",
    links: [
      { label: "Twitch Stream", href: "https://twitch.tv/SorrowAkoji" },
      { label: "YouTube Clips", href: "https://youtube.com/@SorrowAkoji" },
      { label: "Twitter Updates", href: "https://twitter.com/SorrowAkoji" },
    ],
  },
  {
    title: "Info",
    links: [
      { label: "Commission Terms", href: "/commissions#terms" },
      { label: "Contact / Collabs", href: "mailto:sorrowakoji@gmail.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/40">
      {/* Star divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center">
        <Ruler className="w-4 h-4 text-primary fill-primary" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 border border-primary/40">
                <Ruler className="w-4 h-4 text-primary fill-primary" />
              </div>
              <span className="font-display font-bold text-foreground">
                Sorrow<span className="text-primary">Akoji</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              Your good old VTuber teacher-persona.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200"
                >
                  <FontAwesomeIcon icon={Icon} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-display font-semibold text-foreground text-sm mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Sorrow Akoji. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
