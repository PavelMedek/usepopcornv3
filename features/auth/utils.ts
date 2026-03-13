import type { CardFormValues, SignupFormValues } from "./schemas";
import type { CreatedUser, CurrentUser, Plan, ProfileRecord } from "./types";

export function getPlanFromQuery(plan: string | null): Plan {
  if (
    plan === "free" ||
    plan === "plus" ||
    plan === "premium" ||
    plan === "payg"
  ) {
    return plan;
  }

  return "free";
}

export function isPaidPlan(plan: Plan) {
  return plan === "plus" || plan === "premium";
}

export function buildCreatedUser(
  signupData: SignupFormValues,
  paid: boolean,
  cardData?: CardFormValues | null,
): CreatedUser {
  return {
    firstName: signupData.firstName,
    lastName: signupData.lastName,
    email: signupData.email,
    password: signupData.password,
    plan: signupData.plan,
    paid,
    profileCompleted: false,
    username: null,
    avatar: null,
    favoriteShows: [],
    card: cardData
      ? {
          cardName: cardData.cardName,
          cardNumber: cardData.cardNumber,
          expiry: cardData.expiry,
          cvc: cardData.cvc,
        }
      : null,
  };
}

export function mapProfileToCurrentUser(
  user: { id: string; email?: string | null },
  profile: ProfileRecord,
): CurrentUser {
  return {
    id: user.id,
    firstName: profile.first_name,
    lastName: profile.last_name,
    email: user.email ?? "",
    plan: profile.plan,
    paid: profile.paid,
    profileCompleted: profile.profile_completed,
    username: profile.username,
    avatar: profile.avatar,
    favoriteShows: profile.favorite_shows ?? [],
    createdAt: profile.created_at,
    mockCard: profile.mock_card ?? null,
    role: profile.role,
  };
}
