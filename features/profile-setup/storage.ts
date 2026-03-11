import {
  getCurrentUserFromStorage,
  saveCurrentUser,
} from "@/features/auth/storage";

export const getStoredCurrentUser = getCurrentUserFromStorage;
export const saveStoredCurrentUser = saveCurrentUser;
