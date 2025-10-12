import { email, minLength, z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters long"),
  email: z.email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("Universty card is requiered"),
  password: z.string().min(8, "Password must be at least 8 characters long")
});

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters long")
});

export type SignInData = z.infer<typeof signInSchema>;
export type SignUpData = z.infer<typeof signUpSchema>;
