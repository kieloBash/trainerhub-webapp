"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({ where: { email } });
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    db.$disconnect();
  }
};

export const getUserById = async (id: string) => {
  try {
    return await db.user.findUnique({ where: { id } });
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    db.$disconnect();
  }
};

export const getTrainerById = async (id: string) => {
  try {
    return await db.user.findUnique({
      where: { id, role: "TRAINER" },
      select: { id: true, name: true, trainer: { include: { sport: true } } },
    });
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    db.$disconnect();
  }
};

export const getUserByIdAuth = async ({
  id,
  currentId,
}: {
  id: string;
  currentId?: string;
}) => {
  try {
    if (!currentId) return null;

    const currentUser = await db.user.findFirst({
      where: { id: currentId },
      select: { role: true },
    });

    if (!currentUser || !currentUser.role || currentUser.role !== "ADMIN")
      return null;

    return await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        trainee: { include: { sport: true } },
        trainer: { include: { sport: true } },
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    db.$disconnect();
  }
};

export const createAdminAccount = async () => {
  try {
    const existing = await getUserByEmail("admin@gmail.com");
    if (existing) return null;

    const password = await bcrypt.hash("User1234!", 10);
    return await db.user.create({
      data: {
        name: "Administrator",
        role: "ADMIN",
        email: "admin@gmail.com",
        emailVerified: new Date(),
        isOnboarded: true,
        password,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    db.$disconnect();
  }
};
