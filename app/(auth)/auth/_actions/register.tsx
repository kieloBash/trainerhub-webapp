"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/user";
import { generateVerificationToken } from "@/lib/tokens";
import { RegisterUserSchema } from "@/schemas/user.schema";

export const handleRegisterAccount = async (values: z.infer<typeof RegisterUserSchema>) => {
    const validatedFields = RegisterUserSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    try {
        const {
            email,
            password,
            dob,
            fName,
            lName,
            role,
            sport,
            location,
            gender,
            contactNumber,
        } = validatedFields.data;

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return { error: "Email already in use!" };
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.user.create({
            data: {
                role,
                email,
                name: `${fName} ${lName}`,
                location,
                gender,
                contactNumber,
                dateOfBirth: dob ? new Date(dob) : null,
                password: hashedPassword,
                lName,
                fName,
                sportId: sport,
                //add sport

                isOnboarded: true,
            },
        });

        const verificationToken = await generateVerificationToken(email);

        return { success: "Confirmation sent! Please verify your account first before you login! Thank you!", token: verificationToken.token };
    } catch (error) {
        console.log(error)
        return { error: "An error occured!" };
    }

};