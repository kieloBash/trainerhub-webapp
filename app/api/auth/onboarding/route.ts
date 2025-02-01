import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { OnboardingSchema } from "@/schemas/auth.schema";
import { TrainerOnboardingSchema } from "@/schemas/user.schema";
import { NextResponse } from "next/server";

const ROUTE_NAME = "Onboard User";
const ROUTE_STATUS = 201;
const SUCCESS_MESSAGE = "Successfully Onboarded User!";

export async function POST(request: Request) {
  try {
    const user = await currentUser();

    if (!user || !user.id || user.role !== "TRAINER") {
      return new NextResponse(ROUTE_NAME + ": No Access", { status: 401 });
    }

    const body = await request.json();
    const validatedFields = TrainerOnboardingSchema.safeParse(body);

    if (!validatedFields.success) {
      return new NextResponse(ROUTE_NAME + ": Invalid fields", { status: 400 });
    }

    const fields = validatedFields.data;

    await db.user.update({
      where: { id: user.id },
      data: { isOnboarded: true },
    });

    await db.trainerProfile.update({
      where: {
        userId: user.id,
      },
      data: {
        workDays: fields.workDays,
        startTime: fields.startTime,
        endTime: fields.endTime,
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
