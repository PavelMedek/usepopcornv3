"use client";

import Link from "next/link";
import {
  Clapperboard,
  LockKeyhole,
  Mail,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import AuthPosterPanel from "@/components/auth/AuthPosterPanel";
import AuthCard from "@/components/auth/AuthCard";
import AuthBrand from "@/components/auth/AuthBrand";
import FormField from "@/components/auth/FormField";
import TextInput from "@/components/auth/TextInput";
import PasswordInput from "@/components/auth/PasswordInput";
import SubmitButton from "@/components/auth/SubmitButton";
import AuthErrorAlert from "@/components/auth/AuthErrorAlert";
import AuthLoadingOverlay from "@/components/auth/AuthLoadingOverlay";
// import { loginPosters } from "@/features/auth/constants";
import { useAuthPosters } from "@/features/auth/hooks/useAuthPosters";
import { useLogin } from "@/features/auth/hooks/useLogin";

export default function LoginPageClient() {
  const {
    form,
    isBusy,
    submitError,
    onSubmit,
    loadingTitle,
    loadingDescription,
  } = useLogin();

  const { posters: loginPosters } = useAuthPosters("login");

  return (
    <AuthShell
      left={
        <section className="relative min-h-screen overflow-y-auto border-r border-white/10 lg:h-screen">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[-120px] top-[10%] h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="absolute right-[-120px] top-[20%] h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
            <div className="absolute bottom-[-160px] left-[30%] h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
          </div>

          <div className="relative z-10 flex h-full flex-col justify-between p-10">
            <AuthBrand />

            <div className="flex flex-1 items-center justify-center py-6">
              <div className="relative w-full max-w-xl">
                <AuthCard>
                  <div className="mb-8">
                    <h1 className="text-3xl font-semibold tracking-tight">
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
                    <FormField
                      label="E-mail"
                      icon={<Mail size={18} />}
                      error={form.formState.errors.email?.message}
                    >
                      <TextInput
                        {...form.register("email")}
                        type="email"
                        placeholder="jan@usepopcorn.app"
                        hasError={!!form.formState.errors.email}
                        disabled={isBusy}
                      />
                    </FormField>

                    <FormField
                      label="Heslo"
                      icon={<LockKeyhole size={18} />}
                      error={form.formState.errors.password?.message}
                    >
                      <PasswordInput
                        {...form.register("password")}
                        hasError={!!form.formState.errors.password}
                        disabled={isBusy}
                      />
                    </FormField>

                    <AuthErrorAlert message={submitError} />

                    <SubmitButton
                      loading={isBusy}
                      loadingText="Přihlašuji"
                      disabled={isBusy}
                    >
                      <>
                        Přihlásit se <span>→</span>
                      </>
                    </SubmitButton>

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
                </AuthCard>

                <AuthLoadingOverlay
                  visible={isBusy}
                  title={loadingTitle}
                  description={loadingDescription}
                />
              </div>
            </div>
          </div>
        </section>
      }
      right={
        <AuthPosterPanel posters={loginPosters} gradientDirection="left">
          <div />

          <div className="max-w-xl self-end text-right">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
              <Clapperboard size={14} />
              Tvoje streamovací platforma na míru
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight">
              Vrať se ke svým seriálům, článkům a oblíbeným profilům.
            </h2>

            <p className="mt-4 text-zinc-200">
              Pokračuj ve sledování, objevuj nové tituly a měj všechno přehledně
              na jednom místě.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                <Sparkles size={16} className="text-amber-300" />
                Pokračování ve sledování
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                <PlayCircle size={16} className="text-emerald-300" />
                Oblíbené seriály
              </div>
            </div>
          </div>
        </AuthPosterPanel>
      }
    />
  );
}
