import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Mood } from '@/lib/db/schema';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { userId, mood, intensity, notes, activities } = body;

    const newMood = new Mood({
      userId,
      mood,
      intensity,
      notes,
      activities,
      timestamp: new Date()
    });

    await newMood.save();

    return NextResponse.json({
      success: true,
      mood: newMood,
      message: 'Mood recorded successfully'
    });

  } catch (error) {
    console.error('Mood API error:', error);
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
    const limit = searchParams.get('limit') || '10';

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      );
    }

    const moods = await Mood.find({ userId })
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));

    return NextResponse.json({ moods });

  } catch (error) {
    console.error('Mood API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
