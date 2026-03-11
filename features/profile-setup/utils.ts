import type { CurrentUser } from "@/features/auth/types";
import { avatarOptions, showOptions } from "./constants";

export function getFallbackUsername(user: CurrentUser) {
  return user.username?.trim() || `${user.firstName} ${user.lastName}`.trim();
}

export function getFallbackAvatar(user: CurrentUser) {
  return user.avatar || avatarOptions[0];
}

export function getFallbackShows(user: CurrentUser) {
  return user.favoriteShows && user.favoriteShows.length >= 3
    ? user.favoriteShows
    : showOptions.slice(0, 3).map((show) => show.id);
}

export function toggleFavoriteShow(current: string[], showId: string) {
  const exists = current.includes(showId);

  if (exists) {
    return current.filter((id) => id !== showId);
  }

  return [...current, showId];
}
