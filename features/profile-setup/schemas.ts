import { z } from "zod";

export const profileSetupSchema = z.object({
  username: z
    .string()
    .min(3, "Název profilu musí mít alespoň 3 znaky.")
    .max(20, "Název profilu může mít maximálně 20 znaků."),
  avatar: z.string().min(1, "Vyber profilový obrázek."),
  favoriteShows: z
    .array(z.string())
    .min(3, "Vyber alespoň 3 oblíbené seriály."),
});

export type ProfileSetupValues = z.infer<typeof profileSetupSchema>;
