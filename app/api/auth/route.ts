import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/dbConfig';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, action } = body;

    if (action === 'login') {
      // Simple login logic (you can enhance this)
      const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

      if (user.length === 0) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      // In production, add proper password hashing
      if (user[0].password !== password) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        user: {
          id: user[0].id,
          email: user[0].email,
          name: user[0].name
        }
      });
    }

    if (action === 'register') {
      // Check if user already exists
      const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

      if (existingUser.length > 0) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        );
      }

      // Create new user
      const newUser = await db.insert(users).values({
        email,
        password, // In production, hash this
        name: body.name || 'User',
        createdAt: new Date()
      }).returning();

      return NextResponse.json({
        success: true,
        user: {
          id: newUser[0].id,
          email: newUser[0].email,
          name: newUser[0].name
        }
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
