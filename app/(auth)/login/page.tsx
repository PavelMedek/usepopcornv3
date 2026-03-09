"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const loginSchema = z.object({
  email: z.string().email("Zadej platný e-mail."),
  password: z.string().min(6, "Zadej heslo."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const posters = Array.from({ length: 12 }).map((_, i) => ({
  src: `https://picsum.photos/seed/login-${i}/600/900`,
}));

export default function LoginPage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setSubmitError("");
      setLoading(true);

      const supabase = createClient();

      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw new Error(
          error.message === "Invalid login credentials"
            ? "Neplatný e-mail nebo heslo."
            : error.message,
        );
      }

      const user = authData.user;

      if (!user) {
        throw new Error("Nepodařilo se přihlásit.");
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError || !profile) {
        throw new Error("Profil uživatele nebyl nalezen.");
      }

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: user.id,
          firstName: profile.first_name,
          lastName: profile.last_name,
          email: user.email,
          plan: profile.plan,
          paid: profile.paid,
          profileCompleted: profile.profile_completed,
          username: profile.username,
          avatar: profile.avatar,
          favoriteShows: profile.favorite_shows ?? [],
          createdAt: profile.created_at,
        }),
      );

      router.push("/home");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Nastala chyba při přihlášení.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 lg:h-screen lg:overflow-hidden">
      <div className="grid min-h-screen lg:h-screen lg:grid-cols-2">
        <section className="relative min-h-screen overflow-y-auto lg:h-screen">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[-120px] top-[10%] h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="absolute right-[-120px] top-[20%] h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
            <div className="absolute bottom-[-160px] left-[30%] h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
          </div>

          <div className="relative z-10 flex min-h-screen items-start justify-center px-4 py-8 sm:px-6 lg:min-h-full lg:px-10 lg:py-10">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur md:p-8"
            >
              <div className="mb-8">
                <Link href="/" className="text-lg font-semibold tracking-tight">
                  use<span className="text-amber-400">Popcorn</span>
                </Link>

                <h1 className="mt-4 text-3xl font-semibold tracking-tight">
                  Přihlásit se
                </h1>
                <p className="mt-2 text-sm text-zinc-300">
                  Přihlas se ke svému účtu a pokračuj do usePopcorn.
                </p>
              </div>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <Field
                  label="E-mail"
                  error={form.formState.errors.email?.message}
                >
                  <input
                    {...form.register("email")}
                    type="email"
                    placeholder="jan@usepopcorn.app"
                    className={inputClass(!!form.formState.errors.email)}
                    disabled={loading}
                  />
                </Field>

                <Field
                  label="Heslo"
                  error={form.formState.errors.password?.message}
                >
                  <input
                    {...form.register("password")}
                    type="password"
                    placeholder="••••••••"
                    className={inputClass(!!form.formState.errors.password)}
                    disabled={loading}
                  />
                </Field>

                {submitError && (
                  <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-200">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 py-3.5 text-sm font-medium text-zinc-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      Přihlašuji <Loader2 className="animate-spin" size={16} />
                    </>
                  ) : (
                    <>
                      Přihlásit se <span>→</span>
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-zinc-400">
                  Ještě nemáš účet?{" "}
                  <Link
                    href="/signup"
                    className="text-zinc-100 hover:text-amber-300"
                  >
                    Vytvořit účet
                  </Link>
                </p>
              </form>
            </motion.div>
          </div>
        </section>

        <section className="relative hidden h-screen overflow-hidden border-l border-white/10 lg:block">
          <div className="absolute inset-0">
            <div className="grid h-full grid-cols-3 gap-3 p-6 opacity-70">
              {posters.map((poster, i) => (
                <motion.div
                  key={poster.src}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.03 }}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                >
                  <img
                    src={poster.src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-zinc-950/20 via-zinc-950/30 to-zinc-950" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/10 via-transparent to-zinc-950/80" />
          <div className="pointer-events-none absolute left-0 bottom-0 h-[28rem] w-[28rem] rounded-full bg-indigo-500/15 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-400/15 blur-3xl" />

          <div className="relative z-10 flex h-full flex-col justify-between p-10">
            <div />

            <div className="max-w-xl self-end text-right">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
                🍿 Tvoje streamovací platforma na míru
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight">
                Vrať se ke svým seriálům, článkům a oblíbeným profilům.
              </h2>

              <p className="mt-4 text-zinc-200">
                Pokračuj ve sledování, objevuj nové tituly a měj všechno
                přehledně na jednom místě.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-200">
        {label}
      </label>
      {children}
      {error && <p className="mt-2 text-sm text-rose-300">{error}</p>}
    </div>
  );
}

function inputClass(hasError?: boolean) {
  return [
    "w-full rounded-2xl border bg-zinc-950/40 px-4 py-3 text-sm text-zinc-100 outline-none transition",
    "placeholder:text-zinc-500",
    "focus:border-amber-400/50 focus:bg-zinc-950/60",
    hasError ? "border-rose-400/40" : "border-white/10",
  ].join(" ");
}
