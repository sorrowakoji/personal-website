export const markdownComponents = {
  p: ({ children }: any) => (
      <p className="mb-6 leading-8 text-muted-foreground">
        {children}
      </p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-display font-bold mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-display font-bold mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-display font-semibold mt-8 mb-3">
        {children}
      </h3>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-6 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2">
        {children}
      </ol>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6">
        {children}
      </blockquote>
    ),
}