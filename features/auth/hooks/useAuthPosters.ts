"use client";

import { useEffect, useState } from "react";
import type { Poster } from "@/features/auth/constants";
import { getLoginPosters, getSignupPosters } from "@/features/auth/constants";

type PosterKind = "login" | "signup";

export function useAuthPosters(kind: PosterKind) {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);

      const data =
        kind === "login" ? await getLoginPosters() : await getSignupPosters();

      if (!cancelled) {
        setPosters(data);
        setIsLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [kind]);

  return { posters, isLoading };
}
