# EchoSphere Deployment Guide

## Overview

This guide covers deploying EchoSphere, a Base MiniApp, to production. The app is built with Next.js and integrates with Base, Farcaster, and OpenAI.

## Prerequisites

- Vercel account (recommended) or compatible hosting platform
- Base wallet for testing
- OpenAI API key
- OnchainKit API key from Coinbase

## Environment Setup

### 1. Environment Variables

Create the following environment variables in your deployment platform:

```env
# Required
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Optional
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_FRAME_URL=https://your-domain.com
FARCASTER_HUB_URL=https://hub.farcaster.xyz
```

### 2. API Keys Setup

#### OnchainKit API Key
1. Visit [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)
2. Create a new project
3. Generate an API key for OnchainKit
4. Add to environment variables

#### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Generate a new API key
5. Add to environment variables

## Deployment Options

### Option 1: Vercel (Recommended)

#### Automatic Deployment
1. **Connect Repository**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   - Framework: Next.js
   - Root Directory: `./` (leave default)
   - Build Command: `npm run build`
   - Output Directory: `.next` (leave default)

3. **Environment Variables**
   - Add all required environment variables
   - Mark sensitive variables as "Secret"

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

#### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option 2: Other Platforms

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir .next
```

#### Railway
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add environment variables
5. Deploy

## Base MiniApp Configuration

### 1. Frame Metadata

Ensure your app includes proper frame metadata in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'EchoSphere - Find your people, share your journey',
  description: 'A Base MiniApp connecting lonely individuals through peer support groups, shared activities, and AI companionship.',
  openGraph: {
    title: 'EchoSphere',
    description: 'Find your people, share your journey.',
    images: ['/og-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
    'fc:frame:button:1': 'Start Connecting',
    'fc:frame:post_url': `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`,
  },
};
```

### 2. Frame Actions

Create frame action handlers in `app/api/frame/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Handle frame actions
  const { untrustedData } = body;

  // Process button clicks and interactions
  // Return updated frame metadata

  return NextResponse.json({
    image: `${process.env.NEXT_PUBLIC_APP_URL}/frame-image.png`,
    buttons: [
      {
        label: 'Continue',
        action: 'post',
        target: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`,
      },
    ],
  });
}
```

## Database Setup

### Current Implementation
The app currently uses in-memory storage for demo purposes. For production:

### Option 1: Vercel KV (Recommended for Vercel)
```bash
# Install Vercel KV
npm install @vercel/kv

# Update API routes to use KV
import { kv } from '@vercel/kv';

// Example usage
await kv.set('user:123', userData);
const userData = await kv.get('user:123');
```

### Option 2: PlanetScale/MySQL
```bash
# Install Prisma and PlanetScale client
npm install prisma @planetscale/database

# Set up database schema
npx prisma init
```

### Option 3: MongoDB
```bash
# Install MongoDB client
npm install mongodb

# Connect to MongoDB
const { MongoClient } = require('mongodb');
```

## Performance Optimization

### 1. Build Optimization
```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
    ],
  },
};

export default nextConfig;
```

### 2. API Rate Limiting
```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

export const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(50, '1 h'), // 50 requests per hour
});
```

### 3. Caching Strategy
```typescript
// API routes with caching
export async function GET() {
  // Implement caching logic
  const cached = await kv.get('cache:key');
  if (cached) return NextResponse.json(cached);

  // Fetch fresh data
  const data = await fetchData();

  // Cache for 5 minutes
  await kv.setex('cache:key', 300, data);

  return NextResponse.json(data);
}
```

## Monitoring and Analytics

### 1. Error Tracking
```bash
# Install Sentry
npm install @sentry/nextjs

# Configure Sentry
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

### 2. Analytics
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Security Considerations

### 1. API Security
```typescript
// API routes with authentication
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Verify token
  const token = authHeader.substring(7);
  const isValid = await verifyToken(token);

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  // Process request
}
```

### 2. Environment Variables
- Never commit API keys to version control
- Use environment-specific variables
- Rotate keys regularly

## Testing

### 1. Pre-deployment Checklist
- [ ] Environment variables configured
- [ ] API keys valid and working
- [ ] Database connection established
- [ ] Frame metadata correct
- [ ] All routes functional
- [ ] Error handling implemented
- [ ] Loading states working
- [ ] Mobile responsive design

### 2. Base MiniApp Testing
- [ ] Test in Base App
- [ ] Verify wallet connection
- [ ] Test frame actions
- [ ] Check notifications
- [ ] Validate on different devices

### 3. AI Integration Testing
- [ ] Test OpenAI API responses
- [ ] Verify rate limiting
- [ ] Check error handling
- [ ] Validate conversation flow

## Post-Deployment

### 1. Domain Configuration
- Set up custom domain if needed
- Configure SSL certificate
- Update frame URLs in metadata

### 2. Monitoring
- Set up uptime monitoring
- Configure error alerts
- Monitor API usage and costs

### 3. User Feedback
- Collect user feedback
- Monitor app performance
- Plan feature updates based on usage

## Troubleshooting

### Common Issues

#### Frame Not Loading
- Check frame metadata in layout.tsx
- Verify NEXT_PUBLIC_APP_URL is correct
- Ensure images are accessible

#### API Errors
- Check environment variables
- Verify API keys are valid
- Check rate limits

#### Wallet Connection Issues
- Ensure OnchainKit is properly configured
- Check Base network connectivity
- Verify wallet permissions

## Support

For deployment issues:
1. Check Vercel deployment logs
2. Review environment variables
3. Test API endpoints individually
4. Verify Base MiniApp configuration

## Cost Optimization

### API Costs
- OpenAI: Monitor usage and set budgets
- OnchainKit: Free tier available
- Vercel: Generous free tier for hobby projects

### Performance
- Implement caching for frequently accessed data
- Optimize images and assets
- Use CDN for static assets
- Monitor bundle size

---

**Deployment completed successfully! 🚀**

Your EchoSphere Base MiniApp is now live and ready to help users find their people and share their journey.

