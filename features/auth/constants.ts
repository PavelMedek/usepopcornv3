import type { PlanOption } from "@/components/auth/PlanSelect";

export type Poster = {
  src: string;
  title: string;
};

const loginShowIds = [
  82, // Game of Thrones
  169, // Breaking Bad
  305, // Sherlock
  216, // The Walking Dead
  527, // House
  49, // Vikings
  179, // Suits
  2993, // Stranger Things
  1371, // The 100
  66, // The Big Bang Theory
  431, // Friends
  66732, // Wednesday
];

const signupShowIds = [
  431, // Friends
  2993, // Stranger Things
  15299, // Wednesday
  66, // The Big Bang Theory
  179, // Suits
  305, // Sherlock
  527, // House
  82, // Game of Thrones
  169, // Breaking Bad
  49, // Vikings
  216, // The Walking Dead
  1371, // The 100
];

async function fetchPosters(ids: number[]): Promise<Poster[]> {
  const results = await Promise.all(
    ids.map(async (id) => {
      try {
        const res = await fetch(`https://api.tvmaze.com/shows/${id}`);

        if (!res.ok) return null;

        const data = await res.json();

        const src = data?.image?.original || data?.image?.medium;
        if (!src) return null;

        return {
          src,
          title: data.name ?? "Seriál",
        };
      } catch {
        return null;
      }
    }),
  );

  return results.filter((item): item is Poster => item !== null);
}

export async function getLoginPosters() {
  return fetchPosters(loginShowIds);
}

export async function getSignupPosters() {
  return fetchPosters(signupShowIds);
}

export const planOptions: PlanOption[] = [
  {
    value: "free",
    label: "Free",
    description: "Katalog seriálů a články zdarma",
    price: "0 Kč / měsíc",
  },
  {
    value: "plus",
    label: "Plus",
    description: "Přehrávání a pokračování ve sledování",
    price: "149 Kč / měsíc",
  },
  {
    value: "premium",
    label: "Premium",
    description: "Vyšší kvalita a více zařízení",
    price: "249 Kč / měsíc",
  },
  {
    value: "payg",
    label: "Pay-as-you-go",
    description: "Platíš jen když něco pustíš",
    price: "od 29 Kč",
  },
];
