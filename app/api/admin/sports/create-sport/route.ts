import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { AdminCreateSportSchema } from "@/schemas/sport.schema";

const ROUTE_NAME = "Create Sport";
const ROUTE_STATUS = 201;
const SUCCESS_MESSAGE = "Successfully Created Sport!";

export async function POST(request: Request) {
  try {
    const user = await currentUser();

    if (!user || !user.id || user.role !== "ADMIN") {
      return new NextResponse(ROUTE_NAME + ": No Access", { status: 401 });
    }

    const body = await request.json();
    const validatedFields = AdminCreateSportSchema.safeParse(body);

    if (!validatedFields.success) {
      return new NextResponse(ROUTE_NAME + ": Invalid fields", { status: 400 });
    }

    const { name } = validatedFields.data;

    const existing = await db.sport.findFirst({ where: { name } });
    if (existing) {
      return new NextResponse(ROUTE_NAME + ": Sport already exists!", {
        status: 400,
      });
    }

    const newSport = await db.sport.create({ data: { name } });

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
