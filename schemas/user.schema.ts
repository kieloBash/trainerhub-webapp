import { Gender, UserRole } from "@prisma/client";
import { z } from "zod";

export const AdminCreateUserSchema = z
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
    role: z.enum([UserRole.TRAINER, UserRole.USER]),
    email: z.string().email({
      message: "Must be a valid email!",
    }),
    contactNumber: z.string(),
    dob: z.string(),
    location: z.string(),
    sport: z.string(),
    gender: z.enum(Object.keys(Gender) as [keyof typeof Gender]),
    bio: z.string(),
    image: z.string().optional(),

    careerPath: z.string().optional(),
    highlights: z.string().optional(),
    focus: z.string().optional(),
    commission: z.number().optional(),
  })
  .refine(
    (data) =>
      data.role !== UserRole.TRAINER ||
      (data.careerPath?.trim() &&
        data.highlights?.trim() &&
        data.focus?.trim() &&
        data.commission !== undefined),
    {
      message:
        "Career path, highlights, focus, and commission are required for trainers.",
      path: ["careerPath"], // Error will be linked to careerPath, but applies to all
    }
  );

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
  email: z.string().email({
    message: "Must be a valid email!",
  }),
  contactNumber: z.string(),
  dob: z.string(),
  location: z.string(),
  sport: z.string(),
  gender: z.enum(Object.keys(Gender) as [keyof typeof Gender]),

  bio: z.string(),
  image: z.string().optional(),

  careerPath: z.string().optional(),
  highlights: z.string().optional(),
  focus: z.string().optional(),
  commission: z.number().optional(),
});

export const RegisterUserSchema = z
  .object({
    image: z.string().optional(),
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

export const TrainerOnboardingSchema = z.object({
  workDays: z.array(
    z.enum([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ])
  ),
  startTime: z.string(),
  endTime: z.string(),
});
