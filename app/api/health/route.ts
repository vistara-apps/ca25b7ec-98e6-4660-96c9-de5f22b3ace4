import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if required environment variables are set
    const requiredEnvVars = [
      'NEXT_PUBLIC_ONCHAINKIT_API_KEY',
      'OPENAI_API_KEY'
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
      return NextResponse.json({
        status: 'error',
        message: 'Missing required environment variables',
        missing: missingVars
      }, { status: 500 });
    }

    // Check OpenAI API connectivity
    let openaiStatus = 'unknown';
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      });
      openaiStatus = response.ok ? 'healthy' : 'unhealthy';
    } catch (error) {
      openaiStatus = 'unreachable';
    }

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      services: {
        openai: openaiStatus,
        database: 'in-memory', // Will be updated when real DB is added
      },
      environment: {
        nodeVersion: process.version,
        nextVersion: '15.0.0',
      }
    });
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Health check failed',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

