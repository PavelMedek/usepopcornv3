import type { CurrentUser } from "./types";

const CURRENT_USER_KEY = "currentUser";

export function saveCurrentUser(user: CurrentUser) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function getCurrentUserFromStorage(): CurrentUser | null {
  const stored = localStorage.getItem(CURRENT_USER_KEY);

  if (!stored) return null;

  try {
    return JSON.parse(stored) as CurrentUser;
  } catch {
    localStorage.removeItem(CURRENT_USER_KEY);
    return null;
  }
}
