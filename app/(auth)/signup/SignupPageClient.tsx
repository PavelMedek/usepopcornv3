// "use client";

// import Link from "next/link";
// import { useEffect, useMemo, useState } from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { motion } from "framer-motion";
// import { Controller, useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as Dialog from "@radix-ui/react-dialog";
// import {
//   Check,
//   CreditCard,
//   Eye,
//   EyeOff,
//   Loader2,
//   LockKeyhole,
//   Mail,
//   User,
//   UserRound,
//   WalletCards,
//   X,
// } from "lucide-react";
// import PlanSelect, { PlanOption } from "@/components/auth/PlanSelect";

// const planOptions: PlanOption[] = [
//   {
//     value: "free",
//     label: "Free",
//     description: "Katalog seriálů a články zdarma",
//     price: "0 Kč / měsíc",
//   },
//   {
//     value: "plus",
//     label: "Plus",
//     description: "Přehrávání a pokračování ve sledování",
//     price: "149 Kč / měsíc",
//   },
//   {
//     value: "premium",
//     label: "Premium",
//     description: "Vyšší kvalita a více zařízení",
//     price: "249 Kč / měsíc",
//   },
//   {
//     value: "payg",
//     label: "Pay-as-you-go",
//     description: "Platíš jen když něco pustíš",
//     price: "od 29 Kč",
//   },
// ];

// const signupSchema = z
//   .object({
//     firstName: z.string().min(2, "Zadej křestní jméno."),
//     lastName: z.string().min(2, "Zadej příjmení."),
//     email: z.string().email("Zadej platný e-mail."),
//     password: z
//       .string()
//       .min(8, "Heslo musí mít alespoň 8 znaků.")
//       .regex(/[A-Z]/, "Heslo musí obsahovat alespoň jedno velké písmeno.")
//       .regex(/[0-9]/, "Heslo musí obsahovat alespoň jedno číslo."),
//     confirmPassword: z.string(),
//     plan: z.enum(["free", "plus", "premium", "payg"]),
//     terms: z.boolean().refine((value) => value === true, {
//       message: "Musíš souhlasit s podmínkami.",
//     }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Hesla se neshodují.",
//     path: ["confirmPassword"],
//   });

// const cardSchema = z.object({
//   cardName: z.string().min(2, "Zadej jméno na kartě."),
//   cardNumber: z.string().min(8, "Zadej číslo karty."),
//   expiry: z.string().min(4, "Zadej platnost."),
//   cvc: z.string().min(3, "Zadej CVC."),
// });

// type SignupFormValues = z.infer<typeof signupSchema>;
// type CardFormValues = z.infer<typeof cardSchema>;

// type CreatedUser = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   plan: "free" | "plus" | "premium" | "payg";
//   paid: boolean;
//   profileCompleted: boolean;
//   username: string | null;
//   avatar: string | null;
//   favoriteShows: string[];
//   card: {
//     cardName: string;
//     cardNumber: string;
//     expiry: string;
//     cvc: string;
//   } | null;
// };

// type CurrentUser = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   plan: "free" | "plus" | "premium" | "payg";
//   paid: boolean;
//   profileCompleted: boolean;
//   username: string | null;
//   avatar: string | null;
//   favoriteShows: string[];
//   createdAt: string;
// };

// const posters = Array.from({ length: 12 }).map((_, i) => ({
//   src: `https://picsum.photos/seed/signup-${i}/600/900`,
// }));

// function buildUserObject(
//   signupData: SignupFormValues,
//   paid: boolean,
//   cardData?: CardFormValues | null,
// ): CreatedUser {
//   return {
//     firstName: signupData.firstName,
//     lastName: signupData.lastName,
//     email: signupData.email,
//     password: signupData.password,
//     plan: signupData.plan,
//     paid,
//     profileCompleted: false,
//     username: null,
//     avatar: null,
//     favoriteShows: [],
//     card: cardData
//       ? {
//           cardName: cardData.cardName,
//           cardNumber: cardData.cardNumber,
//           expiry: cardData.expiry,
//           cvc: cardData.cvc,
//         }
//       : null,
//   };
// }

// export default function SignupPageClient() {
//   const [submitted, setSubmitted] = useState(false);
//   const [paymentOpen, setPaymentOpen] = useState(false);
//   const [paymentState, setPaymentState] = useState<
//     "idle" | "loading" | "success"
//   >("idle");
//   const [pendingSignupData, setPendingSignupData] =
//     useState<SignupFormValues | null>(null);
//   const [submitError, setSubmitError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const planFromQuery = searchParams.get("plan");
//   const initialPlan: SignupFormValues["plan"] =
//     planFromQuery === "free" ||
//     planFromQuery === "plus" ||
//     planFromQuery === "premium" ||
//     planFromQuery === "payg"
//       ? planFromQuery
//       : "free";

//   const form = useForm<SignupFormValues>({
//     resolver: zodResolver(signupSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       plan: initialPlan,
//       terms: false,
//     },
//     mode: "onBlur",
//   });

//   const cardForm = useForm<CardFormValues>({
//     resolver: zodResolver(cardSchema),
//     defaultValues: {
//       cardName: "",
//       cardNumber: "",
//       expiry: "",
//       cvc: "",
//     },
//     mode: "onBlur",
//   });

//   useEffect(() => {
//     form.setValue("plan", initialPlan, { shouldValidate: true });
//   }, [initialPlan, form]);

//   const selectedPlan = form.watch("plan");

//   const selectedPlanMeta = useMemo(() => {
//     return planOptions.find((plan) => plan.value === selectedPlan);
//   }, [selectedPlan]);

//   const finishSignup = async (
//     signupData: SignupFormValues,
//     paid: boolean,
//     cardData?: CardFormValues | null,
//   ) => {
//     try {
//       setSubmitError("");

//       const user = buildUserObject(signupData, paid, cardData ?? null);

//       const response = await fetch("/api/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Nepodařilo se vytvořit účet.");
//       }

//       const currentUser: CurrentUser = result.user;

//       localStorage.setItem("currentUser", JSON.stringify(currentUser));

//       router.push("/signup/profile");
//     } catch (error) {
//       console.error("Signup error:", error);
//       setSubmitError(
//         error instanceof Error
//           ? error.message
//           : "Nastala chyba při registraci.",
//       );
//     }
//   };

//   const onSubmit = async (data: SignupFormValues) => {
//     setSubmitError("");

//     if (data.plan === "plus" || data.plan === "premium") {
//       setPendingSignupData(data);
//       setPaymentState("idle");
//       cardForm.reset({
//         cardName: "",
//         cardNumber: "",
//         expiry: "",
//         cvc: "",
//       });
//       setPaymentOpen(true);
//       return;
//     }

//     await finishSignup(data, false, null);
//   };

//   const onPay = async (cardData: CardFormValues) => {
//     if (!pendingSignupData) return;

//     setPaymentState("loading");
//     setSubmitError("");

//     await new Promise((resolve) => setTimeout(resolve, 1800));
//     setPaymentState("success");

//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     setPaymentOpen(false);

//     await finishSignup(pendingSignupData, true, cardData);
//   };

//   return (
//     <main className="min-h-screen bg-zinc-950 text-zinc-50 lg:h-screen lg:overflow-hidden">
//       <div className="grid min-h-screen lg:h-screen lg:grid-cols-2">
//         <section className="relative hidden h-screen overflow-hidden border-r border-white/10 lg:block">
//           <div className="absolute inset-0">
//             <div className="grid h-full grid-cols-3 gap-3 p-6 opacity-70">
//               {posters.map((poster, i) => (
//                 <motion.div
//                   key={poster.src}
//                   initial={{ opacity: 0, y: 24 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.45, delay: i * 0.03 }}
//                   className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
//                 >
//                   <img
//                     src={poster.src}
//                     alt=""
//                     className="h-full w-full object-cover"
//                   />
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-zinc-950/20 via-zinc-950/30 to-zinc-950" />
//           <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/10 via-transparent to-zinc-950/80" />
//           <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-amber-400/15 blur-3xl" />
//           <div className="pointer-events-none absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-indigo-500/15 blur-3xl" />

//           <div className="relative z-10 flex h-full flex-col justify-between p-10">
//             <Link
//               href="/"
//               className="w-fit text-lg font-semibold tracking-tight"
//             >
//               use<span className="text-amber-400">Popcorn</span>
//             </Link>

//             <div className="max-w-xl">
//               <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
//                 🍿 Seriály napříč platformami
//               </p>

//               <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight">
//                 Vytvoř si účet a začni sledovat bez zbytečného hledání.
//               </h1>

//               <p className="mt-4 text-zinc-200">
//                 Katalog, epizody, články, watchlist a přehrávání na jednom
//                 místě.
//               </p>
//             </div>
//           </div>
//         </section>

//         <section className="relative min-h-screen overflow-y-auto lg:h-screen">
//           <div className="pointer-events-none absolute inset-0 overflow-hidden">
//             <div className="absolute left-[-120px] top-[10%] h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
//             <div className="absolute right-[-120px] top-[20%] h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
//             <div className="absolute bottom-[-160px] left-[30%] h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
//           </div>

//           <div className="relative z-10 flex min-h-screen items-start justify-center px-4 py-8 sm:px-6 lg:min-h-full lg:px-10 lg:py-10">
//             <motion.div
//               initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
//               animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//               transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//               className="w-full max-w-xl rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur md:p-8"
//             >
//               <div className="mb-8">
//                 <Link
//                   href="/"
//                   className="text-lg font-semibold tracking-tight lg:hidden"
//                 >
//                   use<span className="text-amber-400">Popcorn</span>
//                 </Link>

//                 <h2 className="mt-4 text-3xl font-semibold tracking-tight">
//                   Vytvořit účet
//                 </h2>
//                 <p className="mt-2 text-sm text-zinc-300">
//                   Vyber plán, vyplň údaje a pokračuj do usePopcorn.
//                 </p>
//               </div>

//               {submitted ? (
//                 <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5 text-sm text-emerald-200">
//                   Účet byl úspěšně vytvořen a currentUser byl uložen do local
//                   storage.
//                 </div>
//               ) : (
//                 <form
//                   onSubmit={form.handleSubmit(onSubmit)}
//                   className="space-y-5"
//                 >
//                   <div className="grid gap-4 sm:grid-cols-2">
//                     <Field
//                       label="Jméno"
//                       icon={<User size={18} />}
//                       error={form.formState.errors.firstName?.message}
//                     >
//                       <input
//                         {...form.register("firstName")}
//                         type="text"
//                         placeholder="Jan"
//                         className={inputClass(
//                           !!form.formState.errors.firstName,
//                         )}
//                       />
//                     </Field>

//                     <Field
//                       label="Příjmení"
//                       icon={<UserRound size={18} />}
//                       error={form.formState.errors.lastName?.message}
//                     >
//                       <input
//                         {...form.register("lastName")}
//                         type="text"
//                         placeholder="Novák"
//                         className={inputClass(!!form.formState.errors.lastName)}
//                       />
//                     </Field>
//                   </div>

//                   <Field
//                     label="E-mail"
//                     icon={<Mail size={18} />}
//                     error={form.formState.errors.email?.message}
//                   >
//                     <input
//                       {...form.register("email")}
//                       type="email"
//                       placeholder="jan@usepopcorn.app"
//                       className={inputClass(!!form.formState.errors.email)}
//                     />
//                   </Field>

//                   <div className="grid gap-4 sm:grid-cols-2">
//                     <Field
//                       label="Heslo"
//                       icon={<LockKeyhole size={18} />}
//                       error={form.formState.errors.password?.message}
//                     >
//                       <div className="relative">
//                         <input
//                           {...form.register("password")}
//                           type={showPassword ? "text" : "password"}
//                           placeholder="••••••••"
//                           className={inputClass(
//                             !!form.formState.errors.password,
//                             true,
//                           )}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword((prev) => !prev)}
//                           className="absolute inset-y-0 right-0 inline-flex items-center justify-center px-4 text-zinc-400 transition hover:text-zinc-200"
//                           aria-label={
//                             showPassword ? "Skrýt heslo" : "Zobrazit heslo"
//                           }
//                         >
//                           {showPassword ? (
//                             <EyeOff size={18} />
//                           ) : (
//                             <Eye size={18} />
//                           )}
//                         </button>
//                       </div>
//                     </Field>

//                     <Field
//                       label="Potvrzení hesla"
//                       icon={<LockKeyhole size={18} />}
//                       error={form.formState.errors.confirmPassword?.message}
//                     >
//                       <div className="relative">
//                         <input
//                           {...form.register("confirmPassword")}
//                           type={showConfirmPassword ? "text" : "password"}
//                           placeholder="••••••••"
//                           className={inputClass(
//                             !!form.formState.errors.confirmPassword,
//                             true,
//                           )}
//                         />
//                         <button
//                           type="button"
//                           onClick={() =>
//                             setShowConfirmPassword((prev) => !prev)
//                           }
//                           className="absolute inset-y-0 right-0 inline-flex items-center justify-center px-4 text-zinc-400 transition hover:text-zinc-200"
//                           aria-label={
//                             showConfirmPassword
//                               ? "Skrýt potvrzení hesla"
//                               : "Zobrazit potvrzení hesla"
//                           }
//                         >
//                           {showConfirmPassword ? (
//                             <EyeOff size={18} />
//                           ) : (
//                             <Eye size={18} />
//                           )}
//                         </button>
//                       </div>
//                     </Field>
//                   </div>

//                   <Field
//                     label="Vybraný plán"
//                     icon={<WalletCards size={18} />}
//                     error={form.formState.errors.plan?.message}
//                   >
//                     <Controller
//                       control={form.control}
//                       name="plan"
//                       render={({ field }) => (
//                         <PlanSelect
//                           value={field.value}
//                           onChange={(value) => {
//                             field.onChange(value);

//                             const params = new URLSearchParams(
//                               searchParams.toString(),
//                             );
//                             params.set("plan", value);

//                             router.replace(`${pathname}?${params.toString()}`, {
//                               scroll: false,
//                             });
//                           }}
//                           options={planOptions}
//                         />
//                       )}
//                     />

//                     <p className="mt-2 text-xs text-zinc-400">
//                       {selectedPlanMeta?.description}
//                     </p>
//                   </Field>

//                   <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
//                     <input
//                       {...form.register("terms")}
//                       type="checkbox"
//                       className="mt-1 h-4 w-4 rounded border-white/20 bg-zinc-900 text-amber-400 focus:ring-amber-400"
//                     />
//                     <span className="text-sm text-zinc-300">
//                       Souhlasím s podmínkami používání a zásadami ochrany
//                       soukromí.
//                     </span>
//                   </label>

//                   {form.formState.errors.terms && (
//                     <p className="text-sm text-rose-300">
//                       {form.formState.errors.terms.message}
//                     </p>
//                   )}

//                   {submitError && (
//                     <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-200">
//                       {submitError}
//                     </div>
//                   )}

//                   <button
//                     type="submit"
//                     className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 py-3.5 text-sm font-medium text-zinc-950 transition hover:bg-amber-300"
//                   >
//                     Pokračovat <span>→</span>
//                   </button>

//                   <p className="text-center text-sm text-zinc-400">
//                     Už máš účet?{" "}
//                     <Link
//                       href="/login"
//                       className="text-zinc-100 hover:text-amber-300"
//                     >
//                       Přihlásit se
//                     </Link>
//                   </p>
//                 </form>
//               )}
//             </motion.div>
//           </div>
//         </section>
//       </div>

//       <Dialog.Root open={paymentOpen} onOpenChange={setPaymentOpen}>
//         <Dialog.Portal>
//           <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm" />
//           <Dialog.Content className="fixed left-1/2 top-1/2 z-[100] w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-white/10 bg-zinc-950/95 p-6 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.95)] backdrop-blur md:p-7">
//             <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
//               <div className="absolute left-[-80px] top-[-80px] h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />
//               <div className="absolute bottom-[-100px] right-[-100px] h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
//             </div>

//             <div className="relative z-10">
//               <div className="mb-5 flex items-start justify-between gap-4">
//                 <div>
//                   <Dialog.Title className="text-2xl font-semibold tracking-tight">
//                     Dokončit platbu
//                   </Dialog.Title>
//                   <Dialog.Description className="mt-2 text-sm text-zinc-300">
//                     Dokonči registraci pro plán{" "}
//                     <span className="font-medium text-zinc-100">
//                       {pendingSignupData?.plan === "plus"
//                         ? "Plus"
//                         : pendingSignupData?.plan === "premium"
//                           ? "Premium"
//                           : ""}
//                     </span>
//                     .
//                   </Dialog.Description>
//                 </div>

//                 {paymentState === "idle" && (
//                   <Dialog.Close asChild>
//                     <button
//                       type="button"
//                       className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
//                       aria-label="Zavřít"
//                     >
//                       <X size={18} />
//                     </button>
//                   </Dialog.Close>
//                 )}
//               </div>

//               {paymentState === "idle" && (
//                 <>
//                   <div className="mb-5 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
//                     Tohle je pouze ukázková platební brána pro portfolio
//                     projekt. Je úplně jedno, co do formuláře vyplníš — data se
//                     nikam neodesílají do reálné platební brány. Platba vždy
//                     proběhne úspěšně.
//                   </div>

//                   <form
//                     onSubmit={cardForm.handleSubmit(onPay)}
//                     className="space-y-4"
//                   >
//                     <Field
//                       label="Jméno na kartě"
//                       icon={<User size={18} />}
//                       error={cardForm.formState.errors.cardName?.message}
//                     >
//                       <input
//                         {...cardForm.register("cardName")}
//                         type="text"
//                         placeholder="Jan Novák"
//                         className={inputClass(
//                           !!cardForm.formState.errors.cardName,
//                         )}
//                       />
//                     </Field>

//                     <Field
//                       label="Číslo karty"
//                       icon={<CreditCard size={18} />}
//                       error={cardForm.formState.errors.cardNumber?.message}
//                     >
//                       <input
//                         {...cardForm.register("cardNumber")}
//                         type="text"
//                         placeholder="4242 4242 4242 4242"
//                         className={inputClass(
//                           !!cardForm.formState.errors.cardNumber,
//                         )}
//                       />
//                     </Field>

//                     <div className="grid gap-4 sm:grid-cols-2">
//                       <Field
//                         label="Platnost"
//                         icon={<CreditCard size={18} />}
//                         error={cardForm.formState.errors.expiry?.message}
//                       >
//                         <input
//                           {...cardForm.register("expiry")}
//                           type="text"
//                           placeholder="12/29"
//                           className={inputClass(
//                             !!cardForm.formState.errors.expiry,
//                           )}
//                         />
//                       </Field>

//                       <Field
//                         label="CVC"
//                         icon={<LockKeyhole size={18} />}
//                         error={cardForm.formState.errors.cvc?.message}
//                       >
//                         <input
//                           {...cardForm.register("cvc")}
//                           type="text"
//                           placeholder="123"
//                           className={inputClass(
//                             !!cardForm.formState.errors.cvc,
//                           )}
//                         />
//                       </Field>
//                     </div>

//                     <button
//                       type="submit"
//                       className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 py-3.5 text-sm font-medium text-zinc-950 transition hover:bg-amber-300"
//                     >
//                       Zaplatit <span>→</span>
//                     </button>
//                   </form>
//                 </>
//               )}

//               {paymentState === "loading" && (
//                 <div className="flex min-h-[260px] flex-col items-center justify-center gap-4 text-center">
//                   <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
//                     <Loader2
//                       className="animate-spin text-amber-300"
//                       size={28}
//                     />
//                   </div>
//                   <div>
//                     <p className="text-lg font-medium">Zpracovávám platbu…</p>
//                     <p className="mt-1 text-sm text-zinc-400">
//                       Chvilku strpení, dokončujeme registraci.
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {paymentState === "success" && (
//                 <div className="flex min-h-[260px] flex-col items-center justify-center gap-4 text-center">
//                   <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
//                     <Check size={30} />
//                   </div>
//                   <div>
//                     <p className="text-lg font-medium">
//                       Platba proběhla úspěšně
//                     </p>
//                     <p className="mt-1 text-sm text-zinc-400">
//                       Dokončujeme vytvoření účtu…
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </Dialog.Content>
//         </Dialog.Portal>
//       </Dialog.Root>
//     </main>
//   );
// }

// function Field({
//   label,
//   error,
//   icon,
//   children,
// }: {
//   label: string;
//   error?: string;
//   icon?: React.ReactNode;
//   children: React.ReactNode;
// }) {
//   return (
//     <div>
//       <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-200">
//         {icon && <span className="text-zinc-400">{icon}</span>}
//         {label}
//       </label>
//       {children}
//       {error && <p className="mt-2 text-sm text-rose-300">{error}</p>}
//     </div>
//   );
// }

// function inputClass(hasError?: boolean, withRightIcon?: boolean) {
//   return [
//     "w-full rounded-2xl border bg-zinc-950/40 px-4 py-3 text-sm text-zinc-100 outline-none transition",
//     withRightIcon ? "pr-12" : "",
//     "placeholder:text-zinc-500",
//     "focus:border-amber-400/50 focus:bg-zinc-950/60",
//     hasError ? "border-rose-400/40" : "border-white/10",
//   ].join(" ");
// }
"use client";

"use client";

"use client";

import Link from "next/link";
import { Controller } from "react-hook-form";
import { LockKeyhole, Mail, User, UserRound, WalletCards } from "lucide-react";
import PlanSelect from "@/components/auth/PlanSelect";
import AuthShell from "@/components/auth/AuthShell";
import AuthPosterPanel from "@/components/auth/AuthPosterPanel";
import AuthCard from "@/components/auth/AuthCard";
import AuthBrand from "@/components/auth/AuthBrand";
import FormField from "@/components/auth/FormField";
import TextInput from "@/components/auth/TextInput";
import PasswordInput from "@/components/auth/PasswordInput";
import SubmitButton from "@/components/auth/SubmitButton";
import AuthErrorAlert from "@/components/auth/AuthErrorAlert";
import TermsCheckbox from "@/components/auth/TermsCheckbox";
import PaymentDialog from "@/components/auth/PaymentDialog";
import AuthLoadingOverlay from "@/components/auth/AuthLoadingOverlay";
import { signupPosters, planOptions } from "@/features/auth/constants";
import { useSignup } from "@/features/auth/hooks/useSignup";

export default function SignupPageClient() {
  const {
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
  } = useSignup();

  const isFormLocked = isBusy && !paymentOpen;
  const isPrimaryButtonLoading =
    phase === "creating-account" ||
    phase === "saving-session" ||
    phase === "redirecting";

  return (
    <>
      <AuthShell
        left={
          <AuthPosterPanel
            posters={signupPosters}
            gradientDirection="right"
            borderRight
          >
            <AuthBrand />

            <div className="max-w-xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
                🍿 Seriály napříč platformami
              </p>

              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight">
                Vytvoř si účet a začni sledovat bez zbytečného hledání.
              </h1>

              <p className="mt-4 text-zinc-200">
                Katalog, epizody, články, watchlist a přehrávání na jednom
                místě.
              </p>
            </div>
          </AuthPosterPanel>
        }
        right={
          <section className="relative min-h-screen overflow-y-auto lg:h-screen">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute left-[-120px] top-[10%] h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
              <div className="absolute right-[-120px] top-[20%] h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
              <div className="absolute bottom-[-160px] left-[30%] h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
            </div>

            <div className="relative z-10 flex min-h-screen items-start justify-center px-4 py-8 sm:px-6 lg:min-h-full lg:px-10 lg:py-10">
              <div className="relative w-full max-w-xl">
                <AuthCard>
                  <div className="mb-8">
                    <AuthBrand mobileOnly />

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                      Vytvořit účet
                    </h2>
                    <p className="mt-2 text-sm text-zinc-300">
                      Vyber plán, vyplň údaje a pokračuj do usePopcorn.
                    </p>
                  </div>

                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        label="Jméno"
                        icon={<User size={18} />}
                        error={form.formState.errors.firstName?.message}
                      >
                        <TextInput
                          {...form.register("firstName")}
                          type="text"
                          placeholder="Jan"
                          hasError={!!form.formState.errors.firstName}
                          disabled={isFormLocked}
                        />
                      </FormField>

                      <FormField
                        label="Příjmení"
                        icon={<UserRound size={18} />}
                        error={form.formState.errors.lastName?.message}
                      >
                        <TextInput
                          {...form.register("lastName")}
                          type="text"
                          placeholder="Novák"
                          hasError={!!form.formState.errors.lastName}
                          disabled={isFormLocked}
                        />
                      </FormField>
                    </div>

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
                        disabled={isFormLocked}
                      />
                    </FormField>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        label="Heslo"
                        icon={<LockKeyhole size={18} />}
                        error={form.formState.errors.password?.message}
                      >
                        <PasswordInput
                          {...form.register("password")}
                          hasError={!!form.formState.errors.password}
                          disabled={isFormLocked}
                        />
                      </FormField>

                      <FormField
                        label="Potvrzení hesla"
                        icon={<LockKeyhole size={18} />}
                        error={form.formState.errors.confirmPassword?.message}
                      >
                        <PasswordInput
                          {...form.register("confirmPassword")}
                          hasError={!!form.formState.errors.confirmPassword}
                          disabled={isFormLocked}
                        />
                      </FormField>
                    </div>

                    <FormField
                      label="Vybraný plán"
                      icon={<WalletCards size={18} />}
                      error={form.formState.errors.plan?.message}
                    >
                      <Controller
                        control={form.control}
                        name="plan"
                        render={({ field }) => (
                          <PlanSelect
                            value={field.value}
                            onChange={(value) => {
                              field.onChange(value);
                              updatePlanInQuery(value);
                            }}
                            options={planOptions}
                          />
                        )}
                      />

                      <p className="mt-2 text-xs text-zinc-400">
                        {selectedPlanMeta?.description}
                      </p>
                    </FormField>

                    <TermsCheckbox
                      registration={form.register("terms")}
                      error={form.formState.errors.terms?.message}
                      disabled={isFormLocked}
                    />

                    <AuthErrorAlert message={submitError} />

                    <SubmitButton
                      loading={isPrimaryButtonLoading}
                      loadingText="Pokračuji"
                      disabled={isFormLocked}
                    >
                      <>
                        Pokračovat <span>→</span>
                      </>
                    </SubmitButton>

                    <p className="text-center text-sm text-zinc-400">
                      Už máš účet?{" "}
                      <Link
                        href="/login"
                        className="text-zinc-100 hover:text-amber-300"
                      >
                        Přihlásit se
                      </Link>
                    </p>
                  </form>
                </AuthCard>

                <AuthLoadingOverlay
                  visible={isBusy && !paymentOpen}
                  title={loadingTitle}
                  description={loadingDescription}
                />
              </div>
            </div>
          </section>
        }
      />

      <PaymentDialog
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        paymentState={paymentState}
        pendingSignupData={pendingSignupData}
        cardForm={cardForm}
        onPay={onPay}
      />
    </>
  );
}
