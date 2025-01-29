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

export const AdminEditUserSchema = z.object({
  fName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  password: z.optional(
    z
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
      })
  ),
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

export const RegisterUserSchema = z
  .object({
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
    confirmPassword: z.string(),
    role: z.enum([UserRole.TRAINER, UserRole.USER]),
    email: z.string().email({
      message: "Must be a valid email!",
    }),
    contactNumber: z.string().min(1, {
      message: "Phone number is required",
    }),
    dob: z.string(),
    location: z.string().min(1, {
      message: "Location is required",
    }),
    sport: z.string().min(1, {
      message: "Sport is required",
    }),
    gender: z.enum(Object.keys(Gender) as [keyof typeof Gender]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });
