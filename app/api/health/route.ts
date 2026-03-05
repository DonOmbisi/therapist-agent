import { NextResponse } from 'next/server';
import { db } from '@/lib/db/dbConfig';
import { users } from '@/lib/db/schema';

export async function GET() {
  try {
    // Test database connection with a simple query
    await db.select().from(users).limit(1);

    return NextResponse.json({
      status: 'ok',
      message: 'Aura3.0 API is running',
      timestamp: new Date().toISOString(),
      database: 'connected',
      version: '1.0.0'
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Database connection failed',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
