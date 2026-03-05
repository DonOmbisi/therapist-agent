import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/dbConfig";
import { healthMetrics } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, mood, intensity, notes, activities } = body;

    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { error: "User ID is required and must be a string." },
        { status: 400 }
      );
    }

    if (typeof intensity !== "number" || intensity < 0 || intensity > 10) {
      return NextResponse.json(
        { error: "Intensity is required and must be a number between 0 and 10." },
        { status: 400 }
      );
    }

    const result = await db.insert(healthMetrics).values({
      userId,
      metricType: "mood",
      value: { mood, intensity, notes, activities },
    }).returning();

    return NextResponse.json({
      success: true,
      data: result[0],
      message: "Mood recorded successfully",
    });
  } catch (error) {
    console.error("Mood API error:", error);
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
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID required" },
        { status: 400 }
      );
    }

    const moods = await db
      .select()
      .from(healthMetrics)
      .where(eq(healthMetrics.userId, userId))
      .orderBy(desc(healthMetrics.timestamp))
      .limit(limit);

    return NextResponse.json({ moods });
  } catch (error) {
    console.error("Mood API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
