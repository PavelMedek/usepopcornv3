// "use client";

// import Link from "next/link";
// import { useEffect, useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { Controller, useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Check, Loader2 } from "lucide-react";

// const avatarOptions = [
//   "https://api.dicebear.com/9.x/adventurer/svg?seed=Nova",
//   "https://api.dicebear.com/9.x/adventurer/svg?seed=Pixel",
//   "https://api.dicebear.com/9.x/adventurer/svg?seed=Orion",
//   "https://api.dicebear.com/9.x/adventurer/svg?seed=Luna",
//   "https://api.dicebear.com/9.x/adventurer/svg?seed=Echo",
//   "https://api.dicebear.com/9.x/adventurer/svg?seed=Atlas",
//   "https://api.dicebear.com/9.x/adventurer/svg?seed=Vega",
//   "https://api.dicebear.com/9.x/adventurer/svg?seed=Blaze",
// ];

// const showOptions = [
//   {
//     id: "stranger-things",
//     title: "Stranger Things",
//     year: 2016,
//     image: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
//   },
//   {
//     id: "game-of-thrones",
//     title: "Game of Thrones",
//     year: 2011,
//     image: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
//   },
//   {
//     id: "the-boys",
//     title: "The Boys",
//     year: 2019,
//     image: "https://image.tmdb.org/t/p/w500/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg",
//   },
//   {
//     id: "chernobyl",
//     title: "Chernobyl",
//     year: 2019,
//     image: "https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg",
//   },
//   {
//     id: "the-last-of-us",
//     title: "The Last of Us",
//     year: 2023,
//     image: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
//   },
//   {
//     id: "dark",
//     title: "Dark",
//     year: 2017,
//     image: "https://image.tmdb.org/t/p/w500/5LoM1QnhQz0HiXXValiG3j4C7LA.jpg",
//   },
//   {
//     id: "loki",
//     title: "Loki",
//     year: 2021,
//     image: "https://image.tmdb.org/t/p/w500/voHUmluYmKyleFkTu3lOXQG702u.jpg",
//   },
//   {
//     id: "moon-knight",
//     title: "Moon Knight",
//     year: 2022,
//     image: "https://image.tmdb.org/t/p/w500/o06YvYI3T5FfM1j0sJ8sPNxA0uS.jpg",
//   },
//   {
//     id: "the-mandalorian",
//     title: "The Mandalorian",
//     year: 2019,
//     image: "https://image.tmdb.org/t/p/w500/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg",
//   },
// ];

// const profileSetupSchema = z.object({
//   username: z
//     .string()
//     .min(3, "Název profilu musí mít alespoň 3 znaky.")
//     .max(20, "Název profilu může mít maximálně 20 znaků."),
//   avatar: z.string().min(1, "Vyber profilový obrázek."),
//   favoriteShows: z
//     .array(z.string())
//     .min(3, "Vyber alespoň 3 oblíbené seriály."),
// });

// type ProfileSetupValues = z.infer<typeof profileSetupSchema>;

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

// export default function ProfileSetupPage() {
//   const router = useRouter();
//   const [user, setUser] = useState<CurrentUser | null>(null);
//   const [ready, setReady] = useState(false);
//   const [submitError, setSubmitError] = useState("");
//   const [saving, setSaving] = useState(false);

//   const form = useForm<ProfileSetupValues>({
//     resolver: zodResolver(profileSetupSchema),
//     defaultValues: {
//       username: "",
//       avatar: "",
//       favoriteShows: [],
//     },
//     mode: "onBlur",
//   });

//   useEffect(() => {
//     const stored = localStorage.getItem("currentUser");

//     if (!stored) {
//       router.replace("/signup");
//       return;
//     }

//     const parsed: CurrentUser = JSON.parse(stored);
//     setUser(parsed);

//     form.reset({
//       username: parsed.username ?? "",
//       avatar: parsed.avatar ?? avatarOptions[0],
//       favoriteShows: parsed.favoriteShows ?? [],
//     });

//     setReady(true);
//   }, [form, router]);

//   const selectedShows = form.watch("favoriteShows");
//   const selectedAvatar = form.watch("avatar");

//   const selectedCount = useMemo(
//     () => selectedShows?.length ?? 0,
//     [selectedShows],
//   );

//   const toggleShow = (showId: string) => {
//     const current = form.getValues("favoriteShows");
//     const exists = current.includes(showId);

//     if (exists) {
//       form.setValue(
//         "favoriteShows",
//         current.filter((id) => id !== showId),
//         { shouldValidate: true },
//       );
//       return;
//     }

//     form.setValue("favoriteShows", [...current, showId], {
//       shouldValidate: true,
//     });
//   };

//   const onSubmit = async (data: ProfileSetupValues) => {
//     if (!user) return;

//     try {
//       setSubmitError("");
//       setSaving(true);

//       const response = await fetch("/api/users", {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           id: user.id,
//           username: data.username,
//           avatar: data.avatar,
//           favoriteShows: data.favoriteShows,
//         }),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Nepodařilo se uložit profil.");
//       }

//       const updatedUser: CurrentUser = result.user;

//       localStorage.setItem("currentUser", JSON.stringify(updatedUser));
//       setUser(updatedUser);

//       router.push("/home");
//     } catch (error) {
//       console.error("Profile setup error:", error);
//       setSubmitError(
//         error instanceof Error
//           ? error.message
//           : "Nastala chyba při ukládání profilu.",
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const onSkip = async () => {
//     if (!user) {
//       router.push("/home");
//       return;
//     }

//     try {
//       setSubmitError("");
//       setSaving(true);

//       const fallbackUsername =
//         user.username?.trim() || `${user.firstName} ${user.lastName}`.trim();

//       const fallbackAvatar = user.avatar || avatarOptions[0];
//       const fallbackShows =
//         user.favoriteShows && user.favoriteShows.length >= 3
//           ? user.favoriteShows
//           : showOptions.slice(0, 3).map((show) => show.id);

//       const response = await fetch("/api/users/profile", {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           id: user.id,
//           username: fallbackUsername,
//           avatar: fallbackAvatar,
//           favoriteShows: fallbackShows,
//         }),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Nepodařilo se přeskočit nastavení.");
//       }

//       const updatedUser: CurrentUser = result.user;

//       localStorage.setItem("currentUser", JSON.stringify(updatedUser));
//       setUser(updatedUser);

//       router.push("/home");
//     } catch (error) {
//       console.error("Skip profile setup error:", error);
//       setSubmitError(
//         error instanceof Error
//           ? error.message
//           : "Nastala chyba při ukládání profilu.",
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (!ready) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-100">
//         <div className="text-sm text-zinc-400">Načítám profil…</div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-zinc-950 text-zinc-50">
//       <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
//         <div className="mb-10 flex items-center justify-between">
//           <Link href="/" className="text-lg font-semibold tracking-tight">
//             use<span className="text-amber-400">Popcorn</span>
//           </Link>

//           <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
//             Nastavení profilu
//           </div>
//         </div>

//         <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
//           <motion.section
//             initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
//             animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//             transition={{ duration: 0.5 }}
//             className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur md:p-8"
//           >
//             <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
//               👤 Profil jako na streamovací platformě
//             </p>

//             <h1 className="mt-5 text-4xl font-semibold tracking-tight">
//               Dokonči svůj profil
//             </h1>

//             <p className="mt-3 max-w-xl text-zinc-300">
//               Vyber název profilu, profilový obrázek a alespoň 3 oblíbené
//               seriály. Díky tomu bude usePopcorn působit víc jako tvoje vlastní
//               streamovací aplikace.
//             </p>

//             <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-950/40 p-5">
//               <p className="text-sm text-zinc-400">Aktuálně vybraný profil</p>

//               <div className="mt-4 flex items-center gap-4">
//                 <div className="h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
//                   {selectedAvatar ? (
//                     <img
//                       src={selectedAvatar}
//                       alt="Vybraný avatar"
//                       className="h-full w-full object-cover"
//                     />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center text-xs text-zinc-500">
//                       Avatar
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <p className="text-lg font-medium">
//                     {form.watch("username") || "Název profilu"}
//                   </p>
//                   <p className="text-sm text-zinc-400">
//                     {selectedCount} / 3+ oblíbených seriálů
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </motion.section>

//           <motion.section
//             initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
//             animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//             transition={{ duration: 0.55, delay: 0.05 }}
//             className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur md:p-8"
//           >
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-zinc-200">
//                   Název profilu
//                 </label>
//                 <input
//                   {...form.register("username")}
//                   type="text"
//                   placeholder="Třeba: Medek, Večerní profil, Seriálový geek"
//                   className={inputClass(!!form.formState.errors.username)}
//                   disabled={saving}
//                 />
//                 {form.formState.errors.username && (
//                   <p className="mt-2 text-sm text-rose-300">
//                     {form.formState.errors.username.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <p className="mb-3 text-sm font-medium text-zinc-200">
//                   Vyber profilový obrázek
//                 </p>

//                 <Controller
//                   control={form.control}
//                   name="avatar"
//                   render={({ field }) => (
//                     <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
//                       {avatarOptions.map((avatar) => {
//                         const active = field.value === avatar;

//                         return (
//                           <button
//                             key={avatar}
//                             type="button"
//                             onClick={() => field.onChange(avatar)}
//                             disabled={saving}
//                             className={[
//                               "group relative overflow-hidden rounded-2xl border transition",
//                               active
//                                 ? "border-amber-400 ring-2 ring-amber-400/30"
//                                 : "border-white/10 hover:border-white/20",
//                               saving ? "opacity-70" : "",
//                             ].join(" ")}
//                           >
//                             <img
//                               src={avatar}
//                               alt="Profilový avatar"
//                               className="aspect-square w-full bg-zinc-900 object-cover"
//                             />

//                             {active && (
//                               <div className="absolute inset-0 flex items-end justify-end p-2">
//                                 <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-zinc-950">
//                                   <Check size={16} />
//                                 </div>
//                               </div>
//                             )}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   )}
//                 />

//                 {form.formState.errors.avatar && (
//                   <p className="mt-2 text-sm text-rose-300">
//                     {form.formState.errors.avatar.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <div className="mb-3 flex items-center justify-between gap-4">
//                   <p className="text-sm font-medium text-zinc-200">
//                     Vyber alespoň 3 oblíbené seriály
//                   </p>
//                   <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
//                     {selectedCount} vybráno
//                   </span>
//                 </div>

//                 <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
//                   {showOptions.map((show) => {
//                     const active = selectedShows.includes(show.id);

//                     return (
//                       <button
//                         key={show.id}
//                         type="button"
//                         onClick={() => toggleShow(show.id)}
//                         disabled={saving}
//                         className={[
//                           "group relative overflow-hidden rounded-3xl border text-left transition",
//                           active
//                             ? "border-amber-400 ring-2 ring-amber-400/30"
//                             : "border-white/10 hover:border-white/20",
//                           saving ? "opacity-70" : "",
//                         ].join(" ")}
//                       >
//                         <img
//                           src={show.image}
//                           alt={show.title}
//                           className="aspect-[2/3] w-full object-cover"
//                         />

//                         <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/20 to-transparent" />

//                         <div className="absolute inset-x-0 bottom-0 p-4">
//                           <div className="flex items-end justify-between gap-3">
//                             <div>
//                               <p className="text-sm font-medium">
//                                 {show.title}
//                               </p>
//                               <p className="text-xs text-zinc-300">
//                                 {show.year}
//                               </p>
//                             </div>

//                             {active && (
//                               <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-zinc-950">
//                                 <Check size={16} />
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </button>
//                     );
//                   })}
//                 </div>

//                 {form.formState.errors.favoriteShows && (
//                   <p className="mt-3 text-sm text-rose-300">
//                     {form.formState.errors.favoriteShows.message}
//                   </p>
//                 )}
//               </div>

//               {submitError && (
//                 <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-200">
//                   {submitError}
//                 </div>
//               )}

//               <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
//                 <button
//                   type="button"
//                   onClick={onSkip}
//                   disabled={saving}
//                   className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-zinc-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
//                 >
//                   Přeskočit zatím
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
//                 >
//                   {saving ? (
//                     <>
//                       Ukládám <Loader2 className="animate-spin" size={16} />
//                     </>
//                   ) : (
//                     <>
//                       Dokončit profil <span>→</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </motion.section>
//         </div>
//       </div>
//     </main>
//   );
// }

// function inputClass(hasError?: boolean) {
//   return [
//     "w-full rounded-2xl border bg-zinc-950/40 px-4 py-3 text-sm text-zinc-100 outline-none transition",
//     "placeholder:text-zinc-500",
//     "focus:border-amber-400/50 focus:bg-zinc-950/60",
//     hasError ? "border-rose-400/40" : "border-white/10",
//   ].join(" ");
// }

import { Suspense } from "react";
import ProfileSetupPageClient from "./ProfileSetupPageClient";
import ProfileSetupPageLoader from "@/components/profile-setup/ProfileSetupPageLoader";

export default function ProfileSetupPage() {
  return (
    <Suspense fallback={<ProfileSetupPageLoader />}>
      <ProfileSetupPageClient />
    </Suspense>
  );
}
