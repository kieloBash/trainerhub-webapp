import { Gender, UserRole } from "@prisma/client";
import { z } from "zod";

export const AdminCreateUserSchema = z.object({
  fName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
  role: z.enum([UserRole.TRAINER, UserRole.USER]),
  email: z.string().email({
    message: "Must be a valid email!",
  }),
  contactNumber: z.string(),
  dob: z.string(),
  location: z.string(),
  sport: z.string(),
  gender: z.enum(Object.keys(Gender) as [keyof typeof Gender]),
});
