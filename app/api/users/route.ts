// import { NextResponse } from "next/server";
// import { promises as fs } from "fs";
// import path from "path";
// import { randomBytes, scryptSync } from "crypto";

// const filePath = path.join(process.cwd(), "data", "users.json");

// type StoredUser = {
//   id: string;
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
//   createdAt: string;
// };

// async function readUsers(): Promise<StoredUser[]> {
//   try {
//     const file = await fs.readFile(filePath, "utf8");
//     return JSON.parse(file);
//   } catch {
//     return [];
//   }
// }

// async function writeUsers(users: StoredUser[]) {
//   await fs.mkdir(path.dirname(filePath), { recursive: true });
//   await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf8");
// }

// function hashPassword(password: string) {
//   const salt = randomBytes(16).toString("hex");
//   const hashed = scryptSync(password, salt, 64).toString("hex");

//   return `${salt}:${hashed}`;
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const users = await readUsers();

//     const existingUser = users.find(
//       (user) => user.email.toLowerCase() === body.email.toLowerCase(),
//     );

//     if (existingUser) {
//       return NextResponse.json(
//         { message: "Uživatel s tímto e-mailem už existuje." },
//         { status: 409 },
//       );
//     }

//     const hashedPassword = hashPassword(body.password);

//     const newUser: StoredUser = {
//       id: crypto.randomUUID(),
//       firstName: body.firstName,
//       lastName: body.lastName,
//       email: body.email,
//       password: hashedPassword,
//       plan: body.plan,
//       paid: body.paid,
//       profileCompleted: body.profileCompleted,
//       username: body.username,
//       avatar: body.avatar,
//       favoriteShows: body.favoriteShows ?? [],
//       card: body.card ?? null,
//       createdAt: new Date().toISOString(),
//     };

//     users.push(newUser);
//     await writeUsers(users);

//     return NextResponse.json(
//       {
//         message: "Uživatel vytvořen.",
//         user: {
//           id: newUser.id,
//           firstName: newUser.firstName,
//           lastName: newUser.lastName,
//           email: newUser.email,
//           plan: newUser.plan,
//           paid: newUser.paid,
//           profileCompleted: newUser.profileCompleted,
//           username: newUser.username,
//           avatar: newUser.avatar,
//           favoriteShows: newUser.favoriteShows,
//           createdAt: newUser.createdAt,
//         },
//       },
//       { status: 201 },
//     );
//   } catch (error) {
//     console.error("POST /api/users error:", error);

//     return NextResponse.json(
//       { message: "Nepodařilo se vytvořit uživatele." },
//       { status: 500 },
//     );
//   }
// }

// export async function PATCH(req: Request) {
//   try {
//     const body = await req.json();

//     const { id, username, avatar, favoriteShows } = body;

//     if (!id) {
//       return NextResponse.json(
//         { message: "Chybí id uživatele." },
//         { status: 400 },
//       );
//     }

//     if (!username || String(username).trim().length < 3) {
//       return NextResponse.json(
//         { message: "Název profilu musí mít alespoň 3 znaky." },
//         { status: 400 },
//       );
//     }

//     if (!avatar) {
//       return NextResponse.json(
//         { message: "Musíš vybrat profilový obrázek." },
//         { status: 400 },
//       );
//     }

//     if (!Array.isArray(favoriteShows) || favoriteShows.length < 3) {
//       return NextResponse.json(
//         { message: "Vyber alespoň 3 oblíbené seriály." },
//         { status: 400 },
//       );
//     }

//     const users = await readUsers();
//     const userIndex = users.findIndex((user) => user.id === id);

//     if (userIndex === -1) {
//       return NextResponse.json(
//         { message: "Uživatel nebyl nalezen." },
//         { status: 404 },
//       );
//     }

//     const updatedUser: StoredUser = {
//       ...users[userIndex],
//       username: String(username).trim(),
//       avatar,
//       favoriteShows,
//       profileCompleted: true,
//     };

//     users[userIndex] = updatedUser;
//     await writeUsers(users);

//     return NextResponse.json(
//       {
//         message: "Profil byl úspěšně aktualizován.",
//         user: {
//           id: updatedUser.id,
//           firstName: updatedUser.firstName,
//           lastName: updatedUser.lastName,
//           email: updatedUser.email,
//           plan: updatedUser.plan,
//           paid: updatedUser.paid,
//           profileCompleted: updatedUser.profileCompleted,
//           username: updatedUser.username,
//           avatar: updatedUser.avatar,
//           favoriteShows: updatedUser.favoriteShows,
//           createdAt: updatedUser.createdAt,
//         },
//       },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("PATCH /api/users/profile error:", error);

//     return NextResponse.json(
//       { message: "Nepodařilo se uložit profil." },
//       { status: 500 },
//     );
//   }
// }
// import { NextResponse } from "next/server";
// import { createClient } from "@/lib/supabase/server";

// type Plan = "free" | "plus" | "premium" | "payg";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const {
//       firstName,
//       lastName,
//       email,
//       password,
//       plan,
//       paid,
//     }: {
//       firstName: string;
//       lastName: string;
//       email: string;
//       password: string;
//       plan: Plan;
//       paid: boolean;
//     } = body;

//     const supabase = await createClient();

//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     if (error) {
//       return NextResponse.json({ message: error.message }, { status: 400 });
//     }

//     const user = data.user;

//     if (!user) {
//       return NextResponse.json(
//         { message: "Uživatel nebyl vytvořen." },
//         { status: 400 },
//       );
//     }

//     const { error: profileError } = await supabase.from("profiles").insert({
//       id: user.id,
//       first_name: firstName,
//       last_name: lastName,
//       username: null,
//       avatar: null,
//       favorite_shows: [],
//       plan,
//       paid,
//       profile_completed: false,
//     });

//     if (profileError) {
//       return NextResponse.json(
//         { message: profileError.message },
//         { status: 400 },
//       );
//     }

//     return NextResponse.json(
//       {
//         message: "Uživatel vytvořen.",
//         user: {
//           id: user.id,
//           firstName,
//           lastName,
//           email: user.email,
//           plan,
//           paid,
//           profileCompleted: false,
//           username: null,
//           avatar: null,
//           favoriteShows: [],
//         },
//       },
//       { status: 201 },
//     );
//   } catch (error) {
//     console.error("POST /api/users error:", error);

//     return NextResponse.json(
//       { message: "Nepodařilo se vytvořit uživatele." },
//       { status: 500 },
//     );
//   }
// }

// export async function PATCH(req: Request) {
//   try {
//     const body = await req.json();

//     const {
//       id,
//       username,
//       avatar,
//       favoriteShows,
//     }: {
//       id: string;
//       username: string;
//       avatar: string;
//       favoriteShows: string[];
//     } = body;

//     if (!id) {
//       return NextResponse.json(
//         { message: "Chybí id uživatele." },
//         { status: 400 },
//       );
//     }

//     if (!username || username.trim().length < 3) {
//       return NextResponse.json(
//         { message: "Název profilu musí mít alespoň 3 znaky." },
//         { status: 400 },
//       );
//     }

//     if (!avatar) {
//       return NextResponse.json(
//         { message: "Musíš vybrat profilový obrázek." },
//         { status: 400 },
//       );
//     }

//     if (!Array.isArray(favoriteShows) || favoriteShows.length < 3) {
//       return NextResponse.json(
//         { message: "Vyber alespoň 3 oblíbené seriály." },
//         { status: 400 },
//       );
//     }

//     const supabase = await createClient();

//     const { data, error } = await supabase
//       .from("profiles")
//       .update({
//         username: username.trim(),
//         avatar,
//         favorite_shows: favoriteShows,
//         profile_completed: true,
//       })
//       .eq("id", id)
//       .select()
//       .single();

//     if (error) {
//       return NextResponse.json({ message: error.message }, { status: 400 });
//     }

//     return NextResponse.json(
//       {
//         message: "Profil byl úspěšně aktualizován.",
//         user: {
//           id: data.id,
//           firstName: data.first_name,
//           lastName: data.last_name,
//           email: null,
//           plan: data.plan,
//           paid: data.paid,
//           profileCompleted: data.profile_completed,
//           username: data.username,
//           avatar: data.avatar,
//           favoriteShows: data.favorite_shows ?? [],
//           createdAt: data.created_at,
//         },
//       },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("PATCH /api/users error:", error);

//     return NextResponse.json(
//       { message: "Nepodařilo se uložit profil." },
//       { status: 500 },
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { createClient } from "@/lib/supabase/server";

// type Plan = "free" | "plus" | "premium" | "payg";

// type MockCard = {
//   cardName: string;
//   cardNumber: string;
//   expiry: string;
//   cvc: string;
// };

// type CreateUserBody = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   plan: Plan;
//   paid: boolean;
//   card?: {
//     cardName?: string;
//     cardNumber?: string;
//     expiry?: string;
//     cvc?: string;
//   } | null;
// };

// type UpdateProfileBody = {
//   id: string;
//   username: string;
//   avatar: string;
//   favoriteShows: string[];
// };

// const MOCK_CARD_NAMES = [
//   "John Doe",
//   "Jane Smith",
//   "Alex Carter",
//   "Emily Johnson",
//   "Michael Brown",
//   "Olivia Davis",
//   "Daniel Wilson",
//   "Sophia Moore",
// ];

// function isPaidPlan(plan: Plan) {
//   return plan === "plus" || plan === "premium";
// }

// function randomInt(min: number, max: number) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function randomDigits(length: number) {
//   return Array.from({ length }, () => randomInt(0, 9)).join("");
// }

// function formatCardNumber(raw: string) {
//   return raw.match(/.{1,4}/g)?.join(" ") ?? raw;
// }

// function generateMockExpiry() {
//   const month = String(randomInt(1, 12)).padStart(2, "0");
//   const year = String(randomInt(27, 32));
//   return `${month}/${year}`;
// }

// function generateMockCard(): MockCard {
//   const cardName =
//     MOCK_CARD_NAMES[randomInt(0, MOCK_CARD_NAMES.length - 1)] ?? "John Doe";

//   return {
//     cardName,
//     cardNumber: formatCardNumber(randomDigits(16)),
//     expiry: generateMockExpiry(),
//     cvc: randomDigits(3),
//   };
// }

// export async function POST(req: Request) {
//   try {
//     const body = (await req.json()) as CreateUserBody;

//     const { firstName, lastName, email, password, plan, paid } = body;

//     if (
//       !firstName?.trim() ||
//       !lastName?.trim() ||
//       !email?.trim() ||
//       !password
//     ) {
//       return NextResponse.json(
//         { message: "Chybí povinné údaje pro registraci." },
//         { status: 400 },
//       );
//     }

//     const supabase = await createClient();

//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     if (error) {
//       return NextResponse.json({ message: error.message }, { status: 400 });
//     }

//     const user = data.user;

//     if (!user) {
//       return NextResponse.json(
//         { message: "Uživatel nebyl vytvořen." },
//         { status: 400 },
//       );
//     }

//     const mockCard = isPaidPlan(plan) ? generateMockCard() : null;

//     const { error: profileError } = await supabase.from("profiles").insert({
//       id: user.id,
//       first_name: firstName,
//       last_name: lastName,
//       username: null,
//       avatar: null,
//       favorite_shows: [],
//       plan,
//       paid,
//       profile_completed: false,
//       mock_card: mockCard,
//     });

//     if (profileError) {
//       return NextResponse.json(
//         { message: profileError.message },
//         { status: 400 },
//       );
//     }

//     return NextResponse.json(
//       {
//         message: "Uživatel vytvořen.",
//         user: {
//           id: user.id,
//           firstName,
//           lastName,
//           email: user.email,
//           plan,
//           paid,
//           profileCompleted: false,
//           username: null,
//           avatar: null,
//           favoriteShows: [],
//           createdAt: new Date().toISOString(),
//           mockCard,
//         },
//       },
//       { status: 201 },
//     );
//   } catch (error) {
//     console.error("POST /api/users error:", error);

//     return NextResponse.json(
//       { message: "Nepodařilo se vytvořit uživatele." },
//       { status: 500 },
//     );
//   }
// }

// export async function PATCH(req: Request) {
//   try {
//     const body = (await req.json()) as UpdateProfileBody;

//     const { id, username, avatar, favoriteShows } = body;

//     if (!id) {
//       return NextResponse.json(
//         { message: "Chybí id uživatele." },
//         { status: 400 },
//       );
//     }

//     if (!username || username.trim().length < 3) {
//       return NextResponse.json(
//         { message: "Název profilu musí mít alespoň 3 znaky." },
//         { status: 400 },
//       );
//     }

//     if (!avatar) {
//       return NextResponse.json(
//         { message: "Musíš vybrat profilový obrázek." },
//         { status: 400 },
//       );
//     }

//     if (!Array.isArray(favoriteShows) || favoriteShows.length < 3) {
//       return NextResponse.json(
//         { message: "Vyber alespoň 3 oblíbené seriály." },
//         { status: 400 },
//       );
//     }

//     const supabase = await createClient();

//     const { data, error } = await supabase
//       .from("profiles")
//       .update({
//         username: username.trim(),
//         avatar,
//         favorite_shows: favoriteShows,
//         profile_completed: true,
//       })
//       .eq("id", id)
//       .select()
//       .single();

//     if (error) {
//       return NextResponse.json({ message: error.message }, { status: 400 });
//     }

//     return NextResponse.json(
//       {
//         message: "Profil byl úspěšně aktualizován.",
//         user: {
//           id: data.id,
//           firstName: data.first_name,
//           lastName: data.last_name,
//           email: null,
//           plan: data.plan,
//           paid: data.paid,
//           profileCompleted: data.profile_completed,
//           username: data.username,
//           avatar: data.avatar,
//           favoriteShows: data.favorite_shows ?? [],
//           createdAt: data.created_at,
//           mockCard: data.mock_card ?? null,
//         },
//       },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("PATCH /api/users error:", error);

//     return NextResponse.json(
//       { message: "Nepodařilo se uložit profil." },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type Plan = "free" | "plus" | "premium" | "payg";
type Role = "admin" | "moderator" | "user";

type MockCard = {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

type CreateUserBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  plan: Plan;
  paid: boolean;
  card?: {
    cardName?: string;
    cardNumber?: string;
    expiry?: string;
    cvc?: string;
  } | null;
};

type UpdateProfileBody = {
  id: string;
  username: string;
  avatar: string;
  favoriteShows: string[];
};

const MOCK_CARD_NAMES = [
  "John Doe",
  "Jane Smith",
  "Alex Carter",
  "Emily Johnson",
  "Michael Brown",
  "Olivia Davis",
  "Daniel Wilson",
  "Sophia Moore",
];

function isPaidPlan(plan: Plan) {
  return plan === "plus" || plan === "premium";
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDigits(length: number) {
  return Array.from({ length }, () => randomInt(0, 9)).join("");
}

function formatCardNumber(raw: string) {
  return raw.match(/.{1,4}/g)?.join(" ") ?? raw;
}

function generateMockExpiry() {
  const month = String(randomInt(1, 12)).padStart(2, "0");
  const year = String(randomInt(27, 32));
  return `${month}/${year}`;
}

function generateMockCard(): MockCard {
  const cardName =
    MOCK_CARD_NAMES[randomInt(0, MOCK_CARD_NAMES.length - 1)] ?? "John Doe";

  return {
    cardName,
    cardNumber: formatCardNumber(randomDigits(16)),
    expiry: generateMockExpiry(),
    cvc: randomDigits(3),
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreateUserBody;

    const { firstName, lastName, email, password, plan, paid } = body;

    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !password
    ) {
      return NextResponse.json(
        { message: "Chybí povinné údaje pro registraci." },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    const { count, error: countError } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    if (countError) {
      return NextResponse.json(
        { message: countError.message },
        { status: 400 },
      );
    }

    const role: Role = !count || count === 0 ? "admin" : "user";

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const user = data.user;

    if (!user) {
      return NextResponse.json(
        { message: "Uživatel nebyl vytvořen." },
        { status: 400 },
      );
    }

    const mockCard = isPaidPlan(plan) ? generateMockCard() : null;

    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
      first_name: firstName,
      last_name: lastName,
      username: null,
      avatar: null,
      favorite_shows: [],
      plan,
      paid,
      profile_completed: false,
      mock_card: mockCard,
      role,
    });

    if (profileError) {
      return NextResponse.json(
        { message: profileError.message },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "Uživatel vytvořen.",
        user: {
          id: user.id,
          firstName,
          lastName,
          email: user.email,
          plan,
          paid,
          profileCompleted: false,
          username: null,
          avatar: null,
          favoriteShows: [],
          createdAt: new Date().toISOString(),
          mockCard,
          role,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/users error:", error);

    return NextResponse.json(
      { message: "Nepodařilo se vytvořit uživatele." },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = (await req.json()) as UpdateProfileBody;

    const { id, username, avatar, favoriteShows } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Chybí id uživatele." },
        { status: 400 },
      );
    }

    if (!username || username.trim().length < 3) {
      return NextResponse.json(
        { message: "Název profilu musí mít alespoň 3 znaky." },
        { status: 400 },
      );
    }

    if (!avatar) {
      return NextResponse.json(
        { message: "Musíš vybrat profilový obrázek." },
        { status: 400 },
      );
    }

    if (!Array.isArray(favoriteShows) || favoriteShows.length < 3) {
      return NextResponse.json(
        { message: "Vyber alespoň 3 oblíbené seriály." },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("profiles")
      .update({
        username: username.trim(),
        avatar,
        favorite_shows: favoriteShows,
        profile_completed: true,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        message: "Profil byl úspěšně aktualizován.",
        user: {
          id: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          email: null,
          plan: data.plan,
          paid: data.paid,
          profileCompleted: data.profile_completed,
          username: data.username,
          avatar: data.avatar,
          favoriteShows: data.favorite_shows ?? [],
          createdAt: data.created_at,
          mockCard: data.mock_card ?? null,
          role: data.role ?? "user",
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PATCH /api/users error:", error);

    return NextResponse.json(
      { message: "Nepodařilo se uložit profil." },
      { status: 500 },
    );
  }
}
