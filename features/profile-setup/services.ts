import type { CurrentUser } from "@/features/auth/types";

type UpdateProfilePayload = {
  id: string;
  username: string;
  avatar: string;
  favoriteShows: string[];
};

export async function updateProfileSetup(
  payload: UpdateProfilePayload,
  endpoint: "/api/users" | "/api/users/profile" = "/api/users",
): Promise<CurrentUser> {
  const response = await fetch(endpoint, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        (endpoint === "/api/users/profile"
          ? "Nepodařilo se přeskočit nastavení."
          : "Nepodařilo se uložit profil."),
    );
  }

  return result.user as CurrentUser;
}
