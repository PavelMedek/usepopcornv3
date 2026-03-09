"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const posters = Array.from({ length: 18 }).map((_, i) => ({
  src: `https://picsum.photos/seed/usepopcorn-${i}/420/620`,
}));

export default function HeroMosaic() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 120]);

  return (
    <section className="relative">
      {/* background mosaic */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <div className="mx-auto max-w-7xl px-4 pt-28">
            <div className="grid grid-cols-3 gap-3 opacity-70 md:grid-cols-6">
              {posters.map((p, idx) => (
                <motion.div
                  key={idx}
                  className="relative aspect-[2/3] overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                  whileHover={
                    reduce
                      ? {}
                      : { y: -6, rotate: idx % 2 ? 1 : -1, scale: 1.02 }
                  }
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/20 to-transparent" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* stronger overlays for readability */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_circle_at_38%_28%,rgba(0,0,0,0.10),rgba(0,0,0,0.88))]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/65 to-zinc-950" />
      </div>

      {/* foreground content */}
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-36 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          {/* subtle text panel */}
          <div className="inline-block rounded-[28px] border border-white/10 bg-black/25 p-5 backdrop-blur-sm md:p-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs text-zinc-200">
              🍿 Seriály napříč platformami. V jednom přehrávači.
            </p>

            <h1 className="mt-4 text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
              Najdi co sledovat.
              <span className="block text-amber-400">A hned to pusť.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-100 md:text-lg md:leading-8">
              usePopcorn spojuje seriály z různých streamovacích služeb do
              jednoho přehledného katalogu. Otevři detail, prohlédni epizody,
              pusť video, ulož do seznamu a čti články, popisy a zajímavosti.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryCTA href="/shows">Otevřít usePopcorn</PrimaryCTA>
              <GhostCTA href="#pricing">Zobrazit ceník</GhostCTA>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 text-xs text-zinc-300">
              {[
                "Netflix",
                "Max",
                "Disney+",
                "Prime Video",
                "Apple TV+",
                "SkyShowtime",
              ].map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PrimaryCTA({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
    >
      <Link
        href={href}
        className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-medium text-zinc-950 hover:bg-amber-300"
      >
        {children}
        <span className="ml-2">→</span>
      </Link>
    </motion.div>
  );
}

function GhostCTA({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
    >
      <Link
        href={href}
        className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm hover:bg-white/10"
      >
        {children}
      </Link>
    </motion.div>
  );
}
