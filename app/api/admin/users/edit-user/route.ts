import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { AdminEditUserSchema } from "@/schemas/user.schema";

const ROUTE_NAME = "Updated User";
const ROUTE_STATUS = 201;
const SUCCESS_MESSAGE = "Successfully Updated User!";

export async function POST(request: Request) {
  try {
    const user = await currentUser();

    if (!user || !user.id || user.role !== "ADMIN") {
      return new NextResponse(ROUTE_NAME + ": No Access", { status: 401 });
    }

    const body = await request.json();
    const validatedFields = AdminEditUserSchema.safeParse(body);

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
    } = validatedFields.data;

    await db.user.update({
      where: { email },
      data: {
        role,
        email,
        name: `${fName} ${lName}`,
        location,
        gender,
        contactNumber,
        dateOfBirth: dob ? new Date(dob) : null,
        // password: hashedPassword,
        lName,
        fName,
        //add sport

        isOnboarded: true,
        emailVerified: new Date(),
      },
    });

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
