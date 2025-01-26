import { UserRole } from "@prisma/client";
import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
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
  role: z.enum([UserRole.TRAINER, UserRole.USER, UserRole.ADMIN]),
  email: z.string().email({
    message: "Must be a valid email!",
  }),
});

export const RegisterSchema = z
  .object({
    fullName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
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
    confirmPassword: z.string(),
    email: z.string().email({
      message: "Must be a valid email!",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export const LoginSchema = z.object({
  password: z.string().min(2, {
    message: "password must be at least 4 characters.",
  }),
  email: z.string().email({
    message: "Must be a valid email!",
  }),
});

export const NewPasswordSchema = z.object({
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
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Must be a valid email!",
  }),
});
