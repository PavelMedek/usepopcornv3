"use client";

import { motion } from "framer-motion";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";

const bands = [
  {
    title: "Katalog, který se dá fakt používat",
    desc: "Rychlé vyhledávání, filtry, žánry, trendy a doporučení — všechno přehledně na jednom místě.",
    accent: "from-indigo-500/25 via-cyan-400/12 to-transparent",
  },
  {
    title: "Přehrávání a dostupnost na platformách",
    desc: "Na detailu seriálu hned vidíš, kde je dostupný, a jedním klikem spustíš přehrávač nebo trailer.",
    accent: "from-emerald-500/25 via-lime-400/12 to-transparent",
  },
  {
    title: "Epizody, popisy a články",
    desc: "Detailní info o seriálu, seznam epizod a články/novinky navázané přímo na konkrétní tituly.",
    accent: "from-amber-500/25 via-rose-400/12 to-transparent",
  },
  {
    title: "Watchlist a pokračování ve sledování",
    desc: "Ulož si seriály do seznamu, sleduj progress u rozkoukaných epizod a vrať se jedním klikem přesně tam, kde jsi skončil.",
    accent: "from-fuchsia-500/25 via-violet-400/12 to-transparent",
  },
  {
    title: "Profil, historie a personalizace",
    desc: "Historie sledování, oblíbené žánry, hodnocení a doporučení na míru — všechno přehledně v profilu.",
    accent: "from-sky-500/25 via-emerald-400/12 to-transparent",
  },
];

export default function FeatureBands() {
  return (
    <Section id="features" className="relative">
      <FloatingStuff />

      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader title="Proč usePopcorn" />

        <div className="mt-8 grid gap-4 md:gap-5">
          {bands.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.65,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 hover:bg-white/10 md:p-8"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${b.accent}`}
              />
              <div className="relative max-w-3xl">
                <p className="text-lg font-semibold text-zinc-50 md:text-xl">
                  {b.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-200 md:text-base">
                  {b.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function FloatingStuff() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
      <motion.div
        className="absolute left-[-80px] top-[20%] h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl"
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-120px] top-[10%] h-80 w-80 rounded-full bg-amber-400/20 blur-3xl"
        animate={{ y: [0, 22, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-140px] left-[30%] h-96 w-96 rounded-full bg-emerald-400/15 blur-3xl"
        animate={{ x: [0, 18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
