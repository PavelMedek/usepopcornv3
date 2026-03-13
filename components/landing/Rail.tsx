"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
  CalendarDays,
  MonitorPlay,
  TrendingUp,
} from "lucide-react";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";

type RailItem = {
  id: number;
  title: string;
  img: string;
  platform: string;
  year: number | null;
  rating: number | null;
  progress: number | null;
  summary: string;
};

const railShowIds = [
  82, 169, 305, 216, 527, 49, 179, 2993, 1371, 66, 431, 66732,
];

async function fetchRailItems(ids: number[]): Promise<RailItem[]> {
  const results = await Promise.all(
    ids.map(async (id, index) => {
      try {
        const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
        if (!res.ok) return null;

        const data = await res.json();
        const img = data?.image?.original || data?.image?.medium;
        if (!img) return null;

        const year = data?.premiered
          ? Number(String(data.premiered).slice(0, 4))
          : null;

        const platform =
          data?.webChannel?.name || data?.network?.name || "TV / Streaming";

        const summary =
          typeof data?.summary === "string"
            ? stripHtml(data.summary)
            : "Summary is not available.";

        return {
          id,
          title: data?.name ?? "Seriál",
          img,
          platform,
          year: Number.isFinite(year) ? year : null,
          rating:
            typeof data?.rating?.average === "number"
              ? data.rating.average
              : null,
          progress: index % 3 === 0 ? (28 + index * 9) % 100 : null,
          summary,
        };
      } catch {
        return null;
      }
    }),
  );

  return results.filter((item): item is RailItem => item !== null);
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateText(text: string, max = 170) {
  if (text.length <= max) return text;

  const shortened = text.slice(0, max);
  const lastSpace = shortened.lastIndexOf(" ");

  return (
    (lastSpace > 100 ? shortened.slice(0, lastSpace) : shortened).trim() + "…"
  );
}

function platformTone(platform: string) {
  const value = platform.toLowerCase();

  if (value.includes("netflix")) {
    return {
      dot: "bg-red-500",
      pill: "border-red-400/25 bg-red-500/10 text-red-200",
    };
  }

  if (value.includes("max") || value.includes("hbo")) {
    return {
      dot: "bg-blue-500",
      pill: "border-blue-400/25 bg-blue-500/10 text-blue-200",
    };
  }

  if (value.includes("disney")) {
    return {
      dot: "bg-indigo-400",
      pill: "border-indigo-400/25 bg-indigo-500/10 text-indigo-200",
    };
  }

  if (value.includes("prime") || value.includes("amazon")) {
    return {
      dot: "bg-cyan-400",
      pill: "border-cyan-400/25 bg-cyan-500/10 text-cyan-200",
    };
  }

  if (value.includes("apple")) {
    return {
      dot: "bg-zinc-200",
      pill: "border-white/15 bg-white/10 text-zinc-100",
    };
  }

  if (value.includes("adult swim")) {
    return {
      dot: "bg-emerald-400",
      pill: "border-emerald-400/25 bg-emerald-500/10 text-emerald-200",
    };
  }

  return {
    dot: "bg-zinc-400",
    pill: "border-white/10 bg-white/10 text-zinc-200",
  };
}

export default function Rail({ title }: { title: string }) {
  const reduce = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<RailItem[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const data = await fetchRailItems(railShowIds);
      if (!cancelled) setItems(data);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const featured = useMemo(() => items[0] ?? null, [items]);

  const featuredDescription = useMemo(() => {
    if (!featured) return "";
    return truncateText(featured.summary, 170);
  }, [featured]);

  const scroll = (dir: "left" | "right") => {
    if (!railRef.current) return;

    const width = railRef.current.clientWidth * 0.86;

    railRef.current.scrollBy({
      left: dir === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  return (
    <Section id="catalog" className="relative">
      <div className="flex flex-col gap-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
          whileInView={
            reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <SectionHeader title={title} />

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-300">
            <TrendingUp className="h-3.5 w-3.5 text-amber-300" />
            Právě populární
          </div>
        </motion.div>

        {featured ? (
          <motion.div
            initial={
              reduce ? false : { opacity: 0, y: 18, filter: "blur(10px)" }
            }
            whileInView={
              reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
            }
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5"
          >
            <div className="absolute inset-0">
              <img
                src={featured.img}
                alt={featured.title}
                className="h-full w-full object-cover object-top opacity-20"
              />
              <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_38%,rgba(0,0,0,0.16),rgba(0,0,0,0.92))]" />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-zinc-950/45" />
            </div>

            <div className="relative grid gap-8 p-6 md:grid-cols-[1.15fr_0.85fr] md:p-8 lg:p-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-zinc-200 backdrop-blur">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      platformTone(featured.platform).dot
                    }`}
                  />
                  Doporučený titul
                </div>

                <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  {featured.title}
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  <InfoPill icon={MonitorPlay} text={featured.platform} />
                  <InfoPill
                    icon={CalendarDays}
                    text={featured.year ? String(featured.year) : "Rok neznámý"}
                  />
                  {typeof featured.rating === "number" && (
                    <InfoPill
                      icon={Star}
                      text={`${featured.rating.toFixed(1)} / 10`}
                      star
                    />
                  )}
                </div>

                <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-300 md:text-base">
                  {featuredDescription}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-amber-300">
                    <Play className="h-4 w-4 fill-current" />
                    Pustit detail
                  </button>

                  <button className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-zinc-100 transition hover:bg-white/10">
                    <ChevronRight className="h-4 w-4" />
                    Projít katalog
                  </button>
                </div>
              </div>

              <div className="hidden md:flex md:items-end md:justify-end">
                <div className="w-full max-w-[280px] overflow-hidden rounded-[28px] border border-white/10 bg-black/30 shadow-2xl backdrop-blur">
                  <img
                    src={featured.img}
                    alt={featured.title}
                    className="aspect-[2/3] w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between gap-3"
        >
          <p className="text-xs text-zinc-400">Posouvej seznam titulů</p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Posunout doleva"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-200 transition hover:bg-white/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={() => scroll("right")}
              aria-label="Posunout doprava"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-200 transition hover:bg-white/10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="relative mt-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-zinc-950 via-zinc-950/80 to-transparent" />

        <motion.div
          ref={railRef}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="
            flex gap-4 overflow-x-auto pb-2 pt-1
            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
            snap-x snap-mandatory
          "
        >
          {items.map((it, idx) => {
            const tone = platformTone(it.platform);

            return (
              <motion.article
                key={`${it.id}-${idx}`}
                initial={
                  reduce ? false : { opacity: 0, y: 18, filter: "blur(8px)" }
                }
                whileInView={
                  reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
                }
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group w-[78vw] max-w-[280px] shrink-0 snap-start sm:w-56 md:w-64"
              >
                <motion.div
                  whileHover={reduce ? undefined : { y: -2 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="
                    overflow-hidden rounded-[28px] border border-white/10 bg-zinc-900/90
                    transition-[border-color,background-color,box-shadow] duration-300
                    hover:border-white/15 hover:bg-zinc-900
                    hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.9)]
                  "
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={it.img}
                      alt={it.title}
                      className="aspect-[2/3] w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/5 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/10 to-transparent" />

                    <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-2">
                      <div
                        className={[
                          "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] backdrop-blur",
                          tone.pill,
                        ].join(" ")}
                      >
                        <span className={`h-2 w-2 rounded-full ${tone.dot}`} />
                        <span className="max-w-[110px] truncate">
                          {it.platform}
                        </span>
                      </div>

                      {typeof it.rating === "number" && (
                        <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[11px] text-white backdrop-blur">
                          <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                          {it.rating.toFixed(1)}
                        </div>
                      )}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        aria-label={`Přehrát ${it.title}`}
                        className="
                          inline-flex h-14 w-14 items-center justify-center rounded-full
                          border border-white/15 bg-black/50 text-white backdrop-blur
                          transition-all duration-300
                          opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
                        "
                      >
                        <Play className="ml-0.5 h-5 w-5 fill-current" />
                      </button>
                    </div>

                    {typeof it.progress === "number" && (
                      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
                        <div className="mb-2 flex items-center justify-between text-[11px] text-zinc-300">
                          <span>Pokračování ve sledování</span>
                          <span>{it.progress}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            initial={reduce ? false : { width: 0 }}
                            whileInView={
                              reduce ? undefined : { width: `${it.progress}%` }
                            }
                            viewport={{ once: true, amount: 0.7 }}
                            transition={{
                              duration: 0.8,
                              delay: 0.12 + idx * 0.03,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="h-full rounded-full bg-amber-400"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/10 bg-zinc-900/95 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-base font-semibold text-zinc-100">
                          {it.title}
                        </h3>

                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {it.year ?? "—"}
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <MonitorPlay className="h-3.5 w-3.5" />
                            Stream
                          </span>
                        </div>
                      </div>

                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-zinc-200" />
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}

function InfoPill({
  icon: Icon,
  text,
  star = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  star?: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-zinc-200 backdrop-blur">
      <Icon
        className={[
          "h-4 w-4",
          star ? "fill-amber-300 text-amber-300" : "text-zinc-300",
        ].join(" ")}
      />
      {text}
    </div>
  );
}
