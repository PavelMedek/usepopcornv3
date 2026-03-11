import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Zadej platný e-mail."),
  password: z.string().min(6, "Zadej heslo."),
});

export const signupSchema = z
  .object({
    firstName: z.string().min(2, "Zadej křestní jméno."),
    lastName: z.string().min(2, "Zadej příjmení."),
    email: z.string().email("Zadej platný e-mail."),
    password: z
      .string()
      .min(8, "Heslo musí mít alespoň 8 znaků.")
      .regex(/[A-Z]/, "Heslo musí obsahovat alespoň jedno velké písmeno.")
      .regex(/[0-9]/, "Heslo musí obsahovat alespoň jedno číslo."),
    confirmPassword: z.string(),
    plan: z.enum(["free", "plus", "premium", "payg"]),
    terms: z.boolean().refine((value) => value === true, {
      message: "Musíš souhlasit s podmínkami.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hesla se neshodují.",
    path: ["confirmPassword"],
  });

export const cardSchema = z.object({
  cardName: z.string().min(2, "Zadej jméno na kartě."),
  cardNumber: z.string().min(8, "Zadej číslo karty."),
  expiry: z.string().min(4, "Zadej platnost."),
  cvc: z.string().min(3, "Zadej CVC."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type CardFormValues = z.infer<typeof cardSchema>;
