import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";

type MockCard = {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

type Role = "admin" | "moderator" | "user";

type ProfileRow = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  avatar: string | null;
  favorite_shows: string[] | null;
  plan: string | null;
  paid: boolean | null;
  profile_completed: boolean | null;
  created_at: string | null;
  mock_card: MockCard | null;
  role: Role | null;
};

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const typedProfile = profile as ProfileRow | null;

  if (profileError || !typedProfile) {
    redirect("/signup/profile");
  }

  const displayName =
    typedProfile.username ||
    [typedProfile.first_name, typedProfile.last_name]
      .filter(Boolean)
      .join(" ") ||
    user.email ||
    "Uživatel";

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <Link href="/home" className="text-lg font-semibold tracking-tight">
            use<span className="text-amber-400">Popcorn</span>
          </Link>

          <LogoutButton />
        </div>

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur md:p-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
              👤 Tvůj profil
            </p>

            <div className="mt-6 flex flex-col items-center text-center">
              <div className="h-28 w-28 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                {typedProfile.avatar ? (
                  <img
                    src={typedProfile.avatar}
                    alt={displayName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
                    Bez avatara
                  </div>
                )}
              </div>

              <h1 className="mt-5 text-2xl font-semibold tracking-tight">
                {displayName}
              </h1>

              <p className="mt-2 text-sm text-zinc-400">{user.email}</p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <div className="rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
                  {(typedProfile.plan || "free").toUpperCase()}
                </div>

                <div className="rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-200">
                  {(typedProfile.role || "user").toUpperCase()}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Informace o účtu
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoCard label="ID uživatele" value={user.id} />
              <InfoCard label="E-mail" value={user.email ?? "Nevyplněno"} />
              <InfoCard
                label="Jméno"
                value={typedProfile.first_name ?? "Nevyplněno"}
              />
              <InfoCard
                label="Příjmení"
                value={typedProfile.last_name ?? "Nevyplněno"}
              />
              <InfoCard
                label="Název profilu"
                value={typedProfile.username ?? "Nevyplněno"}
              />
              <InfoCard
                label="Plán"
                value={typedProfile.plan ?? "Nevyplněno"}
              />
              <InfoCard label="Role" value={typedProfile.role ?? "user"} />
              <InfoCard
                label="Zaplaceno"
                value={typedProfile.paid ? "Ano" : "Ne"}
              />
              <InfoCard
                label="Profil dokončen"
                value={typedProfile.profile_completed ? "Ano" : "Ne"}
              />
              <InfoCard
                label="Vytvořeno"
                value={
                  typedProfile.created_at
                    ? new Date(typedProfile.created_at).toLocaleString("cs-CZ")
                    : "Nevyplněno"
                }
              />
              <InfoCard
                label="Potvrzený e-mail"
                value={user.email_confirmed_at ? "Ano" : "Ne"}
              />
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium">Oblíbené seriály</h3>

              {typedProfile.favorite_shows &&
              typedProfile.favorite_shows.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-3">
                  {typedProfile.favorite_shows.map((show) => (
                    <span
                      key={show}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200"
                    >
                      {show}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-zinc-400">
                  Zatím nemáš vybrané žádné oblíbené seriály.
                </p>
              )}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium">Uložená platební karta</h3>

              {typedProfile.mock_card ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <InfoCard
                    label="Jméno na kartě"
                    value={typedProfile.mock_card.cardName}
                  />
                  <InfoCard
                    label="Číslo karty"
                    value={typedProfile.mock_card.cardNumber}
                  />
                  <InfoCard
                    label="Platnost"
                    value={typedProfile.mock_card.expiry}
                  />
                  <InfoCard label="CVC" value={typedProfile.mock_card.cvc} />
                </div>
              ) : (
                <p className="mt-4 text-sm text-zinc-400">
                  Pro tento účet není uložená žádná platební karta.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
      <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-2 break-words text-sm text-zinc-100">{value}</p>
    </div>
  );
}
