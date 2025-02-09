import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
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

    const trainerProfile = await db.trainerProfile.findFirst({
      where: { userId: user.id },
      select: { id: true },
    });

    if (!trainerProfile) {
      return new NextResponse(ROUTE_NAME + ": No Profile Found!", {
        status: 400,
      });
    }

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
        yearsOfExperience: fields.yearsOfExperience,
        level: fields.level,
      },
    });

    if (fields.specializations.length > 0) {
      await db.specializationTrainer.create({
        data: {
          sportId: fields.specializations[0].sportId,
          trainerId: trainerProfile.id,
          certification: fields.specializations[0].image,
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
