"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { fanartsRaw, FanartItem } from "@/types/fanart";

export function FanartGallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState("All");

  const fanarts = fanartsRaw.sort((a, b) => b.id - a.id); // Newest first
  const allTags = [
    "All",
    ...Array.from(new Set(fanarts.flatMap((f) => f.tags ?? []))),
  ];
  const filtered =
    activeTag === "All"
      ? fanarts
      : fanarts.filter((f) => f.tags?.includes(activeTag));

  const selectedItem = fanarts.find((f) => f.id === selectedId);
  const selectedIndex = filtered.findIndex((f) => f.id === selectedId);

  const openLightbox = (id: number) => setSelectedId(id);
  const closeLightbox = () => setSelectedId(null);
  const prevItem = () => {
    if (selectedIndex > 0) setSelectedId(filtered[selectedIndex - 1].id);
  };
  const nextItem = () => {
    if (selectedIndex < filtered.length - 1)
      setSelectedId(filtered[selectedIndex + 1].id);
  };

  return (
    <section id="fanart" className="relative graph-paper py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-60 rounded-full bg-primary/6 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <ImageIcon className="w-4 h-4 text-accent" />
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">
              Fanart Gallery
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
            Memory of Every Moment
          </h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            This page showcases my gratitude towards every artist who
            contributed to this collection.
          </p>
        </div>

        {/* Submit CTA */}
        <div className="flex justify-center mb-8">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/40 text-primary text-sm font-semibold hover:bg-primary/10 transition-colors"
          >
            <Send className="w-4 h-4" />
            Submit fanart with #Artkoji
          </a>
        </div>

        {/* Tag filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag!)}
              className={cn(
                "px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200",
                activeTag === tag
                  ? "bg-accent text-accent-foreground border-accent"
                  : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground",
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {filtered.map((item) => (
            <div key={item.id} className="break-inside-avoid">
              <button
                onClick={() => openLightbox(item.id)}
                className="group relative w-full overflow-hidden rounded-xl border border-border hover:border-accent/50 transition-all duration-300 block"
                aria-label={`View fanart: ${item.alt}`}
              >
                <div
                  className={cn(
                    "relative w-full",
                    item.size === "tall"
                      ? "aspect-[3/4]"
                      : item.size === "wide"
                        ? "aspect-[4/3]"
                        : "aspect-square",
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-center p-4">
                    <img
                      src={item.artistPfp}
                      alt={`${item.artist}'s profile picture`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p className="font-semibold text-foreground text-sm truncate">
                      {item.artist}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {item.artistHandle}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Fanart lightbox"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          {selectedIndex > 0 && (
            <button
              onClick={prevItem}
              className="absolute left-4 p-3 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Previous artwork"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Next */}
          {selectedIndex < filtered.length - 1 && (
            <button
              onClick={nextItem}
              className="absolute right-4 p-3 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Next artwork"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Image & info */}
          <div className="flex flex-col md:flex-row gap-6 max-w-4xl w-full">
            <div className="relative flex-1 max-h-[80vh] min-h-70 rounded-2xl overflow-hidden">
              <Image
                src={selectedItem.src}
                alt={selectedItem.alt}
                fill
                className="object-contain"
              />
            </div>
            <div className="md:w-64 flex flex-col gap-4">
              <div>
                <h3 className="font-display font-bold text-foreground">
                  {selectedItem.artist}
                </h3>
                <a
                  href={selectedItem.artistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent text-sm hover:underline"
                >
                  {selectedItem.artistHandle}
                </a>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {selectedItem.alt}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selectedItem.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
