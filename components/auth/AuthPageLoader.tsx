type AuthPageLoaderProps = {
  variant: "login" | "signup";
};

type PosterSkeletonProps = {
  side: "left" | "right";
};

function PosterSkeleton({ side }: PosterSkeletonProps) {
  return (
    <section
      className={[
        "relative hidden h-screen overflow-hidden lg:block",
        side === "left"
          ? "border-r border-white/10"
          : "border-l border-white/10",
      ].join(" ")}
    >
      <div className="absolute inset-0">
        <div className="grid h-full grid-cols-3 gap-3 p-6 opacity-50">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-3xl border border-white/10 bg-white/5"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FormSkeleton() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
      <div className="w-full max-w-xl rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur md:p-8">
        <div className="space-y-5">
          <div className="space-y-3">
            <div className="h-8 w-40 animate-pulse rounded-xl bg-white/10" />
            <div className="h-4 w-72 animate-pulse rounded-lg bg-white/10" />
          </div>

          <div className="space-y-4">
            <div className="h-20 animate-pulse rounded-2xl bg-white/5" />
            <div className="h-20 animate-pulse rounded-2xl bg-white/5" />
            <div className="h-14 animate-pulse rounded-2xl bg-amber-400/20" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AuthPageLoader({ variant }: AuthPageLoaderProps) {
  const isLogin = variant === "login";

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {isLogin ? (
          <>
            <FormSkeleton />
            <PosterSkeleton side="right" />
          </>
        ) : (
          <>
            <PosterSkeleton side="left" />
            <FormSkeleton />
          </>
        )}
      </div>
    </main>
  );
}
