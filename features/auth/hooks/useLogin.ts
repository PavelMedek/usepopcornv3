"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserProfile, signInWithEmail } from "../services";
import { saveCurrentUser } from "../storage";
import { loginSchema, type LoginFormValues } from "../schemas";
import { mapProfileToCurrentUser } from "../utils";

type LoginPhase =
  | "idle"
  | "signing-in"
  | "loading-profile"
  | "saving-session"
  | "redirecting";

export function useLogin() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
  const [phase, setPhase] = useState<LoginPhase>("idle");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const isBusy = phase !== "idle";

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setSubmitError("");
      setPhase("signing-in");

      const user = await signInWithEmail(data.email, data.password);

      setPhase("loading-profile");
      const profile = await getUserProfile(user.id);

      setPhase("saving-session");
      saveCurrentUser(mapProfileToCurrentUser(user, profile));

      setPhase("redirecting");
      router.push("/home");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Nastala chyba při přihlášení.",
      );
      setPhase("idle");
    }
  };

  const loadingTitle =
    phase === "signing-in"
      ? "Přihlašuji tě"
      : phase === "loading-profile"
        ? "Načítám profil"
        : phase === "saving-session"
          ? "Připravuji relaci"
          : phase === "redirecting"
            ? "Přesměrovávám"
            : "Načítám";

  const loadingDescription =
    phase === "signing-in"
      ? "Ověřujeme přihlašovací údaje."
      : phase === "loading-profile"
        ? "Načítám data tvého profilu."
        : phase === "saving-session"
          ? "Ukládám uživatelský stav."
          : phase === "redirecting"
            ? "Za chvíli budeš na domovské stránce."
            : "Chvilku strpení.";

  return {
    form,
    submitError,
    onSubmit,
    isBusy,
    phase,
    loadingTitle,
    loadingDescription,
  };
}
