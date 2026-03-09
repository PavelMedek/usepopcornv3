export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const landing = {
  page: "min-h-screen overflow-x-hidden bg-zinc-950 text-zinc-50",

  container: "mx-auto w-full max-w-6xl px-4",

  section: "py-16 md:py-20",
  sectionCompact: "py-12 md:py-16",
  sectionSpacious: "py-20 md:py-28",

  title: "text-2xl font-semibold tracking-tight md:text-3xl",
  subtitle: "mt-3 max-w-2xl text-sm leading-6 text-zinc-300 md:text-base",
  lead: "text-sm leading-6 text-zinc-200 md:text-base md:leading-7",
  heroLead: "text-sm leading-6 text-zinc-200 md:text-lg md:leading-8",

  badge:
    "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200",

  card: "rounded-3xl border border-white/10 bg-white/5",
  cardHover:
    "rounded-3xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10",
  panel:
    "rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur",

  primaryButton:
    "inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-amber-300",
  secondaryButton:
    "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm text-zinc-100 transition hover:bg-white/10",

  navPill:
    "relative flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-2",

  muted: "text-sm leading-6 text-zinc-300",
  small: "text-xs text-zinc-400",
};
