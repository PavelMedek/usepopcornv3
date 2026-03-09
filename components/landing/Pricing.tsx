"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";
import SurfaceCard from "./ui/SurfaceCard";
import { cn } from "./styles";

type Plan = {
  name: string;
  price: string;
  period: string;
  tagline: string;
  ctaLabel: string;
  ctaHref: string;
  popular?: boolean;
  accent: string;
  features: { text: string; included: boolean }[];
};

const plans: Plan[] = [
  {
    name: "Free",
    price: "0 Kč",
    period: "měsíc",
    tagline: "Pro objevování a plánování, co sledovat.",
    ctaLabel: "Začít zdarma",
    ctaHref: "/signup?plan=free",
    accent: "from-white/10 via-white/5 to-transparent",
    features: [
      { text: "Katalog seriálů napříč platformami", included: true },
      { text: "Vyhledávání, filtry, žánry, trendy", included: true },
      { text: "Detail seriálu: popisy, sezóny, epizody", included: true },
      { text: "Články, průvodci, novinky", included: true },
      { text: "Watchlist (uložit na později)", included: true },
      { text: "Přehrávání epizod v aplikaci", included: false },
    ],
  },
  {
    name: "Plus",
    price: "149 Kč",
    period: "měsíc",
    tagline: "Přehrávání, pokračování a pohodlné sledování.",
    ctaLabel: "Aktivovat Plus",
    ctaHref: "/signup?plan=plus",
    popular: true,
    accent: "from-amber-500/20 via-rose-400/10 to-transparent",
    features: [
      { text: "Vše z Free", included: true },
      { text: "Přehrávání epizod v aplikaci", included: true },
      { text: "Pokračovat ve sledování + historie", included: true },
      { text: "Automatické přehrání další epizody", included: true },
      { text: "Až 2 zařízení současně", included: true },
      { text: "Méně rušivých prvků", included: true },
    ],
  },
  {
    name: "Premium",
    price: "249 Kč",
    period: "měsíc",
    tagline: "Nejlepší kvalita a maximum pohodlí.",
    ctaLabel: "Přejít na Premium",
    ctaHref: "/signup?plan=premium",
    accent: "from-indigo-500/20 via-cyan-400/10 to-transparent",
    features: [
      { text: "Vše z Plus", included: true },
      { text: "Vyšší kvalita přehrávání", included: true },
      { text: "Až 4 zařízení současně", included: true },
      { text: "Offline režim (stáhnout epizodu)", included: true },
      { text: "Kurátorské kolekce a výběry", included: true },
      { text: "Priority podpora", included: true },
    ],
  },
  {
    name: "Pay-as-you-go",
    price: "od 29 Kč",
    period: "epizoda",
    tagline: "Plať jen za to, co opravdu sleduješ.",
    ctaLabel: "Vyzkoušet přehrávání",
    ctaHref: "/signup?plan=payg",
    accent: "from-emerald-500/20 via-lime-400/10 to-transparent",
    features: [
      { text: "Katalog seriálů a články zdarma", included: true },
      { text: "Zaplatíš jen když něco pustíš", included: true },
      { text: "Přístup k epizodě nebo 24h pass", included: true },
      { text: "Bez měsíčního předplatného", included: true },
      { text: "Watchlist a katalog funkcí", included: true },
    ],
  },
];

export default function Pricing() {
  const mainPlans = plans.slice(0, 3);
  const extraPlan = plans[3];

  return (
    <Section id="pricing" className="relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute left-[-120px] top-[10%] h-80 w-80 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="absolute right-[-140px] top-[20%] h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="absolute bottom-[-160px] left-[30%] h-[30rem] w-[30rem] rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeader
            title="Ceník"
            description="Vyber si plán podle toho, jestli chceš jen objevovat, nebo i pohodlně sledovat."
          />
        </motion.div>

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-3">
          {mainPlans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-xl">
            <PlanCard plan={extraPlan} index={3} wide />
          </div>
        </div>

        <p className="mt-8 text-xs text-zinc-400">
          Informace o dostupnosti obsahu se může lišit podle regionu a
          platformy.
        </p>
      </div>
    </Section>
  );
}

function PlanCard({
  plan,
  index,
  wide,
}: {
  plan: Plan;
  index: number;
  wide?: boolean;
}) {
  const isPopular = !!plan.popular;

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.65,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6 }}
    >
      <div
        className={[
          "relative flex h-full flex-col overflow-hidden rounded-[28px]",
          "border border-white/10 bg-white/5 hover:bg-white/10",
          "shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]",
          "backdrop-blur",
          "p-10",
          isPopular ? "ring-1 ring-amber-400/40" : "",
        ].join(" ")}
      >
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${plan.accent}`}
        />

        <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/10" />

        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-semibold">{plan.name}</p>
              <p className="mt-1 text-sm text-zinc-200">{plan.tagline}</p>
            </div>

            {isPopular && (
              <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs text-amber-300">
                Nejpopulárnější
              </span>
            )}
          </div>

          <div className="mt-6 flex items-end gap-2">
            <p className="text-4xl font-semibold tracking-tight">
              {plan.price}
            </p>
            <p className="pb-1 text-sm text-zinc-300">/ {plan.period}</p>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="mt-6"
          >
            <Link
              href={plan.ctaHref}
              className={[
                "flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition",
                isPopular
                  ? "bg-amber-400 text-zinc-950 hover:bg-amber-300"
                  : "border border-white/15 bg-zinc-950/40 text-zinc-100 hover:bg-white/10",
              ].join(" ")}
            >
              {plan.ctaLabel} <span>→</span>
            </Link>
          </motion.div>

          <div className="mt-6 flex-1">
            <p className="text-xs font-medium text-zinc-300">V ceně</p>

            <ul
              className={["mt-3 space-y-2", wide ? "sm:columns-2" : ""].join(
                " ",
              )}
            >
              {plan.features.map((f) => (
                <li
                  key={f.text}
                  className="mb-2 break-inside-avoid flex items-start gap-2"
                >
                  <span
                    className={[
                      "mt-[3px] inline-flex h-5 w-5 items-center justify-center rounded-full text-xs",
                      f.included
                        ? "bg-emerald-400/15 text-emerald-300 border border-emerald-400/20"
                        : "bg-white/5 text-zinc-400 border border-white/10",
                    ].join(" ")}
                  >
                    {f.included ? "✓" : "–"}
                  </span>

                  <span
                    className={[
                      "text-sm",
                      f.included
                        ? "text-zinc-200"
                        : "text-zinc-400 line-through",
                    ].join(" ")}
                  >
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {plan.name === "Free" && (
            <p className="mt-6 text-xs text-zinc-400">
              Přehrávání epizod je dostupné v plánech Plus, Premium nebo
              Pay-as-you-go.
            </p>
          )}

          {plan.name === "Pay-as-you-go" && (
            <p className="mt-6 text-xs text-zinc-400">
              Tip: Pokud sleduješ často, Plus se obvykle vyplatí nejvíc.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
