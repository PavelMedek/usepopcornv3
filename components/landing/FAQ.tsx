"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useState } from "react";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";

const faqs = [
  {
    q: "Co je usePopcorn?",
    a: "usePopcorn je katalog seriálů napříč streamovacími platformami. Umožňuje objevovat nové seriály, sledovat epizody, číst články a zjistit, kde je obsah dostupný.",
  },
  {
    q: "Jaké seriály v aplikaci najdu?",
    a: "Najdeš tisíce seriálů z různých žánrů — od populárních hitů až po méně známé tituly.",
  },
  {
    q: "Můžu objevovat nové seriály podle doporučení?",
    a: "Ano. usePopcorn nabízí trendy seriály, populární tituly a doporučení podle toho, co sleduješ.",
  },
  {
    q: "Je usePopcorn zdarma?",
    a: "Ano. Free plán umožňuje procházet katalog seriálů, číst články a ukládat seriály do watchlistu. Přehrávání epizod je dostupné v plánech Plus, Premium nebo Pay-as-you-go.",
  },
  {
    q: "Co dostanu ve Free plánu?",
    a: "Free ti zpřístupní celý katalog, vyhledávání, filtry, detail seriálu, epizody, články a watchlist. Přehrávání je dostupné v Plus, Premium nebo Pay-as-you-go.",
  },
  {
    q: "Můžu seriály přehrávat přímo v aplikaci?",
    a: "Ano. Přehrávání epizod je dostupné v plánech Plus a Premium. Pokud nechceš předplatné, můžeš využít také Pay-as-you-go a zaplatit jen za konkrétní epizodu nebo krátký přístup.",
  },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: easeOut,
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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: easeOut,
    },
  },
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Section id="faq" className="relative">
      <motion.div
        variants={reduce ? undefined : headerVariants}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.2 }}
      >
        <SectionHeader title="Často kladené dotazy" />
      </motion.div>

      <motion.div
        variants={reduce ? undefined : listVariants}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.12 }}
        className="mt-8 grid gap-3"
      >
        {faqs.map((item, idx) => {
          const isOpen = open === idx;

          return (
            <motion.div
              key={item.q}
              variants={reduce ? undefined : itemVariants}
              layout={!reduce}
              transition={{
                layout: {
                  duration: 0.3,
                  ease: easeOut,
                },
              }}
              whileHover={reduce ? undefined : { y: -2 }}
              className={[
                "overflow-hidden rounded-2xl border transition-colors",
                isOpen
                  ? "border-white/15 bg-white/[0.07] shadow-[0_10px_30px_-20px_rgba(255,255,255,0.18)]"
                  : "border-white/10 bg-white/5 hover:bg-white/[0.07]",
              ].join(" ")}
            >
              <button
                onClick={() => setOpen(isOpen ? null : idx)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
              >
                <motion.span
                  animate={
                    reduce
                      ? undefined
                      : { opacity: isOpen ? 1 : 0.95, x: isOpen ? 2 : 0 }
                  }
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium text-zinc-100 md:text-base"
                >
                  {item.q}
                </motion.span>

                <motion.span
                  animate={reduce ? undefined : { rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.22, ease: easeOut }}
                  className="text-lg text-zinc-300"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={
                      reduce ? undefined : { height: "auto", opacity: 1 }
                    }
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.28,
                      ease: easeOut,
                    }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={reduce ? false : { y: -6, opacity: 0 }}
                      animate={reduce ? undefined : { y: 0, opacity: 1 }}
                      exit={reduce ? undefined : { y: -4, opacity: 0 }}
                      transition={{
                        duration: 0.22,
                        delay: 0.03,
                        ease: easeOut,
                      }}
                      className="px-5 pb-5 text-sm leading-7 text-zinc-300 md:px-6 md:pb-6 md:text-base"
                    >
                      {item.a}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
