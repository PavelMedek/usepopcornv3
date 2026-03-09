"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useRef } from "react";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";

const items = Array.from({ length: 12 }).map((_, i) => ({
  title: `Show ${i + 1}`,
  img: `https://picsum.photos/seed/rail-${i}/520/780`,
  platform: ["Netflix", "Max", "Disney+", "Prime"][i % 4],
  year: 2016 + (i % 8),
  rating: (78 + (i % 18)) / 10,
  progress: i % 3 === 0 ? (22 + i * 3) % 100 : null,
}));

function platformDot(platform: string) {
  switch (platform) {
    case "Netflix":
      return "bg-red-500";
    case "Max":
      return "bg-blue-500";
    case "Disney+":
      return "bg-indigo-400";
    case "Prime":
      return "bg-cyan-400";
    default:
      return "bg-zinc-400";
  }
}

const sectionIntro: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const listVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function Rail({ title }: { title: string }) {
  const reduce = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!railRef.current) return;

    const width = railRef.current.clientWidth * 0.8;

    railRef.current.scrollBy({
      left: dir === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  return (
    <Section id="catalog" className="relative">
      <motion.div
        variants={sectionIntro}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.2 }}
        className="flex items-end justify-between gap-4"
      >
        <SectionHeader title={title} />
        <p className="text-xs text-zinc-400">Swipe / scroll →</p>
      </motion.div>

      <div className="relative mt-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-zinc-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-zinc-950 to-transparent" />

        <motion.button
          whileHover={reduce ? undefined : { scale: 1.06, x: -2 }}
          whileTap={reduce ? undefined : { scale: 0.96 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 z-50 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/80 text-white backdrop-blur transition hover:bg-white/10 md:flex"
        >
          ←
        </motion.button>

        <motion.button
          whileHover={reduce ? undefined : { scale: 1.06, x: 2 }}
          whileTap={reduce ? undefined : { scale: 0.96 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 z-50 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/80 text-white backdrop-blur transition hover:bg-white/10 md:flex"
        >
          →
        </motion.button>

        <motion.div
          ref={railRef}
          variants={reduce ? undefined : listVariants}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, amount: 0.15 }}
          className="
            flex gap-4 overflow-x-auto pb-3 pt-4
            pl-3 pr-3 scroll-px-3
            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
            snap-x snap-mandatory
          "
        >
          {items.map((it, idx) => (
            <motion.div
              key={idx}
              variants={reduce ? undefined : cardVariants}
              className="w-44 shrink-0 snap-start md:w-60"
            >
              <motion.div
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -10,
                        scale: 1.03,
                      }
                }
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative z-0 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl hover:z-20"
              >
                <motion.img
                  src={it.img}
                  alt=""
                  className="aspect-[2/3] w-full object-cover"
                  whileHover={reduce ? undefined : { scale: 1.04 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                <div className="absolute inset-x-4 top-4 flex justify-between">
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: -8 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 0.08 + idx * 0.02, duration: 0.35 }}
                    className="flex items-center gap-2 rounded-full bg-black/60 px-2.5 py-1 text-[11px] text-white backdrop-blur"
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${platformDot(
                        it.platform,
                      )}`}
                    />
                    {it.platform}
                  </motion.div>

                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: -8 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 0.12 + idx * 0.02, duration: 0.35 }}
                    className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] text-white backdrop-blur"
                  >
                    ⭐ {it.rating.toFixed(1)}
                  </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-end justify-between">
                    <motion.div
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ delay: 0.14 + idx * 0.02, duration: 0.4 }}
                    >
                      <p className="text-sm font-medium">{it.title}</p>
                      <p className="text-xs text-zinc-300">
                        {it.year} • {it.platform}
                      </p>
                    </motion.div>

                    <motion.button
                      initial={
                        reduce ? false : { opacity: 0, y: 8, scale: 0.9 }
                      }
                      whileInView={
                        reduce ? undefined : { opacity: 1, y: 0, scale: 1 }
                      }
                      whileHover={
                        reduce
                          ? undefined
                          : {
                              scale: 1.08,
                              backgroundColor: "rgba(255,255,255,0.28)",
                            }
                      }
                      whileTap={reduce ? undefined : { scale: 0.94 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.25 }}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      ▶
                    </motion.button>
                  </div>

                  {typeof it.progress === "number" && (
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={reduce ? false : { width: 0 }}
                        whileInView={
                          reduce ? undefined : { width: `${it.progress}%` }
                        }
                        viewport={{ once: true, amount: 0.7 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.18 + idx * 0.03,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="h-full bg-amber-400"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
