export type Plan = "free" | "plus" | "premium" | "payg";

export type MockCard = {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

export type CreatedUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  plan: Plan;
  paid: boolean;
  profileCompleted: boolean;
  username: string | null;
  avatar: string | null;
  favoriteShows: string[];
  card: {
    cardName: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
  } | null;
};

export type CurrentUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  plan: Plan;
  paid: boolean;
  profileCompleted: boolean;
  username: string | null;
  avatar: string | null;
  favoriteShows: string[];
  createdAt: string;
  mockCard: MockCard | null;
};

export type ProfileRecord = {
  id: string;
  first_name: string;
  last_name: string;
  plan: Plan;
  paid: boolean;
  profile_completed: boolean;
  username: string | null;
  avatar: string | null;
  favorite_shows: string[] | null;
  created_at: string;
  mock_card: MockCard | null;
};
