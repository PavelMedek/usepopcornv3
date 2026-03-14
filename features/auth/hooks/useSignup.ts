"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  cardSchema,
  signupSchema,
  type CardFormValues,
  type SignupFormValues,
} from "../schemas";
import { createUser } from "../services";
import { saveCurrentUser } from "../storage";
import { buildCreatedUser, getPlanFromQuery, isPaidPlan } from "../utils";
import { planOptions } from "../constants";

type SignupPhase =
  | "idle"
  | "opening-payment"
  | "processing-payment"
  | "creating-account"
  | "saving-session"
  | "redirecting";

export function useSignup() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentState, setPaymentState] = useState<
    "idle" | "loading" | "success"
  >("idle");
  const [pendingSignupData, setPendingSignupData] =
    useState<SignupFormValues | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [phase, setPhase] = useState<SignupPhase>("idle");

  const initialPlan = getPlanFromQuery(searchParams.get("plan"));

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      plan: initialPlan,
      terms: false,
    },
    mode: "onBlur",
  });

  const cardForm = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    form.setValue("plan", initialPlan, { shouldValidate: true });
  }, [form, initialPlan]);

  const selectedPlan = form.watch("plan");

  const selectedPlanMeta = useMemo(() => {
    return planOptions.find((plan) => plan.value === selectedPlan);
  }, [selectedPlan]);

  const updatePlanInQuery = (value: SignupFormValues["plan"]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("plan", value);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const finishSignup = async (
    signupData: SignupFormValues,
    paid: boolean,
    cardData?: CardFormValues | null,
  ) => {
    try {
      setSubmitError("");
      setPhase("creating-account");

      const payload = buildCreatedUser(signupData, paid, cardData ?? null);
      const currentUser = await createUser(payload);

      setPhase("saving-session");
      saveCurrentUser(currentUser);

      setPhase("redirecting");
      router.push("/profile");
    } catch (error) {
      console.error("Signup error:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Nastala chyba při registraci.",
      );
      setPhase("idle");
    }
  };

  const onSubmit = async (data: SignupFormValues) => {
    setSubmitError("");

    if (isPaidPlan(data.plan)) {
      setPhase("opening-payment");
      setPendingSignupData(data);
      setPaymentState("idle");
      cardForm.reset({
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvc: "",
      });
      setPaymentOpen(true);
      setPhase("idle");
      return;
    }

    await finishSignup(data, false, null);
  };

  const onPay = async (cardData: CardFormValues) => {
    if (!pendingSignupData) return;

    setSubmitError("");
    setPhase("processing-payment");
    setPaymentState("loading");

    await new Promise((resolve) => setTimeout(resolve, 1800));
    setPaymentState("success");

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPaymentOpen(false);

    await finishSignup(pendingSignupData, true, cardData);
  };

  const isBusy = phase !== "idle";

  const loadingTitle =
    phase === "opening-payment"
      ? "Připravuji platbu"
      : phase === "processing-payment"
        ? "Zpracovávám platbu"
        : phase === "creating-account"
          ? "Vytvářím účet"
          : phase === "saving-session"
            ? "Ukládám relaci"
            : phase === "redirecting"
              ? "Přesměrovávám"
              : "Načítám";

  const loadingDescription =
    phase === "opening-payment"
      ? "Připravuji platební krok."
      : phase === "processing-payment"
        ? "Dokončujeme platební simulaci."
        : phase === "creating-account"
          ? "Zakládám tvůj účet v aplikaci."
          : phase === "saving-session"
            ? "Ukládám currentUser do prohlížeče."
            : phase === "redirecting"
              ? "Za chvíli tě přesunu na další krok."
              : "Chvilku strpení.";

  return {
    form,
    cardForm,
    submitError,
    paymentOpen,
    setPaymentOpen,
    paymentState,
    pendingSignupData,
    selectedPlanMeta,
    updatePlanInQuery,
    onSubmit,
    onPay,
    isBusy,
    phase,
    loadingTitle,
    loadingDescription,
  };
}
