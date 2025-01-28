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
