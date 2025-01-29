import { ApiResponse } from "@/hooks/admin/use-users";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

const ROUTE_NAME = "Fetch Sports List";
const ROUTE_STATUS = 200;

export async function GET(request: Request) {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return new NextResponse(ROUTE_NAME + ": Unauthorized: No Access", {
        status: 401,
      });
    }

    const { searchParams } = new URL(request.url || "");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "5", 10);
    const searchTerm = searchParams.get("searchTerm") || "";
    const filter = searchParams.get("filter") || "ALL";

    const whereClause: any = {};

    const response: ApiResponse = {
      payload: [],
      totalData: 0,
      totalPages: 0,
      currentPage: 1,
    };

    const [data, totalData] = await Promise.all([
      await db.sport.findMany({
        ...(filter !== "ALL" && {
          skip: (page - 1) * limit,
          take: limit,
        }), //have limit if not all
        where: whereClause,
        select: {
          id: true,
          name: true,
        },
        orderBy: { name: "asc" },
      }),
      await db.sport.count({ where: whereClause }),
    ]);

    const formatData = data.map((d) => {
      return {
        ...d,
      };
    });

    response.payload = (formatData as any[]) ?? [];
    response.totalData = totalData;
    response.totalPages = Math.ceil(totalData / limit);
    response.currentPage = page;

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
