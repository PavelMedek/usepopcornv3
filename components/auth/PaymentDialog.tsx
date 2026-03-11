"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Check, CreditCard, Loader2, LockKeyhole, User, X } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { CardFormValues, SignupFormValues } from "@/features/auth/schemas";
import FormField from "./FormField";
import TextInput from "./TextInput";
import SubmitButton from "./SubmitButton";

type PaymentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentState: "idle" | "loading" | "success";
  pendingSignupData: SignupFormValues | null;
  cardForm: UseFormReturn<CardFormValues>;
  onPay: (data: CardFormValues) => Promise<void>;
};

export default function PaymentDialog({
  open,
  onOpenChange,
  paymentState,
  pendingSignupData,
  cardForm,
  onPay,
}: PaymentDialogProps) {
  const isLocked = paymentState !== "idle";

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isLocked) {
          onOpenChange(nextOpen);
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[100] w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-white/10 bg-zinc-950/95 p-6 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.95)] backdrop-blur md:p-7">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
            <div className="absolute left-[-80px] top-[-80px] h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="absolute bottom-[-100px] right-[-100px] h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <Dialog.Title className="text-2xl font-semibold tracking-tight">
                  Dokončit platbu
                </Dialog.Title>
                <Dialog.Description className="mt-2 text-sm text-zinc-300">
                  Dokonči registraci pro plán{" "}
                  <span className="font-medium text-zinc-100">
                    {pendingSignupData?.plan === "plus"
                      ? "Plus"
                      : pendingSignupData?.plan === "premium"
                        ? "Premium"
                        : ""}
                  </span>
                  .
                </Dialog.Description>
              </div>

              {paymentState === "idle" && (
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
                    aria-label="Zavřít"
                  >
                    <X size={18} />
                  </button>
                </Dialog.Close>
              )}
            </div>

            {paymentState === "idle" && (
              <>
                <div className="mb-5 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
                  Tohle je pouze ukázková platební brána pro portfolio projekt.
                  Je úplně jedno, co do formuláře vyplníš — data se nikam
                  neodesílají do reálné platební brány. Platba vždy proběhne
                  úspěšně.
                </div>

                <form
                  onSubmit={cardForm.handleSubmit(onPay)}
                  className="space-y-4"
                >
                  <FormField
                    label="Jméno na kartě"
                    icon={<User size={18} />}
                    error={cardForm.formState.errors.cardName?.message}
                  >
                    <TextInput
                      {...cardForm.register("cardName")}
                      type="text"
                      placeholder="Jan Novák"
                      hasError={!!cardForm.formState.errors.cardName}
                      disabled={isLocked}
                    />
                  </FormField>

                  <FormField
                    label="Číslo karty"
                    icon={<CreditCard size={18} />}
                    error={cardForm.formState.errors.cardNumber?.message}
                  >
                    <TextInput
                      {...cardForm.register("cardNumber")}
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      hasError={!!cardForm.formState.errors.cardNumber}
                      disabled={isLocked}
                    />
                  </FormField>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      label="Platnost"
                      icon={<CreditCard size={18} />}
                      error={cardForm.formState.errors.expiry?.message}
                    >
                      <TextInput
                        {...cardForm.register("expiry")}
                        type="text"
                        placeholder="12/29"
                        hasError={!!cardForm.formState.errors.expiry}
                        disabled={isLocked}
                      />
                    </FormField>

                    <FormField
                      label="CVC"
                      icon={<LockKeyhole size={18} />}
                      error={cardForm.formState.errors.cvc?.message}
                    >
                      <TextInput
                        {...cardForm.register("cvc")}
                        type="text"
                        placeholder="123"
                        hasError={!!cardForm.formState.errors.cvc}
                        disabled={isLocked}
                      />
                    </FormField>
                  </div>

                  <SubmitButton
                    loading={false}
                    loadingText="Zpracovávám platbu"
                    disabled={isLocked}
                  >
                    <>
                      Zaplatit <span>→</span>
                    </>
                  </SubmitButton>
                </form>
              </>
            )}

            {paymentState === "loading" && (
              <div className="flex min-h-[260px] flex-col items-center justify-center gap-4 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <Loader2 className="animate-spin text-amber-300" size={28} />
                </div>
                <div>
                  <p className="text-lg font-medium">Zpracovávám platbu…</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Chvilku strpení, dokončujeme registraci.
                  </p>
                </div>
              </div>
            )}

            {paymentState === "success" && (
              <div className="flex min-h-[260px] flex-col items-center justify-center gap-4 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                  <Check size={30} />
                </div>
                <div>
                  <p className="text-lg font-medium">Platba proběhla úspěšně</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Dokončujeme vytvoření účtu…
                  </p>
                </div>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
