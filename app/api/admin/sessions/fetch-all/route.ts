import { ApiResponse } from "@/hooks/admin/use-users";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { endOfDay, startOfDay } from "date-fns";
import { NextResponse } from "next/server";

//TODO:
const ROUTE_NAME = "Fetch Sessions List";
const ROUTE_STATUS = 200;

export async function GET(request: Request) {
  try {
    const user = await currentUser();

    if (!user || !user.id || user.role !== "ADMIN") {
      return new NextResponse(ROUTE_NAME + ": Unauthorized: No Access", {
        status: 401,
      });
    }

    const { searchParams } = new URL(request.url || "");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "5", 10);
    const searchTerm = searchParams.get("searchTerm") || "";
    const roleFilter = searchParams.get("role") || "ALL";
    const sportFilter = searchParams.get("sport") || "ALL";
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");
    const startDate = startDateParam ? new Date(startDateParam) : undefined;
    const endDate = endDateParam ? new Date(endDateParam) : undefined;

    const whereClause: any = {};

    const response: ApiResponse = {
      payload: [],
      totalData: 0,
      totalPages: 0,
      currentPage: 1,
    };

    return NextResponse.json(response, {
      status: ROUTE_STATUS,
    });
  } catch (error: any) {
    console.log(error);

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
