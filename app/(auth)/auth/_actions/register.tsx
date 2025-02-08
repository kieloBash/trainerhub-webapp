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
            fName,
            lName,
            image,
            role,

            dob,
            sports,
            location,
            gender,
            contactNumber,
        } = validatedFields.data;

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return { error: "Email already in use!" };
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.user.create({
            data: {
                name: `${fName} ${lName}`,
                email,
                password: hashedPassword,
                image,
                role,

                isOnboarded: role === "TRAINER" ? false : true,
            },
        });

        if (role === "USER") {
            const newTraineeProfile = await db.userProfile.create({
                data: {
                    fName,
                    lName,
                    contactNumber,
                    gender,
                    location,
                    dob: new Date(dob),

                    bio: `Welcome to our platform! Please update your bio.`,
                    userId: newUser.id,
                },
            });
            await db.userToSport.createMany({
                data: sports.map((sportId) => {
                    return {
                        sportId,
                        userProfileId: newTraineeProfile.id,
                    }
                })
            })
        } else if (role === "TRAINER") {
            const newTrainerProfile = await db.trainerProfile.create({
                data: {
                    fName,
                    lName,
                    contactNumber,
                    gender,
                    location,
                    dob: new Date(dob),

                    bio: `Welcome to our platform! Please update your bio.`,
                    careerPath: "Please add a career path",
                    highlights: "Please add a highlight",
                    focus: "Please add what you are focused on",
                    userId: newUser.id,
                },
            });
            await db.trainerToSport.createMany({
                data: sports.map((sportId) => {
                    return {
                        sportId,
                        trainerProfileId: newTrainerProfile.id,
                    }
                })
            })
        }

        const verificationToken = await generateVerificationToken(email);

        return { success: "Confirmation sent! Please verify your account first before you login! Thank you!", token: verificationToken.token };
    } catch (error) {
        console.log(error)
        return { error: "An error occured!" };
    }

};