import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { ChatSession } from '@/lib/db/schema';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { message, userId, sessionId } = body;

    // Simple AI response logic (you can enhance this with real AI)
    const aiResponse = generateAIResponse(message);

    // Save chat session
    let chatSession;
    if (sessionId) {
      chatSession = await ChatSession.findById(sessionId);
      if (chatSession) {
        chatSession.messages.push({
          role: 'user',
          content: message,
          timestamp: new Date()
        });
        chatSession.messages.push({
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date()
        });
        await chatSession.save();
      }
    } else {
      // Create new session
      chatSession = new ChatSession({
        userId,
        messages: [
          {
            role: 'user',
            content: message,
            timestamp: new Date()
          },
          {
            role: 'assistant',
            content: aiResponse,
            timestamp: new Date()
          }
        ],
        createdAt: new Date()
      });
      await chatSession.save();
    }

    return NextResponse.json({
      success: true,
      response: aiResponse,
      sessionId: chatSession._id,
      message: 'Chat response generated successfully'
    });

  } catch (error) {
    console.error('Chat API error:', error);
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
    const sessionId = searchParams.get('sessionId');
    const userId = searchParams.get('userId');

    if (sessionId) {
      const session = await ChatSession.findById(sessionId);
      if (!session) {
        return NextResponse.json(
          { error: 'Session not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ session });
    }

    if (userId) {
      const sessions = await ChatSession.find({ userId }).sort({ createdAt: -1 });
      return NextResponse.json({ sessions });
    }

    return NextResponse.json(
      { error: 'Session ID or User ID required' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Simple AI response generator (replace with real AI service)
function generateAIResponse(message: string): string {
  const responses = [
    "I understand how you're feeling. Can you tell me more about that?",
    "That sounds challenging. How long have you been experiencing this?",
    "I'm here to listen. What would be most helpful for you right now?",
    "Thank you for sharing that with me. How can I support you today?",
    "I hear you. Let's explore this together. What's on your mind?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}
