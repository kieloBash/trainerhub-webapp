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

export const updateProfileUser = async (newImage: string, id: string) => {
  try {
    return await db.user.update({ where: { id }, data: { image: newImage } });
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    db.$disconnect();
  }
};

export const getTrainerById = async (id: string) => {
  try {
    const d = await db.user.findUnique({
      where: { id, role: "TRAINER" },
      select: {
        id: true,
        name: true,
        image: true,
        email: true,
        trainer: {
          include: {
            sports: { select: { sport: { select: { name: true } } } },
          },
        },
      },
    });

    return d
      ? {
          ...d,
          trainer: {
            ...d.trainer,
            sports: d.trainer?.sports.map((sport) => sport.sport.name),
          },
        }
      : null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    db.$disconnect();
  }
};

export const getTraineeById = async (id: string) => {
  try {
    return await db.user.findUnique({
      where: { id, role: "USER" },
      select: {
        id: true,
        email: true,
        name: true,
        trainee: { include: { sports: true } },
      },
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
  id?: string;
  currentId?: string;
}) => {
  try {
    if (!currentId || !id) return null;

    const currentUser = await db.user.findFirst({
      where: { id: currentId },
      select: { role: true },
    });

    if (!currentUser) return null;

    return await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        isOnboarded: true,
        trainee: true,
        trainer: true,
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
