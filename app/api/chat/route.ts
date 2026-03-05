import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body as { message?: string };

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string." },
        { status: 400 }
      );
    }

    if (!genAI) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not configured on the server." },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are Aura, a compassionate AI therapist. You provide empathetic, evidence-based mental health support. Be warm, non-judgmental, and focus on active listening. If the user shows signs of crisis, encourage professional help. Keep responses conversational and supportive.

User message: ${message}`;

    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text().trim();

    if (!aiResponse) {
      return NextResponse.json(
        { error: "Failed to generate response" },
        { status: 500 }
      );
    }

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}

