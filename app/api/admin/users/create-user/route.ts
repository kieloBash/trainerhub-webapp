import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/lib/user";
import { AdminCreateUserSchema } from "@/schemas/user.schema";

const ROUTE_NAME = "Create User";
const ROUTE_STATUS = 201;
const SUCCESS_MESSAGE = "Successfully Created User!";

export async function POST(request: Request) {
  try {
    const user = await currentUser();

    if (!user || !user.id || user.role !== "ADMIN") {
      return new NextResponse(ROUTE_NAME + ": No Access", { status: 401 });
    }

    const body = await request.json();
    const validatedFields = AdminCreateUserSchema.safeParse(body);

    if (!validatedFields.success) {
      return new NextResponse(ROUTE_NAME + ": Invalid fields", { status: 400 });
    }

    const {
      password,
      email,
      dob,
      fName,
      lName,
      role,
      sport,
      location,
      gender,
      contactNumber,
      image,

      bio,
      highlights,
      careerPath,
      focus,
      commission,
    } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password as any, 10);
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return new NextResponse(ROUTE_NAME + ": Email already exists!", {
        status: 400,
      });
    }

    const newUser = await db.user.create({
      data: {
        name: `${fName} ${lName}`,
        email,
        emailVerified: new Date(),
        password: hashedPassword,
        image,
        role,

        isOnboarded: true,
      },
    });

    if (role === "TRAINER") {
      const newTrainer = await db.trainerProfile.create({
        data: {
          fName,
          lName,
          contactNumber,
          gender,
          location,
          dob: new Date(dob),

          bio,
          careerPath: careerPath ?? "",
          highlights: highlights ?? "",
          focus: focus ?? "",
          // sportId: sport,
          userId: newUser.id,
        },
      });
    } else if (role === "USER") {
      const newTrainee = await db.userProfile.create({
        data: {
          fName,
          lName,
          contactNumber,
          gender,
          location,
          dob: new Date(dob),

          bio,
          // sportId: sport,
          userId: newUser.id,
        },
      });
    }

    return new NextResponse(SUCCESS_MESSAGE, { status: ROUTE_STATUS });
  } catch (error: any) {
    console.error("Error: " + ROUTE_NAME, error);

    const isDebug = process.env.NEXT_PUBLIC_DEBUG !== "production";
    const errorResponse = {
      message: "Internal Error: " + ROUTE_NAME,
      ...(isDebug && {
        stack: error instanceof Error ? error.stack : "Unknown stack trace",
      }),
    };
    return new NextResponse(JSON.stringify(errorResponse), { status: 500 });
  }
}
