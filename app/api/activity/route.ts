import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Activity } from '@/lib/db/schema';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { userId, type, duration, description, moodBefore, moodAfter } = body;

    const newActivity = new Activity({
      userId,
      type,
      duration,
      description,
      moodBefore,
      moodAfter,
      timestamp: new Date()
    });

    await newActivity.save();

    return NextResponse.json({
      success: true,
      activity: newActivity,
      message: 'Activity recorded successfully'
    });

  } catch (error) {
    console.error('Activity API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type');
    const limit = searchParams.get('limit') || '10';

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      );
    }

    let query: any = { userId };
    if (type) {
      query.type = type;
    }

    const activities = await Activity.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));

    return NextResponse.json({ activities });

  } catch (error) {
    console.error('Activity API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
