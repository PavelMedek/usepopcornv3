import { createClient } from "@/lib/supabase/client";
import type { CreatedUser, CurrentUser, ProfileRecord } from "./types";
import { mapProfileToCurrentUser } from "./utils";

export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient();

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(
      error.message === "Invalid login credentials"
        ? "Neplatný e-mail nebo heslo."
        : error.message,
    );
  }

  const user = authData.user;

  if (!user) {
    throw new Error("Nepodařilo se přihlásit.");
  }

  return user;
}

export async function getUserProfile(userId: string) {
  const supabase = createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single<ProfileRecord>();

  if (error || !profile) {
    throw new Error("Profil uživatele nebyl nalezen.");
  }

  return profile;
}

export async function createUser(user: CreatedUser): Promise<CurrentUser> {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Nepodařilo se vytvořit účet.");
  }

  return result.user as CurrentUser;
}

export async function loginUser(email: string, password: string) {
  const user = await signInWithEmail(email, password);
  const profile = await getUserProfile(user.id);

  return mapProfileToCurrentUser(user, profile);
}
