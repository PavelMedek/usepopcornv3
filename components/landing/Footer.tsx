"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clapperboard,
  Github,
  Info,
  Instagram,
  Popcorn,
  Scale,
  Sparkles,
  Tv,
  ArrowRight,
} from "lucide-react";

const links = {
  Produkt: [
    { name: "Procházet seriály", href: "/shows" },
    { name: "Články", href: "/blog" },
    { name: "Watchlist", href: "/watchlist" },
  ],
  Platforma: [
    { name: "Jak to funguje", href: "/how-it-works" },
    { name: "API", href: "/api" },
    { name: "Status", href: "/status" },
  ],
  Společnost: [
    { name: "O projektu", href: "/about" },
    { name: "Kontakt", href: "/contact" },
    { name: "Kariéra", href: "/careers" },
  ],
  Právní: [
    { name: "Podmínky", href: "/terms" },
    { name: "Soukromí", href: "/privacy" },
    { name: "Cookies", href: "/cookies" },
  ],
};

const sectionIcons = {
  Produkt: Clapperboard,
  Platforma: Tv,
  Společnost: Info,
  Právní: Scale,
} as const;

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-zinc-950">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/3 top-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-1/4 top-0 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 rounded-3xl border border-white/10 bg-white/5 px-5 py-8 text-center md:mb-16 md:p-10"
        >
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-amber-300">
            <Popcorn className="h-6 w-6" />
          </div>

          <h3 className="mt-4 text-xl font-semibold tracking-tight md:text-3xl">
            Najdi svůj další seriál
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-300 md:text-base">
            Prozkoumej tisíce seriálů napříč streamovacími platformami.
          </p>

          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6"
          >
            <Link
              href="/shows"
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-medium text-zinc-950 hover:bg-amber-300"
            >
              Procházet seriály
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid gap-10 sm:gap-12 md:grid-cols-5">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-semibold tracking-tight"
            >
              <Popcorn className="h-5 w-5 text-amber-400" />
              <span>
                use<span className="text-amber-400">Popcorn</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-zinc-400">
              Katalog seriálů napříč streamovacími platformami. Najdi, kde
              sledovat, a objev nové seriály.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:gap-x-10 md:col-span-4 md:grid-cols-4">
            {Object.entries(links).map(([title, items]) => {
              const Icon = sectionIcons[title as keyof typeof sectionIcons];

              return (
                <div key={title}>
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-100">
                    <Icon className="h-4 w-4 text-zinc-400" />
                    {title}
                  </p>

                  <ul className="mt-4 space-y-3">
                    {items.map((link) => (
                      <li key={link.name}>
                        <motion.div whileHover={{ x: 4 }}>
                          <Link
                            href={link.href}
                            className="text-sm text-zinc-400 transition-colors hover:text-white"
                          >
                            {link.name}
                          </Link>
                        </motion.div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-6 text-center text-sm text-zinc-400 md:mt-14 md:flex-row md:justify-between md:text-left">
          <p>© {new Date().getFullYear()} usePopcorn</p>

          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
            <Link
              href="#"
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <Sparkles className="h-4 w-4" />
              Twitter
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <Instagram className="h-4 w-4" />
              Discord
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
