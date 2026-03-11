"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CurrentUser } from "@/features/auth/types";
import { avatarOptions } from "../constants";
import { profileSetupSchema, type ProfileSetupValues } from "../schemas";
import { updateProfileSetup } from "../services";
import { getStoredCurrentUser, saveStoredCurrentUser } from "../storage";
import {
  getFallbackAvatar,
  getFallbackShows,
  getFallbackUsername,
  toggleFavoriteShow,
} from "../utils";

type ProfileSetupPhase =
  | "initializing"
  | "idle"
  | "saving-profile"
  | "skipping-profile"
  | "redirecting";

export function useProfileSetup() {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [phase, setPhase] = useState<ProfileSetupPhase>("initializing");

  const form = useForm<ProfileSetupValues>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: {
      username: "",
      avatar: "",
      favoriteShows: [],
    },
    mode: "onBlur",
  });

  useEffect(() => {
    const parsed = getStoredCurrentUser();

    if (!parsed) {
      router.replace("/signup");
      return;
    }

    setUser(parsed);

    form.reset({
      username: parsed.username ?? "",
      avatar: parsed.avatar ?? avatarOptions[0],
      favoriteShows: parsed.favoriteShows ?? [],
    });

    setPhase("idle");
  }, [form, router]);

  const selectedShows = form.watch("favoriteShows");
  const selectedAvatar = form.watch("avatar");
  const watchedUsername = form.watch("username");

  const selectedCount = useMemo(
    () => selectedShows?.length ?? 0,
    [selectedShows],
  );

  const isBusy = phase !== "idle" && phase !== "initializing";
  const isReady = phase !== "initializing";
  const isFormLocked = isBusy;

  const applyToggleShow = (showId: string) => {
    const current = form.getValues("favoriteShows");
    const next = toggleFavoriteShow(current, showId);

    form.setValue("favoriteShows", next, { shouldValidate: true });
  };

  const onSubmit = async (data: ProfileSetupValues) => {
    if (!user) return;

    try {
      setSubmitError("");
      setPhase("saving-profile");

      const updatedUser = await updateProfileSetup({
        id: user.id,
        username: data.username,
        avatar: data.avatar,
        favoriteShows: data.favoriteShows,
      });

      saveStoredCurrentUser(updatedUser);
      setUser(updatedUser);

      setPhase("redirecting");
      router.push("/home");
    } catch (error) {
      console.error("Profile setup error:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Nastala chyba při ukládání profilu.",
      );
      setPhase("idle");
    }
  };

  const onSkip = async () => {
    if (!user) {
      router.push("/home");
      return;
    }

    try {
      setSubmitError("");
      setPhase("skipping-profile");

      const updatedUser = await updateProfileSetup(
        {
          id: user.id,
          username: getFallbackUsername(user),
          avatar: getFallbackAvatar(user),
          favoriteShows: getFallbackShows(user),
        },
        "/api/users/profile",
      );

      saveStoredCurrentUser(updatedUser);
      setUser(updatedUser);

      setPhase("redirecting");
      router.push("/home");
    } catch (error) {
      console.error("Skip profile setup error:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Nastala chyba při ukládání profilu.",
      );
      setPhase("idle");
    }
  };

  const loadingTitle =
    phase === "initializing"
      ? "Načítám profil"
      : phase === "saving-profile"
        ? "Ukládám profil"
        : phase === "skipping-profile"
          ? "Přeskakuji nastavení"
          : phase === "redirecting"
            ? "Přesměrovávám"
            : "Načítám";

  const loadingDescription =
    phase === "initializing"
      ? "Připravuji data z uložené relace."
      : phase === "saving-profile"
        ? "Ukládám tvoje profilové nastavení."
        : phase === "skipping-profile"
          ? "Doplňuji výchozí profil a pokračuji dál."
          : phase === "redirecting"
            ? "Za chvíli budeš na domovské stránce."
            : "Chvilku strpení.";

  return {
    form,
    user,
    submitError,
    phase,
    isBusy,
    isReady,
    isFormLocked,
    selectedShows,
    selectedAvatar,
    selectedCount,
    watchedUsername,
    loadingTitle,
    loadingDescription,
    applyToggleShow,
    onSubmit,
    onSkip,
  };
}
