"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import { socialLinks } from "@/types/socials";

const stats = [
  { value: "247K", label: "Followers" },
  { value: "1.2K", label: "Hours Streamed" },
  { value: "89", label: "Games Reviewed" },
];

export function Hero() {
  return (
    <section className="relative graph-paper min-h-screen flex items-center overflow-hidden pt-16">
      {/* Starfield background */}
      <div className="absolute inset-0 star-pattern opacity-40" />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)] py-20">
          {/* Text content */}
          <div className="order-2 lg:order-1 flex flex-col gap-6">
            {/* Live badge */}
            {/* <div className="flex items-center gap-2 w-fit">
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-semibold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                Live Now on Twitch
              </span>
            </div> */}

            {/* Main heading */}
            <div>
              <p className="text-muted-foreground font-medium mb-2 tracking-widest uppercase text-sm">
                Hello class, I&apos;m
              </p>
              <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight">
                <span className="text-foreground">Sorrow</span>
                <span className="text-accent text-5xl text-glow-orange">
                  {" "}
                  📏
                </span>
                <br />
                <span className="text-primary text-glow-purple">Akoji</span>
                <span className="text-accent text-5xl text-glow-orange">
                  {" "}
                  🐦‍⬛
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              Entertaining, Educating, Enjoying — Your good old VTuber
              teacher-persona, streaming games, esports, and connecting with the
              community.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://twitch.tv/SorrowAkoji"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm glow-purple hover:opacity-90 transition-all duration-200"
              >
                <FontAwesomeIcon icon={faTwitch} />
                Watch Live
              </a>
            </div>

            {/* Stats
            <div className="flex gap-8 pt-4 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display font-bold text-2xl text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div> */}

            {/* Social links */}
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground text-sm">Find me on:</span>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`text-muted-foreground ${color} transition-colors duration-200`}
                  >
                    <FontAwesomeIcon icon={icon} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Avatar image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[540px]">
              {/* Glow ring behind avatar */}
              <div className="absolute inset-8 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute inset-12 rounded-full bg-accent/15 blur-2xl" />
              <Image
                src="/images/vtuber-avatar.png"
                alt="Sorrow Akoji VTuber avatar"
                fill
                priority
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-12 bg-border" />
        <span className="text-muted-foreground text-xs tracking-widest uppercase">
          Find More About Me
        </span>
      </div>
    </section>
  );
}
