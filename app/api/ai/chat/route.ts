import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, userId, conversationHistory = [] } = body;

    if (!message || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create system prompt for empathetic AI companion
    const systemPrompt = `You are Luna, an empathetic AI companion in EchoSphere, a social connection app for people experiencing loneliness or social isolation.

Your personality:
- Warm, understanding, and non-judgmental
- Supportive and encouraging
- Uses simple, conversational language
- Avoids clinical or overly formal language
- Focuses on emotional support and practical advice
- Encourages positive social connections
- Reminds users they're not alone

Guidelines:
- Always respond with empathy first
- Ask open-ended questions to encourage sharing
- Suggest connecting with others when appropriate
- Keep responses concise but meaningful
- End with a supportive closing
- Never give medical advice or diagnose conditions

Current user context: This user is seeking connection and support.`;

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-10).map((msg: any) => ({ // Keep last 10 messages for context
        role: msg.isAI ? 'assistant' : 'user',
        content: msg.message
      })),
      { role: 'user', content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 300,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0]?.message?.content || 'I\'m here to listen. How are you feeling right now?';

    return NextResponse.json({
      data: {
        response: aiResponse,
        timestamp: new Date(),
        sentiment: analyzeSentiment(message)
      },
      success: true
    });
  } catch (error) {
    console.error('Error with AI chat:', error);

    // Fallback response if OpenAI fails
    const fallbackResponses = [
      "I'm here to listen. What's been on your mind lately?",
      "Thank you for sharing that with me. How can I support you right now?",
      "Your feelings are completely valid. Would you like to tell me more?",
      "I appreciate you opening up. What's one thing that's been difficult for you recently?"
    ];

    const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

    return NextResponse.json({
      data: {
        response: fallbackResponse,
        timestamp: new Date(),
        sentiment: 'neutral',
        fallback: true
      },
      success: true
    });
  }
}

function analyzeSentiment(message: string): 'positive' | 'neutral' | 'negative' {
  const lowerMessage = message.toLowerCase();

  const positiveWords = ['good', 'great', 'happy', 'excited', 'wonderful', 'amazing', 'love', 'thank', 'grateful'];
  const negativeWords = ['sad', 'bad', 'terrible', 'awful', 'hate', 'angry', 'frustrated', 'worried', 'anxious', 'depressed'];

  const positiveCount = positiveWords.filter(word => lowerMessage.includes(word)).length;
  const negativeCount = negativeWords.filter(word => lowerMessage.includes(word)).length;

  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}

