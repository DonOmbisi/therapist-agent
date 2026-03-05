import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/dbConfig";
import { activities } from "@/lib/db/schema";
import { desc, eq, and } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, name, duration, description, difficulty, feedback } = body;

    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { error: "User ID is required and must be a string." },
        { status: 400 }
      );
    }

    if (!type || typeof type !== "string") {
      return NextResponse.json(
        { error: "Activity type is required and must be a string." },
        { status: 400 }
      );
    }

    const result = await db.insert(activities).values({
      userId,
      type,
      name,
      duration,
      description,
      difficulty,
      feedback,
    } as any).returning();

    return NextResponse.json({
      success: true,
      data: result[0],
      message: "Activity recorded successfully",
    });
  } catch (error) {
    console.error("Activity API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const type = searchParams.get("type");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID required" },
        { status: 400 }
      );
    }

    let whereCondition = eq(activities.userId, userId);
    if (type) {
      whereCondition = and(whereCondition, eq(activities.type, type));
    }

    const activityList = await db
      .select()
      .from(activities)
      .where(whereCondition)
      .orderBy(desc(activities.timestamp))
      .limit(limit);

    return NextResponse.json({ activities: activityList });
  } catch (error) {
    console.error("Activity API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
