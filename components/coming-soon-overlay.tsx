export function ComingSoonOverlay() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-md bg-background/70">
      <div className="text-center">
        <span className="inline-block px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm mb-4">
          Work In Progress
        </span>

        <h2 className="font-display text-5xl font-bold mb-3">Coming Soon</h2>

        <p className="text-muted-foreground max-w-md mx-auto">
          I'm still cooking this page. Please look forward to it!
        </p>
      </div>
    </div>
  );
}
