import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Clock, Gamepad2 } from 'lucide-react'
import { getBaseUrl } from '@/app/utils/getBaseUrl'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import { markdownComponents } from '@/components/markdownComponents'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getReview(slug: string) {
  const res = await fetch(
    `${getBaseUrl()}/api/reviews/${slug}`,
    {
      next: {
        revalidate: 5,
      },
    }
  )

  if (!res.ok) {
    return null
  }

  return res.json()
}

function getScoreLabel(score: number | null) {
  if (!score) return 'Unrated'

  if (score >= 9) return 'Masterpiece'
  if (score >= 8) return 'Excellent'
  if (score >= 7) return 'Good'
  if (score >= 6) return 'Decent'

  return 'Need Improvement'
}

export default async function ReviewPage({
  params,
}: PageProps) {
  const { slug } = await params

  const review = await getReview(slug)

  if (!review) {
    notFound()
  }

  const markdown = review
    .content
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')

  console.log(JSON.stringify(markdown))

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[500px] overflow-hidden">
        {review.cover_image && (
          <Image
            src={review.cover_image}
            alt={review.title}
            fill
            priority
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-black/40" />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            {review.game && (
              <div className="flex items-center gap-2 text-primary mb-3">
                <Gamepad2 className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {review.game.name}
                </span>
              </div>
            )}

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold">
              {review.title}
            </h1>

            {review.excerpt && (
              <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
                {review.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-6">
              {review.score !== null && (
                <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2">
                  <span className="text-2xl font-bold text-primary">
                    {review.score}/10
                  </span>

                  <span className="text-sm text-muted-foreground">
                    {getScoreLabel(review.score)}
                  </span>
                </div>
              )}

              {review.playtime && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {review.playtime} hours played
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[280px_1fr] gap-12">
            {/* Sidebar */}
            <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                {/* Game Card */}
                <div className="rounded-2xl border border-border bg-card overflow-hidden">
                    {review.cover_image && (
                    <div className="relative aspect-[3/4]">
                        <Image
                        src={review.cover_image}
                        alt={review.game?.name ?? review.title}
                        fill
                        className="object-cover"
                        />
                    </div>
                    )}

                    <div className="p-4">
                    <h2 className="font-display font-bold text-lg leading-tight">
                        {review.game?.name ?? review.title}
                    </h2>

                    <div className="flex items-center justify-between mt-3 text-sm">
                        {review.score !== null && (
                        <span className="font-semibold text-primary">
                            {review.score}/10
                        </span>
                        )}

                        {review.playtime && (
                        <span className="text-muted-foreground">
                            {review.playtime} hrs
                        </span>
                        )}
                    </div>
                    </div>
                </div>

                {/* Metadata */}
                {review.game?.metadata?.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-4">
                    <h3 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-4">
                      Game Info
                    </h3>

                    <dl className="space-y-3 text-sm">
                      {review.game.metadata.map((meta: any) => (
                        <div
                          key={meta.id}
                          className="flex justify-between gap-4"
                        >
                          <dt className="text-muted-foreground">
                            {meta.type}
                          </dt>

                          <dd className="text-right">
                            {meta.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                    {/* Table of Contents */}
                    {/* <div className="rounded-2xl border border-border bg-card p-4">
                        <h3 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-4">
                        Contents
                        </h3>

                        <nav className="space-y-2 text-sm">
                        {headings.map((heading) => (
                            <a
                            key={heading.id}
                            href={`#${heading.id}`}
                            className="block text-muted-foreground hover:text-primary transition-colors"
                            >
                            {heading.text}
                            </a>
                        ))}
                        </nav>
                    </div> */}
                </div>
            </aside>

            {/* Article */}
            <article className="min-w-0">
                <ReactMarkdown
                components={{
                    h2: ({ children }) => {
                    const text = String(children)
                    const id = text
                        .toLowerCase()
                        .replace(/[^\w\s-]/g, '')
                        .replace(/\s+/g, '-')

                    return (
                        <h2
                        id={id}
                        className="scroll-mt-24 text-3xl font-display font-bold mt-12 mb-6"
                        >
                        {children}
                        </h2>
                    )
                    },

                    p: ({ children }) => (
                    <p className="mb-6 leading-8 text-muted-foreground">
                        {children}
                    </p>
                    ),

                    ul: ({ children }) => (
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        {children}
                    </ul>
                    ),

                    ol: ({ children }) => (
                    <ol className="list-decimal pl-6 mb-6 space-y-2">
                        {children}
                    </ol>
                    ),

                    blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                        {children}
                    </blockquote>
                    ),
                }}
                >
                {markdown}
                </ReactMarkdown>
            </article>
            </div>
        </div>
        </section>
    </main>
  )
}