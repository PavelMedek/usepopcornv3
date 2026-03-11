import type { PlanOption } from "@/components/auth/PlanSelect";

export const loginPosters = Array.from({ length: 12 }).map((_, i) => ({
  src: `https://picsum.photos/seed/login-${i}/600/900`,
}));

export const signupPosters = Array.from({ length: 12 }).map((_, i) => ({
  src: `https://picsum.photos/seed/signup-${i}/600/900`,
}));

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
