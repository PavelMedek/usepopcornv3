"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ButtonLink from "./ui/ButtonLink";
import Container from "./ui/Container";
import { landing } from "./styles";
import { createClient } from "@/lib/supabase/client";

type NavItem = { label: string; href: string };

export default function Navbar() {
  const nav: NavItem[] = useMemo(
    () => [
      { label: "Právě letí", href: "#catalog" },
      { label: "Proč usePopcorn", href: "#features" },
      { label: "Ceník", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    [],
  );

  const [active, setActive] = useState(nav[0]?.href ?? "#catalog");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const supabase = createClient();

    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsLoggedIn(!!user);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const go = (href: string) => {
    setActive(href);
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50">
        <div
          className={[
            "border-b border-white/10 transition-all",
            scrolled ? "bg-zinc-950/70 backdrop-blur" : "bg-transparent",
          ].join(" ")}
        >
          <Container className="flex items-center justify-between py-4">
            <Link
              href="/"
              className="text-sm font-semibold tracking-tight text-zinc-100 transition-colors hover:text-white"
            >
              use<span className="text-amber-400">Popcorn</span>
              <span className="ml-2 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-zinc-300">
                beta
              </span>
            </Link>

            <nav className="hidden md:flex">
              <div className={landing.navPill}>
                {nav.map((item) => {
                  const isActive = active === item.href;
                  return (
                    <button
                      key={item.href}
                      onClick={() => go(item.href)}
                      className="relative rounded-full px-4 py-2 text-sm text-zinc-200 transition-colors hover:text-white"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-white/10"
                          transition={{
                            type: "spring",
                            stiffness: 520,
                            damping: 40,
                          }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <ButtonLink href={isLoggedIn ? "/home" : "/login"} arrow>
                  {isLoggedIn ? "Otevřít aplikaci" : "Přihlásit se"}
                </ButtonLink>
              </div>

              <button
                className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 md:hidden"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Open menu"
              >
                <BurgerIcon open={mobileOpen} />
              </button>
            </div>
          </Container>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              aria-label="Close menu"
              className="absolute inset-0 bg-zinc-950/70 backdrop-blur"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <div className="relative flex h-full w-full items-start justify-center px-4 pt-20">
              <motion.div
                className="w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/90 p-4 shadow-2xl"
                initial={{ y: -12, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -12, opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              >
                <div className="mb-3 flex items-center justify-between px-1">
                  <div className="text-xs text-zinc-300">Navigace</div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid gap-2">
                  {nav.map((item, idx) => (
                    <motion.button
                      key={item.href}
                      onClick={() => go(item.href)}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * idx }}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm hover:bg-white/10"
                    >
                      <span>{item.label}</span>
                      <span className="text-zinc-400">→</span>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-4">
                  <ButtonLink
                    href={isLoggedIn ? "/home" : "/signup"}
                    block
                    rounded="2xl"
                    arrow
                    onClick={() => setMobileOpen(false)}
                  >
                    {isLoggedIn ? "Otevřít aplikaci" : "Začít zdarma"}
                  </ButtonLink>
                </div>

                <p className="mt-4 px-1 text-xs text-zinc-400">
                  Tip: Scrolluj dolů na „Právě letí“ a prozkoumej usePopcorn.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5">
      <motion.span
        className="absolute left-0 top-0 h-[2px] w-full rounded bg-white"
        animate={{ y: open ? 7 : 0, rotate: open ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
      />
      <motion.span
        className="absolute left-0 top-[7px] h-[2px] w-full rounded bg-white"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="absolute left-0 top-[14px] h-[2px] w-full rounded bg-white"
        animate={{ y: open ? -7 : 0, rotate: open ? -45 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
      />
    </span>
  );
}
