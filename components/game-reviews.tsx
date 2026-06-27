"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clock, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ReviewWithGame {
  id: string;
  title: string;
  score: number | null;
  playtime: number | null;
  cover_image: string | null;
  excerpt: string | null;
  content: string;
  status: string;
  slug: string;
  game: {
    id: string;
    name: string;
    pfp: string | null;
  } | null;
}

function ScoreBadge({ score }: { score: number | null }) {
  if (score === null) return null;

  return (
    <div
      className={cn(
        "px-3 py-1 rounded-lg text-sm font-bold",
        score >= 8
          ? "bg-green-500/15 text-green-400"
          : score >= 6
            ? "bg-yellow-500/15 text-yellow-400"
            : "bg-red-500/15 text-red-400",
      )}
    >
      {score}/10
    </div>
  );
}

export function GameReviews() {
  const [reviews, setReviews] = useState<ReviewWithGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const featured = reviews[0];
  const others = reviews.slice(1) || [];

  return (
    <section id="reviews" className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />
      <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-primary/8 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">
              Game Reviews
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
            My Honest Takes
          </h2>

          <p className="text-muted-foreground mt-2">
            Thoughts, critiques, and recommendations from my gaming adventures.
          </p>
        </div>

        {loading && (
          <div className="text-center py-20 text-muted-foreground">
            Loading reviews...
          </div>
        )}

        {!loading && reviews.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No reviews published yet.
          </div>
        )}

        {/* Featured Review */}
        {featured && (
          <Link
            key={featured.id}
            href={`/reviews/${featured.slug}`}
            className="block mb-10"
          >
            <article className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-all duration-300">
              <div className="grid lg:grid-cols-2">
                <div className="relative h-72 lg:h-full min-h-[320px]">
                  <Image
                    src={featured.cover_image || "/images/placeholder-game.jpg"}
                    alt={featured.game?.name || featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      Latest Review
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-primary text-sm font-medium">
                        {featured.game?.name}
                      </p>

                      <h3 className="font-display text-3xl font-bold mt-1">
                        {featured.title}
                      </h3>
                    </div>

                    <ScoreBadge score={featured.score} />
                  </div>

                  {featured.playtime && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Clock className="w-4 h-4" />
                      {featured.playtime} hours played
                    </div>
                  )}

                  <p className="text-muted-foreground leading-relaxed line-clamp-4">
                    {featured.excerpt}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-primary font-medium">
                    Read Review
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </article>
          </Link>
        )}

        {/* Review Grid */}
        {others.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((review) => (
              <Link key={review.id} href={`/reviews/${review.slug}`}>
                <article className="group h-full rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-all duration-300 flex flex-col">
                  <div className="relative h-52">
                    <Image
                      src={review.cover_image || "/images/placeholder-game.jpg"}
                      alt={review.game?.name || review.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="text-xs text-primary font-medium">
                          {review.game?.name}
                        </p>

                        <h3 className="font-display font-semibold text-foreground line-clamp-2">
                          {review.title}
                        </h3>
                      </div>

                      <ScoreBadge score={review.score} />
                    </div>

                    {review.playtime && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                        <Clock className="w-3 h-3" />
                        {review.playtime} hrs played
                      </div>
                    )}

                    <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                      {review.excerpt}
                    </p>

                    <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium">
                      Read Review
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
