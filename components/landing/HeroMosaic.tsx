"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Sparkles, Rows3, ReceiptText } from "lucide-react";

type Poster = {
  src: string;
  title: string;
};

const heroShowIds = [
  82, // Game of Thrones
  169, // Breaking Bad
  305, // Sherlock
  216, // The Walking Dead
  527, // House
  49, // Vikings
  179, // Suits
  2993, // Stranger Things
  1371, // The 100
  66, // The Big Bang Theory
  431, // Friends
  66732, // Wednesday
  748, // Dexter
  123, // Lost
  526, // The Office
  73, // The Blacklist
  245, // Supernatural
  204, // How I Met Your Mother
];

async function fetchPosters(ids: number[]): Promise<Poster[]> {
  const results = await Promise.all(
    ids.map(async (id) => {
      try {
        const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
        if (!res.ok) return null;

        const data = await res.json();
        const src = data?.image?.original || data?.image?.medium;

        if (!src) return null;

        return {
          src,
          title: data?.name ?? "Seriál",
        };
      } catch {
        return null;
      }
    }),
  );

  return results.filter((item): item is Poster => item !== null);
}

export default function HeroMosaic() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 120]);

  const [posters, setPosters] = useState<Poster[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadPosters() {
      const data = await fetchPosters(heroShowIds);
      if (!cancelled) setPosters(data);
    }

    loadPosters();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <div className="mx-auto max-w-7xl px-4 pt-28">
            <div className="grid grid-cols-3 gap-3 opacity-70 md:grid-cols-6">
              {posters.map((p, idx) => (
                <motion.div
                  key={`${p.src}-${idx}`}
                  className="relative aspect-[2/3] overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                  whileHover={
                    reduce
                      ? {}
                      : { y: -6, rotate: idx % 2 ? 1 : -1, scale: 1.02 }
                  }
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <img
                    src={p.src}
                    alt={p.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/20 to-transparent" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_circle_at_38%_28%,rgba(0,0,0,0.10),rgba(0,0,0,0.88))]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/65 to-zinc-950" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-36 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-block rounded-[28px] border border-white/10 bg-black/25 p-5 backdrop-blur-sm md:p-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs text-zinc-200">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              Seriály napříč platformami. V jednom přehrávači.
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
              <PrimaryCTA href="/signup">Začít zdarma</PrimaryCTA>
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
        className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-amber-400 px-6 py-3 text-base font-medium text-zinc-950 transition hover:bg-amber-300"
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/10">
          <Sparkles className="h-4 w-4" />
        </span>
        <span>{children}</span>
        <ArrowRight className="h-5 w-5" />
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
        className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm text-zinc-100 transition hover:bg-white/10"
      >
        <ReceiptText className="h-4 w-4 text-zinc-300" />
        <span>{children}</span>
      </Link>
    </motion.div>
  );
}
