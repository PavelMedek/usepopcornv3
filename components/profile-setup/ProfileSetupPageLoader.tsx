export default function ProfileSetupPageLoader() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <div className="h-7 w-40 animate-pulse rounded-lg bg-white/10" />
          <div className="h-10 w-36 animate-pulse rounded-full bg-white/10" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8">
            <div className="space-y-5">
              <div className="h-7 w-52 animate-pulse rounded-full bg-white/10" />
              <div className="h-12 w-64 animate-pulse rounded-2xl bg-white/10" />
              <div className="h-4 w-full animate-pulse rounded bg-white/10" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-white/10" />

              <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-950/40 p-5">
                <div className="h-4 w-40 animate-pulse rounded bg-white/10" />
                <div className="mt-4 flex items-center gap-4">
                  <div className="h-20 w-20 animate-pulse rounded-2xl bg-white/10" />
                  <div className="space-y-2">
                    <div className="h-5 w-36 animate-pulse rounded bg-white/10" />
                    <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8">
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
                <div className="h-12 w-full animate-pulse rounded-2xl bg-white/10" />
              </div>

              <div className="space-y-3">
                <div className="h-4 w-40 animate-pulse rounded bg-white/10" />
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square animate-pulse rounded-2xl bg-white/10"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="h-4 w-52 animate-pulse rounded bg-white/10" />
                  <div className="h-7 w-20 animate-pulse rounded-full bg-white/10" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-[2/3] animate-pulse rounded-3xl bg-white/10"
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <div className="h-12 w-full animate-pulse rounded-2xl bg-white/10 sm:w-36" />
                <div className="h-12 w-full animate-pulse rounded-2xl bg-amber-400/20 sm:w-44" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
