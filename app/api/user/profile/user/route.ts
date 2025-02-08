import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { AdminEditUserSchema, UserProfileSchema } from "@/schemas/user.schema";

const ROUTE_NAME = "Updated User";
const ROUTE_STATUS = 201;
const SUCCESS_MESSAGE = "Successfully Updated User!";

export async function POST(request: Request) {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return new NextResponse(ROUTE_NAME + ": No Access", { status: 401 });
    }

    const body = await request.json();
    const validatedFields = UserProfileSchema.safeParse(body);

    if (!validatedFields.success) {
      return new NextResponse(ROUTE_NAME + ": Invalid fields", { status: 400 });
    }

    const {
      newPassword,
      email,
      dob,
      fName,
      lName,
      location,
      gender,
      contactNumber,

      bio,
    } = validatedFields.data;

    const CURRENT = await db.user.findFirst({
      where: { email },
      select: { id: true, role: true },
    });
    let hashedPassword;

    if (newPassword) {
      hashedPassword = await bcrypt.hash(newPassword, 10);
    }

    const toUpdate = newPassword
      ? {
          name: `${fName} ${lName}`,
          email,
          password: hashedPassword,
        }
      : {
          name: `${fName} ${lName}`,
          email,
        };

    await db.user.update({
      where: { email },
      data: toUpdate,
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
