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

    const CURRENT = await db.user.findFirst({
      where: { email },
      select: { id: true, role: true },
    });

    await db.user.update({
      where: { email },
      data: {
        name: `${fName} ${lName}`,
        email,
        emailVerified: new Date(),
        image,

        isOnboarded: true,
      },
    });

    if (CURRENT?.role === "TRAINER") {
      await db.trainerProfile.update({
        where: {
          userId: CURRENT?.id,
        },
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
        },
      });
    } else if (CURRENT?.role === "USER") {
      await db.userProfile.update({
        where: {
          userId: CURRENT?.id,
        },
        data: {
          fName,
          lName,
          contactNumber,
          gender,
          location,
          dob: new Date(dob),

          bio,
          // sportId: sport,
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
