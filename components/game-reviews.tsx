'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, ChevronRight, BookOpen, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { reviews } from '@/types/review'

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'w-3.5 h-3.5',
            i < rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/40',
          )}
        />
      ))}
    </div>
  )
}

export function GameReviews() {
  const [activeTag, setActiveTag] = useState<string>('All')
  const allTags = ['All', ...Array.from(new Set(reviews.flatMap((r) => r.tags)))]
  const featured = reviews.find((r) => r.featured)
  const others = reviews.filter((r) => !r.featured)

  const filtered =
    activeTag === 'All' ? others : others.filter((r) => r.tags.includes(activeTag))

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
            No sponsors, no BS — just a gamer&apos;s real opinion.
          </p>
        </div>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={cn(
                'px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200',
                activeTag === tag
                  ? 'bg-primary text-primary-foreground border-primary glow-purple'
                  : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Featured review */}
        {featured && (
          <div className="mb-8 group cursor-pointer rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <Image
                  src={featured.image}
                  alt={`Cover art for ${featured.game}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/60 hidden md:block" />
                <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold glow-purple">
                  Featured
                </span>
              </div>
              <div className="p-8 flex flex-col justify-center gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <StarRating rating={featured.rating} />
                  <span className="text-muted-foreground text-xs">
                    {featured.genre} · {featured.platform}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground leading-tight">
                  {featured.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featured.readTime}
                    </span>
                    <span>{featured.date}</span>
                  </div>
                  <button className="flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all duration-200">
                    Read More <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Review grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((review) => (
            <article
              key={review.id}
              className="group cursor-pointer rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={review.image}
                  alt={`Cover art for ${review.game}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                {/* Rating overlay */}
                <div className="absolute bottom-3 left-3">
                  <StarRating rating={review.rating} />
                </div>
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {review.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-display font-semibold text-foreground leading-snug line-clamp-2">
                  {review.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-1">
                  {review.excerpt}
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-border text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {review.readTime}
                  </span>
                  <span>{review.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 text-sm transition-colors">
            View All Reviews <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
